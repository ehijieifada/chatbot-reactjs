import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const fetchGeminiResponse = async (userMessage) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.error("API key is missing!");
    return "API key is missing. Please check your environment variables.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(userMessage);

    const text = result?.response?.text?.() || "No response text found.";

    return text;
  } catch (err) {
    console.error("Gemini API error:", err);
    if (err?.response) console.error("Gemini API response:", err.response);
    return `Oops! I couldn't fetch a response right now. Error: ${err.message}`;
  }
};
