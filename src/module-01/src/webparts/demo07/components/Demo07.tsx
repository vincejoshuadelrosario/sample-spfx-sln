import * as React from 'react';
import { SampleAppContext } from '../../../common/AppContext';
import { IDemo07Props } from './IDemo07Props';
import DisplayLists from './modules/DisplayLists';

const Demo07: React.FC<IDemo07Props> = (props) => {
  return (
    <SampleAppContext.Provider value={{...props}}>
        <DisplayLists />
    </SampleAppContext.Provider>
  );
}

export default Demo07;