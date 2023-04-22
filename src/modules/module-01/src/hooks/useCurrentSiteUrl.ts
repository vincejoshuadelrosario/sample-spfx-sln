import { useContext } from 'react';
import { SampleAppContext } from '../common/AppContext';

export const useCurrentSiteUrl = (): string => useContext(SampleAppContext)?.currentSiteUrl;