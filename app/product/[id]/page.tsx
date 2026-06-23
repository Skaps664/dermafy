"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronLeft,
  Minus,
  Plus,
  ChevronDown,
  Sparkles,
  Droplets,
  ShieldCheck,
  Users,
  Star,
  Check
} from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"

type HeroIngredient = {
  name: string
  knownFor: string[]
  benefits: string
}

type Step = {
  step: string
  title: string
  description: string
}

type Faq = {
  q: string
  a: string
}

type Product = {
  id: string
  name: string
  tagline: string
  shortDescription: string
  longDescription: string
  price: number
  originalPrice: number | null
  image: string
  sizes: string[]
  benefits: string[]
  howItWorks: Step[]
  heroIngredients: HeroIngredient[]
  perfectFor: string[]
  howToUse: string[]
  ingredients: string
  delivery: string
  faqs: Faq[]
  inStock: boolean
}

const products: Record<string, Product> = {
  "glowify-brightening-face-wash": {
    id: "glowify-brightening-face-wash",
    name: "Glowify Brightening Face Wash",
    tagline: "Cleanse. Brighten. Glow.",
    shortDescription:
      "Daily brightening face wash with Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera & Vitamin E Beads. For visibly brighter, fresher, healthier-looking skin.",
    longDescription:
      "Glowify Brightening Face Wash is an advanced daily cleanser formulated to deeply cleanse, refresh, and revitalize your skin while promoting a brighter, more even-looking complexion. Powered by Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera Gel and dissolving Vitamin E Beads, it removes excess oil, dirt and daily pollution while supporting healthier-looking skin — without leaving skin tight or dry.",
    price: 1500,
    originalPrice: null,
    image: "/glowify/glowify-hero-2.png",
    sizes: ["100ml"],
    benefits: [
      "Deeply cleanses dirt, oil & impurities",
      "Helps brighten dull, tired skin",
      "Supports a more even skin tone",
      "Helps improve appearance of acne marks",
      "Controls excess oil production",
      "Provides antioxidant protection",
      "Hydrates while cleansing",
      "Refreshes and revitalises skin",
      "Leaves skin smooth and soft",
      "Suitable for daily use, all skin types",
      "For both men and women"
    ],
    howItWorks: [
      {
        step: "01",
        title: "Purifies",
        description:
          "Advanced cleansing agents lift oil, dirt, sweat and pollution off the skin surface."
      },
      {
        step: "02",
        title: "Brightens",
        description:
          "Alpha Arbutin and Vitamin C help reduce dullness and support natural radiance."
      },
      {
        step: "03",
        title: "Balances",
        description:
          "Niacinamide helps regulate excess oil and supports the skin's protective barrier."
      },
      {
        step: "04",
        title: "Nourishes",
        description:
          "Vitamin E Beads dissolve to release antioxidants, leaving skin soft and refreshed."
      },
      {
        step: "05",
        title: "Soothes",
        description:
          "Aloe Vera Gel calms the skin and keeps it comfortable after every wash."
      }
    ],
    heroIngredients: [
      {
        name: "Niacinamide (Vitamin B3)",
        knownFor: [
          "Oil control",
          "Pore appearance",
          "Skin barrier support"
        ],
        benefits:
          "Balances oil production, supports healthier skin and promotes a more refined appearance."
      },
      {
        name: "Alpha Arbutin",
        knownFor: [
          "Brightening support",
          "Uneven skin tone",
          "Dark spot appearance"
        ],
        benefits:
          "Helps improve the appearance of discoloration and promotes a more radiant complexion."
      },
      {
        name: "Vitamin C",
        knownFor: [
          "Antioxidant protection",
          "Brightening support",
          "Environmental defense"
        ],
        benefits:
          "Helps fight dullness caused by daily environmental exposure and supports healthier-looking skin."
      },
      {
        name: "Vitamin E Beads",
        knownFor: [
          "Deep hydration",
          "Antioxidant support",
          "Skin nourishment"
        ],
        benefits:
          "Dissolves during cleansing to deliver extra moisturization and protection."
      },
      {
        name: "Aloe Vera Gel",
        knownFor: ["Soothing", "Hydration", "Skin comfort"],
        benefits: "Helps calm and refresh the skin after cleansing."
      }
    ],
    perfectFor: [
      "Oily skin",
      "Combination skin",
      "Normal skin",
      "Daily pollution exposure",
      "Dull-looking skin",
      "Uneven skin tone",
      "Excess oil",
      "Post-acne marks",
      "Men & women"
    ],
    howToUse: [
      "Wet face with lukewarm water.",
      "Dispense a small amount of Glowify onto your palms.",
      "Gently massage onto the face using circular motions.",
      "Let the Vitamin E beads dissolve while cleansing.",
      "Rinse thoroughly with water.",
      "Pat dry with a clean towel.",
      "Use morning and evening for best results."
    ],
    ingredients:
      "Aqua, Niacinamide, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Aloe Barbadensis Leaf Juice, Alpha Arbutin, Ascorbic Acid (Vitamin C), Tocopherol Beads (Vitamin E), Oleanolic Acid, Panthenol, Allantoin, Citric Acid, Phenoxyethanol, Fragrance.",
    delivery:
      "Free shipping on every order across Pakistan — no minimum. Major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad): 2-3 business days. Other cities: 3-5 business days. Orders ship within 24 hours on business days. Returns accepted within 7 days if product is unused and sealed.",
    faqs: [
      {
        q: "Does Glowify lighten skin?",
        a: "No. Glowify is designed to help improve skin brightness, reduce dullness and promote a more even-looking complexion. It does not bleach or alter your natural skin tone."
      },
      {
        q: "Is Glowify suitable for oily skin?",
        a: "Yes. The formula contains Niacinamide and Oleanolic Acid which help control excess oil and keep skin feeling fresh."
      },
      {
        q: "Can Glowify help with acne marks?",
        a: "Alpha Arbutin, Vitamin C and Niacinamide help improve the appearance of post-acne marks and uneven skin tone over time with regular use."
      },
      {
        q: "Can I use Glowify every day?",
        a: "Yes. Glowify is formulated for daily use and can be used both morning and evening."
      },
      {
        q: "What are the Vitamin E Beads?",
        a: "Vitamin E Beads are moisturizing capsules that dissolve during cleansing to provide antioxidant protection and added hydration."
      },
      {
        q: "Is Glowify suitable for men and women?",
        a: "Yes. Glowify is designed for both men and women and is suitable for most skin types — oily, combination and normal."
      }
    ],
    inStock: true
  },
  // Legacy / placeholder entries (kept so old routes don't 404)
  "oil-free-moisturizer": {
    id: "oil-free-moisturizer",
    name: "Daily Moisturizer",
    tagline: "Oil-free hydration for acne-prone skin",
    shortDescription:
      "A lightweight, oil-free moisturizer formulated with Niacinamide and Hyaluronic Acid to hydrate without clogging pores or causing breakouts.",
    longDescription: "",
    price: 1250,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    sizes: ["50ml", "100ml"],
    benefits: [],
    howItWorks: [],
    heroIngredients: [],
    perfectFor: [],
    howToUse: [],
    ingredients:
      "Aqua, Sodium Hyaluronate, Niacinamide, Glycerin, Dimethicone, Cetearyl Alcohol, Panthenol, Zinc PCA, Allantoin, Tocopherol, Carbomer, Phenoxyethanol.",
    delivery:
      "Free shipping on every order across Pakistan. Major cities: 2-3 business days. Other cities: 3-5 business days.",
    faqs: [],
    inStock: false
  },
  "daily-sunscreen-spf30": {
    id: "daily-sunscreen-spf30",
    name: "Daily Sunscreen SPF 30+",
    tagline: "Broad-spectrum protection, zero white cast",
    shortDescription:
      "A lightweight gel sunscreen with SPF 30+ broad-spectrum protection, formulated specifically for oily and acne-prone skin.",
    longDescription: "",
    price: 1350,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    sizes: ["50ml"],
    benefits: [],
    howItWorks: [],
    heroIngredients: [],
    perfectFor: [],
    howToUse: [],
    ingredients:
      "Aqua, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Niacinamide, Phenoxyethanol.",
    delivery:
      "Free shipping on every order across Pakistan. Major cities: 2-3 business days. Other cities: 3-5 business days.",
    faqs: [],
    inStock: false
  }
}

