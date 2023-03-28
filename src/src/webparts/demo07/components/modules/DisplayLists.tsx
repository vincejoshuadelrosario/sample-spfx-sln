import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import { IDisplayListsProps } from './IDisplayListsProps';
import { AppContext } from '../../../../common/AppContext';
import styles from './DisplayLists.module.scss';

const DisplayLists: React.FC<IDisplayListsProps> = () => {

    const { currentSiteUrl, spHttpClient } = useContext(AppContext);
      
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
      <section className={styles.displayLists}>
        {
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
        }
      </section>
    );
};

export default DisplayLists;