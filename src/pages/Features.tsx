import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Send,
  Wallet,
  TrendingUp,
  PhoneCall,
  History,
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router";
import React from "react";

type Feature = {
  title: string;
  desc: string;
  icon: React.ElementType;
};

const FEATURES: Feature[] = [
  {
    title: "Secure Payments",
    desc: "Bank-grade encryption, robust auth, and best-practice security across every transaction.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Transfers",
    desc: "Send money to users in seconds—by phone or email—with real-time status updates.",
    icon: Send,
  },
  {
    title: "Smart Wallet",
    desc: "Keep funds safe, view balances, and manage your day-to-day spending with ease.",
    icon: Wallet,
  },
  {
    title: "Low Fees",
    desc: "Transparent, competitive fees so more of your money goes where it matters.",
    icon: TrendingUp,
  },
  {
    title: "Agent Network",
    desc: "Cash-in and cash-out with vetted agents in your area for convenient access.",
    icon: PhoneCall,
  },
  {
    title: "Full History",
    desc: "Powerful filtering and search across all your transactions and statements.",
    icon: History,
  },
  {
    title: "Savings Goals",
    desc: "Create goals and set aside money automatically to build better habits.",
    icon: PiggyBank,
  },
  {
    title: "Insights & Charts",
    desc: "Visualize your activity with charts—spot trends and make informed decisions.",
    icon: BarChart3,
  },
];

export default function Features() {
  return (
    <main className="min-h-screen">
      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20 dark:opacity-10">
        <img
          alt="background pattern"
          src="https://www.transparenttextures.com/patterns/cubes.png"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border px-3 py-1 text-xl font-medium tracking-wide">
            Features
          </span>
          <h1 className="mt-4 text-pretty text-3xl font-bold tracking-tight md:text-5xl">
            Everything you need to{" "}
            <span className="text-primary">move money</span>—fast, safe, and simple
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Built for users, agents, and admins. Secure auth, real-time transfers,
            detailed history, and beautiful dashboards—right out of the box.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="group relative h-full rounded-2xl border bg-background/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-background/80 transition group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 scale-x-0 bg-primary/80 transition-all duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="mt-12 rounded-2xl border bg-primary/5 p-6 text-center md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Start using your digital wallet today
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Join in minutes. Add money, send money, track history, and get insights—on any device.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
