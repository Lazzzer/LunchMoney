import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['data'],
    mounted() {
        this.renderChart({
            labels: ['01.11.19', '10.11.19', '20.11.19', '30.11.19'],
            datasets: [{
                label: 'Current Budget',
                data: [0, 50.3, 174.8, 348.2],
                fill: false,
                borderColor: '#F71140',
                borderWidth: 2,
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 15,
                lineTension: 0

            }, {
                label: 'Projection',
                data: [0, 50.3, 174.8, 287.35],
                fill: false,
                borderWidth: 1,
                borderColor: '#BAAED0',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 15,
                lineTension: 0
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
                        color: '#12012F',

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
                    gridLines: {
                        display: true,
                        color: '#12012F'
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 400,
                        min: 0,
                        maxTicksLimit: 8,
                        stepSize: 100,
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
                        if (tooltipItem.datasetIndex === 0) {
                            return data['datasets'][0]['label'] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + ' CHF'
                        } else {
                            return data['datasets'][1]['label'] + ': ' + data['datasets'][1]['data'][tooltipItem['index']] + ' CHF'
                        }
                    }
                }
            }
        })
    }
}