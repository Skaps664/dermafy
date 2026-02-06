"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { CTABanner } from "@/components/boty/cta-banner"
import { useCart } from "@/components/boty/cart-context"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Package, ShoppingBag, Tag, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    couponCode: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderDetails, setOrderDetails] = useState({ name: "", city: "", phone: "", orderNumber: "" })

  const provinces = [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Gilgit-Baltistan",
    "Azad Kashmir",
    "Islamabad Capital Territory"
  ]

  const shipping = 0
  const discount = 0 // Will be calculated based on coupon code
  const total = subtotal + shipping - discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate order number
      const orderNumber = `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`
      
      // Get current user ID (if logged in)
      const userId = auth.currentUser?.uid || "guest"
      
      // Save order to Firestore
      await addDoc(collection(db, "orders"), {
        orderNumber,
        userId,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal,
        shipping,
        discount,
        total,
        status: "pending",
        paymentMethod: "Cash on Delivery",
        couponCode: formData.couponCode || null,
        createdAt: new Date().toISOString(),
      })
      
      // Save order details for confirmation page
      setOrderDetails({
        name: formData.name,
        city: formData.city,
        phone: formData.phone,
        orderNumber
      })
      
      // Clear cart
      clearCart()
      
      // Show confirmation
      setOrderPlaced(true)
      setIsSubmitting(false)
    } catch (error: any) {
      setIsSubmitting(false)
      toast({
        title: "Order failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Show confirmation page after order is placed
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 py-48">
          <div className="container max-w-3xl mx-auto px-4">
            {/* Confirmation Card */}
            <div className="bg-card rounded-3xl p-12 boty-shadow text-center mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
              </div>
              
              <h1 className="font-serif text-4xl mb-4">Thank You for Your Order!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your order has been successfully placed.
              </p>

              <div className="bg-muted/50 rounded-2xl p-6 mb-8">
                <div className="grid sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                    <p className="font-semibold text-lg">{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Delivery Location</p>
                    <p className="font-semibold">{orderDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contact Number</p>
                    <p className="font-semibold">{orderDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <p className="font-semibold">3-5 Business Days</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-muted-foreground">
                <p>
                  We've sent a confirmation message to <strong className="text-foreground">{orderDetails.phone}</strong>
                </p>
                <p>
                  Our team will contact you shortly to confirm your order.
                </p>
                <p className="text-sm">
                  Payment will be collected in cash upon delivery.
                </p>
              </div>
            </div>

            {/* CTA Banner */}
            <CTABanner />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <button
                onClick={() => router.push("/shop")}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 boty-transition boty-shadow"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push("/account")}
                className="border border-border text-foreground px-8 py-4 rounded-full font-medium hover:bg-muted boty-transition"
              >
                View My Orders
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-48">
          <div className="container max-w-2xl mx-auto px-4 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
            <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
            <button
              onClick={() => router.push("/shop")}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 boty-transition"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-48">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="font-serif text-4xl mb-12 text-center">Checkout</h1>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Checkout Form - Left Side */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-card rounded-3xl p-8 boty-shadow">
                  <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6 text-primary" />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
                          placeholder="+92 300 1234567"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-3xl p-8 boty-shadow">
                  <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6 text-primary" />
                    Shipping Address
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
                        placeholder="House/Flat #, Street, Area"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
                          placeholder="e.g., Karachi"
                        />
                      </div>

                      <div>
                        <label htmlFor="province" className="block text-sm font-medium mb-2">
                          Province *
                        </label>
                        <select
                          id="province"
                          name="province"
                          required
                          value={formData.province}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition appearance-none cursor-pointer"
                        >
                          <option value="">Select Province</option>
                          {provinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-3xl p-8 boty-shadow">
                  <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Payment Method
                  </h2>
                  
                  <div className="bg-primary/5 border-2 border-primary rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      </div>
                      <span className="font-medium text-lg">Cash on Delivery</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">
                      Pay when you receive your order. Our delivery partner will collect the payment.
                    </p>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="bg-card rounded-3xl p-8 boty-shadow">
                  <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                    <Tag className="w-6 h-6 text-primary" />
                    Coupon Code
                  </h2>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      id="couponCode"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
                      placeholder="Enter coupon code"
                    />
                    <button
                      type="button"
                      className="px-6 py-3 rounded-full border border-border hover:bg-muted boty-transition font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium text-lg hover:bg-primary/90 boty-transition disabled:opacity-50 disabled:cursor-not-allowed boty-shadow"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl p-8 boty-shadow sticky top-24">
                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">Rs. {item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-Rs. {discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span>Rs. {total}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 p-4 bg-primary/5 rounded-2xl">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Free Delivery</strong> on all orders. Estimated delivery: 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
