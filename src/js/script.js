// Menyimpan data ke local storage
if (localStorage.getItem("data") === null) {
    const data = {
        amount: 0,
        transactions: [],
        budget: {},
    };
    localStorage.setItem("data", JSON.stringify(data));
}

// Blueprint untuk transaksi, jadi ketika membuat transaksi baru, cukup membuat object baru dari class ini
class Transaction {
    constructor(amount, type, budgetCategory, description) {
        this.amount = amount;
        this.description = description;
        this.type = type;
        this.budgetCategory = budgetCategory;
        this.date = new Date();
    }
}

// Blueprint untuk budget, jadi ketika membuat budget baru, cukup membuat object baru dari class ini
class Budget {
    constructor(budgetName, amount) {
        this.budgetName = budgetName;
        this.amount = amount;
    }
}

// Mengambil data dari local storage
const data = JSON.parse(localStorage.getItem("data"));

/* 
    Amount = Jumlah uang yang dimiliki
    Seluruh function yang berhubungan dengan amount berada dibawah sini
*/

// Fungsi untuk menambah jumlah uang
function addAmount() {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const type = "Pemasukan";
    const transaction = new Transaction(amount, type, description);

    data.transactions.push(transaction);
    data.amount += parseInt(amount);
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

function minAmount() {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const budgetCategory = document.getElementById("budgetCategory").value;
    const type = "Pengeluaran";
    const transaction = new Transaction(
        amount,
        type,
        budgetCategory,
        description
    );

    data.transactions.push(transaction);
    data.amount -= parseInt(amount);
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

/*
    Budget = Pembagian budget untuk setiap kategori
*/
// Budget
function createBudget() {}

function updateBudget() {}

function deleteBudget() {}

// Read
function displayAmount() {}

function displayTransactions() {}

function displayConsumption() {}

function displayConsumptionPerBudget() {}
