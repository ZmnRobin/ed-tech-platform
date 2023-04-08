import { configureStore } from '@reduxjs/toolkit';
import { userApiSlice } from '../features/user/userApiSlice';
import authSliceReducer from '../features/user/auth/authSlice';
import userSliceReducer from '../features/user/userSlice'
import { apiSlice } from '../features/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authSliceReducer,
    assignment:userSliceReducer,

  },
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(userApiSlice.middleware),
});
