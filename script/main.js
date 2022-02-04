
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
// array indexes of the picked cars
let pickedCars = [0, 1, 2];


// takes a Dealer object and picked cars array
// returns HTML for all picked cars in Dealer object
function createCarElements (Dealer, pickedCars = [0, 1, 2]) {
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
                <h3 class="car-model">${make} ${model}</h3>
                <p class="car-year">${year}</p>
                <p class="car-price">${price} EUR</p>
                <a class="car-buy" href="#">Dodaj u korpu</a>
            </div>
        </div>
        <!-- CAR END -->`;

        carElements += oneCarElement;
        // console.log("carElements", carElements);
    }
    return carElements;
}

function createDealerElements (Dealer1, Dealer2, Dealer3) {
    let dealerElements = "";
    for (let i = 0; i < arguments.length; i++) {
        let carElements = createCarElements(arguments[i], pickedCars = [0, 1, 2]);
        oneDealerElement = 
        `<!-- CAR DEALER -->
        <div class="car-dealer">
            <img class="dealer-img" src="./img/car-dealer.jpg" alt="Car dealer">
            <div>
                <h2>Voonyx</h2>
                <p>Mifflin, GR</p>
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

