# Firebase Setup Guide for Dermafy

This guide will help you set up Firebase for authentication and database functionality in your Dermafy e-commerce application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `dermafy` (or any name you prefer)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Dermafy Web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **Copy the Firebase configuration object** - you'll need these values

## Step 3: Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Click on "Email/Password" under Sign-in providers
4. Enable "Email/Password"
5. Click "Save"

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" (we'll set rules next)
4. Select your region (choose closest to Pakistan, e.g., `asia-south1`)
5. Click "Enable"

## Step 5: Set Firestore Security Rules

1. Go to **Firestore Database > Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders collection - users can create and read their own orders
    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true);
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

3. Click "Publish"

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

**Where to find these values:**
- Go to Firebase Console > Project Settings (gear icon)
- Scroll to "Your apps" section
- Find your web app
- Copy the configuration values

## Step 7: Create an Admin User

To access the admin panel at `/admin`, you need to mark a user as admin:

1. Sign up for an account at `/auth/signup`
2. Go to Firebase Console > Firestore Database
3. Find your user in the `users` collection
4. Click on your user document
5. Click "Add field"
   - Field name: `isAdmin`
   - Type: `boolean`
   - Value: `true`
6. Click "Update"

## Step 8: Test the Application

1. Restart your development server:
   ```bash
   pnpm dev
   ```

2. Test the following flows:
   - **Sign Up**: Go to `/auth/signup` and create an account
   - **Sign In**: Go to `/auth/signin` and log in
   - **Checkout**: Add items to cart and complete checkout
   - **Account**: View your orders at `/account`
   - **Admin Panel**: Access `/admin` (only if you're marked as admin)

## Firestore Collections Structure

### users
```javascript
{
  name: string,
  email: string,
  phone: string,
  createdAt: string (ISO timestamp),
  isAdmin: boolean (optional)
}
```

### orders
```javascript
{
  orderNumber: string,          // "ORD-2026-XXXX"
  userId: string,                // Firebase Auth UID
  customerName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  province: string,
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number,
      image: string
    }
  ],
  subtotal: number,
  shipping: number,
  discount: number,
  total: number,
  status: string,                // "pending", "processing", "shipped", "delivered", "cancelled"
  paymentMethod: string,         // "Cash on Delivery"
  couponCode: string | null,
  createdAt: string              // ISO timestamp
}
```

## Admin Panel Features

At `/admin`, you can:
- ✅ View all orders
- ✅ See customer information (name, email, phone)
- ✅ View order details (products, quantities, prices)
- ✅ Update order status (pending → processing → shipped → delivered)
- ✅ View order statistics

## Troubleshooting

### Error: "Firebase config not found"
- Make sure `.env.local` exists with all required values
- Restart your dev server after adding environment variables

### Error: "Permission denied"
- Check Firestore security rules are set correctly
- Make sure you're logged in when creating orders

### Can't access admin panel
- Ensure your user has `isAdmin: true` in Firestore users collection
- Check you're logged in with the admin account

### Orders not showing in account page
- Verify the order was created successfully in Firestore Database
- Check that the `userId` matches your Firebase Auth UID

## Production Deployment

When deploying to production:

1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Update Firestore security rules if needed
3. Consider enabling Firebase App Check for additional security
4. Set up proper error logging and monitoring

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
