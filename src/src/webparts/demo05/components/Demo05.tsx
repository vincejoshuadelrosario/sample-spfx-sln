import * as React from 'react';
import { useEffect, useState } from 'react';
// import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { SPHttpClient } from "@microsoft/sp-http";
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './Demo05.module.scss';
import { IDemo05Props } from './IDemo05Props';

const Demo05: React.FC<IDemo05Props> = (props) => {
  const {
    hasTeamsContext,
    userDisplayName,
    currentSiteUrl,
    spHttpClient
  } = props;
  
  const [counter, setCounter] = useState<number>(1);
  const [evenOdd, setEvenOdd] = useState<string>('');
  const [siteLists, setSiteLists] = useState<[]>([]);

  useEffect(() => {
    // (async () => {
    //   const endpoint: string = `${currentSiteUrl}/_api/web/lists?$select=Title&$filter=((BaseTemplate eq 101) or (Hidden eq false))&$orderby=Title&$top=10`;
    //   const rawResponse: SPHttpClientResponse = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
    //   setSiteLists(
    //     (await rawResponse.json()).value.map((list: {Title: string}) => {
    //       return list.Title;
    //     })
    //   );
    // })();
    
    spHttpClient.get(`${currentSiteUrl}/_api/web/lists?$select=Title&$filter=((BaseTemplate eq 101) or (Hidden eq false))&$orderby=Title&$top=10`, SPHttpClient.configurations.v1)
            .then((rawResponse) => rawResponse.json())
            .then((response) => setSiteLists(response.value.map((list: {Title: string}) => list.Title)))
            .catch((error) => console.error(error));
  }, []);
  
  useEffect(() => {
    setEvenOdd((counter % 2 === 0) ? 'even' : 'odd');
  }, [counter]);

  const onButtonClick = (): void => {
    // this.setState((prevSate) => {
    //   ...prevState,
    //   counter: useThemeProviderState.counter + 1
    // });
    setCounter(counter + 1);
  }

  return (
    <section className={`${styles.demo05} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>
          <button className={styles.btnCounter} onClick={ () => onButtonClick() }>+</button>
          <span><b>Counter:</b> {counter} is <i>{evenOdd}</i></span>
        </div>
        <div>
          <ul className={styles.listGroup}>
            {
              siteLists.map((title: string, index: number) => {
                return <li key={index}>{title}</li>;
              })
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Demo05;