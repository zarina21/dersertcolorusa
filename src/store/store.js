import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import carritoCompras from '../slices/carritoCompras';

const makeStore = () =>
  configureStore({
    reducer: {
      carrito: carritoCompras,
    },
  });

export const wrapper = createWrapper(makeStore);
