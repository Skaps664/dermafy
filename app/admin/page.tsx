"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Package, User, Mail, Phone, MapPin, Calendar, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore"
import Image from "next/image"

interface Order {
  id: string
  orderNumber: string
  userId: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: string
  paymentMethod: string
  couponCode: string | null
  createdAt: string
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/signin")
        return
      }

      // In a real app, you would check if the user is an admin
      // For now, we'll allow any logged-in user to access the admin panel
      
      try {
        // Fetch all orders
        const ordersQuery = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc")
        )
        const ordersSnapshot = await getDocs(ordersQuery)
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[]
        setOrders(ordersData)
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast({
          title: "Error",
          description: "Failed to load orders. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router, toast])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus
      })
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }
      
      toast({
        title: "Status updated",
        description: `Order status changed to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-48 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage all customer orders
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-3xl font-semibold">{orders.length}</p>
            </div>
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-semibold text-yellow-600">
                {orders.filter(o => o.status === "pending").length}
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-sm text-muted-foreground mb-1">Processing</p>
              <p className="text-3xl font-semibold text-blue-600">
                {orders.filter(o => o.status === "processing").length}
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl boty-shadow">
              <p className="text-sm text-muted-foreground mb-1">Delivered</p>
              <p className="text-3xl font-semibold text-green-600">
                {orders.filter(o => o.status === "delivered").length}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-card rounded-3xl boty-shadow overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-serif text-2xl flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                All Orders
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Order #</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Products</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="hover:bg-muted/30 transition cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-6 py-4 text-sm font-medium">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">{order.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {order.email}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          Rs. {order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              e.stopPropagation()
                              updateOrderStatus(order.id, e.target.value)
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize cursor-pointer border-0 ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
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
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="bg-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto boty-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-3xl mb-2">Order Details</h2>
                  <p className="text-muted-foreground">Order {selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Customer Info */}
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Customer Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedOrder.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{selectedOrder.address}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.city}, {selectedOrder.province}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rs. {item.price * item.quantity}</p>
                        <p className="text-sm text-muted-foreground">Rs. {item.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <h3 className="font-medium text-lg mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rs. {selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{selectedOrder.shipping === 0 ? "Free" : `Rs. ${selectedOrder.shipping}`}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-Rs. {selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span>Rs. {selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div className="border-t border-border pt-6">
                <label className="block text-sm font-medium mb-2">Update Order Status</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
