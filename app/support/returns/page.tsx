import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { RotateCcw, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function ReturnsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Customer Satisfaction
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Returns & Refunds
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your satisfaction is our priority. We accept returns on unopened products within 7 days.
            </p>
          </div>

          {/* Return Policy Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card p-6 rounded-2xl boty-shadow text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">7-Day Window</h3>
              <p className="text-sm text-muted-foreground">
                Return within 7 days of delivery
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Unopened Only</h3>
              <p className="text-sm text-muted-foreground">
                Products must be unused and sealed
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">Full Refund</h3>
              <p className="text-sm text-muted-foreground">
                Refund processed within 7-10 days
              </p>
            </div>
          </div>

          {/* Eligible for Return */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Eligible for Return</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Damaged or Defective Products</h3>
                    <p className="text-sm text-muted-foreground">
                      If you receive a damaged or defective product, contact us immediately with photos. We'll arrange a replacement or full refund.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Wrong Product Delivered</h3>
                    <p className="text-sm text-muted-foreground">
                      If you receive the wrong product, we'll send you the correct item and arrange pickup of the incorrect one at no cost to you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Unopened Products</h3>
                    <p className="text-sm text-muted-foreground">
                      Changed your mind? You can return unopened products within 7 days. Product must be in original packaging with all seals intact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Not Eligible */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Not Eligible for Return</h2>
            <div className="bg-destructive/10 border-2 border-destructive/20 p-8 rounded-3xl">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Opened or used products (for hygiene and safety reasons)</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Products without original packaging or damaged packaging</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Returns requested after 7 days from delivery</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Products purchased from unauthorized sellers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">How to Return</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Email dermafypharma@gmail.com or call +92 339 0166442 within 7 days of delivery. Provide your order number and reason for return.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Return Authorization</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your request and provide a Return Authorization Number (RAN) if approved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Ship the Product</h3>
                    <p className="text-sm text-muted-foreground">
                      Pack the product securely with the RAN and ship to the address provided. Keep tracking information for your records.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Refund Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Once we receive and inspect the product, your refund will be processed within 7-10 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-card p-8 rounded-3xl boty-shadow mb-16">
            <h2 className="font-serif text-2xl text-foreground mb-6">Refund Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>• Refunds will be credited to the original payment method used for purchase</p>
              <p>• Bank transfers may take 3-5 business days to reflect in your account</p>
              <p>• Shipping charges are non-refundable (except for damaged/wrong products)</p>
              <p>• Customer is responsible for return shipping costs (except for our errors)</p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Need Help with Returns?</h2>
            <p className="text-lg text-primary-foreground/90 mb-6">
              Our support team is here to make your return process smooth and hassle-free.
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
