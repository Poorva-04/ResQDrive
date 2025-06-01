document.addEventListener("DOMContentLoaded", function () {
    console.log("Manage Mechanics Page Loaded!");

    const pendingMechanics = [
        { id: "M101", name: "John Doe", experience: "5 years" },
        { id: "M102", name: "Alice Smith", experience: "3 years" }
    ];

    const mechanicContainer = document.getElementById("pendingMechanics");

    function renderMechanics() {
        mechanicContainer.innerHTML = "";
        pendingMechanics.forEach(mechanic => {
            const mechanicCard = document.createElement("div");
            mechanicCard.classList.add("mechanic-card");
            mechanicCard.innerHTML = `
                <h3>${mechanic.name}</h3>
                <p><strong>Experience:</strong> ${mechanic.experience}</p>
                <button class="approve-btn" data-id="${mechanic.id}">Approve</button>
                <button class="reject-btn" data-id="${mechanic.id}">Reject</button>
            `;
            mechanicContainer.appendChild(mechanicCard);
        });

        document.querySelectorAll(".approve-btn").forEach(button => {
            button.addEventListener("click", function () {
                const mechanicId = this.getAttribute("data-id");
                console.log(`Mechanic ${mechanicId} approved`);
                alert(`Mechanic ${mechanicId} has been approved.`);
            });
        });

        document.querySelectorAll(".reject-btn").forEach(button => {
            button.addEventListener("click", function () {
                const mechanicId = this.getAttribute("data-id");
                console.log(`Mechanic ${mechanicId} rejected`);
                alert(`Mechanic ${mechanicId} has been rejected.`);
            });
        });
    }

    renderMechanics();
});
