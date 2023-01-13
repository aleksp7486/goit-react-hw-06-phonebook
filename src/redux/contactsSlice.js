import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialContactsState = {
  contactsList: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContact(state, action) {
      state.contactsList.push(action.payload);
    },
    deleteContact(state, action) {
      const index = state.contactsList.findIndex(
        contact => contact.id === action.payload
      );
      state.contactsList.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: 'contactsList',
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
