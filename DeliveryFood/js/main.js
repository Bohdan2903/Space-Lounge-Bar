const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const logInInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem('loginUser');


function toggleModal() {
  modal.classList.toggle("is-open");
}
function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
};


function authorized(){

  function logOut(){
    login = null;
    localStorage.removeItem('loginUser');
    buttonAuth.style.display= '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }
  userName.textContent = login;
  buttonAuth.style.display= 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
};

function notAuthorized (){
  function logIn(event){ 
    event.preventDefault();
    login=logInInput.value;   
    toggleModalAuth();
    localStorage.setItem('loginUser', login);
      buttonAuth.removeEventListener('click', toggleModalAuth);
     closeAuth.removeEventListener('click', toggleModalAuth);
     logInForm.removeEventListener('submit', logIn);
     logInForm.reset();
     checkAuth();
  };

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

function checkAuth(){
  if(login){
  authorized();
} else {
  notAuthorized();
}
};

function createCardRestaurant(){
   const card = 
   `	<a class="card card-restaurant">
   <img src="img/palki-skalki/preview.jpg" alt="image" class="card-image"/>
   <div class="card-text">
     <div class="card-heading">
       <h3 class="card-title">Палки скалки</h3>
       <span class="card-tag tag">55 мин</span>
     </div>
     <div class="card-info">
       <div class="rating">
         4.5
       </div>
       <div class="price">От 500 ₽</div>
       <div class="category">Пицца</div>
     </div>
   </div>
 </a>
 `;
 cardRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood(){
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
  <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Везувий</h3>
    </div>
    <!-- /.card-heading -->
    <div class="card-info">
      <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
        «Халапенье», соус «Тобаско», томаты.
      </div>
    </div>
    <!-- /.card-info -->
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">545 ₽</strong>
    </div>
  </div>
  `);
  cardsMenu.insertAdjacentHTML('beforeend', card)
}

function openGoods (event){
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if(restaurant){
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    
    createCardGood();
    createCardGood();
    createCardGood();
  }
};

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function(){
  containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});
checkAuth();
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();