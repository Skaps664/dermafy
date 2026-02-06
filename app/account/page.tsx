"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { User, Mail, Phone, Package, LogOut, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { auth, db } from "@/lib/firebase"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { collection, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore"

interface UserData {
  name: string
  email: string
  phone: string
}

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: string
  total: number
  items: {
    name: string
    quantity: number
    price: number
  }[]
}

export default function AccountPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<UserData | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/auth/signin")
        return
      }

      try {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUser({
            name: userData.name || firebaseUser.displayName || "User",
            email: userData.email || firebaseUser.email || "",
            phone: userData.phone || ""
          })
        } else {
          // Fallback to Firebase auth data
          setUser({
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email || "",
            phone: ""
          })
        }

        // Fetch user's orders
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", firebaseUser.uid),
          orderBy("createdAt", "desc")
        )
        const ordersSnapshot = await getDocs(ordersQuery)
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[]
        setOrders(ordersData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading || !user) {
    return null // Loading state while checking auth
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
              My Account
            </h1>
            <p className="text-muted-foreground">
              Manage your profile and view your orders
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-card p-8 rounded-3xl boty-shadow">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <h2 className="font-serif text-2xl text-foreground text-center mb-6">
                  {user.name}
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-destructive/10 text-destructive py-3 rounded-full font-medium hover:bg-destructive/20 transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Orders */}
            <div className="lg:col-span-2">
              <div className="bg-card p-8 rounded-3xl boty-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-primary" />
                  <h2 className="font-serif text-2xl text-foreground">Order History</h2>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-6">No orders yet</p>
                    <Link
                      href="/shop"
                      className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-2xl p-6 hover:border-primary/50 transition"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-1">
                              Order {order.orderNumber}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="text-foreground">Rs. {item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="font-medium text-foreground">Total</span>
                          <span className="font-semibold text-foreground text-lg">
                            Rs. {order.total.toLocaleString()}
                          </span>
                        </div>

                        <button className="w-full mt-4 bg-background border border-border py-2.5 rounded-xl font-medium hover:bg-muted transition flex items-center justify-center gap-2 text-sm">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
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
