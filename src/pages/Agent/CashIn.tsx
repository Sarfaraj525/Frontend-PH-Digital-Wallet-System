/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCashInMutation, useGetAgentSummaryQuery, useGetAgentTransactionsQuery } from "@/redux/features/agent/agent.api";
import { toast } from "sonner";

const CashIn = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [cashIn] = useCashInMutation();
  const { refetch: refetchSummary } = useGetAgentSummaryQuery();
  const { refetch: refetchTxns } = useGetAgentTransactionsQuery();

  const handleCashIn = async () => {
    if (!email || !amount) return toast.error("Enter email and amount");

    try {
      await cashIn({ userEmail: email, amount }).unwrap();
      toast.success("Cash-in successful");
      setEmail("");
      setAmount(0);
      refetchSummary();
      refetchTxns();
    } catch (error: any) {
      toast.error(error.data?.message || error.message);
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Cash In</CardTitle>
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
            onClick={handleCashIn}
            className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Cash In
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashIn;
