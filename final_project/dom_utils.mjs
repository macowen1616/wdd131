export function renderEvents(eventList, container) {
    container.innerHTML = ""; // Clear previous events
    if (eventList.length === 0) {
        container.innerHTML = "<p>No upcoming events.</p>";
        return;
    }

    eventList.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date} - ${event.location}</p>
            <button class="register-btn" data-id="${event.id}">Register</button>
        `;
        container.appendChild(eventCard);
    });

    // Attach event listeners to new register buttons
    document.querySelectorAll(".register-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            alert(`Registered for event ID: ${e.target.dataset.id}`);
        });
    });
}


