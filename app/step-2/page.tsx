"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { User, CheckCircle, Heart, MessageCircle, Lock, AlertTriangle, Instagram, LockOpen, Clock, ShieldCheck, CreditCard } from "lucide-react"
import { useFacebookTracking } from "@/hooks/useFacebookTracking"

// ==========================================================
// DADOS DOS PERFIS E IMAGENS
// ==========================================================

// --- TARGET = MALE (Monitorando Namorado) -> MOSTRAR MULHERES ---
const FEMALE_PROFILES = [
  "@jessy_nutty", "@alexis_30", "@izes", "@maryjane434",
  "@emma.whistle32", "@celina_anderson467", "@letty.miriah99",
]
const FEMALE_IMAGES = [
  "/images/male/perfil/1.jpg", "/images/male/perfil/2.jpg", "/images/male/perfil/3.jpg",
  "/images/male/perfil/4.jpg", "/images/male/perfil/5.jpg", "/images/male/perfil/6.jpg",
  "/images/male/perfil/7.jpg", "/images/male/perfil/8.jpg", "/images/male/perfil/9.jpg",
]
// Fotos de MULHERES que ele curtiu
const LIKED_BY_MALE_PHOTOS = [
  "/images/male/liked/male-liked-photo-1.jpg", "/images/male/liked/male-liked-photo-2.jpeg", "/images/male/liked/male-liked-photo-3.jpeg",
]


// --- TARGET = FEMALE (Monitorando Namorada) -> MOSTRAR HOMENS ---
const MALE_PROFILES = [
  "@john.doe92", "@mike_anderson", "@chris_williams", "@danny.smith",
  "@liam.baker", "@noah_carter", "@ryan_hills",
]
const MALE_IMAGES = [
  "/images/female/perfil/1.jpg", "/images/female/perfil/2.jpg", "/images/female/perfil/3.jpg",
  "/images/female/perfil/4.jpg", "/images/female/perfil/5.jpg", "/images/female/perfil/6.jpg",
  "/images/female/perfil/7.jpg", "/images/female/perfil/8.jpeg", "/images/female/perfil/9.jpg",
]
// Fotos de HOMENS que ela curtiu
const LIKED_BY_FEMALE_PHOTOS = [
  "/images/female/liked/female-liked-photo-1.jpg", "/images/female/liked/female-liked-photo-2.jpg", "/images/female/liked/female-liked-photo-3.jpg",
]


// Comentários Interceptados
const INTERCEPTED_COMMENTS = ["Wow, you are very hot 🥰", "🫣😏", "I'm getting horny 🥵", "drives me crazy 😈", "can I see more? 🔥", "check DM 👀"]

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

