import { recipes } from "./recipes.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.querySelector(".recipe");
    const searchInput = document.querySelector(".search-form input");
    
    function random(num) {
        return Math.floor(Math.random() * num);
    }
    
    function getRandomRecipe() {
        return recipes[random(recipes.length)];
    }
    
    function tagsTemplate(tags) {
        return `<ul class="recipe__tags">${tags.map(tag => `<li>${tag}</li>`).join('')}</ul>`;
    }
    
    function ratingTemplate(rating) {
        return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
            ${"⭐".repeat(rating)}${"☆".repeat(5 - rating)}
        </span>`;
    }
    
    function recipeTemplate(recipe) {
        return `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-info">
                    ${tagsTemplate(recipe.tags || [])}
                    <h2 class="recipe-title">${recipe.title}</h2>
                    ${ratingTemplate(recipe.rating)}
                    <p class="recipe-description">${recipe.description || ""}</p>
                </div>
            </div>
        `;
    }
    
    function renderRecipes(recipeList) {
        recipeContainer.innerHTML = recipeList.map(recipeTemplate).join('');
    }
    
    function filterRecipes(query) {
        return recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query))
        ).sort((a, b) => a.title.localeCompare(b.title));
    }
    
    function searchHandler(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        renderRecipes(filterRecipes(query));
    }
    
    document.querySelector(".search-form").addEventListener("submit", searchHandler);
    
    // Display a random recipe on load
    renderRecipes([getRandomRecipe()]);
});
