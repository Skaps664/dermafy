import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ShieldCheck, CheckCircle2 } from "lucide-react"

export default function DrapRegistrationPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
            </div>
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Regulatory Compliance
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              DRAP Registration
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              GlowMed products are officially registered with Pakistan's Drug Regulatory Authority, your assurance of safety and quality.
            </p>
          </div>

          {/* What is DRAP */}
          <div className="bg-card p-8 rounded-3xl boty-shadow mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-4">What is DRAP?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Drug Regulatory Authority of Pakistan (DRAP) is the national regulatory body responsible for ensuring the safety, efficacy, and quality of pharmaceutical products in Pakistan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              DRAP registration means products have undergone rigorous evaluation and meet strict pharmaceutical standards before being approved for public use.
            </p>
          </div>

          {/* Why It Matters */}
          <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Why DRAP Registration Matters</h2>
          <div className="space-y-6 mb-20">
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Safety Verification</h3>
                  <p className="text-muted-foreground">
                    All ingredients and formulations are reviewed for safety, ensuring no harmful substances are present.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Quality Standards</h3>
                  <p className="text-muted-foreground">
                    Manufacturing facilities and processes are inspected to meet pharmaceutical quality requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Label Accuracy</h3>
                  <p className="text-muted-foreground">
                    Product claims and ingredient lists are verified to ensure truthful and accurate information.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Consumer Protection</h3>
                  <p className="text-muted-foreground">
                    Regulatory oversight protects consumers from substandard or counterfeit products.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Accountability</h3>
                  <p className="text-muted-foreground">
                    Registered manufacturers are held accountable for product quality and consumer safety.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Process */}
          <div className="bg-muted/50 p-8 rounded-3xl mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6 text-center">The Registration Process</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Documentation Submission</h3>
                  <p className="text-sm text-muted-foreground">Complete product formulation, manufacturing details, and safety data</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Technical Review</h3>
                  <p className="text-sm text-muted-foreground">DRAP experts evaluate ingredient safety and formulation efficacy</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Facility Inspection</h3>
                  <p className="text-sm text-muted-foreground">Manufacturing site is inspected for compliance with standards</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Registration Approval</h3>
                  <p className="text-sm text-muted-foreground">Upon meeting all requirements, registration certificate is issued</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Your Safety, Our Priority</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-6">
              DRAP registration is not just a certification — it's our commitment to your safety. Every GlowMed product you use has been thoroughly evaluated and approved by Pakistan's pharmaceutical authority.
            </p>
            <p className="text-sm text-primary-foreground/80">
              Licensed pharmaceutical-grade skincare you can trust
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
