"use client"

import { Search, Shield, ShieldCheck, Heart, MessageSquare, Check, CheckCircle, Star, Users, AlertTriangle, Target, Eye } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

const StarRating = ({ rating = 5 }) => (
    <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
            <Star key={index} className="w-5 h-5 fill-current" />
        ))}
    </div>
);

export default function Step1V3() {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/step-2?target=female');
    };

    return (
        <div className="bg-white text-gray-800 font-sans">

            {/* Hero Section - Deep Navy with Cyan accents */}
            <section className="bg-gradient-to-br from-[#0A1128] via-[#1a2744] to-[#0d1a30] text-white py-16 px-4 overflow-hidden">
                <div className="container mx-auto max-w-3xl text-center flex flex-col items-center">

                    <div className="inline-block bg-[#FF6B35]/20 p-4 rounded-2xl shadow-lg mb-6 border border-[#FF6B35]/30">
                        <Target className="h-10 w-10 text-[#FF6B35]" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Without Proof, <span className="text-[#FF6B35]">She&apos;ll Make You</span> <br className="hidden md:block" />
                        Look Crazy.
                    </h1>

                    <p className="text-lg text-gray-300 mb-4 max-w-xl">
                        Data doesn&apos;t lie. Technical evidence stops the gaslighting cold.
                    </p>

                    <p className="text-xl text-white font-bold mb-8 max-w-xl">
                        Get concrete proof. End the doubt. <span className="text-[#00D9FF]">Reclaim control.</span>
                    </p>

                    <div className="inline-flex items-center bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/40 rounded-full px-4 py-1.5 text-sm mb-8">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Digital Trace Analysis - Updated January 2026</span>
                    </div>

                    {/* VOC-Based Trigger Bullets - Male Focused */}
                    <div className="w-full max-w-lg space-y-4 text-left mb-8">

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-[#FF6B35] shadow-md">
                            <div className="text-3xl mt-1">🚿</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Does She Take Her Phone to the Bathroom?</span>
                                Who does that unless they&apos;re expecting something they can&apos;t let you see?
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-[#00D9FF] shadow-md">
                            <div className="text-3xl mt-1">🛏️</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Has Your Sex Life Disappeared?</span>
                                When it happens, you feel hesitation. Almost <span className="text-[#00D9FF] font-semibold">repulsion.</span> Something changed.
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-yellow-400 shadow-md">
                            <div className="text-3xl mt-1">💪</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Did She Suddenly Start the Gym?</span>
                                New lingerie. New makeup. But you never see it. <span className="text-yellow-300 font-semibold">Who is it for?</span>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg flex items-start gap-4 border-l-[6px] border-purple-400 shadow-md">
                            <div className="text-3xl mt-1">👤</div>
                            <div className="text-sm text-gray-200 leading-relaxed">
                                <span className="font-bold text-white text-base block mb-1">Who is &quot;John from Work&quot;?</span>
                                Frequent mentions. Late replies. <span className="text-purple-300 font-semibold">Stories that don&apos;t add up.</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleNavigate}
                        className="w-full max-w-lg bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:opacity-90 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        🎯 GET CONCRETE PROOF NOW
                    </button>
                    <p className="text-xs text-gray-400 mt-2">100% anonymous investigation. She&apos;ll never know you checked.</p>
                </div>
            </section>

            {/* Validation Section - Male Focused */}
            <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        You&apos;re Not Paranoid.
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#FF6B35] mb-6">
                        You Just Didn&apos;t Have Proof... <span className="text-slate-800">Yet.</span>
                    </h3>

                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
                        The knot in your stomach every time she&apos;s on her phone is not insecurity — <strong className="text-slate-800">it&apos;s your gut telling you something is wrong.</strong>
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-left max-w-xl mx-auto mb-10">
                        <h4 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Signs She&apos;s Gaslighting You:
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">She calls you <strong>&quot;controlling&quot;</strong> when you ask questions.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">She says you&apos;re <strong>&quot;insecure&quot;</strong> when you notice her changes.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">She makes <strong>YOU</strong> feel guilty for noticing <strong>HER</strong> behavior.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">✗</span>
                                <span className="text-gray-700">She suggests you &quot;need therapy&quot; when you express concern.</span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <p className="text-[#FF6B35] font-bold text-lg">This is gaslighting. And it ends today.</p>
                        </div>
                    </div>

                    <p className="text-lg text-black font-bold max-w-xl mx-auto">
                        You deserve clarity. You deserve the truth. You deserve to reclaim your peace of mind.
                    </p>
                </div>
            </section>

            {/* False Solutions Section - Male Focused */}
            <section className="py-20 px-4 bg-[#0A1128] text-white">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        The Enemy Is Not You.
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#FF6B35] mb-10">
                        It&apos;s The Doubt Eating You Alive.
                    </h3>

                    <div className="text-left max-w-xl mx-auto mb-10">
                        <p className="text-slate-300 mb-6 text-lg">You&apos;ve already tried:</p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Trying to guess her password</p>
                                    <p className="text-slate-400 text-sm">Frustrating. And she changed it anyway.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Asking her directly</p>
                                    <p className="text-slate-400 text-sm">She denied everything and called you &quot;controlling.&quot;</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Asking to meet &quot;the friend&quot;</p>
                                    <p className="text-slate-400 text-sm">She agrees but somehow it never happens.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Ignoring the signs</p>
                                    <p className="text-slate-400 text-sm">The anxiety and feeling of emasculation only got worse.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10">
                                <span className="text-red-400 text-xl">❌</span>
                                <div>
                                    <p className="font-semibold text-white">Seeking validation elsewhere</p>
                                    <p className="text-slate-400 text-sm">A temporary fix that doesn&apos;t solve the core issue.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#00D9FF]/20 to-cyan-500/20 p-6 rounded-2xl border border-[#00D9FF]/30 max-w-xl mx-auto">
                        <p className="text-lg text-slate-200 mb-2">
                            <strong className="text-white">None of it worked.</strong> Because she knows how to hide.
                        </p>
                        <p className="text-xl text-[#00D9FF] font-bold">
                            But digital traces don&apos;t lie.
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
                        Technical analysis that uncovers what she tried to hide.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-[#FF6B35]/10 p-4 rounded-xl mb-4">
                                <Search className="h-8 w-8 text-[#FF6B35]" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">DATING APP PROFILES</h4>
                            <p className="text-gray-500 text-sm">Hidden Tinder, Bumble, Hinge profiles linked to her number or email.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-purple-100 p-4 rounded-xl mb-4">
                                <Users className="h-8 w-8 text-purple-500" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">SUSPICIOUS CONTACTS</h4>
                            <p className="text-gray-500 text-sm">Profiles she interacts with frequently. Late-night activity. Hidden conversations.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition-shadow">
                            <div className="inline-block bg-[#00D9FF]/10 p-4 rounded-xl mb-4">
                                <Eye className="h-8 w-8 text-[#00D9FF]" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">SECRET FOLLOWS</h4>
                            <p className="text-gray-500 text-sm">New profiles she started following. The &quot;work colleague.&quot; The ex.</p>
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

            {/* Testimonials Section - Male Testimonials */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Over <span className="text-[#FF6B35]">127,000 men</span> already discovered the truth.
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/83.jpg" alt="Michael" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">Michael, 38</p>
                                    <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" />Verified User</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-3">
                                &quot;For 6 months I felt something was off. She said I was &apos;insecure&apos; and needed therapy. The tool showed me conversations with her &apos;gym buddy&apos; that confirmed everything.&quot;
                            </blockquote>
                            <p className="text-[#FF6B35] font-bold text-sm">I wasn&apos;t paranoid. I was right.</p>
                            <div className="mt-3">
                                <StarRating />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/86.jpg" alt="David" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">David, 45</p>
                                    <p className="text-sm text-gray-500">Investigation completed January 2026</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-3">
                                &quot;My wife was exchanging messages with 2 different guys from her &apos;work team.&apos; I confronted her with proof. No more gaslighting. No more manipulation.&quot;
                            </blockquote>
                            <p className="text-[#FF6B35] font-bold text-sm">I finally had the evidence I needed.</p>
                            <div className="mt-3">
                                <StarRating />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg text-left">
                            <div className="flex items-center mb-4">
                                <Image src="/images/87.jpg" alt="James" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <p className="font-bold">James, 32</p>
                                    <p className="text-sm text-green-600 flex items-center"><Check className="h-4 w-4 mr-1" />Verified User</p>
                                </div>
                            </div>
                            <blockquote className="text-gray-600 italic mb-3">
                                &quot;She started going to the gym, buying new clothes, but our intimacy was dead. I knew something was wrong but couldn&apos;t prove it. Now I can move forward.&quot;
                            </blockquote>
                            <p className="text-[#FF6B35] font-bold text-sm">I got my control back.</p>
                            <div className="mt-3">
                                <StarRating />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-[#0A1128] py-16 px-4">
                <div className="container mx-auto max-w-2xl text-center">

                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
                        You Deserve The Truth.
                    </h2>
                    <p className="text-xl text-slate-300 mb-4">
                        End the mental torture. <strong className="text-white">Reclaim your peace of mind.</strong>
                    </p>
                    <p className="text-lg text-[#00D9FF] mb-8">
                        You&apos;re not paranoid. You just didn&apos;t have proof.
                    </p>

                    <button
                        onClick={handleNavigate}
                        className="w-full max-w-lg bg-[#FF6B35] hover:bg-[#ff8c5a] text-white font-extrabold py-5 px-6 rounded-full text-lg md:text-xl shadow-[0_10px_40px_-10px_rgba(255,107,53,0.6)] transition-all transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                    >
                        <span className="text-2xl">🎯</span> GET CONCRETE PROOF NOW
                    </button>

                    <div className="mt-6 space-y-2">
                        <p className="text-sm text-gray-300">
                            100% anonymous. Your investigation will remain completely private.
                        </p>
                        <p className="text-sm text-gray-400">
                            More than 127,000 men have already discovered the truth.
                        </p>
                    </div>

                </div>
            </section>

        </div>
    )
}
