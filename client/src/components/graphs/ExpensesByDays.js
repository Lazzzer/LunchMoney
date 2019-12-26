import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: ['data', 'budgetLimit', 'currency'],
    data() {
        return {
            maxPrice: 0
        }
    },
    methods: {
        setMaxPrice() {
            this.maxPrice = Math.ceil(Math.max(...this.data) / 10) * 10
        }
    },
    mounted() {
        this.setMaxPrice()
        this.renderChart({
            labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
            datasets: [{
                label: 'Spendings by day',
                data: this.data,
                backgroundColor: [
                    '#9E0D2B',
                    '#F71140',
                    '#FC9B9B',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                ]
            }]
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
                        max: this.maxPrice,
                        min: 0,
                        maxTicksLimit: 8,
                        stepSize: 10,
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
                    label: (tooltipItem, data) => {
                        return 'Total: ' + (data['datasets'][0]['data'][tooltipItem['index']]).toFixed(2) + ' ' + this.currency
                    }
                }
            }
        })
    }
}