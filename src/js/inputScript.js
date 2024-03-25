// Blueprint untuk transaksi, jadi ketika membuat transaksi baru, cukup membuat object baru dari class ini
class Transaction {
    constructor(amount, type, budgetCategory, description = null) {
        this.amount = amount;
        this.type = type;
        this.budgetCategory = budgetCategory;
        this.description = description;
        this.date = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
    }
}

// Blueprint untuk budget, jadi ketika membuat budget baru, cukup membuat object baru dari class ini
class Budget {
    constructor(budgetName, amount) {
        this.budgetName = budgetName;
        this.amount = amount;
    }
}

/* 
    Amount = Jumlah uang yang dimiliki
    Seluruh function yang berhubungan dengan amount berada dibawah sini
*/
// Fungsi untuk menambah jumlah uang
function addAmount() {
    const amount = document.getElementById("income-amount").value;
    const type = "Pemasukan";
    const budgetCategory = "Pemasukan";
    const transaction = new Transaction(amount, type, budgetCategory);

    data.transactions.unshift(transaction);
    data.amount += parseInt(amount);

    // Update budget Lainnya
    data.budget["Lainnya"] = new Budget(
        "Lainnya",
        getUnusedBudget(data.budget, data.transactions)
    );

    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

function minAmount() {
    const amount = document.getElementById("expense-amount").value;
    const expenseCategory = document.getElementById("expense-category").value;
    const expenseDescription = document.getElementById(
        "expense-description"
    ).value;
    const type = "Pengeluaran";
    const transaction = new Transaction(
        amount,
        type,
        expenseCategory,
        expenseDescription
    );

    data.transactions.unshift(transaction);
    data.amount -= parseInt(amount);
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

/*
    Budget = Pembagian budget untuk setiap kategori
*/
// Budget
document
    .getElementById("budgetingForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Mengambil data dari form
        const amountType = document.getElementById("amount-type").value;
        const budgetRange = document.getElementById("budget-range").value;
        const budgetName = capitalizeFirstLetter(
            document.getElementById("budget-category").value
        );
        let budgetAmount =
            amountType === "number"
                ? parseInt(document.getElementById("budget-amount").value)
                : parseInt(
                      getTotalIncomePerMonth() *
                          (document.getElementById("budget-amount").value / 100)
                  );

        if (budgetRange === "weekly") {
            budgetAmount = budgetAmount * 4;
        }
        // Membuat object budget
        const budget = new Budget(budgetName, budgetAmount);
        data.budget[budgetName] = budget;

        // Update budget Lainnya
        data.budget["Lainnya"] = new Budget(
            "Lainnya",
            getUnusedBudget(data.budget, data.transactions)
        );

        // Menambahkan budget ke data dan push ke localstorage
        localStorage.setItem("data", JSON.stringify(data));
        window.location.href = "index.html";
    });

// DOM Manipulation
function changeTab(to) {
    const parent = document.getElementById("tabs");
    const a = parent.getElementsByTagName("a");

    for (let i = 0; i < a.length; i++) {
        if (a[i].ariaCurrent === "page") {
            a[i].classList.replace("tabs-active", "tabs-inactive");
            document
                .getElementById(a[i].ariaLabel)
                .classList.replace("flex", "hidden");
            a[i].ariaCurrent = "false";
        } else if (a[i].ariaLabel === to) {
            a[i].classList.replace("tabs-inactive", "tabs-active");
            document
                .getElementById(a[i].ariaLabel)
                .classList.replace("hidden", "flex");
            a[i].ariaCurrent = "page";
        }
    }
}

function getTotalIncomePerMonth(transactionsData) {
    console.log(transactionsData);
    const income = transactionsData.filter((transaction) => {
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

function getUnusedBudget(dataBudget, dataTransactions) {
    const budget = dataBudget;
    const budgetName = Object.keys(budget);
    let totalCurrentBudget = 0;

    for (const name of budgetName) {
        if (name !== "Lainnya") {
            totalCurrentBudget += budget[name].amount;
        }
    }

    return getTotalIncomePerMonth(dataTransactions) - totalCurrentBudget;
}

function capitalizeFirstLetter(string) {
    return string.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

function getTotalIncomePerMonth() {
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
