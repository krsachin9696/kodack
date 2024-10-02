import { createSlice } from '@reduxjs/toolkit'

interface ServiceState {
  isAuthenticated: boolean
  user: null
}

interface AuthServicesState {
  auth: ServiceState
}

const initialState: AuthServicesState = {
  auth: { isAuthenticated: false, user: null },
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.auth.isAuthenticated = action.payload
    },
    authLogin: (state, action) => {
      state.auth.isAuthenticated = true
      state.auth.user = action.payload
    },
    authLogout: (state) => {
      state.auth.isAuthenticated = false
      state.auth.user = null
    },
    setAuthUser: (state, action) => {
      state.auth.user = action.payload
    },
  },
})

export const { authLogin, authLogout, setAuthState, setAuthUser } =
  authSlice.actions
export default authSlice.reducer
