"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#e3e1e2' }}>
      {/* Background Video */}
      <div className="border-b border-border/50 p-6 py-2" style={{ backgroundColor: '#e3e1e2' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover'
          }}
        >
          <source src="/images/f3d8cad2-8091-4809-aac0-eaac74b0be7c.mp4" type="video/mp4" />
        </video>
        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-24 lg:pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="font-serif leading-[1.05] mb-6 text-balance text-black">
              <span
                className="block animate-blur-in opacity-0 font-semibold text-3xl sm:text-4xl md:text-5xl"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                When gentle fails,
              </span>
              <span
                className="block animate-blur-in opacity-0 font-semibold text-5xl sm:text-6xl md:text-7xl xl:text-9xl"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                science works.
              </span>
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0 text-black animate-blur-in opacity-0"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              Dual-acid acne face wash. Built for oily, acne-prone skin.
            </p>
            <div
              className="flex justify-center lg:justify-start animate-blur-in opacity-0"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <Link
                href="/product/Glowify-acne-facewash"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
              >
                Shop Glowify
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only to save vertical space on phones */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-black">
        <span className="text-xs tracking-widest uppercase font-bold">Scroll</span>
        <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground/60 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

