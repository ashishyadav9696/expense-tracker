# 📊 internSpark | Sleek Expense Tracker

internSpark is a premium, high-end, responsive React Single Page Application (SPA) designed to track, manage, and visualize personal expenses. Featuring a futuristic **dark-themed glassmorphism** design, real-time Redux state management, and an interactive budget analytics dashboard, internSpark makes personal finance management both powerful and visually stunning.

---

## ✨ Features

- **🔐 Per-User Data Isolation**: Automatically isolates expense records using user-specific local storage keys (`internspark_expenses_<username>`). Multiple users can log in on the same browser/device without data crossover.
- **💸 Complete CRUD Expense Actions**: Seamlessly create, read, update, and delete expense items.
- **🔍 Real-time Search & Filter**: Easily filter transactions by category (`Food`, `Transport`, `Entertainment`, `Health`, `Shopping`, `Others`) or search by description in real-time.
- **📊 Interactive Dashboard & Analytics**:
  - **Quick Stats Deck**: Instant overview of Total Spent, Total Entries, Average per Expense, and unique Categories Used.
  - **Category Spending Distribution**: Visually appealing styled progress indicators showing breakdown percentages.
  - **Monthly Expenditure Trends**: Chronological bar chart visualization of monthly spending trends over time.
  - **Recent Log Tracker**: A quick look at the 5 most recent transactions.
- **🎨 Glassmorphic Dark UI**: Premium user experience styled with CSS custom properties, backdrop-blurs, and vibrant accent glows.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Hooks & Functional Components)
- **Scaffolding**: Vite (Fast HMR)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)
- **Routing**: React Router DOM v7 (HashRouter configured for GitHub Pages compatibility)
- **Styling**: Vanilla CSS (Modern custom design tokens & micro-animations)

---

## 📂 Folder Structure

```text
task2/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Brand logos and design images
│   ├── components/         # Reusable Component Deck
│   │   ├── ExpenseModal.jsx      # Modal form for adding/editing expenses
│   │   └── Navbar.jsx            # Top navigation bar with user profile & logout
│   ├── pages/              # Page Controllers
│   │   ├── Dashboard.jsx         # Spending analytics, category breakdown & monthly trends
│   │   ├── Expenses.jsx          # Interactive expense logs list, actions & stats
│   │   └── Login.jsx             # Sleek, secure-looking dark-themed login portal
│   ├── store/              # Redux State Management
│   │   ├── expenseSlice.js       # Expense tracking slice, thunks, and user persistence
│   │   └── index.js              # Redux store configuration
│   ├── App.jsx             # Router configuration, layout & authentication sync
│   ├── index.css           # Global typography, color variables, and design styles
│   └── main.jsx            # React root renderer
├── index.html              # Shell HTML template & metadata
├── package.json            # Scripts & dependencies
└── README.md               # Project documentation
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

## 📦 Build & Deployment

### Build for Production
To generate a compiled production bundle inside the `dist/` directory, run:
```bash
npm run build
```

### Deploy to GitHub Pages
To compile the app and automatically deploy it to the `gh-pages` branch, run:
```bash
npm run deploy
```
This runs the production build and deploys the static files directly to your configured GitHub Pages repository.
