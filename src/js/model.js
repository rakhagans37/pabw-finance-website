const data = JSON.parse(localStorage.getItem("data"));

export function getTotalExpenses() {
    const expense = data.transactions.filter((transaction) => {
        return transaction.type == "Pengeluaran";
    });

    var totalExpense = 0;
    expense.forEach((expense) => {
        totalExpense += parseInt(expense.amount);
    });

    return totalExpense;
}

export function getTotalIncomes() {
    const income = data.transactions.filter((transaction) => {
        return transaction.type == "Pemasukan";
    });

    var totalIncome = 0;
    income.forEach((income) => {
        totalIncome += parseInt(income.amount);
    });

    return totalIncome;
}

export function getActualAmount() {
    return data.amount;
}

export function getAllTransactions() {
    return data.transactions;
}

export function getAllBudget() {
    return data.budget;
}

export function getRemainBudget() {
    const budget = data.budget;
    const budgetName = Object.keys(budget);
    let totalCurrentBudget = data.amount;

    for (const name of budgetName) {
        if (name !== "Lainnya") {
            totalCurrentBudget -= budget[name].amount;
        }
    }

    return totalCurrentBudget;
}

export function getTransactionPerBudget() {
    const budget = data.budget;
    const transaction = data.transactions;
    var totalTransactionPerBudget = {};
    const budgetName = Object.keys(budget);

    for (const name of budgetName) {
        var totalTransaction = 0;

        transaction.forEach((transaction) => {
            if (transaction.budgetCategory === name) {
                totalTransaction += parseInt(transaction.amount);
            }
        });

        totalTransactionPerBudget[name] = {
            totalTransaction: totalTransaction,
            budgetRemain: budget[name].amount - totalTransaction,
        };
    }

    return totalTransactionPerBudget;
}

export function getTransactionsPerDay() {
    const transactions = data.transactions;
    const transactionsPerDay = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date).toLocaleDateString("id-ID");
        if (transactionsPerDay[date] === undefined) {
            transactionsPerDay[date] = [];
        }
        transactionsPerDay[date].push(transaction);
    });

    return transactionsPerDay;
}

export function getTotalIncomePerDay() {
    const transactionsPerDay = getTransactionsPerDay();
    const totalTransactionPerDay = {};

    for (const date in transactionsPerDay) {
        const transactions = transactionsPerDay[date];
        let totalIncome = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "Pemasukan") {
                totalIncome += parseInt(transaction.amount);
            }
        });

        totalTransactionPerDay[date] = totalIncome;
    }

    return totalTransactionPerDay;
}

export function getTotalExpensesPerDay() {
    const transactionsPerDay = getTransactionsPerDay();
    const totalTransactionPerDay = {};

    for (const date in transactionsPerDay) {
        const transactions = transactionsPerDay[date];
        let totalIncome = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "Pengeluaran") {
                totalIncome += parseInt(transaction.amount);
            }
        });

        totalTransactionPerDay[date] = totalIncome;
    }

    return totalTransactionPerDay;
}
