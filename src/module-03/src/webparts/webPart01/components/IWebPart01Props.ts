import { IEvent } from "../WebPart01WebPart";

export interface IWebPart01Props {
    onEventSelected: (event: IEvent) => void;
}
