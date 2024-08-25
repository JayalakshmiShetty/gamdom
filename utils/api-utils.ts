import { APIRequestContext, APIResponse } from '@playwright/test';

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
 * @param request - The Playwright request object.
 * @param options - The request options, including URL, headers, and data to send.
 * @returns The response from the POST request.
 */
// export async function postRequest(request: APIRequestContext, { url, headers, data }: RequestOptions) {
//     const response = await request.post(url, { headers, data });
//     return response;
// }
export async function postRequest(apiRequest: APIRequestContext, url: string, data: object, headers: { [key: string]: string }): Promise<APIResponse> {
    return await apiRequest.post(url, { data, headers });
}

/**
 * Makes a PUT request.
 *
 * @param request - The Playwright request object.
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
