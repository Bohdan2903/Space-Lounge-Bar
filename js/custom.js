

//переход по якорям
jQuery(function($){
  $('.main-nav-links, .main-nav-bar').on('click.smoothscroll', function( e ){
  var hash= this.hash,
   _hash  = hash.replace(/#/,''), theHref = $(this).attr('href').replace(/#.*/, '');
  if( theHref && location.href.replace(/#.*/,'') != theHref ) return;
  var $target = _hash === '' ? $('body') : $( hash + ', a[name="'+ _hash +'"]').first();
  if( ! $target.length ) return;
  e.preventDefault();
  $('html, body').stop().animate({ scrollTop: $target.offset().top - 0 }, 800, 'swing', function(){
  window.location.hash = hash;
  
      });
    });
  });

$(document).ready(function(){   
  $('.menu').slick();
  $('.gallery-wrapper').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots:false,
    prevArrow:'<a href="" class="icon arrow-left-photo"> <i class="fas fa-arrow-circle-left "></i> </a>',
    nextArrow: '<a href="" class="icon arrow-right-photo"><i class="fas fa-arrow-circle-right "></i> </a> '
  });

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
  p.life = 12000;
  p.speedUp = 5;
  p.speedRight = randBetween(0,5)
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
      
      { stillAlive = true; }

      //attributes that change over time
      var newTop = p.top - (p.speedUp * (td/1500));
      var newLeft = p.left + (p.speedRight * (td/2000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1200));
      p.newTop = newTop;
      p.newLeft = newLeft;

      //Draw!
      ctx.fillStyle = 'rgba(150, 150, 150, 0.1)';      
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }

  requestAnimationFrame(function(){draw(startT,totalT);}); 
 
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

// canvasfinish
  
$('.kolbs-img').click(function(e){
    e.preventDefault();
  });
  
    $('.calc-img').click(function(e){
      e.preventDefault();
    });
  
    $('.calc-kolbs, .colbs').on('change', function (e) {
      e.preventDefault();
      $('.colbs').fadeIn(250);
      $('.colbs-text').removeClass("border-colbs-header");
      $(this).fadeOut(450, summ).parent().find(".colbs-text").addClass("border-colbs-header");
      $('.new-kolba').removeClass().addClass('new-kolba').hide().addClass($(this).attr('data-image')).fadeIn(600);
    });

    $('.calc-img-chasha').on('change', function (e) {
      e.preventDefault();
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

  
  

    //calculator
    let colbPrice = 0;
    let total=0;
    let chashaPrice = 0;
    let tabacPrice = 0;
        let chashaName;
        let kolbsName;
        let tabak;

      $('.form-input').on('change',function () {
            summ();
      });

      function summ() {
        $('.calc-img-chasha').on('click',function() {
            chashaPrice = +$(this).attr('data-price');
               chashaName = $(this).attr('data-name');
                 
          });

          $('.calc-kolbs').on('click',function() {
               colbPrice = +$(this).attr('data-price');
               kolbsName = $(this).attr('data-name');
           });
           
            $('.calc-handler').on('click',function() {
                tabacPrice = +$(this).attr('data-price');
                tabak = $(this).attr('data-name');
              });
         
            total =  +chashaPrice + +colbPrice + +tabacPrice ;
             if(isNaN(total) ) total = 0;

            $(".total_price_sum").text('Сумма заказа ' + total + " " + "UAH");
             $(".form-price").text( 'Ваш заказ: ' + tabak + ' ' + kolbsName + ' и с'+ ' '+ chashaName + ' чашей.' + ' Cумма заказа ' + total + ' ' + 'UAH' );
       };


//clik po inx kalianov

      $('.indx-0').click(function (){
        if( $('.number-shisha').hasClass('hidden')){
          $('.number-shisha').removeClass('hidden').fadeIn(400).css('display','block');
        }

        else if( $('.number-shisha').css('display','block')){
          $('.number-shisha').fadeOut(500).addClass('hidden');
        }
        
      });

      $('.indx-1').click(function (){
        $('.chosen-indx').text('1').removeClass('indx-2').removeClass('indx-3').removeClass('indx-1').addClass('indx-1');
        $('.number-shisha').removeClass("hidden").fadeIn(500);
        $('.third-shahta, .chasha-3, .kolb-3, .second-shahta, .chasha-2, .kolb-2').addClass('hidden');
        $('.first-shahta, .chasha-1, .kolb-1').fadeIn(200);
        $('.first-shahta').css('margin-left', '0px');
        $('.number-shisha').fadeOut(500).addClass('hidden');
      });

      $('.indx-2').click(function (){
        $('.chosen-indx').text('2').removeClass('indx-1').removeClass('indx-3').addClass('indx-2');
        $('.number-shisha').removeClass("hidden").fadeIn(500);
        $('.second-shahta, .chasha-2, .kolb-2').removeClass('hidden').fadeIn(200);
        $('.third-shahta').addClass('hidden');
        $('.first-shahta').css({'margin-left': '-100px'});
        $('.second-shahta').css({'margin-left': '90px'});
        $('.number-shisha').fadeOut(500).addClass('hidden');
      })
      $('.indx-3').click(function (){
        $('.chosen-indx').text('3').removeClass('indx-1').removeClass('indx-2').addClass('indx-3');
        $('.number-shisha').removeClass("hidden").fadeIn(500);
        $('.third-shahta, .chasha-3, .kolb-3, .second-shahta').removeClass('hidden').fadeIn(200);
        $('.second-shahta').css('margin-left', '-15px');
        $('.third-shahta').css('margin-left','-10px');
        $('.first-shahta').css('margin-left', '-120px');
        $('.number-shisha').fadeOut(500).addClass('hidden');
      })

//click po strelkam na kaliane
      $('.arrow-right-shisha').click(function(e){
        console.log('right');
        e.preventDefault();
        if($('.chosen-indx').hasClass('indxfirst')){
             $('.third-shahta, .chasha-3, .kolb-3').fadeOut(300).addClass('hidden'); 
             $('.chosen-indx').text('2').removeClass('indx-1').removeClass('indxfirst').removeClass('indx-3').addClass('indx-2');  
             $('.second-shahta, .chasha-2, .kolb-2, .first-shahta, .chasha-1, .kolb-1').removeClass('hidden').fadeIn(300);
             $('.first-shahta').css({'margin-left': '-120px'});
             $('.second-shahta').css({'margin-left': '90px'});
              
        }
        else if($('.chosen-indx').hasClass('indx-2')){
          $('.chosen-indx').text('3').removeClass('indx-2').removeClass('indx-1').addClass('indx-3').removeClass('indxfirst');
          $('.third-shahta, .chasha-3, .kolb-3, .second-shahta, .chasha-2, .kolb-2, .first-shahta, .chasha-1, .kolb-1').removeClass('hidden').fadeIn(300);
          $('.second-shahta').css('margin-left', '-15px');
          $('.third-shahta').css('margin-left','-10px');
          $('.first-shahta').css('margin-left', '-120px');
        }
        else if($('.chosen-indx').hasClass('indx-3')){
          $('.chosen-indx').text('1').removeClass('indx-2').removeClass('indx-3').addClass('indx-1').addClass('indxfirst');
          $('.third-shahta, .chasha-3, .kolb-3, .second-shahta, .chasha-2, .kolb-2').fadeOut(00).addClass('hidden');
          $('.first-shahta, .chasha-1, .kolb-1').removeClass('hidden').fadeIn(200);
          $('.first-shahta').css('margin-left', '0px');
          
        }});

          $('.arrow-left-shisha').click(function(e){
            console.log('left');
            e.preventDefault();
            if($('.chosen-indx').hasClass('indxfirst')){
              $('.chosen-indx').text('3').removeClass('indx-2').removeClass('indx-1').removeClass('indxfirst').addClass('indx-3');
              $('.third-shahta, .chasha-3, .kolb-3, .second-shahta, .chasha-2, .kolb-2, .first-shahta, .chasha-1, .kolb-1').removeClass('hidden').fadeIn(300);
              $('.second-shahta').css('margin-left', '-15px');
              $('.third-shahta').css('margin-left','-10px');
              $('.first-shahta').css('margin-left', '-120px');
              }
            else if($('.chosen-indx').hasClass('indx-3')){  
              $('.third-shahta, .chasha-3, .kolb-3').fadeOut(300).addClass('hidden');  
              $('.second-shahta').css({'margin-left': '90px'});
              $('.chosen-indx').text('2').removeClass('indx-3').removeClass('indx-1').removeClass('indxfirst').addClass('indx-2');
              $('.first-shahta, .chasha-1, .kolb-1, .second-shahta, .chasha-2, .kolb-2,').removeClass('hidden').fadeIn(300);
              $('.first-shahta').css('margin-left', '-100px');
         }
         else if($('.chosen-indx').hasClass('indx-2')){
           $('.chosen-indx').text('1').removeClass('indx-2').removeClass('indx-3').removeClass('indxfirst').addClass('indx-1');
           $('.third-shahta, .chasha-3, .kolb-3, .second-shahta, .chasha-2, .kolb-2').fadeOut(300).addClass('hidden');
           $('.first-shahta, .chasha-1, .kolb-1').removeClass('hidden').fadeIn(300);
           $('.first-shahta').css('margin-left', '0px');
           $('.chosen-indx').addClass('indxfirst');
         }
          });
       
       });


//photohover

$(".img-responsive").click(function(){
  var img = $(this);	
var src = img.attr('src'); // Достаем из этого изображения путь до картинки
$("#discount").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
         
        "<div class='about-main-text-popup'>Почуствуй Атмосферу </div>"+
        "<div class='popup_bg'></div>"+// Блок, который будет служить фоном затемненным
      
         "<div class='cl-btn-3'><span class='top'></span> <span class='bot'></span></div>" +
         "<img src='"+src+"' class='popup_img' />"+// Само увеличенное фото
          "</div>" ); 
          $(".icon, .about-main-text").css('opacity', '0');
$(".popup").fadeIn(800); 
$(".cl-btn-3").click(function(){	   
  $(".popup").fadeOut(800);	// Медленно убираем всплывающее окно
  setTimeout(function() {	
    $(".popup").remove();
    $(".icon, .about-main-text").css('opacity', '1'); // Удаляем разметку всплывающего окна
  }, 800);
});
});



//slider 
var multiItemSlider = (function () {
  return function (selector, config) {
    var
      _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
      _items = [], // массив элементов
      _interval = 0,
      _config = {
        isCycling: false, // автоматическая смена слайдов
        direction: 'right', // направление смены слайдов
        interval: 5000, // интервал между автоматической сменой слайдов
        pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
      };

    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }

    var _transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    }

    var _cycle = function (direction) {
      if (!_config.isCycling) {
        return;
      }
      _interval = setInterval(function () {
        _transformItem(direction);
      }, _config.interval);
    }

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
        _transformItem(direction);
        clearInterval(_interval);
        _cycle(_config.direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
      if (_config.pause && _config.isCycling) {
        _mainElement.addEventListener('mouseenter', function () {
          clearInterval(_interval);
        });
        _mainElement.addEventListener('mouseleave', function () {
          clearInterval(_interval);
          _cycle(_config.direction);
        });
      }
    }

    // инициализация
    _setUpListeners();
    _cycle(_config.direction);

    return {
      right: function () { // метод right
        _transformItem('right');
      },
      left: function () { // метод left
        _transformItem('left');
      },
      stop: function () { // метод stop
        _config.isCycling = false;
        clearInterval(_interval);
      },
      cycle: function () { // метод cycle 
        _config.isCycling = true;
        clearInterval(_interval);
        _cycle();
      }
    }

  }
}());

