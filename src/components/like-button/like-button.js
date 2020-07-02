import "./like-button.scss";

const element = document.querySelectorAll(".like-button");
element.forEach((el) => {
  el.onclick = () => {
    const count = el.firstChild;
    if (el.classList.contains("like-button_active")) {
      el.classList.remove("like-button_active");
      count.innerHTML = Number(count.innerHTML) - 1;
    } else {
      el.classList.add("like-button_active");
      count.innerHTML = Number(count.innerHTML) + 1;
    }
  };
});
