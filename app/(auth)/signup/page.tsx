"use client"
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.813-1.692-4.198-2.717-6.735-2.717-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}