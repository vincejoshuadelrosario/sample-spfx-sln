import * as React from 'react';
import { AppContext } from '../../../common/AppContext';
import { IDemo08Props } from './IDemo08Props';
import DisplayLists from './modules/DisplayLists';

const Demo08: React.FC<IDemo08Props> = (props) => {
  return (
    <AppContext.Provider value={{...props}}>
      <DisplayLists />
    </AppContext.Provider>
  );
}

export default Demo08;