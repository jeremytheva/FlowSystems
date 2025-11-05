 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/app/components/ui/index.ts b/app/components/ui/index.ts
deleted file mode 100644
index 2e018bd4e964130769ab394b50a25d185e5adf81..0000000000000000000000000000000000000000
--- a/app/components/ui/index.ts
+++ /dev/null
@@ -1,5 +0,0 @@
-export { Button } from "./button";
-export { Card } from "./card";
-export { Input } from "./input";
-export { Modal } from "./modal";
-export { NavTabs } from "./nav-tabs";
 
EOF
)
