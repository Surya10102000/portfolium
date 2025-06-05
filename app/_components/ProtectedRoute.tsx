"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingComponent from "./Loader/LoadingComponent";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return children;
  }

  // Show loading state
  return <LoadingComponent/>
}
