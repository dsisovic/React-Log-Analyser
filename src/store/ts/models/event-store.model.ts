import { IEventItem } from "../../../components/events/ts/models/event-item.model";
import { IEventAttackItem } from "../../../components/events/ts/models/event-attack-item.model";

export interface IEventStore {
    events: {
        isLoading: boolean;
        data: IEventItem[];
        attackData: IEventAttackItem[];
    }
}
