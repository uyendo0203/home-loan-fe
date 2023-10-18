$(window).scroll(function () {
  if ($(window).scrollTop() >= $('.header').innerHeight()) {
    $('.header').addClass('fixed-header');
  } else {
    $('.header').removeClass('fixed-header');
  }
});

$(document).ready(function () {

  $('.loading').removeClass('active')


  $('.toast .close').click(function () {
    $('#toast-simple').removeClass('active')
  })
  $('.hambuger').click(function () {
    $(this).closest('.header').toggleClass('active')
  })

  // form contact 
  function isValidForm(form) {
    isValid = true;
    var REX_IS_NUMBER = new RegExp('^[0-9]*$');
    var REX_LOWERCASE = new RegExp('(?=.*[a-z])');
    var REX_UPPERCASE = new RegExp('(?=.*[A-Z])');
    var REX_NUMBER = new RegExp('(?=.*[0-9])');
    var REX_SPECIAL = new RegExp('(?=.[!@#\$%\^&])');
    var REX_INTERGER = new RegExp('^[0-9]*$');
    var REX_PHONE = new RegExp('^(0|84)[0-9]*$');
    var REX_EMAIL = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var REX_URL = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i);


    form.forEach(function (input) {
      var value = $(input.name).val();
      input.validators.forEach(function (validator) {
        switch (validator) {
          case 'required':
            if (value === '') {
              isValid = false;
            }
            break;
          case 'isNumber':
            if (REX_IS_NUMBER.test(value) === false) {
              isValid = false;
            }
            break;
          case 'min':
            if (+value < input.min) {
              isValid = false;
            }
            break;
          case 'max':
            if (+value > input.max) {
              isValid = false;
            }
            break;
          case 'minLength':
            if (value.length < input.minLength) {
              isValid = false;
            }
            break;
          case 'maxLength':
            if (value.length > input.maxLength) {
              isValid = false;
            }
            break;
          case 'email':
            if (REX_EMAIL.test(value) === false) {
              isValid = false;
            }
            break;
        }
      });
    });

    return isValid;
  }

  function validateForm($submit, form) {

    function updateView() {
      $($submit).attr("disabled", !isValidForm(form));
    }

    var arrElement = [];
    form.forEach(function (element) {
      arrElement.push(element.name);
    });

    $(arrElement.join(",")).on("change keyup", function () {
      updateView();
    });
    updateView();
  }

  let contactValidateForm = function () {
    console.log('contactValidateForm');
    var form = [{
      name: '.contact .firstname',
      validators: ['required']
    }, {
      name: '.contact .lastname',
      validators: ['required']
    }, {
      name: '.contact .phone',
      validators: ['required', 'isNumber'],
    }, {
      name: '.contact .email',
      validators: ['required']
    }]
    var $submit = ".contact .submit";
    validateForm($submit, form);
  }
  contactValidateForm()
  //end form contact 


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
    $('.step-3 .next').attr('disabled', true);
    if ($(this).is(":checked")) {
      $(this).closest('.group').find('.group-parent input').prop('checked', true);
      $(this).closest('.big-group').find('.privateGroup').attr('disabled', true);

    } else {
      $(this).closest('.group').find('.group-child input').prop('checked', false);
      if (!$('.groupGeneral').is(':checked')) {
        $(this).closest('.big-group').find('.privateGroup').attr('disabled', false);
      }

    }
    enableButtonNextStep3('groupGeneral');

  });
  $('.privateGroup').click(function () {
    $('.step-3 .next').attr('disabled', true);
    if ($(this).is(":checked")) {
      $(this).closest('.group').find('.group-parent input').prop('checked', true);
      $(this).closest('.big-group').find('.groupGeneral').attr('disabled', true);
      //Enable button Next if chidren was checked
      if ($(this).parent().parent().hasClass('group-child')) {
        $('.step-3 .next').attr('disabled', false);
      }
    } else {
      $(this).closest('.group').find('.group-parent input').prop('checked', false);
      if (!$('.privateGroup').is(':checked')) {
        $(this).closest('.big-group').find('.groupGeneral').attr('disabled', false);
      }
    }
    enableButtonNextStep3('privateGroup');
  });

  $('.refinance .next').attr('disabled', 'disabled')
  $('.refinance .submit').attr('disabled', 'disabled')
  // step 1
  step1CheckForNext()
  step2CheckForNext()
  step4CheckForNext()
  step5CheckForNext()

  // display: block;
  // left: 0;
  // opacity: 1;
});

