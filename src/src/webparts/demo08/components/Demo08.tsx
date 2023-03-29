import * as React from 'react';
import { ServiceContext } from '../../../common/ServiceContext';
import { IDemo08Props } from './IDemo08Props';
import DisplayLists from './modules/DisplayLists';

const Demo08: React.FC<IDemo08Props> = (props) => {
  return (
    <ServiceContext.Provider value={{...props}}>
      <DisplayLists />
    </ServiceContext.Provider>
  );
}

export default Demo08;