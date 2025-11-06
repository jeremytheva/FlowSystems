import { Layout } from "@/components/Layout";
import { Button, Card } from "@/components/ui";

export default function GovernPage() {
  return (
    <AppLayout
      title="Govern operations"
      description="Ensure the right guardrails, rituals, and reporting are in place to scale responsibly."
    >
      <Card title="Operating cadence" className="space-y-3">
        <p className="text-sm text-slate-600">
          Define forums, owners, and rhythm for executive reviews. Track decision logs and surface the metrics that matter each
          week.
        </p>
        <Button variant="secondary" className="w-full">
          Configure rituals
        </Button>
      </Card>
    </AppLayout>
  );
}
