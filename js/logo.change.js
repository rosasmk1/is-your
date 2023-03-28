var initialSrc = "images/logo-main.svg";
var scrollSrc = "images/logo-white.svg";

$(window).scroll(function() {
   var value = $(this).scrollTop();
   if (value > 100)
      $(".logoChange").attr("src", scrollSrc);
   else
      $(".logoChange").attr("src", initialSrc);
});