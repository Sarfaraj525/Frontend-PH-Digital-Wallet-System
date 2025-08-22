
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 min-h-[80vh] flex items-center bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <img
          alt="background pattern"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Your <span className="text-primary">Digital Wallet</span> for
            Everyday Transactions
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8">
            Send money, deposit, withdraw, and manage your wallet securely. 
            Whether you are a <span className="font-medium">User</span>,{" "}
            <span className="font-medium">Agent</span>, or{" "}
            <span className="font-medium">Admin</span>, everything you need is just a tap away.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
