import { recipes } from 'recipes.mjs'; // Import the recipes array from the recipes.mjs module

// Function to create the recipe HTML template
function recipeTemplate(recipe) {
  return `
    <figure class="recipe">
      <img src="images/apple-crisp.jpg" alt="image of apple crisp on a plate" />
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

  // Create stars based on rating
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
  // Get the element where we will render the recipes (assuming you have an element with id 'recipe-list')
  const outputElement = document.getElementById('recipe-list');
  
  // Use recipeTemplate to transform recipe objects into HTML strings
  const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
  
  // Set the HTML strings as the innerHTML of our output element
  outputElement.innerHTML = recipeHTML;
}

// Function to initialize the app by getting a random recipe and rendering it
function init() {
  // Assuming `getRandomListEntry` is defined elsewhere in your code
  const recipe = getRandomListEntry(recipes);
  
  // Render the recipe by passing it as an array to the renderRecipes function
  renderRecipes([recipe]);
}

// Function to filter the recipes based on the search query
function filterRecipes(query) {
  // Convert the query to lowercase for case-insensitive comparison
  const lowerCaseQuery = query.toLowerCase();

  // Filter the recipes based on the search term matching in the name, description, tags, or ingredients
  const filtered = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(lowerCaseQuery) ||
           recipe.description.toLowerCase().includes(lowerCaseQuery) ||
           recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
  });

  // Sort the filtered recipes alphabetically by name
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));

  // Return the sorted list of filtered recipes
  return sorted;
}

// Function to handle the search functionality
function searchHandler(e) {
  e.preventDefault(); // Prevent the form from submitting and page from reloading

  // Get the value from the search input
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;

  // Filter the recipes based on the search query
  const filteredRecipes = filterRecipes(query);

  // Render the filtered recipes to the page
  renderRecipes(filteredRecipes);
}

// Attach the event listener to the search button
document.getElementById('search-button').addEventListener('click', searchHandler);

// Initialize the app when the page loads
init();
