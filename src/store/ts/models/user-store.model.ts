import { IUserLog } from "../../../components/users/ts/models/user-log.model";
import { IUserKeywordLog } from "../../../components/users/ts/models/user-keyword-log.model";

export interface IUserStore {
    users: {
        data: IUserLog[];
        isLoading: boolean;
        showErrorModal: boolean;
        keywordsData: IUserKeywordLog[];
    }
}