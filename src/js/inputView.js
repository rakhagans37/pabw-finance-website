import { getRemainBudget, getAllBudget } from "./model.js";

document.getElementById("budget-remain").innerHTML =
    "Rp. " + getRemainBudget().toLocaleString();

document.getElementById("budget-amount").onchange = function () {
    if (this.value > getRemainBudget()) {
        document.getElementById("budgeting-submit").disabled = true;
        document.getElementById("error-budgeting-nominal").innerHTML =
            "Sisa saldo tidak mencukupi";
    } else if (this.value <= 0) {
        document.getElementById("budgeting-submit").disabled = true;
        document.getElementById("error-budgeting-nominal").innerHTML =
            "Nominal tidak harus lebih besar dari 0";
    } else {
        document.getElementById("budgeting-submit").disabled = false;
        document.getElementById("error-budgeting-nominal").innerHTML = "";
    }
};

document.getElementById("expense-amount").onchange = function () {
    if (this.value <= 0) {
        document.getElementById("expense-submit").disabled = true;
        document.getElementById("error-expense-nominal").innerHTML =
            "Nominal tidak harus lebih besar dari 0";
    } else {
        document.getElementById("expense-submit").disabled = false;
        document.getElementById("error-expense-nominal").innerHTML = "";
    }
};

document.getElementById("income-amount").onchange = function () {
    if (this.value <= 0) {
        document.getElementById("income-submit").disabled = true;
        document.getElementById("error-income-nominal").innerHTML =
            "Nominal tidak harus lebih besar dari 0";
    } else {
        document.getElementById("income-submit").disabled = false;
        document.getElementById("error-income-nominal").innerHTML = "";
    }
};

function printBudgetSelection() {
    const selectElement = document.getElementById("expense-category");
    selectElement.innerHTML = ""; // Clear existing options
    const budget = getAllBudget();

    const options = Object.keys(budget).map((key) => {
        return {
            value: key,
            label: key,
        };
    });
    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        selectElement.appendChild(optionElement);
    });
}

printBudgetSelection();
