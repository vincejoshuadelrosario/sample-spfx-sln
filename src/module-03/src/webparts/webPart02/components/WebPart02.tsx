import * as React from 'react';
import styles from './WebPart02.module.scss';
import { IWebPart02Props } from './IWebPart02Props';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const WebPart02: React.FC<IWebPart02Props> = ({output}) => {

  return (
    <section className={styles.webPart02}>
      <Label>Target: Web Part 02</Label>
      <TextField
        label="Output"
        disabled
        value={output}
      />
    </section>
  );
}

export default WebPart02;
