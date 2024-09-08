"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Appbar from "@/components/homepage/Appbar";
import Footer from "@/components/homepage//Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define the paths where you don't want to show the Appbar
  const noAppbarPaths = ["/signup", "/signin"];

  return (
   <div>
    
    {!noAppbarPaths.includes(pathname) && <Appbar />}
      {children}
    {!noAppbarPaths.includes(pathname) && <Footer />}
      <Toaster position="bottom-right" />
  </div>
  );
}