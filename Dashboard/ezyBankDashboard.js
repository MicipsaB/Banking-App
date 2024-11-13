$(document).ready(function() {
    // Calcul du solde total
    let totalBalance = 0;
    $(".account-card").each(function() {
        const balance = parseInt($(this).data("saldo"));
        totalBalance += balance;
    });
    $("#totalBalance").text(`SOLDE TOTAL : ${totalBalance.toLocaleString()} €`);

    // Calcul du montant restant pour chaque transaction
    $(".transactions-table tbody tr").each(function() {
        const transactionAmount = parseInt($(this).find(".transaction-amount").text());
        const accountBalance = parseInt($("#totalBalance").text().match(/\d+/)[0]); // Utilisation du solde total pour simplifier
        const remainingBalance = accountBalance + transactionAmount;
        $(this).find(".remaining-balance").text(remainingBalance.toLocaleString() + " €");
    });

    // Génération de notifications
    $("#notifications").append(`<div class="notification">⚠️ Solde bas détecté sur le Compte Courant.</div>`);
    $("#notifications").append(`<div class="notification">🔔 Transaction suspecte détectée le 08/11/2023.</div>`);
});
