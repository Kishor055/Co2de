"use client";

import { useState, useCallback } from "react";
import { FileUpload } from "@/components/upload";
import { MetricsDisplay, EnergyScoreChart, AIReviewCard } from "@/components/dashboard";
import { calculateEnergyMetrics, getMockedReview } from "@/lib/energy";
import { AIReview } from "@/lib/schemas";
import { Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { storage, databases, DATABASE_ID, COLLECTION_ID, BUCKET_ID, ID } from "@/lib/appwrite";
import { useAuth } from "@/hooks/use-auth";

interface AnalysisState {
  file: File | null;
  content: string;
  metrics: ReturnType<typeof calculateEnergyMetrics> | null;
  review: AIReview | null;
  isAnalyzing: boolean;
}

export default function AnalyzePage() {
  const { user } = useAuth();
  const [state, setState] = useState<AnalysisState>({
    file: null,
    content: "",
    metrics: null,
    review: null,
    isAnalyzing: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleFileAccepted = useCallback(async (file: File, content: string) => {
    setState((prev) => ({ ...prev, file, content, isAnalyzing: true }));
    setError(null);

    try {
      // 1. Calculate Metrics
      const metrics = calculateEnergyMetrics(file.size, content);
      const review = getMockedReview(content);

      // 2. Upload to Appwrite (if configured)
      if (DATABASE_ID && COLLECTION_ID && BUCKET_ID) {
        try {
          // Upload file to storage
          const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
          
          // Save result to database
          const data: any = {
            fileName: file.name,
            fileSize: file.size,
            fileId: uploadedFile.$id,
            estimatedEnergy: metrics.estimatedEnergy,
            estimatedCO2: metrics.estimatedCO2,
            score: review.score,
            bottleneck: review.bottleneck,
            optimization: review.optimization,
            improvement: review.improvement,
            createdAt: new Date().toISOString(),
          };

          if (user) {
            data.userId = user.$id;
          }

          await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);
        } catch (dbError) {
          console.error("Appwrite storage/db error:", dbError);
        }
      }

      setState((prev) => ({
        ...prev,
        metrics,
        review,
        isAnalyzing: false,
      }));
    } catch (err) {
      setError("Failed to analyze file. Please try again.");
      setState((prev) => ({ ...prev, isAnalyzing: false }));
    }
  }, [user]);

  const handleClear = useCallback(() => {
    setState({
      file: null,
      content: "",
      metrics: null,
      review: null,
      isAnalyzing: false,
    });
    setError(null);
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-heading">
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

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

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
                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-center">Energy Efficiency Score</h3>
                    <EnergyScoreChart score={state.review.score} />
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Based on code patterns, complexity, and best practices
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                    <AIReviewCard review={state.review} />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <h3 className="font-semibold mb-2 text-emerald-700 dark:text-emerald-400 font-heading">
                    💡 Quick Tip
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your analysis has been saved to the dashboard. You can access it anytime to track improvements.
                  </p>
                </div>
              </div>
            )}

            {state.isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                <p className="text-gray-500 font-medium">Processing code patterns...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
