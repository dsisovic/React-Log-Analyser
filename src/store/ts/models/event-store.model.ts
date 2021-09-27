import { IEventItem } from "../../../components/events/ts/models/event-item.model";
import { IEventAttackItem } from "../../../components/events/ts/models/event-attack-item.model";
import { IEventBandwidthItem } from "../../../components/events/ts/models/event-bandwidth-item.model";

export interface IEventStore {
    events: {
        isLoading: boolean;
        data: IEventItem[];
        showErrorModal: boolean;
        attackData: IEventAttackItem[];
        bandwidthData: IEventBandwidthItem[];
    }
}
 