import {
    getTransactionsPerDay,
    getTotalIncomePerDay,
    getTotalExpensesPerDay,
} from "./model.js";

const incomePerDay = getTotalIncomePerDay();
const expensesPerDay = getTotalExpensesPerDay();
const transactionPerDay = getTransactionsPerDay();

const date = Object.keys(transactionPerDay).sort().slice(-7);
const income = [];
const expenses = [];

date.forEach((day) => {
    income.push(incomePerDay[day] || 0);
    expenses.push(expensesPerDay[day] || 0);
});

var options = {
    series: [
        {
            name: "Pemasukan",
            data: income,
        },
        {
            name: "Pengeluaran",
            data: expenses,
        },
    ],
    chart: {
        type: "bar",
        height: 350,
        fontFamily: "Inter, sans-serif",
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            borderRadius: 8,
            columnWidth: "45px",
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 5,
        colors: ["transparent"],
    },
    colors: ["#1A16F3", "#FCAA0B"],
    grid: {
        show: false,
    },
    xaxis: {
        categories: date,
        axisBorder: {
            show: false,
        },

        tickPlacement: "between",
        labels: {
            show: true,
            style: {
                colors: "#718EBF",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            },
            offsetX: 0,
            offsetY: 0,
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: true,
            formatter: function (val) {
                return val.toLocaleString();
            },
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "Rp. " + val.toLocaleString() + ",-";
            },
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: 16,
        fontFamily: "Inter",
        markers: {
            width: 15,
            height: 15,
            radius: 5,
        },
    },
};

var chart = new ApexCharts(document.querySelector("#column-chart"), options);
chart.render();
