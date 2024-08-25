// test-data.ts

// Enums for simple constants
export enum JiraEndpoints {
    BASE_URL = 'https://demogm.atlassian.net/rest/api/2/issue',
    AUTH_HEADER = 'Basic amlyYXVzZXI5MkBnbWFpbC5jb206QVRBVFQzeEZmR0YwZzNfYjE0MEd5aF9RWG1sX3ljY2NNamJ6THJNcmhPY01uVlR0YnhlX0RUS1NPVWhIcUlyQkVsZ1JsQTh4RnJkYUZGeTBxQVF6TkRpMUpNak51YWlqa3lWZGtDT3dyaDJTd09NN2E4YjlzNXhobm5pVHdFeXlSdUwtdnRERmV0NlRGRzBnWnd0dl9jUUkwUUZiRXA4LXg5YmtlMnJzaGZRTUpIWWV4bzZyTXRRPUQ1RjY4Qjg5'
}

// Enums for HTTP Headers as a map-like structure
export enum HTTPHeaders {
    ACCEPT = 'application/json',
    CONTENT_TYPE = 'application/json',
    USER_AGENT = 'automation'
}

// Enums for complex data structures as stringified JSON
export enum IssueData {
    INITIAL = '{"fields":{"project":{"key":"QA"},"summary":"Switching market on sports page displays irrelevant market","description":"When attempting to switch markets on the sports page, the system displays a market that does not correspond to the selected option.","issuetype":{"name":"Task"}}}',
    UPDATED = '{"fields":{"summary":"Updated market switch issue","description":"Error is shown on switching the market on sports page."}}',
    INITIAL_COMMENT = '{"body":"Market name disapppears on switching markets on sports page. "}',
    UPDATED_COMMENT = '{"body":"The sports page displays the wrong market when you switch between markets."}'

}
