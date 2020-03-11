console.clear();

canvasWidth = 1600;
canvasHeight = 1;

pCount = 0;


pCollection = new Array();

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
  p.life = 12500;
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

function clog(s)
{  
  console.log(s);
}
// canvas
  

$(document).ready(function(){   
  var target = $('section');
  var targetPos = target.offset().top;
  var winHeight = $(window).height();
  var scrollToElem = targetPos - winHeight;
  
  $(window).scroll(function(){
  var winScrollTop = $(this).scrollTop();
  if(winScrollTop > scrollToElem){
    //сработает когда пользователь доскроллит к элементу с классом .elem
  }
});
  // 
  $('.kolbs-img').click(function(e){
    e.preventDefault();
  });
  
    $('.calc-img').click(function(e){
      e.preventDefault();
    });
  
    $('#watershisha').click(function(){
      $('.new-kolba').remove('#milkshisha, #alcoshisha');
      $('#watershisha').appendTo('.new-kolba').addClass('watershisha-active');
      if($('.new-kolba').hasClass('milkshisha-active') || $('.new-kolba').hasClass('alcoshisha-active')){
        $('#milkshisha').appendTo('.checkbox-label');
        $('#alcoshisha').appendTo('.checkbox-label');
      }
    });
  
    $('#milkshisha').click(function(){
      $('.new-kolba').remove('#watershisha, #alcoshisha');
      $('#milkshisha').appendTo('.new-kolba').addClass('milkshisha-active');
      if($('.new-kolba').hasClass('watershisha-active') || $('.new-kolba').hasClass('alcoshisha-active')){
        $('#watershisha').appendTo('.checkbox-label');
        $('#alcoshisha').appendTo('.checkbox-label');
    }});
    
    $('#alcoshisha').click(function(){
      $('.new-kolba').remove('#watershisha, #milkshisha');
      $('#alcoshisha').appendTo('.new-kolba').addClass('alcoshisha-active');
      if($('.new-kolba').hasClass('watershisha-active') || $('.new-kolba').hasClass('milkshisha-active')){
        $('#watershisha').appendTo('.checkbox-label');
        $('#milkshisha').appendTo('.checkbox-label');
    }});
});