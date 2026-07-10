import type { ReactNode } from "react";
import StreamClientProvider from "@/components/providers/StreamClientProvider";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StreamClientProvider>
      {children}
    </StreamClientProvider>
  );
}
