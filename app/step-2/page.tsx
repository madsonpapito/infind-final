"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { User, CheckCircle, Heart, MessageCircle, Lock, AlertTriangle, Instagram, LockOpen } from "lucide-react"
import { useFacebookTracking } from "@/hooks/useFacebookTracking"

// ==========================================================
// DADOS DOS PERFIS E IMAGENS
// ==========================================================
// Perfis que interagem com o alvo
const FEMALE_PROFILES = [
  "@jessy_nutty", "@alexis_30", "@izes", "@maryjane434",
  "@emma.whistle32", "@celina_anderson467", "@letty.miriah99",
]
const FEMALE_IMAGES = [
  "/images/male/perfil/1.jpg", "/images/male/perfil/2.jpg", "/images/male/perfil/3.jpg",
  "/images/male/perfil/4.jpg", "/images/male/perfil/5.jpg", "/images/male/perfil/6.jpg",
  "/images/male/perfil/7.jpg", "/images/male/perfil/8.jpg", "/images/male/perfil/9.jpg",
]

const MALE_PROFILES = [
  "@john.doe92", "@mike_anderson", "@chris_williams", "@danny.smith",
  "@liam.baker", "@noah_carter", "@ryan_hills",
]
const MALE_IMAGES = [
  "/images/female/perfil/1.jpg", "/images/female/perfil/2.jpg", "/images/female/perfil/3.jpg",
  "/images/female/perfil/4.jpg", "/images/female/perfil/5.jpg", "/images/female/perfil/6.jpg",
  "/images/female/perfil/7.jpg", "/images/female/perfil/8.jpeg", "/images/female/perfil/9.jpg",
]

// Imagens "interceptadas" (borradas) que o alvo curtiu
const LIKED_BY_MALE_PHOTOS = [
  "/images/male/liked/male-liked-photo-1.jpg", "/images/male/liked/male-liked-photo-2.jpeg", "/images/male/liked/male-liked-photo-3.jpeg",
]
const LIKED_BY_MALE_STORIES = [
  "/images/male/liked/male-liked-story-1.jpg", "/images/male/liked/male-liked-story-2.jpg", "/images/male/liked/male-liked-story-3.jpg",
]
const LIKED_BY_FEMALE_PHOTOS = [
  "/images/female/liked/female-liked-photo-1.jpg", "/images/female/liked/female-liked-photo-2.jpg", "/images/female/liked/female-liked-photo-3.jpg",
]
const LIKED_BY_FEMALE_STORIES = [
  "/images/female/liked/female-liked-story-1.jpg", "/images/female/liked/female-liked-story-2.jpg", "/images/female/liked/female-liked-story3.jpg",
]

const INTERCEPTED_COMMENTS = ["Wow, you are very hot 🥰", "🫣😏", "I'm getting horny 🥵", "drives me crazy 😈"]

// --- Funções auxiliares ---
const sanitizeUsername = (username: string): string => {
  let u = (username || "").trim()
  if (u.startsWith("@")) u = u.slice(1)
  u = u.toLowerCase()
  return u.replace(/[^a-z0-9._]/g, "")
}
const setProfileLocalCache = (user: string, profile: any) => {
  if (!user || !profile) return
  try {
    const key = "igProfileCacheV1"
    const cache = JSON.parse(localStorage.getItem(key) || "{}") || {}
    cache[user] = { profile, ts: Date.now() }
    localStorage.setItem(key, JSON.stringify(cache))
  } catch (e) {
    console.error("[v0] Erro ao salvar perfil no cache:", e)
  }
}
const getProfileFromCache = (user: string): any | null => {
  try {
    const key = "igProfileCacheV1"
    const cache = JSON.parse(localStorage.getItem(key) || "{}") || {}
    if (cache[user] && cache[user].profile) {
      return cache[user].profile
    }
  } catch (e) {
    console.error("[v0] Erro ao ler o cache do perfil:", e)
  }
  return null
}

const PageHeader = () => (
  <header className="w-full max-w-md mx-auto text-center px-4 pt-12 pb-8">
    <div className="inline-block bg-[#0A1128] p-4 rounded-2xl shadow-lg mb-6 border border-[#00D9FF]/20">
      <Instagram className="h-10 w-10 text-[#00D9FF]" />
    </div>
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
      <span role="img" aria-label="magnifying glass">🔍</span> Help Us Find What They're Hiding
    </h1>
    <p className="text-gray-300">The more details you provide, the deeper we can dig. Everything stays 100% anonymous.</p>
  </header>
)

