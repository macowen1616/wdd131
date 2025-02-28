document.addEventListener("DOMContentLoaded", () => {
    let participantCount = 1;
    const addButton = document.getElementById("add-participant");
    const participantsContainer = document.getElementById("participants");
    const form = document.getElementById("registration-form");
    const summary = document.getElementById("summary");

    function participantTemplate(count) {
        return `
        <section class="participant${count}">
            <label for="name${count}">Participant ${count} Name:</label>
            <input type="text" id="name${count}" name="name${count}" required>

            <label for="age${count}">Age:</label>
            <input type="number" id="age${count}" name="age${count}" required>

            <label for="fee${count}">Fee:</label>
            <input type="number" id="fee${count}" name="fee${count}" required>
        </section>`;
    }

    addButton.addEventListener("click", () => {
        participantCount++;
        addButton.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
    });

    function totalFees() {
        let feeElements = [...document.querySelectorAll("[id^=fee]")];
        return feeElements.reduce((sum, input) => sum + Number(input.value || 0), 0);
    }

    function successTemplate(info) {
        return `
        <p>Thank you, ${info.name}, for registering.</p>
        <p>You have registered ${info.participants} participants and owe $${info.fees} in Fees.</p>`;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let adultName = document.getElementById("adult-name").value;
        let totalParticipants = document.querySelectorAll("[id^=name]").length;
        let fees = totalFees();

        form.style.display = "none";
        summary.innerHTML = successTemplate({ name: adultName, participants: totalParticipants, fees });
        summary.classList.remove("hide");
    });
});
