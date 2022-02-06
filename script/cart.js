// global variables
let cartItems = [];
const cartDisplay = document.getElementsByClassName("cart-display")[0];
let removeCounter = 1;

// GET CART ITEMS FROM LOCAL STORAGE

for (let i = 0; i < localStorage.length; i++) {
    let currentCar = "car-"+ (i+1);
    if (localStorage.getItem(currentCar) !== null) {
        cartItems.push(JSON.parse(localStorage.getItem(currentCar)));
    }
};

// sets cart icon number
let cartCounter = document.getElementById("cartCounter");
cartCounter.innerText = localStorage.length;

// empty cart text
function emptyCartCheck(){
    if (cartItems.length == 0) {
        cartDisplay.innerHTML = '<div class="empty-cart">Vaša korpa je prazna.</div>';
    }
};

// takes the array generated from localStorage and creates HTML elements for bought items
var setCartElements = (function CartElements() {
    if (cartItems.length == 0) {
        emptyCartCheck();
    } else {
        cartDisplay.innerHTML = "";
        let cartElements = "";
        for (let i = 0; i < cartItems.length; i++) {
            let make = cartItems[i].marka;
            let model = cartItems[i].model;
            let price = parseFloat(cartItems[i].cena);
            let amount = cartItems[i].amount;
            cartElements = 
            `<!-- ITEM -->
            <div class="item">
                <div class="item-car">
                    <p class="items-count">${amount}x</p>
                    <img class="car-img" src="./img/car_placeholder.png" alt="Lada">
                    <div>
                        <h3 class="car-model">${make} ${model}</h3>
                        <p class="car-price">${price} EUR</p>
                    </div>
                </div>
                <div class="item-tools">
                    <input onchange="itemSumChange(${i})" id="inputAmount${i}" class="input-amount" type="number" value="${amount}">
                    <p class="item-sum car-price">${price * amount} EUR</p>
                    <img class="bin-icon" onclick="removeCartItem(${i})" src="https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/000000/external-bin-mobile-user-interface-tulpahn-detailed-outline-tulpahn.png"/>
                </div>
            </div>
            <!-- ITEM END -->`
            cartDisplay.innerHTML += cartElements
        }
    }
    setTotalPrice();
    return CartElements;
})();

// removes the item from page and localStorage
function removeCartItem(itemIndex) {
    cartItems.splice(itemIndex, 1);
    localStorage.removeItem(`car-${itemIndex + removeCounter}`);
    
    emptyCartCheck();
    setCartElements();
    removeCounter++;
}

// change individual item sum amount
function itemSumChange(index) {
    cartItems[index].amount = document.getElementById(`inputAmount${index}`).value;
    setCartElements();
}

// on order clear items and redirect to index
document.getElementsByClassName("order-button")[0].onclick = () => {
    localStorage.clear()
    cartItems = [];
}


function setTotalPrice () {
    let totalPrice = 0;
    for (let i=0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].cena * cartItems[i].amount;
    }
    document.getElementById("orderSum").innerText = totalPrice + " EUR";
}



//Clear localStorage & reload on logo click
document.getElementsByClassName("logo")[0].onclick = () => {
    localStorage.clear();
    location.reload();
    cartCounter.innerText = localStorage.length;
}
document.getElementsByClassName("logo")[0].onmouseover = function() {
    this.innerText = "Clear";
}
document.getElementsByClassName("logo")[0].onmouseout = function() {
    this.innerText = "Carify";
}