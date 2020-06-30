import "./field.scss";

let mask_field = document.querySelector(".text-field__input_mask");
var Inputmask = require("inputmask");

var im = new Inputmask("99.99.9999");
im.mask(mask_field);
