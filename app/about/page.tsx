import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Leaf, Beaker, ShieldCheck, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Philosophy
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Real ingredients. Real glow.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dermafy is built on honest formulation — not shortcuts or marketing tricks. One face wash, five hero actives, real results for everyday skin.
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="prose prose-lg max-w-none mb-20">
            <h2 className="font-serif text-3xl text-foreground mb-6">Why Dermafy Exists</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most skincare in Pakistan either over-promises with whitening creams or under-delivers with cosmetic cleansers that don’t do much. We built Dermafy to sit in the middle: ingredients backed by science, formulated for real skin in our climate.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Glowify Brightening Face Wash is our hero product — a daily cleanser powered by Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera and Vitamin E Beads. No bleaching agents. No steroids. Just visible brightness, balanced oil and healthier-looking skin.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <Beaker className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Real Ingredients</h3>
              <p className="text-muted-foreground leading-relaxed">
                Niacinamide, Alpha Arbutin, Vitamin C, Aloe Vera and Vitamin E Beads — chosen for visible brightening, balanced oil and healthier skin. Every active is on the label and in effective amounts.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Safe to Use Daily</h3>
              <p className="text-muted-foreground leading-relaxed">
                No steroids. No bleaching agents. No hydroquinone or mercury. Just a gentle daily face wash for men and women, suitable for most skin types.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <Leaf className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Built for Our Climate</h3>
              <p className="text-muted-foreground leading-relaxed">
                Heat, humidity and dust dull the skin and trigger oiliness. Glowify is formulated for daily reality in Pakistan — refreshing, balancing and brightening from the very first wash.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Honest Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fresher skin from the first few washes. Visible brightening and improvement in acne marks over 2-4 weeks of daily use. No miracles — just consistency that works.
              </p>
            </div>
          </div>

          {/* Made in Pakistan */}
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Made in Pakistan</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Proudly manufactured in Pakistan with international standards. Supporting local pharmaceutical excellence while serving Pakistani skin needs.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
