import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://electricity-store-api.vercel.app",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "/products" }),
    }),
    getCategories: builder.query({
      query: () => ({ url: "/categories" }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useLazyGetProductsQuery,
  useLazyGetCategoriesQuery,
} = api;
