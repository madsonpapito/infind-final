"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Shield, Play } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Step1V3() {
    const router = useRouter()

    const handleNavigate = () => {
        // Navigate to step-2 with female target context
        router.push('/step-2?target=female')
    }

    return (
        <main className="min-h-screen bg-[#0A1128] text-white flex flex-col relative overflow-hidden font-sans">

            {/* Dynamic Background - Orange Hint for Female Context */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#FF6B35] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
                <div className="absolute top-[40%] left-[-200px] w-[600px] h-[600px] bg-[#0A1128] rounded-full mix-blend-screen filter blur-[120px] opacity-50"></div>
            </div>

            {/* Navbar */}
            <nav className="p-4 z-10 flex items-center justify-between border-b border-white/5 bg-[#0A1128]/80 backdrop-blur-md sticky top-0">
                <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono tracking-widest text-green-500 uppercase">Secure Connection</span>
                </div>
            </nav>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center px-6 py-10 z-10 max-w-lg mx-auto w-full">

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 mb-8"
                >
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#FF6B35]/10 ring-1 ring-[#FF6B35]/50 mb-4 shadow-[0_0_20px_rgba(255,107,53,0.2)]">
                        <span className="text-3xl">🕵🏻‍♀️</span>
                    </div>
                    <h1 className="text-3xl font-black leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Discover if your <br /></span>
                        <span className="text-[#FF6B35]">Girlfriend</span> is hiding something.
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                        Our advanced AI scans public databases, social interactions, and hidden dating profiles to find the truth.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full space-y-3 mb-8"
                >
                    <FeatureCard icon="📍" title="Location History" desc="Track suspicious movement patterns." color="border-[#FF6B35]/30" />
                    <FeatureCard icon="💬" title="Hidden Messages" desc="Find deleted or archived chats." color="border-[#FF6B35]/30" />
                    <FeatureCard icon="📸" title="Secret Photos" desc="Recover hidden or deleted media." color="border-[#FF6B35]/30" />
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={handleNavigate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#ff8c61] rounded-xl font-bold text-white text-lg shadow-[0_0_30px_rgba(255,107,53,0.3)] flex items-center justify-center gap-2"
                >
                    START INVESTIGATION <Play className="w-4 h-4 fill-current" />
                </motion.button>

                <p className="mt-4 text-[10px] text-gray-500 text-center uppercase tracking-widest">
                    By continuing, you agree to our Terms of Service.
                </p>

            </div>

        </main>
    )
}

function FeatureCard({ icon, title, desc, color }: { icon: string, title: string, desc: string, color?: string }) {
    return (
        <div className={`flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:${color || 'border-[#00D9FF]/30'} transition-colors backdrop-blur-sm`}>
            <span className="text-2xl">{icon}</span>
            <div>
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
            </div>
        </div>
    )
}
