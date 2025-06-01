document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let formMessage = document.getElementById("form-message");

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "Please fill in all fields.";
        } else if (!validateEmail(email)) {
            formMessage.textContent = "Please enter a valid email address.";
        } else {
            formMessage.textContent = "Message sent successfully!";
            formMessage.style.color = "green";
            document.getElementById("contactForm").reset();
        }
    });

    function validateEmail(email) {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
