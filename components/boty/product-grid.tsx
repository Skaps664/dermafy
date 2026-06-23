"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"

type Category = "complete-care"

const products = [
  // Core Product - Glowify Acne Face Wash
  {
    id: "Glowify-acne-facewash",
    name: "Glowify Acne Face Wash",
    description: "Dual-acid formula (Salicylic + Glycolic) for oily, acne-prone skin",
    price: 1500,
    originalPrice: null,
    image: "/glowify/glowify-hero-2.png",
    badge: "Bestseller",
    category: "complete-care" as Category,
    inStock: true
  },
  // Daily Moisturizer
  {
    id: "oil-free-moisturizer",
    name: "Daily Moisturizer",
    description: "Oil-free, non-comedogenic hydration with Niacinamide & Hyaluronic Acid",
    price: 1250,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    badge: "Essential",
    category: "complete-care" as Category,
    inStock: false
  },
  // Daily Sunscreen
  {
    id: "daily-sunscreen-spf30",
    name: "Daily Sunscreen SPF 30+",
    description: "Broad-spectrum gel sunscreen for oily skin, no white cast",
    price: 1350,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    badge: "Essential",
    category: "complete-care" as Category,
    inStock: false
  },
  // Gentle Face Towel
  {
    id: "microfiber-face-towel",
    name: "Gentle Face Towel",
    description: "Soft microfiber towel for acne-prone skin hygiene",
    price: 450,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    badge: null,
    category: "complete-care" as Category,
    inStock: false
  }
]

export function ProductGrid() {
  const [isVisible, setIsVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  // Preload all product images on mount
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Complete Care
          </span>
          <h2 className={`font-serif leading-tight text-foreground mb-4 text-balance text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Glowify System
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Complete pharmaceutical-grade acne control for oily, acne-prone skin
          </p>
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, index) => {
            const CardWrapper = product.inStock ? Link : "div"
            const wrapperProps = product.inStock
              ? { href: `/product/${product.id}` }
              : {}
            return (
              <CardWrapper
                key={product.id}
                {...(wrapperProps as any)}
                className={`group transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${!product.inStock ? 'cursor-default' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className={`bg-background rounded-3xl overflow-hidden boty-shadow boty-transition ${product.inStock ? 'group-hover:scale-[1.02]' : ''}`}>
                  {/* Image */}
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className={`object-cover boty-transition ${product.inStock ? 'group-hover:scale-105' : 'opacity-60'}`}
                    />
                    {/* Badge */}
                    {!product.inStock ? (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide bg-muted-foreground/20 text-muted-foreground backdrop-blur-sm">
                        Coming Soon
                      </span>
                    ) : product.badge && (
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide bg-white text-black ${
                          product.badge === "Sale"
                            ? "bg-destructive/10 text-destructive"
                            : product.badge === "New"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    {/* Quick add button — only for in-stock */}
                    {product.inStock && (
                      <button
                        type="button"
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addItem({
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            image: product.image
                          })
                        }}
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4 text-foreground" />
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="flex items-center gap-2">
                      {product.inStock ? (
                        <span className="font-medium text-foreground">Rs. {product.price}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">Available soon</span>
                      )}
                      {product.inStock && product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          Rs. {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardWrapper>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
