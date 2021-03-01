import ExpandableCheckbox from './ExpandableCheckbox';

const checkboxLists = document.querySelectorAll('.js-expandable-checkbox');
checkboxLists.forEach((checkboxList) => new ExpandableCheckbox(checkboxList));
