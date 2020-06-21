hookahs = {
  bowls: {
      1: 0, //
      2: 75, // orange
      3: 165 // pineapple
  },
  colbs: {
      1: 0, // water
      2: 20, // milk
      3: 40, // alcohol
  },
  tobaccos: {
      1: 185, // lite
      2: 235, // medium
      3: 255, // strong
  },
  colbs_title: {
    1: "воде", 
    2: "молоке", 
    3: "алкоголе"
  },
  bowls_title: {
    1: "классической",
    2: "апельсиновой", 
    3: "ананасовой"
  },
  tobaccos_title: {
    1: "Лёгкий", 
    2: "Средний", 
    3: "Тяжелый"
  },

  stage: {
      1: {"bowl": 1, "colb": 1, "tobacco": 1},
      2: {"bowl": 1, "colb": 1, "tobacco": 1},
      3: {"bowl": 1, "colb": 1, "tobacco": 1},
  },
  hookahsOnStage: 1,
  hookahSelected: 1,

  orderAmount: 0, // cost of an order

  setParam: function(param, value) {
      this.stage[this.hookahSelected][param] = value;
  },

  calculate: function () {
      let cost = 0;
      for (let i = 1; i <= this.hookahsOnStage; i++) {
          let hookah = this.stage[i];
          cost += this.bowls[hookah.bowl];
          cost += this.colbs[hookah.colb];
          cost += this.tobaccos[hookah.tobacco];
      }
      this.orderAmount = cost;
  },

  render: function () {
      // load proper values to params - for current hookah

      document.querySelectorAll("input[name=calc-bowl]").forEach(input => {
        if (input.value == this.stage[this.hookahSelected].bowl) {
            input.checked = true;
        }
      });
      document.querySelectorAll("input[name=calc-kolbs]").forEach(input => {
        if (input.value == this.stage[this.hookahSelected].colb) {
            input.checked = true;
        }
      });
      document.querySelectorAll("input[name=tabak]").forEach(input => {
        if (input.value == this.stage[this.hookahSelected].tobacco) {
            input.checked = true;
        }
      });
      //
      
      document.querySelectorAll(".chosen-number > strong").forEach(element => {
        element.textContent = this.hookahSelected;
      });
      document.querySelectorAll(".chosen-number").forEach(element => {
        element.style.display = (+this.hookahsOnStage > 1)? "": "none";
      });
      let text="";
      for (let i = 1; i <= this.hookahsOnStage; i++) {
        text +='<p>'+ i + ") ";
        text += this.tobaccos_title[this.stage[i].tobacco]+ ' ';
        text += 'кальян на ' + this.colbs_title[this.stage[i].colb] + " ";
        text += 'с ' + this.bowls_title[this.stage[i].bowl] + " чашей " + '</p>';
        
    }
      document.querySelector(".form-text-sum").innerHTML = text;
      //
      // display ONLY required number of hookahs
      document.querySelectorAll(".hookah").forEach(hookah => {
          hookah.classList.toggle("hidden", +hookah.getAttribute("data-id") > this.hookahsOnStage);
      })

      // mark active hookah + apply the matched color to params block
      // remove "active" class from all hookahs
      document.querySelectorAll(".hookah").forEach(e => {
          e.classList.remove("active");
      });
      // add "active" class to current hookah
      document.querySelector(`.hookah[data-id="${this.hookahSelected}"]`).classList.add("active");
      // class for params block
      const params = document.querySelector(".params");
      for (let i = 1; i <= 3; i++) {
          params.classList.remove("hookah-color" + i);
      }
      params.classList.add("hookah-color" + this.hookahSelected);

      // applying bowls / colbs to hookahs on stage
      for (hookah in this.stage) {
          //
          let div; 
          div = document.querySelector(`.hookah[data-id="${hookah}"] > .bowl`);
          for (let i = 1; i <=3; i++) {
              div.classList.toggle("bowl" + i, this.stage[hookah].bowl === i);
          }
          div = document.querySelector(`.hookah[data-id="${hookah}"] > .tobacco`);
          for (let i = 1; i <=3; i++) {
              div.classList.toggle("tobacco" + i, this.stage[hookah].tobacco === i);
          }
          div = document.querySelector(`.hookah[data-id="${hookah}"] > .colb`);
          for (let i = 1; i <=3; i++) {
              div.classList.toggle("colb" + i, this.stage[hookah].colb === i);
          }
      }

      // calculate and display the cost
      this.calculate();
      document.querySelectorAll(".total_price_sum, .form-price, .total_price_sum-phone").forEach(e =>{
          e.textContent = `Сумма заказа ${this.orderAmount + ' ' + 'UAH'}`;
      });
      
  }
  
};

