'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute ({ children } : {children : React.ReactNode}) {
  const { status,data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signup");
    }
  }, [status, router]);

  if (status === "authenticated") {
    localStorage.setItem('emailID', data?.user?.email!)
    return children;
  }

  // Show loading state
  return <div>Loading...</div>;
}