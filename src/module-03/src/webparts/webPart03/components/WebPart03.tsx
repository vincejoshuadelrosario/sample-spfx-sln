import * as React from 'react';
import styles from './WebPart03.module.scss';
import { IWebPart03Props } from './IWebPart03Props';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const WebPart03: React.FC<IWebPart03Props> = ({dynamicData}) => {

  return (
    <section className={styles.webPart03}>
      <TextField
        label="Result:"
        readOnly
        multiline
        rows={8}
        value={dynamicData}
      />
    </section>
  );
}

export default WebPart03;
