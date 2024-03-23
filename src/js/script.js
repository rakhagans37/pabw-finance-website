// Menyimpan data ke local storage
if (localStorage.getItem("data") === null) {
    const data = {
        amount: 0,
        transactions: [],
        budget: {},
    };
    localStorage.setItem("data", JSON.stringify(data));
}

// Mengambil data dari local storage
const data = JSON.parse(localStorage.getItem("data"));
