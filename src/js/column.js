var options = {
    series: [
        {
            name: "Pemasukan",
            data: [44, 55, 57, 56, 61, 58, 63],
        },
        {
            name: "Pengeluaran",
            data: [76, 85, 101, 98, 87, 105, 91],
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
            columnWidth: "42px",
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 10,
        colors: ["transparent"],
    },
    colors: ["#1A16F3", "#FCAA0B"],
    grid: {
        show: false,
    },
    xaxis: {
        categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        axisBorder: {
            show: false,
        },

        tickPlacement: "on",
        labels: {
            show: true,
            style: {
                colors: "#718EBF",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
            },
        },
        crosshairs: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: true,
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "Rp. " + val + ",-";
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
        offsetX: -10,
    },
};

var chart = new ApexCharts(document.querySelector("#column-chart"), options);
chart.render();
