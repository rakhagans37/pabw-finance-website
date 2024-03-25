// Menyimpan data ke local storage
if (localStorage.getItem("data") === null) {
    const data = {
        amount: 0,
        transactions: [],
        budget: { Lainnya: { budgetName: "Lainnya", amount: 0 } },
    };
    localStorage.setItem("data", JSON.stringify(data));
}

// Mengambil data dari local storage
const data = JSON.parse(localStorage.getItem("data"));
// localStorage.clear();
console.log(data);
