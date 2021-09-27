import useFetch from "../hooks/fetch-hook";
import { APP_LOAD_DELAY } from "../utils/main-util";
import { createSlice, createStore } from "@reduxjs/toolkit";
import * as eventDataUtil from "../components/events/event-data-util";

const initialState = {
    isLoading: true,
    showErrorModal: false,
    data: [],
    attackData: [],
    bandwidthData: []
};

export const eventStoreReducer = createSlice({
    name: 'eventStore',
    initialState,
    reducers: {
        finishLoading(state, action) {
            const [data, attackData, bandwidthData] = action.payload;
            
            state.data = data;
            state.attackData = attackData;
            state.bandwidthData = bandwidthData;
        },
        setErrorModalState(state, action) {
            state.isLoading = false;
            state.showErrorModal = action.payload;
        }
    }
});

const eventStore = createStore(eventStoreReducer.reducer);

export const loadEvents = () => {
    return async (dispatch: typeof eventStore.dispatch) => {
        setTimeout(async () => {
            const data = await Promise.all([
                useFetch({ fetchUrl: 'assets/events/event-log.txt' }),
                useFetch({ fetchUrl: 'assets/events/event-attack-log.txt' }),
                useFetch({ fetchUrl: 'assets/events/event-traffic-log.txt' })
            ]);

            const dataCorrupted = data.some(dataItem => dataItem === null);
            const payload = data.map(dataItem => eventDataUtil.transformEventList(dataItem));

            dispatch(eventReducerActions.finishLoading(payload));
            dispatch(eventReducerActions.setErrorModalState(dataCorrupted));

        }, APP_LOAD_DELAY);
    };
}

export const eventReducerActions = eventStoreReducer.actions;

export default eventStore;