var chartColors = {
    red: 'rgb(255, 86, 29)',
    orange: 'rgb(251, 162, 127)',
    yellow: 'rgb(251,222,6)',
    green: 'rgb(146,195,51)',
    blue: 'rgb(64,105,166)',
    purple: 'rgb(127,34,147)',
    grey: 'rgb(201, 203, 207)'
};

//let count = 0;
// setInterval(() => {
//     if(count >= testData.length) {
//         count = 0;
//         return;
//     } else {
//         latestData = testData[count];
//         //test(testData[count]);
//         count += 1;
//     }

// }, 1000)

let latestData = {};

function onRefresh(chart) {
    if (!latestData) return;
    let values = [];
    chart.config.data.datasets.forEach(function (dataset) {
        let value = parseFloat((latestData[dataset.label] / 1024 / 1024)).toFixed(5);
        dataset.data.push({
            x: Date.now(),
            y: parseFloat(value)
        });
        values.push(value);

    });
    chart.config.options.scales.yAxes[0].ticks.max = Math.max(...values) + 20;
}

let color = Chart.helpers.color;
let config = {
    type: 'scatter',
    data: {
        datasets: [{
            id: 1,
            label: 'rss',
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            fill: false,
            borderColor: chartColors.red,
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
            showLine: true,
            //borderDash: [8, 4],
            data: []
        }, {
            id: 2,
            label: 'heapTotal',
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            fill: false,
            borderColor: chartColors.blue,
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
            showLine: true,
            //cubicInterpolationMode: 'monotone',
            data: []
        },
        {
            id: 3,
            label: 'heapUsed',
            backgroundColor: chartColors.green,
            borderColor: chartColors.green,
            fill: false,
            borderColor: chartColors.green,
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
            showLine: true,
            //cubicInterpolationMode: 'monotone',
            data: []
        },
        {
            id: 4,
            label: 'external',
            backgroundColor: chartColors.orange,
            borderColor: chartColors.orange,
            fill: false,
            borderColor: chartColors.orange,
            borderWidth: 2,
            pointRadius: 0,
            lineTension: 0,
            showLine: true,
            //cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: true,
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 10
            }
        },
        title: {
            display: true,
            text: 'alt:V Memory Usage',
            fontColor: 'lime'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    pause: false,
                    ttl: undefined,
                    onRefresh: onRefresh
                },
                ticks: {
                    fontColor: 'lime'
                },
                gridLines: {
                    //display: false ,
                    color: "rgba(255,255,255,.1)"
                }
            }],
            yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Memory (MB)',
                    fontColor: 'lime',
                    //type: 'decimal'
                },
                ticks: {
                    fontColor: 'lime',
                    beginAtZero: true,
                    //percision: 5,
                    //stepSize: 5
                },
                gridLines: {
                    //display: false ,
                    color: "rgba(255,255,255,.1)"
                }
            }]
        },
        tooltips: {
            enabled: false,
            mode: 'nearest',
            intersect: false
        },
        // hover: {
        //     enabled: false,
        // 	mode: 'nearest',
        // 	intersect: false
        // }
    }
};

alt.on('graphUpdate', data => {
    latestData = JSON.parse(data);
})
window.onload = function () {
    let ctx = document.getElementById('memUsageChart').getContext('2d');
    window.memoryChart = new Chart(ctx, config);
    alt.emit('graphReady');
};

let colorNames = Object.keys(chartColors);

