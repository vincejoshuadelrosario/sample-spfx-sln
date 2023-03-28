import * as React from 'react';
import { useEffect, useState } from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import { IDisplayListsProps } from './IDisplayListsProps';

const DisplayLists: React.FC<IDisplayListsProps> = (props) => {
    const {
        currentSiteUrl,
        spHttpClient
      } = props;
      
    const [siteLists, setSiteLists] = useState<[]>([]);

    useEffect(() => {
        const abortController = new AbortController();
        spHttpClient.get(`${currentSiteUrl}/_api/web/lists?$select=Title&$orderby=Title`,
                          SPHttpClient.configurations.v1,
                          {signal: abortController.signal})
                .then((rawResponse) => rawResponse.json())
                .then((response) => setSiteLists(response.value.map((list: {Title: string}) => list.Title)))
                .catch((error) => {
                    if (abortController.signal.aborted) {
                        return;
                    }
                    console.error(error)
                });
        return () => abortController.abort();
      }, []);
      
    return (
        siteLists.length === 0
        ? <span>Loading...</span>
        : (
        <div>
            <ul>
            {
                siteLists.map((title: string, index: number) => {
                return <li key={index}>{title}</li>;
                })
            }
            </ul>
        </div>
        )
    );
};

export default DisplayLists;