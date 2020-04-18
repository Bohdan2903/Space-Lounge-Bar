$(document).ready(function(){   
 const HOUR_STRING = ['ЧАС', 'ЧАСА', 'ЧАСОВ'];
 
 
  

 var canvasWidth = 1500;
 var canvasHeight = 1;

var pCount = 0;


var pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 2000;
var img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0 ; i1 < puffs; i1++)
{
  var puffDelay = i1 * 500; //300 ms between puffs

  for (var i2 = 0 ; i2 < particlesPerPuff; i2++)
  {
    addNewParticle((i2*50) + puffDelay);    
  }
}


draw(new Date().getTime())



function addNewParticle(delay)
{

  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-500,900);

  p.start = new Date().getTime() + delay;
  p.life = 12300;
  p.speedUp = 5;


  p.speedRight = randBetween(0,5);

  p.rot = randBetween(-1,1);
  p.red = Math.floor(randBetween(0,255));
  p.blue = Math.floor(randBetween(0,255));
  p.green = Math.floor(randBetween(0,255));


  p.startOpacity = 0.1
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 10;
  p.growth =30;

  pCollection[pCount] = p;
  pCount++;


}

function draw(startT, totalT)
{
  //Timing
  var timeDelta = new Date().getTime() - startT;
  var stillAlive = false;

  //Grab and clear the canvas
  var c=document.querySelector(".myCanvas");
  var ctx=c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;

  //Loop through particles
  for (var i= 0; i < pCount; i++)
  {    
    //Grab the particle
    var p = pCollection[i];

    //Timing
    var td = new Date().getTime() - p.start;
    var frac = td/p.life

    if (td > 0)
    {
      if (td <= p.life )
      { stillAlive = true; }

      //attributes that change over time
      var newTop = p.top - (p.speedUp * (td/1000));
      var newLeft = p.left + (p.speedRight * (td/1000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1000));
      p.newTop = newTop;
      p.newLeft = newLeft;

      //Draw!
      ctx.fillStyle = 'rgba(150, 150, 150, 0.1)';      
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }



  //Repeat if there's still a living particle
  if (stillAlive)
  {
    requestAnimationFrame(function(){draw(startT,totalT);}); 
  }
  // else
  // {
  //   clog(timeDelta + ": stopped");
  // }
}

function randBetween(n1,n2)
{
  var r = (Math.random() * (n2 - n1)) + n1;
  return r;
}

function randOffset(n, variance)
{
  //e.g. variance could be 0.1 to go between 0.9 and 1.1
  var max = 1 + variance;
  var min = 1 - variance;
  var r = Math.random() * (max - min) + min;
  return n * r;
}

// canvas
  

  
  $('.kolbs-img').click(function(e){
    e.preventDefault();
  });
  
    $('.calc-img').click(function(e){
      e.preventDefault();
    });
  
    $('.colbs').on('click', function () {
      $('.colbs').fadeIn(250);
      $('.colbs-header').removeClass("border-colbs-header");
      $(this).fadeOut(450, summ).parent().find(".colbs-header").addClass("border-colbs-header");
      $('.new-kolba').removeClass().addClass('new-kolba').hide().addClass($(this).attr('data-image')).fadeIn(600);
    });

    $('.calc-img-chasha').on('click', function () {
      $('.calc-img-chasha').fadeIn(250);
      $('.colbs-header').removeClass("border-chasha-header");
      $(this).fadeOut(450, summ).parent().find(".colbs-header").addClass("border-chasha-header");
      $('.new-chasha').removeClass().addClass('new-chasha').hide().addClass($(this).attr('data-image')).fadeIn(600);
    });

    $('.css-radio').on('click', function () {
      $('.css-radio').parent().fadeIn(150);
      $('.css-radio').parent().removeClass('option-radio-active');
      $(this).parent().addClass('option-radio-active');
     
    });

  
    //
    //calculator
      
      $('.form-input').change(function () {

        summ();
      });

  
      function summ() {
        let total=0;
        

        let chashaPrice = 0;
          $('.calc-img-chasha').each(function() {
              if ($(this).css("display") == "none")
              chashaPrice = $(this).attr('data-price');
          });
          
          
          let colbPrice = 0;
          $('.colbs').each(function() {
            if ($(this).css("display") == "none")
            colbPrice = $(this).attr('data-price');
          });
          

          let tabacPrice = $(".calc-handler:checked").attr('data-price');
      
           
            let rangePrice = $('.range').val() * 4;
            
            if($('.range').val() < 2) {
               $(".range-val-text").text($('.range').val()+ ' '+ HOUR_STRING[0]);
            } else if ($('.range').val() >=2 && $('.range').val() < 5) {
              $(".range-val-text").text($('.range').val()+ ' '+ HOUR_STRING[1]);
            } else $(".range-val-text").text($('.range').val()+ " " + HOUR_STRING[2]);

            
             
            total = +rangePrice + +tabacPrice + +chashaPrice + +colbPrice;

             $(".total_price_sum").text(total + " " + "UAH");
             $(".form-price").text("Cумма заказа" + ' '+total + " " + "UAH");
         

      };

// анимаци в области видимости
var windowHeight = $(window).height();
 
	$(document).on('scroll', function() {
		$('.about-img').each(function() {
			var self = $(this),
			height = self.offset().top + self.height();
			if ($(document).scrollTop() + windowHeight >= height-100 ){
        $('.about-img').css('display', 'block');
        self.addClass('bounceInLeft'); 
         $('.wow').css('opacity', '1');
       }

        else{
          $('.about-img').removeClass(' wow bounceInLeft');
          
          
        }
      });

      $('.gallery-item').each(function() {
        var self = $(this),
        height = self.offset().top + self.height();
        if ($(document).scrollTop() + windowHeight >= height-400){
          $('.gallery-wrapper').css('display', 'flex');
          self.addClass(' wow zoomInLeft ');
          $('.gallery-item ').css({'opacity': '1'});
         
         }

          if(($(document).scrollTop() + windowHeight >= height-400)){
            $('.gallery-wrapper-2').css('display', 'none') ;
            $('.wow').removeClass('bounceInLeft');
            $('.gallery-item ').removeClass(' wow zoomInLeft ').addClass(' wow zoomInLeft ');
          
          }
  
          else{
            $('.gallery-item ').removeClass(' wow zoomInLeft ').css('opacity', '0.3');
            self.css('opacity', '0');
            
          }

         
        });
      
});
      $('.arrow-right-photo').click(function(e){
        e.preventDefault();
        $('.gallery-wrapper ').css('display', 'none');
        $('.gallery-wrapper-2 ').css({'opacity': '1', 'display':'flex'});
      });
      $('.arrow-left-photo').click(function(e){
        e.preventDefault();
        $('.gallery-wrapper-2 ').css('display', 'none');
        $('.gallery-wrapper ').css('display', 'flex');
      });
//

$(".img-responsive").click(function(){	// Событие клика на маленькое изображение
  var img = $(this);	// Получаем изображение, на которое кликнули
var src = img.attr('src'); // Достаем из этого изображения путь до картинки
$(".gallery-wrapper, .gallery-wrapper-2").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
         "<div class='popup_bg'></div>"+// Блок, который будет служить фоном затемненным
         "<div class='cl-btn-3'><span class='top'></span> <span class='bot'></span></div>" +
         "<img src='"+src+"' class='popup_img' />"+// Само увеличенное фото
         
         "</div>" ); 
$(".popup").fadeIn(800); // Медленно выводим изображение
$(".cl-btn-3").click(function(){	// Событие клика на затемненный фон	   
  $(".popup").fadeOut(800);	// Медленно убираем всплывающее окно
  setTimeout(function() {	// Выставляем таймер
    $(".popup").remove(); // Удаляем разметку всплывающего окна
  }, 800);
});
});

