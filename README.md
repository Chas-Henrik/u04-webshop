# u04-webshop

This is a simple single-page webshop. 

Productdata is fetched from [https://fakestoreapi.com]

Webpage deployed on GitHub Pages: [https://chas-henrik.github.io/u04-webshop/]

## Built with *HTML, CSS and Javascript*. 
There is a main indexfile for each language and for javascript there are two extra files designated to contain specific functions which are then imported to the main file. 

## Main functionality
The products in the shop and the contents of the shoppingcart are rendered and rerendered with data from product objects. Each rendering of the shop page goes through a set of methods which are executed according to the current parameters of the sort and filter options. If the shoppingcartwindow is open the cart is rendered each time an item or quantity is added or removed from the cart.
State of the users shoppingcart is saved in localStorage.   