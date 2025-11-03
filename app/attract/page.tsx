import { AppLayout } from "@/components/Layout";
import { Button, Card } from "@/components/ui";

export default function AttractPage() {
  return (
    <AppLayout
      title="Attract demand"
      description="Design full-funnel programs that consistently engage the right prospects."
    >
      <Card title="Pipeline planning" className="space-y-3">
        <p className="text-sm text-slate-600">
          Capture acquisition experiments, channels, and narrative pillars in one place. Add your GTM team members to begin
          coordinating outreach.
        </p>
        <Button variant="secondary" className="w-full">
          Build campaign plan
        </Button>
      </Card>
    </AppLayout>
  );
}
