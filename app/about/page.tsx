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
              Science Over Marketing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dermafy is built on pharmaceutical logic, not cosmetic trends. We focus on problem-solving skincare for real skin conditions in Pakistan's challenging climate.
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="prose prose-lg max-w-none mb-20">
            <h2 className="font-serif text-3xl text-foreground mb-6">Why Dermafy Exists</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In hot, humid, and polluted environments, oily and acne-prone skin faces unique challenges. Traditional cosmetic facewashes often fail because they're not designed for these conditions. Dermafy was created to fill this gap with pharmaceutical-grade solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our GlowMed Acne Care System is simple, clinical, and effective. We don't make unrealistic promises or use harmful ingredients. Every product is designed with one goal: solving real skin problems.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <Beaker className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Pharmaceutical Logic</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every ingredient is chosen based on clinical evidence, not marketing trends. We use proven actives like Salicylic Acid and Glycolic Acid in effective concentrations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Safety First</h3>
              <p className="text-muted-foreground leading-relaxed">
                No steroids, no bleaching agents, no fairness chemicals. DRAP registered and manufactured in ISO & cGMP certified facilities.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <Leaf className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Climate-Specific</h3>
              <p className="text-muted-foreground leading-relaxed">
                Designed specifically for Pakistan's hot, humid climate where oil control and acne management require specialized formulations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-serif text-2xl text-foreground mb-3">Honest Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                We set realistic expectations: 7-10 days for oil control, 2-4 weeks for acne reduction. Consistency is key, not miracles.
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
