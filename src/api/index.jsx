import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "/products" }),
    }),
    getCategories: builder.query({
      query: () => ({ url: "/categories" }),
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = api;
