import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { RoomDbo } from "./models";

import roomsJson from "./rooms.json";

interface Set<t> {
  id: string;
  value: t;
}

const initialState = {
  rooms: roomsJson as RoomDbo[],
  status: "idle",
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<RoomDbo[]>) => {
      state.rooms = action.payload;
    },
    toggleMute: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        rooms: state.rooms.map((r) => {
          if (r.id !== action.payload) return r;
          return { ...r, muted: !r.muted };
        }),
      };
    },
    setVolume: (state, action: PayloadAction<Set<number>>) => {
      return {
        ...state,
        rooms: state.rooms.map((r) => {
          if (r.id !== action.payload.id) return r;
          return {
            ...r,
            volume: action.payload.value,
          };
        }),
      };
    },
  },
});

export const selectRoomById = (state: RootState, id: string) =>
  state.rooms.rooms.find((r) => r.id === id);

export const getState = createAsyncThunk("rooms/getState", async () => {
  const data = await fetch("/room");
  return await data.json();
});

export const { load, toggleMute, setVolume } = roomSlice.actions;

export default roomSlice.reducer;
