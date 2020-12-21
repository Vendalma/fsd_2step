import '../buttons/buttons';
import './dropdown.scss';

class Dropdown {
  constructor(container) {
    this.container = container;
    this.init();
    this.clickSelectContainer();
    this.clickMin();
    this.clickMax();
    this.checkMaterialIcons();
    this.clickClearButton();
    this.clickApplyButton();
    this.checkActiveDropdown();
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
    this.itemScore = this.container.querySelectorAll(
      '.js-dropdown__item-score'
    );
    this.minuses = this.container.querySelectorAll(
      '.js-dropdown__item-button_min'
    );
    this.pluses = this.container.querySelectorAll(
      '.js-dropdown__item-button_plus'
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

    this.placeholder.classList.toggle('dropdown__placeholder_default');
    this.placeholder.classList.toggle('dropdown__placeholder_open');

    this.materialIcon.classList.toggle('dropdown__material-icons_default');
    this.materialIcon.classList.toggle('dropdown__material-icons_open');
  }
  clickMin() {
    this.minuses.forEach((elem) => {
      elem.addEventListener('click', this.onMinClick.bind(this));
    });
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
    let score = elem.target.nextElementSibling;
    if (Number(score.innerHTML) > 0) {
      score.innerHTML = Number(score.innerHTML) - 1;
    }
    this.hideMinButton();
    this.hideClearButton();
    this.checkCorrectItemName(this.itemScore);
  }
  hideClearButton() {
    if (this.checkCountScore(this.itemScore) && this.checkTypeDropdown()) {
      this.clearButton.classList.add('dropdown__clear-button_hidden');
    }
  }
  setClearButton() {
    if (this.checkTypeDropdown()) {
      this.clearButton.classList.remove('dropdown__clear-button_hidden');
    }
  }
  hideMinButton() {
    this.minuses.forEach((elem) => {
      let score = elem.nextElementSibling;
      if (Number(score.innerHTML) <= 0) {
        elem.classList.add('dropdown__item-button_hidden');
      }
    });
  }
  setMinButton() {
    this.minuses.forEach((elem) => {
      let score = elem.nextElementSibling;
      if (Number(score.innerHTML) > 0) {
        elem.classList.remove('dropdown__item-button_hidden');
      }
    });
  }
  clickMax() {
    this.pluses.forEach((elem) => {
      elem.addEventListener('click', this.onPlusClick.bind(this));
    });
  }
  onPlusClick(elem) {
    let score = elem.target.previousElementSibling;
    score.innerHTML = Number(score.innerHTML) + 1;
    this.setMinButton();
    this.setClearButton();
    this.checkCorrectItemName(this.itemScore);
  }
  checkTypeDropdown() {
    return this.container.classList.contains('dropdown_guests');
  }
  setItemNameForGuests(array) {
    let sum = 0;
    let sumChild = 0;

    let str = '';
    let strChild = '';
    for (let elem of array) {
      if (elem.classList.contains('dropdown__item-score_child')) {
        sumChild = sumChild + Number(elem.innerHTML);
      } else {
        sum = sum + Number(elem.innerHTML);
      }
    }

    if (sum == 1) {
      str = sum + ' гость';
    } else if (sum > 1 && sum <= 4) {
      str = sum + ' гостя';
    } else if (sum >= 5 && sum <= 20) {
      str = sum + ' гостей';
    }

    if (sumChild == 1) {
      strChild = sumChild + ' младенец';
    } else if (sumChild > 1 && sumChild <= 4) {
      strChild = sumChild + ' младенца';
    } else if (sumChild >= 5 && sumChild <= 20) {
      strChild = sumChild + ' младенцев';
    }

    if (sum == 0 && sumChild == 0) {
      this.placeholder.innerHTML = 'Сколько гостей';
    } else if (sum == 0 && sumChild > 0) {
      this.placeholder.innerHTML = strChild;
    } else if (sum > 0 && sumChild == 0) {
      this.placeholder.innerHTML = str;
    } else {
      this.placeholder.innerHTML = str + ', ' + strChild;
    }
  }
  setItemNameForRoom(array) {
    let bedrooms = 0;
    let beds = 0;
    let bathrooms = 0;

    let str1 = '';
    let str2 = '';
    let str3 = '';

    for (let elem of array) {
      if (elem.classList.contains('dropdown__item-score_bedrooms')) {
        bedrooms = bedrooms + Number(elem.innerHTML);
      } else if (elem.classList.contains('dropdown__item-score_beds')) {
        beds = beds + Number(elem.innerHTML);
      } else if (elem.classList.contains('dropdown__item-score_bathrooms')) {
        bathrooms = bathrooms + Number(elem.innerHTML);
      }
    }

    if (bedrooms == 1) {
      str1 = bedrooms + ' спальня';
    } else if (bedrooms > 1 && bedrooms <= 4) {
      str1 = bedrooms + ' спальни';
    } else if (bedrooms >= 5 && bedrooms <= 20) {
      str1 = bedrooms + ' спален';
    }

    if (beds == 1) {
      str2 = beds + ' кровать';
    } else if (beds > 1 && beds <= 4) {
      str2 = beds + ' кровати';
    } else if (beds >= 5 && beds <= 20) {
      str2 = beds + ' кроватей';
    }

    if (bathrooms == 1) {
      str3 = bathrooms + ' ванная комната';
    } else if (bathrooms > 1 && bathrooms <= 4) {
      str3 = bathrooms + ' ванные комнаты';
    } else if (bathrooms >= 5 && bathrooms <= 20) {
      str3 = bathrooms + ' ванных комнат';
    }

    let allRoomsZero = bedrooms === 0 && beds === 0 && bathrooms === 0;

    if (allRoomsZero) {
      this.placeholder.innerHTML = 'Удобства номера';
    } else {
      this.placeholder.innerHTML = str1 + str2 + str3;
    }

    let bedsAndBathrooms = beds > 0 && bathrooms > 0;
    let bedroomsAndBathrooms = bedrooms > 0 && bathrooms > 0;
    let allRoomsNotZero = bedrooms > 0 && beds > 0 && bathrooms > 0;
    let bedroomsAndBed = bedrooms > 0 && beds > 0;

    if (bedrooms == 0 && bedsAndBathrooms) {
      this.placeholder.innerHTML = str2 + ', ' + str3;
    } else if (bedroomsAndBathrooms && beds == 0) {
      this.placeholder.innerHTML = str1 + ', ' + str3;
    } else if (allRoomsNotZero) {
      this.placeholder.innerHTML = str1 + ', ' + str2 + ', ' + str3;
    } else if (bedroomsAndBed && bathrooms == 0) {
      this.placeholder.innerHTML = str1 + ', ' + str2 + '...';
    }
  }
  checkCorrectItemName(array) {
    if (this.checkTypeDropdown()) {
      this.setItemNameForGuests(array);
    } else {
      this.setItemNameForRoom(array);
    }
  }

  checkCountScore(arr) {
    for (let elem of arr) {
      if (Number(elem.innerHTML) > 0) {
        return false;
      }
    }
    return true;
  }
  cleanScore() {
    for (let elem of this.itemScore) {
      elem.innerHTML = 0;
      this.hideClearButton();
      this.checkCorrectItemName(this.itemScore);
    }
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
    this.hideMinButton();
  }
  clickApplyButton() {
    if (this.checkTypeDropdown()) {
      this.applyButton.addEventListener('click', this.openContainer.bind(this));
    }
  }
  checkActiveDropdown() {
    if (!this.checkCountScore(this.itemScore)) {
      this.checkCorrectItemName(this.itemScore);
      this.setClearButton();
      this.setMinButton();
    }
  }
}

let dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => {
  return new Dropdown(elem);
});
