# Online Gift Shop

A functional e-commerce application built with **Vanilla JavaScript**. This project interacts with a real API to manage a complete shopping flow, from product discovery to order confirmation.

## Features

* **Dynamic Loading:** Fetches real-time product data from the [FakeStoreAPI](https://fakestoreapi.com/).
* **Live Search Engine:** Integrated filtering system to find products by title as you type.
* **Cart Management:**
    * Add and remove items dynamically.
    * Real-time total price calculation.
    * Bulk clear functionality.
* **Visual Feedback:** Product cards change state (`card__selected`) when an item is already in the cart.
* **Checkout Process:**
    * Detailed order summary view.
    * Purchase confirmation simulation with automatic redirection.
* **Modern UI:** Clean and responsive interface styled with SCSS, featuring gradients and smooth transitions.

## Tech Stack

* **HTML5:** Semantic structure.
* **CSS3 / SCSS:** Advanced styling, Flexbox, and CSS Grid.
* **JavaScript (ES6+):**
    * Asynchronous programming (`fetch`, `async/await`).
    * DOM Manipulation and Event Listeners.
    * Advanced Array Methods (`filter`, `forEach`, `find`, `splice`).
* **Time Management:** Use of `setTimeout` for UI flow control.

## Project Structure

```text
├── index.html          # Main HTML structure
├── js/
│   └── main.js         # Application logic and state management
├── scss/
│   └── main.scss       # Design system and styling
└── images/             # Static assets

```

## Setup and Installation

1. Clone the repository:
```
   git clone https://github.com/mcocapelaz/online-gift-shop.git
```

2. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

Open index.html in your browser or use the Live Server extension in VS Code.

## Key Learnings
- This project focuses on core JavaScript concepts:

- State Persistence: Using array.length = 0 to efficiently empty the cart while maintaining memory references.

- SPA Logic: Simulating page navigation by toggling the hidden attribute.

- UI/UX Best Practices: Providing immediate visual feedback when an item is added and using timers to guide the user back to the shop after a purchase.

## Author 

Mónica Coca (mcocapelaz) 
