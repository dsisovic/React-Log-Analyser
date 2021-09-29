import useFetch from "../hooks/fetch-hook";
import { APP_LOAD_DELAY } from "../utils/main-util";
import { createSlice, createStore } from "@reduxjs/toolkit";
import * as overviewDataUtil from "../components/overview/overview-data-util";

const initialState = {
    isLoading: true,
    showErrorModal: false,
    pages: [],
    visitors: [],
    referrals: [],
    activeUsers: []
};

export const overviewStoreReducer = createSlice({
    name: 'overviewReducer',
    initialState,
    reducers: {
        finishLoading(state, action) {
            const [pages, visitors, referrals, activeUsers] = action.payload;
            
            state.pages = pages;
            state.visitors = visitors;
            state.referrals = referrals;
            state.activeUsers = activeUsers;
        },
        setErrorModalState(state, action) {
            state.isLoading = false;
            state.showErrorModal = action.payload;
        }
    }
});

const overviewStore = createStore(overviewStoreReducer.reducer);

export const loadOverviewData = () => {
    return async (dispatch: typeof overviewStore.dispatch) => {
        setTimeout(async () => {
            const data = await Promise.all([
                useFetch({ fetchUrl: 'assets/overview/overview-pages.txt' }),
                useFetch({ fetchUrl: 'assets/overview/overview-visitors.txt' }),
                useFetch({ fetchUrl: 'assets/overview/overview-referrals.txt' }),
                useFetch({ fetchUrl: 'assets/overview/overview-active.txt' })
            ]);

            const dataCorrupted = data.some(dataItem => dataItem === null);
            const [ pagesData, visitorsData, referralsData, activeData ] = data;

            const pagesPayload = overviewDataUtil.transformOverviewData(pagesData);
            const visitorsPayload = overviewDataUtil.transformOverviewData(visitorsData);
            const referralsPayload = overviewDataUtil.transformOverviewData(referralsData);
            const activeUsersPayload = overviewDataUtil.transformOverviewData(activeData);

            const payload = [pagesPayload, visitorsPayload, referralsPayload, activeUsersPayload];

            dispatch(overviewReducerActions.finishLoading(payload));
            dispatch(overviewReducerActions.setErrorModalState(dataCorrupted));

        }, APP_LOAD_DELAY);
    };
}

export const overviewReducerActions = overviewStoreReducer.actions;

export default overviewStore;