import { EventType } from "../enums/event-type.enum";

export interface IEventItem {
    datetime: string;
    value: EventType;
}