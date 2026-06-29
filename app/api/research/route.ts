import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ai } from "@/lib/gemini";
import { investmentPrompt } from "@/lib/prompt";

export async function POST(req: NextRequest) {
  try {
    const { company } = await req.json();

    if (!company) {
      return NextResponse.json(
        { error: "Company name is required." },
        { status: 400 }
      );
    }

    // Search the web using Tavily
    const tavilyResponse = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: process.env.TAVILY_API_KEY,
        query: `${company} latest earnings financial performance revenue profit growth competitive advantages risks future outlook latest news`,
        search_depth: "advanced",
        max_results: 8,
      }
    );

    const searchData = JSON.stringify(tavilyResponse.data.results, null, 2);

    const prompt = investmentPrompt(company, searchData);

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      report: result.text,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error?.response?.data?.error || error?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}