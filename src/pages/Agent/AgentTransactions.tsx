/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentTransactionsQuery } from "@/redux/features/agent/agent.api";

const AgentTransactions = () => {
  const { data: txnResponse, isLoading } = useGetAgentTransactionsQuery();
  const transactions = txnResponse?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transactions Handled by You</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : transactions.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">User Email</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((txn: any, index: number) => (
                    <tr key={txn._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{index + 1}</td>
                      <td className="px-4 py-2 text-sm">{txn.receiver?.email || txn.sender?.email}</td>
                      <td className="px-4 py-2 text-sm">{txn.type}</td>
                      <td className="px-4 py-2 text-sm">৳ {txn.amount}</td>
                      <td className="px-4 py-2 text-sm">{new Date(txn.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentTransactions;
