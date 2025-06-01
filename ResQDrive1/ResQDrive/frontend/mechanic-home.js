document.addEventListener("DOMContentLoaded", function () {
    console.log("🔧 Mechanic Home Loaded");

    const token = localStorage.getItem("token");
    const mechanicId = localStorage.getItem("mechanicId");

    if (!token || !mechanicId) {
        alert("⚠️ Unauthorized! Please log in again.");
        window.location.href = "login.html";
        return;
    }

    const newRequestsContainer = document.getElementById("newRequests");
    const acceptedRequestsContainer = document.getElementById("acceptedRequests");
    const rejectedRequestsContainer = document.getElementById("rejectedRequests");

    // ✅ Define formatDate FIRST
    function formatDate(datetimeStr) {
        const date = new Date(datetimeStr);
        return date.toLocaleString(); // Converts to local readable format
    }

    async function fetchAppointments() {
        try {
            const response = await fetch(`http://localhost:8000/api/appointments/mechanics/${mechanicId}/appointments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const appointments = await response.json();

            if (!Array.isArray(appointments)) {
                console.error("Appointments not in expected format", appointments);
                return;
            }

            newRequestsContainer.innerHTML = "";
            acceptedRequestsContainer.innerHTML = "";
            rejectedRequestsContainer.innerHTML = "";

            appointments.forEach(appointment => {
                createAppointmentCard(appointment);
            });

        } catch (error) {
            console.error("❌ Error fetching appointments:", error);
        }
    }

    function createAppointmentCard(appointment) {
        const card = document.createElement("div");
        card.classList.add("appointment-card");
        card.innerHTML = `
            <h3>${appointment.userName}</h3>
            <p><strong>Vehicle Type:</strong> ${appointment.vehicle}</p>
            <p><strong>Issue:</strong> ${appointment.problem}</p>
            <p><strong>Time:</strong> ${formatDate(appointment.appointment_date)}</p>
            <div class="button-group">
                <button class="accept-btn">Accept</button>
                <button class="reject-btn">Reject</button>
                <button class="view-btn">View Details</button>
            </div>
        `;

        const acceptBtn = card.querySelector(".accept-btn");
        const rejectBtn = card.querySelector(".reject-btn");
        const viewBtn = card.querySelector(".view-btn");

        acceptBtn.addEventListener("click", () => updateStatus(appointment.appointment_id, "Accepted", card)); // Using appointment.appointment_id
        rejectBtn.addEventListener("click", () => updateStatus(appointment.appointment_id, "Rejected", card)); // Using appointment.appointment_id
        viewBtn.addEventListener("click", () => viewDetails(appointment));

        if (appointment.status === "Accepted") {
            acceptedRequestsContainer.appendChild(card);
        } else if (appointment.status === "Rejected") {
            rejectedRequestsContainer.appendChild(card);
        } else {
            newRequestsContainer.appendChild(card);
        }
    }

    async function updateStatus(appointmentId, newStatus, cardElement) {
        try {
            console.log(`Updating appointment ${appointmentId} to status ${newStatus}`);
            const response = await fetch(`http://localhost:8000/api/appointments/${appointmentId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(`✅ Appointment ${newStatus}`);
                if (newStatus === "Accepted") {
                    acceptedRequestsContainer.appendChild(cardElement);
                } else if (newStatus === "Rejected") {
                    rejectedRequestsContainer.appendChild(cardElement);
                }
                cardElement.querySelector(".button-group").remove();
            } else {
                alert(result.message || "Error updating status.");
            }
        } catch (error) {
            console.error(`❌ Error updating appointment:`, error);
        }
    }

    function viewDetails(appointment) {
        const modal = document.getElementById("detailsModal");
        const modalDetails = document.getElementById("modalDetails");

        modalDetails.innerHTML = `
          <p><strong>Appointment ID:</strong> ${appointment.appointment_id}</p> <!-- Ensure appointment_id is used -->
          <p><strong>User Name:</strong> ${appointment.userName}</p>
          <p><strong>Vehicle Type:</strong> ${appointment.vehicle}</p>
          <p><strong>Issue:</strong> ${appointment.problem}</p>
          <p><strong>Date & Time:</strong> ${formatDate(appointment.appointment_date)}</p>
          <p><strong>Status:</strong> ${appointment.status}</p>
        `;

        modal.style.display = "block";
    }

    document.getElementById("closeModal").addEventListener("click", function () {
        document.getElementById("detailsModal").style.display = "none";
    });

    window.addEventListener("click", function (event) {
        const modal = document.getElementById("detailsModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Fetch appointments on page load
    fetchAppointments();
});
