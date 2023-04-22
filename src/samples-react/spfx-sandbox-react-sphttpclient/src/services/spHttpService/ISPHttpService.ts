export interface ISPHttpService {
    get: <T>(url: string, options?: { headers?: {}, signal?: AbortSignal; } ) => Promise<T | Error>;
    post: <T>(url: string, options?: { headers?: {}, body?: string, signal?: AbortSignal; } ) => Promise<T | Error>;
}