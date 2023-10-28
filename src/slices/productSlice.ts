import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../interfaces/product';

const initState = {
    products:[],
} as {products:IProduct[]}

const productSlice = createSlice({
   name: 'products',
   initialState: initState,
   reducers: {
      saveProduct: (state, action) => {
         state.products = [action.payload];
      },
    //   deleteTokenAndUser: (state) => {
    //      state.accessToken = '';
    //      state.user = {} as IUser;
    //   }
   }
});

export const { saveProduct  } = productSlice.actions;

export default productSlice.reducer;