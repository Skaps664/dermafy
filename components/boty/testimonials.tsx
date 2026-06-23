"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Aisha K.",
    location: "Karachi",
    rating: 5,
    text: "My skin actually looks brighter after a few weeks. The Vitamin E beads feel amazing on the face.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 2,
    name: "Fatima R.",
    location: "Lahore",
    rating: 5,
    text: "Finally something that controls oil and brightens at the same time. My old acne marks are fading too.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 3,
    name: "Hassan M.",
    location: "Islamabad",
    rating: 5,
    text: "I'm a guy and I never thought a face wash could do this much. Skin feels fresh, not tight, and looks healthier.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 4,
    name: "Zara N.",
    location: "Multan",
    rating: 5,
    text: "It doesn't bleach or lighten unnaturally \u2014 it just makes my skin look more even and awake. Exactly what I wanted.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 5,
    name: "Ahmed S.",
    location: "Rawalpindi",
    rating: 5,
    text: "Use it morning and night. Pores look smaller, less shine through the day. Worth every rupee.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 6,
    name: "Nimra P.",
    location: "Peshawar",
    rating: 5,
    text: "Post-acne marks are noticeably lighter after a month. Niacinamide + Alpha Arbutin really do work together.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 7,
    name: "Omar T.",
    location: "Quetta",
    rating: 5,
    text: "Very oily skin here. This is the first wash that doesn't leave my face feeling stripped. Glow is real.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 8,
    name: "Saira U.",
    location: "Sukkur",
    rating: 5,
    text: "I love that it has Aloe Vera in it. Calms my skin down and the dullness is genuinely gone.",
    product: "Glowify Brightening Face Wash"
  },
  {
    id: 9,
    name: "Bilal W.",
    location: "Faisalabad",
    rating: 5,
    text: "Made in Pakistan, proper ingredients list, actually delivers. My whole family uses it now.",
    product: "Glowify Brightening Face Wash"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="rounded-2xl md:rounded-3xl p-5 md:p-6 bg-white mb-4 flex-shrink-0"
    style={{
      boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
    }}
  >
    {/* Quote */}
    <p className="text-foreground/80 leading-relaxed mb-4 text-pretty font-medium text-base md:text-xl font-serif tracking-wide">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-foreground text-sm font-bold">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
      </div>
      <span className="text-[10px] md:text-xs tracking-wide text-primary/70 bg-primary/5 px-2 py-1 rounded-full whitespace-nowrap">
        {testimonial.product}
      </span>
    </div>
  </div>
)

export function Testimonials() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const column1 = [testimonials[0], testimonials[3], testimonials[6]]
  const column2 = [testimonials[1], testimonials[4], testimonials[7]]
  const column3 = [testimonials[2], testimonials[5], testimonials[8]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden pb-16 md:pb-24 pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <span className={`text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Real Results
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl leading-tight text-foreground text-balance md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Loved across Pakistan
          </h2>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
          
          {/* Mobile - Single Column */}
          <div className="md:hidden h-[500px]">
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard key={`mobile-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop - Three Columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Column 1 - Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 2 - Scrolling Up */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-up hover:animate-scroll-up-slow">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 3 - Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column3, ...column3].map((testimonial, index) => (
                  <TestimonialCard key={`col3-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        .animate-scroll-down-slow {
          animation: scroll-down 60s linear infinite;
        }

        .animate-scroll-up-slow {
          animation: scroll-up 60s linear infinite;
        }
      `}</style>
    </section>
  )
}
