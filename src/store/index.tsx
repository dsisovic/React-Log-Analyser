import { configureStore } from "@reduxjs/toolkit";
import { eventStoreReducer } from './EventIndex';
import { usersStoreReducer } from './UsersIndex';

const store = configureStore({ reducer: {
    events: eventStoreReducer.reducer,
    users: usersStoreReducer.reducer
  }});

export default store;