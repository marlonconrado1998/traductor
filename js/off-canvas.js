(function($) {
  'use strict';
  $(function() {
    $('[data-toggle="offcanvas"]').on("click", function() {
      alert("Bien")
      $('.sidebar-offcanvas').toggleClass('active')
    });
  });
})(jQuery);