// server response to js
let dealersJSON;
$.ajax(
{
    type: 'GET',
    dataType: "json",
    async: false,
    url: 'https://freepshop.rs/task.php',
    success: function(data)
    {
        dealersJSON = data;
    }
});

// set 3 Dealers from JSON
let [Dealer1, Dealer2, Dealer3] = dealersJSON;

let pickedCars = [0, 1, 2];

// console.log(Dealer1.imeAutoPlaca);
// console.log(Dealer2.imeAutoPlaca);
// console.log(Dealer3.imeAutoPlaca);

// function creates and places dealer HTML elements with 3 cars
(function setElements() {
    // takes a Dealer object and picked cars array
    // returns HTML for all picked cars in Dealer object
    function createCarElements (Dealer, pickedCars) {
        let carElements = "";
        for (let i = 0; i < pickedCars.length; i++) {
            let make = Dealer.automobili[pickedCars[i]].marka;
            let model = Dealer.automobili[pickedCars[i]].model;
            let year = Dealer.automobili[pickedCars[i]].godiste;
            let price = Dealer.automobili[pickedCars[i]].cena;
    
            let oneCarElement = 
            `<!-- CAR -->
            <div class="car">
                <img class="car-img" src="./img/car_placeholder.png" alt="car${i+1}">
                <div>
                    <h3 class="car-model">${make}<br>${model}</h3>
                    <p class="car-year">${year}</p>
                    <p class="car-price">${price} EUR</p>
                    <a class="car-buy" onclick="buyItem (${dealersJSON.indexOf(Dealer)}, ${pickedCars[i]})">Dodaj u korpu</a>
                </div>
            </div>
            <!-- CAR END -->`;

            carElements += oneCarElement;
        }
        return carElements;
    }
    
    function createDealerElements (Dealer1, Dealer2, Dealer3) {
        let dealerElements = "";
        for (let i = 0; i < arguments.length; i++) {
            let name = arguments[i].imeAutoPlaca;
            let address = arguments[i].adresa;
            let state = arguments[i].drzava;
    
            let carElements = createCarElements(arguments[i], pickedCars);
            oneDealerElement = 
            `<!-- CAR DEALER -->
            <div class="car-dealer">
                <img class="dealer-img" src="./img/car-dealer.jpg" alt="Car dealer">
                <div>
                    <h2>${name}</h2>
                    <p>${address}, ${state}</p>
                    <div class="available-cars">
                        ${carElements}
                    </div>
                </div>
            </div>
            <!-- CAR DEALER END -->`
    
            dealerElements += oneDealerElement;
        }
        return dealerElements;
    }
    
    const cards = document.getElementsByClassName("cards")[0];
    cards.innerHTML = createDealerElements (Dealer1, Dealer2, Dealer3);
})();

// ovo bi trebalo da radi na osnovu dužine localStoragea
const buyBtns = document.querySelectorAll(".car-buy");
let cartCounter = document.getElementById("cartCounter");
cartCounter.innerText = localStorage.length;

function buyItem (dealerIndex, pickedCar){
    let car = dealersJSON[dealerIndex].automobili[pickedCar];
    car.dealerId = dealersJSON[dealerIndex].id;
    car.dealerName = dealersJSON[dealerIndex].name;
    localStorage.setItem(`car-${localStorage.length+1}`, JSON.stringify(car));
    cartCounter.innerText = localStorage.length;
    console.log(car);
}