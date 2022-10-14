import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '@/models/Product';

interface ProductsState {
  products: Product[];
  product?: Product;
  quickEdit: Product | null;
}

const initialState = {
  products: [],
  product: undefined,
  quickEdit: null,
} as ProductsState;

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setProductQuickEdit: (state, action: PayloadAction<Product | null>) => {
      state.quickEdit = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setProductQuickEdit, setProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
