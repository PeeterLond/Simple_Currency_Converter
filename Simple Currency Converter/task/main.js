const input = require('sync-input');

let exchangeRates = {
    EUR: 1.0,
    JPY: 158.22,
    USD: 1.09,
    RUB: 102.39,
    GBP: 0.85,
    INR: 90.49,
    CHF: 0.95,
    SEK: 11.93,
    NOK: 11.60,
    MXN: 18.55
}

printExchangeRates(exchangeRates);
let isOn = true;
while (isOn) {
    console.log("What do you want to do?\n1-Convert currencies 2-Exit program");
    let inputOption = Number(input());
    switch (inputOption) {
        case 1:
            convertCurrency(exchangeRates);
            break;
        case 2:
            console.log("Have a nice day!")
            isOn = false;
            break;
        default:
            console.log("Unknown input")
    }
}

function printExchangeRates(exchangeRates) {
    console.log("Welcome to Currency Converter!")
    let entries = Object.entries(exchangeRates);
    entries.forEach(function (value) {
        console.log(`1 EUR equals ${value[1]} ${value[0]}`)
    })
}

function convertCurrency(exchangeRates) {
    console.log("What do you want to convert?")
    const inputFrom = input("From: ").toUpperCase()
    if (validateCorrectCurrency(inputFrom, exchangeRates)) {
        const inputTo = input("To: ").toUpperCase();
        if (validateCorrectCurrency(inputTo, exchangeRates)) {
            let inputAmount = Number(input("Amount: "));
            if (validateIfCorrectNumber(inputAmount)) {
                exchangeRatesAndPrintResult(inputFrom, inputTo, inputAmount, exchangeRates);
            }
        }
    }
}

function validateCorrectCurrency(input, exchangeRates) {
    let strings = Object.keys(exchangeRates);
    if (!strings.includes(input)) {
        console.log("Unknown currency.")
        return false;
    }
    return true;
}

function validateIfCorrectNumber(inputAmount) {
    if (inputAmount < 1) {
        console.log("The amount cannot be less than 1.");
        return false;
    }
    if (!Number.isInteger(inputAmount)) {
        console.log("The amount has to be a number.")
        return false;
    }
    return true;
}

function exchangeRatesAndPrintResult(inputFrom, inputTo, inputAmount, exchangeRates) {
    let exchangedAmount = (exchangeRates["USD"] / exchangeRates[inputFrom]) *
        exchangeRates[inputTo] * inputAmount;

    console.log(`Result: ${inputAmount} ${inputFrom} equals ${exchangedAmount.toFixed(4)} ${inputTo}`);
}
