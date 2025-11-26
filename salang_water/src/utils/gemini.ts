import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (prompt: string) => {
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
        return "I'm sorry, I can't answer that right now because my brain (API Key) is missing. Please check the configuration.";
    }

    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return "I'm having trouble connecting to the server right now. Please try again later.";
    }
};

export const SALANG_SYSTEM_PROMPT = `
You are Salang Bot, a helpful and friendly AI assistant for "Salang Water", a premium water delivery service in Kenya.
Your goal is to help customers place orders, answer questions about water quality, and provide delivery information.

Key Information:
- Products: 
  - 20L Refill (KES 350) - Best value for families.
  - 10L Dispenser Bottle (KES 200) - Compact.
  - Case of 500ml (KES 500) - On-the-go.
- Delivery: Free delivery within Nairobi. Usually takes 30-60 minutes.
- Contact: 0712345678 or support@salangwater.com.
- Tone: Professional, warm, and helpful. Use emojis occasionally.
- If asked to place an order, guide them to the "Order Now" button or the cart. You cannot place orders directly, but you can help them decide.
`;
