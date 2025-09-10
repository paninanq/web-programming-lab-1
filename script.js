// Данные товаров
const products = [
    { id: 1, name: "Сумка", price: 35990, image: "images/1.jpg"},
    { id: 2, name: "Iphone 17", price: 112000, image: "images/2.jpeg"},
    { id: 3, name: "Контуринг", price: 6990, image: "images/3.jpg"},
    { id: 4, name: "Духи", price: 18000, image: "images/4.jpg"},
];

const productsGrid = document.getElementById('productsGrid');

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
}
renderProducts();