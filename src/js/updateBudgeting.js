import { getRemainBudget } from "./models/model.js";
import { capitalizeFirstLetter } from "./models/helper.js";

const updateBudgetingForm = document.getElementById("updateBudgetingForm");

// Menambahkan event listener untuk submit form
updateBudgetingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Mengambil nilai inputan dari user
    const budgetCategory = capitalizeFirstLetter(
        document.getElementById("budget-category").value
    );
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

    // Mendapatkan data yang sudah ada di localStorage
    let storedData = localStorage.getItem("data");

    // Melakukan parsing data JSON yang sudah ada, jika ada
    storedData = storedData ? JSON.parse(storedData) : {};

    // Update budget Lainnya
    storedData["budget"]["Lainnya"] = {
        budgetName: "Lainnya",
        amount: getRemainBudget(paramName) - budgetAmount,
    };

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

    // Menyimpan kembali data yang sudah diubah ke localStorage
    localStorage.setItem("data", JSON.stringify(storedData));

    // Memberikan umpan balik kepada pengguna
    window.location.href = "index.html";
});
