
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CountryData } from "../types";

export const getHealthInsight = async (profile: UserProfile, country: CountryData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Based on a user who is ${profile.age} years old, identified as ${profile.sex}, with skin type ${profile.skinType}, living in ${country.name} (which currently has ${country.uvIndex} UV index), provide a concise 2-sentence recommendation for Vitamin D intake. Include why the specific factors matter.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Consult a healthcare provider for specific advice.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ensure adequate Vitamin D intake during winter months when UV levels are insufficient for natural synthesis.";
  }
};
