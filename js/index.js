import { getProducts } from "./api.js";

const productsUl = document.getElementById('product-list');

async function renderProducts() {
    const products = await getProducts();
    console.log(products);

    const html = products.map(product => `
        <li class="product-list">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <input type="number" value="0" min="0" max="10">
            <button>Add to Cart</button>
        </li>
    `);

    console.log(html);
    productsUl.innerHTML = html;

}

renderProducts();