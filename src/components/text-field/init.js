import './text-field';

const $element = $('.js-text-field__input_masked');
const Inputmask = require('inputmask');

const maskSettings = new Inputmask({
  alias: 'datetime',
  inputFormat: 'dd.mm.yyyy',
  placeholder: 'ДД.ММ.ГГГГ',
});
maskSettings.mask($element);
