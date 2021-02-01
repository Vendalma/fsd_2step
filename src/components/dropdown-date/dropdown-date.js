import 'air-datepicker';
import 'air-datepicker/dist/js/datepicker';
import '../description/description';
import './dropdown-date.scss';

class DatePicker {
  constructor(container) {
    this.container = container;
    this.init();
  }
  init() {
    if (this.container.classList.contains('js-dropdown-date_inline')) {
      this.inline();
    } else if (this.container.classList.contains('js-dropdown-date_filter')) {
      this.filter();
    } else if (this.container.classList.contains('js-dropdown-date_range')) {
      this.range();
    }
  }

  inline() {
    $('.js-dropdown-date_inline').datepicker({
      range: true,
      multipleDates: true,
      multipleDatesSeparator: ' - ',
      language: 'ru',
      navTitles: {
        days: 'MM yyyy',
      },
      keyboardNav: false,
      clearButton: true,
      prevHtml: '<i class="material--icon">arrow_back</i>',
      nextHtml: '<i class="material--icon">arrow_forward</i>',
      onRenderCell: function (date, cellType) {
        let findCurrentDate =
          date.getDate() == '8' &&
          date.getMonth() == '7' &&
          date.getFullYear() == '2019';
        if (findCurrentDate && cellType == 'day') {
          return {
            classes: 'datepicker--cell -current-',
          };
        }
      },
    });
    this.addButtons($('.js-dropdown-date_inline'));
    this.setDate($('.js-dropdown-date_inline'));
  }

  filter() {
    $('.js-dropdown-date__input_filter').datepicker({
      language: 'ru',
      range: true,
      multipleDates: true,
      multipleDatesSeparator: ' - ',
      dateFormat: 'dd M',
      navTitles: {
        days: 'MM yyyy',
      },
      keyboardNav: false,
      clearButton: true,
      prevHtml: '<i class="material--icon">arrow_back</i>',
      nextHtml: '<i class="material--icon">arrow_forward</i>',
      onSelect: function (fd, d) {
        $('.js-dropdown-date__input_filter').val(fd.toLowerCase());
      },
    });
    this.addButtons($('.js-dropdown-date__input_filter'));
    this.setDate($('.js-dropdown-date__input_filter'));
  }

  range() {
    let start = this.container.querySelector(
      '.js-dropdown-date__input_range-start'
    );
    let end = this.container.querySelector(
      '.js-dropdown-date__input_range-end'
    );
    let picker = $(start).datepicker({
      range: true,
      multipleDates: true,
      multipleDatesSeparator: ' - ',
      language: 'ru',
      navTitles: {
        days: 'MM yyyy',
      },
      keyboardNav: false,
      clearButton: true,
      prevHtml: '<i class="material--icon">arrow_back</i>',
      nextHtml: '<i class="material--icon">arrow_forward</i>',

      onSelect: function (fd, d, picker) {
        $(start).val(fd.split('-')[0]);
        $(end).val(fd.split('-')[1]);
      },
    });
    $(end).on('click', this.showDatepicker.bind(this, $(start)));
    this.addButtons(picker);
    picker.hasClass('js-dropdown-date__setting-date')
      ? this.setDate(picker)
      : null;
  }

  addButtons(elem) {
    let applyButton = document.createElement('span');
    applyButton.setAttribute('data-action', 'hide');
    applyButton.classList.add('datepicker--button');
    applyButton.innerHTML = 'Применить';

    applyButton.addEventListener('click', this.hideDatepicker.bind(this, elem));
    let buttons = elem
      .data('datepicker')
      .$datepicker.find('.datepicker--buttons');

    buttons.append(applyButton);
  }

  showDatepicker(elem) {
    elem.data('datepicker').show();
  }

  hideDatepicker(elem) {
    elem.data('datepicker').hide();
  }
  setDate(elem) {
    elem
      .data('datepicker')
      .selectDate([new Date('2019-08-19'), new Date('2019-08-23')]);
  }
}

let container = document.querySelectorAll('.js-dropdown-date');

container.forEach((elem) => {
  let datePicker = new DatePicker(elem);
});
