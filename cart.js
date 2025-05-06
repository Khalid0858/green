const cart = [];
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    const receiptSection = document.getElementById('receipt');
    const receiptContent = document.getElementById('receipt-content');

    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));

    // Add to cart functionality
    document.querySelectorAll('.btn-buy').forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const card = e.target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = parseFloat(card.querySelector('.price').textContent);

        cart.push({ title, price });
        updateCart();
      });
    });

    function updateCart() {
      cartList.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${item.title}`;
        const span = document.createElement('span');
        span.className = 'badge bg-success rounded-pill';
        span.textContent = `${item.price} ৳`;
        li.appendChild(span);
        cartList.appendChild(li);
      });

      totalDisplay.textContent = total.toFixed(2);
    }

    document.getElementById('payBtn').addEventListener('click', () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Show receipt
      receiptSection.classList.remove('d-none');
      receiptContent.innerHTML = '<ul class="list-group mb-2">' +
        cart.map(item => `<li class="list-group-item d-flex justify-content-between">${item.title}<span>${item.price} ৳</span></li>`).join('') +
        '</ul>' +
        `<p><strong>Total Paid:</strong> ${totalDisplay.textContent} ৳</p>` +
        '<p><em>Payment successful. Thank you for shopping with us!</em></p>';

      cart.length = 0;
      updateCart();
    });
//remove the product from cart
    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCart();
    }

     // Handle customer reviews
  document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const review = document.getElementById('reviewText').value.trim();
    if (name && review) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `<strong>${name}</strong>: ${review}`;
      document.getElementById('reviews').appendChild(li);
      this.reset();
    }
  });
