var options = {
    series: [44, 55, 41, 17, 500],
    labels: ["Makanan", "Minuman", "Foya Foya", "Me Time", "Lainnya"],

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
