import { configureStore } from "@reduxjs/toolkit";
import { eventStoreReducer } from './EventIndex';

const store = configureStore({ reducer: {
    events: eventStoreReducer.reducer
  }});

export default store;