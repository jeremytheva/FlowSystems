 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/attract/page.tsx b/app/attract/page.tsx
deleted file mode 100644
index e8d339e32816d70462bc1f3bd9c72feb73acf22c..0000000000000000000000000000000000000000
--- a/app/attract/page.tsx
+++ /dev/null
@@ -1,21 +0,0 @@
-import { AppLayout } from "@/components/Layout";
-import { Button, Card } from "@/components/ui";
-
-export default function AttractPage() {
-  return (
-    <AppLayout
-      title="Attract demand"
-      description="Design full-funnel programs that consistently engage the right prospects."
-    >
-      <Card title="Pipeline planning" className="space-y-3">
-        <p className="text-sm text-slate-600">
-          Capture acquisition experiments, channels, and narrative pillars in one place. Add your GTM team members to begin
-          coordinating outreach.
-        </p>
-        <Button variant="secondary" className="w-full">
-          Build campaign plan
-        </Button>
-      </Card>
-    </AppLayout>
-  );
-}
 
EOF
)