function Step2Content() {
  const searchParams = useSearchParams()
  const targetGender = searchParams.get('target') || 'male' // Default to male (checking on boyfriend) if unknown

  const [step, setStep] = useState(1)
  const [instagramHandle, setInstagramHandle] = useState("")
  const [profileData, setProfileData] = useState<any>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const [timeLeft, setTimeLeft] = useState(5 * 60)

  // Hook para Facebook Tracking
  const { trackEvent, trackInitiateCheckout } = useFacebookTracking()

  const [randomizedResults, setRandomizedResults] = useState<
    Array<{ username: string; image: string; type: "like" | "message" }>
  >([])
  const [interceptedImages, setInterceptedImages] = useState<Array<{ image: string; comment: string }>>([])
  const [instagramPosts, setInstagramPosts] = useState<any[]>([])
  const [visiblePosts, setVisiblePosts] = useState<number>(0)

  const shuffleAndPick = (arr: any[], num: number) => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, num)
  }

  // --- LOGIC FOR MOCK RESULTS BASED ON GENDER ---
  useEffect(() => {
    if (step === 3) {
      // Determine which pool to use based on TARGET gender
      // If target is MALE, we show FEMALE profiles interacting with him.
      // If target is FEMALE, we show MALE profiles interacting with her.

      let profilesToUse = FEMALE_PROFILES
      let imagesToUse = FEMALE_IMAGES
      let allLikedImages = LIKED_BY_MALE_PHOTOS.concat(LIKED_BY_MALE_STORIES) // "He" liked these photos

      if (targetGender === "female") {
        profilesToUse = MALE_PROFILES
        imagesToUse = MALE_IMAGES
        allLikedImages = LIKED_BY_FEMALE_PHOTOS.concat(LIKED_BY_FEMALE_STORIES) // "She" liked these photos
      }

      const randomUsernames = shuffleAndPick(profilesToUse, 3)
      const randomImages = shuffleAndPick(imagesToUse, 3)

      const results = randomUsernames.map((username, index) => ({
        username,
        image: randomImages[index % randomImages.length],
        type: Math.random() > 0.5 ? "like" : "message",
      }))
      setRandomizedResults(results)

      const randomLikedImages = shuffleAndPick(allLikedImages, 4)
      const randomComments = shuffleAndPick(INTERCEPTED_COMMENTS, 4)

      const newInterceptedData = randomLikedImages.map((img, index) => ({
        image: img,
        comment: randomComments[index % randomComments.length],
      }))

      setInterceptedImages(newInterceptedData)
    }
  }, [step, targetGender])

  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00"
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleInstagramChange = (value: string) => {
    setInstagramHandle(value)
    const sanitizedUser = sanitizeUsername(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    setError("")
    setProfileData(null)
    setProfileImageUrl(null)

    if (sanitizedUser.length < 3) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    debounceTimer.current = setTimeout(async () => {
      const cachedProfile = getProfileFromCache(sanitizedUser)
      if (cachedProfile) {
        setProfileData(cachedProfile)
        setProfileImageUrl(cachedProfile.profile_pic_url)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/instagram/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: sanitizedUser }),
        })
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Profile not found or private.")
        }

        const profile = result.profile
        setProfileData(profile)
        setProfileLocalCache(sanitizedUser, profile)
        setProfileImageUrl(profile.profile_pic_url)
      } catch (err: any) {
        setError(err.message)
        setProfileData(null)
      } finally {
        setIsLoading(false)
      }
    }, 1200)
  }

  const handleContinueClick = () => {
    const fetchPosts = async () => {
      try {
        const cleanUsername = sanitizeUsername(instagramHandle)
        const response = await fetch("/api/instagram/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: cleanUsername }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.posts && data.posts.length > 0) {
            setInstagramPosts(data.posts.slice(0, 9))
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching Instagram posts:", error)
      }
    }

    fetchPosts()

    // Gender Logic for Tracking: User is likely opposite of target
    const userGender = targetGender === 'male' ? 'female' : 'male';
    trackEvent('ViewContent', { gender: userGender }, {
      content_name: 'Instagram Analysis Started',
      content_category: 'Engagement',
      target_gender: targetGender,
    });

    setStep(2)
    setLoadingProgress(0)
    setVisiblePosts(0)

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return prev
        }
        return prev + Math.random() * 20
      })
    }, 400)

    const postsInterval = setInterval(() => {
      setVisiblePosts((prev) => {
        if (prev >= 9) {
          clearInterval(postsInterval)
          return 9
        }
        return prev + 1
      })
    }, 2800)

    setTimeout(() => {
      setLoadingProgress(100)
      setTimeout(() => {
        setStep(3)
      }, 1000)
    }, 25000)
  }

  const renderProfileCard = (profile: any) => (
    <div
      className="p-4 rounded-lg border border-[#00D9FF]/30 text-white animate-fade-in relative overflow-hidden"
      style={{
        backgroundColor: "rgba(10, 17, 40, 0.8)",
        backgroundImage: "radial-gradient(circle, rgba(0, 217, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: "15px 15px",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 text-left">
          {profileImageUrl ? (
            <img
              src={profileImageUrl || "/placeholder.svg"}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#00D9FF]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-700 animate-pulse"></div>
          )}
          <div>
            <p className="text-[#00D9FF] font-bold text-xs uppercase tracking-wider">Target Identified</p>
            <p className="font-bold text-lg text-white">@{profile.username}</p>
            <p className="text-gray-400 text-sm">
              {profile.media_count} posts • {profile.follower_count} followers
            </p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0 bg-green-500/10">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
      </div>
      {profile.biography && (
        <div className="border-t border-[#00D9FF]/10 mt-3 pt-3 text-left">
          <p className="text-gray-400 text-sm italic">{profile.biography}</p>
        </div>
      )}
    </div>
  )

  const renderInitialStep = () => (
    <>
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-[#00D9FF] blur opacity-25 animate-pulse"></div>
          <div className="relative bg-[#0A1128] rounded-full p-2 border border-[#00D9FF]">
            <Instagram className="h-6 w-6 text-[#00D9FF]" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-[#0A1128] tracking-wide">TARGET IDENTIFICATION</h1>
      </div>

      <p className="text-gray-600 mb-6">Enter the @Instagram username below to begin the digital footprint scan.</p>

      <div className="relative w-full mb-6">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="@username"
          autoComplete="off"
          className="w-full bg-white border-2 border-gray-200 text-black pl-12 h-14 text-lg rounded-xl focus:border-[#00D9FF] focus:ring-[#00D9FF]/20 shadow-inner transition-all font-semibold placeholder:font-normal"
          value={instagramHandle}
          onChange={(e) => handleInstagramChange(e.target.value)}
        />
      </div>

      <div className="w-full min-h-[120px]">
        {isLoading && (
          <div className="p-4 bg-[#0A1128]/5 rounded-lg border border-[#0A1128]/10 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 flex items-center gap-2 text-sm justify-center">
            <AlertTriangle className="h-4 w-4" /> {error}
          </div>
        )}
        {!isLoading && profileData && renderProfileCard(profileData)}
      </div>

      <button
        onClick={handleContinueClick}
        disabled={!profileData || isLoading}
        className="w-full mt-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#00D9FF] to-[#00b8d9] rounded-xl shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 uppercase tracking-wide"
      >
        <span role="img" aria-label="search">🔍</span> Run Deep Scan
      </button>
    </>
  )

  // ... (Steps 2 and 3 remain largely the same logic, just styled differently)

  const renderLoadingStep = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-[#0A1128] flex items-center justify-center gap-2">
        <span className="animate-spin text-[#00D9FF]">⟳</span> Analyzing Profile...
      </h2>

      {profileData && renderProfileCard(profileData)}

      <div className="w-full space-y-3">
        <div className="flex justify-between text-xs font-mono text-gray-500">
          <span>DATABASE_X</span>
          <span>{Math.floor(loadingProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#00D9FF] to-[#0A1128] h-2 rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p className="font-mono text-xs text-center text-gray-400">
          [SCANNING] Cross-referencing public & hidden interactions...
        </p>
      </div>

      {instagramPosts.length > 0 && visiblePosts > 0 && (
        <div className="w-full space-y-3 animate-fade-in mt-4">
          <p className="font-mono text-xs text-[#FF6B35] text-center font-bold tracking-widest">[ALERT] HIDDEN ACTIVITY DETECTED</p>
          <div className="grid grid-cols-3 gap-2">
            {instagramPosts.slice(0, visiblePosts).map((post, index) => {
              // ... logic for rendering posts ...
              const imageUrl = post.imageUrl || "/placeholder.svg?height=200&width=200"
              return (
                <div key={index} className="aspect-square rounded-md overflow-hidden bg-gray-100 relative group">
                  <img src={imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Post" />
                  <div className="absolute inset-0 border-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              )
            })}
            {Array.from({ length: 9 - visiblePosts }).map((_, index) => (
              <div key={`p-${index}`} className="aspect-square rounded-md bg-gray-200 animate-pulse border border-white" />
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderResultsStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-xl mb-4">
        <CheckCircle size={24} /> Analysis Complete
      </div>

      {profileData && renderProfileCard(profileData)}

      <div className="p-4 bg-gray-50 border-l-4 border-red-500 rounded-r-lg font-mono text-xs text-left shadow-sm">
        <p className="mb-2">
          <span className="text-red-600 font-bold">[CRITICAL]</span> Suspicious patterns detected.
        </p>
        {randomizedResults.length > 0 && (
          <>
            <p className="text-gray-600 mb-1">> Interaction frequency: <span className="text-red-500 font-bold">HIGH</span></p>
            <p className="text-gray-600">> Hidden messages: <span className="text-red-500 font-bold">DETECTED</span></p>
          </>
        )}
      </div>

      <div className="space-y-3 text-left">
        {randomizedResults.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <img src={item.image} alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">{item.username}</p>
              <p className="text-xs text-gray-500">{item.type === 'like' ? 'Liked 3 photos' : 'Sent a message'} • 2h ago</p>
            </div>
            {item.type === 'like' ? <Heart className="text-red-500 w-4 h-4" /> : <MessageCircle className="text-blue-500 w-4 h-4" />}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-dashed border-gray-300 text-center">

        <div className="mx-auto w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mb-4 animate-bounce">
          <LockOpen className="text-[#FF6B35]" size={32} />
        </div>

        <h2 className="text-xl font-bold text-[#0A1128] mb-2">UNLOCK FULL REPORT</h2>
        <p className="text-sm text-gray-500 mb-6 px-4">
          Access uncensored photos, message logs, and location history for <span className="font-bold text-[#0A1128]">@{instagramHandle}</span>.
        </p>

        <div className="bg-red-50 border border-red-100 p-3 rounded-lg mb-6 inline-block">
          <p className="text-red-600 font-bold font-mono text-2xl">{formatTime(timeLeft)}</p>
          <p className="text-[10px] text-red-400 uppercase tracking-widest">Offer Expires Soon</p>
        </div>

        <a
          href="https://pay.mycheckoutt.com/0198c1be-98b4-7315-a3bc-8c0fa9120e5c?ref="
          className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          onClick={() => {
            const userGender = targetGender === 'male' ? 'female' : 'male';
            trackInitiateCheckout(37, 'USD', { gender: userGender });
          }}
        >
          🔓 ACCESS FULL REPORT ($37)
        </a>

        <div className="mt-4 flex items-center justify-center gap-2">
          <img src="/images/secure-payment-badge2.png" className="h-4 opacity-50 grayscale" alt="Secure" />
        </div>

      </div>

    </div>
  )

  return (
    <main className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-2xl relative z-10">
      <div className="text-center space-y-8">
        {step === 1 && renderInitialStep()}
        {step === 2 && renderLoadingStep()}
        {step === 3 && renderResultsStep()}
      </div>
    </main>
  )
}

export default function Step2() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#0A1128] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00D9FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF6B35] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      </div>

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Step2Content />
      </Suspense>

      <footer className="py-6 mt-auto relative z-10 opacity-50">
        <p className="text-[10px] text-white uppercase tracking-widest">© 2026 InfidelityFind. Security Level 5.</p>
      </footer>
    </div>
  )
}
