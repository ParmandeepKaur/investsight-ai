# InvestSight AI

AI-powered investment research platform built with Next.js, Google Gemini AI, and Tavily Search.

## Live Demo

🔗 (https://investsight-ai.vercel.app/)

## GitHub Repository

🔗 https://github.com/ParmandeepKaur/investsight-ai

---

## Overview

InvestSight AI helps users evaluate publicly traded companies using AI-powered financial analysis.

The application gathers recent market information using Tavily Search, analyzes the company with Google Gemini, and generates structured investment insights including strengths, weaknesses, risks, opportunities, confidence score, and an investment recommendation.

---

## Features

- AI-powered company research
- Real-time market information using Tavily Search
- Executive Summary
- Strength Analysis
- Weakness Analysis
- Risk Assessment
- Opportunity Analysis
- Investment Recommendation
- Confidence Score
- Responsive modern dashboard
- Professional UI built with Tailwind CSS

---

## Tech Stack

Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

Backend

- Next.js API Routes

AI

- Google Gemini API

Search

- Tavily Search API

Deployment

- Vercel

---

## Architecture

User

↓

Next.js Frontend

↓

API Route

↓

Tavily Search API

↓

Google Gemini AI

↓

Structured Investment Report

↓

Dashboard

---

## Folder Structure

```

app/
├── api/
│ └── research/
│ └── route.ts
├── page.tsx

lib/
├── gemini.ts
├── prompt.ts

public/

package.json

```

---

## Installation

Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/investsight-ai.git
```

Install dependencies

```bash
npm install
```

Create a `.env.local`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
TAVILY_API_KEY=YOUR_TAVILY_API_KEY
```

Run
npm run dev

## Build

npm run build

## Future Improvements

- Portfolio comparison
- Historical stock analysis
- Interactive financial charts
- Multi-company comparison
- LangGraph workflow integration
- Watchlists
- Earnings transcript analysis

---

## Author

Parman