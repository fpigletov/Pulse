const swiper = new Swiper('.swiper', {
    grabCursor: true,
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    spaceBetween: 120,
    autoplay: true,    
    keyboard: {
        enabled: true,
    },
    navigation: {
      nextEl: '.slider__arrow_right',
      prevEl: '.slider__arrow_left',
    },
    pagination: {
        el: ".slider__pagination",
        dynamicBullets: true,
        clickable: true
    }
  });

  $(document).ready(function(){

    //Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('active').siblings().removeClass('active')
          .closest('div.catalog__container').find('div.catalog__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    //Item-Catalog
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.item-catalog__content').eq(i).toggleClass('active');
                $('.item-catalog__info').eq(i).toggleClass('active');
            });
        });
    }

    toggleSlide('.item-catalog__link_more');
    toggleSlide('.item-catalog__link_back');

    //Modal

    //Consultation
    $('[data-modal=consultation]').on('click', function() {
      $('.modals, #consultation').fadeIn('slow');
    });
    //Close
    $('.modal__close').on('click', function() {
      $('.modals, #consultation, #order, #thanks').fadeOut('slow');
    });
   //Order
    $('[data-modal=order]').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__subtitle').text($('.item-catalog__title').eq(i).text());
        $('.modals, #order').fadeIn('slow');
      });
    });
    //Validation    
    function validateForm(form) {
      $(form).validate({
        rules: {
          name:{
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("Введите минимум {0} символа!")
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свой Email",
            email: "Неправильно введен адрес Email"
          }
        }
      });
    }
    validateForm('.consultation__container form');
    validateForm('#consultation form');
    validateForm('#order form');

    //Маска ввода номера 
    $('input[name=phone]').mask('+7 (999) 999-99-99');


    //Отправка писем
    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      }

      $.ajax({
          type: 'POST',
          url: 'mailer/smart.php',
          data: $(this).serialize()
      }).done(function() {
          $(this).find('input').val('');
          $('#consultation, #order').fadeOut();
          $('.modals, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
    });

    //Smooth scroll and Page-Up
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1200) {
      $('.scroll-up').fadeIn();
    } else {
      $('.scroll-up').fadeOut();
    }
  });
  $("a[href^='#']").click(function() {
    let _href = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(_href).offset().top
    }, 800, function(){
  });
  
  });  
  });  

