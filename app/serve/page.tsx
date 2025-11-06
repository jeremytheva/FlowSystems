import { Layout } from "@/components/Layout";
import { Button, Card } from "@/components/ui";

export default function ServePage() {
  return (
    <Layout
      title="Serve customers"
      description="Orchestrate onboarding, support, and expansion experiences that feel intentional."
    >
      <Card title="Service blueprint" className="space-y-3">
        <p className="text-sm text-slate-600">
          Document the operational flow across teams. Assign owners to each moment, capture handoffs, and surface the metrics
          that demonstrate reliability.
        </p>
        <Button className="w-full">Create workflow</Button>
      </Card>
    </AppLayout>
  );
}
