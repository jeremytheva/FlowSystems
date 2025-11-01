import { ReactNode } from "react";

export type RouteTemplateProps = {
  children: ReactNode;
};

export default function RouteTemplate({ children }: RouteTemplateProps) {
  return <>{children}</>;
}
