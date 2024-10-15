# # marmeto-card-page

## Project Description

This project is a fully functional and responsive cart page built using HTML, CSS, and JavaScript. It dynamically loads cart items from a JSON API and allows users to view, update, and remove items from the cart. The cart page is designed to be mobile-friendly and is structured to provide a smooth user experience across all devices.

### Features

1. **Dynamic Cart Data**:
   - Cart items are fetched from a provided JSON API using JavaScript's `fetch()` method.
   - Each item displays relevant details such as product image, title, price, and quantity.
2. **Quantity Update**:

   - Users can adjust the quantity of items directly on the cart page, and the corresponding subtotal and total amounts will update automatically.

3. **Remove Item**:

   - Users can remove items from the cart using a trash icon. A modal confirmation dialog can be implemented for additional UX improvements.

4. **Cart Totals**:
   - The subtotal and total price are displayed and updated dynamically based on user actions like changing quantities or removing items.
5. **Responsive Design**:

   - The page is optimized for mobile, tablet, and desktop views.
   - On desktop, the layout uses a two-column format: cart items on the left and the cart totals on the right.

6. **Currency Formatting**:
   - Prices are displayed in Indian Rupees (₹) with proper formatting.
