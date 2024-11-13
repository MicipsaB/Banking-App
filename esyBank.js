
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    loginButton.addEventListener("click", () => {
        window.location.href = "esyBankLogin.html"; // Redirige vers la page de connexion
    });

    registerButton.addEventListener("click", () => {
        window.location.href = "ezyBankRegister.html"; // Redirige vers la page d'inscription
    });
});

 