var slider = multiItemSlider('.slider', {
  isCycling: true
})



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

$('.order-table').click(function(){
  $('#fullpage').css('display', "none");
  $('body').css({'background': '#040021','font-family': 'Roboto'});
  $('.myform').css('display', "flex");
});

$('.css-radio-2').on('click', function () {
  $('.css-radio-2').parent().fadeIn(150);
  $('.css-radio-2').parent().removeClass('option-radio2-active');
  $(this).parent().addClass('option-radio2-active');
 });

$('.back-btn').click(function(){
  $('#fullpage').css('display', "table");
  $('body').css({'background': 'none','font-family': "'Roboto',sans-serif"});
  $('.myform').css('display', "none");
  location.reload();
});

$('.back-btn-shisha').click(function(){
  var url = "http://127.0.0.1:5503/index.html#shisha-page";
  $('#fullpage').css('display', "table");
  $('body').css({'background': 'none','font-family': "'Roboto',sans-serif"});
  $('.myform-2').css('display', "none");
    $(location).attr('href',url);
});

$('.for-adress').on('click',function(){
  $('.adress').css('display', " table");
 });
 $('.for-place').on('click',function(){
  $('.adress').css('display', "none");
 });

 $('.go-btn').on('click',function(e){
   e.preventDefault();
      $('.succes-order').css('display', "block");
      $('.myform').css('display', "none");
      $('.myform-2').css('display', "none");})
  
     $('.order-close-btn').click(function(){
        $('.succes-order').css('display', "none");
        $('.myform').css('display', "none");
        $('#fullpage').css('display', "table");
        $('body').css({'background': 'none','font-family': 'Roboto'});
        location.reload();

        });

      $('.shisha-order').click(function(){
        $('#fullpage').css('display', "none");
        $('body').css({'background': '#040021','font-family': 'Roboto'});
        $('.myform-2').css('display', "flex");
      
      });

