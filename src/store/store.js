import { configureStore } from "@reduxjs/toolkit";
import carritoCompras from "../slices/carritoCompras"

export const store = configureStore({
  reducer: {
    carrito: carritoCompras,
  },
});