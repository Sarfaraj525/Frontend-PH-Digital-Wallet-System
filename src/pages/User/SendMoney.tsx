/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const sendMoneySchema = z.object({
  recipient: z.string().min(3, "Recipient is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
});

type SendMoneyFormValues = z.infer<typeof sendMoneySchema>;

export default function SendMoney() {
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const form = useForm<SendMoneyFormValues>({ resolver: zodResolver(sendMoneySchema) });

  const onSubmit = async (values: SendMoneyFormValues) => {
    try {
      await sendMoney(values).unwrap();
      toast.success(`Sent ৳${values.amount} to ${values.recipient} successfully!`);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Send Money failed!");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="recipient"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient (Phone/Email)</FormLabel>
                  <FormControl>
                    <input type="text" {...field} className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {isLoading ? "Processing..." : "Send Money"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
