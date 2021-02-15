import Chart from 'chart.js';
import './donut-chart.scss';

class DonutChart {
  constructor(container, options, backgroundColors) {
    this.container = container;
    this.items = options.items.reverse();
    this.text = options.text;
    this.backgroundColor = backgroundColors;
    this.initDiagram();
    this.createText();
  }

  getOptions(optionsType) {
    const result = [];
    this.totalCount = 0;
    this.items.forEach((item) => {
      if (optionsType === 'count') {
        result.push(item.count);
        this.totalCount += item.count;
      } else if (optionsType === 'text') {
        result.push(item.text);
      }
    });
    return result;
  }

  createText() {
    const chartText = this.container.parentElement.querySelector(
      '.js-chart__text'
    );
    const chartTextCount = this.container.parentElement.querySelector(
      '.js-chart__count'
    );
    chartText.innerHTML = `${this.setRightName(
      this.totalCount,
      this.text.split('|')
    )}`;
    chartTextCount.innerHTML = `${this.totalCount}`;
    this.setTextPosition();
  }

  setTextPosition() {
    const textContainer = this.container.parentElement.querySelector(
      '.js-chart__info'
    );
    textContainer.style.left = `${
      (this.container.offsetWidth - textContainer.offsetWidth) / 2
    }px`;
  }

  setRightName(num, arrItemName) {
    num = Math.abs(num) % 100;
    const num1 = num % 10;
    if (num > 10 && num < 20) {
      return arrItemName[2];
    }
    if (num1 > 1 && num1 < 5) {
      return arrItemName[1];
    }
    if (num1 == 1) {
      return arrItemName[0];
    }
    return arrItemName[2];
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
