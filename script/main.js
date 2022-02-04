let dealers;

$.ajax(
{
    type: 'GET',
    dataType: "json",
    async: false,
    url: 'https://freepshop.rs/task.php',
    success: function(data)
    {
        dealers = data;
    }
});

// Random odabir dealera za naslovnu
// na klik dugmeta se postavljaju novu dealeri

let [Dealer1, Dealer2, Dealer3] = dealers;


//cars
// dealers
let car = dealers[0].automobili[0];

let dealerCard =
`<div class="car-dealer">
<img class="dealer-img" src="./img/car_placeholder.png" alt="Car dealer">
<h2>${dealers[0].imeAutoPlaca}</h2>
<p>${dealers[0].adresa}, ${dealers[0].drzava}</p>
<div class="cars-preview">
<div>
<img class="car-img" src="./img/car_placeholder.png" alt="Car">
<h3>${car.model} ${car.marka}</h3>
<p>${car.godiste}. godište</p>
<p>${car.cena} EUR</p>
<a href="#">Dodaj u korpu</a>
</div>
<div>
<img class="car-img" src="./img/car_placeholder.png" alt="Car">
<h3>${car.model} ${car.marka}</h3>
<p>${car.godiste}. godište</p>
<p>${car.cena} EUR</p>
<a href="#">Dodaj u korpu</a>
</div>
<div>
<img class="car-img" src="./img/car_placeholder.png" alt="Car">
<h3>${car.model} ${car.marka}</h3>
<p>${car.godiste}. godište</p>
<p>${car.cena} EUR</p>
<a href="#">Dodaj u korpu</a>
</div>
</div>
</div>`

const carDealers = getElementsByClassName("car-dealers")[0];
for (let i = 0; i<carDealers.length; i++) {
    carDealers[i].innerHTML = dealerCard;
}

console.log(carElement);

