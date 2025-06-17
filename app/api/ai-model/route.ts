import { QUESTION_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req : Request){
    try {
        const {jobPosition, jobDescription, duration, type} = await req.json()
        
        if (!jobPosition || !jobDescription || !duration || !type) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const FINAL_PROMPT = `You are an expert technical interviewer. Generate interview questions in strict JSON format.
Based on the following inputs:
Job Title: ${jobPosition}
Job Description: ${jobDescription}
Interview Duration: ${duration}
Interview Type: ${type}

Generate a list of interview questions based on the duration.
Return ONLY a JSON object with this exact structure, no other text:
{
  "interviewQuestions": [
    {
      "question": "Your question here",
      "type": "${type}"
    }
  ]
}`

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: 'OpenRouter API key is not configured' },
                { status: 500 }
            );
        }

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        });
        
        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
                {
                    role: "user",
                    content: FINAL_PROMPT
                }
            ],
            response_format: { type: "json_object" }
        });

        const response = completion.choices[0].message;
        
        if (!response || !response.content) {
            return NextResponse.json(
                { error: 'Invalid response from AI model' },
                { status: 500 }
            );
        }

        return NextResponse.json({ content: response.content });
    } catch (error) {
        console.error('Error in AI model API:', error);
        return NextResponse.json(
            { error: 'Failed to generate questions. Please try again.' },
            { status: 500 }
        );
    }
}