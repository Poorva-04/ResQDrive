document.addEventListener("DOMContentLoaded", function () {
    const vehicleTypeSelect = document.getElementById("vehicleType");
    const mechanicList = document.getElementById("mechanicList");
    const errorMessage = document.getElementById("errorMessage");
    const mechanicTitle = document.getElementById("mechanicTitle");
  
    async function fetchMechanics(vehicleType) {
      try {
        const url = `http://localhost:8000/api/mechanics?vehicleType=${vehicleType}`;
        console.log("Fetching from:", url);
  
        const response = await fetch(url);
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Non-OK response body:", errorText);
          errorMessage.textContent = `Failed to fetch mechanics: ${response.statusText}`;
          mechanicList.innerHTML = "";
          mechanicTitle.textContent = "";
          return;
        }
  
        const data = await response.json();
        console.log("Fetched mechanics:", data);
  
        mechanicList.innerHTML = "";
        errorMessage.textContent = "";
  
        if (data.length === 0) {
          mechanicTitle.textContent = `No ${vehicleType} mechanics found.`;
          return;
        }
  
        mechanicTitle.textContent = `Available ${vehicleType} Mechanics`;
  
        data.forEach((mechanic) => {
          const card = document.createElement("div");
          card.classList.add("mechanic-card");
  
          // Use encodeURIComponent in case data has quotes/special chars
          card.innerHTML = `
            <h3>${mechanic.name}</h3>
            <p><strong>Email:</strong> ${mechanic.email}</p>
            <p><strong>Phone:</strong> ${mechanic.phone}</p>
            <p><strong>Address:</strong> ${mechanic.address}</p>
            <button onclick='storeMechanicAndRedirect(${JSON.stringify(mechanic)})'>Book Appointment</button>
          `;
  
          mechanicList.appendChild(card);
        });
  
      } catch (err) {
        console.error("Error fetching mechanics:", err);
        errorMessage.textContent = "Something went wrong while fetching data.";
        mechanicList.innerHTML = "";
        mechanicTitle.textContent = "";
      }
    }
  
    // Initial fetch on page load (from URL or dropdown)
    const urlParams = new URLSearchParams(window.location.search);
    const initialType = urlParams.get("type") || vehicleTypeSelect.value;
    vehicleTypeSelect.value = initialType;
    fetchMechanics(initialType);
  
    // Fetch again when dropdown changes
    vehicleTypeSelect.addEventListener("change", () => {
      fetchMechanics(vehicleTypeSelect.value);
    });
  });
  
  // Store mechanic details and redirect to appointment page
  function storeMechanicAndRedirect(mechanic) {
    localStorage.setItem('selectedMechanic', JSON.stringify(mechanic));
    window.location.href = 'make-appointment.html';
  }
  