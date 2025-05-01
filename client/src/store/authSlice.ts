import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Load user from localStorage if available
const userFromStorage = localStorage.getItem('user');
const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  isAuthenticated: !!userFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const userWithAvatar = {
        ...action.payload,
        avatar: action.payload.avatar ?? `${Math.floor(Math.random() * 6) + 1}.jpg`,
      };

      // state.user = action.payload;
      state.user = userWithAvatar;
      state.isAuthenticated = true;
      // Save the user to localStorage
      // localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Remove user from localStorage
      // localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
