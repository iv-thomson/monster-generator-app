import { logout } from '@/store/login';

export const handleUnauthorized = (response: Response, thunkAPI) => {
  if (response.status === 401) {
    thunkAPI.dispatch(logout());
  }
};
