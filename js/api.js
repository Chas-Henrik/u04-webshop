

export async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const prods = Object.values(data);
        return prods;
    } catch (error) {
        console.error('Error fetching products', error);
        return [];
    }
}
