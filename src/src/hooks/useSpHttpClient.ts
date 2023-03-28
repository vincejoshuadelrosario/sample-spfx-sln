import { useContext } from 'react';
import { SPHttpClient } from "@microsoft/sp-http";
import { AppContext } from '../common/AppContext';

export const useSpHttpClient = (): SPHttpClient => useContext(AppContext)?.spHttpClient;