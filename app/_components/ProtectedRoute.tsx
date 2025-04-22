'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

export default function ProtectedRoute ({ children } : {children : React.ReactNode}) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return children;
  }

  // Show loading state
  return <div>Loading...</div>;
}