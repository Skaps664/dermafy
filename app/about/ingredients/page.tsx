import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { CheckCircle2 } from "lucide-react"

const heroIngredients = [
  {
    name: "Niacinamide (Vitamin B3)",
    knownFor: ["Oil control", "Pore appearance", "Skin barrier support", "Smoother-looking skin"],
    description:
      "Helps balance oil production, supports healthier skin and promotes a more refined appearance. One of the most well-studied actives in modern skincare."
  },
  {
    name: "Alpha Arbutin",
    knownFor: ["Brightening support", "Even skin tone", "Dark spot appearance"],
    description:
      "A gentle, plant-derived brightening active. Helps improve the appearance of discoloration and supports a more radiant, even-toned complexion."
  },
  {
    name: "Vitamin C",
    knownFor: ["Antioxidant protection", "Brightening", "Environmental defense"],
    description:
      "Helps fight dullness caused by daily environmental exposure while supporting healthier-looking skin and added radiance."
  },
  {
    name: "Vitamin E Beads",
    knownFor: ["Deep hydration", "Antioxidant support", "Skin nourishment"],
    description:
      "Unique micro-capsules that dissolve during cleansing, releasing nourishing antioxidants and providing extra moisturization."
  },
  {
    name: "Aloe Vera Gel",
    knownFor: ["Soothing", "Hydration", "Skin comfort"],
    description:
      "A natural calming agent that helps refresh the skin after cleansing and maintain comfort throughout the day."
  }
]

const supporting = [
  {
    name: "Oleanolic Acid",
    description: "Naturally helps regulate excess sebum and supports clearer-looking pores."
  },
  {
    name: "Glycerin",
    description: "A classic humectant — pulls moisture into the skin and prevents that tight, over-cleansed feeling."
  },
  {
    name: "Panthenol (Vitamin B5)",
    description: "Supports the skin barrier and helps maintain hydration and softness."
  },
  {
    name: "Allantoin",
    description: "Soothes and conditions the skin, keeping it calm during daily cleansing."
  }
]

export default function IngredientsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-3 sm:mb-4 block">
              Inside Glowify
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-4 sm:mb-6 text-balance">
              What&apos;s inside, and why
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Five hero actives, chosen for visible brightening, balanced oil, and healthy-looking skin — every wash.
            </p>
          </div>

          {/* Hero Ingredients */}
          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            {heroIngredients.map((ing) => (
              <div
                key={ing.name}
                className="bg-card p-6 sm:p-8 rounded-2xl md:rounded-3xl boty-shadow"
              >
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
                  {ing.name}
                </h2>
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
                  {ing.description}
                </p>
              </div>
            ))}
          </div>

          {/* Supporting Ingredients */}
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 sm:mb-8 text-center">
            Supporting cast
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-16 md:mb-20">
            {supporting.map((item) => (
              <div
                key={item.name}
                className="bg-card p-5 sm:p-6 rounded-2xl boty-shadow"
              >
                <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* What we DON'T use */}
          <div className="bg-destructive/10 border-2 border-destructive/20 p-6 sm:p-8 rounded-2xl md:rounded-3xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3 sm:mb-4">
              What we DON&apos;T use
            </h2>
            <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto">
              Glowify is built for healthy radiance — not quick fixes or skin damage.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-muted-foreground">
              <span className="bg-background px-4 py-2 rounded-full text-sm">No Steroids</span>
              <span className="bg-background px-4 py-2 rounded-full text-sm">No Bleaching Agents</span>
              <span className="bg-background px-4 py-2 rounded-full text-sm">No Hydroquinone</span>
              <span className="bg-background px-4 py-2 rounded-full text-sm">No Mercury</span>
              <span className="bg-background px-4 py-2 rounded-full text-sm">No Harsh Soaps</span>
            </div>
          </div>

          {/* Closing note */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 inline-block text-primary mr-1 align-text-bottom" />
              Dermatologist-formulated. Made in Pakistan. For real, healthy skin.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
