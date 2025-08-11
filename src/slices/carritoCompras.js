import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
};

const carritoCompras = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    // Añadir un nuevo producto
    addProduct: (state, action) => {
      state.elements.push(action.payload);
    },

    // Eliminar producto por ID
    deleteProduct: (state, action) => {
      state.elements = state.elements.filter(
        (item) => item.id !== action.payload
      );
    },

    // Editar cantidad de producto por ID
    editProduct: (state, action) => {
      const { id, cantidad } = action.payload;
      const product = state.elements.find((item) => item.id === id);
      if (product) {
        product.cantidad = cantidad;
      }
    },
  },
});

export const { addProduct, deleteProduct, editProduct } =
  carritoCompras.actions;
  
export default carritoCompras.reducer;