import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { products } from "@/lib/mock-data";
import { Plus, Edit2, Star } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Menu & Products — Zamato Partner" }, { name: "description", content: "Manage your restaurant menu, prices and availability." }] }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <AppShell
      title="Menu & Products"
      subtitle={`${products.length} items across your menu`}
      actions={<Button className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]"><Plus className="mr-2 h-4 w-4" />Add item</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <Card key={p.id} className="group overflow-hidden border-border/60 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-accent to-muted text-6xl">
              <span>{p.image}</span>
              <div className="absolute left-3 top-3 flex items-center gap-1">
                <span className={`flex h-5 w-5 items-center justify-center rounded border-2 ${p.veg ? "border-success" : "border-destructive"} bg-background`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${p.veg ? "bg-success" : "bg-destructive"}`} />
                </span>
              </div>
              <Badge className="absolute right-3 top-3 bg-background text-foreground shadow">
                <Star className="mr-1 h-3 w-3 fill-warning text-warning" />{p.rating}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.category} · {p.sold} sold</p>
                </div>
                <p className="font-display font-bold text-primary">₹{p.price}</p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={p.active} id={p.id} />
                  <label htmlFor={p.id} className="text-xs text-muted-foreground">In stock ({p.stock})</label>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
