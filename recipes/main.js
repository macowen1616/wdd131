import recipes from './recipes.mjs';

// Generate a random number between 0 and num (exclusive)
function random(num) {
    return Math.floor(Math.random() * num);
}

// Get a random entry from the list
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

// Function to generate HTML for the recipe tags
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Function to generate HTML for the recipe rating
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

    // Loop through 1 to 5 and generate stars
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

    html += `</span>`;
    return html;
}

// Function to generate the full recipe HTML
function recipeTemplate(recipe) {
    return `<article class="recipe">
        <img src="${recipe.image}" alt="Image of ${recipe.name}">
        <div class="recipe-text">
            <h2 class="recipe-title">${recipe.name}</h2>
            <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${ratingTemplate(recipe.rating)}
            </span>
            <p class="recipe-description">${recipe.description}</p>
        </div>
    </article>`;
}

// Function to render the recipes to the page
function renderRecipes(recipeList) {
    const recipeContainer = document.getElementById('recipes-container');
    recipeContainer.innerHTML = recipeList.map(recipeTemplate).join('');
}

// Initialize by getting a random recipe and rendering it
function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

// Filter recipes based on the search query
function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
            recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
        );
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

// Search handler function for the search button
function searchHandler(e) {
    e.preventDefault(); // Prevent form submission and page reload

    const query = document.getElementById('search-input').value.toLowerCase();
    if (!query) {
        init(); // If the input is empty, show a random recipe again
    } else {
        const filteredRecipes = filterRecipes(query);
        renderRecipes(filteredRecipes);
    }
}

// Set up the search button event listener
document.getElementById('search-button').addEventListener('click', searchHandler);

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    init(); // Initialize the page when the DOM is ready
});