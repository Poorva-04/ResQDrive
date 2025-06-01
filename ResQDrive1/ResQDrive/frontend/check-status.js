document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 check-status.js loaded!");

    const checkBtn = document.getElementById("checkStatusBtn");
    const resultDiv = document.getElementById("statusResult");

    checkBtn.addEventListener("click", async () => {
        const appointmentId = document.getElementById("appointmentId").value.trim();

        if (!appointmentId) {
            resultDiv.textContent = "⚠️ Please enter an Appointment ID.";
            resultDiv.style.color = "red";
            return;
        }

        try {
            console.log("📤 Fetching appointment with ID:", appointmentId);

            const response = await fetch(`http://localhost:8000/api/appointments/${appointmentId}`);
            const data = await response.json();

            console.log("🧪 API Response:", data);

            if (response.ok) {
                resultDiv.innerHTML = `
                    <p><strong>Status:</strong> ${data.status}</p>
                    <p><strong>Vehicle Type:</strong> ${data.vehicle}</p>
                    <p><strong>Issue:</strong> ${data.problem}</p>
                    <p><strong>Appointment Date:</strong> ${data.appointment_date}</p>
                    <p><strong>Mechanic ID:</strong> ${data.mechanicId}</p>
                `;
                resultDiv.style.color = "green";
            } else {
                resultDiv.textContent = data.message || "❌ Appointment not found.";
                resultDiv.style.color = "red";
            }
        } catch (error) {
            console.error("❌ Error in fetch block:", error);
            resultDiv.textContent = "❌ Server error. Please try again later.";
            resultDiv.style.color = "red";
        }
    });
});
