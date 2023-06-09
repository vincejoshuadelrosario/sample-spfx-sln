import * as React from 'react';
import { useEffect, useState } from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import { IDisplayListsProps } from './IDisplayListsProps';
import styles from './DisplayLists.module.scss';
// import { useCurrentSiteUrl } from '../../../../hooks/useCurrentSiteUrl';
// import { useSpHttpClient } from '../../../../hooks/useSpHttpClient';
// import { useCurrentSiteUrl, useSpHttpClient } from '../../../../hooks';
import { useSampleAppContext } from '../../../../hooks';

const DisplayLists: React.FC<IDisplayListsProps> = () => {
    // const currentSiteUrl = useCurrentSiteUrl();
    // const spHttpClient = useSpHttpClient();
    const { currentSiteUrl, spHttpClient } = useSampleAppContext();
    
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