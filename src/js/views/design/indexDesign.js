import {
    getActualAmount,
    getTotalIncomes,
    getTotalExpenses,
    getAllTransactions,
    getTransactionPerBudget,
    getAllBudget,
    getRemainBudget,
    getTotalIncomePerMonth,
    getTotalExpensesPerMonth,
    getSaving,
} from "../../models/model.js";

const formatCurrency = (amount) => {
    return "Rp. " + amount.toLocaleString();
};

export function createCard() {
    document.getElementById("actual-amount").innerHTML = formatCurrency(
        getActualAmount()
    );
    document.getElementById("actual-expenses").innerHTML = formatCurrency(
        getTotalExpensesPerMonth()
    );
    document.getElementById("actual-incomes").innerHTML = formatCurrency(
        getTotalIncomePerMonth()
    );
    document.getElementById("actual-saving").innerHTML = formatCurrency(
        getSaving()
    );
}

export function createTransactionElement(transaction) {
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add(
        "flex",
        "flex-row",
        "justify-between",
        "items-center"
    );

    const transactionInfoDiv = document.createElement("div");
    transactionInfoDiv.classList.add(
        "flex",
        "flex-row",
        "gap-14",
        "items-center",
        "justify-center"
    );

    const transactionImg = document.createElement("img");
    transactionImg.src = "./src/img/transaction.svg";
    transactionImg.classList.add("hidden", "lg:block");
    transactionImg.alt = "";

    const transactionDetailsDiv = document.createElement("div");
    transactionDetailsDiv.classList.add("flex", "flex-col", "gap-1");

    const transactionName = document.createElement("p");
    transactionName.classList.add("font-medium", "text-base", "text-black");
    transactionName.textContent = transaction.budgetCategory;

    const transactionDate = document.createElement("span");
    transactionDate.classList.add(
        "font-normal",
        "text-thirdTitle",
        "text-[15px]"
    );

    const transactionDateTime = new Date(transaction.date);
    transactionDate.textContent = transactionDateTime.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    transactionDetailsDiv.appendChild(transactionName);
    transactionDetailsDiv.appendChild(transactionDate);

    transactionInfoDiv.appendChild(transactionImg);
    transactionInfoDiv.appendChild(transactionDetailsDiv);

    const transactionStatus = document.createElement("p");
    transactionStatus.classList.add(
        "font-normal",
        "text-thirdTitle",
        "text-base",
        "hidden",
        "lg:block"
    );
    transactionStatus.textContent = "Selesai";

    const transactionAmount = document.createElement("p");
    if (transaction.type === "Pemasukan") {
        transactionAmount.classList.add(
            "font-medium",
            "text-base",
            "text-plus"
        );
    } else {
        transactionAmount.classList.add(
            "font-medium",
            "text-base",
            "text-minus"
        );
    }
    transactionAmount.textContent =
        "Rp. " + parseInt(transaction.amount).toLocaleString();

    transactionDiv.appendChild(transactionInfoDiv);
    transactionDiv.appendChild(transactionStatus);
    transactionDiv.appendChild(transactionAmount);

    return transactionDiv;
}

export function printLastThreeTransaction() {
    const transactionContainer = document.getElementById(
        "three-transaction-container"
    );
    const transactions = getAllTransactions().slice(0, 3);

    transactions.forEach((transaction) => {
        const transactionElement = createTransactionElement(transaction);
        transactionContainer.appendChild(transactionElement);
    });
}

