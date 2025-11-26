import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  AlertCircle, 
  Shield, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Lock, 
  Award,
  BookOpen,
  MessageCircle,
  Eye
} from 'lucide-react';

// Types for props and data
interface FaqItem {
  question: string;
  answer: string;
}

interface ModuleItem {
  title: string;
  items: string[];
  value: string;
  icon: React.ReactNode;
}

const SalesPage: React.FC = () => {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 32, seconds: 18 });
  
  // State for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToCheckout = () => {
    const element = document.getElementById('checkout-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50">
      
      {/* 1. HEADER / HERO SECTION */}
      <header className="bg-slate-900 text-white pt-16 pb-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center bg-blue-900/50 border border-blue-500/30 rounded-full px-4 py-1 mb-8">
            <Award className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm font-medium tracking-wide text-blue-100">Method Validated by Psychology Experts</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Do You Feel Like Something Has Changed, <br />
            <span className="text-orange-500">But Can’t Explain Why?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Learn to identify behavior signals and body language hidden in plain sight + Proven techniques to strengthen your relationship.
          </p>
          
          <button 
            onClick={scrollToCheckout}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 px-10 rounded-lg text-lg shadow-lg transform transition hover:scale-105 duration-200"
          >
            I WANT TO DISCOVER THE TRUTH NOW
          </button>

          <div className="mt-12 opacity-90">
            {/* Placeholder for Hero Image */}
            <div className="w-full max-w-2xl mx-auto h-64 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
              <div className="text-center text-slate-500">
                <span className="block mb-2">Image of couple looking thoughtful/worried</span>
                <span className="text-sm">(Replace with high-quality photo)</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. PROBLEM AGITATION */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Have You Caught Yourself Thinking...</h2>
          
          <div className="space-y-4 mb-12">
            {[
              "Why have they been so distant lately?",
              "Do these excuses make sense, or is there something else?",
              "Why won't my intuition let me rest?",
              "Am I being paranoid, or are there real signs?",
              "How can I know the truth without seeming controlling?"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <X className="w-6 h-6 text-red-600 mr-4 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-slate-700 italic">"{item}"</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 p-8 rounded-xl border border-slate-200">
            <p className="text-lg leading-relaxed text-slate-700">
              The feeling of uncertainty in a relationship is one of the worst emotional experiences you can endure. You don't want to believe it, but the signs are there. And the worst part: <span className="font-bold">you don't know if you are interpreting them correctly or just letting your insecurities do the talking.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRESENTATION OF THE SOLUTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-100">There Is a Scientific Way to Read Behaviors</h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            <span className="text-orange-500 font-bold">"Telltale Signs"</span> is a comprehensive guide based on behavioral psychology and body language studies that will teach you how to identify real behavioral changes—and more importantly: how to rebuild trust in your relationship.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <Check className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Scientific Method</h3>
              <p className="text-slate-400">Step-by-step method to interpret signals without guesswork.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <Check className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Full Checklist</h3>
              <p className="text-slate-400">Comprehensive list of behaviors to cross-reference.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <Check className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Video Lessons</h3>
              <p className="text-slate-400">Practical visual examples of body language.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <Check className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Reconnection</h3>
              <p className="text-slate-400">Bonus guide for strengthening and healing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">See What Those Who Applied This Method Say:</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mary S.",
                age: "34",
                quote: "I had been in doubt for months. This guide gave me clarity not only on the signs but also showed me how to communicate my concerns in a healthy way. It saved my marriage.",
                stars: 5
              },
              {
                name: "Charles R.",
                age: "41",
                quote: "I realized I was misinterpreting some of my wife's behaviors. The bonus module helped us reconnect. Thank you so much!",
                stars: 5
              },
              {
                name: "Anna P.",
                age: "29",
                quote: "Unfortunately, I confirmed my suspicions, but having this knowledge gave me the power to make informed decisions about my future.",
                stars: 4
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.stars ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="font-bold text-slate-900">
                  {testimonial.name}, <span className="font-normal text-sm text-slate-500">{testimonial.age} years old</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT STACK */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900">Everything You Will Receive Today:</h2>

          <div className="space-y-6">
            <ModuleCard 
              title="MODULE 1: Fundamentals of Non-Verbal Communication"
              value="$147"
              icon={<BookOpen className="w-6 h-6 text-blue-600" />}
              items={[
                "How to interpret facial micro-expressions",
                "The science behind body language",
                "The difference between normal changes and red flags"
              ]}
            />
            <ModuleCard 
              title="MODULE 2: Behavioral Alert Signs"
              value="$197"
              icon={<AlertCircle className="w-6 h-6 text-blue-600" />}
              items={[
                "27 routine changes that deserve attention",
                "Revealing technological patterns",
                "Complete behavioral checklist"
              ]}
            />
            <ModuleCard 
              title="MODULE 3: Telltale Body Language"
              value="$167"
              icon={<Eye className="w-6 h-6 text-blue-600" />}
              items={[
                "Video lessons with practical demonstrations",
                "Observation exercises",
                "Real cases analyzed"
              ]}
            />
            <ModuleCard 
              title="MODULE 4: Verbal Communication Patterns"
              value="$147"
              icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
              items={[
                "How to identify lies through speech",
                "Assertive questioning techniques",
                "Analyzing inconsistencies in stories"
              ]}
            />
            
            {/* Bonuses */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-orange-600">PLUS 3 EXCLUSIVE BONUSES</h3>
              <ModuleCard 
                title="BONUS #1: Healthy Marriage Guide"
                value="$197"
                icon={<Award className="w-6 h-6 text-orange-500" />}
                items={["10 pillars of lasting relationships", "Practical reconnection exercises", "Templates for difficult conversations"]}
                isBonus
              />
              <ModuleCard 
                title="BONUS #2: Printable PDF Checklist"
                value="$47"
                icon={<Check className="w-6 h-6 text-orange-500" />}
                items={["List of signs by category", "Scoring system", "Immediate action guide"]}
                isBonus
              />
              <ModuleCard 
                title="BONUS #3: Private Support Group Access"
                value="$97"
                icon={<Lock className="w-6 h-6 text-orange-500" />}
                items={["Community support", "Monthly Q&A", "Safe environment"]}
                isBonus
              />
            </div>
          </div>

          {/* Price Anchor Box */}
          <div id="checkout-section" className="mt-16 bg-slate-900 text-white p-8 md:p-12 rounded-2xl text-center shadow-2xl relative overflow-hidden border-2 border-orange-500">
            <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">90% OFF</div>
            <p className="text-slate-400 text-lg mb-2">Total Value: <span className="line-through decoration-red-500">$999</span></p>
            <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
              $97 <span className="text-sm font-normal text-slate-300 block mt-2">or 12x of $9.70</span>
            </h3>
            <p className="text-green-400 font-medium mb-8">Access Immediately After Payment</p>
            
            <button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-lg transform transition hover:scale-105 duration-200 mb-4">
              YES! I WANT ACCESS NOW
            </button>
            
            <div className="flex justify-center items-center space-x-4 text-xs text-slate-400 mt-4">
              <span className="flex items-center"><Lock className="w-3 h-3 mr-1" /> Secure Payment</span>
              <span className="flex items-center"><Shield className="w-3 h-3 mr-1" /> Privacy Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GUARANTEE */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-slate-900 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-slate-900">30-Day Unconditional Guarantee</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            If for any reason you are not satisfied with the content, simply send an email within 30 days, and we will refund 100% of your investment. No questions asked, no red tape.
            <br/><br/>
            <strong>You have nothing to lose. We take all the risk.</strong>
          </p>
          <a href="#checkout-section" className="text-orange-600 font-bold hover:underline">I WANT TO START NOW WITH ZERO RISK &rarr;</a>
        </div>
      </section>

      {/* 7. URGENCY */}
      <div className="bg-red-600 text-white py-4 px-4 sticky bottom-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center mb-2 md:mb-0">
            <Clock className="w-5 h-5 mr-2 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-sm md:text-base">Limited Time Offer ends in:</span>
          </div>
          <div className="font-mono text-xl md:text-2xl font-bold tracking-widest bg-red-800 px-4 py-1 rounded">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="hidden md:block text-xs opacity-90">
            Price reverts to $497 soon.
          </div>
        </div>
      </div>

      {/* 8. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 bg-slate-50 hover:bg-slate-100 transition text-left"
                >
                  <span className="font-semibold text-slate-800">{faq.question}</span>
                  {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>
                {openFaqIndex === index && (
                  <div className="p-5 bg-white text-slate-600 border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AUTHOR */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="w-48 h-48 bg-slate-700 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-slate-600">
             <span className="text-sm text-center px-4">Author Photo Placeholder</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Who Created This Method?</h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              <strong>[Expert Name]</strong> is a Behavioral Psychologist with over 15 years of experience helping couples rebuild trust and communication. They have assisted more than 2,000 people in finding clarity in their relationships.
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-orange-500" /> PhD in Behavioral Psychology</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-orange-500" /> Author of 3 Best-Sellers</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-orange-500" /> Featured in Major Media Outlets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">You Have Two Choices Right Now:</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl border border-slate-200 opacity-75">
              <h3 className="text-xl font-bold mb-4 text-slate-500">Choice 1</h3>
              <p className="text-slate-600">
                Continue living with doubts, anxiety, and uncertainty, letting mistrust corrode your relationship and your peace of mind.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-orange-500 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-bl">RECOMMENDED</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Choice 2</h3>
              <p className="text-slate-600">
                Invest just <strong>$97</strong> today to gain clarity, practical tools, and a defined path—whether to confirm your suspicions or to strengthen your relationship further.
              </p>
            </div>
          </div>

          <button 
            onClick={scrollToCheckout}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 px-12 rounded-lg text-xl shadow-lg transform transition hover:scale-105 duration-200"
          >
            YES, I WANT CLARITY NOW
          </button>
          
          <div className="mt-12 text-left max-w-2xl mx-auto text-slate-600 space-y-4 text-sm border-t pt-8 border-slate-200">
            <p><strong>P.S.:</strong> Remember: this special offer of $97 (instead of $999) expires in 48 hours. After that, the price returns to normal, and the bonuses will be removed.</p>
            <p><strong>P.P.S.:</strong> With the 30-day guarantee, you can access all the content, apply the techniques, and if you don't like it, get 100% of your money back. You literally have nothing to lose.</p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-500 py-12 text-center text-sm">
        <p>&copy; 2023 Telltale Signs Guide. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
const ModuleCard: React.FC<ModuleItem & { isBonus?: boolean }> = ({ title, items, value, icon, isBonus }) => (
  <div className={`p-6 rounded-lg border flex flex-col md:flex-row gap-6 ${isBonus ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'}`}>
    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isBonus ? 'bg-orange-100' : 'bg-blue-100'}`}>
      {icon}
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-bold text-lg ${isBonus ? 'text-orange-800' : 'text-slate-900'}`}>{title}</h3>
        <span className="text-sm font-semibold bg-white border px-2 py-1 rounded text-slate-500">Value: {value}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center text-slate-600 text-sm">
            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Data
const faqData: FaqItem[] = [
  {
    question: "Will this content help me even if I just have doubts?",
    answer: "Yes! The goal is not just to identify betrayal, but also to eliminate unfounded insecurities and strengthen healthy relationships through better understanding of non-verbal cues."
  },
  {
    question: "I'm not good at reading people. Can I apply this?",
    answer: "Absolutely! The method is step-by-step, with practical videos and real examples. It's designed for beginners to learn effectively."
  },
  {
    question: "What if I confirm my suspicions?",
    answer: "The guide also prepares you to handle that situation, including how to broach the subject assertively and when to seek professional help."
  },
  {
    question: "How long do I have access?",
    answer: "You get Lifetime Access! You can review the content, videos, and updates whenever you need."
  },
  {
    question: "Is it safe? Is my data protected?",
    answer: "Totally safe. Payment is processed by a certified third-party platform with SSL encryption. The purchase is 100% discreet on your statement."
  },
  {
    question: "Does this work for new or old relationships?",
    answer: "It works for any stage of a relationship—dating, engagement, or marriage. Human behavior patterns are consistent regardless of relationship duration."
  }
];

export default SalesPage;
