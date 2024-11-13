document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get email and password values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      // Send login request to server
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if login was successful
      if (response.ok) {
        alert("Connexion réussie !");
        // Store token in localStorage or sessionStorage for future authenticated requests
        localStorage.setItem("token", data.token); // Assuming the token is returned as `data.token`
        window.location.href = "dashboard.html"; // Redirect to the dashboard or home page
      } else {
        // Show error message
        alert(
          data.error ||
            "Erreur de connexion. Veuillez vérifier vos informations."
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  });
});
