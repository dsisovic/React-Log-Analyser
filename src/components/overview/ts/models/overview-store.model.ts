import { IOverviewItem } from "./overview-item.model";
import { IOverviewVisitor } from "./overview-visitor.model";

export interface IOverviewStore {
    overview: {
        isLoading: boolean;
        showErrorModal: boolean;
        pages: IOverviewItem[];
        referrals: IOverviewItem[];
        visitors: IOverviewVisitor[];
        activeUsers: IOverviewItem[];
    }
}