let carts = document.querySelectorAll('.add-button');

let products = [
    {
        name: 'Carrie',
        tag: 'book1',
        price: 100,
        inCart: 0
    },
    {
        name: 'Frankenstein',
        tag: 'book2',
        price: 99,
        inCart: 0
    },
    {
        name: 'Shutter',
        tag: 'book3',
        price: 150,
        inCart: 0
    },
    {
        name: 'The Last Thing He Told Me: A Novel',
        tag: 'book4',
        price: 105,
        inCart: 0
    },
    {
        name: 'The Arrangement',
        tag: 'book5',
        price: 250,
        inCart: 0
    },
    {
        name: 'The Book of Longings: A Novel',
        tag: 'book6',
        price: 670,
        inCart: 0
    },
    {
        name: 'Where the Crawdads Sing ',
        tag: 'book7',
        price: 120,
        inCart: 0
    },
    {
        name: 'The Spy and the Traitor: The Greatest Espionage Story of the Cold War',
        tag: 'book8',
        price: 89,
        inCart: 0
    },
    {
        name: 'Blood and Thunder: The Epic Story of Kit Carson and the Conquest of the American West',
        tag: 'book9',
        price: 56,
        inCart: 0
    },
    {
        name: 'Opposite of Always',
        tag: 'book10',
        price: 65,
        inCart: 0
    },
    {
        name: 'The New Girl',
        tag: 'book11',
        price: 80,
        inCart: 0
    },
    {
        name: 'The Fault in Our Stars',
        tag: 'book12',
        price: 40,
        inCart: 0
    },
    {
        name: 'Ethics of Educational Leadership',
        tag: 'book13',
        price: 55,
        inCart: 0
    },
    {
        name: 'Introduction to Educational Research',
        tag: 'book14',
        price: 105,
        inCart: 0
    },
    {
        name: 'Small Teaching: Everyday Lessons from the Science of Learning 2nd Edition',
        tag: 'book15',
        price: 99,
        inCart: 0
    }
    

];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product">
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">RM ${item.price}.00</div>
            <div class="quantity">
                <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">RM${item.inCart * item.price}.00</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total</h4>
                <h4 class="basketTotal">RM${cart}.00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}


function discount(){
    let productNumbers = localStorage.getItem('cartNumbers'); //getting total item count
    productNumbers = parseInt(productNumbers); //changing to int

    let total = localStorage.getItem("totalCost");
    total = parseInt(total);

    var discount = 0;
    

    if(productNumbers >= 5 && productNumbers <= 10) {
    
        discount = total - (total*0.05);
        document.getElementById("demo").innerHTML= discount;
        
    
    } else if ( productNumbers > 10) {
        discount = total - (total*0.15);
        document.getElementById("demo").innerHTML= discount;
        
    }else {
        document.getElementById("demo").innerHTML= "no discount";
    }

    
}

function postage()
{

    let postage_fee = localStorage.getItem("totalCost");

    if(postage_fee > 100) {
    
        document.getElementById("test").innerHTML= "Free Postage";
        
    
    } else {
        postage_fee+10;
        document.getElementById("test").innerHTML= "RM10 will be added for postage";
    }
    
}

onLoadCartNumbers();
displayCart();
discount();
postage();
