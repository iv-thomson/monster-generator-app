import { APP_API } from '@/constants';
import { postRequest } from '@/core/http';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

const AUTH_TOKEN_KEY = 'authToken';

export interface LoginState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

interface loginPayload {
  username: string;
  password: string;
}

const initialState: LoginState = {
  error: '',
  loading: false,
  token: localStorage.getItem(AUTH_TOKEN_KEY) || null,
};

export const login = createAsyncThunk(
  'login',
  async (payload: loginPayload) => {
    const response = await postRequest(`${APP_API}/login`, payload);
    if (!response.ok) {
      const error = await response.text();

      throw new Error(error);
    }
    const { token } = await response.json();

    return token;
  },
);

const loginController = (builder: ActionReducerMapBuilder<LoginState>) => {
  builder.addCase(login.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(login.fulfilled, (state, action) => {
    state.loading = false;
    state.token = action.payload;
    localStorage.setItem(AUTH_TOKEN_KEY, action.payload);
  });
  builder.addCase(login.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to login';
  });
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    loginController(builder);
  },
});

export const loginReducer = loginSlice.reducer;
export const { setToken } = loginSlice.actions;
