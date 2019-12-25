import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['spendingProgression', 'expensesTotal', 'budgetLimit'],
    data() {
        return {
            totalSpendingData: [],
            arraySpendings: [],
            arrayProjection: [],
            arrayLabels: []
        }
    },
    methods: {
        prepareData() {
            this.arraySpendings.push(...this.spendingProgression.map(period => period.totalSpending))
            this.arrayLabels.push(...this.spendingProgression.map((period) => {
                let date = new Date(period.date)
                return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: '2-digit' })
            }))

            const dates = this.spendingProgression.map(period => period.date)
            const today = new Date(Date.now())
            const lastDate = new Date(dates[dates.length - 1])

            if (today.getDate() === lastDate.getDate()) {
                this.arrayProjection = []
            }
            else if (today.getDate() < lastDate.getDate() && today.getDate() >= 21) {
                console.log((this.arraySpendings[3] + this.arraySpendings[2] / 2))
                this.arrayProjection = [0, this.arraySpendings[1], this.arraySpendings[2], Math.ceil((this.arraySpendings[3] + this.arraySpendings[2] + this.arraySpendings[1] / 3))]
                this.arraySpendings = this.arraySpendings.slice(0, -1)
            }
            else if (today.getDate() < 21 && today.getDate() >= 11) {
                this.arrayProjection = [0, this.arraySpendings[1], this.arraySpendings[1] + this.arraySpendings[1], this.arraySpendings[1] + this.arraySpendings[1] + this.arraySpendings[1]]
                this.arraySpendings = this.arraySpendings.slice(0, 2)
            } else {
                this.arrayProjection = [0, this.arraySpendings[1], this.arraySpendings[1] + this.arraySpendings[1], this.arraySpendings[1] + this.arraySpendings[1] + this.arraySpendings[1]]
                this.arraySpendings = []
            }
        }
    },
    mounted() {
        this.prepareData()
        this.renderChart({
            labels: this.arrayLabels,
            datasets: [{
                label: 'Current Budget',
                data: this.arraySpendings,
                fill: false,
                borderColor: '#F71140',
                backgroundColor: '#F71140',
                borderWidth: 2,
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 15,
                lineTension: 0

            }, {
                label: 'Projection',
                data: this.arrayProjection,
                fill: false,
                borderWidth: 1,
                borderColor: '#BAAED0',
                backgroundColor: '#BAAED0',
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
                    },
                    ticks: {
                        beginAtZero: true,
                        max: Number(this.budgetLimit),
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