// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axiosBaseQuery from "@/redux/axiosBaseQuery";
// import { createApi } from "@reduxjs/toolkit/query/react";

// export const agentApi = createApi({
//   reducerPath: "agentApi",
//   baseQuery: axiosBaseQuery(),
//   tagTypes: ["Agent", "Transaction"],
//   endpoints: (builder) => ({
//     // Cash In a user
//     cashIn: builder.mutation<any, { userEmail: string; amount: number }>({
//       query: (body) => ({
//         url: "/cash-in",
//         method: "POST",
//         data: body,
//       }),
//       invalidatesTags: ["Transaction", "Agent"],
//     }),

//     // Cash Out a user
//     cashOut: builder.mutation<any, { userEmail: string; amount: number }>({
//       query: (body) => ({
//         url: "/cash-out",
//         method: "POST",
//         data: body,
//       }),
//       invalidatesTags: ["Transaction", "Agent"],
//     }),

//     // Get agent transactions
//     getAgentTransactions: builder.query<any, void>({
//       query: () => ({ url: "/transactions", method: "GET" }),
//       providesTags: ["Transaction"],
//     }),

//     // Agent summary (cash-in & cash-out)
//     getAgentSummary: builder.query<any, void>({
//       query: () => ({ url: "/summary", method: "GET" }),
//       providesTags: ["Agent"],
//     }),

//     // Agent profile
//     getAgentProfile: builder.query<any, void>({
//       query: () => ({ url: "/profile", method: "GET" }),
//       providesTags: ["Agent"],
//     }),

//     updateAgentProfile: builder.mutation<any, any>({
//       query: (body) => ({ url: "/profile", method: "PUT", data: body }),
//       invalidatesTags: ["Agent"],
//     }),
//   }),
// });

// export const {
//   useCashInMutation,
//   useCashOutMutation,
//   useGetAgentTransactionsQuery,
//   useGetAgentSummaryQuery,
//   useGetAgentProfileQuery,
//   useUpdateAgentProfileMutation,
// } = agentApi;



/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosBaseQuery from "@/redux/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Agent", "Transaction"],
  endpoints: (builder) => ({
    // Cash In a user
    cashIn: builder.mutation<any, { userEmail: string; amount: number }>({
      query: (body) => ({
        url: "/transactions/cash-in", // match backend route
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Transaction", "Agent"],
    }),

    // Cash Out a user
    cashOut: builder.mutation<any, { userEmail: string; amount: number }>({
      query: (body) => ({
        url: "/transactions/cash-out", // match backend route
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Transaction", "Agent"],
    }),

    // Get agent transactions
   // Get agent transactions (paginated if needed)
getAgentTransactions: builder.query<any, void>({
  query: () => ({ url: "/transactions/agent", method: "GET" }), // <-- dedicated agent endpoint
  providesTags: ["Transaction"],
}),


    // Agent summary (cash-in & cash-out)
    getAgentSummary: builder.query<any, void>({
      query: () => ({ url: "/transactions/agent-summary", method: "GET" }),
      providesTags: ["Agent"],
    }),
  }),
});

export const {
  useCashInMutation,
  useCashOutMutation,
  useGetAgentTransactionsQuery,
  useGetAgentSummaryQuery,
} = agentApi;
