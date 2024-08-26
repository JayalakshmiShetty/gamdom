import { APIRequestContext, APIResponse, expect } from '@playwright/test';

// Define the type for request options
interface RequestOptions {
    url: string;
    headers?: Record<string, string>;
    data?: any;  // For POST and PUT requests
}

/**
 * Makes a GET request.
 *
 * @param request - The Playwright request object.
 * @param options - The request options, including URL and optional headers.
 * @returns The response from the GET request.
 */
export async function getRequest(request:APIRequestContext, { url, headers }: RequestOptions) {
    const response = await request.get(url, { headers });
    return response;
}

/**
 * Makes a POST request.
 *
 * @param apiRequest - The Playwright APIRequestContext object used to perform the request.
 * @param url - The URL to send the POST request to.
 * @param data - The data to send in the body of the POST request.
 * @param headers - Optional headers to include in the POST request.
 * @returns The response from the POST request.
 */
export async function postRequest(apiRequest: APIRequestContext, url: string, data: object, headers: { [key: string]: string }): Promise<APIResponse> {
    return await apiRequest.post(url, { data, headers });
}

/**
 * Makes a PUT request.
 *
 * @param request - The Playwright APIRequestContext object used to perform the request.
 * @param options - The request options, including URL, headers, and data to send.
 * @returns The response from the PUT request.
 */
export async function putRequest(request: APIRequestContext, { url, headers, data }: RequestOptions) {
    const response = await request.put(url, { headers, data });
    return response;
}

/**
 * Makes a DELETE request.
 *
 * @param request - The Playwright request object.
 * @param options - The request options, including URL and optional headers.
 * @returns The response from the DELETE request.
 */
export async function deleteRequest(request: APIRequestContext, { url, headers }: RequestOptions) {
    const response = await request.delete(url, { headers });
    return response;
}

/**
 * Asserts that the status code of a response matches the expected status code.
 * @param response - The Playwright response object.
 * @param expectedStatusCode - The expected status code.
 * @param responseBody - The response body to include in the error message.
 */
export function assertStatusCode(response: APIResponse, expectedStatusCode: number, responseBody: object): void {
    const actualStatusCode = response.status();
    const errorMessage = `Actual (${actualStatusCode}) and expected (${expectedStatusCode}) status code don't match. \nAPI Response: ${JSON.stringify(responseBody, null, 2)}`;
    expect(actualStatusCode, { message: errorMessage }).toBe(expectedStatusCode);
}

/**
 * Asserts that a specific field in the response body matches the expected value.
 * @param responseBody - The actual response body from the API.
 * @param fieldPath - The path to the field in the response body (e.g., 'fields.summary').
 * @param expectedValue - The expected value of the field.
 */
export function assertFieldMatch(responseBody: object, fieldPath: string, expectedValue: string): void {
    // Extract the field value from the response body
    const actualValue = fieldPath.split('.').reduce((obj, key) => obj && obj[key], responseBody);

    // Error message
    const errorMessage = `Field at '${fieldPath}' in the response body does not match the expected value. \nActual value: '${actualValue}'. \nExpected value: '${expectedValue}'. \nAPI Response: ${JSON.stringify(responseBody, null, 2)}`;

    // Assert that the actual value matches the expected value
    expect(actualValue?.trim(), { message: errorMessage }).toBe(expectedValue);
}
