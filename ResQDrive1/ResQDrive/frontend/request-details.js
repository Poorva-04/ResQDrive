document.addEventListener("DOMContentLoaded", () => {
    const mechanicId = localStorage.getItem("mechanicId");
    const token = localStorage.getItem("token");
    const appointmentId = localStorage.getItem("appointmentId");
    const statusUpdateForm = document.getElementById("statusUpdateForm");

    if (!token || !mechanicId || !appointmentId) {
        alert("Unauthorized! Please log in.");
        window.location.href = "login.html";
        return;
    }

    statusUpdateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newStatus = document.getElementById("status").value;

        fetch(`http://localhost:8080/appointments/${appointmentId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => response.json())
        .then(data => {
            alert("Appointment status updated successfully!");
            window.location.href = "mechanic-home.html";
        })
        .catch(error => console.error("Error updating appointment:", error));
    });
});
