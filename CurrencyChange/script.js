// URL_LINK for accessing the currencyAPI
// BASE_URL for fetching currency rates
const API_KEY = "7cd0c08fe47d754948ddbaa3";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;


// selecting required HTML elements , such as btn, id, class etc.
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate  currency dropdowns
for(let select of dropdowns){
    // add all currency codes from countryList object.
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode; // text shown in dropdown
        
        newOption.value = currCode; // value of option
        if(select.name === "from" && currCode === "USD"){ // default "from" currency = USD
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){ // default "to" currency = INR
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    // change flag whenever currency changes
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// fetch exchange rate & convert amount
const updateExchangeRate = async () => {
    // get amount entered by user
    let amountInput = document.querySelector(".amount input");
    let amtVal = amountInput.value;
    // if input is empty or less than 1, set default value = 1
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amountInput.value = "1";
    }
    
    // create API URL using selected "from" currency
    // FIXED URL - no lowercase, no extra slashes
    const URL = `${BASE_URL}${fromCurr.value}`;
    // fetch exchange rate from API
    let response = await fetch(URL);
    let data = await response.json();

    // FIXED - correct way to get rate
    let rate = data.conversion_rates[toCurr.value];
//  calculated converted amount
    let finalAmount = (amtVal * rate).toFixed(2);
    // Display result on webpage
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// update country flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// convert currency onbutton click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// runs conversion automatically on web page
window.addEventListener("load", () => {
    updateExchangeRate();
});
