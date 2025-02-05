import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/types.ts';

// Define a type for the slice state
interface IUserState {
  user: IUser | null;
  isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signIn: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signUp, signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
