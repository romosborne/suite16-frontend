import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/room/roomSlice";

const store = configureStore({
  reducer: {
    rooms: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
