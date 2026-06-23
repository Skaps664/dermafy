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
        q: "What is Glowify Brightening Face Wash?",
        a: "Glowify is a daily brightening cleanser powered by Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera Gel and Vitamin E Beads. It deeply cleanses, controls excess oil, and promotes a brighter, more even-looking complexion."
      },
      {
        q: "Does Glowify lighten or bleach my skin?",
        a: "No. Glowify supports natural skin brightness, fades the appearance of dullness, and helps even out tone — but it never bleaches or alters your natural skin colour. No steroids, no hydroquinone, no harsh whitening agents."
      },
      {
        q: "What are the Vitamin E Beads?",
        a: "Small moisturising capsules suspended in the wash. They dissolve as you cleanse, releasing antioxidant-rich Vitamin E that nourishes and softens the skin."
      },
      {
        q: "Is it suitable for men and women?",
        a: "Yes. Glowify is designed for everyone and works on most skin types — oily, combination and normal."
      }
    ]
  },
  {
    category: "Usage & Results",
    questions: [
      {
        q: "How often should I use Glowify?",
        a: "Twice daily — morning and evening. Wet face, apply a small amount, massage gently in circular motions, then rinse thoroughly."
      },
      {
        q: "How soon will I see results?",
        a: "Fresh, balanced skin: from the first few washes. Visible brightening and improvement in acne marks / uneven tone: usually 2-4 weeks of consistent daily use."
      },
      {
        q: "Will it help my acne marks?",
        a: "Yes. Alpha Arbutin, Vitamin C and Niacinamide work together to help fade the appearance of post-acne marks and uneven tone over time."
      },
      {
        q: "Will it dry out my skin?",
        a: "No. The formula contains Aloe Vera, Glycerin and Vitamin E Beads to hydrate while it cleanses. Skin feels soft and refreshed, not tight."
      }
    ]
  },
  {
    category: "Orders & Delivery",
    questions: [
      {
        q: "Where do you ship?",
        a: "We ship across Pakistan to all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta and more."
      },
      {
        q: "How long does delivery take?",
        a: "Major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad): 2-3 business days. All other cities across Pakistan: 3-5 business days. You'll receive tracking info as soon as your order ships."
      },
      {
        q: "What are the shipping charges?",
        a: "Shipping is free on every order across Pakistan — no minimum, no hidden fees."
      },
      {
        q: "Can I track my order?",
        a: "Yes — you'll get a tracking number by email and SMS as soon as your order is dispatched."
      }
    ]
  },
  {
    category: "Safety & Skin",
    questions: [
      {
        q: "Is Glowify suitable for sensitive skin?",
        a: "Glowify is gentle enough for most skin types. If your skin is highly sensitive, start with once-daily use and increase as your skin gets comfortable."
      },
      {
        q: "Can I use it with other skincare?",
        a: "Yes. Glowify is a wash-off cleanser and pairs well with most moisturisers, sunscreens and serums. Follow with sunscreen during the day."
      },
      {
        q: "Can pregnant or breastfeeding women use it?",
        a: "Although Glowify is a wash-off product for external use, we always recommend checking with your doctor before adding any new skincare during pregnancy or breastfeeding."
      },
      {
        q: "What if my skin reacts?",
        a: "Mild tingling or slight adjustment can happen as your skin gets used to actives. If irritation persists, reduce frequency or stop use and consult a dermatologist."
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
