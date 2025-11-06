import { Layout } from "@/components/Layout";
import { Button, Card, Input } from "@/components/ui";

export default function DefinePage() {
  return (
    <Layout
      title="Define your Flow System"
      description="Clarify the foundations of your brand and customer promise before activating downstream motions."
    >
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card title="Brand Identity Setup" className="space-y-4">
          <Input label="Brand Name" placeholder="Enter your brand name" />
          <Input label="Tagline" placeholder="What promise do you lead with?" />
          <Input
            label="Primary Audience"
            placeholder="Who is the core customer you are building for?"
            helperText="Think about the specific persona that benefits most from your offer."
          />
          <div className="flex justify-end gap-3">
            <Button variant="ghost">Preview</Button>
            <Button>Save brand profile</Button>
          </div>
        </Card>

        <Card title="Strategic Checklist" className="space-y-3">
          <p className="text-sm text-slate-600">
            Align the executive team around what success looks like in this phase. Capture the fundamentals, then assign owners
            to move each piece forward.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
              Document the vision narrative and core value pillars.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" aria-hidden />
              Map your customer journey milestones and key moments of delight.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500" aria-hidden />
              Assign collaborators responsible for messaging, design systems, and validation.
            </li>
          </ul>
          <Button variant="secondary" className="w-full">
            Assign owners
          </Button>
        </Card>
      </div>
    </Layout>
  );
}
