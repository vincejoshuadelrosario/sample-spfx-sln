import * as React from 'react';
import styles from './SpHttp.module.scss';
import { ISpHttpProps } from './ISpHttpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FetchRequest } from './fetchRequest';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export const SpHttp: React.FC<ISpHttpProps> = ({title, defaultUrl}) => {

  return (
    <section className={styles.spHttp}>
    <Stack className={styles.container} dir="ltr">
      <Stack.Item className={styles.title}>
        <h2>{escape(title)}</h2>
      </Stack.Item>
      <Stack.Item>
        <FetchRequest defaultUrl={defaultUrl}/>
      </Stack.Item>
    </Stack>
  </section>
  );
}

export default SpHttp;