//menuclick

$(".arrow-right").click(function(e){	
  e.preventDefault();
  if( $(".menu").hasClass('menu-1')){  
    
    $(".menu").removeClass('menu-1').addClass('menu-2 wow zoomInLeft').css({'display':'flex', 'animation-delay': '0.2s', 'opacity':'1'}).removeClass('wow zoomInLeft');
    $(".menu-1").css('display','none');
    $(".cir-2").css('color','rgb(132, 0, 255)');
    $(".cir-3, .cir-1").css('color','whitesmoke');
  }
  else if($(".menu").hasClass('menu-2')){
    $(".menu").removeClass('menu-2').addClass('menu-3 wow zoomInLeft').css({'display':'flex', 'animation-delay': '0.2s', 'opacity':'1'}).removeClass('wow zoomInLeft');
    $(".menu-2").css('display','none');
    $(".cir-2, .cir-1").css('color','whitesmoke');
    $(".cir-3").css('color','rgb(132, 0, 255)');
  }
});


$(".arrow-left").click(function(e){	
  e.preventDefault();
  if( $(".menu").hasClass('menu-3')){ 
    $(".menu").removeClass('menu-3').addClass('menu-2 wow zoomInLeft').css({'display':'flex', 'animation-delay': '0.2s', 'opacity':'1'}).removeClass('wow zoomInLeft');
    $(".menu-3").css('display','none');
    $(".cir-2").css('color','rgb(132, 0, 255)');
    $(".cir-3, .cir-1").css('color','whitesmoke');
  }

  else if($(".menu").hasClass('menu-2')){
    $(".menu").removeClass('menu-2').addClass('menu-1 wow zoomInLeft').css({'display':'flex', 'animation-delay': '0.2s', 'opacity':'1'}).removeClass('wow zoomInLeft');
    $(".menu-2").css('display','none');
    $(".cir-1").css('color','rgb(132, 0, 255)');
    $(".cir-3, .cir-2").css('color','whitesmoke');
  }

});





