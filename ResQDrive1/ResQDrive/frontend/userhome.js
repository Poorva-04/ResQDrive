function goToMechanics() {
    const vehicleType = document.getElementById("vehicleType").value;
  
    if (!vehicleType) {
      alert("Please select a vehicle type");
      return;
    }
  
    // Store vehicle type in localStorage
    localStorage.setItem("selectedVehicleType", vehicleType);
  
    // Redirect to view-mechanic page
    window.location.href = "view-mechanic.html";
  }
  