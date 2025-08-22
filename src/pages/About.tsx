import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Users } from "lucide-react";
import { Link } from "react-router";

const About: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="max-w-3xl shadow-lg rounded-2xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-orange-600 bg-clip-text text-transparent">
            About Our Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-600">
          <p className="text-lg leading-relaxed text-center">
            We aim to provide <span className="font-semibold">inclusive</span>,{" "}
            <span className="font-semibold">fast</span>, and{" "}
            <span className="font-semibold">secure</span> digital payments across your
            community. Our team is committed to{" "}
            <span className="text-sky-600 font-medium">trust</span>,{" "}
            <span className="text-sky-600 font-medium">security</span>, and{" "}
            <span className="text-sky-600 font-medium">continuous innovation</span>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-purple-500 mb-2" />
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-gray-500 text-center">
                Enterprise-level encryption keeps your money safe.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-10 h-10 text-pink-500 mb-2" />
              <h3 className="font-semibold">Fast</h3>
              <p className="text-sm text-gray-500 text-center">
                Lightning-fast transactions anytime, anywhere.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 text-indigo-500 mb-2" />
              <h3 className="font-semibold">Inclusive</h3>
              <p className="text-sm text-gray-500 text-center">
                Designed for everyone in your community.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
