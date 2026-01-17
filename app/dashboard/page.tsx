"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileCode, Clock, TrendingUp, Upload, User, Settings, LogOut } from "lucide-react";

interface UserData {
  name: string;
  email: string;
}

const mockHistory = [
  {
    id: "1",
    fileName: "app.tsx",
    fileSize: 4520,
    metrics: { estimatedEnergy: 0.452, estimatedCO2: 1.808, energyUnit: "kWh", co2Unit: "gCO2e", lineCount: 156, complexity: 1.45 },
    review: { score: 7, bottleneck: "Multiple re-renders detected", optimization: "Use React.memo for pure components", improvement: "15-20% reduction" },
    createdAt: "2026-01-17T10:30:00Z",
  },
  {
    id: "2",
    fileName: "utils.ts",
    fileSize: 2100,
    metrics: { estimatedEnergy: 0.210, estimatedCO2: 0.840, energyUnit: "kWh", co2Unit: "gCO2e", lineCount: 78, complexity: 1.2 },
    review: { score: 8, bottleneck: "No major issues", optimization: "Consider lazy loading", improvement: "5-10% reduction" },
    createdAt: "2026-01-17T09:15:00Z",
  },
  {
    id: "3",
    fileName: "api.py",
    fileSize: 6800,
    metrics: { estimatedEnergy: 0.680, estimatedCO2: 2.720, energyUnit: "kWh", co2Unit: "gCO2e", lineCount: 234, complexity: 1.8 },
    review: { score: 5, bottleneck: "Inefficient database queries", optimization: "Use batch operations and connection pooling", improvement: "30-40% reduction" },
    createdAt: "2026-01-16T16:45:00Z",
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [analyses] = useState(mockHistory);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("co2de_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setIsLoading(false);
  }, []);

  const totalEnergy = analyses.reduce((sum, a) => sum + a.metrics.estimatedEnergy, 0);
  const totalCO2 = analyses.reduce((sum, a) => sum + a.metrics.estimatedCO2, 0);
  const avgScore = analyses.reduce((sum, a) => sum + a.review.score, 0) / analyses.length;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {user && (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">
                {user ? `Welcome, ${user.name}!` : "Dashboard"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {user ? "Track your code's environmental impact" : "Sign in to save your analysis history"}
              </p>
            </div>
          </div>
          
          {!user && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
            >
              <User className="w-5 h-5" />
              Sign in to save history
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FileCode className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-gray-500">Total Analyses</span>
            </div>
            <p className="text-3xl font-bold">{analyses.length}</p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-sm text-gray-500">Total Energy</span>
            </div>
            <p className="text-3xl font-bold">{totalEnergy.toFixed(3)}<span className="text-lg text-gray-500 ml-1">kWh</span></p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-sm text-gray-500">Total CO₂</span>
            </div>
            <p className="text-3xl font-bold">{totalCO2.toFixed(2)}<span className="text-lg text-gray-500 ml-1">gCO2e</span></p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm text-gray-500">Avg Score</span>
            </div>
            <p className="text-3xl font-bold">{avgScore.toFixed(1)}<span className="text-lg text-gray-500 ml-1">/10</span></p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Analyses</h2>
          <Link
            href="/analyze"
            className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <Upload className="w-4 h-4" />
            New Analysis
          </Link>
        </div>

        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <FileCode className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{analysis.fileName}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{(analysis.fileSize / 1024).toFixed(2)} KB</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 lg:gap-12">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-500">{analysis.metrics.estimatedEnergy.toFixed(3)}</p>
                    <p className="text-xs text-gray-500">kWh</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-500">{analysis.metrics.estimatedCO2.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">gCO2e</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{analysis.review.score}/10</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Recommendation:</span> {analysis.review.optimization}
                </p>
              </div>
            </div>
          ))}
        </div>

        {analyses.length === 0 && (
          <div className="text-center py-16">
            <FileCode className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No analyses yet</h3>
            <p className="text-gray-500 mb-6">Upload your first code file to get started</p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
            >
              <Upload className="w-5 h-5" />
              Analyze Code
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
