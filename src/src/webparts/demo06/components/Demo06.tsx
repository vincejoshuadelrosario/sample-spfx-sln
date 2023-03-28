import * as React from 'react';
import styles from './Demo06.module.scss';
import { IDemo06Props } from './IDemo06Props';

const Demo06: React.FC<IDemo06Props> = (props) => {
  const {
    hasTeamsContext
  } = props;

  return (
    <section className={`${styles.demo06} ${hasTeamsContext ? styles.teams : ''}`}>
    </section>
  );
}

export default Demo06;