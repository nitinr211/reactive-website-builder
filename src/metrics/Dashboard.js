import React, { useState } from "react";

const phases = [
  {
    title: "Phase 1: Cash Flow Sprints",
    timeframe: "2–4 weeks",
    profitRange: "$1K–$5K/month",
    goals: "Launch products, test ads, get first wins",
    signal: "Hit $1K/week, know ad setup, start documenting results",
  },
  {
    title: "Phase 2: System Stack & Scale",
    timeframe: "4–8 weeks",
    profitRange: "$5K–$15K/month",
    goals: "Scale multiple winners, automate testing",
    signal: "Daily profit, launch in <24h, case study content",
  },
  {
    title: "Phase 3: Productize the System",
    timeframe: "Month 2–3",
    profitRange: "$10K–$30K/month",
    goals: "Sell templates, guides, build digital brand",
    signal: "Inbound leads, people buy your system",
  },
  {
    title: "Phase 4: High-Ticket Offers / Agency",
    timeframe: "Month 3–4+",
    profitRange: "$20K–$50K+/month",
    goals: "Launch $997+ packages, work with select clients",
    signal: "Don’t need clients, but people want in",
  },
];

export default function Dashboard() {
  const [currentPhase, setCurrentPhase] = useState(0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🚀 Business Phase Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phases.map((phase, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 shadow-lg border-2 ${
              index === currentPhase ? "border-black" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{phase.title}</h2>
              {index === currentPhase && <span className="text-green-600">🌟 Active</span>}
            </div>
            <p className="text-sm text-gray-500 mb-2">⏱ {phase.timeframe}</p>
            <p className="text-sm text-gray-700 mb-2">💸 {phase.profitRange}</p>
            <p className="mb-1">🎯 <strong>Goal:</strong> {phase.goals}</p>
            <p>📈 <strong>Graduation Signal:</strong> {phase.signal}</p>
            {index === currentPhase && index < phases.length - 1 && (
              <button
                onClick={() => setCurrentPhase(index + 1)}
                className="mt-4 bg-black text-white py-2 px-4 rounded-xl"
              >
                ✅ Mark Phase Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
