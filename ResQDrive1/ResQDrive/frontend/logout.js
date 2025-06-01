document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Logout.js Loaded!");

    // Get buttons
    const logoutButton = document.getElementById("logoutButton");
    const cancelButton = document.getElementById("cancelButton");
    const logoutHeaderButton = document.getElementById("logoutHeaderButton");

    // Function to handle logout
    function handleLogout() {
        console.log("🔴 Logging out...");

        // Remove JWT token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userType");

        // Redirect to login page
        window.location.href = "login.html";
    }

    // Event listeners for logout and cancel buttons
    if (logoutButton) logoutButton.addEventListener("click", handleLogout);
    if (logoutHeaderButton) logoutHeaderButton.addEventListener("click", handleLogout);

    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            console.log("⛔ Logout Cancelled!");

            // Redirect based on user type
            const userType = localStorage.getItem("userType");
            switch (userType) {
                case "User":
                    window.location.href = "user-home.html";
                    break;
                case "Mechanic":
                    window.location.href = "mechanic-dashboard.html";
                    break;
                case "Admin":
                    window.location.href = "admin-home.html";
                    break;
                default:
                    window.location.href = "login.html"; // Fallback
            }
        });
    }
});
