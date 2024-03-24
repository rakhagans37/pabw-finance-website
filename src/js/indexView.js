import {
    getActualAmount,
    getTotalIncomes,
    getTotalExpenses,
    getAllTransactions,
    getTransactionPerBudget,
    getAllBudget,
    getTransactionsPerDay,
} from "./model.js";

document.getElementById("actual-amount").innerHTML =
    "Rp. " + getActualAmount().toLocaleString();

document.getElementById("actual-expenses").innerHTML =
    "Rp. " + getTotalExpenses().toLocaleString();

document.getElementById("actual-incomes").innerHTML =
    "Rp. " + getTotalIncomes().toLocaleString();

document.getElementById("actual-saving").innerHTML =
    "Rp. " + (getTotalIncomes() - getTotalExpenses()).toLocaleString();

function printLastThreeTransaction() {
    const transaction = getAllTransactions();

    for (let index = 0; index < 3; index++) {
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
        transactionImg.alt = "";

        const transactionDetailsDiv = document.createElement("div");
        transactionDetailsDiv.classList.add("flex", "flex-col", "gap-1");

        const transactionName = document.createElement("p");
        transactionName.classList.add("font-medium", "text-base", "text-black");
        transactionName.textContent = transaction[index].budgetCategory;

        const transactionDate = document.createElement("span");
        transactionDate.classList.add(
            "font-normal",
            "text-thirdTitle",
            "text-[15px]"
        );

        const transactionDateTime = new Date(transaction[index].date);
        transactionDate.textContent = transactionDateTime.toLocaleString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        );

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

        if (transaction[index].type == "Pemasukan") {
            transactionAmount.classList.add(
                "font-medium",
                "text-plus",
                "text-base"
            );
        } else {
            transactionAmount.classList.add(
                "font-medium",
                "text-minus",
                "text-base"
            );
        }

        transactionAmount.textContent =
            "Rp. " + parseInt(transaction[index].amount).toLocaleString();

        transactionDiv.appendChild(transactionInfoDiv);
        transactionDiv.appendChild(transactionStatus);
        transactionDiv.appendChild(transactionAmount);

        // Append the transaction div to the desired container element
        // For example:
        document
            .getElementById("three-transaction-container")
            .appendChild(transactionDiv);
    }
}

function printDetailBudget() {
    const budget = getAllBudget();
    var totalTransactionPerBudget = getTransactionPerBudget();
    const budgetName = Object.keys(budget);

    for (const name of budgetName) {
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
        transactionType.textContent =
            "Rp. " + budget[name].amount.toLocaleString();

        const transactionDate = document.createElement("td");
        transactionDate.classList.add("px-6", "py-4");
        transactionDate.textContent =
            "Rp. " +
            totalTransactionPerBudget[name].totalTransaction.toLocaleString();

        const transactionAmount = document.createElement("td");
        transactionAmount.classList.add(
            "px-6",
            "py-4",
            "text-plus",
            "font-medium"
        );
        transactionAmount.textContent =
            "Rp. " +
            totalTransactionPerBudget[name].budgetRemain.toLocaleString();

        const buttonContainer = document.createElement("td");
        buttonContainer.classList.add(
            "px-6",
            "py-4",
            "flex",
            "flex-row",
            "gap-4"
        );

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

        buttonContainer.appendChild(updateButton);
        buttonContainer.appendChild(deleteButton);

        tableRow.appendChild(transactionName);
        tableRow.appendChild(transactionType);
        tableRow.appendChild(transactionDate);
        tableRow.appendChild(transactionAmount);
        tableRow.appendChild(buttonContainer);

        // Append the table row to the desired table element
        // For example:
        document.getElementById("budget-detail-table").appendChild(tableRow);
    }
}

function printAllTransaction() {
    const transactionTable = document.getElementById("transaction-table");
    const transaction = getAllTransactions();

    for (let index = 0; index < transaction.length; index++) {
        const tableRow = document.createElement("tr");

        const transactionName = document.createElement("th");
        transactionName.setAttribute("scope", "row");
        transactionName.classList.add("px-6", "py-4", "font-medium");
        transactionName.textContent = transaction[index].budgetCategory;

        const transactionType = document.createElement("td");
        transactionType.classList.add("px-6", "py-4");
        transactionType.textContent = transaction[index].type;

        const transactionDate = document.createElement("td");
        transactionDate.classList.add("px-6", "py-4");
        const transactionDateTime = new Date(transaction[index].date);
        transactionDate.textContent = transactionDateTime.toLocaleString(
            "en-GB",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

        const transactionAmount = document.createElement("td");
        if (transaction[index].type === "Pemasukan") {
            transactionAmount.classList.add(
                "px-6",
                "py-4",
                "text-plus",
                "font-medium"
            );
        } else {
            transactionAmount.classList.add(
                "px-6",
                "py-4",
                "text-minus",
                "font-medium"
            );
        }
        transactionAmount.textContent =
            "Rp. " + parseInt(transaction[index].amount).toLocaleString();

        tableRow.appendChild(transactionName);
        tableRow.appendChild(transactionType);
        tableRow.appendChild(transactionDate);
        tableRow.appendChild(transactionAmount);

        transactionTable.appendChild(tableRow);
    }
}

printDetailBudget();
printAllTransaction();
printLastThreeTransaction();
