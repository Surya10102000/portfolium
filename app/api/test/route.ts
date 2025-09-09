import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "Test route working",
    chatTest: "Send a POST request with { message: 'your message' } to test the chat API",
    endpoints: {
      chat: "/api/assistance (POST)",
      test: "/api/test (GET)"
    }
  });
}
