import events from './6mm_site.mjs';

// Function to generate the HTML for an event
function eventTemplate(event) {
    return `
        <article class="event">
            <h2 class="event-title">${event.name}</h2>
            <p class="event-date">${event.date}</p>
            <p class="event-location">${event.location}</p>
            <p class="event-description">${event.description}</p>
            <ul class="event-tags">
                ${event.tags.map(tag => `<li class="tag">${tag}</li>`).join('')}
            </ul>
        </article>
    `;
}

// Function to render the event list to the page
function renderEvents(eventList) {
    const eventContainer = document.getElementById('event-list');
    if (eventContainer) {
        eventContainer.innerHTML = eventList.map(eventTemplate).join('');
    } else {
        console.error('Event list container not found');
    }
}

// Filter events by query
function filterEvents(query) {
    const filtered = events.filter(event => 
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
    );
    return filtered;
}

// Search handler for the search button
function searchHandler(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    console.log(`Searching for: ${query}`);
    if (query) {
        const filteredEvents = filterEvents(query);
        renderEvents(filteredEvents);
    } else {
        renderEvents(events); // Show all events if no query
    }
}

// Function to hide the event list and close button
function hideEventList() {
    const eventList = document.getElementById('event-list');
    const closeButton = document.getElementById('close-events-button');
    if (eventList && closeButton) {
        eventList.style.display = 'none';  // Hide the event list
        closeButton.style.display = 'none';  // Hide the close button
    }
}

// Slideshow functionality
function initSlideshow() {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    console.log(`Number of slides: ${slides.length}`);

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    // Function for next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Function for previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Attach event listeners for the slideshow buttons
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    if (prevButton) {
        prevButton.addEventListener("click", prevSlide);
    } else {
        console.error('Previous button not found');
    }
    
    if (nextButton) {
        nextButton.addEventListener("click", nextSlide);
    } else {
        console.error('Next button not found');
    }

    // Auto change slides every 3 seconds
    setInterval(nextSlide, 3000);

    // Show the first slide initially
    if (slides.length > 0) {
        showSlide(currentIndex);
    } else {
        console.error('No slides found');
    }
}

// Main initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    // Initialize the slideshow
    initSlideshow();

    // Attach the search button event listener after DOM content is loaded
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        console.log('Search button found');
        searchButton.addEventListener('click', searchHandler);
    } else {
        console.error('Search button not found');
    }

    // Attach event listener for the "Show Events" button
    const showEventsButton = document.getElementById('events-container');
    const closeEventsButton = document.getElementById('close-events-button');
    const eventList = document.getElementById('event-list');
    
    if (showEventsButton) {
        showEventsButton.addEventListener('click', () => {
            renderEvents(events);  // Show events when the button is clicked
            eventList.style.display = 'block'; // Show event list
            closeEventsButton.style.display = 'inline-block'; // Show close button
        });
    } else {
        console.error('Show Events button not found');
    }

    // Attach event listener for the "Close Events" button
    if (closeEventsButton) {
        closeEventsButton.addEventListener('click', hideEventList);
    } else {
        console.error('Close Events button not found');
    }
});
