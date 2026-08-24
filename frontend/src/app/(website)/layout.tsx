import type { ReactNode } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
