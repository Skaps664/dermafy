"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import {
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Search,
  Download,
  Lock,
  LogOut,
  Users,
  ListOrdered,
  ShoppingBag,
  X,
  Truck,
  StickyNote,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import {
  collection,
  query as fsQuery,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"
import Image from "next/image"
import {
  ORDER_STATUSES,
  type Order,
  type OrderStatus,
  type Customer,
  statusClasses,
  statusLabel,
} from "@/lib/customers"

const ADMIN_PASSKEY = "YOutuber123!@"
const UNLOCK_KEY = "dermafy_admin_unlocked"

type Tab = "orders" | "customers"
type StatusFilter = "all" | OrderStatus

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "New / Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
]

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value)
  return `"${s.replace(/"/g, '""')}"`
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n")
  // BOM so Excel detects UTF-8
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function AdminPage() {
  const { toast } = useToast()
  const [unlocked, setUnlocked] = useState(false)
  const [passkeyInput, setPasskeyInput] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<Tab>("orders")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [editingTracking, setEditingTracking] = useState("")
  const [editingNotes, setEditingNotes] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(UNLOCK_KEY) === "true") {
      setUnlocked(true)
    }
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const ordersSnap = await getDocs(
        fsQuery(collection(db, "orders"), orderBy("createdAt", "desc"))
      )
      const ordersData = ordersSnap.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }) as Order
      )
      setOrders(ordersData)

      try {
        const customersSnap = await getDocs(
          fsQuery(collection(db, "customers"), orderBy("lastOrderAt", "desc"))
        )
        const customersData = customersSnap.docs.map(
          (d) => ({ id: d.id, ...(d.data() as Omit<Customer, "id">) }) as Customer
        )
        setCustomers(customersData)
      } catch {
        // Customers collection may not exist yet on a brand new install.
        setCustomers([])
      }
    } catch (error) {
      console.error("Error loading admin data:", error)
      toast({
        title: "Failed to load",
        description: "Could not fetch orders. Check your connection.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (unlocked) loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked])

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (passkeyInput === ADMIN_PASSKEY) {
      sessionStorage.setItem(UNLOCK_KEY, "true")
      setUnlocked(true)
      setPasskeyInput("")
    } else {
      toast({
        title: "Invalid passkey",
        description: "The passkey you entered is incorrect.",
        variant: "destructive",
      })
      setPasskeyInput("")
    }
  }

  const handleLockOut = () => {
    sessionStorage.removeItem(UNLOCK_KEY)
    setUnlocked(false)
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    // Guard: shipping requires a tracking number
    if (newStatus === "shipped") {
      const order = orders.find((o) => o.id === orderId)
      const savedTracking = order?.trackingNumber?.trim()
      const pendingTracking =
        selectedOrder?.id === orderId ? editingTracking.trim() : ""
      if (!savedTracking && !pendingTracking) {
        toast({
          title: "Tracking number required",
          description:
            "Please enter a tracking number first, then change the status to Shipped.",
          variant: "destructive",
        })
        // Open the order so the admin can add tracking
        if (order && selectedOrder?.id !== orderId) {
          setSelectedOrder(order)
        }
        return
      }
    }

    try {
      const now = new Date().toISOString()
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
        updatedAt: now,
        statusHistory: arrayUnion({ status: newStatus, at: now }),
      })

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: newStatus,
                updatedAt: now,
                statusHistory: [
                  ...(o.statusHistory || []),
                  { status: newStatus, at: now },
                ],
              }
            : o
        )
      )

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) =>
          prev
            ? {
                ...prev,
                status: newStatus,
                updatedAt: now,
                statusHistory: [
                  ...(prev.statusHistory || []),
                  { status: newStatus, at: now },
                ],
              }
            : prev
        )
      }

      toast({
        title: "Status updated",
        description: `Order is now "${statusLabel(newStatus)}".`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Update failed",
        description: "Could not update status. Try again.",
        variant: "destructive",
      })
    }
  }

  const saveTrackingAndNotes = async () => {
    if (!selectedOrder) return
    try {
      const now = new Date().toISOString()
      const tracking = editingTracking.trim() || null
      const notes = editingNotes.trim() || null
      await updateDoc(doc(db, "orders", selectedOrder.id), {
        trackingNumber: tracking,
        notes,
        updatedAt: now,
      })
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, trackingNumber: tracking, notes, updatedAt: now }
            : o
        )
      )
      setSelectedOrder((prev) =>
        prev
          ? { ...prev, trackingNumber: tracking, notes, updatedAt: now }
          : prev
      )
      toast({ title: "Saved", description: "Tracking & notes updated." })
    } catch (error) {
      console.error(error)
      toast({
        title: "Save failed",
        description: "Could not save changes.",
        variant: "destructive",
      })
    }
  }

  // Prime tracking + notes inputs whenever an order is opened
  useEffect(() => {
    if (selectedOrder) {
      setEditingTracking(selectedOrder.trackingNumber || "")
      setEditingNotes(selectedOrder.notes || "")
    }
  }, [selectedOrder])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length }
    for (const s of ORDER_STATUSES) c[s] = 0
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1
    return c
  }, [orders])

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase()
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false
      if (!term) return true
      return (
        o.orderNumber?.toLowerCase().includes(term) ||
        o.customerName?.toLowerCase().includes(term) ||
        o.email?.toLowerCase().includes(term) ||
        o.phone?.toLowerCase().includes(term) ||
        o.city?.toLowerCase().includes(term)
      )
    })
  }, [orders, statusFilter, search])

  const filteredCustomers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return customers
    return customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.phone?.toLowerCase().includes(term) ||
        c.city?.toLowerCase().includes(term)
    )
  }, [customers, search])

  const customerOrders = useMemo(() => {
    if (!selectedCustomerId) return []
    return orders.filter((o) => o.customerId === selectedCustomerId)
  }, [orders, selectedCustomerId])

  const handleExportCsv = () => {
    if (filteredOrders.length === 0) {
      toast({
        title: "Nothing to export",
        description: "Adjust filters — no orders in the current view.",
        variant: "destructive",
      })
      return
    }
    const headers = [
      "Order Number",
      "Date",
      "Status",
      "Customer Name",
      "Phone",
      "Email",
      "Address",
      "City",
      "Province",
      "Items",
      "Quantity",
      "Subtotal",
      "Shipping",
      "Discount",
      "Total",
      "Payment Method",
      "Tracking Number",
      "Notes",
    ]
    const rows: string[][] = [headers]
    for (const o of filteredOrders) {
      const itemSummary = (o.items || [])
        .map((i) => `${i.name} x${i.quantity}`)
        .join("; ")
      const totalQty = (o.items || []).reduce((sum, i) => sum + i.quantity, 0)
      rows.push([
        o.orderNumber,
        o.createdAt ? new Date(o.createdAt).toLocaleString() : "",
        statusLabel(o.status),
        o.customerName,
        o.phone,
        o.email,
        o.address,
        o.city,
        o.province,
        itemSummary,
        String(totalQty),
        String(o.subtotal),
        String(o.shipping),
        String(o.discount),
        String(o.total),
        o.paymentMethod,
        o.trackingNumber || "",
        o.notes || "",
      ])
    }
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")
    const suffix = statusFilter === "all" ? "all" : statusFilter
    downloadCsv(`dermafy-orders-${suffix}-${stamp}.csv`, rows)
    toast({
      title: "CSV downloaded",
      description: `${filteredOrders.length} order(s) exported.`,
    })
  }

  // ===== PASSKEY GATE =====
  if (!unlocked) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
          <div className="w-full max-w-md bg-card rounded-3xl p-10 boty-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-serif text-3xl mb-2">Admin Access</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Enter the admin passkey to continue.
            </p>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Passkey"
                autoFocus
                autoComplete="off"
                className="w-full px-5 py-3 rounded-full border border-border bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition text-center tracking-wider"
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:bg-primary/90 boty-transition boty-shadow"
              >
                Unlock
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Manage orders, customers and shipments.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                className="text-sm px-4 py-2 rounded-full border border-border bg-card hover:bg-muted boty-transition disabled:opacity-50"
              >
                {loading ? "Refreshing…" : "Refresh"}
              </button>
              <button
                onClick={handleLockOut}
                className="text-sm px-4 py-2 rounded-full border border-border bg-card hover:bg-muted boty-transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Lock
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            <StatCard label="Total" value={counts.all} />
            <StatCard label="Pending" value={counts.pending || 0} accent="amber" />
            <StatCard label="Processing" value={counts.processing || 0} accent="sky" />
            <StatCard label="Shipped" value={counts.shipped || 0} accent="indigo" />
            <StatCard label="Delivered" value={counts.delivered || 0} accent="green" />
            <StatCard label="Customers" value={customers.length} accent="primary" />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 bg-card p-1 rounded-full w-fit boty-shadow">
            <TabButton
              active={tab === "orders"}
              onClick={() => {
                setTab("orders")
                setSelectedCustomerId(null)
              }}
              icon={<ListOrdered className="w-4 h-4" />}
              label={`Orders (${orders.length})`}
            />
            <TabButton
              active={tab === "customers"}
              onClick={() => setTab("customers")}
              icon={<Users className="w-4 h-4" />}
              label={`Customers (${customers.length})`}
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  tab === "orders"
                    ? "Search order #, name, email, phone, city…"
                    : "Search customer name, email, phone, city…"
                }
                className="w-full pl-11 pr-5 py-3 rounded-full border border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 boty-transition"
              />
            </div>
            {tab === "orders" && (
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 boty-transition boty-shadow"
              >
                <Download className="w-4 h-4" />
                Export CSV ({filteredOrders.length})
              </button>
            )}
          </div>

          {/* ===== ORDERS TAB ===== */}
          {tab === "orders" && (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {FILTERS.map((f) => {
                  const active = statusFilter === f.value
                  const count = counts[f.value] ?? 0
                  return (
                    <button
                      key={f.value}
                      onClick={() => setStatusFilter(f.value)}
                      className={`text-xs px-4 py-2 rounded-full boty-transition border ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground/80 border-border hover:bg-muted"
                      }`}
                    >
                      {f.label}
                      <span
                        className={`ml-2 ${
                          active
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="bg-card rounded-3xl boty-shadow overflow-hidden">
                {loading ? (
                  <div className="p-16 text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">Loading orders…</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="p-16 text-center">
                    <Package className="w-14 h-14 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No orders match the current filters.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <Th>Order #</Th>
                          <Th>Customer</Th>
                          <Th>Contact</Th>
                          <Th>Items</Th>
                          <Th>Total</Th>
                          <Th>Status</Th>
                          <Th>Date</Th>
                          <Th>Actions</Th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="hover:bg-muted/30 transition cursor-pointer"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <td className="px-5 py-4 text-sm font-medium whitespace-nowrap">
                              {order.orderNumber}
                            </td>
                            <td className="px-5 py-4 text-sm">
                              <p className="font-medium">{order.customerName}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.city}
                                {order.province ? `, ${order.province}` : ""}
                              </p>
                            </td>
                            <td className="px-5 py-4 text-sm text-muted-foreground">
                              <p>{order.phone}</p>
                              <p className="text-xs">{order.email}</p>
                            </td>
                            <td className="px-5 py-4 text-sm whitespace-nowrap">
                              {order.items?.length || 0} item
                              {(order.items?.length || 0) !== 1 ? "s" : ""}
                            </td>
                            <td className="px-5 py-4 text-sm font-medium whitespace-nowrap">
                              Rs. {order.total?.toLocaleString()}
                            </td>
                            <td className="px-5 py-4">
                              <select
                                value={order.status}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  updateOrderStatus(
                                    order.id,
                                    e.target.value as OrderStatus
                                  )
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-medium capitalize cursor-pointer border-0 outline-none ${statusClasses(order.status)}`}
                              >
                                {ORDER_STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {statusLabel(s)}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : ""}
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedOrder(order)
                                }}
                                className="text-primary hover:underline text-sm font-medium"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ===== CUSTOMERS TAB ===== */}
          {tab === "customers" && (
            <div className="bg-card rounded-3xl boty-shadow overflow-hidden">
              {loading ? (
                <div className="p-16 text-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">Loading customers…</p>
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="p-16 text-center">
                  <Users className="w-14 h-14 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No customers yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>City</Th>
                        <Th>Orders</Th>
                        <Th>Spent</Th>
                        <Th>Last Order</Th>
                        <Th>Actions</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredCustomers.map((c) => (
                        <tr
                          key={c.id}
                          className="hover:bg-muted/30 transition cursor-pointer"
                          onClick={() => setSelectedCustomerId(c.id)}
                        >
                          <td className="px-5 py-4 text-sm font-medium">{c.name}</td>
                          <td className="px-5 py-4 text-sm text-muted-foreground">
                            {c.email}
                          </td>
                          <td className="px-5 py-4 text-sm text-muted-foreground">
                            {c.phone}
                          </td>
                          <td className="px-5 py-4 text-sm text-muted-foreground">
                            {c.city || "—"}
                          </td>
                          <td className="px-5 py-4 text-sm font-medium">
                            {c.totalOrders || 0}
                          </td>
                          <td className="px-5 py-4 text-sm font-medium">
                            Rs. {(c.totalSpent || 0).toLocaleString()}
                          </td>
                          <td className="px-5 py-4 text-sm text-muted-foreground">
                            {c.lastOrderAt
                              ? new Date(c.lastOrderAt).toLocaleDateString()
                              : "—"}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCustomerId(c.id)
                              }}
                              className="text-primary hover:underline text-sm font-medium"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===== ORDER DETAIL MODAL ===== */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-card rounded-3xl max-w-3xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto boty-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl mb-1">
                    Order Details
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {selectedOrder.orderNumber}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-muted-foreground hover:text-foreground transition"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateOrderStatus(
                      selectedOrder.id,
                      e.target.value as OrderStatus
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Info */}
              <div className="bg-muted/30 rounded-2xl p-5 mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Customer
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <InfoRow
                    icon={<User className="w-4 h-4" />}
                    label="Name"
                    value={selectedOrder.customerName}
                  />
                  <InfoRow
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    value={selectedOrder.email}
                  />
                  <InfoRow
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone"
                    value={selectedOrder.phone}
                  />
                  <InfoRow
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address"
                    value={`${selectedOrder.address}, ${selectedOrder.city}, ${selectedOrder.province}`}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  Items
                </h3>
                <div className="space-y-2">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-3 bg-muted/30 rounded-xl items-center"
                    >
                      <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
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
              </div>

              {/* Totals */}
              <div className="bg-muted/30 rounded-2xl p-5 mb-6 text-sm space-y-2">
                <Row label="Subtotal" value={`Rs. ${selectedOrder.subtotal}`} />
                <Row
                  label="Shipping"
                  value={
                    selectedOrder.shipping === 0
                      ? "Free"
                      : `Rs. ${selectedOrder.shipping}`
                  }
                />
                {selectedOrder.discount > 0 && (
                  <Row
                    label="Discount"
                    value={`-Rs. ${selectedOrder.discount}`}
                    className="text-green-600"
                  />
                )}
                <Row
                  label="Total"
                  value={`Rs. ${selectedOrder.total}`}
                  bold
                  className="border-t border-border pt-3"
                />
              </div>

              {/* Meta */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6 text-sm">
                <InfoRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Order Date"
                  value={
                    selectedOrder.createdAt
                      ? new Date(selectedOrder.createdAt).toLocaleString()
                      : ""
                  }
                />
                <InfoRow
                  icon={<CreditCard className="w-4 h-4" />}
                  label="Payment"
                  value={selectedOrder.paymentMethod}
                />
              </div>

              {/* Tracking + Notes */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={editingTracking}
                    onChange={(e) => setEditingTracking(e.target.value)}
                    placeholder="e.g. TCS123456789"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <StickyNote className="w-4 h-4 text-primary" />
                    Internal Notes
                  </label>
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    rows={3}
                    placeholder="Internal notes about this order…"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>
                <button
                  onClick={saveTrackingAndNotes}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 boty-transition"
                >
                  Save tracking &amp; notes
                </button>
              </div>

              {/* Status history */}
              {selectedOrder.statusHistory &&
                selectedOrder.statusHistory.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm mb-3">Status History</h3>
                    <ol className="space-y-2 text-sm">
                      {[...selectedOrder.statusHistory]
                        .sort((a, b) => (a.at < b.at ? 1 : -1))
                        .map((ev, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between bg-muted/30 px-4 py-2 rounded-xl"
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
          </div>
        </div>
      )}

      {/* ===== CUSTOMER DETAIL MODAL ===== */}
      {selectedCustomerId &&
        (() => {
          const c = customers.find((x) => x.id === selectedCustomerId)
          if (!c) return null
          return (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedCustomerId(null)}
            >
              <div
                className="bg-card rounded-3xl max-w-3xl w-full my-8 boty-shadow"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl mb-1">
                        {c.name}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Customer details
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCustomerId(null)}
                      className="text-muted-foreground hover:text-foreground transition"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="bg-muted/30 rounded-2xl p-5 mb-6 grid sm:grid-cols-2 gap-3 text-sm">
                    <InfoRow
                      icon={<Mail className="w-4 h-4" />}
                      label="Email"
                      value={c.email}
                    />
                    <InfoRow
                      icon={<Phone className="w-4 h-4" />}
                      label="Phone"
                      value={c.phone}
                    />
                    <InfoRow
                      icon={<MapPin className="w-4 h-4" />}
                      label="Address"
                      value={
                        c.address
                          ? `${c.address}, ${c.city || ""}${c.province ? ", " + c.province : ""}`
                          : "—"
                      }
                    />
                    <InfoRow
                      icon={<Calendar className="w-4 h-4" />}
                      label="First Order"
                      value={
                        c.firstOrderAt
                          ? new Date(c.firstOrderAt).toLocaleDateString()
                          : "—"
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        Total Orders
                      </p>
                      <p className="text-2xl font-semibold">
                        {c.totalOrders || 0}
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        Total Spent
                      </p>
                      <p className="text-2xl font-semibold">
                        Rs. {(c.totalSpent || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-3">Order History</h3>
                  {customerOrders.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">
                      No orders found for this customer.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {customerOrders.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => {
                            setSelectedCustomerId(null)
                            setSelectedOrder(o)
                          }}
                          className="w-full text-left flex items-center justify-between gap-3 p-4 bg-muted/30 rounded-xl hover:bg-muted boty-transition"
                        >
                          <div>
                            <p className="font-medium text-sm">{o.orderNumber}</p>
                            <p className="text-xs text-muted-foreground">
                              {o.createdAt
                                ? new Date(o.createdAt).toLocaleDateString()
                                : ""}{" "}
                              · {o.items?.length || 0} item
                              {(o.items?.length || 0) !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusClasses(o.status)}`}
                            >
                              {statusLabel(o.status)}
                            </span>
                            <span className="text-sm font-medium whitespace-nowrap">
                              Rs. {o.total?.toLocaleString()}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })()}

      <Footer />
    </main>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {children}
    </th>
  )
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: "amber" | "sky" | "indigo" | "green" | "primary"
}) {
  const color =
    accent === "amber"
      ? "text-amber-600"
      : accent === "sky"
        ? "text-sky-600"
        : accent === "indigo"
          ? "text-indigo-600"
          : accent === "green"
            ? "text-green-600"
            : accent === "primary"
              ? "text-primary"
              : "text-foreground"
  return (
    <div className="bg-card p-4 rounded-2xl boty-shadow">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm boty-transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-muted-foreground mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-sm break-words">{value || "—"}</p>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  bold,
  className,
}: {
  label: string
  value: string
  bold?: boolean
  className?: string
}) {
  return (
    <div
      className={`flex justify-between ${bold ? "font-semibold text-base" : "text-muted-foreground"} ${className || ""}`}
    >
      <span>{label}</span>
      <span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  )
}
