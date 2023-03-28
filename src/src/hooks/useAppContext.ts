import { useContext } from 'react';
import { AppContext } from '../common/AppContext';
import { IAppContextProps } from '../common/IAppContextProps';

export const useAppContext = (): IAppContextProps => useContext(AppContext);