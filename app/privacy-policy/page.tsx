import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Shield, Eye, Lock, UserCheck, Database, Bell } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Last updated: February 6, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-muted-foreground leading-relaxed">
              At Dermafy, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="font-medium text-foreground mb-3">Personal Information</h3>
                <p className="text-muted-foreground mb-2">When you make a purchase, we collect:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information (processed securely by payment providers)</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <h3 className="font-medium text-foreground mb-3">Automatically Collected Information</h3>
                <p className="text-muted-foreground mb-2">When you visit our website:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website and search terms used</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">How We Use Your Information</h2>
            </div>
            
            <div className="bg-card p-8 rounded-2xl boty-shadow">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Process and fulfill your orders, including shipping and payment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Send order confirmations and shipping updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Respond to customer service requests and support inquiries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Improve our website and customer experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Send marketing communications (with your consent)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Prevent fraud and enhance security</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Information Sharing</h2>
            </div>
            
            <div className="bg-card p-6 rounded-2xl boty-shadow mb-4">
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/30 p-6 rounded-2xl">
                <h3 className="font-medium text-foreground mb-2">Service Providers</h3>
                <p className="text-sm text-muted-foreground">
                  Shipping companies, payment processors, and email service providers who assist in operating our business.
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-2xl">
                <h3 className="font-medium text-foreground mb-2">Legal Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  When required by law or to protect our rights, property, or safety.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Data Security</h2>
            </div>
            
            <div className="bg-card p-8 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• SSL encryption for data transmission</li>
                <li>• Secure payment processing through trusted providers</li>
                <li>• Regular security audits and updates</li>
                <li>• Access controls and authentication</li>
                <li>• Employee training on data protection</li>
              </ul>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl text-foreground">Your Rights</h2>
            </div>
            
            <div className="bg-card p-8 rounded-2xl boty-shadow">
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Access, update, or delete your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Opt-out of marketing communications at any time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Request a copy of the data we hold about you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Lodge a complaint with data protection authorities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Cookies</h2>
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Children's Privacy</h2>
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl text-foreground mb-6">Changes to This Policy</h2>
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-primary text-primary-foreground p-12 rounded-3xl text-center">
            <h2 className="font-serif text-3xl mb-4">Questions About Privacy?</h2>
            <p className="text-lg text-primary-foreground/90 mb-6">
              If you have questions or concerns about our privacy practices, please contact us.
            </p>
            <div className="space-y-2 text-primary-foreground/90">
              <p>Email: privacy@dermafy.pk</p>
              <p>Phone: +92 300 1234567</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
