const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const calculateWelthButton = document.getElementById('calculate-welth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user  and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Double everyones money 
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })

    updateDOM();
}

// Sort users by richest 
function sortByRichest() {
    data.sort((a, b) => b.money - a.money );

    updateDOM();
}

// filter only Millionaires 
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// calculate the total welth
function calculateWelth() {
    const wealth = data.reduce((acc, user) => (acc =+ user.money), 0);

    const welthElement = document.createElement('div');
    welthElement.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(welthElement);
}

// add new Object to data array 
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM 
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Welth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Format money 
function formatMoney(number) {
    return '₹ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

// Add event listners
addUserButton.addEventListener('click', getRandomUser);
doubleButton.addEventListener('click', doubleMoney);
sortButton.addEventListener('click', sortByRichest);
showMillionairesButton.addEventListener('click', showMillionaires);
calculateWelthButton.addEventListener('click', calculateWelth);