/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCashOutMutation, useGetAgentSummaryQuery, useGetAgentTransactionsQuery } from "@/redux/features/agent/agent.api";

const CashOut = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [cashOut] = useCashOutMutation();
  const { refetch: refetchSummary } = useGetAgentSummaryQuery();
  const { refetch: refetchTxns } = useGetAgentTransactionsQuery();

  const handleCashOut = async () => {
    if (!email || !amount) return alert("Enter email and amount");
    try {
      await cashOut({ userEmail: email, amount }).unwrap();
      alert("Cash-out successful");
      setEmail("");
      setAmount(0);
      refetchSummary();
      refetchTxns();
    } catch (error: any) {
      alert(error.data?.message || error.message);
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Cash Out</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 rounded w-full sm:w-32"
          />
          <button
            onClick={handleCashOut}
            className="bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Cash Out
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashOut;
