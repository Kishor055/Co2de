"use client";

import { useState, useCallback } from "react";
import { FileUpload } from "@/components/upload";
import { MetricsDisplay, EnergyScoreChart, AIReviewCard } from "@/components/dashboard";
import { calculateEnergyMetrics, getMockedReview } from "@/lib/energy";
import { AIReview } from "@/lib/schemas";
import { Sparkles, RotateCcw, Download, Share2 } from "lucide-react";

interface AnalysisState {
  file: File | null;
  content: string;
  metrics: ReturnType<typeof calculateEnergyMetrics> | null;
  review: AIReview | null;
  isAnalyzing: boolean;
}

export default function AnalyzePage() {
  const [state, setState] = useState<AnalysisState>({
    file: null,
    content: "",
    metrics: null,
    review: null,
    isAnalyzing: false,
  });

  const handleFileAccepted = useCallback(async (file: File, content: string) => {
    setState((prev) => ({ ...prev, file, content, isAnalyzing: true }));

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const metrics = calculateEnergyMetrics(file.size, content);
    const review = getMockedReview(content);

    setState((prev) => ({
      ...prev,
      metrics,
      review,
      isAnalyzing: false,
    }));
  }, []);

  const handleClear = useCallback(() => {
    setState({
      file: null,
      content: "",
      metrics: null,
      review: null,
      isAnalyzing: false,
    });
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Analyze Your Code
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload a code file to get instant insights about its environmental impact
            </p>
          </div>

          <div className="space-y-8">
            <FileUpload
              onFileAccepted={handleFileAccepted}
              isLoading={state.isAnalyzing}
              acceptedFile={state.file}
              onClear={handleClear}
            />

            {state.metrics && state.review && !state.isAnalyzing && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    Analysis Results
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClear}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      New Analysis
                    </button>
                  </div>
                </div>

                <MetricsDisplay metrics={state.metrics} />

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <h3 className="text-lg font-semibold mb-4 text-center">Energy Efficiency Score</h3>
                    <EnergyScoreChart score={state.review.score} />
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Based on code patterns, complexity, and best practices
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <AIReviewCard review={state.review} />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <h3 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-400">
                    💡 Quick Tip
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    These estimates are based on code analysis heuristics. For more accurate measurements,
                    consider using profiling tools in your development environment. Every optimization,
                    no matter how small, contributes to a more sustainable digital ecosystem.
                  </p>
                </div>
              </div>
            )}

            {!state.file && !state.isAnalyzing && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">
                  Supported formats: .js, .ts, .tsx, .jsx, .py, .java, .rs, .go, .c, .cpp, .h, .html, .css, .json, and more
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
