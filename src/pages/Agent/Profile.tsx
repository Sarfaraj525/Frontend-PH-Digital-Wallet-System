/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useUpdateAgentProfileMutation } from "@/redux/features/agent/agent.api";


const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
//   const [updateProfile] = useUpdateAgentProfileMutation();

  const handleUpdate = async () => {
    try {
    //   await updateProfile({ name, password }).unwrap();
      alert("Profile updated successfully");
    } catch (error: any) {
      alert(error.data?.message || error.message);
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Profile Management</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 rounded">
          Update Profile
        </button>
      </CardContent>
    </Card>
  );
};

export default Profile;
