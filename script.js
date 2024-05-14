const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const lengthDisplayEl = document.getElementById('length-display');

document.getElementById('length').addEventListener('input', syncCharacterAmount);
function syncCharacterAmount(e) {
    lengthDisplayEl.textContent = e.target.value;
}

function generatePassword() {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    const password = createPassword(hasUpper, hasLower, hasNumbers, hasSymbols, length);
    resultEl.textContent = password;

    if (password) {
        document.getElementById('copy-btn').style.display = 'block';
    }
}

function createPassword(upper, lower, numbers, symbols, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + numbers + symbols;
    const typesArr = [{upper}, {lower}, {numbers}, {symbols}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    numbers: getRandomNumber,
    symbols: getRandomSymbol
};

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

function copyPassword() {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
}
