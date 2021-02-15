import Chart from 'chart.js';
import './donut-chart.scss';

class DonutChart {
  constructor(container, options) {
    this.container = container;
    this.options = options.items.reverse();
    this.initDiagram();
  }

  getOptions(optionsType) {
    const result = [];
    this.options.forEach((item) => {
      if (optionsType === 'count') {
        result.push(item.count);
      } else if (optionsType === 'text') {
        result.push(item.text);
      }
    });
    return result;
  }

  createColors() {
    const chartColors = this.container.getContext('2d');
    const colors = [];
    const backgroundDisappointed = chartColors.createLinearGradient(
      0,
      0,
      0,
      600
    );
    backgroundDisappointed.addColorStop(0, '#919191');
    backgroundDisappointed.addColorStop(1, '#3d4975');
    colors.push(backgroundDisappointed);

    const backgroundSatisfactory = chartColors.createLinearGradient(
      0,
      0,
      0,
      600
    );
    backgroundSatisfactory.addColorStop(0, '#bc9cff');
    backgroundSatisfactory.addColorStop(1, '#8ba4f9');
    colors.push(backgroundSatisfactory);

    const backgroundGood = chartColors.createLinearGradient(0, 0, 0, 600);
    backgroundGood.addColorStop(0, '#6fcf97');
    backgroundGood.addColorStop(1, '#66d2ea');
    colors.push(backgroundGood);

    const backgroundExcellent = chartColors.createLinearGradient(0, 0, 0, 600);
    backgroundExcellent.addColorStop(0, '#ffe39c');
    backgroundExcellent.addColorStop(1, '#ffba9c');
    colors.push(backgroundExcellent);

    return colors;
  }

  initDiagram() {
    new Chart(this.container, {
      type: 'doughnut',
      data: {
        labels: this.getOptions('text'),
        datasets: [
          {
            data: this.getOptions('count'),
            backgroundColor: this.createColors(),
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

          custom: function ({ opacity, yAlign, body, caretX, caretY }) {
            let tooltipEl = document.getElementById('chartjs-tooltip');
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
              tooltipEl.classList.add('chart__diagram-label');
            }

            if (opacity === 0) {
              tooltipEl.classList.add('chart__diagram-label_hidden');
            } else {
              tooltipEl.classList.remove('chart__diagram-label_hidden');
            }

            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (yAlign) {
              tooltipEl.classList.add(yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            if (body) {
              const bodyLines = body.map(getBody);
              let innerHtml = '<tbody>';
              bodyLines.forEach(function (body) {
                innerHtml += `<tr><td>${body}</td></tr>`;
              });
              innerHtml += '</tbody>';

              const tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }
            const position = this._chart.canvas.getBoundingClientRect();
            tooltipEl.classList.add('chart__diagram-label');
            tooltipEl.style.left = `${
              position.left + window.pageXOffset + caretX
            }px`;
            tooltipEl.style.top = `${
              position.top + window.pageYOffset + caretY
            }px`;
          },
        },
      },
    });
  }
}
export default DonutChart;
