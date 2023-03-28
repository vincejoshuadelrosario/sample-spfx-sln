import * as React from 'react';
import { useEffect, useState } from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import styles from './Demo06.module.scss';
import { IDemo06Props } from './IDemo06Props';

const Demo06: React.FC<IDemo06Props> = (props) => {
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
            .catch((error) => console.error(error));
    return () => abortController.abort();
  }, []);

  return (
    <section className={styles.demo06}>
      {
        siteLists.length === 0
        ? 'Loading...'
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
}

export default Demo06;