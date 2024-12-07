
const CART_NAME = "Shopping-Cart";

export function getCartLocalStorage() {
    const lsCart = localStorage.getItem(CART_NAME);
    return lsCart ? JSON.parse(lsCart) : [];
}

export function saveCartLocalStorage(cartObj) {
    localStorage.setItem(CART_NAME, JSON.stringify(cartObj));
}