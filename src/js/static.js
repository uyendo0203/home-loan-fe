const demo = () => 'Webpack Boilerplate v5.16.0 - SASS/PostCSS, ES6/7, browser sync, source code listing and more.';

// eslint-disable-next-line no-console
console.log(demo());


const swiperHome1 = new Swiper('.swiper-home-1', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,

  // If we need pagination
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});
const swiperHome4 = new Swiper('.swiper-home-4', {
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this)
    .parent()
    .next();

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li")
    .eq($("fieldset").index(next_fs))
    .addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate({
    opacity: 0
  }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = now * 50 + "%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        transform: "scale(" + scale + ")"
      });
      next_fs.css({
        left: left,
        opacity: opacity
      });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: "easeInOutBack"
  });
});

$(".previous").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this)
    .parent()
    .prev();

  //de-activate current step on progressbar
  $("#progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate({
    opacity: 0
  }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = (1 - now) * 50 + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        left: left
      });
      previous_fs.css({
        transform: "scale(" + scale + ")",
        opacity: opacity
      });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: "easeInOutBack"
  });
});

$(".submit").click(function () {
  console.log('submit');
  return false
});



var rangeSlider = function () {
  var slider = $('.range-slider'),
    range = $('.range-slider__range'),
    value = $('.range-slider__value');

  let type = slider.data('type')


  slider.each(function () {

    value.each(function () {
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function () {
      console.log(222);
      console.log($(this)[0].className);

      let classX = $(this)[0].className
      if (classX === 'range-slider__range percent') {
        $(this).next(value).html(this.value + '%');
      } else {
        $(this).next(value).html('$' + this.value);

      }
    });
  });
};

rangeSlider();