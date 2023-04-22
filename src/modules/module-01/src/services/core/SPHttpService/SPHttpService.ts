import { ISPHttpClientOptions, SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from '@microsoft/sp-page-context';
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { ISPHttpService } from "./ISPHttpService";

export default class SPHttpService implements SPHttpService {
    
    public static readonly serviceKey: ServiceKey<ISPHttpService> =
        ServiceKey.create<ISPHttpService>('SPHttpService', SPHttpService);

    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
            this._pageContext = serviceScope.consume(PageContext.serviceKey);
            this._currentWebUrl = this._pageContext.web.absoluteUrl;
        });
    }

    public async get<T>(url: string, options?: ISPHttpClientOptions): Promise<T> {
        const response = await this._spHttpClient.get(`${this._currentWebUrl}${url}`,
                SPHttpClient.configurations.v1,
                options);
        return <T>(await response.json());
    }
}
