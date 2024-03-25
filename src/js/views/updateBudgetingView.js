import { getRemainBudget, getAllBudget } from "../models/model.js";

const searchParams = new URLSearchParams(window.location.search);
const paramName = searchParams.get("budgetName");
const budget = getAllBudget();

document.getElementById("budget-category").value = paramName;
document.getElementById("budget-amount").value = budget[paramName].amount;

// Print Budget Remain
document.getElementById("budget-remain").innerHTML =
    "Rp. " + getRemainBudget().toLocaleString();

document.getElementById("amount-type").onchange = function () {
    if (
        this.value === "percentage" &&
        (document.getElementById("budget-amount").value <= 0 ||
            document.getElementById("budget-amount").value > 100)
    ) {
        document.getElementById("budgeting-submit").disabled = true;
        document.getElementById("error-budgeting-nominal").innerHTML =
            "Nominal harus lebih besar dari 0 dan kurang dari 100";
    } else if (
        document.getElementById("budget-amount").value > getRemainBudget()
    ) {
        document.getElementById("budgeting-submit").disabled = true;
        document.getElementById("error-budgeting-nominal").innerHTML =
            "Sisa saldo tidak mencukupi";
    } else {
        document.getElementById("budgeting-submit").disabled = false;
        document.getElementById("error-budgeting-nominal").innerHTML = "";
    }
};

document.getElementById("budget-amount").onchange = function () {
    if (this.value > getRemainBudget()) {
        document.getElementById("budgeting-submit").disabled = true;
        document.getElementById("error-budgeting-nominal").innerHTML =
            "Sisa saldo tidak mencukupi";
    } else if (document.getElementById("amount-type").value === "percentage") {
        if (this.value <= 0 || this.value > 100) {
            document.getElementById("budgeting-submit").disabled = true;
            document.getElementById("error-budgeting-nominal").innerHTML =
                "Nominal harus lebih besar dari 0 dan kurang dari 100";
        } else {
            document.getElementById("budgeting-submit").disabled = false;
            document.getElementById("error-budgeting-nominal").innerHTML = "";
        }
    } else if (this.value <= 0) {
        document.getElementById("budgeting-submit").disabled = true;
        document.getElementById("error-budgeting-nominal").innerHTML =
            "Nominal tidak harus lebih besar dari 0";
    } else {
        document.getElementById("budgeting-submit").disabled = false;
        document.getElementById("error-budgeting-nominal").innerHTML = "";
    }
};
