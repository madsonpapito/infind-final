"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Star, Shield, Lock, AlertTriangle, ArrowRight, Quote } from "lucide-react"

// Testimonials based on Persona (Mental triggers: Gaslighting, Validation, Peace of Mind)
const testimonials = [
    {
        name: "Michael R.",
        role: "Verified User",
        text: "I thought I was going crazy. She kept telling me I was paranoid. This tool showed me the deleted messages from 'Jessica Gym' who was actually a guy named Mark. It hurt, but the gaslighting stopped instantly.",
        rating: 5,
        tag: "Stopped Gaslighting"
    },
    {
        name: "Sarah L.",
        role: "Verified User",
        text: "He changed his password and took his phone everywhere. My gut knew. This scan searched his number and found a hidden Tinder profile active 2 miles away. I finally had the proof to confront him.",
        rating: 5,
        tag: "Found Hidden Profile"
    },
    {
        name: "David K.",
        role: "Verified User",
        text: "Worth every penny. I didn't want to hire a PI for $3,000. This report gave me the exact location history and the WhatsApp logs I needed to file for divorce with evidence.",
        rating: 5,
        tag: "Saved $3,000"
    }
]

export default function SpecialOffer() {
    const [timeLeft, setTimeLeft] = useState(600) // 10 minutes

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const fmtTime = (s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0')
        const sec = (s % 60).toString().padStart(2, '0')
        return `${m}:${sec}`
    }

    return (
        <main className="min-h-screen bg-[#0A1128] text-white font-sans selection:bg-[#00D9FF] selection:text-[#0A1128]">

            {/* HEADER BANNER */}
            <div className="fixed top-0 w-full z-50 bg-[#FF6B35] text-white text-center py-2 font-bold text-xs md:text-sm uppercase tracking-widest shadow-lg">
                Access to your report is pending. Do not close.
            </div>

            <div className="pt-20 px-4 pb-20 max-w-4xl mx-auto">

                {/* HERO SECTION */}
                <section className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono mb-6"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        <span>CONFIDENTIAL RECOVERY LINK</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                        You Are Not <span className="text-[#00D9FF]">Paranoid.</span><br />
                        You Just Need <span className="text-[#FF6B35]">Proof.</span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        15,432 people trusted their gut and found the truth this month.
                        <strong className="text-white"> Don't let doubt consume you.</strong>
                    </p>
                </section>

                {/* SOCIAL PROOF GRID */}
                <section className="grid md:grid-cols-3 gap-6 mb-16">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0F1932] border border-white/5 p-6 rounded-2xl relative"
                        >
                            <Quote className="absolute top-4 right-4 text-white/5 w-10 h-10" />
                            <div className="flex text-yellow-400 mb-4 gap-1">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">"{t.text}"</p>
                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                <div>
                                    <p className="font-bold text-white text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                                <span className="text-[10px] bg-[#00D9FF]/10 text-[#00D9FF] px-2 py-1 rounded font-mono">{t.tag}</span>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* VALUE STACK / OFFER */}
                <section className="bg-white rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 text-center">
                        <p className="font-mono font-bold text-lg animate-pulse">OFFER EXPIRES IN {fmtTime(timeLeft)}</p>
                    </div>

                    <div className="p-8 md:p-12 text-center">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Unlock The Full Report</h2>
                            <p className="text-gray-500">Includes Deleted Messages, Hidden Photos & Location History</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-y-4 gap-x-12 text-left max-w-lg mx-auto mb-10">
                            <Feature text="WhatsApp & Telegram Logs" />
                            <Feature text="Hidden Dating Profiles (Tinder/Bumble)" />
                            <Feature text="Recover Deleted Photos" />
                            <Feature text="Real-Time GPS Location" />
                            <Feature text="Secret 'Archived' Chats" />
                            <Feature text="100% Anonymous Search" />
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="text-center">
                                <span className="text-gray-400 line-through text-lg font-bold mr-3">$47.00</span>
                                <span className="text-4xl font-black text-[#00D9FF]">$19.00</span>
                            </div>

                            <a href="https://pay.mycheckoutt.com/0198c1be-98b4-7315-a3bc-8c0fa9120e5c?ref=remarketing"
                                className="w-full max-w-md bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xl py-5 rounded-xl shadow-xl transition-transform transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                            >
                                <Lock className="w-5 h-5" /> REVEAL THE TRUTH NOW
                            </a>
                        </div>

                        <div className="mt-8 flex justify-center gap-6 opacity-60 grayscale">
                            <img src="/images/secure-payment-badge2.png" alt="Secure Payment" className="h-6" />
                        </div>
                    </div>
                </section>

                {/* SATISFACTION GUARANTEE */}
                <section className="text-center mt-12 max-w-2xl mx-auto">
                    <div className="inline-flex items-center justify-center p-4 bg-[#0F1932] rounded-full mb-4">
                        <Shield className="w-8 h-8 text-[#00D9FF]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">7-Day Money Back Guarantee</h3>
                    <p className="text-gray-400 text-sm">
                        If you don't find the answers you're looking for, or if you're not satisfied with the report accuracy, just email us and we'll refund 100% of your money. No questions asked. We prioritize your peace of mind.
                    </p>
                </section>

            </div>
        </main>
    )
}

function Feature({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{text}</span>
        </div>
    )
}
