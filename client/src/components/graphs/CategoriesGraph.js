import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: ['data'],
    mounted() {
        this.renderChart({
            datasets: [{
                data: [10, 2, 4, 3, 4, 10, 1, 5],
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
                data: [20, 4, 5, 12, 2, 8, 16, 18],
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