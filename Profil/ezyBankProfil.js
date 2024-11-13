$(document).ready(function() {
    // Charger les informations actuelles de l'utilisateur
    function loadUserInfo() {
        $.ajax({
            url: '/api/getUserInfo',  // URL de l'API pour obtenir les infos utilisateur
            method: 'GET',
            success: function(data) {
                $('#displayUserFullName').text(`${data.firstName} ${data.lastName}`);
                $('#displayUserEmail').text(data.email);
                $('#userFullName').val(`${data.firstName} ${data.lastName}`);
                $('#userEmail').val(data.email);
            },
            error: function() {
                alert("Erreur lors du chargement des informations utilisateur.");
            }
        });
    }

    // Charger les informations utilisateur au chargement de la page
    loadUserInfo();

    // Basculer en mode édition
    $('#editButton').click(function() {
        $('#profileInfo').hide();
        $('#profileForm').show();
    });

    // Annuler l'édition et revenir à la vue d'origine
    $('#cancelButton').click(function() {
        $('#profileForm').hide();
        $('#profileInfo').show();
    });

    // Envoi des modifications via AJAX
    $('#profileForm').submit(function(event) {
        event.preventDefault();
        
        const fullName = $('#userFullName').val().split(" ");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ");
        const email = $('#userEmail').val();

        $.ajax({
            url: '/api/updateUserInfo',  // URL de l'API pour mettre à jour les infos utilisateur
            method: 'POST',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email
            },
            success: function(response) {
                if (response.success) {
                    $('#displayUserFullName').text(`${firstName} ${lastName}`);
                    $('#displayUserEmail').text(email);
                    $('#confirmationMessage').fadeIn().delay(2000).fadeOut();

                    // Revenir à la vue d'origine
                    $('#profileForm').hide();
                    $('#profileInfo').show();
                } else {
                    alert("Erreur lors de la mise à jour des informations.");
                }
            },
            error: function() {
                alert("Erreur de connexion au serveur.");
            }
        });
    });

    // Déconnexion
    $('#logoutButton').click(function() {
        $.ajax({
            url: '/api/logout',  // URL de l'API pour la déconnexion
            method: 'POST',
            success: function() {
                window.location.href = '../ezyBankFront.html';  // Redirection vers la page d'accueil
            },
            error: function() {
                alert("Erreur lors de la déconnexion.");
            }
        });
    });
});