// анимаци в области видимости
var windowHeight = $(window).height();

	$(document).on('scroll', function() {
		$('.about-plus, .bgicon, .icon-text, .logo-img ').each(function() {
			var self = $(this),
			height = self.offset().top + self.height();
			if ($(document).scrollTop() + windowHeight >= height -300 ){
         self.addClass('bounceInLeft'); 
        }
      
});
      $('.map').each(function() {
        var self = $(this),
        height = self.offset().top + self.height();
        if ($(document).scrollTop() + windowHeight >= height -300){
          self.addClass('wow zoomInLeft'); 
       }});

      $('.gallery-item').each(function() {
        var self = $(this),
        height = self.offset().top + self.height();
        if ($(document).scrollTop() + windowHeight >= height-300){
          $('.gallery-wrapper').css('display', 'flex').removeClass('hidden');
          self.addClass(' wow zoomInLeft ');
          $('.gallery-item ').css({'opacity': '1'});
         }
          else{
            $('.gallery-item ').removeClass(' wow zoomInLeft ').css('opacity', '0.3');
            self.css('opacity', '0');
            $('.map').removeClass(' wow zoomInLeft ');
          }
            });

           
      
});
//

$(".toggle-icon").on('click',function() {
  $('section').each(function (){
  if($('section').hasClass('hidden')){
    $('section').removeClass('hidden');
  } else $('section').addClass('hidden');;
  });

  $('#nav-container').toggleClass("pushed");
  $('.main-nav-bar-img').addClass('hidden');
  $('.logo-main').addClass('hidden');
  if( $('.main-nav-bar-img').hasClass('hidden')){
    $('.main-nav-bar-img').removeClass('hidden');
  };
  
  if($('.menu-header-phone').hasClass('hidden')){
      $('.menu-header-phone').removeClass('hidden');
    }
  else {
    $('.menu-header-phone').addClass('hidden');
    $('.logo-main').removeClass('hidden');
  }
});


