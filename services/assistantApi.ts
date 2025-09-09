import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Model configuration
const MODEL_NAME = 'gemini-1.5-pro';
const GENERATION_CONFIG = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

// System instruction as a string
const SYSTEM_INSTRUCTION = `You are a professional Web UI/UX designer. Your role is to guide the user in creating a highly unique, 
visually appealing, and user-friendly website. Provide clear, practical, and creative suggestions focused on 
design aesthetics, usability, accessibility, and modern design trends to ensure the final product stands out 
and engages users effectively.`;

export interface AssistantResponse {
  reply?: string;
  error?: string;
}

export async function askAssistant(message: string): Promise<AssistantResponse> {
  // In test mode, return a mock response
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          reply: "I'm your AI design assistant. In production, I'll provide real-time feedback on your website design. " +
                 "For now, here's a mock response to your message: " + message
        });
      }, 1000);
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // Start a chat session with system instruction
    const chat = model.startChat({
      generationConfig: GENERATION_CONFIG,
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I will help you design a beautiful and functional website. What would you like to work on?' }],
        },
      ],
    });

    // Send the user's message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    return { reply: text };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return { 
      error: 'Failed to get response from the AI assistant. ' +
             'Please check your API key and internet connection.'
    };
  }
}
