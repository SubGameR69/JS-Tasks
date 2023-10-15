// key = "d3e486cc41-b2d39af1a6-s2kogt";

let amount = document.querySelector(".amount");
let gbpPrice = document.querySelector(".gbp");
let eurPrice = document.querySelector(".euro");
function convertCurrency(event) {
fetch("https://api.fastforex.io/fetch-all?api_key=d3e486cc41-b2d39af1a6-s2kogt")
.then((result) =>{
    let data = result.json();
    return data;
}).then((currency) =>{
    let inputValue = event.target.value;
    gbpPrice.innerHTML = `Price in GBP is : ${(inputValue * currency.results["GBP"]).toFixed(2)}`;
    eurPrice.innerHTML = `Price in Euro is : ${(inputValue * currency.results["EUR"]).toFixed(2)}`;
});
}

amount.oninput = convertCurrency;
