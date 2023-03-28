import { SPHttpClient } from "@microsoft/sp-http";

export interface IAppContextProps {
  currentSiteUrl: string;
  spHttpClient: SPHttpClient;
}
