import useFetch from "../hooks/fetch-hook";
import { APP_LOAD_DELAY } from "../utils/main-util";
import { createSlice, createStore } from "@reduxjs/toolkit";
import * as usersDataUtil from "../components/users/users-data-util";

const initialState = {
    isLoading: true,
    showErrorModal: false,
    data: [],
    keywordsData: []
};

export const usersStoreReducer = createSlice({
    name: 'usersReducer',
    initialState,
    reducers: {
        finishLoading(state, action) {
            const [data, keywordData] = action.payload;
            
            state.data = data;
            state.keywordsData = keywordData;
        },
        setErrorModalState(state, action) {
            state.isLoading = false;
            state.showErrorModal = action.payload;
        }
    }
});

const userStore = createStore(usersStoreReducer.reducer);

export const loadUserData = () => {
    return async (dispatch: typeof userStore.dispatch) => {
        setTimeout(async () => {
            const data = await Promise.all([
                useFetch({ fetchUrl: 'assets/users/users-log.txt' }),
                useFetch({ fetchUrl: 'assets/users/users-log-keyword.txt' })
            ]);

            const dataCorrupted = data.some(dataItem => dataItem === null);
            const [ userLogData, userKeywordData ] = data;

            const userLogPayload = usersDataUtil.transformUserLog(userLogData, true);
            const userKeywordPayload = usersDataUtil.transformUserLog(userKeywordData, false);

            dispatch(userReducerActions.finishLoading([userLogPayload, userKeywordPayload]));
            dispatch(userReducerActions.setErrorModalState(dataCorrupted));

        }, APP_LOAD_DELAY);
    };
}

export const userReducerActions = usersStoreReducer.actions;

export default userStore;