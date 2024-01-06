import { createSlice } from '@reduxjs/toolkit';

type Product = {
  id: number;
  name: string;
  type:string;
  done: boolean;
};

type ProductState = {
  list: Product[];
};

const initialState: ProductState = {
  list: [],
};

export const Product = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const Product = state.list.find((Product) => Product.name === action.payload.name);
      if (!Product) {
        state.list.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.list = state.list.filter((Product) => Product.id !== action.payload);
    },
    toggleProduct: (state, action) => {
      const Product = state.list.find((Product) => Product.id === action.payload);
      if (Product) {
        Product.done = !Product.done;
      }
    },
    editProduct: (state, action) => {
      const { id, name, type } = action.payload;
      const ProductToEdit = state.list.find((Product) => Product.id === id);
      if (ProductToEdit) {
        ProductToEdit.name = name;
        ProductToEdit.type = type;
      }
    },
  },
});

export const { addProduct, removeProduct, toggleProduct,editProduct } = Product.actions;
export default Product.reducer;
