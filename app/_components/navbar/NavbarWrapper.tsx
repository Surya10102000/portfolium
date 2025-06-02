"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/profile") return <Navbar />;

  // Hide navbar for /username routes
  const isPortfolioRoute =
    pathname.startsWith("/") &&
    pathname.split("/").filter(Boolean).length === 1;

  if (isPortfolioRoute) return null;

  return <Navbar />;
}
