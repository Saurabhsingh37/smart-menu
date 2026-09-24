# 🌶️ HOT & SPICE — Smart Restaurant Menu

A modern, interactive **digital menu web app** for **HOT & SPICE**, a fully vegetarian restaurant in **Haridwar**.

The goal is simple:

> **Let customers explore the menu, select their food, collect it in a personal bucket, and show the final order to the waiter.**

This is **not an e-commerce platform** and does not handle online payments, delivery, or automatic waiter/kitchen order management.

---

## ✨ Concept

HOT & SPICE replaces the traditional printed menu with a modern digital experience.

```text
Customer opens the menu
        ↓
Explore food
        ↓
Search / Filter
        ↓
Select items
        ↓
🛍️ Add to My Bucket
        ↓
Review final order
        ↓
Show order to waiter
        ↓
Waiter writes order in the restaurant's physical order book
```

Simple, fast, and restaurant-friendly.

---

## 🚀 Main Features

### 🍽️ Smart Digital Menu

Customers can browse the complete restaurant menu through a clean and interactive interface.

Menu categories can include:

* 🌶️ Starters
* 🍛 Main Course
* 🫓 Indian Breads
* 🍚 Rice & Biryani
* 🥡 Chinese
* 🥤 Beverages
* 🍨 Desserts

---

### 🔍 Smart Search

Customers can quickly find dishes by name.

Example:

```text
Search: Paneer

→ Paneer Tikka
→ Shahi Paneer
→ Kadai Paneer
→ Paneer Butter Masala
```

---

### 🏷️ Smart Food Labels

Food items can display useful labels such as:

* 🟢 VEG
* ⭐ POPULAR
* 🔥 SPICY
* 🌟 TODAY'S SPECIAL
* 🆕 NEW
* 👨‍🍳 CHEF'S CHOICE

These labels help customers make decisions quickly.

---

### 🌟 Daily Special

A dedicated section highlights dishes selected for the day.

Example:

```text
🌟 TODAY'S SPECIAL

Paneer Tikka
Dal Makhani
Masala Dosa
```

Restaurant staff can manually update these featured dishes.

---

### 🔥 Popular Today

A manually managed section for dishes the restaurant wants to highlight.

```text
🔥 POPULAR TODAY

Kadai Paneer
Veg Manchurian
Butter Naan
```

---

### 👨‍🍳 Chef's Choice

Highlight selected dishes recommended by the restaurant.

---

### 🆕 New on Menu

A dedicated area for recently introduced dishes.

```text
🆕 NEW ON MENU

Cheese Chilli Paneer
```

---

### 🧠 Smart Food Discovery

Customers can browse food based on simple preferences:

```text
🌶️ Something Spicy
🧀 Something Cheesy
🍚 Something Filling
🥤 Something Refreshing
🍨 Something Sweet
```

Selecting an option filters the menu accordingly.

---

## 🛍️ My Bucket

Instead of a traditional e-commerce cart, the app uses a restaurant-friendly **My Bucket** system.

Customers can collect their selected dishes before finalizing their order.

Example:

```text
🛍️ MY BUCKET

Paneer Tikka       × 2
Butter Naan        × 3
Cold Coffee        × 1

──────────────────────
Estimated Total ₹620
```

Customers can:

* Add items
* Increase/decrease quantity
* Remove items
* Continue browsing
* Review the complete order
* Finalize the order

---

## ✅ Final Order

After selecting their food, customers can finalize the bucket.

The app displays:

```text
YOUR ORDER IS READY

Paneer Tikka × 2
Butter Naan × 3
Cold Coffee × 1

Estimated Total: ₹620

Please show this screen to your waiter.
```

The waiter then writes the order into the restaurant's physical order book.

### No online ordering required.

The app does **not** automatically send the order to the kitchen.

---

# 🎨 Design Direction

The website should feel like a modern premium vegetarian restaurant rather than an e-commerce store.

### Visual Style

* 🌶️ Warm restaurant-inspired aesthetic
* ✨ Modern UI
* 🖼️ High-quality food imagery
* 🎞️ Smooth animations
* 🪄 Micro-interactions
* 📱 Mobile-first experience
* 💻 Responsive desktop experience
* 🌑 Optional dark/premium sections
* 🧊 Glassmorphism used carefully
* 🎯 Clear typography and hierarchy

The interface should remain easy to use even for customers who are not highly technical.

---

# 📱 Customer Experience

The experience should be extremely simple:

```text
OPEN
  ↓
EXPLORE
  ↓
SEARCH / FILTER
  ↓
SELECT
  ↓
ADD TO BUCKET
  ↓
REVIEW
  ↓
FINALIZE
  ↓
SHOW WAITER
```

The customer should never feel like they are using a complicated application.

---

# 🧑‍🍳 Menu Management

The menu should be designed so that restaurant information can be updated easily.

Each food item can contain:

```text
{
  name,
  description,
  price,
  image,
  category,
  spiceLevel,
  tags,
  available,
  isPopular,
  isSpecial,
  isChefChoice,
  isNew
}
```

This allows the restaurant to manually control:

* Today's Special
* Popular items
* Chef's Choice
* New items
* Availability
* Food categories
* Prices
* Descriptions

---

# 🏗️ Suggested Tech Stack

The project can be built using:

### Frontend

* React
* Vite
* JavaScript / JSX
* Tailwind CSS
* Framer Motion or GSAP for animations

### Data

For the initial version, menu data can be stored locally.

```text
src/
├── data/
│   └── menu.js
```

A backend/database can be added later if the restaurant needs remote menu management.

---

# 📂 Suggested Project Structure

```text
hot-spice/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── FoodCard.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── SearchBar.jsx
│   │   └── BucketItem.jsx
│   │
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── DailySpecial.jsx
│   │   ├── SmartMenu.jsx
│   │   ├── PopularItems.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   └── menu.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🎯 Project Goals

The project focuses on:

* Creating a beautiful digital restaurant menu
* Making menu browsing fast and intuitive
* Helping customers discover food easily
* Allowing customers to create a temporary order bucket
* Showing a clear final order
* Keeping the actual restaurant ordering process manual
* Making daily menu updates simple
* Providing a premium modern restaurant experience

---

# 🚫 What This Project Is NOT

This project intentionally does **not** include:

* ❌ Online food delivery
* ❌ E-commerce checkout
* ❌ Online payment
* ❌ Swiggy/Zomato-style ordering
* ❌ Automatic kitchen management
* ❌ Waiter notification system
* ❌ Complex customer accounts
* ❌ Order tracking
* ❌ Delivery management

The goal is to keep the system **simple, lightweight, and practical for dine-in customers**.

---

# 🌶️ Restaurant

## HOT & SPICE

**Pure Vegetarian Restaurant**

📍 Haridwar, Uttarakhand, India

A modern digital menu experience designed to make discovering and selecting food easier for dine-in customers.

---

## 💡 Future Possibilities

The project can later be extended with optional features such as:

* QR-based table opening
* Admin menu editor
* Real-time menu availability
* Multiple restaurant branches
* Customer favorites
* Multi-language menu
* Hindi / English support
* Digital bill generation
* Analytics for popular dishes

These features are intentionally kept outside the initial scope.

---

## 📌 Status

🚧 **Currently in development**

The initial version focuses on:

```text
Smart Menu
+
Search & Categories
+
Daily Specials
+
Food Discovery
+
My Bucket
+
Final Order Preview
```

---

## ❤️ Built For

**HOT & SPICE — Haridwar**

> *Explore. Choose. Collect. Show the waiter. Enjoy your food.* 🌶️
