(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/govern/page.tsx b/app/govern/page.tsx
deleted file mode 100644
index ef293c2816c486a31fcb1e2bc33bb7a77a80edbb..0000000000000000000000000000000000000000
--- a/app/govern/page.tsx
+++ /dev/null
@@ -1,21 +0,0 @@
-import { AppLayout } from "@/components/Layout";
-import { Button, Card } from "@/components/ui";
-
-export default function GovernPage() {
-  return (
-    <AppLayout
-      title="Govern operations"
-      description="Ensure the right guardrails, rituals, and reporting are in place to scale responsibly."
-    >
-      <Card title="Operating cadence" className="space-y-3">
-        <p className="text-sm text-slate-600">
-          Define forums, owners, and rhythm for executive reviews. Track decision logs and surface the metrics that matter each
-          week.
-        </p>
-        <Button variant="secondary" className="w-full">
-          Configure rituals
-        </Button>
-      </Card>
-    </AppLayout>
-  );
-}
 
EOF
)
