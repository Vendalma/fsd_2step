import Like from './like-button';
const element = document.querySelectorAll('.js-like-button');
element.forEach((el) => {
  return new Like(el);
});
