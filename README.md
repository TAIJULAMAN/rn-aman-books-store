# Aman Books - React Native Bookstore App

A modern, feature-rich bookstore mobile application built with React Native and Expo.

## 📱 Features

### Authentication Module
- **Splash Screen** - Animated logo with auto-transition
- **Onboarding** - 3-slide introduction to app features
- **Sign In/Sign Up** - Email/password authentication with social login buttons
- **Password Recovery** - Forgot password, OTP verification, and password reset flow

### Main Features
- **Home Screen** - Browse books with search and category filtering
- **Book Details** - View detailed book information with ratings and synopsis
- **Shopping Cart** - Add/remove books, adjust quantities, view total
- **Checkout** - Enter shipping address and select delivery method
- **Payment** - Secure payment form (UI only)
- **Order Success** - Confirmation screen with order details
- **Profile** - User settings, change password, and logout

## 🎨 Design

- **Color Scheme**: Teal primary color (#14B8A6)
- **Style**: Modern, minimalist with clean whitespace
- **UI Components**: Custom reusable components (Button, Input, Card, etc.)

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Context API
- **Data**: Mock data service with simulated network delays

## 📂 Complete Folder Structure

```
rn-book-store/
├── App.tsx                          # Main app entry point
├── app.json                         # Expo configuration
├── babel.config.js                  # Babel configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
│
├── assets/                          # Static assets (images, fonts)
│   ├── images/
│   └── fonts/
│
└── src/                             # Source code
    │
    ├── components/                  # Reusable UI components
    │   ├── common/
    │   │   ├── Button.tsx          # Custom button component
    │   │   ├── Input.tsx           # Custom input component
    │   │   ├── Card.tsx            # Card container component
    │   │   └── LoadingSpinner.tsx  # Loading indicator
    │   ├── books/
    │   │   ├── BookCard.tsx        # Book display card
    │   │   └── CategoryChip.tsx    # Category filter chip
    │   └── cart/
    │       └── CartItem.tsx        # Cart item with quantity controls
    │
    ├── screens/                     # App screens
    │   ├── auth/                    # Authentication screens
    │   │   ├── SplashScreen.tsx    # Animated splash screen
    │   │   ├── OnboardingScreen.tsx # 3-slide onboarding
    │   │   ├── SignInScreen.tsx    # Login screen
    │   │   ├── SignUpScreen.tsx    # Registration screen
    │   │   ├── ForgotPasswordScreen.tsx
    │   │   ├── VerificationScreen.tsx   # OTP verification
    │   │   └── ResetPasswordScreen.tsx
    │   ├── main/                    # Main app screens
    │   │   ├── HomeScreen.tsx      # Book browsing with search
    │   │   ├── CartScreen.tsx      # Shopping cart
    │   │   └── ProfileScreen.tsx   # User profile
    │   └── secondary/               # Secondary screens
    │       ├── BookDetailsScreen.tsx
    │       ├── CheckoutScreen.tsx
    │       ├── PaymentScreen.tsx
    │       ├── OrderSuccessScreen.tsx
    │       └── ChangePasswordScreen.tsx
    │
    ├── navigation/                  # Navigation configuration
    │   ├── AppNavigator.tsx        # Root navigator
    │   ├── AuthNavigator.tsx       # Auth flow navigator
    │   └── MainNavigator.tsx       # Main app navigator (tabs + stacks)
    │
    ├── context/                     # State management
    │   ├── AuthContext.tsx         # Authentication state
    │   └── CartContext.tsx         # Shopping cart state
    │
    ├── services/                    # Data services
    │   └── MockDataService.ts      # Mock API with 10 books
    │
    ├── models/                      # TypeScript interfaces
    │   ├── User.ts                 # User model
    │   ├── Book.ts                 # Book model
    │   └── CartItem.ts             # Cart item model
    │
    ├── constants/                   # App constants
    │   ├── Colors.ts               # Color palette (teal theme)
    │   └── Styles.ts               # Common styles
    │
    └── utils/                       # Utility functions
        └── helpers.ts
```

### 📊 File Count Summary

- **Total Files**: 40+
- **Components**: 7 reusable components
- **Screens**: 16 screens (8 auth + 3 main + 5 secondary)
- **Navigation**: 3 navigators
- **Context Providers**: 2
- **Models**: 3
- **Configuration**: 5





## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- Scan the QR code with Expo Go app (Android/iOS)
- Press `i` for iOS simulator
- Press `a` for Android emulator

## 📚 Mock Data

The app includes 10 sample books across 5 categories:
- Fiction
- Tech
- Sci-Fi
- Romance
- Mystery

All authentication and data operations use mock services with 1-second delays to simulate real network requests.

## 🔐 Test Credentials

Use any email and password to test the authentication flow. The mock service accepts any valid input.

## 📄 License

This project is for practice purposes.

---

Built with ❤️ using React Native and Expo
