import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const fetchGeminiResponse = async (userMessage) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    const text = result?.response?.text ?? result?.text;
    if (!text) throw new Error("No response text found.");
    return text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Oops! I couldn't fetch a response right now.";
  }
};
