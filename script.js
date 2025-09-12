// Данные товаров
const products = [
    { id: 1, name: "Сумка", price: 35990, image: "images/1.jpg"},
    { id: 2, name: "Iphone 17", price: 112000, image: "images/2.jpeg"},
    { id: 3, name: "Контуринг", price: 6990, image: "images/3.jpg"},
    { id: 4, name: "Духи", price: 18000, image: "images/4.jpg"},
];

const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderForm = document.getElementById('orderForm');
const closeForm = document.getElementById('closeForm');
const orderFormElement = document.getElementById('orderFormElement');
const orderSuccess = document.getElementById('orderSuccess');

// Отображение товаров
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price} руб.</div>
                <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    // Добавление обработчиков событий для кнопок добавления в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToLocalStorage();
}

// Обновление отображения корзины
function updateCart() {
    // Обновление счетчика товаров
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Обновление списка товаров в корзине
    cartItems.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <div>${item.name}</div>
                <div>${item.price} руб. x ${item.quantity}</div>
            </div>
            <div class="item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">Удалить</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Обновление общей суммы
    cartTotal.textContent = `Итого: ${totalPrice} руб.`;
    
    // Добавление обработчиков событий для кнопок в корзине
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            changeQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Изменение количества товара
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        
        updateCart();
        saveCartToLocalStorage();
    }
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
}

// Сохранение корзины в localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Обработчики событий
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    orderForm.style.display = 'flex';
});

closeForm.addEventListener('click', () => {
    orderForm.style.display = 'none';
});

orderFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // В реальном приложении здесь была бы отправка данных на сервер
    orderForm.style.display = 'none';
    orderSuccess.style.display = 'block';
    
    // Очистка корзины после оформления заказа
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    
    // Скрытие сообщения об успехе через 3 секунды
    setTimeout(() => {
        orderSuccess.style.display = 'none';
    }, 3000);
});

// Закрытие модальных окон при клике вне их области
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === orderForm) {
        orderForm.style.display = 'none';
    }
});
        
renderProducts();
updateCart()