import { Dispatch } from "react";
import useFetch from "../hooks/fetch-hook";
import { APP_LOAD_DELAY } from "../utils/main-util";
import { createSlice, createStore } from "@reduxjs/toolkit";
import * as eventDataUtil from "../components/events/event-data-util";

const initialState = {
    isLoading: true,
    data: [],
    attackData: []
};

export const eventStoreReducer = createSlice({
    name: 'eventReducer',
    initialState,
    reducers: {
        finishLoading(state, action) {
            state.isLoading = false;
            state.data = action.payload;
        },
        finishLoadingAttacks(state, action) {
            state.attackData = action.payload;
        }
    }
});

const eventStore = createStore(eventStoreReducer.reducer);

export const loadEvents = () => {
    return async (dispatch: Dispatch<any>) => {
        setTimeout(async () => {
            const data = await useFetch({ fetchUrl: 'assets/events/event-log.txt' });

            dispatch(eventReducerActions.finishLoading(eventDataUtil.transformEventList(data)));
        }, APP_LOAD_DELAY);
    };
}

export const loadAttackEvents = () => {
    return async (dispatch: Dispatch<any>) => {
        const data = await useFetch({ fetchUrl: 'assets/events/event-attack-log.txt' });

        dispatch(eventReducerActions.finishLoadingAttacks(eventDataUtil.transformEventList(data)));
    };
}

export const eventReducerActions = eventStoreReducer.actions;

export default eventStore;