import * as React from 'react';
import styles from './WebPart02.module.scss';
import { IWebPart02Props } from './IWebPart02Props';

export default class WebPart02 extends React.Component<IWebPart02Props, {}> {
  public render(): React.ReactElement<IWebPart02Props> {
    // const {} = this.props;

    return (
      <section className={styles.webPart02}>
        Web Part 02
      </section>
    );
  }
}
