import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type RealtimeState = {
  notificationsConnected: boolean;
  lastNotification?: { name: string; payload: unknown; atIso: string };
};

const initialState: RealtimeState = {
  notificationsConnected: false,
};

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setNotificationsConnected: (state, action: PayloadAction<boolean>) => {
      state.notificationsConnected = action.payload;
    },
    setLastNotification: (
      state,
      action: PayloadAction<{ name: string; payload: unknown; atIso: string }>,
    ) => {
      state.lastNotification = action.payload;
    },
    clearLastNotification: (state) => {
      state.lastNotification = undefined;
    },
  },
});

export const { setNotificationsConnected, setLastNotification, clearLastNotification } =
  realtimeSlice.actions;

export const realtimeReducer = realtimeSlice.reducer;
