import "./pagination.scss";
import "../../library/simple pagination/jquery.simplePagination";

$(function () {
  $(".pagination").pagination({
    itemsOnPage: 12,
    pages: 15,
    displayedPages: 3,
    edges: 1,
    ellipsePageSet: false,
    nextText: "arrow_forward",
    cssStyle: "light-theme",
  });
});
