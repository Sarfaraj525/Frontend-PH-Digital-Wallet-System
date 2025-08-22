

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Loader2, Mail, User, MessageSquare } from "lucide-react"
import { toast } from "sonner"


const Contact: React.FC = () => {

  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    toast.success("Message Sent! We’ll get back to you shortly.");
  }, 1500);
};


  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl border border-indigo-100 dark:border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-sky-600 dark:text-indigo-400">
            Contact Us
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Have questions? Fill out the form and we’ll respond as soon as possible.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                <User className="h-4 w-4 text-indigo-500" /> Name
              </label>
              <Input type="text" placeholder="Enter your name" required />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                <Mail className="h-4 w-4 text-indigo-500" /> Email
              </label>
              <Input type="email" placeholder="Enter your email" required />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                <MessageSquare className="h-4 w-4 text-indigo-500" /> Message
              </label>
              <Textarea placeholder="Write your message..." rows={4} required />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-sky-600 hover:bg-indigo-700 text-white rounded-xl shadow-md"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Contact
