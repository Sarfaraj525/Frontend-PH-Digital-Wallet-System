/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAgentProfileQuery, useUpdateAgentProfileMutation } from "@/redux/features/agent/agent.api";

const AgentProfile = () => {
  const { data: profile, isLoading } = useGetAgentProfileQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateAgentProfileMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const handleUpdate = async () => {
    if (!name || !email) return alert("Name and email are required");
    try {
      await updateProfile({ name, email, password }).unwrap();
      alert("Profile updated successfully");
      setPassword("");
    } catch (error: any) {
      alert(error.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Agent Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentProfile;
