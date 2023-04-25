import {
    ServiceKey,
    ServiceScope
} from "@microsoft/sp-core-library";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ISPHttpService } from ".";

export class SPHttpService implements ISPHttpService {

    public static readonly serviceKey: ServiceKey<ISPHttpService> =
        ServiceKey.create<ISPHttpService>('SPHttpService', SPHttpService);

    public static readonly headerCreate: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': ''
    };

    public static readonly headerRead: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
    };

    public static readonly headerUpdate: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': '',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'MERGE'
    };

    public static readonly headerDelete: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': '',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'DELETE'
    };

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
        });
    }

    private _spHttpClient: SPHttpClient;

    public async get<T>(url: string, options?: { headers?: {}, signal?: AbortSignal; }): Promise<T | Error> {
        const rawResponse = await this._spHttpClient.get(url,
            SPHttpClient.configurations.v1,
            {...options});

        if (!rawResponse.ok) {
            throw await this.onError(rawResponse);
        }

        return await rawResponse.json();
    }

    public async post<T>(url: string, options?: { headers?: {}, body?: string, signal?: AbortSignal; }): Promise<T | {} | Error> {
        const rawResponse = await this._spHttpClient.post(url,
            SPHttpClient.configurations.v1,
            {...options});

        if (!rawResponse.ok) {
            throw await this.onError(rawResponse);
        }

        if (rawResponse.status === 204 || rawResponse.headers.get("Content-Length") === "0")
        {
            return {};
        }

        return await rawResponse.json();
    }

    private async onError(response: SPHttpClientResponse): Promise<Error> {
        return new Error(`Server did not respond as expected. Status: (${response.status}).\n\n${JSON.stringify(await response.json(), null, '\t')}`);
    }
}
