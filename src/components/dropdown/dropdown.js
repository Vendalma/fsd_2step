import '../buttons/buttons';
import './dropdown.scss';

class Dropdown {
  constructor(container) {
    this.container = container;
    this.data = {};
    this.init();
    this.clickSelectContainer();
    this.checkMaterialIcons();
    this.clickClearButton();
    this.clickApplyButton();
    this.checkActiveDropdown();
    this.countClick();
  }

  init() {
    this.selectContainer = this.container.querySelector(
      '.js-dropdown__select-container'
    );
    this.selectList = this.container.querySelector('.js-dropdown__select-list');
    this.placeholder = this.container.querySelector(
      '.js-dropdown__placeholder'
    );
    this.materialIcon = this.container.querySelector(
      '.js-dropdown__material-icons'
    );
    this.countContainer = this.container.querySelectorAll(
      '.dropdown__item-count'
    );
    if (this.checkTypeDropdown()) {
      this.clearButton = this.container.querySelector(
        '.js-dropdown__clear-button'
      );
      this.applyButton = this.container.querySelector(
        '.js-dropdown__apply-button'
      );
    }
  }

  clickSelectContainer() {
    this.selectContainer.addEventListener(
      'click',
      this.openContainer.bind(this)
    );
  }

  openContainer() {
    this.selectList.classList.toggle('dropdown__select-list_default');
    if (!this.checkTypeDropdown()) {
      this.selectList.classList.toggle('dropdown__select-list_open-room');
    } else {
      this.selectList.classList.toggle('dropdown__select-list_open-guests');
    }

    this.selectContainer.classList.toggle('dropdown__select-container_default');
    this.selectContainer.classList.toggle('dropdown__select-container_open');

    this.materialIcon.classList.toggle('dropdown__material-icons_default');
    this.materialIcon.classList.toggle('dropdown__material-icons_open');
  }

  checkMaterialIcons() {
    if (
      this.selectContainer.classList.contains('dropdown__select-container_open')
    ) {
      this.materialIcon.classList.toggle('dropdown__material-icons_default');
      this.materialIcon.classList.toggle('dropdown__material-icons_open');
    }
  }

  onMinClick(elem) {
    let score = elem.nextElementSibling;
    if (Number(score.innerHTML) > 0) {
      score.innerHTML = Number(score.innerHTML) - 1;
    }
    if (Number(score.innerHTML) <= 0) {
      this.hideMinButton(elem);
    }
    return Number(score.innerHTML);
  }

  hideMinButton(elem) {
    elem.classList.add('dropdown__item-button_hidden');
  }

  setMinButton(elem) {
    elem.classList.remove('dropdown__item-button_hidden');
  }

  hideClearButton() {
    if (this.checkCountScore() && this.checkTypeDropdown()) {
      this.clearButton.classList.add('dropdown__clear-button_hidden');
    }
  }

  setClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.classList.remove('dropdown__clear-button_hidden');
    }
  }

  onPlusClick(elem) {
    let score = elem.previousElementSibling;
    score.innerHTML = Number(score.innerHTML) + 1;
    this.setMinButton(score.previousElementSibling);
    this.setClearButton();
    return Number(score.innerHTML);
  }

  countClick() {
    this.countContainer.forEach((item) => {
      item.addEventListener('click', this.onCountClick.bind(this));
      if (!this.data[item.dataset.num]) {
        this.data[item.dataset.num] = {};
        this.data[item.dataset.num].name = item.dataset.name;
      }
    });
  }

  onCountClick(event) {
    let score;
    if (event.target.classList.contains('js-dropdown__item-button_plus')) {
      score = this.onPlusClick(event.target);
    } else if (
      event.target.classList.contains('js-dropdown__item-button_min')
    ) {
      score = this.onMinClick(event.target);
    }
    let num = event.target.parentElement.dataset.num;
    this.data[num].score = score;
    this.renderStr();
  }

  checkTypeDropdown() {
    return this.container.classList.contains('dropdown_guests');
  }

  renderStr() {
    let str = '';
    for (let item in this.data) {
      const { name, score } = this.data[item];
      score > 0 &&
        (str += `${score} ${this.setRightName(score, name.split('|'))}, `);
    }
    if (str === '' && this.checkTypeDropdown()) {
      this.placeholder.innerHTML = 'Сколько гостей';
      this.hideClearButton();
    } else if (str === '' && !this.checkTypeDropdown()) {
      this.placeholder.innerHTML = 'Какие удобства';
      this.hideClearButton();
    } else {
      this.placeholder.innerHTML = str.substring(0, str.length - 2);
    }
  }

  setRightName(num, arrItemName) {
    num = Math.abs(num) % 100;
    var num1 = num % 10;
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

  checkCountScore() {
    for (let item in this.data) {
      if (this.data[item].score > 0) {
        return false;
      }
    }
    return true;
  }

  cleanScore() {
    for (let item in this.data) {
      this.data[item].score = 0;
      this.hideClearButton();
      this.renderStr();
    }
    this.countContainer.forEach((item) => {
      let scoreContainer = item.querySelector('.js-dropdown__item-score');
      scoreContainer.innerHTML = '0';

      let minButtons = item.querySelectorAll('.js-dropdown__item-button_min');
      minButtons.forEach((elem) => {
        this.hideMinButton(elem);
      });
    });
  }

  clickClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.addEventListener(
        'click',
        this.onClickClearButton.bind(this)
      );
    }
  }

  onClickClearButton() {
    this.cleanScore();
    this.hideClearButton();
  }

  clickApplyButton() {
    if (this.checkTypeDropdown()) {
      this.applyButton.addEventListener('click', this.openContainer.bind(this));
    }
  }

  checkActiveDropdown() {
    this.countContainer.forEach((item) => {
      let scoreContainer = item.querySelector('.js-dropdown__item-score');
      let min = item.querySelector('.js-dropdown__item-button_min');
      if (Number(scoreContainer.innerHTML) > 0) {
        this.data[item.dataset.num] = {};
        this.data[item.dataset.num].name = item.dataset.name;
        this.data[item.dataset.num].score = Number(scoreContainer.innerHTML);
        this.setMinButton(min);
        this.setClearButton();
      }
    });
    this.renderStr();
  }
}

let dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => {
  return new Dropdown(elem);
});
