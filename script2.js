let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
    updateCart();

    // Use event delegation to avoid duplicate event listeners
    document.getElementById("products").addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const productElement = event.target.closest(".product");
            const productId = parseInt(productElement.getAttribute("data-id"));
            addToCart(productId);
        }
    });

    // ✅ Move this outside updateCart() to prevent multiple event bindings
    document.getElementById("cart-items").addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const productId = parseInt(event.target.getAttribute("data-id"));
            removeFromCart(productId);
        }
    });
});  // ✅ Corrected placement of closing bracket

// ✅ Functions should be OUTSIDE the event listener
function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseInt(productElement.getAttribute("data-price"));

    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    cartList.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x${item.quantity} - ₹${item.price * item.quantity}
            <button class="remove-from-cart" data-id="${item.id}">❌</button>
        `;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: ₹${total}`;
}

function removeFromCart(productId) {
    let itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderDetails = cart.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join("\n");
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let message = `Hello, I'd like to order:\n\n${orderDetails}\n\nTotal: ₹${totalAmount}`;
    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9144302009?text=${encodedMessage}`, "_blank");

    cart = [];
    localStorage.removeItem("cart");
    updateCart();
}
