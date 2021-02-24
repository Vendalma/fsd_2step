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
    this.picker = $('.js-dropdown-date_type_inline').datepicker(
      Object.assign(this.settings(), {
        onRenderCell(date, cellType) {
          const findCurrentDate = date.getDate() === 8
            && date.getMonth() === 7
            && date.getFullYear() === 2019;
          if (findCurrentDate && cellType === 'day') {
            return {
              classes: 'datepicker--cell -current-',
            };
          }
          return null;
        },
      }),
    );
    this.addButtons();
    this.setDate();
  }

  filter() {
    const filterInput = this.container.querySelector(
      '.js-dropdown-date__input_type_filter',
    );
    this.picker = $(filterInput).datepicker(
      Object.assign(this.settings(), {
        dateFormat: 'dd M',
        onSelect(fd) {
          $(filterInput).val(fd.toLowerCase());
        },
        onShow(dp, animationCompleted) {
          const pickerContainer = dp.$datepicker[0];
          if (!animationCompleted) {
            if (window.matchMedia('(max-width: 380px)').matches) {
              pickerContainer.style.maxWidth = `${filterInput.offsetWidth}px`;
            } else {
              pickerContainer.style.maxWidth = '320px';
            }
          }
        },
      }),
    );
    this.addButtons();
    this.setDate();
  }

  range() {
    const start = this.container.querySelector(
      '.js-dropdown-date__input_type_range-start',
    );
    const end = this.container.querySelector(
      '.js-dropdown-date__input_type_range-end',
    );
    const wrapper = this.container.querySelector('.js-dropdown-date__wrapper');
    this.picker = $(start).datepicker(
      Object.assign(this.settings(), {
        onSelect(fd) {
          $(start).val(fd.split('-')[0]);
          $(end).val(fd.split('-')[1]);
        },
        onShow(dp, animationCompleted) {
          const pickerContainer = dp.$datepicker[0];
          if (!animationCompleted) {
            pickerContainer.style.maxWidth = `${wrapper.offsetWidth}px`;
          }
        },
      }),
    );

    $(end).on('click', this.showDatepicker.bind(this));
    this.addButtons();
    if (this.picker.hasClass('dropdown-date__input_with-set-date')) {
      this.setDate();
    }
  }

  settings() {
    return {
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
    };
  }

  addButtons() {
    const applyButton = document.createElement('span');
    applyButton.setAttribute('data-action', 'hide');
    applyButton.classList.add('datepicker--button');
    applyButton.textContent = 'Применить';

    applyButton.addEventListener('click', this.hideDatepicker.bind(this));
    const buttons = this.picker
      .data('datepicker')
      .$datepicker.find('.datepicker--buttons');

    buttons.append(applyButton);
  }

  showDatepicker() {
    this.picker.data('datepicker').show();
  }

  hideDatepicker() {
    this.picker.data('datepicker').hide();
  }

  setDate() {
    this.picker
      .data('datepicker')
      .selectDate([new Date('2019-08-19'), new Date('2019-08-23')]);
  }
}
export default DatePicker;
