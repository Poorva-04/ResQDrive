document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const userType = document.getElementById("userType").value.toLowerCase(); // 🔧 Lowercase fix
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();
  
      if (!userType || !name || !email || !phone || !address || !password || !confirmPassword) {
        alert("Please fill out all fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:8000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            userType,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Registration successful! You can now log in.");
          window.location.href = "login.html";
        } else {
          alert(data.message || "Registration failed.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred. Please try again.");
      }
    });
  });
  
  function togglePassword(id) {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
  }
  