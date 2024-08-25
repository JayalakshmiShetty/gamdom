
import { test, request, expect } from '@playwright/test';
import { JiraEndpoints, HTTPHeaders, IssueData } from '../testData/api-data';

// Helper function to build headers object from enums
const buildHeaders = () => ({
    'Accept': HTTPHeaders.ACCEPT,
    'Content-Type': HTTPHeaders.CONTENT_TYPE,
    'Authorization': JiraEndpoints.AUTH_HEADER,
    'User-Agent': HTTPHeaders.USER_AGENT
});

// Utility function to parse stringified JSON
const parseJson = (json: string): object => JSON.parse(json);

test.describe('Jira Issue Management', () => {
    let issueId: string | undefined, response, key, self;
    const initialData = JSON.parse(IssueData.INITIAL);


    test.beforeAll(async ({ request }) => {
        // Create a new issue
        response = await request.post(JiraEndpoints.BASE_URL, {
            headers: buildHeaders(),
            data: initialData
        });
        const responseBody = await response.json();

        expect(response.status()).toBe(201);
        issueId = responseBody.id;
        key=responseBody.key;
        self=responseBody.self;
    });

    test('should verify  created Jira Issue', async ({ }) => {
        // Validate the creation response
        expect(response.status()).toBe(201);
        expect(issueId).toBeDefined();
        expect(key).toBeDefined();
        expect(self).toMatch(new RegExp(`/${issueId}$`));
    });


    test('should verify retrieved issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        const JIRA_URL = `${JiraEndpoints.BASE_URL}/${issueId}`;

        // Fetch the issue to verify its existence
        const response = await request.get(JIRA_URL, {
            headers: buildHeaders()
        });
        const responseBody = await response.json();

        // Assert the issue details
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(issueId);
        expect(responseBody.fields.summary).toBe(initialData.fields.summary);
        expect(responseBody.fields.description).toBe(initialData.fields.description);
        expect(responseBody.fields.issuetype.name).toBe('Task');
    });

    test('should verify update issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        const JIRA_URL = `${JiraEndpoints.BASE_URL}/${issueId}`;

        const response = await request.put(JIRA_URL, {
            headers: buildHeaders(),
            data: parseJson(IssueData.UPDATED)
        });
        expect(response.status()).toBe(204); // Expecting no content on successful update

        // Optional: Verify the update by fetching the issue again
        const verifyResponse = await request.get(JIRA_URL, {
            headers: buildHeaders()
        });
        const verifyResponseBody = await verifyResponse.json();
        const updatedData = JSON.parse(IssueData.UPDATED);

        expect(verifyResponse.status()).toBe(200);
        expect(verifyResponseBody.fields.summary.trim()).toBe(updatedData.fields.summary);
        expect(verifyResponseBody.fields.description).toBe(updatedData.fields.description);
    });

    test('should verify deleted issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        const JIRA_URL = `${JiraEndpoints.BASE_URL}/${issueId}`;

        const response = await request.delete(JIRA_URL, {
            headers: buildHeaders()
        });
        expect(response.status()).toBe(204); // Expecting no content on successful delete

        // Verify the issue has been deleted
        const verifyResponse = await request.get(JIRA_URL, {
            headers: buildHeaders()
        });
        expect(verifyResponse.status()).toBe(404); // Issue should no longer exist
    });

    test('should add and verify a comment to the Jira issue', async ({ request }) => {
        // Add a comment to the issue
        const COMMENT_URL = `${JiraEndpoints.BASE_URL}/${issueId}/comment`;
        const postResponse = await request.post(COMMENT_URL, {
            headers: buildHeaders(),
            data: parseJson(IssueData.INITIAL_COMMENT)
        });
        const postResponseBody = await postResponse.json();

        // Validate the comment creation response
        expect(postResponse.status()).toBe(201); // Assuming a successful comment creation returns HTTP 201
        expect(postResponseBody).toBeDefined();
        expect(postResponseBody.id).toBeDefined(); // Ensure comment ID is present

        // Fetch the comment to verify its content
        const commentId = postResponseBody.id;
        const fetchCommentUrl = `${JiraEndpoints.BASE_URL}/${issueId}/comment/${commentId}`;
        const getResponse = await request.get(fetchCommentUrl, {
            headers: buildHeaders()
        });
        const getResponseBody = await getResponse.json();

        // Validate the fetched comment
        expect(getResponse.status()).toBe(200);

        // Ensure we correctly access the body of the comment
        const receivedCommentBody = getResponseBody.body;
        const expectedCommentBody = JSON.parse(IssueData.INITIAL_COMMENT).body;

        // Check that the comment body matches the expected value
        expect(receivedCommentBody.trim()).toBe(expectedCommentBody.trim());
    });

});