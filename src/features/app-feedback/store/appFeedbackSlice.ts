import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AppFeedbackMessage = {
  id: string;
  title: string;
  description?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
};

type AppFeedbackState = {
  messages: AppFeedbackMessage[];
};

const initialState: AppFeedbackState = {
  messages: [],
};

const appFeedbackSlice = createSlice({
  name: 'appFeedback',
  initialState,
  reducers: {
    enqueueMessage: (state, action: PayloadAction<AppFeedbackMessage>) => {
      state.messages.push(action.payload);
    },
    dequeueMessage: (state) => {
      state.messages.shift();
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { enqueueMessage, dequeueMessage, clearMessages } = appFeedbackSlice.actions;
export const appFeedbackReducer = appFeedbackSlice.reducer;
