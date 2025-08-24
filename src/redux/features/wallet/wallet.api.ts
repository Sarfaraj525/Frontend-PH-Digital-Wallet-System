/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get user wallet info
    getUserWallet: builder.query<{ balance: number }, void>({
      query: () => ({ url: "/wallet/me", method: "GET" }),
      providesTags: ["USER"],
    }),

    // ✅ Get transactions (recent)
    getTransactions: builder.query<any[], { limit?: number }>({
      query: ({ limit }) => ({
        url: `/wallet/my-transactions?limit=${limit ?? 10}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // ✅ Deposit money (User -> own wallet)
    depositMoney: builder.mutation<
      { success: boolean; message: string },
      { amount: number }
    >({
      query: (data) => ({
        url: "/wallet/me/add-money",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    // ✅ Withdraw money
    withdrawMoney: builder.mutation<
      { success: boolean; message: string },
      { amount: number }
    >({
      query: (data) => ({
        url: "/wallet/me/withdraw",
        method: "POST",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    // ✅ Send money to another user
    sendMoney: builder.mutation<
  { success: boolean; message: string },
  { recipient: string; amount: number }
>({
  query: (body) => ({
    url: "/wallet/me/send-money",
    method: "POST",
    data: {
      recipientPhone: body.recipient, // <-- map to backend field
      amount: body.amount,
    },
  }),
  invalidatesTags: ["USER"],
}),

  }),
});

export const {
  useGetUserWalletQuery,
  useGetTransactionsQuery,
  useDepositMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
} = walletApi;
