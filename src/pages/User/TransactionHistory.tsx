/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetTransactionsQuery } from "@/redux/features/wallet/wallet.api";
// import { Transaction } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/types/transaction";

const typeLabels: Record<string, string> = {
  add_money: "Deposit",
  withdraw: "Withdraw",
  send_money: "Send Money",
  cash_in: "Cash In",
  cash_out: "Cash Out",
};

export default function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading, refetch } = useGetTransactionsQuery({
    limit: 5,
  });

  // Adjust the typing to match the expected API response structure
  type TransactionsApiResponse = {
    data: Transaction[];
    meta: { page: number; totalPages: number };
  };

  const typedData = data as TransactionsApiResponse | undefined;
  const transactions: Transaction[] = typedData?.data ?? [];
  const meta = typedData?.meta;

  const handleApplyFilters = () => {
    setPage(1);
    refetch();
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <select
            className="border rounded p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="add_money">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="send_money">Send Money</option>
            <option value="cash_in">Cash In</option>
            <option value="cash_out">Cash Out</option>
          </select>

          <input
            type="date"
            className="border rounded p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button onClick={handleApplyFilters}>Apply</Button>
        </div>

        {/* Table */}
        {isLoading ? (
          <p>Loading...</p>
        ) : !transactions.length ? (
          <p>No transactions found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((txn) => {
              const isNegative =
                txn.type === "withdraw" || txn.type === "cash_out";
              const isPositive =
                txn.type === "add_money" || txn.type === "cash_in";

              return (
                <li
                  key={txn._id}
                  className="flex justify-between py-2 text-sm"
                >
                  <span>
                    {typeLabels[txn.type] || txn.type}{" "}
                    <span className="text-gray-500">
                      ({new Date(txn.createdAt).toLocaleDateString()})
                    </span>
                  </span>
                  <span
                    className={`font-medium ${
                      isNegative
                        ? "text-red-600"
                        : isPositive
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {isNegative ? "-" : "+"}৳ {txn.amount}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span>
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
