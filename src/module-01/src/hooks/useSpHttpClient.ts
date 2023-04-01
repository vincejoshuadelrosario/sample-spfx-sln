import { useContext } from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import { SampleAppContext } from '../common/AppContext';

export const useSpHttpClient = (): SPHttpClient => useContext(SampleAppContext)?.spHttpClient;