document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 make-appointment.js Loaded Successfully!");
  
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const selectedMechanic = JSON.parse(localStorage.getItem("selectedMechanic"));
  
    if (!token || !userId) {
      alert("⚠️ Unauthorized! Please log in first.");
      window.location.href = "login.html";
      return;
    }
  
    if (!selectedMechanic) {
      alert("⚠️ Mechanic details missing. Please select a mechanic first.");
      window.location.href = "view-mechanic.html";
      return;
    }
  
    const { id: mechanicId, name: mechanicName, phone: mechanicContact } = selectedMechanic;
  
    // Populate mechanic details
    document.getElementById("mechanicName").textContent = mechanicName;
    document.getElementById("mechanicContact").textContent = mechanicContact;
  
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentResult = document.getElementById("appointmentResult");
  
    appointmentForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const userName = document.getElementById("userName").value.trim();
      const vehicleType = document.getElementById("vehicleType").value.trim();
      const issueDescription = document.getElementById("issueDescription").value.trim();
      let appointmentDate = document.getElementById("appointmentDate").value.trim();
  
      if (!userName || !vehicleType || !issueDescription || !appointmentDate) {
        appointmentResult.textContent = "⚠️ Please fill all fields.";
        appointmentResult.style.color = "red";
        return;
      }
  
      // Format datetime for database (YYYY-MM-DD HH:MM:SS)
      appointmentDate = new Date(appointmentDate).toISOString().slice(0, 19).replace("T", " ");
  
      try {
        const response = await fetch("http://localhost:8000/api/appointments/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            userName,
            mechanicId,
            vehicle: vehicleType,
            problem: issueDescription,
            appointment_date: appointmentDate,
            status: "Pending"
          })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("✅ Appointment booked:", data);
          appointmentResult.innerHTML = `
            <p>✅ Appointment Booked Successfully!</p>
            <p><strong>Appointment ID:</strong> ${data.appointment_id}</p>
            <p>💡 Save this ID to check your appointment status later.</p>
          `;
          appointmentResult.style.color = "green";
        } else {
          appointmentResult.textContent = data.message || "❌ Booking failed. Try again.";
          appointmentResult.style.color = "red";
          console.error("❌ Server responded with error:", data);
        }
  
      } catch (err) {
        console.error("❌ Error booking appointment:", err);
        appointmentResult.textContent = "❌ Server error. Please try again later.";
        appointmentResult.style.color = "red";
      }
    });
  });
  