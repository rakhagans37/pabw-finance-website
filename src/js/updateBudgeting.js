const updateBudgetingForm = document.getElementById("updateBudgetingForm");

// event listener untuk mengisi form
// Mendapatkan elemen form

// Menambahkan event listener untuk submit form
updateBudgetingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Mengambil nilai inputan dari user
    const budgetCategory = document.getElementById("budget-category").value;
    const amountType = document.getElementById("amount-type").value;
    const urlParams = new URLSearchParams(window.location.search);
    const budgetAmount =
        amountType === "number"
            ? parseInt(document.getElementById("budget-amount").value)
            : parseInt(
                  data.amount *
                      (document.getElementById("budget-amount").value / 100)
              );
    const paramName = urlParams.get("budgetName");
    console.log(paramName);

    // Mendapatkan data yang sudah ada di localStorage
    let storedData = localStorage.getItem("data");

    // Melakukan parsing data JSON yang sudah ada, jika ada
    storedData = storedData ? JSON.parse(storedData) : {};

    // Memeriksa apakah kategori anggaran sudah ada dalam data yang tersimpan
    if (storedData["budget"].hasOwnProperty(budgetCategory)) {
        // Jika sudah ada, update nilai
        storedData["budget"][paramName].amount = budgetAmount;
    } else {
        // Jika belum ada, tambahkan kategori baru
        storedData["budget"][budgetCategory] = {
            budgetName: budgetCategory,
            amount: budgetAmount,
        };
    }

    // Update budget Lainnya
    storedData["budget"]["Lainnya"] = {
        budgetName: "Lainnya",
        amount: getUnusedBudget(storedData["amount"], storedData["budget"]),
    };

    // Menyimpan kembali data yang sudah diubah ke localStorage
    localStorage.setItem("data", JSON.stringify(storedData));

    // Memberikan umpan balik kepada pengguna
    window.location.href = "index.html";
});

// Mendapatkan budget yang tersisa
function getUnusedBudget(oldBudget, dataBudget) {
    const budget = dataBudget;
    const budgetName = Object.keys(budget);
    let totalCurrentBudget = oldBudget;

    console.log(totalCurrentBudget);

    for (const name of budgetName) {
        if (name !== "Lainnya") {
            totalCurrentBudget -= budget[name].amount;
        }
    }

    console.log(totalCurrentBudget);

    return totalCurrentBudget;
}
