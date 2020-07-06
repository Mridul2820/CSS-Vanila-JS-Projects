const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const singleMeal = document.getElementById('single-meal');

// Search meal and fetch from api 
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    singleMeal.innerHTML = '';

    // Get search term
    const term = search.value;

    // check if empty 
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            resultHeading.innerHTML = `<h2>Search Resilts For '${term}' : </h2>`;

            if(data.meals === null) {
                meals.innerHTML = `<p>There are no search results, Try Again</p>`
            }
            else {
                meals.innerHTML = data.meals.map(meal => `
                <div class='meal'>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealid="${meal.idMeal}" >
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `)
                .join('');
            }
        })
        // clear search text
        search.value = '';
    }
    else {
        alert('Please Enter a Search Value')
    }
}


// fetch meal by id 
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });
}

// Fetch random Meal 
function getRandomMeal() {
    // Clear meal and heading 
    meals.innerHTML = '';
    resultHeading.innerHTML  = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php
    `)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal){
    const ingredients = [];

    for(let i = 1; i<= 20 ; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
        else {
            break;
        }
    }

    let youtubeLink = `${meal.strYoutube}`
    let getLink = youtubeLink.split("=");

    singleMeal.innerHTML = ` 
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </h2>

            <a class="post-link target="_blank" href="${meal.strSource}">Post Link</a>

            <div class="youtube-link">
                ${meal.strYoutube ? 
`                    <iframe 
                        src="https://www.youtube.com/embed/${getLink[1]}" 
                        frameborder="0" 
                        picture-in-picture" 
                        allowfullscreen>
                    </iframe> `
                    : ''
                }
            </div>
        </div>

    </div>`
} 

// Event listeners 
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

meals.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        }

        else {
            return false;
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');

        getMealByID(mealID)
    }
})