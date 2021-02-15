import './like-button.scss';
class Like {
  constructor(container) {
    this.container = container;
    this.init();
    this.changeCount();
  }

  init() {
    this.count = this.container.querySelector('.js-like-button__count');
    this.like = this.container.querySelector('.js-like-button__like');
  }

  changeCount() {
    this.container.addEventListener('click', this.onContainerClick.bind(this));
  }

  onContainerClick() {
    if (this.container.classList.contains('like-button_active')) {
      this.container.classList.remove('like-button_active');
      this.like.classList.remove('like-button__like_active');
      this.count.innerHTML = Number(this.count.innerHTML) - 1;
    } else {
      this.container.classList.add('like-button_active');
      this.like.classList.add('like-button__like_active');
      this.count.innerHTML = Number(this.count.innerHTML) + 1;
    }
  }
}
export default Like;
