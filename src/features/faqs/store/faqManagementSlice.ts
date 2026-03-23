import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type FaqItem, INITIAL_FAQ_ITEMS } from '../model';

type FaqManagementState = {
  items: FaqItem[];
};

const initialState: FaqManagementState = {
  items: INITIAL_FAQ_ITEMS,
};

const faqManagementSlice = createSlice({
  name: 'faqManagement',
  initialState,
  reducers: {
    createFaq: (state, action: PayloadAction<FaqItem>) => {
      state.items.unshift(action.payload);
    },
    updateFaq: (state, action: PayloadAction<FaqItem>) => {
      state.items = state.items.map((faq) => {
        return faq.id === action.payload.id ? action.payload : faq;
      });
    },
    deleteFaq: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((faq) => faq.id !== action.payload);
    },
  },
});

export const { createFaq, deleteFaq, updateFaq } = faqManagementSlice.actions;
export const faqManagementReducer = faqManagementSlice.reducer;
