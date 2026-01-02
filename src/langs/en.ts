import type { TranslationKeys } from "./types";

export const en: TranslationKeys = {
  metadata: {
    title: "Arnitex",
    description: "Arnitex Cryptocurrency Trading Platform",
  },
  common: {
    home: "Home",
    about: "About",
    contact: "Contact",
    services: "Services",
    products: "Products",
    login: "Login",
    register: "Register",
    logout: "Logout",
    profile: "Profile",
    settings: "Settings",
    search: "Search",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    back: "Back",
    next: "Next",
    previous: "Previous",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
  },
  pages: {
    home: {
      title: "Home",
      welcome: "Welcome to Arnitex",
      description: "Professional Cryptocurrency Trading Platform",
      heroTitle: "Arnitex Digital Currency Exchange",
      heroSubtitle: "A New Experience in Cryptocurrency",
      startButton: "Start",
      feature1: "Enter your mobile number or email.",
      feature2: "Start investing in cryptocurrency markets now.",
      priceChart: {
        title: "Real-Time Price Chart",
        viewAll: "View All Cryptocurrencies",
        currencyTether: "Tether",
        currencyToman: "Toman",
        columns: {
          name: "Digital Currency Name",
          lastPrice: "Last Price (Tether)",
          change24h: "Change",
          volume24h: "Volume",
          weeklyChart: "Weekly Chart",
        },
        buySell: "Buy and Sell",
      },
      features: {
        spotTrading: {
          title: "Spot Trading",
          description: "Placing orders with fixed price, stop loss, and....",
        },
        marginTrading: {
          title: "Margin Trading",
          description: "Opening long and short positions",
        },
        calculator: {
          title: "Digital Currency Calculator",
          description: "Instant conversion of digital currency prices",
        },
        instantTrade: {
          title: "Instant Buy and Sell",
          description: "Buying and selling at the best market price instantly",
        },
      },
    },
    about: {
      title: "About Us",
      description: "Information about Arnitex company",
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch with us",
    },
    offline: {
      title: "You are offline!",
      message: "Please check your internet connection",
      backToHome: "Back to Home",
    },
  },
  notifications: {
    success: "Operation completed successfully",
    error: "An error occurred",
    warning: "Please note",
    info: "Information",
  },
} as const;