//slider 
var slideShow = (function () {
  return function (selector, config) {
    var
      _slider = document.querySelector(selector), // основный элемент блока
      _sliderContainer = _slider.querySelector('.slider__items'), // контейнер для .slider-item
      _sliderItems = _slider.querySelectorAll('.slider__item'), // коллекция .slider-item
      _sliderControls = _slider.querySelectorAll('.slider__control'), // элементы управления
      _currentPosition = 0, // позиция левого активного элемента
      _transformValue = 0, // значение транфсофрмации .slider_wrapper
      _transformStep = 100, // величина шага (для трансформации)
      _itemsArray = [], // массив элементов
      _timerId,
      _indicatorItems,
      _indicatorIndex = 0,
      _indicatorIndexMax = _sliderItems.length - 1,
      _stepTouch = 50,
      _config = {
        isAutoplay: false, // автоматическая смена слайдов
        directionAutoplay: 'next', // направление смены слайдов
        delayAutoplay: 5000, // интервал между автоматической сменой слайдов
        isPauseOnHover: true // устанавливать ли паузу при поднесении курсора к слайдеру
      };

    // настройка конфигурации слайдера в зависимости от полученных ключей
    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    // наполнение массива _itemsArray
    for (var i = 0, length = _sliderItems.length; i < length; i++) {
      _itemsArray.push({ item: _sliderItems[i], position: i, transform: 0 });
    }

    // переменная position содержит методы с помощью которой можно получить минимальный и максимальный индекс элемента, а также соответствующему этому индексу позицию
    var position = {
      getItemIndex: function (mode) {
        var index = 0;
        for (var i = 0, length = _itemsArray.length; i < length; i++) {
          if ((_itemsArray[i].position < _itemsArray[index].position && mode === 'min') || (_itemsArray[i].position > _itemsArray[index].position && mode === 'max')) {
            index = i;
          }
        }
        return index;
      },
      getItemPosition: function (mode) {
        return _itemsArray[position.getItemIndex(mode)].position;
      }
    };

    // функция, выполняющая смену слайда в указанном направлении
    var _move = function (direction) {
      var nextItem, currentIndicator = _indicatorIndex;;
      if (direction === 'next') {
        _currentPosition++;
        if (_currentPosition > position.getItemPosition('max')) {
          nextItem = position.getItemIndex('min');
          _itemsArray[nextItem].position = position.getItemPosition('max') + 1;
          _itemsArray[nextItem].transform += _itemsArray.length * 100;
          _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
        }
        _transformValue -= _transformStep;
        _indicatorIndex = _indicatorIndex + 1;
        if (_indicatorIndex > _indicatorIndexMax) {
          _indicatorIndex = 0;
        }
      } else {
        _currentPosition--;
        if (_currentPosition < position.getItemPosition('min')) {
          nextItem = position.getItemIndex('max');
          _itemsArray[nextItem].position = position.getItemPosition('min') - 1;
          _itemsArray[nextItem].transform -= _itemsArray.length * 100;
          _itemsArray[nextItem].item.style.transform = 'translateX(' + _itemsArray[nextItem].transform + '%)';
        }
        _transformValue += _transformStep;
        _indicatorIndex = _indicatorIndex - 1;
        if (_indicatorIndex < 0) {
          _indicatorIndex = _indicatorIndexMax;
        }
      }
      _sliderContainer.style.transform = 'translateX(' + _transformValue + '%)';
      _indicatorItems[currentIndicator].classList.remove('active');
      _indicatorItems[_indicatorIndex].classList.add('active');
    };

    // функция, осуществляющая переход к слайду по его порядковому номеру
    var _moveTo = function (index) {
      var i = 0, direction = (index > _indicatorIndex) ? 'next' : 'prev';
      while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
        _move(direction);
        i++;
      }
    };

    // функция для запуска автоматической смены слайдов через промежутки времени
    var _startAutoplay = function () {
      if (!_config.isAutoplay) {
        return;
      }
      _stopAutoplay();
      _timerId = setInterval(function () {
        _move(_config.directionAutoplay);
      }, _config.delayAutoplay);
    };

    // функция, отключающая автоматическую смену слайдов
    var _stopAutoplay = function () {
      clearInterval(_timerId);
    };

    // функция, добавляющая индикаторы к слайдеру
    var _addIndicators = function () {
      var indicatorsContainer = document.createElement('ol');
      indicatorsContainer.classList.add('slider__indicators');
      for (var i = 0, length = _sliderItems.length; i < length; i++) {
        var sliderIndicatorsItem = document.createElement('li');
        if (i === 0) {
          sliderIndicatorsItem.classList.add('active');
        }
        sliderIndicatorsItem.setAttribute("data-slide-to", i);
        indicatorsContainer.appendChild(sliderIndicatorsItem);
      }
      _slider.appendChild(indicatorsContainer);
      _indicatorItems = _slider.querySelectorAll('.slider__indicators > li')
    };

    var _isTouchDevice = function () {
      return !!('ontouchstart' in window || navigator.maxTouchPoints);
    };

    // функция, осуществляющая установку обработчиков для событий 
    var _setUpListeners = function () {
      var _startX = 0;
      if (_isTouchDevice()) {
        _slider.addEventListener('touchstart', function (e) {
          _startX = e.changedTouches[0].clientX;
          _startAutoplay();
        });
        _slider.addEventListener('touchend', function (e) {
          var
            _endX = e.changedTouches[0].clientX,
            _deltaX = _endX - _startX;
          if (_deltaX > _stepTouch) {
            _move('prev');
          } else if (_deltaX < -_stepTouch) {
            _move('next');
          }
          _startAutoplay();
        });
      } else {
        for (var i = 0, length = _sliderControls.length; i < length; i++) {
          _sliderControls[i].classList.add('slider__control_show');
        }
      }
      _slider.addEventListener('click', function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          _move(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
          _startAutoplay();
        } else if (e.target.getAttribute('data-slide-to')) {
          e.preventDefault();
          _moveTo(parseInt(e.target.getAttribute('data-slide-to')));
          _startAutoplay();
        }
      });
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "hidden") {
          _stopAutoplay();
        } else {
          _startAutoplay();
        }
      }, false);
      if (_config.isPauseOnHover && _config.isAutoplay) {
        _slider.addEventListener('mouseenter', function () {
          _stopAutoplay();
        });
        _slider.addEventListener('mouseleave', function () {
          _startAutoplay();
        });
      }
    };

    // добавляем индикаторы к слайдеру
    _addIndicators();
    // установливаем обработчики для событий
    _setUpListeners();
    // запускаем автоматическую смену слайдов, если установлен соответствующий ключ
    _startAutoplay();

    return {
      // метод слайдера для перехода к следующему слайду
      next: function () {
        _move('next');
      },
      // метод слайдера для перехода к предыдущему слайду          
      left: function () {
        _move('prev');
      },
      // метод отключающий автоматическую смену слайдов
      stop: function () {
        _config.isAutoplay = false;
        _stopAutoplay();
      },
      // метод запускающий автоматическую смену слайдов
      cycle: function () {
        _config.isAutoplay = true;
        _startAutoplay();
      }
    }
  }
}());

