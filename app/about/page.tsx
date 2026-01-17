import { Metadata } from "next";
import { Leaf, Zap, Globe, Code, Users, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about CO2DE and our mission for sustainable software development",
};

const stats = [
  { value: "2-4%", label: "of global emissions from tech" },
  { value: "2045", label: "tech could match aviation emissions" },
  { value: "1.6B", label: "tons of CO₂ from software annually" },
];

const principles = [
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Write code that does more with less. Optimize algorithms, reduce unnecessary computations, and minimize resource usage.",
  },
  {
    icon: Globe,
    title: "Carbon Awareness",
    description: "Understand when and where your software runs. Consider the carbon intensity of the power grid in your optimization decisions.",
  },
  {
    icon: Code,
    title: "Hardware Efficiency",
    description: "Use the minimum hardware resources needed. Efficient code means fewer servers, less cooling, and reduced environmental impact.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              About CO2DE
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Building a Greener
              <br />
              <span className="gradient-text">Digital Future</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              CO2DE helps developers understand and reduce the environmental impact of their code,
              one file at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-gray-100 dark:bg-gray-900">
                <p className="text-3xl font-bold text-emerald-500 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">The Problem</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                The technology sector is responsible for approximately 2-4% of global greenhouse gas emissions —
                roughly equivalent to the aviation industry. As software becomes increasingly central to our lives,
                this footprint continues to grow.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-4">
                Every line of code we write has an environmental cost. From the energy consumed by servers
                running our applications to the resources needed for data processing, software development
                has a tangible impact on our planet.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Approach</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 w-fit mb-4">
                    <principle.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">How CO2DE Works</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="font-semibold mb-2">1. Code Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We analyze your code for patterns that affect energy consumption: loops, async operations,
                  DOM manipulation, complexity metrics, and more.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="font-semibold mb-2">2. Energy Estimation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Using heuristics based on file size, code complexity, and identified patterns, we estimate
                  the relative energy consumption and CO₂ footprint.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h3 className="font-semibold mb-2">3. AI-Powered Recommendations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our AI analyzes your code and provides actionable recommendations to improve energy efficiency,
                  with estimated improvements for each suggestion.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Every developer can make a difference. Start analyzing your code today and
              contribute to a more sustainable digital ecosystem.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/analyze"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
              >
                Start Analyzing
              </a>
              <a
                href="https://github.com/Govinda2809/Co2de"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
