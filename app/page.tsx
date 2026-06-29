"use client";

import { useState } from "react";
import {
  Search,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Briefcase,
  Loader2,
  Sparkles,
} from "lucide-react";

interface InvestmentReport {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  opportunities: string[];
  recommendation: string;
  confidence: number;
}

export default function Home() {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");
  const [report, setReport] = useState<InvestmentReport | null>(null);

  const companies = [
    "Tesla",
    "Apple",
    "Microsoft",
    "NVIDIA",
    "Amazon",
    "Google",
  ];

  async function analyzeCompany() {
    if (!company.trim()) {
      alert("Please enter a company name.");
      return;
    }

    setLoading(true);
    setReport(null);

    try {
      setStage("Collecting company information...");

      const res = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company }),
      });

      setStage("Analyzing financial performance...");

      const data = await res.json();

      setStage("Generating investment recommendation...");

      if (data.success) {
        const cleaned = data.report
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        setReport(JSON.parse(cleaned));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to generate report.");
    }

    setLoading(false);
    setStage("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Hero */}

        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

            <Sparkles size={18} className="text-cyan-400" />

            <span className="text-sm text-cyan-300">

              AI Powered Investment Research

            </span>

          </div>

          <h1 className="mt-8 text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">

            InvestSight AI

          </h1>

          <p className="mt-5 text-lg text-slate-400 max-w-3xl mx-auto">

            Intelligent investment research platform for evaluating public
            companies using AI and real-time market intelligence.

          </p>

          <div className="flex justify-center flex-wrap gap-3 mt-10">

            {companies.map((item) => (

              <button
                key={item}
                onClick={() => setCompany(item)}
                className="rounded-full bg-slate-800 px-4 py-2 hover:bg-cyan-600 transition"
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* Search */}

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Search a public company (Tesla, Apple, NVIDIA...)"
              className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 p-5 outline-none focus:border-cyan-400 transition"
            />

            <button
              onClick={analyzeCompany}
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 font-semibold hover:scale-105 transition flex items-center justify-center gap-3"
            >

              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Analyze Company
                </>
              )}

            </button>

          </div>

          {loading && (

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-5">

              <div className="flex items-center gap-3">

                <Loader2
                  size={18}
                  className="animate-spin text-cyan-400"
                />

                <span>{stage}</span>

              </div>

            </div>

          )}

        </div>

        {/* REPORT */}
        {report && (

<div className="mt-10 space-y-8">

  {/* Top Cards */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 p-8 shadow-xl">

      <div className="flex items-center gap-3">

        <Briefcase size={24}/>

        <h2 className="text-xl font-semibold">

          Recommendation

        </h2>

      </div>

      <p className="mt-6 text-5xl font-black">

        {report.recommendation}

      </p>

    </div>

    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 hover:border-cyan-500 transition">

      <div className="flex items-center gap-3">

        <BarChart3 size={24}/>

        <h2 className="text-xl font-semibold">

          Confidence Score

        </h2>

      </div>

      <div className="mt-6 h-4 rounded-full bg-slate-700">

        <div
          className="h-4 rounded-full bg-cyan-400"
          style={{
            width: `${Math.round(report.confidence * 100)}%`,
          }}
        />

      </div>

      <p className="mt-4 text-4xl font-bold">

        {Math.round(report.confidence * 100)}%

      </p>

    </div>

  </div>

  {/* Summary */}

  <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 hover:border-cyan-500 transition">

    <div className="mb-5 flex items-center gap-3">

      <TrendingUp className="text-cyan-400"/>

      <h2 className="text-2xl font-semibold">

        Executive Summary

      </h2>

    </div>

    <p className="leading-8 text-slate-300">

      {report.summary}

    </p>

  </div>

  {/* Analysis Grid */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Strengths */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 hover:border-green-500 transition">

      <div className="mb-5 flex items-center gap-3">

        <ShieldCheck className="text-green-400"/>

        <h2 className="text-xl font-semibold">

          Strengths

        </h2>

      </div>

      <ul className="space-y-3">

        {report.strengths.length > 0 ? (

          report.strengths.map((item,index)=>(
            <li key={index}>{item}</li>
          ))

        ) : (

          <li className="text-slate-500">

            No strengths identified.

          </li>

        )}

      </ul>

    </div>

    {/* Weaknesses */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 hover:border-yellow-500 transition">

      <h2 className="mb-5 text-xl font-semibold">

        Weaknesses

      </h2>

      <ul className="space-y-3">

        {report.weaknesses.length > 0 ? (

          report.weaknesses.map((item,index)=>(
            <li key={index}>{item}</li>
          ))

        ) : (

          <li className="text-slate-500">

            No significant weaknesses identified.

          </li>

        )}

      </ul>

    </div>

    {/* Risks */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 hover:border-red-500 transition">

      <div className="mb-5 flex items-center gap-3">

        <AlertTriangle className="text-red-400"/>

        <h2 className="text-xl font-semibold">

          Risks

        </h2>

      </div>

      <ul className="space-y-3">

        {report.risks.length > 0 ? (

          report.risks.map((item,index)=>(
            <li key={index}>{item}</li>
          ))

        ) : (

          <li className="text-slate-500">

            No major risks identified.

          </li>

        )}

      </ul>

    </div>

    {/* Opportunities */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 hover:border-cyan-500 transition">

      <h2 className="mb-5 text-xl font-semibold">

        Opportunities

      </h2>

      <ul className="space-y-3">

        {report.opportunities.length > 0 ? (

          report.opportunities.map((item,index)=>(
            <li key={index}>{item}</li>
          ))

        ) : (

          <li className="text-slate-500">

            No opportunities identified.

          </li>

        )}

      </ul>

    </div>

  </div>
</div>

)}

<footer className="mt-20 border-t border-slate-800 py-8 text-center text-slate-500">

  <p className="text-sm">
    InvestSight AI • Powered by Gemini AI • Tavily Search • Next.js
  </p>

</footer>

</div>

</main>

);
}