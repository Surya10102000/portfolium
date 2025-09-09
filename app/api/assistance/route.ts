import { askAssistant } from '@/services/assistantApi';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Use the assistant service to get the response
    const response = await askAssistant(message);
    
    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: response.reply });
  } catch (error) {
    console.error('Error in assistance API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to process your request',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
