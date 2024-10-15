function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
  }
  
  function saveToLocalStorage(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
  }
  
  // Fetch the cart data from the API
  fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const cartItems = data.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.discounted_price / 100,
        title: item.product_title,
        image: item.featured_image.url
      }));
  
      const cartItemsElement = document.querySelector('.cart-items tbody');
      const subtotalElement = document.getElementById("subtotal");
      const totalElement = document.getElementById("total");
      let cartHTML = '';
      let subtotal = 0;
  
      // Function to update totals
      function updateTotals() {
        let newSubtotal = 0;
        document.querySelectorAll('.item-subtotal').forEach(subtotalElement => {
          const itemSubtotal = parseFloat(subtotalElement.innerText.replace('Rs. ', ''));
          newSubtotal += itemSubtotal;
        });
        subtotalElement.innerText = `Rs. ${newSubtotal.toFixed(2)}`;
        totalElement.innerText = `Rs. ${newSubtotal.toFixed(2)}`;
      }
  
      // Loop through the cart items and generate HTML for each
      cartItems.forEach((item, index) => {
        let itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
  
        cartHTML += `
          <tr data-index="${index}">
            <td>
              <img src="${item.image}" alt="${item.title}" style="width: 80px; border-radius: 5px;">
              ${item.title}
            </td>
            <td>Rs. ${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" style="width: 50px;" data-index="${index}"></td>
            <td class="item-subtotal">Rs. ${itemSubtotal.toFixed(2)}</td>
            <td><span class="delete-icon" data-index="${index}">🗑️</span></td>
          </tr>
        `;
      });
  
      cartItemsElement.innerHTML = cartHTML;
  
      subtotalElement.innerText = `Rs. ${subtotal.toFixed(2)}`;
      totalElement.innerText = `Rs. ${subtotal.toFixed(2)}`;
  
      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function (e) {
          const index = e.target.getAttribute('data-index');
          const quantity = parseInt(e.target.value);
          cartItems[index].quantity = quantity;
  
          const pricePerUnit = cartItems[index].price;
          const newSubtotal = pricePerUnit * quantity;
  
          e.target.closest('tr').querySelector('.item-subtotal').innerText = `Rs. ${newSubtotal.toFixed(2)}`;
  
          updateTotals();
          saveToLocalStorage(cartItems);
        });
      });
  
      document.querySelectorAll('.delete-icon').forEach(deleteIcon => {
        deleteIcon.addEventListener('click', function (e) {
          const itemIndex = e.target.getAttribute('data-index');
          const popupOverlay = document.querySelector('.popup-overlay');
  
          popupOverlay.style.display = 'flex';
  
          document.getElementById('confirm-delete').onclick = function () {
            document.querySelector(`tr[data-index="${itemIndex}"]`).remove();
            cartItems.splice(itemIndex, 1);
            updateTotals();
            saveToLocalStorage(cartItems);
            popupOverlay.style.display = 'none';
          };
  
          document.getElementById('cancel-delete').onclick = function () {
            popupOverlay.style.display = 'none';
          };
        });
      });
  
      saveToLocalStorage(cartItems);
    })
    .catch(error => {
      console.error('Error fetching the data:', error);
    });
  
  document.addEventListener('DOMContentLoaded', updateCartCount);
  