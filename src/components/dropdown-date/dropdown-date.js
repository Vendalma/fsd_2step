import 'air-datepicker/dist/js/datepicker';
import './dropdown-date.scss';

class DatePicker {
  constructor(container) {
    this.container = container;
    this.init();
  }
  init() {
    if (this.container.classList.contains('js-dropdown-date_type_inline')) {
      this.inline();
    } else if (
      this.container.classList.contains('js-dropdown-date_type_filter')
    ) {
      this.filter();
    } else if (
      this.container.classList.contains('js-dropdown-date_type_range')
    ) {
      this.range();
    }
  }

  inline() {
    $('.js-dropdown-date_type_inline').datepicker({
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
    this.addButtons($('.js-dropdown-date_type_inline'));
    this.setDate($('.js-dropdown-date_type_inline'));
  }

  filter() {
    const filterInput = this.container.querySelector(
      '.js-dropdown-date__input_type_filter'
    );
    $(filterInput).datepicker({
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
        $(filterInput).val(fd.toLowerCase());
      },
      onShow: function (dp, animationCompleted) {
        if (!animationCompleted) {
          if (window.matchMedia('(max-width: 380px)').matches) {
            dp.$datepicker[0].style.maxWidth = `${filterInput.offsetWidth}px`;
          } else {
            dp.$datepicker[0].style.maxWidth = `320px`;
          }
        }
      },
    });
    this.addButtons($(filterInput));
    this.setDate($(filterInput));
  }

  range() {
    const start = this.container.querySelector(
      '.js-dropdown-date__input_type_range-start'
    );
    const end = this.container.querySelector(
      '.js-dropdown-date__input_type_range-end'
    );
    const wrapper = this.container.querySelector('.js-dropdown-date__wrapper');
    const picker = $(start).datepicker({
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
      onShow: function (dp, animationCompleted) {
        if (!animationCompleted) {
          dp.$datepicker[0].style.maxWidth = `${wrapper.offsetWidth}px`;
        }
      },
    });

    $(end).on('click', this.showDatepicker.bind(this, $(start)));
    this.addButtons(picker);
    picker.hasClass('dropdown-date__input_with-set-date')
      ? this.setDate(picker)
      : null;
  }

  addButtons(elem) {
    const applyButton = document.createElement('span');
    applyButton.setAttribute('data-action', 'hide');
    applyButton.classList.add('datepicker--button');
    applyButton.innerHTML = 'Применить';

    applyButton.addEventListener('click', this.hideDatepicker.bind(this, elem));
    const buttons = elem
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
export default DatePicker;
