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
    constructor(amount, type, budgetCategory = null) {
        this.amount = amount;
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
    const amount = 100;
    const type = "Pemasukan";
    const transaction = new Transaction(amount, type);

    data.transactions.push(transaction);
    data.amount += parseInt(amount);
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

function minAmount() {
    const amount = document.getElementById("amount").value;
    const budgetCategory = document.getElementById("budgetCategory").value;
    const type = "Pengeluaran";
    const transaction = new Transaction(amount, type, budgetCategory);

    data.transactions.push(transaction);
    data.amount -= parseInt(amount);
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

/*
    Budget = Pembagian budget untuk setiap kategori
*/
// Budget
function createBudget() {
    const budgetName = document.getElementById("budgetName").value;
    const amount = document.getElementById("amount").value;
    const budget = new Budget(budgetName, amount);

    data.budget[budgetName] = budget;
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "index.html";
}

function updateBudget() {}

function deleteBudget() {}
