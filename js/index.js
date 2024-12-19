import { getCartLocalStorage, saveCartLocalStorage } from "./ls.js";
import { getProducts } from "./api.js";

const productsUl = document.getElementById('product-list');
const sortSelect = document.getElementById('product-sort');
const filterSelect = document.getElementById('product-filter');
const cartElement = document.getElementById("cart");
const showCartBtn = document.getElementById("show-cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartBtnClose = document.getElementById("cart-btn-close");
const totalPriceLabel = document.getElementById("cart-total-price");
const checkoutbtn = document.getElementById("checkout-btn")


let products = [];
let cart = getCartLocalStorage();

document.addEventListener("DOMContentLoaded", renderCart);
sortSelect.addEventListener('change', renderProducts);
filterSelect.addEventListener('change', renderProducts);
filterSelect.addEventListener('change', filterChanged);
showCartBtn.addEventListener('click', showCart);
cartBtnClose.addEventListener('click', closeCart);

function showCart() {
    renderCart();
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
            <div class="product-img"><img src="${product.image}" alt="${product.title}"></div>
            <div class="product-title">${product.title}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">$${product.price}</div>
            <input class="product-qty" type="number" value="1" min="1">
            <button data-id="${product.id}" class="add-btn">Add to Cart</button>
        </article>
    `).join("");

    // console.log(html);
    productsUl.innerHTML = html;
    const addBtns = document.querySelectorAll(".add-btn")
    
    addBtns.forEach(btn => btn.addEventListener("click", addToCart))
}

function filterChanged(e) {
    const element = e.target; 
    switch(element.value){
        case 'All' : 
            gtag('filter_changed_all', 'changed', {
            'event_category': 'interactions on filter',
            'event_label': 'changing filter to all',
            'value': 1,
            'debug_mode': true
          });
          break;
            case 'electronics' : 
            gtag('filter_changed_electronics', 'changed', {
            'event_category': 'interactions on filter',
            'event_label': 'changing filter to electronics',
            'value': 1,
            'debug_mode': true
          });
          break;
          case 'jewelery' : 
            gtag('filter_changed_jewelery', 'changed', {
              'event_category': 'interactions on filter',
              'event_label': 'changing filter to jewelery',
              'value': 1,
              'debug_mode': true
            });
            break;
            case "men's clothing" : 
            gtag("filter_changed_men_clothing", 'changed', {
              'event_category': 'interactions on filter',
              'event_label': "changing filter to men's clothing",
              'value': 1,
              'debug_mode': true
            });
            break;
            case "women's clothing" : 
            gtag("filter_changed_women_clothing", 'changed', {
                'event_category': 'interactions on filter',
                'event_label': "changing filter to women's clothing",
                'value': 1,
                'debug_mode': true
              });
              break; 
    }
    
}

function findCartItemById(id) {
    return cart.find(cartItem => cartItem.id == id);
}

function addToCart(e) {
    gtag('add_to_cart', 'button_click', {
        'event_category': 'interactions on products',
        'event_label': 'adding products to cart',
        'value': 1,
        'debug_mode': true
      });
    const btnElement = e.target;
    const parentElement = e.target.parentElement;
    let qtyInput = parentElement.querySelector("input");

    const product = products.find(p => btnElement.dataset.id == p.id);

    const existingCartItem = findCartItemById(product.id);

    if (existingCartItem) {
        existingCartItem.qty = parseInt(existingCartItem.qty) + parseInt(qtyInput.value);
    } else {
        const productItem = { 
            id: product.id,
            title: product.title,
            price: product.price,
            qty: parseInt(qtyInput.value)
        };
        cart.push(productItem);
        saveCartLocalStorage(cart);
    }

    qtyInput.value = 1;
    // console.log(e.target.dataset.id);
}

function renderCart() {
    const cartHeader = `
        <div class="cart-header">
            <p class="cart-header-delete"></p>
            <p class="cart-header-title">Title</p>
            <p class="cart-header-price">Price</p>
            <p class="cart-header-qty">Qty</p>
            <p class="cart-header-total">Total</p>
        </div>`;
    const cartHTML = cart.map(product => `
        <div data-id="${product.id}" class="cart-item">
            <button class="cart-item-btn-remove">X</button>
            <div class="cart-item-title">${product.title}</div>
            <div class="cart-item-price">$${product.price}</div>
            <input class="cart-item-qty" type="number" placeholder="Qty" min="0" value="${product.qty}">
            <div class="cart-item-total">$${(product.price * product.qty).toFixed(2)}</div>
        </div>
    `).join("");

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    // console.log(totalPrice);

    totalPriceLabel.textContent = `$${totalPrice.toFixed(2)}`;
    cartElement.innerHTML = cartHeader + cartHTML;

    cartElement.addEventListener("change", qtyChanged);

    const RemoveBtns = cartElement.querySelectorAll(".cart-item-btn-remove");

    RemoveBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.parentElement.dataset.id;
            const index = cart.findIndex(item => item.id == id);
            console.log(index);
            cart.splice(index, 1);
            saveCartLocalStorage(cart);
            renderCart();
        });
    });


}

function qtyChanged(e) {
    if(e.target.classList.contains("cart-item-qty")) {
        const id = e.target.parentElement.dataset.id;
        const cartItem = findCartItemById(id);
        e.target.removeEventListener("change", qtyChanged);

        cartItem.qty = e.target.value;
        saveCartLocalStorage(cart);
        renderCart();
    }
}

checkoutbtn.addEventListener("click", checkout)

function checkout() {

    gtag('checkout', 'button_click', {
        'event_category': 'interactions on cart',
        'event_label': 'checking out',
        'value': 1,
        'debug_mode': true
      });

    if (cart.length != 0) {
    alert ("Your purchase was successful!");
    alert ("Your items are on their way to you now!");
    cart.length = 0;
    console.log (cart)
    saveCartLocalStorage(cart);
    renderCart();
    } else {
        alert ("Shopping cart empty!")
    }
    
}

renderProducts();