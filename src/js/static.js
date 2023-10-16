$(document).ready(function () {

  $('.loading').removeClass('active')


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
      type: 'bullets',
      clickable: true,
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });


  formRefinance()

  // Event Step 3: Disable group  Looking for new job
  $('.groupGeneral').click(function () {
    if ($(this).is(":checked")) {
      $(this).closest('.group').find('.group-parent input').prop('checked', true);
      $('.privateGroup').attr('disabled', true);
    } else {
      $(this).parent().parent('.group').find('.group-child').find('input').prop('checked', false);
      if (!$('.groupGeneral').is(':checked')) {
        $('.privateGroup').attr('disabled', false);
      }
    }
  });
  $('.privateGroup').click(function () {
    if ($(this).is(":checked")) {
      $(this).closest('.group').find('.group-parent input').prop('checked', true);
      $('.groupGeneral').attr('disabled', true);
    } else {
      if (!$('.privateGroup').is(':checked')) {
        $('.groupGeneral').attr('disabled', false);
      }
    }
  });


  // $('.load').click(function () {
  //   $('.loading').addClass('active')
  // })

  $('.toast .close').click(function () {
    $('#toast-simple').removeClass('active')
  })

  // $('.toastx').click(function () {
  //   $('#toast-simple').toggleClass('active')
  // })

});

const formRefinance = () => {
  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  let MainObject = {} //all data


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

  $(".next").click(function () {
    if (animating) return false;
    animating = true;

    const dataNo = $(this)[0].dataset.no;
    console.log('dataNo', dataNo)


    let dataStep1 = [];
    if (dataNo == 1) {
      $('.step-1 .checkbox').each(function () {
        let checked = $(this).find('input').is(":checked");

        if (checked === true) {
          let x = $(this).find('input').val()
          dataStep1.push(x)
        }
      })
      MainObject.step1 = dataStep1
    } //end step 1

    let dataLoanPurpose = [];
    if (dataNo == 2) {
      $('.step-2 .loan_purpose').each(function () {
        let checked = $(this).find('input').is(":checked");

        if (checked === true) {
          let x = $(this).find('input').val()
          dataLoanPurpose.push(x)
        }
      })
      // console.log("dataLoanPurpose", dataLoanPurpose);

      let dataCurrentLoanAmount = $('.step-2-current-loan-amount .range-slider__value').text()
      let dataCurrentInterestRate = $('.step-2-current-interest-rate .range-slider__value').text()
      let dataEstimateBalueProperty = $('.step-2-estimate-value-property .range-slider__value').text()


      MainObject.step2 = {
        "loan-purpose": dataLoanPurpose,
        "current-loan-amount": dataCurrentLoanAmount,
        "current-interest-rate": dataCurrentInterestRate,
        "estimate-value-property": dataEstimateBalueProperty,
      }

      var radioValue = $(".step-2 .number-borrower input[name='step-2-is-borrower-radio']:checked").val();
      if (parseInt(radioValue) === 0) { //0:false, 1:true
        $('.big-group-2').hide()
        $('.big-group-1 .big-group__title').hide()
      } else {
        $('.big-group-2').show()
        $('.big-group-1 .big-group__title').show()
      }
    } //end step 2

    let dataStep3 = {
      borrower1: [],
      borrower2: []
    };
    if (dataNo == 3) {

      $('.big-group-1 .groupGeneral').each(function () {
        if ($(this).is(':checked')) {
          dataStep3.borrower1.push($(this).val())
        }
      })
      $('.big-group-1 .privateGroup').each(function () {
        if ($(this).is(':checked')) {
          dataStep3.borrower1.push($(this).val())
        }
      })

      $('.big-group-2 .groupGeneral').each(function () {
        if ($(this).is(':checked')) {
          dataStep3.borrower2.push($(this).val())
        }
      })
      $('.big-group-2 .privateGroup').each(function () {
        if ($(this).is(':checked')) {
          dataStep3.borrower2.push($(this).val())
        }
      })
      MainObject.step3 = dataStep3
    } //end step 3

    let dataCurrentCommitment = [],
      dataAnyOtherSourceOfIncome = [];
    if (dataNo == 4) {
      $('.step-4 .any-other-source-of-income .checkbox').each(function () {
        let checked = $(this).find('input').is(":checked");

        if (checked === true) {
          let x = $(this).find('input').val()
          dataAnyOtherSourceOfIncome.push(x)
        }
      })

      $('.step-4 .current-commitment .checkbox').each(function () {
        let checked = $(this).find('input').is(":checked");

        if (checked === true) {
          let x = $(this).find('input').val()
          dataCurrentCommitment.push(x)
        }
      })
      MainObject.step4 = {
        "current-commitment": dataCurrentCommitment,
        "any-other-source-of-income": dataAnyOtherSourceOfIncome
      }
    } //end step 4


    ////////////////////////////////////////////////////
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

  $(".submit").click(function () {

    $('.loading').addClass('active')
    $('#toast-simple').toggleClass('active')


    let dataTimeContact = [],
      dataLanguagePrefer = [],
      dataInfo = [];

    $('.step-5 .info input').each(function () {
      dataInfo.push($(this).val())
    })

    $('.step-5 .language-prefer .checkbox').each(function () {
      let checked = $(this).find('input').is(":checked");

      if (checked === true) {
        let x = $(this).find('input').val()
        dataLanguagePrefer.push(x)
      }
    })

    $('.step-5 .best-time-to-contact .checkbox').each(function () {
      let checked = $(this).find('input').is(":checked");

      if (checked === true) {
        let x = $(this).find('input').val()
        dataTimeContact.push(x)
      }
    })

    MainObject.step5 = {
      "info": dataInfo,
      "time-contact": dataTimeContact,
      "language-prefer": dataLanguagePrefer,
    }

    console.log("MainObject:", MainObject);

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
        let classX = $(this)[0].className
        if (classX === 'range-slider__range percent') {
          $(this).closest(slider).find(value).html(this.value + '%');
        } else {
          $(this).closest(slider).find(value).html('$' + this.value);
        }
      });
    });
  };
  rangeSlider();

}