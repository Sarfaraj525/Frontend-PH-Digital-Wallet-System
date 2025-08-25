// import { configureStore } from '@reduxjs/toolkit'
// import { baseApi } from './baseApi';
// import { setupListeners } from '@reduxjs/toolkit/query';

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

// setupListeners(store.dispatch);

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
// import { agentApi } from "./agent/agent.api"; // <-- নিশ্চিত যোগ করা হয়েছে
import { setupListeners } from "@reduxjs/toolkit/query";
import { agentApi } from "./features/agent/agent.api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer, // <-- agentApi reducer যোগ করুন
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, agentApi.middleware), // <-- agentApi middleware যোগ
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
