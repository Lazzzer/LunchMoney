import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['data'],
    mounted() {
        this.renderChart({
            labels: ['02.12.19', '9.12.19', '16.12.19', '23.12.19'],
            datasets: [{
                data: [0, 400],
                fill: false,
                borderColor: '#FFF',
                pointBorderWidth: 0

            }]
        }, {
            title: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        borderDash: [6, 2],
                        tickMarkLength: 10
                    },
                    ticks: {
                        fontSize: 9,
                        labelOffset: 2,
                        maxRotation: 0
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: false,
                        suggestedMax: 400,
                        suggestedMin: 0,
                        maxTicksLimit: 5,
                        stepSize: 100,
                        fontSize: 10
                    }
                }]
            },
            legend: {
                display: true
            },
            responsive: false,
            maintainAspectRatio: false
        })
    }
}