export function createBudgetTableRow(name, budget, totalTransactionPerBudget) {
    const tableRow = document.createElement("tr");
    tableRow.classList.add(
        "bg-white",
        "hover:bg-gray-50",
        "text-black",
        "font-normal"
    );

    const transactionName = document.createElement("th");
    transactionName.setAttribute("scope", "row");
    transactionName.classList.add("px-6", "py-4", "font-medium");
    transactionName.textContent = name;

    const transactionType = document.createElement("td");
    transactionType.classList.add("px-6", "py-4");
    transactionType.textContent = "Rp. " + budget.amount.toLocaleString();

    const transactionDate = document.createElement("td");
    transactionDate.classList.add("px-6", "py-4");
    transactionDate.textContent =
        "Rp. " +
        totalTransactionPerBudget[name].totalTransaction.toLocaleString();

    const transactionAmount = document.createElement("td");
    transactionAmount.classList.add("px-6", "py-4", "text-plus", "font-medium");
    transactionAmount.textContent =
        "Rp. " + totalTransactionPerBudget[name].budgetRemain.toLocaleString();

    const buttonContainer = document.createElement("td");
    buttonContainer.classList.add("px-6", "py-4", "flex", "flex-row", "gap-4");

    const updateButton = document.createElement("button");
    updateButton.classList.add(
        "bg-update/70",
        "hover:bg-update",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded-3xl"
    );
    updateButton.addEventListener("click", () => goToUpdatePage(name));
    updateButton.textContent = "Update";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
        "bg-delete/70",
        "hover:bg-delete",
        "text-white",
        "font-bold",
        "py-2",
        "px-4",
        "rounded-3xl"
    );
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        const data = JSON.parse(localStorage.getItem("data"));

        // Update data lainnya
        data.budget["Lainnya"] = {
            budgetName: "Lainnya",
            amount: getRemainBudget(name),
        };

        // Ubah data transaksi yang menggunakan budget yang dihapus menjadi lainnya
        data.transactions.forEach((transaction) => {
            if (transaction.budgetCategory === name) {
                transaction.budgetCategory = "Lainnya";
            }
        });

        // Delete data budget
        delete data.budget[name];

        localStorage.setItem("data", JSON.stringify(data));
        window.location.reload();
    });

    if (name === "Lainnya") {
        updateButton.disabled = true;
        deleteButton.disabled = true;
        updateButton.classList.add("cursor-not-allowed");
        deleteButton.classList.add("cursor-not-allowed");
    }

    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(deleteButton);

    tableRow.appendChild(transactionName);
    tableRow.appendChild(transactionType);
    tableRow.appendChild(transactionDate);
    tableRow.appendChild(transactionAmount);
    tableRow.appendChild(buttonContainer);

    return tableRow;
}

export function printDetailBudget() {
    const budgetTable = document.getElementById("budget-detail-table");
    const budget = getAllBudget();
    const totalTransactionPerBudget = getTransactionPerBudget();
    const budgetNames = Object.keys(budget);

    budgetNames.forEach((name) => {
        const tableRow = createBudgetTableRow(
            name,
            budget[name],
            totalTransactionPerBudget
        );
        budgetTable.appendChild(tableRow);
    });
}

export function createTransactionTableRow(transaction) {
    const tableRow = document.createElement("tr");

    const transactionName = document.createElement("th");
    transactionName.setAttribute("scope", "row");
    transactionName.classList.add("px-6", "py-4", "font-medium");
    transactionName.textContent = transaction.budgetCategory;

    const transactionType = document.createElement("td");
    transactionType.classList.add("px-6", "py-4");
    transactionType.textContent = transaction.type;

    const transactionDate = document.createElement("td");
    transactionDate.classList.add("px-6", "py-4");
    const transactionDateTime = new Date(transaction.date);
    transactionDate.textContent = transactionDateTime.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const transactionAmount = document.createElement("td");
    if (transaction.type === "Pemasukan") {
        transactionAmount.classList.add(
            "font-medium",
            "text-base",
            "text-plus"
        );
    } else {
        transactionAmount.classList.add(
            "font-medium",
            "text-base",
            "text-minus"
        );
    }
    transactionAmount.textContent =
        "Rp. " + parseInt(transaction.amount).toLocaleString();

    tableRow.appendChild(transactionName);
    tableRow.appendChild(transactionType);
    tableRow.appendChild(transactionDate);
    tableRow.appendChild(transactionAmount);

    return tableRow;
}

export function printAllTransaction() {
    const transactionTable = document.getElementById("transaction-table");
    const transactions = getAllTransactions();

    transactions.forEach((transaction) => {
        const tableRow = createTransactionTableRow(transaction);
        transactionTable.appendChild(tableRow);
    });
}
