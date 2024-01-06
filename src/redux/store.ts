import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './features/product-slice';

export const store = configureStore({
  reducer: {
    ProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
