import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flame, Check, Store, MapPin, FileText, Utensils } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — Zamato Partner" },
      { name: "description", content: "Set up your restaurant on Zamato in a few quick steps." },
    ],
  }),
  component: Onboarding,
});

const steps = [
  { icon: Store, title: "Restaurant details", desc: "Name, cuisine, phone" },
  { icon: MapPin, title: "Location & hours", desc: "Address and timings" },
  { icon: FileText, title: "Documents", desc: "FSSAI, GST, PAN" },
  { icon: Utensils, title: "Menu setup", desc: "Add first few dishes" },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const isLast = step === steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary"><Flame className="h-5 w-5 text-primary-foreground" /></div>
            <span className="font-display text-xl font-bold">zamato</span>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Partner Onboarding</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/" })}>Skip for now</Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-2">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.title}
                onClick={() => setStep(i)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                  active ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]" : "border-border hover:bg-muted/50"
                }`}
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${done ? "bg-success text-success-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Step {i + 1}</p>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </aside>

        <Card className="p-8 shadow-[var(--shadow-card)]">
          <h1 className="font-display text-2xl font-bold">{steps[step].title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{steps[step].desc}</p>

          <div className="mt-6 grid gap-4">
            {step === 0 && (
              <>
                <Field label="Restaurant name" defaultValue="Spice Palace" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Owner name" defaultValue="Suresh Patel" />
                  <Field label="Phone" defaultValue="+91 98765 43210" />
                </div>
                <Field label="Cuisine" defaultValue="North Indian, Biryani, Chinese" />
              </>
            )}
            {step === 1 && (
              <>
                <Field label="Full address" as="textarea" defaultValue="Shop 12, MG Road, Bandra West, Mumbai 400050" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" defaultValue="Mumbai" />
                  <Field label="Pincode" defaultValue="400050" />
                  <Field label="Landmark" defaultValue="Near Metro" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Opens at" defaultValue="10:00 AM" />
                  <Field label="Closes at" defaultValue="11:30 PM" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <Field label="FSSAI License Number" defaultValue="12345678901234" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="GST Number" defaultValue="27ABCDE1234F1Z5" />
                  <Field label="PAN Number" defaultValue="ABCDE1234F" />
                </div>
                <div className="rounded-lg border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  Drag & drop scanned copies here or <span className="font-semibold text-primary">browse files</span>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <p className="text-sm text-muted-foreground">Add at least 3 dishes to go live. You can add more later.</p>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-[1fr_120px_120px]">
                    <Field label={`Dish ${n} name`} defaultValue={["Butter Chicken", "Paneer Tikka", "Veg Biryani"][n - 1]} />
                    <Field label="Price (₹)" defaultValue={["320", "240", "220"][n - 1]} />
                    <Field label="Category" defaultValue={["Main", "Starter", "Biryani"][n - 1]} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{step + 1} of {steps.length}</span>
              <Button
                className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]"
                onClick={() => (isLast ? navigate({ to: "/" }) : setStep(step + 1))}
              >
                {isLast ? "Finish & go to dashboard" : "Continue"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, as }: { label: string; defaultValue?: string; as?: "textarea" }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {as === "textarea"
        ? <Textarea defaultValue={defaultValue} rows={3} />
        : <Input defaultValue={defaultValue} />}
    </div>
  );
}
