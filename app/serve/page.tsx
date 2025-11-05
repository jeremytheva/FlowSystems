(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/serve/page.tsx b/app/serve/page.tsx
deleted file mode 100644
index 38ac8eb939b6c201b04fdf6dfb035af2aebda041..0000000000000000000000000000000000000000
--- a/app/serve/page.tsx
+++ /dev/null
@@ -1,19 +0,0 @@
-import { AppLayout } from "@/components/Layout";
-import { Button, Card } from "@/components/ui";
-
-export default function ServePage() {
-  return (
-    <AppLayout
-      title="Serve customers"
-      description="Orchestrate onboarding, support, and expansion experiences that feel intentional."
-    >
-      <Card title="Service blueprint" className="space-y-3">
-        <p className="text-sm text-slate-600">
-          Document the operational flow across teams. Assign owners to each moment, capture handoffs, and surface the metrics
-          that demonstrate reliability.
-        </p>
-        <Button className="w-full">Create workflow</Button>
-      </Card>
-    </AppLayout>
-  );
-}
 
EOF
)
