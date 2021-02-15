import ExpandableCheckbox from './expandable-checkbox';
const checkboxLists = document.querySelectorAll('.js-expandable-checkbox');
checkboxLists.forEach((checkboxList) => {
  return new ExpandableCheckbox(checkboxList);
});
