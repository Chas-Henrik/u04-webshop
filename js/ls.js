
const CART_NAME = "Shopping-Cart";

export function getCartLocalStorage() {
    try {
        const lsCart = localStorage.getItem(CART_NAME);
        return lsCart ? JSON.parse(lsCart) : [];
    } catch(error) {
        console.error(error);
        return [];
    }
}

export function saveCartLocalStorage(cartObj) {
    try {
        localStorage.setItem(CART_NAME, JSON.stringify(cartObj));
    } catch(error) {
        console.error(error);
    }
}