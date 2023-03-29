import { IListService } from "./IListsService";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from '@microsoft/sp-page-context';
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";

export default class ListsService implements IListService {
    
    public static readonly ServiceKey: ServiceKey<IListService> =
        ServiceKey.create<IListService>('ListsService', ListsService);

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

    public async getListTitles(abortController?: AbortController): Promise<string[]> {
        let results: string[] = [];

        try
        {
            const rawResponse = await this._spHttpClient.get(`${this._currentWebUrl}/_api/web/lists?$select=Title&$orderby=Title`,
                                    SPHttpClient.configurations.v1,
                                    this.getOptions(abortController));
            const response = await rawResponse.json();
            results = await response.value.map((list: {Title: string}) => list.Title);
        }
        catch(ex)
        {
            console.error(ex);
        }

        return results;
    }

    private getOptions(abortController?: AbortController): {} {
        console.log('getoptions', abortController)
        return abortController
                ? {signal: abortController.signal}
                : {}
    }
}