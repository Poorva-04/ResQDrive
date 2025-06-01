document.getElementById("signInBtn").addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const userTypeRaw = document.getElementById("userType").value.trim();
  
    const userType = userTypeRaw.toLowerCase(); // 🔧 Lowercase fix
  
    if (!email || !password || !userType) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });
  
      const data = await response.json();
      console.log("Returned from backend:", data);
  
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userId", data.userId);
  
      if (data.userType === "User") {
        window.location.href = "userhome.html";
      } else if (data.userType === "Mechanic") {
        localStorage.setItem("mechanicId", data.userId); // ✅ This line is critical!
        window.location.href = "mechanic-home.html";
      } else if (data.userType === "Admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        alert("Invalid user type received");
      }
  
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in");
    }
  });
  
  // ✅ Register button handler
  document.getElementById("registerBtn").addEventListener("click", function () {
    window.location.href = "register.html";
  });
  