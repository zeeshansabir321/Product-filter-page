async function getData (){
    const response = await fetch('https://dummyjson.com/products');
    let data = await response.json();
    let categories = [];

    // DESTRUCTURED API OBJECT BY NAME OF PRODUCTS
    let {products} = data;

    // COLLECT CATEGORIES IN ARRAY FROM PRODUCTS
    products.forEach((product)=>{
        if(!categories.includes(product.category)){
            categories.push(product.category)
        }
    }) 

    // DISPLAY CATEGORIES IN THE FILTERS
    displayCategories(categories);

    // DISPLAY ALL PRODUCTS
    displayProducts(products)


    // ADD EVENTLISTENER TO EACH CATEGORY ELEMENT
    let elements = document.querySelectorAll('.category');
    elements.forEach((element,index,array)=>{
        element.addEventListener('click', (e)=>{

            // Remove active class from all category elements
            for(let i=0; i<array.length;i++){
                array[i].classList.remove('active')
            }

            // Add active class to current category element for styling
            e.target.classList.toggle('active')

            // ADD CURRENT CATEGORY IN .content-title CLASS
            let contentTitle = document.querySelector('.content-title')
            contentTitle.textContent = `Category: ${e.target.textContent}`; 

            // FILTER PRODUCTS BY CATEGORIES
            let categoryFiltered = []
            let productsContainer = document.querySelector('.products')
            products.forEach((product)=>{
                if(product.category.includes(e.target.textContent)){
                    categoryFiltered.push(product)
                }
            })
            productsContainer.innerHTML ='';
            displayProducts(categoryFiltered)

        })
    })
}
getData()


function displayCategories(categories){
    let container = document.querySelector('.categories')
    categories.forEach((category)=>{
        container.innerHTML += `<div class="category">${category}</div>`
    })
}

function displayProducts(products){
    let container = document.querySelector('.products')
    products.forEach((product)=>{
        container.innerHTML += `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="Product Image" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <div class="row">
                    <strong class="product-price">${product.price}</strong>
                    <button class="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        </div>`;
    })
}
