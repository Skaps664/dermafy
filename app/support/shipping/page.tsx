import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Package, Truck, MapPin, Clock, CheckCircle2 } from "lucide-react"

export default function ShippingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Delivery Information
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Shipping Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fast and reliable delivery across Pakistan. Your Glowify products, delivered with care.
            </p>
          </div>

          {/* Shipping Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Nationwide Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    We ship to all major cities and towns across Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Orders processed within 24 hours on business days
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Secure Packaging</h3>
                  <p className="text-sm text-muted-foreground">
                    All products carefully packed to prevent damage
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Track Your Order</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time tracking via SMS and email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Timeframes */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Delivery Timeframes</h2>
            <div className="bg-card rounded-3xl overflow-hidden boty-shadow">
              <div className="divide-y divide-border">
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Major Cities</h3>
                    <p className="text-sm text-muted-foreground">Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad</p>
                  </div>
                  <span className="font-medium text-primary">3-5 Business Days</span>
                </div>

                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Other Cities</h3>
                    <p className="text-sm text-muted-foreground">Multan, Peshawar, Quetta, Hyderabad, Sialkot</p>
                  </div>
                  <span className="font-medium text-primary">5-7 Business Days</span>
                </div>

                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Remote Areas</h3>
                    <p className="text-sm text-muted-foreground">Rural and remote locations</p>
                  </div>
                  <span className="font-medium text-primary">7-10 Business Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Costs */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">Shipping Charges</h2>
            <div className="bg-card p-8 rounded-3xl boty-shadow">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Free Shipping</h3>
                    <p className="text-muted-foreground">On all orders above Rs. 3,000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Standard Shipping</h3>
                    <p className="text-muted-foreground">Rs. 150 for major cities | Rs. 250 for other areas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Cash on Delivery</h3>
                    <p className="text-muted-foreground">Available nationwide (additional Rs. 100 fee may apply)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-foreground mb-8 text-center">How to Track Your Order</h2>
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Order Confirmation</h3>
                    <p className="text-sm text-muted-foreground">You'll receive an email and SMS confirming your order</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Dispatched</h3>
                    <p className="text-sm text-muted-foreground">Tracking number sent via email and SMS when order ships</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">In Transit</h3>
                    <p className="text-sm text-muted-foreground">Track your package in real-time using the provided link</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Delivered</h3>
                    <p className="text-sm text-muted-foreground">Sign for your package and enjoy your Glowify products!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Shipping Issues */}
          <div className="bg-muted/50 p-8 rounded-3xl text-center">
            <h2 className="font-serif text-2xl text-foreground mb-3">Shipping Issues?</h2>
            <p className="text-muted-foreground mb-6">
              If your order is delayed or you have shipping questions, our support team is ready to help.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition"
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
