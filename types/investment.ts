export interface InvestmentReport {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  opportunities: string[];
  recommendation: string;
  confidence: number;
}