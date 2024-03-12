import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {email: 'test@gmail.com'},
  reducers: {
    updateName: (state: any, {type, payload}: PayloadAction<string>) => {
      state.email = payload;
    },
  },
})
