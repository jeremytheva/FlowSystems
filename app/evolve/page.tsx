import { AppLayout } from "@/components/Layout";
import { Button, Card } from "@/components/ui";

export default function EvolvePage() {
  return (
    <AppLayout
      title="Evolve the system"
      description="Prioritize improvements and experiments that keep your platform sharp."
    >
      <Card title="Learning backlog" className="space-y-3">
        <p className="text-sm text-slate-600">
          Track research, product insights, and process upgrades in a single pipeline. Rank them by impact and effort to keep
          momentum strong.
        </p>
        <Button variant="ghost" className="w-full">
          Review priorities
        </Button>
      </Card>
    </AppLayout>
  );
}
