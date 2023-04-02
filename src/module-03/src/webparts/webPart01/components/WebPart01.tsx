import * as React from 'react';
import styles from './WebPart01.module.scss';
import { IWebPart01Props } from './IWebPart01Props';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { useState } from 'react';

const WebPart01: React.FC<IWebPart01Props> = ({onDynamicDataSelected}) => {

  const [ input, setInput ] = useState<string>('');

  const onChangeText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    setInput(newValue);
    onDynamicDataSelected(newValue);
  };

  return (
    <section className={styles.webPart01}>
      <Label>Source: Web Part 01</Label>
      <TextField
        label="Input:"
        value={input}
        onChange={onChangeText}
      />
      {/* <TextField
        label="Output"
        disabled
        value={input}
      /> */}
    </section>
  );
}

export default WebPart01;