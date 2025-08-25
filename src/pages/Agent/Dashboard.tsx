/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentSummaryQuery, useGetAgentTransactionsQuery } from "@/redux/features/agent/agent.api";

const Dashboard = () => {
  const { data: summary, isLoading: summaryLoading } = useGetAgentSummaryQuery();
  const { data: txnResponse, isLoading: txnLoading } = useGetAgentTransactionsQuery();
  const transactions = txnResponse?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      {/* Cash In/Out Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Cash In / Cash Out Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          {summaryLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="text-green-600 font-bold">Cash In: ৳{summary?.cashIn ?? 0}</div>
              <div className="text-red-600 font-bold">Cash Out: ৳{summary?.cashOut ?? 0}</div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {txnLoading ? (
            <p>Loading...</p>
          ) : transactions.length ? (
            <ul className="divide-y divide-gray-200">
              {transactions.map((txn: any) => (
                <li key={txn._id} className="flex justify-between py-2 text-sm">
                  <span>{txn.type}</span>
                  <span>৳ {txn.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
