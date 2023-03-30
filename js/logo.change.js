var initialSrc = "images/logo-main-big.svg";
var scrollSrc = "images/logo-main-white-big.svg";

$(window).scroll(function() {
   var value = $(this).scrollTop();
   if (value > 100)
      $(".logoChange").attr("src", scrollSrc);
   else
      $(".logoChange").attr("src", initialSrc);
});