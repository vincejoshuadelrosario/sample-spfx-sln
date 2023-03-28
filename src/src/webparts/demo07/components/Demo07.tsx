import * as React from 'react';
import styles from './Demo07.module.scss';
import { IDemo07Props } from './IDemo07Props';
import DisplayLists from './modules/DisplayLists';

const Demo06: React.FC<IDemo07Props> = (props) => {
  const {
    currentSiteUrl,
    spHttpClient
  } = props;

  return (
    <section className={styles.demo07}>
      <DisplayLists currentSiteUrl={currentSiteUrl} spHttpClient={spHttpClient}/>
    </section>
  );
}

export default Demo06;