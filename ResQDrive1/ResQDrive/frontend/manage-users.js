document.addEventListener("DOMContentLoaded", function () {
    console.log("Manage Users Page Loaded!");

    const registeredUsers = [
        { id: "U101", name: "David Johnson", email: "david@example.com" },
        { id: "U102", name: "Emma Brown", email: "emma@example.com" }
    ];

    const usersContainer = document.getElementById("usersList");

    function renderUsers() {
        usersContainer.innerHTML = "";
        registeredUsers.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <button class="delete-btn" data-id="${user.id}">Delete</button>
            `;
            usersContainer.appendChild(userCard);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                console.log(`User ${userId} deleted`);
                alert(`User ${userId} has been deleted.`);
            });
        });
    }

    renderUsers();
});
