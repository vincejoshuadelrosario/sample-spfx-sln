import * as React from 'react';

// Demo-07: Passing top-level objects with AppContext
import { SPHttpClient } from "@microsoft/sp-http";
export interface ISampleAppContextProps {
    currentSiteUrl: string;
    spHttpClient: SPHttpClient;
}
export const SampleAppContext = React.createContext<ISampleAppContextProps>(undefined);

// Demo-08: Service Locator Pattern with AppContext
import { ServiceScope } from "@microsoft/sp-core-library";
export interface IAppContextProps {
  serviceScope: ServiceScope;
}
export const AppContext = React.createContext<IAppContextProps>(undefined);