/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetTransactionsQuery, useGetUserWalletQuery,  } from "@/redux/features/wallet/wallet.api";
import { ArrowDownCircle, ArrowUpCircle, Send } from "lucide-react";
import { Link } from "react-router";


const Dashboard = () => {
  const { data: wallet, isLoading: walletLoading } = useGetUserWalletQuery();
  const { data: transactions, isLoading: txnLoading } = useGetTransactionsQuery({});

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
        <CardContent className="flex gap-4">
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

      {/* Recent Transactions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {txnLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : transactions?.length ? (
            <ul className="divide-y divide-gray-200">
              {transactions.slice(0, 5).map((txn: any) => (
                <li key={txn._id} className="flex justify-between py-2 text-sm">
                  <span>{txn.type}</span>
                  <span
                    className={`font-medium ${
                      txn.type === "deposit"
                        ? "text-green-600"
                        : txn.type === "withdraw"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {txn.type === "withdraw" ? "-" : "+"}৳ {txn.amount}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
