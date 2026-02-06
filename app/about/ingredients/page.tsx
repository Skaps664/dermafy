import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { CheckCircle2 } from "lucide-react"

export default function IngredientsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Active Ingredients
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              What's Inside GlowMed
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pharmaceutical-grade ingredients chosen for their clinical effectiveness in treating oily, acne-prone skin.
            </p>
          </div>

          {/* Key Actives */}
          <div className="space-y-12 mb-20">
            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <h2 className="font-serif text-3xl text-foreground mb-4">Salicylic Acid (BHA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A beta-hydroxy acid that penetrates oil-filled pores to dissolve debris and target acne-causing bacteria. Unlike water-soluble AHAs, salicylic acid is oil-soluble, making it ideal for oily skin.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Unclogs pores and removes blackheads</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Reduces active acne and prevents new breakouts</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Anti-inflammatory properties reduce redness</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <h2 className="font-serif text-3xl text-foreground mb-4">Glycolic Acid (AHA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                An alpha-hydroxy acid that gently exfoliates dead skin cells from the surface, improving texture and preventing pore congestion. Works synergistically with salicylic acid for superior results.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Exfoliates surface dead skin cells</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Improves skin texture and tone</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Enhances product penetration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Ingredients */}
          <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Supporting Ingredients</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <h3 className="font-serif text-xl text-foreground mb-2">Vitamin E</h3>
              <p className="text-muted-foreground text-sm">
                Antioxidant support to protect skin during acid treatment and promote healing.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <h3 className="font-serif text-xl text-foreground mb-2">Aloe Vera</h3>
              <p className="text-muted-foreground text-sm">
                Soothing and calming properties to reduce irritation and maintain comfort.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <h3 className="font-serif text-xl text-foreground mb-2">Glycerin</h3>
              <p className="text-muted-foreground text-sm">
                Maintains hydration balance while cleansing, preventing over-drying.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <h3 className="font-serif text-xl text-foreground mb-2">Dimethicone</h3>
              <p className="text-muted-foreground text-sm">
                Reduces surface irritation during cleansing for gentler acid delivery.
              </p>
            </div>
          </div>

          {/* What We Don't Use */}
          <div className="bg-destructive/10 border-2 border-destructive/20 p-8 rounded-3xl text-center">
            <h2 className="font-serif text-3xl text-foreground mb-4">What We DON'T Use</h2>
            <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
              <span className="bg-background px-4 py-2 rounded-full">No Steroids</span>
              <span className="bg-background px-4 py-2 rounded-full">No Bleaching Agents</span>
              <span className="bg-background px-4 py-2 rounded-full">No Fairness Chemicals</span>
              <span className="bg-background px-4 py-2 rounded-full">No Harmful Additives</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
