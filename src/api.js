// api.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const fetchGeminiResponse = async (userMessage) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.error("API key is missing!");
    return "API key is missing. Please check your environment variables.";
  }

  try {
    const result = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    console.log("Raw Gemini result:", result);

    // Try multiple ways to get text
    const text =
      result?.response?.text || 
      result?.candidates?.[0]?.content?.[0]?.text || 
      result?.text;

    if (!text) {
      console.error("No text found in Gemini response:", result);
      return "Oops! No response text found from Gemini.";
    }

    return text;

  } catch (err) {
    // Log detailed error info
    console.error("Gemini error message:", err?.message);
    console.error("Gemini full error object:", err);
    if (err?.response) console.error("Gemini API response:", err.response);

    return "Oops! I couldn't fetch a response right now. Check console for details.";
  }
};
