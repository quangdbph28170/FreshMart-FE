import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEvaluationFull, IEvaluation } from '../interfaces/evaluation'
import { IResponse } from '../interfaces/base';

const evaluation = createApi({
   reducerPath: 'evaluation',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8080/api',
      credentials: 'include'
   }),
   tagTypes: ['evaluation'],
   endpoints: (builder) => ({
      getAllEvaluation: builder.query<IResponse<IEvaluationFull[]>, void>({
         query: () => ({
            url: '/evaluation',
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['evaluation']
      }),
      getOneEvaluationById: builder.query<IResponse<IEvaluationFull>,string>({
         query: (id) => ({
            url: '/evaluation/' + id,
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['evaluation']
      }),
      getEvaluationByProductId: builder.query<IResponse<IEvaluationFull[]>,string>({
        query: (id) => ({
           url: '/evaluationByProductId/' + id,
           method: 'GET',
           credentials: 'include'
        }),
        providesTags: ['evaluation']
     }),
      
      addEvaluation: builder.mutation<void, IEvaluation>({
         query: (item) => ({
            url: '/evaluation/',
            method: 'POST',
            body: item,
         }),
         invalidatesTags: ['evaluation'],
      }),
      updateEvaluation: builder.mutation<IResponse<IEvaluationFull>,IEvaluation&{id:string}>({
         query: ({ id, ...body }) => ({
            url: '/evaluation/' + id,
            method: 'PATCH',
            body: body,
         }),
         invalidatesTags: ['evaluation'],
      })
   })
});

export const { useGetAllEvaluationQuery, useGetOneEvaluationByIdQuery, useGetEvaluationByProductIdQuery, useAddEvaluationMutation, useUpdateEvaluationMutation } = evaluation;
export default evaluation;