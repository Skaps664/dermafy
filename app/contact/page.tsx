"use client"

import { useState } from "react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Get In Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-balance">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about Glowify or need skincare advice? We're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <a href="mailto:support@dermafy.pk" className="text-muted-foreground hover:text-primary transition">
                      support@dermafy.pk
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <a href="tel:+923001234567" className="text-muted-foreground hover:text-primary transition">
                      +92 300 1234567
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-2xl boty-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Karachi, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border-2 border-primary/20">
                <h3 className="font-medium text-foreground mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24-48 hours on business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-8 rounded-3xl boty-shadow">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select a subject</option>
                        <option value="product">Product Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="skincare">Skincare Advice</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
