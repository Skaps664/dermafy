"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Sparkles, Droplets, ShieldCheck, FlaskConical } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Brightens Dull Skin",
    description: "Alpha Arbutin + Vitamin C for visible radiance"
  },
  {
    icon: Droplets,
    title: "Hydrating Cleanse",
    description: "Vitamin E beads + Aloe leave skin soft"
  },
  {
    icon: ShieldCheck,
    title: "Controls Excess Oil",
    description: "Niacinamide balances sebum & refines pores"
  },
  {
    icon: FlaskConical,
    title: "Dermatologist Formulated",
    description: "Daily-safe, suitable for all skin types"
  }
]

export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const bentoRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bentoRef.current) {
      observer.observe(bentoRef.current)
    }

    if (videoSectionRef.current) {
      videoObserver.observe(videoSectionRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (bentoRef.current) {
        observer.unobserve(bentoRef.current)
      }
      if (videoSectionRef.current) {
        videoObserver.unobserve(videoSectionRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div 
          ref={bentoRef}
          className="grid md:grid-cols-4 mb-16 md:mb-20 md:grid-rows-[300px_300px] gap-4 md:gap-6"
        >
          {/* Left Large Block - Video with Overlay Card */}
          <div 
            className={`relative rounded-3xl overflow-hidden h-[420px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/c4baaf67-b900-4b90-af2a-daf25a5a4b78.mp4" type="video/mp4" />
            </video>
            {/* Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white p-5 md:p-6 shadow-lg rounded-xl">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-lg md:text-xl text-foreground mb-1.5 font-medium">
                    Brightening Actives
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Niacinamide, Alpha Arbutin & Vitamin C for visible glow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right - 100% Natural */}
          <div 
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center md:col-span-2 relative overflow-hidden h-[280px] md:h-auto transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Background Image */}
            <Image
              src="/images/0ed61900-dd29-4dd2-bc2d-abc2db54c352.png"
              alt="Natural ingredients"
              fill
              className="object-cover"
            />

            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl text-white mb-2">
                Bright. Even.
              </h3>
              <h3 className="text-2xl md:text-3xl text-white/70 mb-4">
                Healthy-looking.
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>Niacinamide & Vitamin C</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Droplets className="w-4 h-4 flex-shrink-0" />
                  <span>Aloe Vera + Vitamin E Beads</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Made in Pakistan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right - Eco-Friendly Packaging */}
          <div 
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden md:col-span-2 h-[220px] md:h-auto transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            >
              <source src="/images/a0b7c364-afa9-4afa-9716-45718578cc01.mp4" type="video/mp4" />
            </video>
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-transparent" />
            
            <div className="relative z-10 flex flex-col justify-center h-full text-left items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-sans text-base mb-1 text-black">
                Glow-boosting
              </h3>
              <h3 className="text-2xl md:text-3xl mb-2 text-black">
                Vitamin E Beads
              </h3>
            </div>
          </div>
        </div>

        <div 
          ref={videoSectionRef}
          className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center my-0 py-12 md:py-20"
        >
          {/* Video */}
          <div 
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden boty-shadow transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/0c826034-d4f2-4d4f-8e99-50e94e4ce63f.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className={`text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Why It Works
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl leading-tight text-foreground mb-4 md:mb-6 text-balance md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              Five actives. One face wash.
            </h2>
            <p className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-md ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              Brightens, balances, hydrates. Niacinamide, Alpha Arbutin, Vitamin C, Aloe & Vitamin E beads — working together every wash.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-4 sm:p-5 boty-transition hover:scale-[1.02] rounded-md bg-white"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 group-hover:bg-primary/20 boty-transition bg-stone-50">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm sm:text-base text-foreground mb-1">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
