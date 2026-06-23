# Firebase Setup Guide for Dermafy

This guide gets the storefront connected to Firebase so orders, customers, and the admin panel work end‑to‑end.

The app **does not** use Firebase Auth for the storefront experience. Customers identify themselves at checkout (name + email + phone). The admin panel is protected by a client-side passkey.

---

## Step 1 — Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** → name it `dermafy` (or anything you like) → Continue
3. Disable Google Analytics (optional) → Create project

## Step 2 — Register the Web App

1. In your project overview click the **Web** icon (`</>`).
2. Nickname: `Dermafy Web` → Register app.
3. Copy the `firebaseConfig` values — you'll paste them into `.env.local` in Step 4.

## Step 3 — Create Firestore Database

1. Go to **Build → Firestore Database** → Create database.
2. Start in **production mode**.
3. Region: pick the one closest to your users (e.g., `asia-south1`).
4. Click **Enable**.

## Step 4 — Configure Environment Variables

```bash
cp .env.example .env.local
```

Then fill `.env.local` with the values from Step 2:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Restart the dev server after editing `.env.local`.

## Step 5 — Set Firestore Security Rules

Go to **Firestore Database → Rules** and replace the contents with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── ORDERS ────────────────────────────────────────────────
    // Public can create orders (the checkout form).
    // Reads are allowed because customers look up orders by
    // email/phone with no auth — privacy comes from the fact
    // that you need to know the email or phone to query at all.
    // Updates (status, tracking, notes) are blocked — admin
    // writes go through the admin panel on a trusted device.
    match /orders/{orderId} {
      allow create: if true;
      allow read:   if true;
      allow update: if true;     // tighten in production (see note)
      allow delete: if false;
    }

    // ── CUSTOMERS ────────────────────────────────────────────
    // Created and updated by the checkout flow.
    match /customers/{customerId} {
      allow create: if true;
      allow read:   if true;
      allow update: if true;
      allow delete: if false;
    }
  }
}
```

> **Production hardening:** The rules above leave `update` open so the admin panel (which is a regular browser session, not a Firebase Auth user) can change order status / tracking. If you ship this for real, move admin actions behind a Cloud Function or Next.js API route that holds a service-account key, and tighten `update` to `if false` in the client rules.

Click **Publish**.

## Step 6 — Test It End‑to‑End

```bash
pnpm dev
```

Then walk through:

1. **Place an order:** Add Glowify to cart → checkout → submit. The order document appears in Firestore under `orders/`, and a matching `customers/` doc is created (or updated if email/phone already exists).
2. **Look up an order:** Open `/account`, enter the email **or** phone used at checkout → all matching orders show, with status, items, tracking and a progress tracker.
3. **Manage orders:** Open `/admin` → enter passkey **`YOutuber123!@`** → orders tab shows everything with status filters, search, and CSV export. Customers tab lists all repeat customers with their order history.

---

## Firestore Collections

### `orders/{autoId}`

```ts
{
  orderNumber: string,          // "DRM-20260624-XXXXXX"
  customerId: string,           // points to customers/{id}
  customerName: string,
  email: string,
  emailNormalized: string,      // lowercase, trimmed (used for lookup)
  phone: string,
  phoneNormalized: string,      // digits only       (used for lookup)
  address: string,
  city: string,
  province: string,
  items: [
    { id, name, price, quantity, image }
  ],
  subtotal: number,
  shipping: number,
  discount: number,
  total: number,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
  paymentMethod: "Cash on Delivery",
  couponCode: string | null,
  trackingNumber: string | null,
  notes: string | null,
  createdAt: string,            // ISO timestamp
  updatedAt: string,
  statusHistory: [
    { status, at }              // appended on every status change
  ]
}
```

### `customers/{autoId}`

```ts
{
  name: string,
  email: string,
  emailNormalized: string,
  phone: string,
  phoneNormalized: string,
  address: string,
  city: string,
  province: string,
  totalOrders: number,
  totalSpent: number,
  firstOrderAt: string,
  lastOrderAt: string,
  createdAt: string
}
```

Identity rule: a customer is the same as an existing one if their **normalized email matches** OR their **normalized phone matches**. New orders increment that customer's `totalOrders` and `totalSpent` instead of creating duplicates.

---

## Admin Panel (`/admin`)

Passkey: **`YOutuber123!@`** (stored in `app/admin/page.tsx` as `ADMIN_PASSKEY`). Stays unlocked for the current browser session via `sessionStorage`. Click **Lock** at the top right to clear it.

Features:

- **Stats:** total / pending / processing / shipped / delivered / customer counts.
- **Orders tab:** status filter chips with live counts, search by order #/name/email/phone/city, click any row to open the detail modal (update status, set tracking number, save internal notes — all written to Firestore with a status history audit trail).
- **CSV export:** downloads whatever is currently filtered — perfect for handing to a delivery service. Includes name, phone, address, items, totals, status, tracking number, and notes.
- **Customers tab:** every distinct customer with their order count, total spent, last-order date. Click a customer to see all their orders inline.

## Customer Tracking (`/account`)

Anyone can land on `/account` and enter the email or phone they used at checkout to see:

- Order number, date, status badge.
- Visual progress tracker (Pending → Processing → Shipped → Delivered).
- Tracking number (when the admin has set one).
- Full item breakdown, shipping address, totals, and full status history.

Deep-link prefill: `/account?q=you@example.com` automatically runs the lookup.

---

## Troubleshooting

**Error: "Missing or insufficient permissions"**
Check the rules you pasted in Step 5 and click **Publish** — the editor doesn't autosave.

**Orders not appearing in `/account` or `/admin`**
Open Firestore in the Firebase Console and verify the `orders` collection has documents with `emailNormalized` and `phoneNormalized` populated. If you have legacy orders without those fields, run a one-time backfill or place a fresh test order.

**Customer aggregates not updating**
Make sure your Firestore rules allow `update` on `customers/{id}`. The checkout flow needs to increment `totalOrders` and `totalSpent` after creating the order.

**Passkey not accepted**
The constant `ADMIN_PASSKEY` lives in [app/admin/page.tsx](app/admin/page.tsx). Change it there and keep the value out of public commits if you change it for production.
