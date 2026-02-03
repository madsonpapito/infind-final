"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ShieldCheck, ChevronRight, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [selectedGender, setSelectedGender] = useState<"male" | "female" | null>(null)

  const handleSelection = (gender: "male" | "female") => {
    setSelectedGender(gender)
    setTimeout(() => {
      if (gender === "male") router.push("/step-1-v2") // Boyfriend
      if (gender === "female") router.push("/step-1-v3") // Girlfriend
    }, 400)
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0A1128]">

      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00D9FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#FF6B35] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse delay-1000"></div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-[#00D9FF]/10 border border-[#00D9FF]/20 px-4 py-1.5 rounded-full mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
        </span>
        <span className="text-[#00D9FF] text-[10px] font-mono tracking-widest uppercase">System Online • v4.2.0</span>
      </motion.div>

      <div className="text-center space-y-2 mb-10 max-w-lg z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-white tracking-tight"
        >
          Start Investigation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg"
        >
          Who do you want to monitor? select an option below:
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl z-10">

        {/* OPTION 1: BOYFRIEND */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 217, 255, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelection("male")}
          className={`
                group relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-300
                ${selectedGender === 'male' ? 'bg-[#00D9FF]/10 border-[#00D9FF]' : 'bg-[#0A1128]/50 border-white/10 hover:border-[#00D9FF]/50'}
            `}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#00D9FF] transition-colors">
              <span className="text-3xl">👨🏻</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">My Boyfriend</h3>
              <p className="text-xs text-gray-500 font-mono">Check for: Tinder, WhatsApp, DM</p>
            </div>
          </div>
          <ChevronRight className={`text-gray-600 group-hover:text-[#00D9FF] transition-colors ${selectedGender === 'male' ? 'translate-x-1' : ''}`} />
        </motion.button>

        {/* OPTION 2: GIRLFRIEND */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 107, 53, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelection("female")}
          className={`
                group relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-300
                ${selectedGender === 'female' ? 'bg-[#FF6B35]/10 border-[#FF6B35]' : 'bg-[#0A1128]/50 border-white/10 hover:border-[#FF6B35]/50'}
            `}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
              <span className="text-3xl">👩🏻</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B35] transition-colors">My Girlfriend</h3>
              <p className="text-xs text-gray-500 font-mono">Check for: Instagram, Locations</p>
            </div>
          </div>
          <ChevronRight className={`text-gray-600 group-hover:text-[#FF6B35] transition-colors ${selectedGender === 'female' ? 'translate-x-1' : ''}`} />
        </motion.button>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all z-10"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="text-xs text-gray-400">100% Anonymous</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          <span className="text-xs text-gray-400">AES-256 Encryption</span>
        </div>
      </motion.div>

    </main>
  )
}
