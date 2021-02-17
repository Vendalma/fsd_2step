import '@components/button/button';
import './dropdown.scss';

class Dropdown {
  constructor(container) {
    this.container = container;
    this.data = {};
    this.init();
    this.clickOnInput();
    this.clickClearButton();
    this.clickApplyButton();
    this.checkItemScore();
    this.countContainerListener();
  }

  init() {
    this.input = this.container.querySelector('.js-dropdown__input');
    this.selectList = this.container.querySelector('.js-dropdown__select-list');
    this.icon = this.container.querySelector('.js-dropdown__icon');
    this.countContainer = this.container.querySelectorAll('.dropdown__count');
    if (this.checkTypeDropdown()) {
      this.clearButton = this.container.querySelector(
        '.js-dropdown__button_type_clear',
      );
      this.applyButton = this.container.querySelector(
        '.js-dropdown__button_type_apply',
      );
    }
  }

  clickOnInput() {
    this.input.addEventListener('click', this.openContainer.bind(this));
  }

  openContainer() {
    this.selectList.classList.toggle('dropdown__select-list_closed');
    if (!this.checkTypeDropdown()) {
      this.selectList.classList.toggle('dropdown__select-list_opened');
    } else {
      this.selectList.classList.toggle('dropdown__select-list_opened');
    }

    this.input.classList.toggle('dropdown__input_closed');
    this.input.classList.toggle('dropdown__input_opened');

    this.icon.classList.toggle('dropdown__icon_closed');
    this.icon.classList.toggle('dropdown__icon_opened');
  }

  onMinClick(elem) {
    const score = elem.nextElementSibling;
    if (Number(score.innerHTML) > 0) {
      score.innerHTML = `${Number(score.innerHTML) - 1}`;
    }
    if (Number(score.innerHTML) <= 0) {
      this.hideMinButton(elem);
    }
    return Number(score.innerHTML);
  }

  hideMinButton(elem) {
    elem.setAttribute('disabled', 'disabled');
  }

  setMinButton(elem) {
    elem.removeAttribute('disabled');
  }

  hideClearButton() {
    if (this.checkCountProp() && this.checkTypeDropdown()) {
      this.clearButton.classList.add('dropdown__button_hidden');
    }
  }

  setClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.classList.remove('dropdown__button_hidden');
    }
  }

  onPlusClick(elem) {
    const score = elem.previousElementSibling;
    score.innerHTML = `${Number(score.innerHTML) + 1}`;
    this.setMinButton(score.previousElementSibling);
    this.setClearButton();
    return Number(score.innerHTML);
  }

  countContainerListener() {
    this.countContainer.forEach((item) => {
      item.addEventListener('click', this.onCountContainerClick.bind(this));
    });
  }

  onCountContainerClick(event) {
    let score;
    const { id } = event.target.parentElement.dataset;
    if (event.target.classList.contains('js-dropdown__button_type_plus')) {
      score = this.onPlusClick(event.target);
    } else if (
      event.target.classList.contains('js-dropdown__button_type_min')
    ) {
      score = this.onMinClick(event.target);
    }
    this.changeCounterProp(id, score);
    this.renderStr();
  }

  changeCounterProp(counterId, score) {
    Object.defineProperty(this.data[counterId], 'score', {
      value: score,
      writable: true,
    });
  }

  checkTypeDropdown() {
    return this.container.classList.contains('dropdown_type_guests');
  }

  renderStr() {
    let str = '';
    Object.values(this.data).forEach((values) => {
      const { name, score } = values;
      if (score > 0) str += `${score} ${this.setRightName(score, name.split('|'))}, `;
    });
    if (str === '' && this.checkTypeDropdown()) {
      this.input.placeholder = 'Сколько гостей';
      this.hideClearButton();
    } else if (str === '' && !this.checkTypeDropdown()) {
      this.input.placeholder = 'Какие удобства';
    } else {
      this.input.placeholder = str.substring(0, str.length - 2);
    }
  }

  setRightName(num, arrItemName) {
    const calcCount = Math.abs(num) % 100;
    const calcCountRemainder = calcCount % 10;
    if (calcCount > 10 && calcCount < 20) {
      return arrItemName[2];
    }
    if (calcCountRemainder > 1 && calcCountRemainder < 5) {
      return arrItemName[1];
    }
    if (calcCountRemainder === 1) {
      return arrItemName[0];
    }
    return arrItemName[2];
  }

  checkCountProp() {
    return (
      Object.values(this.data).reduce(
        (accumulator, currentValue) => accumulator + currentValue.score,
        0,
      ) === 0
    );
  }

  cleanCounters() {
    Object.values(this.data).forEach((values) => {
      Object.defineProperty(values, 'score', {
        value: 0,
        writable: true,
      });
    });
    this.setScoresRow();
    this.hideClearButton();
    this.renderStr();
  }

  setScoresRow() {
    this.countContainer.forEach((item) => {
      const scoreContainer = item.querySelector('.js-dropdown__score');
      scoreContainer.innerHTML = '0';
      const minButtons = item.querySelectorAll('.js-dropdown__button_type_min');
      minButtons.forEach((elem) => {
        this.hideMinButton(elem);
      });
    });
  }

  clickClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.addEventListener(
        'click',
        this.onClickClearButton.bind(this),
      );
    }
  }

  onClickClearButton() {
    this.cleanCounters();
    this.hideClearButton();
  }

  clickApplyButton() {
    if (this.checkTypeDropdown()) {
      this.applyButton.addEventListener('click', this.openContainer.bind(this));
    }
  }

  checkItemScore() {
    this.countContainer.forEach((item) => {
      const scoreContainer = item.querySelector('.js-dropdown__score');
      this.data[item.dataset.id] = {};
      this.data[item.dataset.id].name = item.dataset.name;
      this.data[item.dataset.id].score = Number(scoreContainer.innerHTML);
      if (Number(scoreContainer.innerHTML) > 0) {
        const min = scoreContainer.previousElementSibling;
        this.setMinButton(min);
        this.setClearButton();
      }
    });
    this.renderStr();
  }
}
export default Dropdown;
