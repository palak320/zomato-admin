import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { categories } from "@/lib/mock-data";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Zamato Partner" }, { name: "description", content: "Organize your menu into categories customers can browse." }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <AppShell
      title="Categories"
      subtitle="Group your menu items so customers can browse easily"
      actions={<Button className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]"><Plus className="mr-2 h-4 w-4" />New category</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id} className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-3xl">{c.emoji}</div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.items} items</p>
                  </div>
                </div>
                <Badge variant={c.active ? "default" : "secondary"} className={c.active ? "bg-success text-success-foreground" : ""}>
                  {c.active ? "Live" : "Hidden"}
                </Badge>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={c.active} />
                  <span className="text-xs text-muted-foreground">Visible to customers</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
