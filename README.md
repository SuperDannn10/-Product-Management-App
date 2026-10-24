# Product Management App (React + TypeScript)

A modern, responsive React + TypeScript application designed to manage a product catalog, track inventory, dynamically add new items, and automatically calculate subtotals and overall inventory valuation.

---

## 🌟 Project Objectives & Features

### 1. Display Product List (35 Points)
- **5 Default Products** (exceeds the 3-product requirement) loaded with real high-resolution images, realistic tech gear, and complete specifications.
- **5 Core Fields Displayed**:
  1. Feature Image
  2. Product Name
  3. Price ($)
  4. Quantity (with +/- steppers)
  5. Subtotal (`Price × Quantity`)
- **Category Filtering**: Interactive filter chips (All, Audio, Computers, Accessories, Wearables, etc.) with real-time count badges.
- **Dual Layout Options**: Toggle between a **Card Grid Layout** and a structured **Table Layout**.
- **Dedicated Product Page (15 pts)**: Full-page detailed view featuring large image showcase, rating, unit price, real-time subtotal, rich description, parsed specification bullets, and trust badges (Warranty, Delivery, Returns).
- **Cart & Quantity Controls (5 pts)**:
  - Stepper buttons (`+` and `-`) to modify quantity directly in Cards, Tables, and Details page.
  - **Conditional Rendering**: Decrement button and "Add to Cart" button are disabled when quantity is 0; "Sold Out" status rendered conditionally.
  - Slide-over Shopping Cart drawer displaying selected items, individual item subtotals, and overall cart total.

### 2. Add New Product (25 Points)
- **8 Mandatory Input Fields (10 pts)**:
  1. *Feature Image URL* (with live preview & quick preset selectors)
  2. *Product Name*
  3. *Product Category*
  4. *Description*
  5. *Product Specification*
  6. *Rating* (1.0 - 5.0)
  7. *Price* ($)
  8. *Quantity*
- **Dynamic Addition (10 pts)**: Instantly prepends the newly created item to the state list, computing its initial subtotal and updating the catalog valuation.
- **Form Validation (5 pts)**: Validates that all 8 fields are filled before submission, highlighting invalid inputs with red borders and descriptive error messages.

### 3. Compute Totals (25 Points)
- **Subtotal Calculation (5 pts)**: `Subtotal = Price × Quantity` calculated dynamically for each product across all views.
- **Overall Total Computation (10 pts)**: Automatically computed using JavaScript array method `.reduce()`:
  ```typescript
  const overallTotalValue = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  ```
- **Instant Reactive Updates (10 pts)**: The overall total updates automatically whenever quantity is modified or a new product is added.

### 4. Design & Functionality (15 Points)
- **Clean & Organized Layout (3 pts)**: Built with Tailwind CSS, clean cards, responsive grid, KPI summary cards, and modern typography.
- **Indentation & Naming Conventions (2 pts)**: Strict TypeScript interfaces, clear React component modularization, and clean naming.
- **Conditional Formatting (10 pts)**:
  - **Low Stock (< 5 items)**: Highlighted with an amber warning badge (`Low Stock (X left)`), amber border, and inventory alert counter.
  - **Out of Stock (= 0 items)**: Grayscale thumbnail, rose badge (`Out of Stock`), disabled buttons.
  - **In Stock (≥ 5 items)**: Emerald success badge (`In Stock (X)`).

---

## 🛠️ Tech Stack
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure
```
src/
├── types/
│   └── product.ts            # TypeScript interfaces & types
├── data/
│   └── initialProducts.ts    # Preset default products & categories
├── components/
│   ├── Navbar.tsx            # Navigation header & cart counter
│   ├── InventorySummary.tsx  # KPI cards with computed totals (.reduce)
│   ├── ProductCatalog.tsx    # Category filter, search, sort, layout switch
│   ├── ProductCard.tsx       # Card view with quantity steppers & subtotal
│   ├── ProductTable.tsx      # Table layout with conditional formatting
│   ├── ProductDetails.tsx    # Dedicated product detail page (15 pts)
│   ├── AddProductForm.tsx    # 8-field dynamic form with validation (25 pts)
│   ├── CartDrawer.tsx        # Shopping cart slide-over with cart totals
│   ├── StockBadge.tsx        # Conditional formatting badge (< 5 low stock)
│   └── StarRating.tsx        # 1-5 star rating component
├── App.tsx                   # Main state management & view routing
├── main.tsx                  # React DOM entry point
└── index.css                 # Tailwind CSS styles
```

