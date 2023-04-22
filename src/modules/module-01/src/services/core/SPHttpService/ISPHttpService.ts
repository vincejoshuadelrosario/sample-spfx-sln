import { ISPHttpClientOptions } from "@microsoft/sp-http";

export interface ISPHttpService {
    /**
     * Calls fetch(), but sets the method to "GET".
     * @param url the relative URL to fetch
     * @param configuration determines the default behavior of SPHttpClient; normally this should be the latest version number from SPHttpClientConfigurations
     * @param options additional options that affect the request
     * @returns A promise with behavior similar to WHATWG fetch(). This promise will resolve normally (with HttpClientResponse.ok being false) for error status codes such as HTTP 404 or 500. The promise will only reject for network failures or other errors that prevent communication with the server.
     * @public
     */
    get<T>(url: string, options?: ISPHttpClientOptions): Promise<T>;
}
