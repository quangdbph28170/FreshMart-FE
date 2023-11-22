import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IQueryParam, IResponse, IResponseHasPaginate } from '../interfaces/base';
import {
   IObjIdForGetRelatedProducts,
   IProduct,
   IProductExpanded,
   InputProduct,
   InputSaleProduct
} from '../interfaces/product';
import { paramTransformer } from '../utils/transformParams';

const productApi = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      prepareHeaders: (headers) => {
         headers.set('Access-Control-Allow-Origin', '*');
         headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE');
         headers.set('Access-Control-Allow-Headers', 'Content-Type');
         return headers;
      },
      credentials: 'include'
   }),

   reducerPath: 'products',
   tagTypes: ['product'],
   endpoints: (builder) => ({
      getAllWithoutExpand: builder.query<IResponseHasPaginate<IProduct>, Partial<Omit<IQueryParam, '  '>>>({
         query: (params) => {
            return {
               url: '/products',
               params: paramTransformer(params)
            };
         },
         providesTags: ['product']
      }),
      getAllExpand: builder.query<
         IResponseHasPaginate<IProductExpanded>,
         Partial<IQueryParam> & Pick<IQueryParam, 'expand'>
      >({
         query: (params) => {
            return {
               url: '/products',
               params: paramTransformer(params)
            };
         },
         providesTags: ['product']
      }),
      getProductSoldDesc: builder.query<IResponse<IProductExpanded[]>, void>({
         query: () => {
            return {
               url: '/products-sold'
            };
         }
      }),
      getOneProduct: builder.query<IResponse<IProductExpanded>, string>({
         query: (idProduct) => {
            return {
               url: '/products/' + idProduct
            };
         },
         providesTags: ['product']
      }),
      getRelatedProducts: builder.query<IResponse<IProductExpanded[]>, object>({
         query: ({ idCategory, idProduct }: IObjIdForGetRelatedProducts) => {
            return {
               url: '/products/related/' + idCategory + '/' + idProduct
            };
         }
      }),
      addProduct: builder.mutation<IProduct, InputProduct>({
         query: (body) => {
            return {
               url: '/products',
               method: 'post',
               body: body
            };
         },
         invalidatesTags: ['product']
      }),
      updateProduct: builder.mutation<IProduct, InputProduct & { idProduct: string }>({
         query: ({ idProduct, ...body }) => {
            return {
               url: '/products/' + idProduct,
               method: 'PATCH',
               body: body
            };
         },
         invalidatesTags: (result) => [{ type: 'product', id: result?._id }]
      }),
      removeProduct: builder.mutation<IProduct, string>({
         query: (id) => {
            return {
               url: '/products/' + id,
               method: 'delete'
            };
         },
         invalidatesTags: ['product']
      }),
      createSaleProduct: builder.mutation<IResponse<IProductExpanded>, InputSaleProduct>({
         query: (body) => {
            return {
               url: '/products-process',
               method: 'post',
               body
            };
         },
         invalidatesTags: ['product']
      })
   })
});

export const {
   useGetProductSoldDescQuery,
   useUpdateProductMutation,
   useGetAllWithoutExpandQuery,
   useGetAllExpandQuery,
   useGetRelatedProductsQuery,
   useAddProductMutation,
   useGetOneProductQuery,
   useRemoveProductMutation,
   useCreateSaleProductMutation
} = productApi;

export default productApi;