const formatTime = (seconds: number) => {
  if (seconds <= 0) return "00:00"
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

function Step2Content() {
  const searchParams = useSearchParams()
  const targetGender = searchParams.get('target') || 'male'
  // target=male means user is analyzing a BOYFRIEND -> Show FEMALE interactions
  // target=female means user is analyzing a GIRLFRIEND -> Show MALE interactions

  const [step, setStep] = useState(1)
  const [instagramHandle, setInstagramHandle] = useState("")
  const [profileData, setProfileData] = useState<any>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 50) // 04:50

  const { trackEvent, trackInitiateCheckout } = useFacebookTracking()

  const [activityFeed, setActivityFeed] = useState<Array<{ username: string; image: string; action: string; time: string; type: "like" | "message" | "typing" }>>([])
  const [interceptedMedia, setInterceptedMedia] = useState<Array<{ image: string; comment: string; likes: number }>>([])
  const [instagramPosts, setInstagramPosts] = useState<any[]>([])
  const [visiblePosts, setVisiblePosts] = useState<number>(0)

  const shuffleAndPick = (arr: any[], num: number) => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, num)
  }

  // --- LOGIC FOR MOCK RESULTS ---
  useEffect(() => {
    if (step === 3) {
      let profilesToUse = FEMALE_PROFILES
      let imagesToUse = FEMALE_IMAGES
      let likedPhotos = LIKED_BY_MALE_PHOTOS

      if (targetGender === "female") {
        profilesToUse = MALE_PROFILES
        imagesToUse = MALE_IMAGES
        likedPhotos = LIKED_BY_FEMALE_PHOTOS
      }

      const randomUsernames = shuffleAndPick(profilesToUse, 5)
      const randomImages = shuffleAndPick(imagesToUse, 5)

      const feed = [
        {
          username: randomUsernames[0],
          image: randomImages[0],
          action: "liked your photo",
          time: "1 minute ago",
          type: "like" as const
        },
        {
          username: randomUsernames[1],
          image: randomImages[1],
          action: "liked your photo",
          time: "3 minutes ago",
          type: "like" as const
        },
        {
          username: randomUsernames[2],
          image: randomImages[2],
          action: "sent you a message",
          time: "5 minutes ago",
          type: "message" as const
        },
        {
          username: instagramHandle || "Target", // O próprio alvo digitando
          image: profileImageUrl || "/placeholder.svg", // Foto do alvo
          action: "is typing...",
          time: "Just now",
          type: "typing" as const
        },
        {
          username: instagramHandle || "Target", // O próprio alvo enviou msg
          image: profileImageUrl || "/placeholder.svg",
          action: "sent a new message",
          time: "1 minute ago",
          type: "message" as const
        },
      ]
      setActivityFeed(feed)

      const randomLikedImages = shuffleAndPick(likedPhotos, 4)
      const randomComments = shuffleAndPick(INTERCEPTED_COMMENTS, 4)

      const media = randomLikedImages.map((img, index) => ({
        image: img,
        comment: randomComments[index],
        likes: Math.floor(Math.random() * (5000 - 100) + 100)
      }))

      setInterceptedMedia(media)
    }
  }, [step, targetGender, instagramHandle, profileImageUrl])

  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

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
      className="p-4 rounded-xl border border-[#00D9FF]/30 text-white animate-fade-in relative overflow-hidden mb-4 shadow-lg isolate"
      style={{
        backgroundColor: "rgba(10, 17, 40, 0.9)",
      }}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#00D9FF 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4 text-left">
          {profileImageUrl ? (
            <img
              src={profileImageUrl || "/placeholder.svg"}
              alt="profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#00D9FF]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
          )}
          <div>
            <p className="text-[#00D9FF] font-bold text-xs uppercase tracking-wider mb-1">Target Identified</p>
            <p className="font-bold text-lg text-white leading-tight">@{profile.username}</p>
            <p className="text-gray-400 text-sm mt-1">
              {profile.media_count} posts • {profile.follower_count} followers
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </div>
      {profile.biography && (
        <div className="border-t border-[#00D9FF]/10 mt-3 pt-3 text-left relative z-10">
          <p className="text-gray-300 text-sm italic line-clamp-2">{profile.biography}</p>
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
    <div className="space-y-6 animate-fade-in w-full text-center">

      {/* 1. Analysis Complete Banner */}
      <div className="flex flex-col items-center justify-center gap-2 mb-2">
        <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
          <CheckCircle className="fill-green-100" size={28} /> Analysis Complete
        </div>
      </div>

      {/* 2. Target Profile Card */}
      {profileData && renderProfileCard(profileData)}

      {/* 3. System Log / Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden text-left">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#00D9FF] font-bold">[SYSTEM_LOG]</span>
          <span className="text-[10px] text-gray-400">New activity detected</span>
        </div>

        <div className="p-2 space-y-1">
          <p className="text-[11px] font-mono text-gray-500 px-2">
            [INSTAGRAM] @{instagramHandle} liked your photo.
          </p>
          <p className="text-[11px] font-mono text-gray-500 px-2 pb-2 border-b border-dashed border-gray-100">
            [INSTAGRAM] New message from @{activityFeed[0]?.username || "unknown"}...
          </p>

          {activityFeed.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <img src={item.image} alt={item.username} className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-none">
                  <span className="font-bold">@{item.username}</span> {item.action}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
              </div>
              {item.type === 'like' && <Heart className="w-4 h-4 text-red-500 fill-current" />}
              {item.type === 'message' && <MessageCircle className="w-4 h-4 text-blue-500" />}
              {item.type === 'typing' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Intercepted Media Section */}
      <div className="text-left mt-6">
        <h3 className="text-[#FF6B35] font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
          INTERCEPTED: Suspicious Likes from {instagramHandle}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {interceptedMedia.map((media, idx) => (
            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
              {/* Blurred Image */}
              <img src={media.image} alt="Evidence" className="w-full h-full object-cover filter blur-[8px] opacity-70" />

              {/* Lock Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="text-white w-8 h-8 drop-shadow-md" />
              </div>

              {/* Metadata Footer */}
              <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-red-500 fill-current" />
                  <span className="text-[10px] font-bold text-gray-600">{media.likes.toLocaleString()} Likes</span>
                </div>
                <div className="flex items-center gap-2 max-w-[150px]">
                  {profileImageUrl && <img src={profileImageUrl} className="w-4 h-4 rounded-full" />}
                  <p className="text-[10px] text-gray-800 truncate font-semibold">
                    {instagramHandle}: {media.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Unlock CTA Section */}
      <div className="mt-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl border-2 border-green-100 overflow-hidden relative">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>

        <div className="p-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <LockOpen className="text-emerald-600 w-7 h-7" />
          </div>

          <h2 className="text-xl font-black text-gray-800 uppercase mb-2">UNLOCK COMPLETE REPORT</h2>
          <p className="text-sm text-gray-600 mb-6">
            Get instant access to the full report with uncensored photos and complete conversation history.
          </p>

          {/* Warning / Timer Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-xs uppercase mb-1">
              <AlertTriangle className="w-3 h-3" /> The report will be deleted in:
            </div>
            <div className="text-3xl font-mono font-black text-red-600 tracking-wider">
              {formatTime(timeLeft)}
            </div>
            <p className="text-[9px] text-red-400 mt-2 text-center leading-tight">
              After this timer expires, the report will be permanently deleted for privacy reasons. This offer cannot be recovered at a later time.
            </p>
          </div>

          {/* Primary CTA Button */}
          <a
            href="https://pay.mycheckoutt.com/0198c1be-98b4-7315-a3bc-8c0fa9120e5c?ref="
            className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 mb-4"
            onClick={() => {
              const userGender = targetGender === 'male' ? 'female' : 'male';
              trackInitiateCheckout(37, 'USD', { gender: userGender });
            }}
          >
            <span role="img" aria-label="unlock">🔓</span> YES, I WANT THE COMPLETE REPORT
          </a>

          {/* Price and Guarantee */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="text-gray-500 text-xs">
              From <span className="line-through">$79</span> for only
            </p>
            <p className="text-4xl font-black text-emerald-600">$37</p>
            <p className="text-[10px] text-gray-400">(One-Time Payment)</p>
          </div>

          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xs">★</span>
            ))}
            <span className="text-xs text-gray-400 ml-1">4.9/5.0</span>
          </div>
          <p className="text-[10px] text-gray-400 mb-6 border-b border-gray-100 pb-6">Based on 15,130 satisfied customers.</p>

          {/* Trust Badges */}
          <div className="flex items-start justify-center gap-4 text-left">
            <ShieldCheck className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-xs text-gray-700">7-Day Guarantee</p>
              <p className="text-[9px] text-gray-400 leading-tight">Your satisfaction or your money back. Zero risk for you.</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
            <img src="/images/secure-payment-badge2.png" className="h-5" alt="Visa Mastercard" />
          </div>

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
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#0A1128] relative overflow-hidden font-sans">
      {/* Header / Logo Area */}
      <div className="absolute top-6 flex flex-col items-center z-10 w-full pointer-events-none">
        <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mb-2">
          <Instagram className="w-8 h-8 text-[#E1306C]" />
        </div>
        <h1 className="text-white font-bold text-lg drop-shadow-md">Help Us Find What</h1>
        <h2 className="text-white font-bold text-2xl leading-none drop-shadow-md">They're Hiding</h2>
        <p className="text-xs text-white/70 mt-2 max-w-xs text-center leading-tight">
          The more details you provide, the deeper we can dig.
          Everything stays 100% anonymous.
        </p>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00D9FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF6B35] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      </div>

      {/* Spacer for header */}
      <div className="h-32"></div>

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Step2Content />
      </Suspense>

      <footer className="py-6 mt-auto relative z-10 opacity-50">
        <p className="text-[10px] text-white uppercase tracking-widest">© 2026 InfidelityFind. Security Level 5.</p>
      </footer>
    </div>
  )
}
