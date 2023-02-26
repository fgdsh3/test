
$(function () {

  $('.header__slider').slick({
    Infinite: true,
    slidesToShow: 1,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows-left"src="images/arrow-left.svg" alt="arrowleft"></img>',
    nextArrow: '<img class="slider-arrows slider-arrows-right"src="images/arrow-right.svg" alt="arrowright"></img>',
    asNavFor: '.slider-dotshead',
  });
  $('.slider-dotshead').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.header__slider',
  });
  $('.slider__map').slick({
    Infinite: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    prevArrow: '<img class="slider-arrows slider-arrows-left"src="images/arrow-left.svg" alt="arrowleft"></img>',
    nextArrow: '<img class="slider-arrows slider-arrows-right"src="images/arrow-right.svg" alt="arrowright"></img>',
    asNavFor: '.surf__slider',
    focusOnSelect: true,
  });
  $('.surf__slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<img class="slider-arrows surf__arrow-left"src="images/arrow-left.svg" alt="arrowleft"></img>',
    nextArrow: '<img class="slider-arrows surf__arrow-right"src="images/arrow-right.svg" alt="arrowright"></img>',
    lazyLoad: 'ondemand',
    asNavFor: '.slider__map',
  });
  $('.travel__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: '<img class="slider-arrows travel__arrow-left"src="images/arrow-left.svg" alt="arrowleft"></img>',
    nextArrow: '<img class="slider-arrows travel__arrow-right"src="images/arrow-right.svg" alt="arrowright"></img>',
  });
  $('.sleep__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: '<img class="slider-arrows travel__arrow-left"src="images/arrow-left.svg" alt="arrowleft"></img>',
    nextArrow: '<img class="slider-arrows travel__arrow-right"src="images/arrow-right.svg" alt="arrowright"></img>',
  });
});

