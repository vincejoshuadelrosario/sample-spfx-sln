import * as React from 'react';
import styles from './Demo05.module.scss';
import { IDemo05Props } from './IDemo05Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect, useState } from 'react';

const Demo05: React.FC<IDemo05Props> = (props) => {
  const {
    hasTeamsContext,
    userDisplayName
  } = props;
  
  const [counter, setCounter] = useState<number>(1);
  const [evenOdd, setEvenOdd] = useState<string>('');

  useEffect(() => {
    setEvenOdd((counter % 2 === 0) ? 'even' : 'odd');
  }, [counter]);

  const onButtonClick = (): void => {
    setCounter(counter + 1);
    // this.setState((prevSate) => {
    //   ...prevState,
    //   counter: useThemeProviderState.counter + 1
    // });
  }

  return (
    <section className={`${styles.demo05} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>
          <button className={styles['btn-counter']} onClick={ () => onButtonClick() }>+</button>
          <span><b>Counter:</b> {counter} is <i>{evenOdd}</i></span>
        </div>
      </div>
    </section>
  );
}

export default Demo05;