let selectActiveItem = e => {
  let current;
  if (e.target.classList.contains("hookah")) {
      current = e.target;
  } else {
      current = e.target.parentNode;
  }

  hookahs.hookahSelected = +current.getAttribute("data-id");
  hookahs.render();
}

const handleSelectChange = function() {
  const param = this.getAttribute("data-type").replace("select-", "");
  const value= this.value;
  hookahs.setParam(param, +value);
  hookahs.render();
}
// onload function
document.addEventListener("DOMContentLoaded", () => { 

  document.querySelectorAll(".hookah, .hookah > *").forEach(element => {
      element.addEventListener("click", selectActiveItem);
  });

  document.querySelectorAll(".calc-handler").forEach(element => {
    element.addEventListener("click", handleSelectChange);
  });

  document.querySelectorAll(".calc-img-chasha").forEach(element => {
    element.addEventListener("click", handleSelectChange);
  });

  document.querySelectorAll(".calc-kolbs").forEach(element => {
      element.addEventListener("click", handleSelectChange);
  });


  document.querySelectorAll(".index-shisha").forEach(element => {
    element.addEventListener("click", function(){
     $(".index-shisha").toggleClass('hidden');
       this.classList.remove('hidden');
      const num = this.getAttribute('value');
      hookahs.hookahsOnStage = num;
      hookahs.hookahSelected = (hookahs.hookahSelected > num) ? 1 : hookahs.hookahSelected;
      hookahs.render();
    });
  });

  hookahs.render();
});

 //calculator
  

  $(window).on('load', function () {
    $('#preloader').css("display", "none");
    $('#loader').css("display", "none");
    changeVersion();
    });

    $(document).ready(function(){
      console.clear();
    });
  
    $(window).resize(changeVersion());
  

    jQuery(function($){
  
      $('.main-nav-links, .main-nav-bar').on('click.smoothscroll', function( e ){
      var hash= this.hash,
       _hash  = hash.replace(/#/,''), theHref = $(this).attr('href').replace(/#.*/, '');
      if( theHref && location.href.replace(/#.*/,'') != theHref ) return;
      var $target = _hash === '' ? $('body') : $( hash + ', a[name="'+ _hash +'"]').first();
      if( ! $target.length ) return;
      e.preventDefault();
      $('html, body').stop().animate({ scrollTop: $target.offset().top - 30}, 900, 'swing', function(){
      window.location.hash = hash - 30;
      
          });
        });
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

$('.order-table').click(function(){
  $('.table-order').css('display', "flex");
});

$('.css-radio-2').on('click', function () {
  $('.css-radio-2').parent().fadeIn(150);
  $('.css-radio-2').parent().removeClass('option-radio2-active');
  $(this).parent().addClass('option-radio2-active');
 });

$('.back-btn').click(function(){
  $('.table-order').css('display', "none");
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
      $('.myform-2').css('display', "none");
    });
  
  $('.order-close-btn').click(function(e){
    e.preventDefault();
      $('.table-order').css('display', "none");
      $('.succes-order').css('display', "none");
      $('body').css({'background': 'none','font-family': 'Roboto'});
      if ( $('section').hasClass('hidden') || $('#fullpage').hasClass('hidden')){
          $('section').removeClass('hidden');
          if($(window).width() > 1000){
             $('#fullpage').removeClass('hidden').css('display', "table");
          }
          var url = "http://127.0.0.1:5503/index.html#5thPage";
          $(location).attr('href',url);
      }
      
    });

// анимаци в области видимости
var windowHeight = $(window).height();
var windowWidth = $(window).width();
	$(document).on('scroll', function() {
		$('.about-plus, .bgicon, .icon-text, .logo-img, .map ').each(function() {
			var self = $(this),
			height = self.offset().top + self.height();
			if ($(document).scrollTop() + windowHeight >= height -100 && windowWidth > 768){
         self.addClass('bounceInLeft'); 
        };

      if($(document).scrollTop() + windowHeight >= height - 350 &&  windowWidth < 768){
        self.addClass('bounceInLeft'); 
        $('.about-img').each(function() {
          $(this).addClass('bounceInLeft');
      })}
      
});
      $('.map').each(function() {
        var self = $(this),
        height = self.offset().top + self.height();
        if ($(document).scrollTop() + windowHeight >= height -300 && windowWidth > 768){
          self.addClass('wow zoomInLeft'); 
       }});

      $('.gallery-wrapper').each(function() {
        var self = $(this),
        height = self.offset().top + self.height();
        if ($(document).scrollTop() + windowHeight >= height-20  && windowWidth > 768 ){
          $('.gallery-wrapper').css('display', 'flex');
          $('.gallery-item').addClass('wow zoomInLeft').css('opacity', '1');
          
          }

         if ($(document).scrollTop() + windowHeight >= height - 250 && windowWidth < 768 ){
          $('.gallery-wrapper').css({'opacity': '1', 'display':'flex'});
          $('.gallery-item').addClass('wow zoomInLeft').css('opacity', '1');
         }
          });
});

$(".toggle-icon").on('click',function() {
  $('section').each(function (){
  if($('section').hasClass('hidden')){
    $('section').removeClass('hidden');
    $('.logo-main').removeClass('hidden');
  } else $('section').addClass('hidden');;
  });

 
  if( $('.menu-header-phone').hasClass('hidden')){
    $('.menu-header-phone').removeClass('hidden'); 
    $('#nav-container').toggleClass("pushed");
  $('.logo-main').addClass('hidden');
  } else {
    $('.menu-header-phone').addClass('hidden');
    $('.logo-main').removeClass('hidden');
    $('#nav-container').toggleClass("pushed");
  }
});


  function changeVersion(){ 
   
    let phoneWidth = 1000;
    if( $(window).width() > phoneWidth){

      jQuery(function($){
         $('.main-nav-links, .main-nav-bar').on('click.smoothscroll', function( e ){
        var hash= this.hash,
         _hash  = hash.replace(/#/,''), theHref = $(this).attr('href').replace(/#.*/, '');
        if( theHref && location.href.replace(/#.*/,'') != theHref ) return;
        var $target = _hash === '' ? $('body') : $( hash + ', a[name="'+ _hash +'"]').first();
        if( ! $target.length ) return;
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: $target.offset().top -5}, 900, 'swing', function(){
        window.location.hash = hash -5;
        
            });
          });
        });

      $(".form-time").focus( function() {
        if($(this).attr({type: 'text'})){
          $(this).attr({type: 'datetime-local'});
        } 
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
      
      //canvas
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
      
      draw(new Date().getTime());
      
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
    
      $('.menu').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:true,
        dotsClass: 'my-dots'
      });
      
      $('.back-btn-shisha').click(function(){
        $('#fullpage').removeClass('hidden');
        $('body').css({'background': 'none','font-family': "'Roboto',sans-serif"});
        $('.myform-2').css('display', "none");
        
      });
      $('.shisha-order').click(function(){
        $('#fullpage').addClass('hidden');
        $('body').css({'background': '#040021','font-family': 'Roboto'});
        $('.myform-2').css('display', "flex");
      });
    
      $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots:false,
        autoplay: true,
        autoplaySpeed:2500,
        speed:1000,
        prevArrow:'<a href="" class="icon arrow-left-slider"> <i class="fas fa-arrow-circle-left "></i> </a>',
        nextArrow: '<a href="" class="icon arrow-right-slider"><i class="fas fa-arrow-circle-right "></i> </a> '
      });
    
      $('.gallery-wrapper').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow:'<a href="" class="icon arrow-left-photo"> <i class="fas fa-arrow-circle-left "></i> </a>',
      nextArrow: '<a href="" class="icon arrow-right-photo"><i class="fas fa-arrow-circle-right "></i> </a> '
      });

    } 
    if($(window).width() <= phoneWidth){


      $(".form-time").click( function() {
        if($(this).attr({type: 'text'})){
          $(this).attr({type: 'datetime-local'});
        } 
      });

      $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:false,
        autoplay: true,
        autoplaySpeed:2500,
        speed:1000,
        prevArrow:'<a href="" class="icon arrow-left-slider"> <i class="fas fa-arrow-circle-left "></i> </a>',
        nextArrow: '<a href="" class="icon arrow-right-slider"><i class="fas fa-arrow-circle-right "></i> </a> '
      });

     jQuery(function($){
           $('.main-nav-links').on('click.smoothscroll', function(e){
            $('section').removeClass('hidden');
            $('#nav-container').removeClass("pushed");
           $('.menu-header-phone ').addClass('hidden');  
           $('.logo-img').removeClass("hidden");
            var hash= this.hash,
            _hash  = hash.replace(/#/,''), theHref = $(this).attr('href').replace(/#.*/, '');
           if( theHref && location.href.replace(/#.*/,'') != theHref ) return;
           var $target = _hash === '' ? $('body') : $( hash + ', a[name="'+ _hash +'"]').first();
           if( ! $target.length ) return;
           e.preventDefault();
           $('html, body').stop().animate({ scrollTop: $target.offset().top -40}, 900, 'swing', function(){
           window.location.hash = hash -40;
               });
          
         
        })});
    
      $('.menu-phone').slick({
        dots:true,
        dotsClass: 'my-dots-menu',
        prevArrow:false,
        nextArrow: false
      });
    
      $('.gallery-wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:'<a href="" class="icon arrow-left-photo"> <i class="fas fa-arrow-circle-left "></i> </a>',
        nextArrow: '<a href="" class="icon arrow-right-photo"><i class="fas fa-arrow-circle-right "></i> </a> '
      });
    
      $('.tabac-wrap-phone').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:false,
        prevArrow:'<a href="" class="arrow-left-tabac  icon"> <i class="fas fa-arrow-circle-left "></i> </a>',
        nextArrow: '<a href="" class="arrow-right-tabac icon"><i class="fas fa-arrow-circle-right "></i> </a> '
      });
    
      
      $('.check-order-text').on('click', function () {
        if($('#main-shahta-phone').hasClass('hidden')){
          $('section, #header-mob').addClass('hidden');
          $('#main-shahta-phone').removeClass('hidden');
        } else {
          $('#main-shahta-phone').addClass('hidden');
          $('section, #header-mob').removeClass('hidden');
        }
        });
    
      $('.back-shahta-btn').on('click', function (e) {
        var url = "http://127.0.0.1:5503/index.html#5thPage";
        e.preventDefault();
        if($('#main-shahta-phone').hasClass('hidden')){
          $('section, #header-mob').removeClass('hidden');
          } else {
          $('#main-shahta-phone').addClass('hidden');
          $('section, #header-mob').removeClass('hidden');
          $(location).attr('href',url);
        }});
    
        $('.shisha-order').click(function(){
          $('section').addClass('hidden');
          $('body').css({'background': '#040021','font-family': 'Roboto'});
          $('.myform-2').css('display', "flex").removeClass('hidden');
        });
    
        $('.back-btn-shisha').click(function(e){
         e.preventDefault();
         var url = "http://127.0.0.1:5503/index.html#5thPage";
          $('section').removeClass('hidden');
          $('.myform-2').addClass('hidden');
          $('.myform-2').css('display', "none").addClass('hidden');
          $(location).attr('href',url);
        });
      }
  };//finish changeVersion//
  
  setTimeout(() => console.clear(), 5000);