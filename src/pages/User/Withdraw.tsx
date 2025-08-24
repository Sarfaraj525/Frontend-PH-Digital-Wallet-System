/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const withdrawSchema = z.object({
  amount: z.number().min(10, "Minimum withdraw is 10৳"),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export default function Withdraw() {
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 10 },
  });

  const onSubmit = async (values: WithdrawFormValues) => {
    try {
      await withdrawMoney(values).unwrap();
      toast.success(`Withdrawn ৳${values.amount} successfully!`);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Withdraw failed!");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Withdraw Money</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (৳)</FormLabel>
                  <FormControl>
                    <input type="number" {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
