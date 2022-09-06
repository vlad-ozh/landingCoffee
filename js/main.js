$(function(){
    $('.popular__items').slick({
      dots: false,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1050,
          settings: {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            centerMode: true,
            centerPadding: '140px',
          },
        },
        {
          breakpoint: 901,
          settings: {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            centerMode: true,
            centerPadding: '100px',
          },
        },
        {
          breakpoint: 781,
          settings: {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            centerMode: false,
          },
        },
      ],
    });

  $('.comments__items').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '270px 0 290px',
    responsive: [
      {
        breakpoint: 1116,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '0',
        },
      },
    ],
  });

  $('.menu__btn').on('click', () => {
    $('.menu__list').toggleClass('menu__list--active');
  });
  
  $('.menu__search-btn').on('click', () => {
    $('.menu__input').toggleClass('menu__input--active');
  });
  
});