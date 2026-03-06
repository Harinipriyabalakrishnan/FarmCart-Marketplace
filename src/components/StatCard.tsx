import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "stable";
}

export default function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={`mt-1 text-xs font-medium ${trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          {icon}
        </div>
      </div>
    </div>
  );
}
