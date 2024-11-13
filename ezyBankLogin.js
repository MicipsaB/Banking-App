document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Pour une redirection après une connexion réussie
        // Ici, vous pouvez envoyer une requête AJAX pour vérifier les identifiants
        // et rediriger en fonction de la réponse (simulé ici)
        
        // Exemple de redirection
        window.location.href = "dashboard.html"; // Redirige vers le tableau de bord
    });
});


