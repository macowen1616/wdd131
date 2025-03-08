import { recipes } from "./recipes.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.querySelector(".recipe");
    const searchInput = document.querySelector("#search");
    
    function displayRecipe(recipe) {
        recipeContainer.innerHTML = `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-info">
                    <span class="category">${recipe.category || ""}</span>
                    <h2 class="recipe-title">${recipe.title}</h2>
                    <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                        ${"⭐".repeat(recipe.rating)}${"☆".repeat(5 - recipe.rating)}
                    </span>
                    <p class="recipe-description">${recipe.description || ""}</p>
                </div>
            </div>
        `;
    }

    if (recipes.length > 0) {
        displayRecipe(recipes[0]);
    }

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const foundRecipe = recipes.find(recipe => recipe.title.toLowerCase().includes(searchTerm));
        if (foundRecipe) {
            displayRecipe(foundRecipe);
        }
    });
});