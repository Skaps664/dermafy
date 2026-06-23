"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Droplets, ShieldCheck, Users } from "lucide-react"

const badges = [
  {
    icon: Sparkles,
    title: "Brightening",
    description: "Niacinamide + Vitamin C"
  },
  {
    icon: Droplets,
    title: "Hydrating",
    description: "Aloe + Vitamin E beads"
  },
  {
    icon: ShieldCheck,
    title: "Dermatologist Tested",
    description: "Skin-safe daily formula"
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Men & women, all skin types"
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`bg-background p-4 sm:p-6 lg:p-8 text-center rounded-xl border-none transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <badge.icon className="text-primary mb-3 sm:mb-4 mx-auto size-9 sm:size-12" strokeWidth={1} />
              <h3 className="font-serif text-foreground mb-1 sm:mb-2 text-base sm:text-2xl">{badge.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
