import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { FileText, ShoppingCart, Package, AlertTriangle, Scale, Ban } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Last updated: February 6, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Dermafy. By accessing our website and purchasing our products, you agree to these Terms of Service. Please read them carefully before using our services.
            </p>
          </div>

          {/* Use of Website */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Use of Website</h2>
            </div>
            
            <div className="bg-card p-8 rounded-2xl boty-shadow">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>You must be at least 18 years old to make purchases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>You agree to provide accurate and complete information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>You are responsible for maintaining account security</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>You agree not to use the site for unlawful purposes</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Product Information */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Product Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="font-medium text-foreground mb-3">Product Descriptions</h3>
                <p className="text-muted-foreground">
                  We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, images, or other content are accurate, complete, or error-free.
                </p>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="font-medium text-foreground mb-3">Pharmaceutical Product</h3>
                <p className="text-muted-foreground">
                  GlowMed products are pharmaceutical-grade and DRAP registered. They are for external use only and not intended to diagnose, treat, cure, or prevent any disease. Consult a dermatologist for severe skin conditions.
                </p>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="font-medium text-foreground mb-3">Pricing</h3>
                <p className="text-muted-foreground">
                  Prices are listed in Pakistani Rupees (PKR) and are subject to change without notice. We reserve the right to modify or discontinue products at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Orders and Payment */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Orders & Payment</h2>
            </div>
            
            <div className="bg-card p-8 rounded-2xl boty-shadow">
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Order Acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order.
                </li>
                <li>
                  <strong className="text-foreground">Payment:</strong> Payment must be made at the time of purchase via our accepted payment methods (online payment or cash on delivery).
                </li>
                <li>
                  <strong className="text-foreground">Order Confirmation:</strong> You will receive an email confirmation once your order is placed and when it ships.
                </li>
                <li>
                  <strong className="text-foreground">Cancellation:</strong> Orders can be cancelled within 2 hours of placement. Contact support immediately if you need to cancel.
                </li>
              </ul>
            </div>
          </div>

          {/* Shipping and Delivery */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Shipping & Delivery</h2>
            
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground mb-4">
                We ship nationwide across Pakistan. Delivery timeframes are estimates and not guarantees.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Risk of loss passes to you upon delivery to the carrier</li>
                <li>• We are not responsible for delays caused by shipping carriers</li>
                <li>• You must provide accurate shipping information</li>
                <li>• Refused deliveries may incur return shipping charges</li>
              </ul>
            </div>
          </div>

          {/* Returns and Refunds */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Returns & Refunds</h2>
            
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                We accept returns on unopened products within 7 days of delivery. See our Returns Policy for complete details. Opened products cannot be returned due to hygiene and safety regulations.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Limitation of Liability</h2>
            </div>
            
            <div className="bg-destructive/10 border-2 border-destructive/20 p-8 rounded-3xl">
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• We are not liable for indirect, incidental, or consequential damages</li>
                <li>• Our liability is limited to the amount you paid for the product</li>
                <li>• We do not guarantee specific results from product use</li>
                <li>• Use products as directed and discontinue if irritation occurs</li>
              </ul>
            </div>
          </div>

          {/* Prohibited Uses */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Prohibited Uses</h2>
            </div>
            
            <div className="bg-card p-8 rounded-2xl boty-shadow">
              <p className="text-muted-foreground mb-4">You may not use our site to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Violate any laws or regulations</li>
                <li>• Infringe on intellectual property rights</li>
                <li>• Transmit viruses or malicious code</li>
                <li>• Engage in unauthorized framing or linking</li>
                <li>• Reverse engineer or copy our content</li>
                <li>• Resell products without authorization</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Intellectual Property</h2>
            
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of Dermafy and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Governing Law</h2>
            
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of Pakistan. Any disputes shall be resolved in the courts of Pakistan.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Changes to Terms</h2>
            
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to update these Terms at any time. Changes are effective immediately upon posting. Continued use of our site constitutes acceptance of updated Terms.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Questions About Terms?</h2>
            <p className="text-lg text-primary-foreground/90 mb-6">
              If you have questions about these Terms of Service, please contact us.
            </p>
            <div className="space-y-2 text-primary-foreground/90">
              <p>Email: legal@dermafy.pk</p>
              <p>Phone: +92 300 1234567</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
