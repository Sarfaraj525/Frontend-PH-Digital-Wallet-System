/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDepositMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
// import { useAppSelector } from "@/redux/hooks";

const depositSchema = z.object({
  amount: z.number().min(10, "Minimum deposit is 10৳"),
  agentEmail: z.string().email("Enter valid agent email").optional(),
});

type DepositFormValues = z.infer<typeof depositSchema>;

export default function Deposit() {
  const [depositMoney, { isLoading }] = useDepositMoneyMutation();
  // get logged-in user (removed unused 'user' variable)

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: 100, agentEmail: "" },
  });

  const onSubmit = async (values: DepositFormValues) => {
    try {
      // Always deposit to own wallet
      // If agentEmail is provided, send it as a reference for backend
      const payload: any = { amount: values.amount };
      if (values.agentEmail) {
        payload.agentEmail = values.agentEmail;
      }

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
              name="agentEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter agent's email"
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
