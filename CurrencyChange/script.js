// https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json
// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json";
// FIXED: Keep this completely clean with no variables or curly braces
// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// // const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
// const API_KEY = "7cd0c08fe47d754948ddbaa3";
// const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;


// const dropdowns= document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// // document.addEventListener("load", () => {

// // })

// // populateall dropdowns with currency
// for(let select of dropdowns){
//     for (currCode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if(select.name === "from" && currCode === "USD"){
//             newOption.selected = "selected";
//         } else if (select.name === "to" && currCode === "INR"){
//             newOption.selected = "selected";
//         }
//         select.append(newOption);
//     // console.log(code,countryList[code]);
// }
// select.addEventListener("change", (evt) => {
// updateFlag(evt.target);
// });
// }

// const updateExchangeRate = async () => {
//     let amountInput = document.querySelector(".amount input");
// // let amount = document.value;
// let amtVal = amountInput.value;
// if(amtVal === "" || amtVal < 1){
//     amtVal = 1;
//     amountInput.value = "1";
// }
// const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
// let response = await fetch(URL);
// let data = await response.json();
// let rate = data[fromCurr.value.toLowerCase()];
// console.log(rate);

// let finalAmount = amtVal * rate;
// msg.innerText = `${amtVal}${fromCurr.value}= ${finalAmount}${toCurr.value}`;
// };

// const updateFlag = (element) => {
// let currCode = element.value;
// let countryCode = countryList[currCode];
// let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
// let img = element.parentElement.querySelector("img");
// img.src = newSrc;
// };
 

// btn.addEventListener("click", async (evt) => {
// evt.preventDefault();
// updateExchangeRate();
// });

// btn.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     updateExchangeRate();
// });
// window.addEventListener("load", () => {
//     updateExchangeRate();
// });

// the below one are already comment out

// let amountInput = document.querySelector(".amount input");
// // let amount = document.value;
// let amtVal = amountInput.value;
// if(amtVal === "" || amtVal < 1){
//     amtVal = 1;
//     amountInput.value = "1";
// }

// console.log(fromCurr.value, toCurr.value);
// const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
// let response = await fetch(URL);
// let data = await response.json();
// let rate = data[fromCurr.value.toLowerCase()];
// console.log(rate);

// let finalAmount = amtVal * rate;
// msg.innerText = `${amtVal}${fromCurr.value}= ${finalAmount}${toCurr.value}`;
// });

const API_KEY = "7cd0c08fe47d754948ddbaa3";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amtVal = amountInput.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amountInput.value = "1";
    }

    // FIXED URL - no lowercase, no extra slashes
    const URL = `${BASE_URL}${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    // FIXED - correct way to get rate
    let rate = data.conversion_rates[toCurr.value];

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// FIXED - only one click listener
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
