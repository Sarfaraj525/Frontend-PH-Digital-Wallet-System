/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDepositMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const depositSchema = z.object({
  amount: z.number().min(10, "Minimum deposit is 10৳"),
  userEmail: z.string().email("Enter valid user email").optional(),
});

type DepositFormValues = z.infer<typeof depositSchema>;

export default function Deposit() {
  const [depositMoney, { isLoading }] = useDepositMoneyMutation();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: 100, userEmail: "" },
  });

  const onSubmit = async (values: DepositFormValues) => {
    try {
      // If email is empty, treat as self-deposit
      const payload = values.userEmail ? values : { amount: values.amount };
      await depositMoney(payload).unwrap();
      toast.success(`Deposited ৳${values.amount} successfully!`);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Deposit failed!");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Deposit Money</CardTitle>
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
                    <input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="input w-full border rounded p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="userEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Email (Agent only)</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter user's email (optional)"
                      {...field}
                      className="input w-full border rounded p-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
