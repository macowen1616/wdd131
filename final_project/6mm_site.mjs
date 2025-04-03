export const events = [
    { id: 1, name: "Desert Skirmish", date: "2025-05-10", location: "Nevada", type: "Milsim" },
    { id: 2, name: "CQB Challenge", date: "2025-06-15", location: "Utah", type: "Speedsoft" },
    { id: 3, name: "Forest Encounter", date: "2025-07-20", location: "Idaho", type: "Milsim" }
];

// Function to get only upcoming events
export function getUpcomingEvents() {
    return events.filter(event => new Date(event.date) > new Date());
}