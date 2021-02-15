import DonutChart from './donut-chart';
const { chartOptions } = require('./donut-chart.json');

const myChart = document.querySelector('.js-chart__diagram');
const chart = new DonutChart(myChart, chartOptions);