slideShow('.slider', {
  isAutoplay: true
});


//phone

$('#rc-phone-icon').click(function(){
  if($(this).hasClass('fa-times')){
   $(this).removeClass('fa-times');
   $(this).addClass('fa-phone');
   $('#rc-phone-form').animate({width:'50px'});
   setTimeout(function(){$('#rc-phone-form').addClass('closed');}, 600);
  } 
  });
 $('#rc-phone-form').click(function(){
   if($(this).hasClass('closed')){
     $('#rc-phone-icon').removeClass('fa-phone');
     $('#rc-phone-icon').addClass('fa-times');
     $('#rc-phone-form').animate({width:'605%'}).removeClass('closed');
     setTimeout(function(){$('#rc-phone-form').addClass('opened');}, 600);
   }
 });
//
//myOrderForm

$('.order-button, .order-table').click(function(){
  $('#fullpage').css('display', "none");
  $('body').css({'background': 'rgba(11, 10, 15, 0.966)','font-family': 'Roboto'});
  $('#myform').css('display', "block");

});

$('.css-radio-2').on('click', function () {
  $('.css-radio-2').parent().fadeIn(150);
  $('.css-radio-2').parent().removeClass('option-radio2-active');
  $(this).parent().addClass('option-radio2-active');
 
});

$('.back-btn').click(function(){
  $('#fullpage').css('display', "table");
  $('body').css({'background': 'none','font-family': "'Roboto',sans-serif"});
  $('#myform').css('display', "none");
  location.reload();
});


$('.for-adress').on('click',function(){
  $('.adress').css('display', "table");
 });
 $('.for-place').on('click',function(){
  $('.adress').css('display', "none");
 });

 $('.go-btn').on('click',function(e){
   e.preventDefault();
      $('.succes-order').css('display', "block");
      $('#myform').css('display', "none");
      
  
     $('.order-close-btn').click(function(){
        $('.succes-order').css('display', "none");
        $('#myform').css('display', "none");
        $('#fullpage').css('display', "table");
        $('body').css({'background': 'none','font-family': 'Roboto'});
        location.reload();

        });

       });    
  
})

