# Thapar Marketplace

## 🛍️ Overview

**Thapar Marketplace** is a dedicated campus-centric platform inspired by **Facebook Marketplace** and **HungerBox**, built to facilitate smooth, secure, and structured trading among students. It introduces two distinct modes:

- **DayMarket** — A campus-wide marketplace.
- **NightMarket** — A hostel-specific, curfew-friendly marketplace.

By offering these distinct environments, we aim to eliminate clutter from informal chat groups and create a reliable space for students to buy, sell, and barter items.

---

## 💡 Challenges Faced by Students

- Trading is scattered across unorganized WhatsApp groups.
- No platform supports **barter trading** effectively.
- Frequent trust issues due to scams and unreliable buyers/sellers.
- Inability to discover items within the same hostel (especially at night).
- Urgent night-time needs (chargers, snacks, notes, medicines) often go unmet.
- Lack of **safe, designated meetup spots** for transactions during the day.

---

## ✅ Our Solution: One Platform, Two Markets

### 🌞 DayMarket (8 AM - 8 PM)

- **UI Theme**: Light
- **Access**: Campus-wide
- **Transactions**: Students meet at designated safe spots (library, canteen, hostel common areas).
- **Ideal For**: Books, electronics, bicycles, appliances, accessories, furniture.

### 🌙 NightMarket (8:30 PM - 6 AM)

- **UI Theme**: Dark (auto-switches at 8:30 PM)
- **Access**: Hostel-specific only
- **Unique Features**:
  - **Self-pickup & Volunteer Delivery System** — Students earn reputation and get a small delivery fee.
  - **Barter System** — Add multiple items per trade, with or without cash.
- **Ideal For**: Urgent items like chargers, snacks, medicine, stationery, notes.

---

## 🔐 Key Features

### 🧑‍💻 User Authentication & Access Control

- **College Email Verification** (during sign-up)
- **Hostel Verification** by scanning mess card
- **Time-Based Access**:
  - **DayMarket**: Open to entire campus
  - **NightMarket**: Accessible only to hostellers
- **Hostel Switching**: Scan new mess card to update hostel

### 📦 Listings & Search

- Sellers can:
  - Upload items with **tags, categories, price, and images**
- Buyers can:
  - **Filter** by tag, category, price range, and seller reputation

### 🔁 Bartering & Messaging

- **Dedicated Bartering UI**:
  - Trade multiple items with or without cash
- **In-App Messaging**:
  - Pseudonymous chat system for safe communication

---

## 🧑‍🔧 Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/creative-computing-society/Thapar-Marketplace.git
   cd thapar-marketplace
2. **🐳 Docker Instructions**

   To containerize and run the project using   Docker:

  - **Build the Docker image**
    ```bash
     docker build -t thapar-marketplace .
  - **Run the container**
      ```bash
      docker run -p 3000:3000 --env-file .env thapar-marketplace
3. **Set up environment variables**

  - Copy .env.example and rename it to .env
  - Fill in your secrets and credentials

4. Run DB migrations (Prisma)
    ```bash
    npx prisma migrate dev
5. **Start the dev server**
    ```bash
    npm run dev
      # or
    yarn dev
---

## 🔁 Auth Callback URLs

### Development:
    http://localhost:3000/api/auth/callback/google

---
## 🔀 *Flow Diagram*
mermaid 
graph TD;

    A[User Sign In] --> B[View Hostel List] 
    B --> C[Select a Hostel]
    C --> D[View Listed Items]
    D --> E[Buy/Sell/Exchange Options]
    
    E -->|Buy| F[Send Request to Seller]
    F --> G[Seller Approves?]
    G -- No --> D
    G -- Yes --> H[Reveal Seller Contact]
    H --> I[Users Communicate & Complete Transaction]

    E -->|Sell| J[Create New Listing]
    J --> D
    
    E -->|Exchange| M[Propose Item Swap]
    M --> N[Other User Approves?]
    N -- No --> D
    N -- Yes --> H
---
## 🌟 Vision

A safer, smarter, and structured way to trade on campus — where trust, convenience, and community matter.


