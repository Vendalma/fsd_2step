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
    this.clickClearButton()
    this.clickApplyButton()
    this.checkActiveDropdown()
  }

  init() {
    this.select_container = this.container.querySelector(
      '.js-dropdown__select-container'
    );
    this.select_list = this.container.querySelector(
      '.js-dropdown__select-list'
    );
    this.placeholder = this.container.querySelector(
      '.js-dropdown__placeholder'
    );
    this.material_icon = this.container.querySelector(
      '.js-dropdown__material-icons'
    );
    this.item_score = this.container.querySelectorAll('.js-item-count__score');
    this.minuses = this.container.querySelectorAll(
      '.js-item-count__button_min'
    );
    this.pluses = this.container.querySelectorAll(
      '.js-item-count__button_plus'
    );
    if (this.checkTypeDropdown()) {
      this.clear_button = this.container.querySelector(
        '.js-dropdown__clear-button'
      );
      this.apply_button = this.container.querySelector(
        '.js-dropdown__apply-button'
      );
    }
  }
  clickSelectContainer() {
    this.select_container.addEventListener(
      'click',
      this.openContainer.bind(this)
    );
  }
  openContainer() {
    this.select_list.classList.toggle('dropdown__select-list_default');
    this.select_list.classList.toggle('dropdown__select-list_open');

    this.select_container.classList.toggle(
      'dropdown__select-container_default'
    );
    this.select_container.classList.toggle('dropdown__select-container_open');

    this.placeholder.classList.toggle('dropdown__placeholder_default');
    this.placeholder.classList.toggle('dropdown__placeholder_open');

    this.material_icon.classList.toggle('dropdown__material-icons_default');
    this.material_icon.classList.toggle('dropdown__material-icons_open');
  }
  clickMin() {
    this.minuses.forEach((elem) => {
      elem.addEventListener('click', this.onMinClick.bind(this));
    });
  }
  checkMaterialIcons() {
    if (
      this.select_container.classList.contains(
        'dropdown__select-container_open'
      )
    ) {
      this.material_icon.classList.toggle('dropdown__material-icons_default');
      this.material_icon.classList.toggle('dropdown__material-icons_open');
    }
  }
  onMinClick(elem) {
    let score = elem.target.nextElementSibling;
    if (Number(score.innerHTML) > 0) {
      score.innerHTML = Number(score.innerHTML) - 1;
    }
    this.hideMinButton()
    this.hideClearButton();
    this.checkCorrectItemName(this.item_score);
  }
  hideClearButton() {
    if (this.checkCountScore(this.item_score) && this.checkTypeDropdown()) {
      this.clear_button.classList.add('dropdown__clear-button_hidden');
    }
  }
  setClearButton() {
    if (this.checkTypeDropdown()) {
      this.clear_button.classList.remove('dropdown__clear-button_hidden');
    }
  }
  hideMinButton() {
    this.minuses.forEach((elem) => {
      let score = elem.nextElementSibling;
      if (Number(score.innerHTML) <= 0) {
        elem.classList.add('item-count__button_hidden')
      }
    })
  }
  setMinButton() {
    this.minuses.forEach((elem) => {
      let score = elem.nextElementSibling;
      if (Number(score.innerHTML) > 0) {
        elem.classList.remove('item-count__button_hidden')
      }
    })
  }
  clickMax() {
    this.pluses.forEach((elem) => {
      elem.addEventListener('click', this.onPlusClick.bind(this));
    });
  }
  onPlusClick(elem) {
    let score = elem.target.previousElementSibling;
    score.innerHTML = Number(score.innerHTML) + 1;
    this.setMinButton()
    this.setClearButton();
    this.checkCorrectItemName(this.item_score);
  }
  checkTypeDropdown() {
    return this.container.classList.contains('dropdown-guests');
  }
  setItemNameForGuests(array) {
    let sum = 0;
    let sumChild = 0;

    let str = '';
    let strChild = '';
    for (let elem of array) {
      if (elem.classList.contains('item-count__child')) {
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
      if (elem.classList.contains('item-count__bedrooms')) {
        bedrooms = bedrooms + Number(elem.innerHTML);
      } else if (elem.classList.contains('item-count__beds')) {
        beds = beds + Number(elem.innerHTML);
      } else if (elem.classList.contains('item-count__bathrooms')) {
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

    if (bedrooms == 0 && beds == 0 && bathrooms > 0) {
      this.placeholder.innerHTML = str3;
    } else if (bedrooms == 0 && beds > 0 && bathrooms > 0) {
      this.placeholder.innerHTML = str2 + ', ' + str3;
    } else if (bedrooms > 0 && beds == 0 && bathrooms > 0) {
      this.placeholder.innerHTML = str1 + ', ' + str3;
    } else if (bedrooms > 0 && beds > 0 && bathrooms > 0) {
      this.placeholder.innerHTML = str1 + ', ' + str2 + ', ' + str3;
    } else if (bedrooms > 0 && beds > 0 && bathrooms == 0) {
      this.placeholder.innerHTML = str1 + ', ' + str2 + '...';
    } else if (bedrooms == 0 && beds > 0 && bathrooms == 0) {
      this.placeholder.innerHTML = str2;
    } else if (bedrooms == 0 && beds == 0 && bathrooms == 0) {
      this.placeholder.innerHTML = 'Какие удобства';
    } else if (bedrooms > 0 && beds == 0 && bathrooms == 0) {
      this.placeholder.innerHTML = str1;
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
    for (let elem of this.item_score) {
      elem.innerHTML = 0;
      this.hideClearButton()
      this.checkCorrectItemName(this.item_score);
    }
  }
  clickClearButton() {
    if (this.checkTypeDropdown()) {
      this.clear_button.addEventListener('click', this.onClickClearButton.bind(this))
    }
  }
  onClickClearButton() {
    this.cleanScore()
    this.hideClearButton()
    this.hideMinButton()
  }
  clickApplyButton() {
    if (this.checkTypeDropdown()) {
      this.apply_button.addEventListener('click', this.openContainer.bind(this))
    }
  }
  checkActiveDropdown() {
    if (!this.checkCountScore(this.item_score)) {
      this.checkCorrectItemName(this.item_score);
      this.setClearButton()
      this.setMinButton()
    }
  }
}

let dropdown = document.querySelectorAll('.js-dropdown');
dropdown.forEach((elem) => {
  return new Dropdown(elem);
});
