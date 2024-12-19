# u04-webshop

This is a simple single-page webshop. 

Productdata is fetched from [https://fakestoreapi.com]

Webpage deployed on GitHub Pages: [https://chas-henrik.github.io/u04-webshop/]

## Built with *HTML, CSS and Javascript*. 
There is a main indexfile for each webtech (index.html, index.css and index.js) and for javascript there are two extra files designated to contain specific functions which are then imported to the main file. 

## Main functionality
The products in the shop and the contents of the shoppingcart are rendered and rerendered with a list of data from product objects. The shop is rerendered each time the user makes a change to the sort and filter options. Each rendering of the shop page goes through a set of methods where the sort() and filter() methods are executed according to the current parameters of the sort and filter options. 
If the Shopping Cart Dialog is open, the cart is rerendered each time an item or quantity is added or removed from the cart.
State of the users shoppingcart is saved in localStorage.   

## Reflections on google analytics

### What are the possibilities with event tracking?
- Collect data on user behavior
- Improve page
- Data indicates issues with page based on statistics, ex. a page get no visitors, why?
- Better understanding of target audience
- Information about user geolocation
- User retention
- Selling user data
- Information about if page visitor arrives through link from another site

### Are there limitations?
- Incomplete or biased data
- Dataprivacy
- Laws and regulations limiting usefulness
- Does not account for external factors such as trends
- Can't track in person interactions

## Custom events screenshot

![Google analytics screenshot](/img/analytics-screenshot.png)