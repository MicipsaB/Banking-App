$(document).ready(function() {
    const accounts = [];
    let totalBalance = 0;

    // Fonction pour afficher les comptes
    function displayAccounts() {
        const $accountsList = $("#accountsList");
        $accountsList.empty();
        accounts.forEach((account, index) => {
            const accountHtml = `
                <div class="account-card" data-index="${index}">
                    <h3>${account.name}</h3>
                    <p>${account.balance.toFixed(2)} €</p>
                    <button class="view-transactions action-button">Voir Transactions</button>
                    <button class="delete-account action-button">Supprimer</button>
                </div>
            `;
            $accountsList.append(accountHtml);
        });
        updateTotalBalance();
    }

    // Mise à jour du solde total
    function updateTotalBalance() {
        totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
        $("#totalBalance").text(`${totalBalance.toFixed(2)} €`);
    }

    // Ouvrir le modal pour ajouter un compte
    $("#addAccountButton").click(function() {
        $("#addAccountModal").fadeIn();
    });

    // Fermer le modal
    $(".close-button").click(function() {
        $("#addAccountModal").fadeOut();
    });

    // Ajouter un nouveau compte
    $("#addAccountForm").submit(function(event) {
        event.preventDefault();
        const name = $("#accountName").val();
        const type = $("#accountType").val();
        const balance = parseFloat($("#initialBalance").val()); 
        const seuil = $("#accountSeuil").val();

        accounts.push({ name, type, balance, seuil, transactions: [] });
        displayAccounts();
        $("#addAccountModal").fadeOut();
        alert("Compte ajouté avec succès !");
        $("#addAccountForm")[0].reset();
    });

    // Supprimer un compte
    $(document).on("click", ".delete-account", function() {
        const index = $(this).closest(".account-card").data("index");
        const account = accounts[index];
        
        if (confirm(`Êtes-vous sûr de vouloir supprimer le compte "${account.name}" ? Cette action supprimera également son historique de transactions.`)) {
            accounts.splice(index, 1);
            displayAccounts();
            alert("Compte supprimé avec succès !");
        }
    });
});
