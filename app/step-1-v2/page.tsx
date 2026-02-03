"use client"

import { Search, Shield, ShieldCheck, Heart, MessageSquare, Check, CheckCircle, Star, Users, AlertTriangle } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { FacebookTracker } from '@/components/FacebookTracker'


const StarRating = ({ rating = 5 }) => (
    <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
            <Star key={index} className="w-5 h-5 fill-current" />
        ))}
    </div>
);

export default function Step1V2() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/step-2?target=male');
    };

    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Facebook Tracking - envia dados enriquecidos para o dataLayer */}
            <FacebookTracker
                eventName="Lead"
                contentName="Step 1 V2 - Landing Page"
                contentCategory="Sales Funnel"
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#1d1d3a] via-[#2a2a4b] to-[#3a2c6b] text-white py-16 px-4 overflow-hidden">
                <div className="container mx-auto max-w-3xl text-center flex flex-col items-center">

                    <div className="inline-block bg-red-500/20 p-4 rounded-2xl shadow-lg mb-6 border border-red-500/30">
                        <Shield className="h-10 w-10 text-red-400" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Did He Call You <span className="text-red-500">&quot;Crazy&quot;</span> <br className="hidden md:block" />
                        When You Asked?
                    </h1>

                    <p className="text-lg text-gray-300 mb-4 max-w-xl">
                        The manipulator uses your doubt against you.
                    </p>

                    <p className="text-xl text-white font-bold mb-8 max-w-xl">
                        Get the proof. End the mind games. <span className="text-red-400">Today.</span>
                    </p>

                    <div className="inline-flex items-center bg-green-900/50 text-green-300 border border-green-700 rounded-full px-4 py-1.5 text-sm mb-8">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Digital Footprint Analysis - Updated January 2026</span>
                    </div>

                    {/* VOC-Based Trigger Bullets */}
                    <div className="w-full max-w-lg space-y-4 text-left mb-8">

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-red-500 shadow-md">
                            <div className="text-3xl mt-1">🚿</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Does He Take His Phone Into the Shower?</span>
                                Who does that unless they&apos;re waiting for something they can&apos;t let you see?
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-blue-400 shadow-md">
                            <div className="text-3xl mt-1">🌙</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Does the Blue Light Wake You at 2 AM?</span>
                                You see him smiling at the screen. He thinks you&apos;re asleep. <span className="text-blue-300 font-semibold">You&apos;re not.</span>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-yellow-400 shadow-md">
                            <div className="text-3xl mt-1">🔐</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Did He Suddenly Change His Password Yesterday?</span>
                                Your hands were shaking when you tried to check. We understand.
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-purple-400 shadow-md">
                            <div className="text-3xl mt-1">📱</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Why Does a Married Man Need Telegram or Signal?</span>
                                Hidden apps. Hidden notifications. <span className="text-purple-300 font-semibold">What&apos;s he hiding from you?</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleNavigate}
                        className="w-full max-w-lg bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        🛡️ STOP SUFFERING. KNOW TODAY.
                    </button>
                    <p className="text-xs text-gray-400 mt-2">100% anonymous investigation. They&apos;ll never know you checked.</p>
                </div>
            </section>

            {/* Validation Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        You&apos;re Not Crazy.
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-red-500 mb-6">
                        You Just Didn&apos;t Have Proof... <span className="text-slate-800">Yet.</span>
                    </h3>

                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
                        The anxiety that wakes you up at 3 AM is not paranoia — <strong className="text-slate-800">it&apos;s intuition.</strong>
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-left max-w-xl mx-auto mb-10">
                        <h4 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Signs of Gaslighting:
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">He calls you <strong>&quot;jealous&quot;</strong> when you ask questions.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">He says you&apos;re <strong>&quot;imagining things&quot;</strong> when you notice changes.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">He makes <strong>YOU</strong> feel guilty for noticing <strong>HIS</strong> behavior.</span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <p className="text-red-600 font-bold text-lg">This is gaslighting. And it ends today.</p>
                        </div>
                    </div>

                    <p className="text-lg text-black font-bold max-w-xl mx-auto">
                        You deserve clarity. You deserve the truth.
                    </p>
                </div>
            </section>

            {/* False Solutions Section */}
            <section className="py-20 px-4 bg-slate-900 text-white">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        The Enemy Is Not You.
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-10">
                        It&apos;s The Doubt.
                    </h3>

                    <div className="text-left max-w-xl mx-auto mb-10">
                        <p className="text-slate-300 mb-6 text-lg">You&apos;ve already tried:</p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Guessing his password</p>
                                    <p className="text-slate-400 text-sm">Frustrating. And he changed it anyway.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Creating a fake profile to test him</p>
                                    <p className="text-slate-400 text-sm">He didn&apos;t fall for it. Or worse, he did.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Asking him directly</p>
                                    <p className="text-slate-400 text-sm">He denied everything and made you feel crazy.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Ignoring the signs</p>
                                    <p className="text-slate-400 text-sm">The anxiety got worse every single day.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30 max-w-xl mx-auto">
                        <p className="text-lg text-slate-200 mb-2">
                            <strong className="text-white">None of it worked.</strong> Because he knows how to hide.
                        </p>
                        <p className="text-xl text-green-400 font-bold">
                            But digital footprints don&apos;t lie.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        What Our System Reveals
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-12">
                        Advanced techniques that uncover what they tried to hide.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-pink-100 p-4 rounded-xl mb-4">
                                <Search className="h-8 w-8 text-pink-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">DATING APP PROFILES</h4>
                            <p className="text-gray-500 text-sm">Hidden Tinder, Bumble, Hinge profiles linked to his number or email.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-purple-100 p-4 rounded-xl mb-4">
                                <Users className="h-8 w-8 text-purple-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">SUSPICIOUS INTERACTIONS</h4>
                            <p className="text-gray-500 text-sm">Profiles visited repeatedly. Late-night likes. Comments he deleted.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-red-100 p-4 rounded-xl mb-4">
                                <Heart className="h-8 w-8 text-red-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">SECRET FOLLOWS</h4>
                            <p className="text-gray-500 text-sm">New private profiles he started following. The &quot;work friend.&quot; The ex.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-orange-100 p-4 rounded-xl mb-4">
                                <MessageSquare className="h-8 w-8 text-orange-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">DIGITAL FOOTPRINT</h4>
                            <p className="text-gray-500 text-sm">Activity traces that remain even after &quot;deleting&quot; conversations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Over <span className="text-red-500">127,000 people</span> already discovered the truth.
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/83.jpg" alt="Sarah" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">Sarah, 42</p>
                                    <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" />Verified User</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-3">
                                &quot;For 8 months I felt that something was wrong. He denied everything. Called me paranoid. The tool showed me conversations with his &apos;best friend&apos; that made me cry for days.&quot;
                            </blockquote>
                            <p className="text-red-600 font-bold text-sm">I wasn&apos;t crazy. I was right.</p>
                            <div className="mt-3">
                                <StarRating />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/86.jpg" alt="Jennifer" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">Jennifer, 33</p>
                                    <p className="text-sm text-gray-500">Investigation completed January 2026</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-3">
                                &quot;My fiancé was exchanging intimate messages with 3 different women. I called off the wedding 2 weeks before. It hurt, but it saved me from a lie.&quot;
                            </blockquote>
                            <p className="text-red-600 font-bold text-sm">My intuition was right all along.</p>
                            <div className="mt-3">
                                <StarRating />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/87.jpg" alt="Michelle" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">Michelle, 35</p>
                                    <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" />Verified User</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-3">
                                &quot;My husband swore I was crazy, that she was &apos;just a work friend.&apos; The tool showed provocative photos he was liking at 2 AM. Now I&apos;m moving forward without doubts.&quot;
                            </blockquote>
                            <p className="text-red-600 font-bold text-sm">I wasn&apos;t crazy. I was awake.</p>
                            <div className="mt-3">
                                <StarRating />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-[#1d1d3a] py-16 px-4">
                <div className="container mx-auto max-w-2xl text-center">

                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
                        You Deserve The Truth.
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        One way or another, <strong className="text-white">sleep peacefully tonight.</strong>
                    </p>

                    <button
                        onClick={handleNavigate}
                        className="w-full max-w-lg bg-[#FF4081] hover:bg-[#f53677] text-white font-extrabold py-5 px-6 rounded-full text-lg md:text-xl shadow-[0_10px_40px_-10px_rgba(255,64,129,0.6)] transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                    >
                        <span className="text-2xl">🛡️</span> I DESERVE THE TRUTH. START NOW.
                    </button>

                    <div className="mt-6 space-y-2">
                        <p className="text-sm text-gray-300">
                            100% anonymous. Your investigation will remain completely private.
                        </p>
                        <p className="text-sm text-gray-400">
                            More than 127,000 people have already discovered the truth.
                        </p>
                    </div>

                </div>
            </section>

        </div>
    )
}