const benefitIcons = [
  { icon: Sparkles, label: "Brightening" },
  { icon: Droplets, label: "Hydrating" },
  { icon: ShieldCheck, label: "Derm-Tested" },
  { icon: Users, label: "All Skin Types" }
]

type AccordionSection = "ingredients" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId] || products["glowify-brightening-face-wash"]

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>(
    "ingredients"
  )
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        description: product.shortDescription,
        price: product.price,
        image: product.image
      })
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* ===== 1. Hero: Image + Buy Box ===== */}
      <section className="pt-24 md:pt-28 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-6 md:mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-card boty-shadow">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Buy Box */}
            <div className="flex flex-col">
              <div className="mb-6 md:mb-8">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-2 block">
                  {product.tagline}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (128 reviews)
                  </span>
                </div>

                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

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

              {/* Size Selector */}
              {product.inStock && product.sizes.length > 1 && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Size
                  </label>
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

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="mb-6 md:mb-8">
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Quantity
                  </label>
                  <div className="inline-flex items-center gap-4 bg-card rounded-full px-2 py-2 boty-shadow">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-foreground">
                      {quantity}
                    </span>
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

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
                {product.inStock ? (
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
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-muted/50 border border-border text-muted-foreground px-8 py-5 rounded-full text-sm tracking-wide text-center">
                    <span className="font-medium text-base text-foreground">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {/* Trust strip */}
              <div className="grid grid-cols-4 gap-3 mb-2">
                {benefitIcons.map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-md text-center"
                  >
                    <b.icon className="w-5 h-5 text-primary" />
                    <span className="text-[11px] sm:text-xs text-muted-foreground leading-tight">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Only render rich sections for the main product */}
      {product.id === "glowify-brightening-face-wash" && (
        <>

          {/* ===== 3. How It Works (5 steps) ===== */}
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block">
                  How It Works
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance">
                  Five steps, every wash
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                {product.howItWorks.map((step) => (
                  <div
                    key={step.step}
                    className="bg-card p-5 sm:p-6 rounded-2xl"
                  >
                    <span className="font-serif text-2xl text-primary mb-3 block">
                      {step.step}
                    </span>
                    <h3 className="font-medium text-foreground mb-2 text-base sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 2. Key Benefits ===== */}
          <section className="py-16 md:py-24 bg-card">
            <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block">
                  Key Benefits
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance">
                  What Glowify does for you
                </h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 bg-background p-4 sm:p-5 rounded-2xl"
                  >
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base text-foreground/90">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          

          {/* ===== 4. Hero Ingredients ===== */}
          <section className="py-16 md:py-24 bg-card">
            <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block">
                  Hero Ingredients
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance">
                  Five actives. One formula.
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {product.heroIngredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="bg-background p-6 sm:p-7 rounded-2xl boty-shadow"
                  >
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
                      {ing.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ing.knownFor.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs tracking-wide bg-primary/10 text-primary px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {ing.benefits}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/about/ingredients"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-6 py-3 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
                >
                  Full ingredient breakdown
                </Link>
              </div>
            </div>
          </section>

          {/* ===== 5. Perfect For ===== */}
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
              <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block">
                Perfect For
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 md:mb-10 text-balance">
                Who Glowify is built for
              </h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {product.perfectFor.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 bg-card text-foreground/90 px-4 py-2 rounded-full text-sm"
                  >
                    <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 6. How to Use ===== */}
          <section className="py-16 md:py-24 bg-card">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block">
                  How to Use
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance">
                  A simple daily ritual
                </h2>
              </div>
              <ol className="space-y-3 sm:space-y-4">
                {product.howToUse.map((step, idx) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 bg-background p-4 sm:p-5 rounded-2xl"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base text-foreground/90 leading-relaxed pt-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ===== 7. Details Accordion (ingredients list + delivery) ===== */}
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="border-t border-border/50">
                {[
                  {
                    key: "ingredients" as AccordionSection,
                    title: "Full Ingredients List",
                    content: product.ingredients
                  },
                  {
                    key: "delivery" as AccordionSection,
                    title: "Delivery & Returns",
                    content: product.delivery
                  }
                ].map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground text-base sm:text-lg">
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key
                          ? "max-h-[600px] pb-5"
                          : "max-h-0"
                      }`}
                    >
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 8. FAQ ===== */}
          <section className="py-16 md:py-24 bg-card">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 block">
                  FAQ
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance">
                  Questions, answered
                </h2>
              </div>
              <div className="space-y-3">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={faq.q}
                    className="bg-background rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(openFaq === idx ? null : idx)
                      }
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="font-medium text-foreground text-sm sm:text-base">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground flex-shrink-0 boty-transition ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openFaq === idx ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-5 pb-5">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 9. Final CTA ===== */}
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 md:mb-6 text-balance">
                Ready to glow?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Add Glowify to your daily routine and feel the difference.
              </p>
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
              >
                Add to Cart — Rs. {product.price}
              </button>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  )
}
