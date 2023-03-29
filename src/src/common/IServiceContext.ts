import { ServiceScope } from "@microsoft/sp-core-library";

export interface IServiceContext {
  serviceScope: ServiceScope;
}
