import "./field.scss";

let $mask = $(".js-text-field").find(".js-text-field__input_mask");
var Inputmask = require("inputmask");

var im = new Inputmask("99.99.9999", { "placeholder": "ДД/ММ/ГГГГ" });
im.mask($mask);
