import { recipes } from 'recipes.mjs'; // Import the recipes array

// Function to create the recipe HTML template
function recipeTemplate(recipe) {
  return `
    <figure class="recipe">
      <img src="${recipe.image}" alt="Image of ${recipe.name}" />
      <figcaption>
        ${tagsTemplate(recipe.tags)}
        <h2><a href="#">${recipe.name}</a></h2>
        ${ratingTemplate(recipe.rating)}
        <p class="recipe__description">
          ${recipe.description}
        </p>
      </figcaption>
    </figure>
  `;
}

// Function to create the tags HTML
function tagsTemplate(tags) {
  let html = '<ul class="recipe__tags">';
  tags.forEach(tag => {
    html += `<li>${tag}</li>`;
  });
  html += '</ul>';
  return html;
}

// Function to create the rating HTML
function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

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

// Function to render recipes on the page
function renderRecipes(recipeList) {
  const outputElement = document.getElementById('recipe-list');
  
  outputElement.innerHTML = ''; // Clear previous recipes
  recipeList.forEach(recipe => {
    outputElement.insertAdjacentHTML('beforeend', recipeTemplate(recipe));
  });
}

// Function to get a random recipe
function getRandomListEntry(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// Function to initialize the app by getting a random recipe and rendering it
function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

// Function to filter the recipes based on the search query
function filterRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  const filtered = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(lowerCaseQuery) ||
           recipe.description.toLowerCase().includes(lowerCaseQuery) ||
           recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

// Function to handle the search functionality
function searchHandler(e) {
  e.preventDefault();
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  const filteredRecipes = filterRecipes(query);
  renderRecipes(filteredRecipes);
}

// Attach the event listener to the search button and input
document.getElementById('search-button').addEventListener('click', searchHandler);
document.getElementById('search-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    searchHandler(e);
  }
});

// Initialize the app when the page loads
init();