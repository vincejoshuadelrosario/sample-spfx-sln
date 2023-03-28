import { SPHttpClient } from "@microsoft/sp-http";

export interface IDisplayListsProps {
  currentSiteUrl: string;
  spHttpClient: SPHttpClient;
}