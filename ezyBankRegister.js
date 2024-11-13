document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Récupérer les valeurs des champs
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    // Validation des mots de passe
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Appel AJAX pour envoyer les données d'inscription
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullname,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // Vérifiez si l'inscription est réussie
      if (response.ok) {
        alert("Inscription réussie ! Vous allez être redirigé.");
        window.location.href = "esyBankLogin.html"; // Rediriger vers la page de connexion
      } else {
        // Afficher l'erreur
        alert(data.error || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur de réseau :", error);
      alert("Une erreur est survenue lors de l'inscription.");
    }
  });
});
