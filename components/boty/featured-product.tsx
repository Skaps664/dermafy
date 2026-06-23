"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "./cart-context"

const product = {
  id: "glowify-brightening-face-wash",
  name: "Glowify Brightening Face Wash",
  tagline: "Daily Brightening Cleanser",
  description:
    "Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera & Vitamin E Beads. For brighter, fresher, healthier-looking skin.",
  price: 1500,
  originalPrice: null,
  image: "/glowify/glowify-hero-2.png",
  badge: "Bestseller",
  highlights: [
    "Brightens dull skin",
    "Fades acne marks & evens tone",
    "Controls excess oil",
    "Hydrates with Vitamin E beads"
  ]
}

export function FeaturedProduct() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    const img = new window.Image()
    img.src = product.image
  }, [])

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.1 }
    )

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setContentVisible(true)
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) headerObserver.observe(headerRef.current)
    if (contentRef.current) contentObserver.observe(contentRef.current)

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
      if (contentRef.current) contentObserver.unobserve(contentRef.current)
    }
  }, [])

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    })
  }

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <span
            className={`text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block ${
              headerVisible ? "animate-blur-in opacity-0" : "opacity-0"
            }`}
            style={
              headerVisible
                ? { animationDelay: "0.2s", animationFillMode: "forwards" }
                : {}
            }
          >
            {product.tagline}
          </span>
          <h2
            className={`font-serif leading-tight text-foreground mb-3 text-balance text-5xl sm:text-6xl md:text-7xl ${
              headerVisible ? "animate-blur-in opacity-0" : "opacity-0"
            }`}
            style={
              headerVisible
                ? { animationDelay: "0.4s", animationFillMode: "forwards" }
                : {}
            }
          >
            Meet Glowify
          </h2>
          <p
            className={`text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-md mx-auto ${
              headerVisible ? "animate-blur-in opacity-0" : "opacity-0"
            }`}
            style={
              headerVisible
                ? { animationDelay: "0.6s", animationFillMode: "forwards" }
                : {}
            }
          >
            One product. Real glow.
          </p>
        </div>

        {/* Product Showcase */}
        <div
          ref={contentRef}
          className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-700 ease-out ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Image */}
          <Link
            href={`/product/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-square bg-background rounded-2xl md:rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.01]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover boty-transition group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs tracking-wide bg-accent text-accent-foreground">
                  {product.badge}
                </span>
              )}
            </div>
          </Link>

          {/* Info */}
          <div className="flex flex-col">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5 mb-8 md:mb-10">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-foreground/90"
                >
                  <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-6 md:mb-8">
              <span className="font-serif text-2xl sm:text-3xl text-foreground">
                Rs. {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-muted-foreground line-through">
                  Rs. {product.originalPrice}
                </span>
              )}
              <span className="text-sm text-primary font-medium">
                + Free Shipping
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/90"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <Link
                href={`/product/${product.id}`}
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
