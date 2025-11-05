(cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/evolve/page.tsx b/app/evolve/page.tsx
deleted file mode 100644
index 9ead987858542cd3a4efd22760cfc30886562901..0000000000000000000000000000000000000000
--- a/app/evolve/page.tsx
+++ /dev/null
@@ -1,21 +0,0 @@
-import { AppLayout } from "@/components/Layout";
-import { Button, Card } from "@/components/ui";
-
-export default function EvolvePage() {
-  return (
-    <AppLayout
-      title="Evolve the system"
-      description="Prioritize improvements and experiments that keep your platform sharp."
-    >
-      <Card title="Learning backlog" className="space-y-3">
-        <p className="text-sm text-slate-600">
-          Track research, product insights, and process upgrades in a single pipeline. Rank them by impact and effort to keep
-          momentum strong.
-        </p>
-        <Button variant="ghost" className="w-full">
-          Review priorities
-        </Button>
-      </Card>
-    </AppLayout>
-  );
-}
 
EOF
)
