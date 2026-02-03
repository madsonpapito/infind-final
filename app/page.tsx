"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Flame } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [exposedCount, setExposedCount] = useState(3218)

  useEffect(() => {
    // Increment the counter slightly to show activity
    const interval = setInterval(() => {
      setExposedCount((prev) => prev + Math.floor(Math.random() * 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSelection = (gender: "male" | "female") => {
    if (gender === "male") {
      router.push("/step-1-v2") // Monitor Boyfriend
    } else {
      router.push("/step-1-v3") // Monitor Girlfriend
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center border border-gray-100">
        <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight mb-2">DEEPLINKS</h1>
        <p className="text-gray-500 text-sm uppercase tracking-widest font-medium mb-8">
          Advanced Partner Monitoring System
        </p>

        <h2 className="text-xl font-bold text-[#1E293B] mb-4">
          Discover the Truth About Your Partner
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Our advanced monitoring system provides comprehensive insights into your partner's activities across all
          platforms.
        </p>

        <h3 className="text-lg font-bold text-[#1E293B] mb-6">Select Target Gender</h3>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => handleSelection("male")}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0F172A] hover:bg-gray-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 mb-3 rounded-full border-2 border-[#0F172A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6 text-[#0F172A]"
              >
                <circle cx="10" cy="14" r="5" />
                <line x1="19" y1="5" x2="13.5" y2="10.5" />
                <polyline points="19 5 14 5 19 10" />
              </svg>
            </div>
            <span className="font-bold text-[#0F172A] text-sm">Monitor My</span>
            <span className="font-extrabold text-[#0F172A] text-lg">Boyfriend</span>
          </button>

          <button
            onClick={() => handleSelection("female")}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-2xl hover:border-[#0F172A] hover:bg-gray-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 mb-3 rounded-full border-2 border-[#0F172A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6 text-[#0F172A]"
              >
                <circle cx="12" cy="9" r="5" />
                <line x1="12" y1="14" x2="12" y2="21" />
                <line x1="9" y1="18" x2="15" y2="18" />
              </svg>
            </div>
            <span className="font-bold text-[#0F172A] text-sm">Monitor My</span>
            <span className="font-extrabold text-[#0F172A] text-lg">Girlfriend</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
          <span>
            <strong className="text-gray-700">{exposedCount.toLocaleString()}</strong> partners already exposed this
            week
          </span>
        </div>
      </div>
    </div>
  )
}
