import { IListService } from "./IListsService";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import SPHttpService from "../../core/SPHttpService/SPHttpService";
import { ISPHttpService } from "../../core/SPHttpService/ISPHttpService";

export default class ListsService implements IListService {
    
    public static readonly serviceKey: ServiceKey<IListService> =
        ServiceKey.create<IListService>('ListsService', ListsService);

    private _spHttpService: ISPHttpService;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpService = serviceScope.consume(SPHttpService.serviceKey);
        });
    }

    public async getListTitles(abortController?: AbortController): Promise<string[]> {
        let results: string[] = [];

        try
        {
            /**
             * TODO: Use types/interface to define response model
             */
            const response = await this._spHttpService.get<{value: [{Title: string}]}>('/_api/web/lists?$select=Title&$orderby=Title',
                                    this.getOptions(abortController));
            results = response.value.map((list: {Title: string}) => list.Title);
        }
        catch(ex)
        {
            /**
             * TODO: Implement proper error handling
             */
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
