import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Utensils, TrendingUp, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Zamato Partner" },
      { name: "description", content: "Sign in to your Zamato restaurant partner account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-sidebar text-sidebar-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">zamato</span>
        </div>
        <div className="relative space-y-6">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Run your restaurant, <span className="text-primary">not the paperwork.</span>
          </h2>
          <p className="max-w-md text-sidebar-foreground/70">
            One dashboard for orders, menu, customers, payouts and marketing — built for busy kitchens.
          </p>
          <div className="grid gap-3">
            {[
              { icon: Utensils, t: "Live order tracking & prep alerts" },
              { icon: TrendingUp, t: "Monthly revenue & insights" },
              { icon: ShieldCheck, t: "Secure wallet & instant payouts" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
                <Icon className="h-4 w-4 text-primary" /><span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-sidebar-foreground/50">© 2026 Zamato Partner Services</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/60 p-8 shadow-[var(--shadow-card)]">
          <div className="mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary"><Flame className="h-5 w-5 text-primary-foreground" /></div>
              <span className="font-display text-xl font-bold">zamato</span>
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold">Partner Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your restaurant.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/onboarding" }); }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email or phone</Label>
              <Input id="email" placeholder="owner@spicepalace.in" defaultValue="owner@spicepalace.in" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pass">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <Input id="pass" type="password" defaultValue="demo1234" />
            </div>
            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]">Sign in</Button>
            <Button type="button" variant="outline" className="w-full h-11" onClick={() => navigate({ to: "/" })}>Skip to dashboard</Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            New partner? <Link to="/onboarding" className="font-semibold text-primary hover:underline">Onboard your restaurant</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
