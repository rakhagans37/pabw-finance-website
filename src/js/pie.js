import { getAllBudget } from "./model.js";

const budget = getAllBudget();
const budgetName = Object.keys(budget);
const budgetAmount = Object.values(budget).map((budget) => budget.amount);

console.log(budgetAmount);

var options = {
    series: budgetAmount,
    labels: budgetName,

    chart: {
        type: "donut",
        height: 350,
    },
    legend: {
        show: true,
        position: "bottom",
        markers: {
            width: 20,
            height: 20,
            strokeWidth: 50,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 20,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
        },
    },
    plotOptions: {
        pie: {
            donut: {
                size: "55%",
            },
            expandOnClick: false,
        },
    },
    states: {
        normal: {
            filter: {
                type: "none",
                value: 0,
            },
        },
        hover: {
            filter: {
                type: "darken",
                value: 0.35,
            },
        },
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: "darken",
                value: 0.35,
            },
        },
    },
};
var chart = new ApexCharts(document.querySelector("#pie-chart"), options);
chart.render();
