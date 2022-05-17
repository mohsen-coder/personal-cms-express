$(document).ready(function () {

  $('.js-search-button').click(function(){
    $('.js-search-form').fadeIn('slow', function(){
      $(document).click(function(event){
        
        if($(event.target).hasClass('js-search-form') || $(event.target).attr('id') === 'search'){
          return;
        }
        
        $('.js-search-form').fadeOut('slow', function(){
          $(document).off("click");
        });

      })
    })
  });

  



  $(".slide-show").slick({
    dots: true,
    arrows: false,
  });


  $(".most-liked-posts").slick({
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });


  $(".related-posts").slick({
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

});
