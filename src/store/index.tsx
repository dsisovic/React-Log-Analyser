import { configureStore } from "@reduxjs/toolkit";
import { eventStoreReducer } from './EventIndex';
import { usersStoreReducer } from './UsersIndex';
import { overviewStoreReducer } from './OverviewIndex';

const store = configureStore({
  reducer: {
    overview: overviewStoreReducer.reducer,
    users: usersStoreReducer.reducer,
    events: eventStoreReducer.reducer
  }
});

export default store;