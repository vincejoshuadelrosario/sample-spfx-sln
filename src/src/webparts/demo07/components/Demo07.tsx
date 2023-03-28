import * as React from 'react';
import { AppContext } from '../../../common/AppContext';
import { IDemo07Props } from './IDemo07Props';
import DisplayLists from './modules/DisplayLists';

const Demo06: React.FC<IDemo07Props> = (props) => {
  return (
    <AppContext.Provider value={{...props}}>
        <DisplayLists />
    </AppContext.Provider>
  );
}

export default Demo06;