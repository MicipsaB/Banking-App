document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".register-form");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Vous pouvez ajouter ici des vérifications supplémentaires pour valider les champs
        // Par exemple, vérifier si le mot de passe et la confirmation sont identiques

        // Redirection ou message de succès (à adapter selon votre logique backend)
        alert("Inscription réussie !");
        window.location.href = "ezyBankLogin.html"; // Redirige vers la page de connexion
    });
});
