import './text-field';

const $mask = $('.js-text-field__input_masked');
const Inputmask = require('inputmask');

const inputWithMask = new Inputmask({
  alias: 'datetime',
  inputFormat: 'dd.mm.yyyy',
  placeholder: 'ДД.ММ.ГГГГ',
});
inputWithMask.mask($mask);
