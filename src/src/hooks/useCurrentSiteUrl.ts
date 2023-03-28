import { useContext } from 'react';
import { AppContext } from '../common/AppContext';

export const useCurrentSiteUrl = (): string => useContext(AppContext)?.currentSiteUrl;