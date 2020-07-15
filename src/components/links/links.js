import "./links.scss";

let link_close = document.querySelectorAll(".link__close");

link_close.forEach((link) => {
  let link_block = link.nextElementSibling;
  let material_icon = link.querySelector(".link__material-icons");
  link.addEventListener("click", function (e) {
    e.preventDefault();
    link_block.classList.toggle("link__block_close");
    link_block.classList.toggle("link__block_open");

    material_icon.classList.toggle("link__material-icons_close");
    material_icon.classList.toggle("link__material-icons_open");
    console.log(link_block);
  });
});
