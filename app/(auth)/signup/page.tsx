"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleClick = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/profile",
        redirect: true,
      });
    } catch (err) {
      console.log({ error: err });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to continue to your account
        </p>

        <button
          onClick={handleClick}
          className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium px-4 py-3 rounded-lg flex items-center justify-center transition"
        >
          <svg
            className="w-5 h-5 mr-3"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.6-34-4.7-50.2H272v95.1h146.9c-6.4 34.4-25.5 63.6-54.5 83.1l88.1 68c51.6-47.6 80.9-117.8 80.9-196z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c72.6 0 133.7-24 178.3-65.1l-88.1-68c-24.4 16.5-55.7 26-90.2 26-69 0-127.6-46.6-148.4-109.3l-91.7 71.3c43.9 86.8 134.4 145.1 240.1 145.1z"
              fill="#34a853"
            />
            <path
              d="M123.6 327.9c-10.4-30.9-10.4-64.1 0-95l-91.7-71.3C-11.7 238.4-11.7 305.9 32 372.1z"
              fill="#fbbc04"
            />
            <path
              d="M272 107.7c37.9-.6 74.4 13.6 101.9 39.8l76.3-76.3C401.6 24.5 339.8-1.2 272 0 166.3 0 75.8 58.2 32 145.9l91.6 71.3c20.8-62.7 79.4-109.5 148.4-109.5z"
              fill="#ea4335"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
