/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useGetUserQuery, useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { data: user, isLoading } = useGetUserQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) form.reset({ name: user.name, phone: user.phone, password: "" });
  }, [user]);

const onSubmit = async (values: ProfileFormValues) => {
  try {
    // Remove empty strings or undefined
    const payload = Object.fromEntries(
      Object.entries(values).filter(
        ([, val]) => val !== "" && val !== undefined
      )
    );

    if (Object.keys(payload).length === 0) {
      toast.error("Please fill at least one field to update");
      return;
    }

    const res = await updateProfile(payload).unwrap();
    toast.success(res.message || "Profile updated successfully!");
  } catch (err: any) {
    toast.error(err?.data?.message || "Update failed!");
  }
};



  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><input {...field} className="input border rounded w-full p-2" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="phone" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><input {...field} className="input border rounded w-full p-2" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl><input type="password" {...field} className="input border rounded w-full p-2" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full" disabled={updating}>{updating ? "Updating..." : "Update Profile"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
