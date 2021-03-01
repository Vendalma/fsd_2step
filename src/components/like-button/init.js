import LikeButton from './LikeButton';

const element = document.querySelectorAll('.js-like-button');
element.forEach((el) => new LikeButton(el));
