import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ShieldCheck, Award, FileCheck, Building2 } from "lucide-react"

export default function ClinicalStandardsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Manufacturing Excellence
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Clinical Standards
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glowify products meet international pharmaceutical standards with rigorous quality control and regulatory compliance.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl text-foreground">DRAP Registered</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Officially registered with Pakistan's Drug Regulatory Authority, ensuring compliance with national pharmaceutical regulations and safety standards.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl text-foreground">ISO Certified</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Manufactured in facilities with ISO certification, guaranteeing consistent quality management systems and international best practices.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl text-foreground">cGMP Compliant</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Current Good Manufacturing Practices ensure every batch meets strict pharmaceutical production standards for safety and efficacy.
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl text-foreground">External Use Only</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Clearly labeled for topical use with proper safety guidelines and usage instructions for consumer protection.
              </p>
            </div>
          </div>

          {/* Quality Control */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Quality Assurance Process</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="text-xl font-medium text-foreground mb-2">Ingredient Sourcing</h3>
                <p className="text-muted-foreground">
                  All active ingredients are pharmaceutical-grade and sourced from certified suppliers with full traceability.
                </p>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="text-xl font-medium text-foreground mb-2">Batch Testing</h3>
                <p className="text-muted-foreground">
                  Every production batch undergoes rigorous testing for pH, active concentration, and microbial contamination.
                </p>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="text-xl font-medium text-foreground mb-2">Stability Testing</h3>
                <p className="text-muted-foreground">
                  Products are tested under various conditions to ensure consistent performance throughout shelf life.
                </p>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="text-xl font-medium text-foreground mb-2">Safety Standards</h3>
                <p className="text-muted-foreground">
                  Comprehensive safety testing ensures no harmful additives, steroids, or bleaching agents are present.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Our Commitment</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              We maintain pharmaceutical standards because your skin deserves the same quality control as medicines. Every bottle of Glowify is a promise of safety and efficacy.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
