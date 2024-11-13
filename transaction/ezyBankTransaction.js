$(document).ready(function() {
    const transactionsByAccount = {
        compte_courant: [],
        compte_epargne: [],
        compte_professionnel: [],
        livret_a: [],
        compte_retraite: []
    };
    let currentBalance = 0;

    // Ajout de transaction
    $("#transactionForm").submit(function(event) {
        event.preventDefault();

        const accountType = $("#accountSelect").val();
        const type = $("#transactionType").val();
        const amount = parseFloat($("#transactionAmount").val());
        const date = $("#transactionDate").val();
        
        if (type === "withdrawal" && amount > currentBalance) {
            alert("Solde insuffisant pour effectuer ce retrait.");
            return;
        }
        
        const newBalance = type === "deposit" ? currentBalance + amount : currentBalance - amount;
        currentBalance = newBalance;
        
        const transaction = {
            date: date,
            type: type === "deposit" ? "Dépôt" : "Retrait",
            amount: type === "deposit" ? `+${amount.toFixed(2)} €` : `-${amount.toFixed(2)} €`,
            balanceAfter: `${newBalance.toFixed(2)} €`
        };
        
        // Ajouter la transaction au compte sélectionné
        transactionsByAccount[accountType].push(transaction);
        updateTransactionHistory(accountType);
        
        $("#transactionForm")[0].reset();
    });

    // Mise à jour de l'historique des transactions pour le compte sélectionné
    function updateTransactionHistory(accountType) {
        const $transactionHistory = $("#transactionHistory");
        $transactionHistory.empty();

        const filteredTransactions = transactionsByAccount[accountType];
        filteredTransactions.forEach(tx => {
            $transactionHistory.append(`
                <tr>
                    <td>${tx.date}</td>
                    <td>${tx.type}</td>
                    <td>${tx.amount}</td>
                    <td>${tx.balanceAfter}</td>
                </tr>
            `);
        });

        $("#noTransactionsMessage").toggle(filteredTransactions.length === 0);
    }

    // Filtrage par type et période pour le compte sélectionné
    $("#filterType, #filterPeriod, #accountSelect").on("change", function() {
        const accountType = $("#accountSelect").val();
        const typeFilter = $("#filterType").val();
        const periodFilter = parseInt($("#filterPeriod").val());

        const now = new Date();
        const filteredTransactions = transactionsByAccount[accountType].filter(tx => {
            const matchesType = typeFilter === "all" || (typeFilter === "deposit" && tx.type === "Dépôt") || (typeFilter === "withdrawal" && tx.type === "Retrait");
            const transactionDate = new Date(tx.date);
            const matchesPeriod = !periodFilter || (now - transactionDate <= periodFilter * 24 * 60 * 60 * 1000);
            return matchesType && matchesPeriod;
        });

        if (filteredTransactions.length === 0) {
            $("#noTransactionsMessage").show();
            $("#transactionHistory").empty();
        } else {
            $("#noTransactionsMessage").hide();
            const $transactionHistory = $("#transactionHistory");
            $transactionHistory.empty();
            filteredTransactions.forEach(tx => {
                $transactionHistory.append(`
                    <tr>
                        <td>${tx.date}</td>
                        <td>${tx.type}</td>
                        <td>${tx.amount}</td>
                        <td>${tx.balanceAfter}</td>
                    </tr>
                `);
            });
        }
    });

    // Téléchargement CSV pour le compte sélectionné
    $("#downloadCSV").click(function() {
        const accountType = $("#accountSelect").val();
        let csvContent = "data:text/csv;charset=utf-8,Date,Type,Montant,Solde Après Transaction\n";
        
        transactionsByAccount[accountType].forEach(tx => {
            csvContent += `${tx.date},${tx.type},${tx.amount},${tx.balanceAfter}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `historique_transactions_${accountType}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Historique des transactions téléchargé avec succès.");
    });
});
