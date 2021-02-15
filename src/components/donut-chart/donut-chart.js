import Chart from 'chart.js';
import './donut-chart.scss';

class DonutChart {
  constructor(container, options, backgroundColors) {
    this.container = container;
    this.options = options.items.reverse();
    this.backgroundColor = backgroundColors;
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
    const chartContainer = this.container.getContext('2d');
    const resultColors = [];
    this.backgroundColor.forEach((color) => {
      let { name, colors } = color;
      name = chartContainer.createLinearGradient(0, 0, 0, 600);
      name.addColorStop(0, colors[0]);
      name.addColorStop(1, colors[1]);
      resultColors.push(name);
    });
    return resultColors;
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