function enableButtonNextStep3(className) {
  //Enable button Next if chidren was checked
  if ($('.group-child').find('.' + className).is(":checked")) {
    $('.step-3 .next').attr('disabled', false);
  }
}

const step1CheckForNext = () => {
  let checkArrStep1 = []
  $("input[name='step1-purpose-check']").change(function () {
    checked = $(this).is(":checked");
    if (checked == true) {
      checkArrStep1.push($(this).val())
    }

    if (checked === false && checkArrStep1.indexOf($(this).val()) != -1)
      checkArrStep1.splice(checkArrStep1.indexOf($(this).val()), 1)

    if (checkArrStep1.length > 0) {
      $('.next[data-no="1"]').removeAttr('disabled')
    } else {
      $('.next[data-no="1"]').attr('disabled', 'disabled')
    }
  });
}
const step2CheckForNext = () => {
  let checkArr = []
  $("input[name='step-2-loan-purpose-check']").change(function () {
    // console.log($(this));
    let checked = $(this).is(":checked");
    // console.log(checked, $(this).val());
    if (checked == true) {
      checkArr.push($(this).val())
    }

    if (checked === false && checkArr.indexOf($(this).val()) != -1)
      checkArr.splice(checkArr.indexOf($(this).val()), 1)

    if (checkArr.length > 0) {
      $('.next[data-no="2"]').removeAttr('disabled')
    } else {
      $('.next[data-no="2"]').attr('disabled', 'disabled')
    }
  });
}
const step4CheckForNext = () => {
  let checkArr1 = [],
    checkArr2 = [];

  let isCheck1 = false,
    isCheck2 = false;

  // const isCheckFunc = (item, arr, variableCheck) => {
  //   let checked = item.is(":checked");
  //   if (checked == true) {
  //     arr.push(item.val())
  //   }

  //   if (checked === false && arr.indexOf(item.val()) != -1) {
  //     arr.splice(arr.indexOf(item.val()), 1)
  //   }

  //   if (arr.length > 0) {
  //     variableCheck = true
  //   } else {
  //     variableCheck = false
  //   }

  //   if (isCheck1 == true && isCheck2 == true) {
  //     $('.next[data-no="4"]').removeAttr('disabled')
  //   } else {
  //     $('.next[data-no="4"]').attr('disabled', 'disabled')
  //   }
  // }

  $('input[name="step-4-any-other-source-of-income"]').change(function () {
    // isCheckFunc($(this), checkArr1, isCheck1)

    let checked = $(this).is(":checked");
    if (checked == true) {
      checkArr1.push($(this).val())
    }

    if (checked === false && checkArr1.indexOf($(this).val()) != -1) {
      checkArr1.splice(checkArr1.indexOf($(this).val()), 1)
    }

    if (checkArr1.length > 0) {
      isCheck1 = true
    } else {
      isCheck1 = false
    }

    if (isCheck1 == true && isCheck2 == true) {
      $('.next[data-no="4"]').removeAttr('disabled')
    } else {
      $('.next[data-no="4"]').attr('disabled', 'disabled')
    }

  })
  $('input[name="step-4-current-commitment"]').change(function () {
    // isCheckFunc($(this), checkArr2, isCheck2)

    let checked = $(this).is(":checked");
    if (checked == true) {
      checkArr2.push($(this).val())
    }

    if (checked === false && checkArr2.indexOf($(this).val()) != -1) {
      checkArr2.splice(checkArr2.indexOf($(this).val()), 1)
    }

    if (checkArr2.length > 0) {
      isCheck2 = true
    } else {
      isCheck2 = false
    }

    if (isCheck1 == true && isCheck2 == true) {
      $('.next[data-no="4"]').removeAttr('disabled')
    } else {
      $('.next[data-no="4"]').attr('disabled', 'disabled')
    }


  })


}
const step5CheckForNext = () => {

  let isCheckTime, isCheckLang, isCheckInput = {
    name: false,
    email: false,
    phone: false
  };
  let arrCheckTime = [],
    arrCheckLang = [];

  const allCheckOk = () => {
    // isCheckTime == true && isCheckLang == true && 
    if (isCheckTime == true && isCheckLang == true && isCheckInput.name == true && isCheckInput.email == true && isCheckInput.phone == true) {
      $('.submit[data-no="5"]').removeAttr('disabled')
    } else {
      $('.submit[data-no="5"]').attr('disabled', 'disabled')
    }
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }


  $('input[name="step-5-time-contact"]').change(function () {

    let checked = $(this).is(":checked");
    if (checked == true) {
      arrCheckTime.push($(this).val())
    }

    if (checked === false && arrCheckTime.indexOf($(this).val()) != -1) {
      arrCheckTime.splice(arrCheckTime.indexOf($(this).val()), 1)
    }

    if (arrCheckTime.length > 0) {
      isCheckTime = true
    } else {
      isCheckTime = false
    }

    allCheckOk()
  })
  $('input[name="step-5-language"]').change(function () {

    let checked = $(this).is(":checked");
    if (checked == true) {
      arrCheckLang.push($(this).val())
    }

    if (checked === false && arrCheckLang.indexOf($(this).val()) != -1) {
      arrCheckLang.splice(arrCheckLang.indexOf($(this).val()), 1)
    }

    if (arrCheckLang.length > 0) {
      isCheckLang = true
    } else {
      isCheckLang = false
    }

    allCheckOk()

  })

  $('input[name="step-5-name"]').on("change keyup", function () {
    let value = $(this).val()
    isCheckInput.name = false

    if (value.trim() !== "") {
      isCheckInput.name = true
    }
    allCheckOk()

  })
  $('input[name="step-5-email"]').on("change keyup", function () {
    let value = $(this).val()
    isCheckInput.email = false
    let isCheckMail = isEmail(value)
    let isNull = false

    if (value.trim() !== "") {
      isNull = true
    }

    if (isCheckMail === true && isNull === true) {
      isCheckInput.email = true
    }

    allCheckOk()

  })
  $('input[name="step-5-phone"]').on("change keyup", function () {
    let value = $(this).val()
    isCheckInput.phone = false

    if (value.trim() !== "") {
      isCheckInput.phone = true
    }
    allCheckOk()

  })
}

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

      let step2IsThereAnyOtherBorrower = $('input[name="step-2-is-there-any-other-borrower"]:checked').val();
      console.log({
        step2IsThereAnyOtherBorrower
      });
      MainObject.step2 = {
        "is-there-any-other-borrower": step2IsThereAnyOtherBorrower,
        "loan-purpose": dataLoanPurpose,
        "current-loan-amount": dataCurrentLoanAmount,
        "current-interest-rate": dataCurrentInterestRate,
        "estimate-value-property": dataEstimateBalueProperty,
      }

      if (parseInt(step2IsThereAnyOtherBorrower) == 0) { //0:false, 1:true
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

    let group = {
      group1: [],
      group2: [],
      group3: [],
    }

    let mergeMap = function (temps) {
      let fake = [];
      elementTemp = '';
      for (let i = 0; i < temps.length; i++) {
        if (parseInt(temps[i])) {
          let arrayGroup = [];
          arrayGroup.push(temps[i]);
          elementTemp = parseInt(temps[i]);
          fake.push(arrayGroup);
        } else {
          for (let j = 0; j < fake.length; j++) {
            if (parseInt(fake[j]) == parseInt(elementTemp)) {
              let a = fake[j];
              a.push(temps[i]);
              fake[j] = a;
            }
          }
        }
      }

      fake.forEach((item, index) => {
        item.shift()
      })

      return fake

    }

    if (dataNo == 3) {
      $('.big-group-1 .groupGeneral').each(function () {
        if ($(this).is(':checked')) {
          dataStep3.borrower1.push($(this).val() == 1 || $(this).val() == 2 || $(this).val() == 3 ? parseInt($(this).val()) : $(this).val())
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


      dataStep3.borrower1 = mergeMap(dataStep3.borrower1)
      dataStep3.borrower2 = mergeMap(dataStep3.borrower2)


      console.log('dataStep3', dataStep3);


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

  $(".refinance .submit").click(function () {

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