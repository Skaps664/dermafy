"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const IMAGES = [
  { src: "/glowify/gow-1.png", alt: "Glowify brightening face wash — lifestyle 1" },
  { src: "/glowify/gow-2.png", alt: "Glowify brightening face wash — lifestyle 2" },
  { src: "/glowify/gow-3.png", alt: "Glowify brightening face wash — lifestyle 3" },
]

export function GlowifyGallery() {
  const [index, setIndex] = useState(0)
  const total = IMAGES.length

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
            The Glowify Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
            Made for radiant skin
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            A glimpse of the texture, the ritual, and the glow you'll get with every wash.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
          {IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-muted boty-shadow group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover group-hover:scale-105 boty-transition duration-700"
              />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-muted boty-shadow">
            {IMAGES.map((img, i) => (
              <div
                key={img.src}
                className={`absolute inset-0 boty-transition duration-500 ${
                  i === index ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={i !== index}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}

            {/* Prev / Next */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/85 backdrop-blur flex items-center justify-center text-foreground hover:bg-background boty-transition boty-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/85 backdrop-blur flex items-center justify-center text-foreground hover:bg-background boty-transition boty-shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Count pill */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/85 backdrop-blur text-xs font-medium text-foreground boty-shadow">
              {index + 1} / {total}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full boty-transition ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
