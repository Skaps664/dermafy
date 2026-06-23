"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import {
  Package,
  Mail,
  Phone,
  Search,
  ShoppingBag,
  Truck,
  ChevronDown,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  findOrdersByEmailOrPhone,
  statusClasses,
  statusLabel,
  type Order,
  ORDER_STATUSES,
} from "@/lib/customers"

const PROGRESS_FLOW = ["pending", "processing", "shipped", "delivered"] as const

function AccountPageInner() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Allow pre-filling via ?q= for deep-linking from elsewhere
  useEffect(() => {
    const q = searchParams.get("q")
    if (q) {
      setInput(q)
      runSearch(q)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const runSearch = async (raw: string) => {
    const value = raw.trim()
    if (!value) {
      toast({
        title: "Enter your details",
        description: "Provide the email or phone you used to place the order.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)
    setHasSearched(true)
    try {
      const list = await findOrdersByEmailOrPhone(value)
      setOrders(list)
      setExpandedId(list[0]?.id || null)
    } catch (error) {
      console.error(error)
      toast({
        title: "Lookup failed",
        description: "Couldn't reach the server. Try again in a moment.",
        variant: "destructive",
      })
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(input)
  }

  const customer = orders[0]

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 sm:pt-28 pb-12 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-3">
              Track Your Order
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Enter the email or phone number you used at checkout to view your orders and their status.
            </p>
          </div>

          {/* Lookup form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-5 sm:p-8 boty-shadow mb-6 sm:mb-8"
          >
            <label className="block text-sm font-medium mb-3">
              Email or Phone Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="you@example.com or 03001234567"
                  className="w-full pl-11 pr-5 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition text-base"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-primary/90 boty-transition boty-shadow disabled:opacity-50"
              >
                {loading ? "Looking up…" : "Find Orders"}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We use the contact details you entered at checkout to find your orders. No password needed.
            </p>
          </form>

          {/* Results */}
          {hasSearched && !loading && orders.length === 0 && (
            <div className="bg-card rounded-3xl p-8 sm:p-12 boty-shadow text-center">
              <Package className="w-12 h-12 sm:w-14 sm:h-14 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="font-serif text-lg sm:text-xl mb-2">No orders found</h2>
              <p className="text-muted-foreground text-sm mb-6">
                We couldn't find any orders matching that email or phone.
                Double-check what you entered at checkout.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 boty-transition"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {!loading && orders.length > 0 && (
            <>
              {/* Customer summary */}
              {customer && (
                <div className="bg-card rounded-3xl p-5 sm:p-8 boty-shadow mb-6">
                  <h2 className="font-serif text-lg sm:text-2xl mb-4">
                    Hi {customer.customerName?.split(" ")[0] || "there"} 👋
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {orders.length} order{orders.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    expanded={expandedId === order.id}
                    onToggle={() =>
                      setExpandedId(expandedId === order.id ? null : order.id)
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

function OrderCard({
  order,
  expanded,
  onToggle,
}: {
  order: Order
  expanded: boolean
  onToggle: () => void
}) {
  const progressIndex = useMemo(() => {
    if (order.status === "cancelled") return -1
    return PROGRESS_FLOW.indexOf(order.status as (typeof PROGRESS_FLOW)[number])
  }, [order.status])

  return (
    <div className="bg-card rounded-3xl boty-shadow overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-6 hover:bg-muted/30 boty-transition"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{order.orderNumber}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground boty-transition flex-shrink-0 sm:hidden ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusClasses(order.status)}`}
            >
              {statusLabel(order.status)}
            </span>
            <span className="font-semibold text-foreground whitespace-nowrap">
              Rs. {order.total?.toLocaleString()}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground boty-transition hidden sm:block ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-border">
          {/* Progress tracker */}
          {order.status !== "cancelled" ? (
            <div className="mt-6 mb-6">
              <div className="flex items-start justify-between mb-3 gap-1">
                {PROGRESS_FLOW.map((step, idx) => {
                  const reached = idx <= progressIndex
                  return (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center text-center min-w-0"
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 boty-transition ${
                          reached
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs capitalize leading-tight ${
                          reached ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary boty-transition"
                  style={{
                    width: `${
                      progressIndex >= 0
                        ? (progressIndex / (PROGRESS_FLOW.length - 1)) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-6 mb-6 p-4 rounded-xl bg-rose-100/50 dark:bg-rose-900/10 text-rose-700 dark:text-rose-400 text-sm">
              This order was cancelled. If you have any questions, please contact support.
            </div>
          )}

          {/* Tracking */}
          {order.trackingNumber && (
            <div className="mb-6 p-4 bg-primary/5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Truck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    Tracking Number · via POSTEX
                  </p>
                  <p className="font-medium break-all">{order.trackingNumber}</p>
                </div>
              </div>
              <a
                href="https://postex.pk/tracking"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 boty-transition flex-shrink-0 w-full sm:w-auto"
              >
                Track Order
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Shipping address */}
          <div className="mb-6 flex items-start gap-3 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-1">
                Shipping to
              </p>
              <p className="text-foreground break-words">
                {order.address}, {order.city}
                {order.province ? `, ${order.province}` : ""}
              </p>
            </div>
          </div>

          {/* Items */}
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            Items ({order.items?.length || 0})
          </h3>
          <div className="space-y-2 mb-6">
            {(order.items || []).map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 sm:gap-4 p-3 bg-muted/30 rounded-xl items-center"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} × Rs. {item.price}
                  </p>
                </div>
                <p className="font-medium text-sm whitespace-nowrap">
                  Rs. {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="text-sm space-y-1.5 pt-4 border-t border-border">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>
                {order.shipping === 0 ? "Free" : `Rs. ${order.shipping}`}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-Rs. {order.discount}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-base text-foreground pt-2">
              <span>Total</span>
              <span>Rs. {order.total}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Payment: {order.paymentMethod}
            </p>
          </div>

          {/* Status history */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-sm mb-3">Activity</h3>
              <ol className="space-y-2 text-sm">
                {[...order.statusHistory]
                  .sort((a, b) => (a.at < b.at ? 1 : -1))
                  .map((ev, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-3 flex-wrap bg-muted/30 px-3 sm:px-4 py-2 rounded-xl"
                    >
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusClasses(ev.status)}`}
                      >
                        {statusLabel(ev.status)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(ev.at).toLocaleString()}
                      </span>
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <AccountPageInner />
    </Suspense>
  )
}
