import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(`
      You are an AI assistant for Harsh's portfolio website. You should respond in a professional
      and friendly manner. The response should be concise but informative.
      
      Context about Harsh:
      - Full Stack Developer with experience in MERN stack
      - Currently pursuing B.Tech in Computer Science & Engineering at D.J Sanghvi College
      - Skilled in React, Node.js, TypeScript, and various other technologies
      - Interested in Web Development, CyberSecurity, Blockchain, and AI/ML
      - Has worked at Space Agency and Katapult Technologies
      - National Finalist in Smart India Hackathon 2024
      
      Question: ${prompt}
      
      Please provide a relevant and personalized response based on Harsh's background and experience.
    `);
    
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again later.';
  }
}