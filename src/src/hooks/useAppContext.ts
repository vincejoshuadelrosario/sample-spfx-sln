import { useContext } from 'react';
import { AppContext, IAppContextProps, ISampleAppContextProps, SampleAppContext } from '../common/AppContext';

export const useSampleAppContext = (): ISampleAppContextProps => useContext(SampleAppContext);
export const useAppContext = (): IAppContextProps => useContext(AppContext);