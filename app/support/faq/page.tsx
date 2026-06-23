"use client"

import { useState } from "react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    category: "Product Information",
    questions: [
      {
        q: "What is the Glowify Acne Face Wash?",
        a: "Glowify is a pharmaceutical-grade dual-acid face wash containing Salicylic Acid and Glycolic Acid, designed specifically for oily and acne-prone skin in hot, humid climates. It's a wash-off formula that targets excess oil, clogged pores, and active acne."
      },
      {
        q: "How is this different from regular face washes?",
        a: "Unlike cosmetic face washes, Glowify uses pharmaceutical-grade ingredients in clinically effective concentrations. The dual-acid formulation (BHA + AHA) provides superior oil control and acne treatment, specifically designed for Pakistan's climate. It's DRAP registered and manufactured under ISO & cGMP standards."
      },
      {
        q: "Does it contain any harmful ingredients?",
        a: "No. Glowify contains NO steroids, NO bleaching agents, NO fairness chemicals, and NO harmful additives. Every ingredient is pharmaceutical-grade and safe for external use."
      },
      {
        q: "Why do I need a complete system?",
        a: "Acne control requires four steps: cleansing (Glowify Face Wash), hydration (moisturizer), protection (sunscreen), and hygiene (face towel). Using all four ensures optimal results without irritation or dryness."
      }
    ]
  },
  {
    category: "Usage & Results",
    questions: [
      {
        q: "How long before I see results?",
        a: "Oil control improvement: 7-10 days. Acne reduction: 2-4 weeks. Some users may experience mild purging initially. Consistency is key — use daily for best results."
      },
      {
        q: "How do I use Glowify Face Wash?",
        a: "Use twice daily (morning and evening). Wet face, apply small amount, massage gently, and rinse thoroughly. Follow with moisturizer and sunscreen (AM only)."
      },
      {
        q: "Can I use it with other acne treatments?",
        a: "Avoid combining with other exfoliating acids initially. If you're using prescription acne medications, consult your doctor first. Reduce frequency if irritation occurs."
      },
      {
        q: "Why is sunscreen essential?",
        a: "Glycolic Acid increases sun sensitivity. Sunscreen prevents post-acne dark spots, protects your skin barrier, and is crucial for preventing damage. Always use SPF 30+ during the day."
      }
    ]
  },
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "Where do you ship?",
        a: "We currently ship across Pakistan to all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and more."
      },
      {
        q: "How long does delivery take?",
        a: "Delivery typically takes 3-5 business days for major cities and 5-7 business days for remote areas. You'll receive tracking information once your order ships."
      },
      {
        q: "What are the shipping charges?",
        a: "Shipping costs vary by location. Free shipping on orders over Rs. 3,000. Standard rates apply for orders below this amount."
      },
      {
        q: "Can I track my order?",
        a: "Yes! You'll receive a tracking number via email and SMS once your order is dispatched."
      }
    ]
  },
  {
    category: "Safety & Side Effects",
    questions: [
      {
        q: "Is Glowify safe for sensitive skin?",
        a: "Glowify is formulated for oily, acne-prone skin. If you have sensitive skin, start with once-daily use and gradually increase. Discontinue if severe irritation occurs."
      },
      {
        q: "What are the side effects?",
        a: "Mild tingling, slight dryness, or initial purging (temporary acne increase) may occur. This is normal as skin adjusts. If irritation persists, reduce frequency or consult a dermatologist."
      },
      {
        q: "Can pregnant women use it?",
        a: "While the product is for external use, we recommend consulting your doctor before using any new skincare during pregnancy or breastfeeding."
      },
      {
        q: "What if I have severe acne?",
        a: "Glowify is effective for mild to moderate acne. For severe acne or cystic acne, please consult a dermatologist for comprehensive treatment."
      }
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleQuestion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Help Center
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Glowify and Dermafy. Can't find your answer? Contact us anytime.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="font-serif text-2xl text-foreground mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`
                    const isOpen = openIndex === key
                    
                    return (
                      <div key={key} className="bg-card rounded-2xl boty-shadow overflow-hidden">
                        <button
                          onClick={() => toggleQuestion(key)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition"
                        >
                          <span className="font-medium text-foreground pr-4">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`px-6 overflow-hidden transition-all ${
                            isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                          }`}
                        >
                          <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Still Have Questions?</h2>
            <p className="text-lg text-primary-foreground/90 mb-6">
              Our team is here to help you find the right solution for your skin.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-full font-medium hover:bg-primary-foreground/90 transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
