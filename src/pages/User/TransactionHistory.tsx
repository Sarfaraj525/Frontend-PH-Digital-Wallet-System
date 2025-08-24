/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTransactionsQuery } from "@/redux/features/wallet/wallet.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionHistory() {
  const { data: transactions, isLoading } = useGetTransactionsQuery({});

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : !transactions?.length ? (
          <p>No transactions found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((txn: any) => (
              <li key={txn._id} className="flex justify-between py-2">
                <span>{txn.type}</span>
                <span
                  className={`font-medium ${
                    txn.type === "withdraw"
                      ? "text-red-600"
                      : txn.type === "deposit"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {txn.type === "withdraw" ? "-" : "+"}৳ {txn.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
