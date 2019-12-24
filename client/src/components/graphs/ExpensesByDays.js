import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: ['data'],
    mounted() {
        this.renderChart({
            labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
            datasets: [{
                label: 'Spendings by day',
                data: [20, 50, 103, 40, 3, 30, 10],
                backgroundColor: [
                    '#9E0D2B',
                    '#F71140',
                    '#FC9B9B',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                ]
            }
            ]
        }, {
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,

                    },
                    ticks: {
                        labelOffset: 2,
                        fontSize: 8,
                        fontColor: '#BAAED0',
                        fontFamily: 'Open Sans',
                        fontStyle: 'italic'
                    }
                }],
                yAxes: [{
                    position: 'right',
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 125,
                        min: 0,
                        maxTicksLimit: 8,
                        stepSize: 25,
                        fontSize: 8,
                        fontColor: '#BAAED0',
                        fontFamily: 'Open Sans',
                        fontStyle: 'italic'
                    }
                }]
            },
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return 'Average: ' + data['datasets'][0]['data'][tooltipItem['index']] + ' CHF'
                    }
                }
            }
        })
    }
}