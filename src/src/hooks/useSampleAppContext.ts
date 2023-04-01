import { useContext } from 'react';
import { ISampleAppContextProps, SampleAppContext } from '../common/AppContext';

export const useSampleAppContext = (): ISampleAppContextProps => useContext(SampleAppContext);