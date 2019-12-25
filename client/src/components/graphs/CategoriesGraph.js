import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: ['numberCategory', 'percentCostCategory'],
    data() {
        return {
            maxPrice: 0
        }
    },
    methods: {

    },
    mounted() {
        this.renderChart({
            datasets: [{
                data: this.percentCostCategory,
                borderColor: '#12012F',
                backgroundColor: [
                    '#9E0D2B',
                    '#F71140',
                    '#FC9B9B',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                    '#273146',
                ],
            },
            {
                data: this.numberCategory,
                borderColor: '#12012F',
                backgroundColor: [
                    '#9E0D2B',
                    '#F71140',
                    '#FC9B9B',
                    '#46BFBD',
                    '#FDB45C',
                    '#949FB1',
                    '#4D5360',
                    '#273146',
                ],
            }],
            labels: [
                'Food',
                'Fast Food',
                'Restaurant',
                'Soft Drink',
                'Alcohol',
                'Shopping',
                'Travel',
                'Other'
            ]
        }, {
            responsive: true,
            maintainAspectRatio: false,

            legend: {
                display: false
            },

            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        if (tooltipItem.datasetIndex === 0) {
                            return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%'
                        } else {
                            return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][1]['data'][tooltipItem['index']]
                        }
                    }
                }
            }

        })
    }
}