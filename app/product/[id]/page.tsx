"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, Leaf, Heart, Award, Recycle, Star, Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

const products: Record<string, {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  sizes: string[]
  details: string
  howToUse: string
  ingredients: string
  delivery: string
  inStock: boolean
}> = {
  "Glowify-acne-facewash": {
    id: "Glowify-acne-facewash",
    name: "Glowify Acne Face Wash",
    tagline: "Clear skin starts with the right cleanse",
    description: "A dual-acid formula combining Salicylic Acid and Glycolic Acid to deeply cleanse pores, control excess oil, and prevent acne breakouts. Dermatologist-formulated for oily and acne-prone skin.",
    price: 1500,
    originalPrice: null,
    image: "/glowify/glowify-hero-2.png",
    sizes: ["100ml", "150ml"],
    details: "Glowify Acne Face Wash features 2% Salicylic Acid and 5% Glycolic Acid to exfoliate dead skin cells, unclog pores, and reduce blackheads and whiteheads. The formula is pH-balanced to cleanse without disrupting the skin barrier. Suitable for daily use on oily and combination skin types.",
    howToUse: "Wet face with lukewarm water. Dispense a small amount onto fingertips and gently massage onto face in circular motions for 60 seconds. Rinse thoroughly. Use morning and evening for best results. Follow with moisturizer and sunscreen.",
    ingredients: "Aqua, Salicylic Acid, Glycolic Acid, Niacinamide, Aloe Barbadensis Leaf Juice, Glycerin, Coco-Glucoside, Zinc PCA, Panthenol, Allantoin, Citric Acid, Potassium Sorbate, Phenoxyethanol.",
    delivery: "Free standard shipping across Pakistan on orders over Rs. 2000. Express shipping available at checkout. All orders ship within 1-2 business days. Returns accepted within 7 days if product is unused and sealed.",
    inStock: true
  },
  "oil-free-moisturizer": {
    id: "oil-free-moisturizer",
    name: "Daily Moisturizer",
    tagline: "Oil-free hydration for acne-prone skin",
    description: "A lightweight, oil-free moisturizer formulated with Niacinamide and Hyaluronic Acid to hydrate without clogging pores or causing breakouts.",
    price: 1250,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    sizes: ["50ml", "100ml"],
    details: "Our Daily Moisturizer uses multi-weight Hyaluronic Acid to deliver hydration at every skin layer, while Niacinamide helps minimize pores and balance sebum production. Non-comedogenic and dermatologist tested for oily and combination skin.",
    howToUse: "After cleansing and any serums, apply a pea-sized amount to face and neck. Gently blend in upward motions. Use morning and evening. In the morning, follow with sunscreen.",
    ingredients: "Aqua, Sodium Hyaluronate, Niacinamide, Glycerin, Dimethicone, Cetearyl Alcohol, Panthenol, Zinc PCA, Allantoin, Tocopherol, Carbomer, Phenoxyethanol.",
    delivery: "Free standard shipping across Pakistan on orders over Rs. 2000. Express shipping available at checkout. All orders ship within 1-2 business days. Returns accepted within 7 days if product is unused and sealed.",
    inStock: false
  },
  "daily-sunscreen-spf30": {
    id: "daily-sunscreen-spf30",
    name: "Daily Sunscreen SPF 30+",
    tagline: "Broad-spectrum protection, zero white cast",
    description: "A lightweight gel sunscreen with SPF 30+ broad-spectrum protection, formulated specifically for oily and acne-prone skin. No white cast, no greasiness.",
    price: 1350,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    sizes: ["50ml", "75ml"],
    details: "Our Daily Sunscreen uses a blend of chemical and mineral UV filters to protect against both UVA and UVB rays. The gel texture absorbs instantly, leaving a matte finish ideal for oily skin. PA+++ rated, suitable for daily use under makeup.",
    howToUse: "Apply generously as the last step of your morning skincare routine. Spread evenly over face and neck 15 minutes before sun exposure. Reapply every 2 hours when outdoors.",
    ingredients: "Aqua, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Butyl Methoxydibenzoylmethane, Glycerin, Niacinamide, Dimethicone, Carbomer, Triethanolamine, Phenoxyethanol.",
    delivery: "Free standard shipping across Pakistan on orders over Rs. 2000. Express shipping available at checkout. All orders ship within 1-2 business days. Returns accepted within 7 days if product is unused and sealed.",
    inStock: false
  },
  "microfiber-face-towel": {
    id: "microfiber-face-towel",
    name: "Gentle Face Towel",
    tagline: "Hygiene matters in your skincare routine",
    description: "Ultra-soft microfiber face towel designed for acne-prone skin. Gentle on the skin barrier, quick-drying, and hygienic for daily use.",
    price: 450,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    sizes: ["Standard"],
    details: "Our Gentle Face Towel is made from ultra-fine microfiber that is 3x softer than regular cotton towels. The dense weave absorbs water efficiently without rubbing or irritating acne-prone skin. Machine washable and reusable.",
    howToUse: "After cleansing, gently pat (do not rub) face dry with the towel. Wash the towel after every 2-3 uses to maintain hygiene. Machine wash at 30°C with gentle detergent.",
    ingredients: "100% Ultra-Fine Microfiber (80% Polyester, 20% Polyamide)",
    delivery: "Free standard shipping across Pakistan on orders over Rs. 2000. Express shipping available at checkout. All orders ship within 1-2 business days. Returns accepted within 7 days if product is unused.",
    inStock: false
  }
}

const benefits = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Heart, label: "Cruelty-Free" },
  { icon: Recycle, label: "Eco-Friendly" },
  { icon: Award, label: "Expert Approved" }
]

type AccordionSection = "details" | "howToUse" | "ingredients" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId] || products["Glowify-acne-facewash"]

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Details", content: product.details },
    { key: "howToUse", title: "How to Use", content: product.howToUse },
    { key: "ingredients", title: "Ingredients", content: product.ingredients },
    { key: "delivery", title: "Delivery & Returns", content: product.delivery }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card boty-shadow">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                  Boty Essentials
                </span>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground italic mb-4">
                  {product.tagline}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(128 reviews)</span>
                </div>

                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-medium text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Size Selector — only for in-stock */}
              {product.inStock && (
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-3 block">Size</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-sm boty-transition boty-shadow ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-card/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              )}

              {/* Quantity Selector — only for in-stock */}
              {product.inStock && (
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-3 block">Quantity</label>
                <div className="inline-flex items-center gap-4 bg-card rounded-full px-2 py-2 boty-shadow">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              )}

              {/* Add to Cart Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {product.inStock ? (
                  <>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide boty-transition boty-shadow ${
                        isAdded
                          ? "bg-primary/80 text-primary-foreground"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-muted/50 border border-border text-muted-foreground px-8 py-5 rounded-full text-sm tracking-wide text-center">
                    <span className="font-medium text-base text-foreground">Coming Soon</span>
                    <span className="text-xs">This product is not yet available for purchase</span>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex flex-col items-center gap-2 p-4 boty-shadow bg-transparent shadow-none rounded-md"
                  >
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">{benefit.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key ? "max-h-96 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
