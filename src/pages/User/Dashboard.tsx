/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetTransactionsQuery, useGetUserWalletQuery } from "@/redux/features/wallet/wallet.api";
import { ArrowDownCircle, ArrowUpCircle, Send } from "lucide-react";
import { Link } from "react-router";

const typeLabels: Record<string, string> = {
  add_money: "Deposit",
  withdraw: "Withdraw",
  send_money: "Send Money",
  cash_in: "Cash In",
  cash_out: "Cash Out",
};

const Dashboard = () => {
  const { data: wallet, isLoading: walletLoading } = useGetUserWalletQuery();

  // Fetch only 5 most recent transactions
  const { data: txnResponse, isLoading: txnLoading } = useGetTransactionsQuery({ limit: 5 });

  const transactions =
    Array.isArray(txnResponse)
      ? txnResponse
      : txnResponse && typeof txnResponse === "object" && "data" in txnResponse && Array.isArray((txnResponse as any).data)
      ? (txnResponse as any).data
      : [];

  const getLabelColor = (type: string) => {
    if (type === "withdraw" || type === "cash_out") return "text-red-600";
    if (type === "add_money" || type === "cash_in") return "text-green-600";
    return "text-blue-600";
  };

  const formatAmount = (txn: any) => {
    return (txn.type === "withdraw" || txn.type === "cash_out" ? "-" : "+") + "৳ " + txn.amount;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Wallet Balance */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          {walletLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-green-600">
              ৳ {wallet?.balance?.toFixed(2) ?? "0.00"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Link to="/user/deposit">
            <Button className="flex items-center gap-2">
              <ArrowDownCircle className="w-4 h-4" /> Deposit
            </Button>
          </Link>
          <Link to="/user/withdraw">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpCircle className="w-4 h-4" /> Withdraw
            </Button>
          </Link>
          <Link to="/user/send-money">
            <Button variant="secondary" className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Send Money
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Transactions (show only top 5) */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {txnLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : transactions.length ? (
            <ul className="divide-y divide-gray-200">
              {transactions.slice(0, 5).map((txn: any) => (
                <li key={txn._id} className="flex justify-between py-2 text-sm">
                  <span>
                    {typeLabels[txn.type] || txn.type}{" "}
                    <span className="text-gray-500">
                      ({new Date(txn.createdAt).toLocaleDateString()})
                    </span>
                  </span>
                  <span className={`font-medium ${getLabelColor(txn.type)}`}>
                    {formatAmount(txn)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent transactions.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
