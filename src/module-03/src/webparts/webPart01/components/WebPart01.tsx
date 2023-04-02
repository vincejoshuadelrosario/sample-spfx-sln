import * as React from 'react';
import styles from './WebPart01.module.scss';
import { IWebPart01Props } from './IWebPart01Props';

export default class WebPart01 extends React.Component<IWebPart01Props, {}> {
  public render(): React.ReactElement<IWebPart01Props> {
    // const {} = this.props;

    return (
      <section className={styles.webPart01}>
        Web Part 01
      </section>
    );
  }
}
