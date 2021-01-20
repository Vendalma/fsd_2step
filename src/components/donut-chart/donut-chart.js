import Chart from 'chart.js';
import './donut-chart.scss';
const { chartOptions } = require('./donut-chart.json');

let reverseArr = chartOptions.items.reverse();
function getOptions(optionsType) {
  let result = [];
  reverseArr.forEach((item) => {
    if (optionsType === 'count') {
      result.push(item.count);
    } else if (optionsType === 'text') {
      result.push(item.text);
    }
  });
  return result;
}

const chart = document.querySelector('.js-chart__diagram');
const chartColors = document
  .querySelector('.js-chart__diagram')
  .getContext('2d');

const backgroundDisappointed = chartColors.createLinearGradient(0, 0, 0, 600);
backgroundDisappointed.addColorStop(0, '#919191');
backgroundDisappointed.addColorStop(1, '#3d4975');

const backgroundSatisfactory = chartColors.createLinearGradient(0, 0, 0, 600);
backgroundSatisfactory.addColorStop(0, '#bc9cff');
backgroundSatisfactory.addColorStop(1, '#8ba4f9');

const backgroundGood = chartColors.createLinearGradient(0, 0, 0, 600);
backgroundGood.addColorStop(0, '#6fcf97');
backgroundGood.addColorStop(1, '#66d2ea');

const backgroundExcellent = chartColors.createLinearGradient(0, 0, 0, 600);
backgroundExcellent.addColorStop(0, '#ffe39c');
backgroundExcellent.addColorStop(1, '#ffba9c');

const myChart = new Chart(chart, {
  type: 'doughnut',
  data: {
    labels: getOptions('text'),
    datasets: [
      {
        label: '# of Votes',
        data: getOptions('count'),
        backgroundColor: [
          backgroundDisappointed,
          backgroundSatisfactory,
          backgroundGood,
          backgroundExcellent,
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    cutoutPercentage: 90,
    responsive: false,
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,

      custom: function (tooltipModel) {
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<tbody>';

          bodyLines.forEach(function (body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });
          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();

        tooltipEl.style.opacity = 1;
        tooltipEl.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '5px';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = '13px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.color = '#fff';
        tooltipEl.style.padding = '4px';
        tooltipEl.style.margin = '0px';
        tooltipEl.style.zIndex = '10';
        tooltipEl.style.pointerEvents = 'none';
      },
    },
  },
});
