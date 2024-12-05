

export async function getProducts() {
    try {
        const prod = fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>console.log(json));
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        const prods = Object.values(prod);
        
        return prods;
    } catch (error) {
        console.error('Error fetching products', error);
    }

    return [];
}
