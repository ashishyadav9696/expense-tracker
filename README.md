# 📊 SpendaWise | Advanced Expense Tracker

SpendaWise is a high-end, responsive React Single Page Application (SPA) designed to track, manage, and visualize your personal expenses. Featuring a futuristic **dark-themed glassmorphism** design, real-time sync with **MockAPI.io** using **Axios**, and interactive budget analytics plotted via **Recharts**, SpendaWise makes budgeting both powerful and visually stunning.

---

## ✨ Features

- **💸 Complete CRUD Expense Actions**: Create, view, edit, and delete any expense record.
- **🏷️ Category Filtering**: Instantly filter your transactions using custom-colored category tags:
  - `Food`, `Transport`, `Entertainment`, `Health`, `Shopping`, `Others`
- **📊 Real-time Budget Analytics**:
  - **Pie Chart**: Visualizes spending distribution by category.
  - **Bar Chart**: Tracks monthly expenditure trends chronologically.
  - **Stats Card Deck**: Computes Total Expenditure, Average Transaction, Top Spend Category, and Single Largest Purchase instantly.
- **🔄 Dynamic Sync Manager**: Toggle between **Demo Mode** (simulated LocalStorage DB with latency delays) or **Live MockAPI.io** directly in the UI!
- **⚡ Resilient Auto-Recovery**: If your custom MockAPI URL goes offline or fails, the app presents a custom error handler screen with a one-click button to securely fall back to Offline Demo Mode.
- **📱 Fluid Responsiveness**: Designed using mobile-first CSS Grid and Flex layouts with backdrop blur visual elements.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Hooks & Functional Components)
- **Scaffolding**: Vite (Fast HMR)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios (REST API Client)
- **Charts**: Recharts (Responsive SVG Visualization)
- **Icons**: Lucide React (Premium Vector Graphics)
- **Styling**: Vanilla CSS (Premium Custom Design Tokens & Glow Animations)

---

## 📂 Folder Structure

```text
task2/
├── public/                 # Static Assets
├── src/
│   ├── assets/             # Brand logos / SVGs
│   ├── components/         # Reusable Component Deck
│   │   ├── BarChart.jsx          # Recharts Monthly Bar Chart
│   │   ├── CategoryFilter.jsx    # Dropdown Filter Component
│   │   ├── ExpenseForm.jsx       # Reusable Add/Edit Form Component
│   │   ├── ExpenseItem.jsx       # Custom Expense Row Card
│   │   ├── ExpenseList.jsx       # Main list container & Local Aggregator
│   │   ├── LoadingSpinner.jsx    # Glowing Loader Status component
│   │   └── Navbar.jsx            # Routing navigation bar & Synchronizer Modal
│   ├── pages/              # Page Controllers
│   │   └── Dashboard.jsx         # Analytics Statistics Deck & Charts
│   ├── api.js              # Axios Client & Local Storage Fallback Core
│   ├── App.jsx             # React Router Setup & Synchronized State Handler
│   ├── index.css           # Plus Jakarta Sans import & UI Design Tokens
│   └── main.jsx            # React root renderer
├── index.html              # SEO Meta elements
├── package.json            # Scripts & Dependency list
└── README.md               # Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js** (v16+) and **npm** installed. Check your versions with:
```bash
node -v
npm -v
```

### 2. Installation

1. Navigate to the project directory and install the packages:
   ```bash
   npm install
   ```

2. Run the development server locally:
   ```bash
   npm run dev
   ```

3. Open the local address shown in your terminal (typically `http://localhost:5173`) in your web browser.

---

## 🌐 Connecting to MockAPI.io

To connect SpendaWise to your own database cloud:

1. Sign up/log in at [MockAPI.io](https://mockapi.io).
2. Create a new **Project** (e.g., "Personal Finance").
3. Add a new **Resource** named exactly **`expenses`**.
4. Define the following schema fields inside MockAPI for the resource:
   - `title`: string
   - `amount`: number
   - `category`: string
   - `date`: string (format: `YYYY-MM-DD`)
5. Copy your project's **API Endpoint URL** (looks like `https://664b4c4835bb1e47b62cdec2.mockapi.io/api/v1`).
6. Launch SpendaWise, click the **Demo Mode / Settings Badge** at the top right of the Navbar, switch to **MockAPI (Live)**, paste your copied URL, and click **Save Changes**.
7. *Voila!* The application will immediately perform Axios HTTP calls (GET, POST, PUT, DELETE) to sync directly with your live MockAPI database.

---

## 💎 Design System Customizations (`src/index.css`)

SpendaWise is styled using advanced Vanilla CSS custom tokens:

- **Primary Violet Accent**: `#8b5cf6` with glowing `box-shadow` animations.
- **Glassmorphic Cards**: `rgba(18, 21, 32, 0.7)` card bodies with translucent borders (`rgba(255, 255, 255, 0.06)`) and `backdrop-filter: blur(12px)`.
- **Responsive Charts**: SVG custom-gradients (`url(#barGlowGradient)`) rendering charts with elegant color schemes.
