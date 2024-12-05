import { getProducts } from "./api.js";

const productsUl = document.getElementById('product-list');
const sortSelect = document.getElementById('product-sort');
const filterSelect = document.getElementById('product-filter');
const cartElement = document.getElementById("cart");

let products = [];
let cart = [];

sortSelect.addEventListener('change', renderProducts);
filterSelect.addEventListener('change', renderProducts);

async function renderProducts() {
    products = await getProducts();
    console.log(products);

    products.forEach(product => {
        console.log(product);
    });

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

    console.log(html);
    productsUl.innerHTML = html;
    const addBtns = document.querySelectorAll(".add-btn")

    addBtns.forEach(btn => btn.addEventListener("click", addToCart))
}

function addToCart(e) {
    const btnElement = e.target;
    const parentElement = e.target.parentElement;
    const qtyInput = parentElement.querySelector("input");
    const product = products.find(p => btnElement.dataset.id == p.id);
    const productItem = { 
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            qty: parseInt(qtyInput.value)
                        };
    cart.push(productItem)
    renderCart();
    console.log(e.target.dataset.id);
}

function renderCart() {
    const cartHTML = cart.map(product => `
        <li data-id="${product.id}" class="cart-item">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.qty}</p>
        </li>
    `).join("");
    cartElement.innerHTML = cartHTML;
}

renderProducts();