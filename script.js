const apiUrl = 'https://fakestoreapi.com/products';
const cardContainer = document.querySelector('main[class="cards animate-bottom"]');

function cardCreator(category, rate, image, title, description, price) {
    cardContainer.insertAdjacentHTML('beforeend', `
        <section class="card shop">
        <div>
        <div style="flex-shrink: 0">
                <div class="badge">
                    <p id="category-badge">${category}</p>
                    <p id="${(rate >= 2.5) ? 'rating-badge-good' : 'rating-badge-bad'}">${rate}</p>
                </div>
                <img src="${image}" alt="Contact us.">
            </div>
            <h3 style="flex-shrink: 0">${title}</h3>
            <span>${description}</span>
        </div>
            
            
            <div class="card-footer" style="flex-shrink: 0">
                <p id="price"><b>price: ${price}$</b></p>
                <button><i class="fa fa-cart-arrow-down"></i> Add to cart</button>
            </div>
        </section>`);

}

fetch(apiUrl)
    .then(response => {
        document.getElementById("main").style.display = "flex";
        if (!response) {
            throw new Error('Network Error Occurred!');
        }
        return response.json();
    })
    .then(products => {
        document.getElementById("loader").style.display = "none";
        products.forEach(product => {
            cardCreator(
                product.category,
                product.rating.rate,
                product.image,
                product.title,
                product.description,
                product.price);
        });
    });
