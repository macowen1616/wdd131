import { recipes } from "./recipes.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.querySelector("#recipes-container");
    const searchInput = document.querySelector("#search-input");

    // Helper function to generate a random number
    function random(num) {
        return Math.floor(Math.random() * num);
    }

    // Select a random recipe from the recipes array
    function getRandomRecipe() {
        return recipes[random(recipes.length)];
    }

    // Generate tags HTML
    function tagsTemplate(tags) {
        return tags.length ? `<ul class="recipe__tags">${tags.map(tag => `<li>${tag}</li>`).join('')}</ul>` : '';
    }

    // Generate rating HTML
    function ratingTemplate(rating) {
        let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
        for (let i = 1; i <= 5; i++) {
            html += `<span aria-hidden="true" class="icon-star">${i <= rating ? "⭐" : "☆"}</span>`;
        }
        html += `</span>`;
        return html;
    }

    // Template for rendering each recipe
    function recipeTemplate(recipe) {
        return `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-info">
                    ${tagsTemplate(recipe.tags || [])}
                    <h2 class="recipe-title">${recipe.title}</h2>
                    ${ratingTemplate(recipe.rating)}
                    <p class="recipe-description">${recipe.description ? recipe.description : "No description available."}</p>
                </div>
            </div>
        `;
    }

    // Render recipes to the page
    function renderRecipes(recipeList) {
        recipeContainer.innerHTML = recipeList.map(recipeTemplate).join('');
    }

    // Filter recipes based on search query
    function filterRecipes(query) {
        return recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query) ||
            (recipe.description || "").toLowerCase().includes(query) ||
            (recipe.tags || []).some(tag => tag.toLowerCase().includes(query)) ||
            (recipe.ingredients || []).some(ingredient => ingredient.toLowerCase().includes(query))
        ).sort((a, b) => a.title.localeCompare(b.title));
    }

    // Handle search input
    function searchHandler(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        renderRecipes(filterRecipes(query));
    }

    // Initialize the page with a random recipe
    function init() {
        const recipe = getRandomRecipe();
        renderRecipes([recipe]);
    }

    // Event listener for the search form
    document.querySelector(".search-form").addEventListener("submit", searchHandler);

    // Initialize by rendering a random recipe
    init();
});

