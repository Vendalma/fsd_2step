import "./field.scss";
let $mask = $(".js-text-field").find(".js-text-field__input_mask"); const Inputmask = require("inputmask");

var im = new Inputmask({
  alias: "datetime",
  inputFormat: "dd.mm.yyyy",
  placeholder: "ДД.ММ.ГГГГ",
});
im.mask($mask);
