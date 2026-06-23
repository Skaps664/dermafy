import { db } from "@/lib/firebase"
import {
  collection,
  query as fsQuery,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
  orderBy,
} from "firebase/firestore"

export const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export type Customer = {
  id: string
  name: string
  email: string
  emailNormalized: string
  phone: string
  phoneNormalized: string
  address?: string
  city?: string
  province?: string
  totalOrders: number
  totalSpent: number
  firstOrderAt: string
  lastOrderAt: string
  createdAt: string
}

export type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type StatusEvent = {
  status: OrderStatus
  at: string
}

export type Order = {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  email: string
  emailNormalized: string
  phone: string
  phoneNormalized: string
  address: string
  city: string
  province: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  paymentMethod: string
  couponCode: string | null
  trackingNumber: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  statusHistory: StatusEvent[]
}

export function normalizeEmail(email: string): string {
  return (email || "").trim().toLowerCase()
}

export function normalizePhone(phone: string): string {
  return (phone || "").replace(/\D/g, "")
}

export function generateOrderNumber(): string {
  const d = new Date()
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `DRM-${ymd}-${rnd}`
}

export type CustomerInput = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  province: string
}

/**
 * Find an existing customer matching the email or phone. Creates a new
 * customer doc if none matches. Returns the customer id.
 */
export async function findOrCreateCustomer(
  input: CustomerInput
): Promise<{ id: string; isNew: boolean }> {
  const emailNorm = normalizeEmail(input.email)
  const phoneNorm = normalizePhone(input.phone)
  const customersRef = collection(db, "customers")

  if (emailNorm) {
    const snap = await getDocs(
      fsQuery(customersRef, where("emailNormalized", "==", emailNorm))
    )
    if (!snap.empty) return { id: snap.docs[0].id, isNew: false }
  }

  if (phoneNorm) {
    const snap = await getDocs(
      fsQuery(customersRef, where("phoneNormalized", "==", phoneNorm))
    )
    if (!snap.empty) return { id: snap.docs[0].id, isNew: false }
  }

  const now = new Date().toISOString()
  const docRef = await addDoc(customersRef, {
    name: input.name,
    email: input.email,
    emailNormalized: emailNorm,
    phone: input.phone,
    phoneNormalized: phoneNorm,
    address: input.address,
    city: input.city,
    province: input.province,
    totalOrders: 0,
    totalSpent: 0,
    firstOrderAt: now,
    lastOrderAt: now,
    createdAt: now,
  })
  return { id: docRef.id, isNew: true }
}

/**
 * Increments the customer's order count + spend and refreshes contact info
 * with the most recent values from this order.
 */
export async function recordCustomerOrder(
  customerId: string,
  orderTotal: number,
  input: CustomerInput
): Promise<void> {
  await updateDoc(doc(db, "customers", customerId), {
    name: input.name,
    email: input.email,
    emailNormalized: normalizeEmail(input.email),
    phone: input.phone,
    phoneNormalized: normalizePhone(input.phone),
    address: input.address,
    city: input.city,
    province: input.province,
    totalOrders: increment(1),
    totalSpent: increment(orderTotal),
    lastOrderAt: new Date().toISOString(),
  })
}

/**
 * Looks up a customer by either an email OR a phone number. Used by the
 * public account / order tracking page.
 */
export async function findCustomerByEmailOrPhone(
  search: string
): Promise<Customer | null> {
  const trimmed = (search || "").trim()
  if (!trimmed) return null

  const customersRef = collection(db, "customers")
  const isEmail = trimmed.includes("@")

  if (isEmail) {
    const emailNorm = normalizeEmail(trimmed)
    const snap = await getDocs(
      fsQuery(customersRef, where("emailNormalized", "==", emailNorm))
    )
    if (!snap.empty)
      return { id: snap.docs[0].id, ...(snap.docs[0].data() as Omit<Customer, "id">) }
  } else {
    const phoneNorm = normalizePhone(trimmed)
    if (!phoneNorm) return null
    const snap = await getDocs(
      fsQuery(customersRef, where("phoneNormalized", "==", phoneNorm))
    )
    if (!snap.empty)
      return { id: snap.docs[0].id, ...(snap.docs[0].data() as Omit<Customer, "id">) }
  }
  return null
}

/**
 * Returns all orders for the given email OR phone number. Reads against the
 * normalized fields stored on each order document, so it works without a
 * customer record (covers older orders too).
 */
export async function findOrdersByEmailOrPhone(
  search: string
): Promise<Order[]> {
  const trimmed = (search || "").trim()
  if (!trimmed) return []

  const ordersRef = collection(db, "orders")
  const isEmail = trimmed.includes("@")
  const field = isEmail ? "emailNormalized" : "phoneNormalized"
  const value = isEmail ? normalizeEmail(trimmed) : normalizePhone(trimmed)
  if (!value) return []

  const snap = await getDocs(
    fsQuery(ordersRef, where(field, "==", value))
  )
  const list = snap.docs.map(
    (d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }) as Order
  )
  list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  return list
}

export async function findOrdersByCustomerId(customerId: string): Promise<Order[]> {
  const ordersRef = collection(db, "orders")
  const snap = await getDocs(
    fsQuery(ordersRef, where("customerId", "==", customerId), orderBy("createdAt", "desc"))
  )
  return snap.docs.map(
    (d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }) as Order
  )
}

export function statusLabel(status: OrderStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

/** Tailwind utility classes for a given status badge. */
export function statusClasses(status: OrderStatus | string): string {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
    case "shipped":
      return "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400"
    case "processing":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
    case "cancelled":
      return "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"
    case "pending":
    default:
      return "bg-stone-200 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300"
  }
}
