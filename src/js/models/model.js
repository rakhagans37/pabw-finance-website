const data = JSON.parse(localStorage.getItem("data"));

export function getTotalIncomePerMonth() {
    const income = data.transactions.filter((transaction) => {
        return transaction.type == "Pemasukan";
    });

    var totalIncome = 0;
    income.forEach((income) => {
        const date = new Date();

        if (new Date(income.date).getMonth() === date.getMonth()) {
            totalIncome += parseInt(income.amount);
        }
    });

    return totalIncome;
}

export function getSaving() {
    return getTotalIncomes() - getTotalExpenses();
}

export function getTotalExpensesPerMonth() {
    const expense = data.transactions.filter((transaction) => {
        return transaction.type == "Pengeluaran";
    });

    var totalExpense = 0;
    expense.forEach((expense) => {
        const date = new Date();

        if (new Date(expense.date).getMonth() === date.getMonth()) {
            totalExpense += parseInt(expense.amount);
        }
    });

    return totalExpense;
}

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
    if (getTotalIncomePerMonth() == 0) {
        data.amount = 0;
    }
    return data.amount;
}

export function getAllTransactions() {
    return data.transactions;
}

export function getAllBudget() {
    return data.budget;
}

export function getRemainBudget(budgetName = null) {
    const budget = data.budget;
    const budgetNames = Object.keys(budget);
    let totalCurrentBudget = 0;

    for (const name of budgetNames) {
        if (name !== "Lainnya") {
            totalCurrentBudget += budget[name].amount;
        }
    }

    if (budgetName !== null) {
        return (
            getTotalIncomePerMonth() -
            totalCurrentBudget +
            budget[budgetName].amount
        );
    }

    return getTotalIncomePerMonth() - totalCurrentBudget;
}

export function getTransactionPerBudget(budgetName = null) {
    const budget = data.budget;
    const transaction = data.transactions;
    var totalTransactionPerBudget = {};
    const budgetNames = Object.keys(budget);

    if (budgetName !== null) {
        var totalTransaction = 0;

        transaction.forEach((transaction) => {
            if (transaction.budgetCategory === budgetName) {
                totalTransaction += parseInt(transaction.amount);
            }
        });

        totalTransactionPerBudget[budgetName] = {
            totalTransaction: totalTransaction,
            budgetRemain: budget[budgetName].amount - totalTransaction,
        };

        return totalTransactionPerBudget;
    }

    for (const name of budgetNames) {
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
