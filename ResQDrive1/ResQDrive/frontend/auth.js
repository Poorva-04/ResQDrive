document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType") ? localStorage.getItem("userType").toLowerCase() : null;

    // ✅ Define protected routes & required user types (all lowercase for consistency)
    const protectedRoutes = {
        "userhome.html": "user",
        "mechanic-home.html": "mechanic",
        "admin-dashboard.html": "admin"
    };

    const currentPage = window.location.pathname.split("/").pop(); // Get current page name

    console.log(`Current Page: ${currentPage}, User Type: ${userType}, Required: ${protectedRoutes[currentPage]}`);

    // 🚨 Redirect if not logged in
    if (!token) {
        alert("⚠️ Unauthorized! Please log in first.");
        window.location.href = "login.html"; // Redirect to login
    } 
    // 🚨 Redirect if logged-in user tries to access an unauthorized page
    else if (protectedRoutes[currentPage] && protectedRoutes[currentPage] !== userType) {
        alert("⛔ Access Denied! You are not authorized.");
        window.location.href = "login.html"; // Redirect to login
    }
});
