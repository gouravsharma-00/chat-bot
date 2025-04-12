import { GoogleGenAI } from "@google/genai";

const API = process.env.GEM_API

const AI = new GoogleGenAI({
  apiKey: API,
  httpOptions: { apiVersion: "v1alpha" },
});

function Prompt(prompt) {
    return `
    You are a spiritual counselor.
    Answer the following question using Hindu spiritual texts like the Bhagavad Gita and Mahabharata as your primary reference. 
    Be compassionate and insightful, and give short answers unless asked.

    Question: ${prompt}
    `;
}

export async function POST(req) {
    const { prompt } = await req.json()

    try {
        const response = await AI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: Prompt(prompt),
        })

        return Response.json({"response" : response.text}, {status: 200})
        
    }catch(err) {
        return Response.json({"message" : err}, {status: 500})
    }


}