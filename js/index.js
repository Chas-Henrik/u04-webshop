import { getProducts } from "./api.js";

const productsUl = document.getElementById('product-list');
const sortSelect = document.getElementById('product-sort');
const filterSelect = document.getElementById('product-filter');
const cartElement = document.getElementById("cart");
const showCartBtn = document.getElementById("show-cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart-btn");
const totalPriceLabel = document.getElementById("cart-total-price");

let products = [];
let cart = [];

sortSelect.addEventListener('change', renderProducts);
filterSelect.addEventListener('change', renderProducts);
showCartBtn.addEventListener('click', showCart);
closeCartBtn.addEventListener('click', closeCart);

function showCart() {
    cartModal.showModal();
}

function closeCart() {
    cartModal.close();
}


async function renderProducts() {
    products = await getProducts();
    // console.log(products);

    const html = products.filter((product) => {
            if (filterSelect.value === 'all') {
                return true;
            }
            return product.category === filterSelect.value;
        })
        .sort((a, b) => (sortSelect.value==='Low')?
        a.price - b.price :
        b.price - a.price)
        .map(product => `
        <article class="product">
            <img class="product-img" src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <input type="number" value="1" min="1">
            <button data-id="${product.id}" class="add-btn">Add to Cart</button>
        </article>
    `).join("");

    // console.log(html);
    productsUl.innerHTML = html;
    const addBtns = document.querySelectorAll(".add-btn")

    addBtns.forEach(btn => btn.addEventListener("click", addToCart))
}

function findCartItemById(id) {
    return cart.find(cartItem => cartItem.id == id);
}

function addToCart(e) {
    const btnElement = e.target;
    const parentElement = e.target.parentElement;
    let qtyInput = parentElement.querySelector("input");

    const product = products.find(p => btnElement.dataset.id == p.id);

    const existingCartItem = findCartItemById(product.id);

    if (existingCartItem) {
        existingCartItem.qty += parseInt(qtyInput.value);
    } else {
        const productItem = { 
            id: product.id,
            title: product.title,
            price: product.price,
            qty: parseInt(qtyInput.value)
        };
        cart.push(productItem);
    }

    qtyInput.value = 1;
    renderCart();
    // console.log(e.target.dataset.id);
}

function renderCart() {
    const cartHTML = cart.map(product => `
        <div data-id="${product.id}" class="cart-item">
            <div class="cart-item-title">${product.title}</div>
            <div class="cart-item-price">$${product.price}</div>
            <input class="cart-item-qty" type="number" value="${product.qty}">
            <div class="cart-item">$${(product.price * product.qty).toFixed(2)}</div>
            <button class="remove-from-cart-btn">X</button>
        </div>
    `).join("");

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    // console.log(totalPrice);

    totalPriceLabel.textContent = totalPrice;
    cartElement.innerHTML = cartHTML;

    cartElement.addEventListener("change", (e) => {
        if(e.target.classList.contains("cart-item-qty")) {
            const id = e.target.parentElement.dataset.id;
            const cartItem = findCartItemById(id);

            cartItem.qty = e.target.value;
            renderCart();
        }
    });

    const RemoveBtns = cartElement.querySelectorAll(".remove-from-cart-btn");

    RemoveBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.parentElement.dataset.id;
            const index = cart.findIndex(item => item.id == id);
            console.log(index);
            cart.splice(index, 1);
            renderCart();
        });
    });


}

renderProducts();