import * as React from 'react';
import { IAppContextProps } from './IAppContextProps'; 
 
export const AppContext = React.createContext<IAppContextProps>(undefined);