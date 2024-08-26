import { test, request, expect } from '@playwright/test';
import { JiraEndpoints, HTTPHeaders, IssueData } from '../testData/api-data';
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    assertStatusCode,
    assertFieldMatch
} from '../utils/api-utils';  // Import your utility functions

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
    let issueId: string | undefined;
    let key: string | undefined;
    let self: string | undefined;
    const initialData = JSON.parse(IssueData.INITIAL);

    test.beforeAll(async ({ request }) => {
        // Create a new issue
        const response = await postRequest(request, JiraEndpoints.BASE_URL, initialData, buildHeaders());
        const responseBody = await response.json();

        assertStatusCode(response, 201, responseBody);  // Assert status code
        issueId = responseBody.id;
        key = responseBody.key;
        self = responseBody.self;
    });

    test('should verify created Jira Issue', async () => {
        // Validate the creation response
        expect(issueId).toBeDefined();
        expect(key).toBeDefined();
        expect(self).toMatch(new RegExp(`/${issueId}$`));
    });

    test('should verify retrieved issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        const JIRA_URL = `${JiraEndpoints.BASE_URL}/${issueId}`;
        const response = await getRequest(request, { url: JIRA_URL, headers: buildHeaders() });
        const responseBody = await response.json();

        assertStatusCode(response, 200, responseBody);  // Assert status code
        assertFieldMatch(responseBody, 'id', issueId);  // Assert field match
        assertFieldMatch(responseBody, 'fields.summary', initialData.fields.summary);
        assertFieldMatch(responseBody, 'fields.description', initialData.fields.description);
        assertFieldMatch(responseBody, 'fields.issuetype.name', 'Task');
    });

    test('should verify update issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        const JIRA_URL = `${JiraEndpoints.BASE_URL}/${issueId}`;
        const response = await putRequest(request, { url: JIRA_URL, data: parseJson(IssueData.UPDATED), headers: buildHeaders() });

        assertStatusCode(response, 204, {});  // Assert status code (204 No Content)

        // Optional: Verify the update by fetching the issue again
        const verifyResponse = await getRequest(request, { url: JIRA_URL, headers: buildHeaders() });
        const verifyResponseBody = await verifyResponse.json();
        const updatedData = JSON.parse(IssueData.UPDATED);

        assertStatusCode(verifyResponse, 200, verifyResponseBody);  // Assert status code
        assertFieldMatch(verifyResponseBody, 'fields.summary', updatedData.fields.summary);
        assertFieldMatch(verifyResponseBody, 'fields.description', updatedData.fields.description);
    });

    test('should verify deleted issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        const JIRA_URL = `${JiraEndpoints.BASE_URL}/${issueId}`;
        const response = await deleteRequest(request, { url: JIRA_URL, headers: buildHeaders() });

        assertStatusCode(response, 204, {});  // Assert status code (204 No Content)

        // Verify the issue has been deleted
        const verifyResponse = await getRequest(request, { url: JIRA_URL, headers: buildHeaders() });
        assertStatusCode(verifyResponse, 404, {});  // Assert status code (404 Not Found)
    });

    test('should add and verify a comment to the Jira issue', async ({ request }) => {
        if (!issueId) {
            throw new Error('issueId is not defined. Ensure `beforeAll` setup is run.');
        }

        // Add a comment to the issue
        const COMMENT_URL = `${JiraEndpoints.BASE_URL}/${issueId}/comment`;
        const postResponse = await postRequest(request, COMMENT_URL, parseJson(IssueData.INITIAL_COMMENT), buildHeaders());
        const postResponseBody = await postResponse.json();

        assertStatusCode(postResponse, 201, postResponseBody);  // Assert status code
        expect(postResponseBody.id).toBeDefined();  // Ensure comment ID is present

        // Fetch the comment to verify its content
        const commentId = postResponseBody.id;
        const fetchCommentUrl = `${JiraEndpoints.BASE_URL}/${issueId}/comment/${commentId}`;
        const getResponse = await getRequest(request, { url: fetchCommentUrl, headers: buildHeaders() });
        const getResponseBody = await getResponse.json();

        assertStatusCode(getResponse, 200, getResponseBody);  // Assert status code

        // Ensure we correctly access the body of the comment
        const receivedCommentBody = getResponseBody.body;
        const expectedCommentBody = JSON.parse(IssueData.INITIAL_COMMENT).body;

        // Check that the comment body matches the expected value
        assertFieldMatch(getResponseBody, 'body', expectedCommentBody);
    });
});