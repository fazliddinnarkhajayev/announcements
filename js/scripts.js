

var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement = function (element, elementClass, text) {
  var newElement = document.createElement(element);

  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }

  if (text) {
    newElement.textContent = text;
  }

  return newElement;
};



// MODAL//////////

var addButton = document.querySelector('.js-add-button');
var extraButton = document.querySelector('.js-announce-name-link');
var removeButton = document.querySelector('.js-s-modal-button');
var secondModal = document.querySelector('.s-modal-wrapper');


var elMainList = $_('.js-main-section__list');
var elHeaderLight = $_('.js-site-header__light-button');
var elHeaderMoon = $_('.js-site-header__moon-button');
var body = $_('.site-body')

elMainList.addEventListener('click', function(evt){
   if (evt.target.matches('a')){
    secondModal.classList.add('s-modal-wrapper--open');

    var birnima = announcements.find(function (announcement){
      return Number(evt.target.dataset.id) === announcement.id
    })

    sModalCompany.textContent = birnima.companyName;
      sModalLocate.textContent = birnima.location;
      sModalTechs.textContent = birnima.techs;
      sModalInfo.textContent = birnima.telegram;
      sModalNumber.textContent = birnima.tel;
      sModalResponse.textContent = birnima.respone;
      sModalTime.textContent = birnima.workTime;
      sModalSalary.textContent = birnima.minSalary;
      sModalEnnounceTitle.textContent = birnima.title;
      sModalMoreText.textContent = birnima.more;



   }

});
removeButton.addEventListener('click', function(evt){
  secondModal.classList.remove('s-modal-wrapper--open')
});

elHeaderMoon.addEventListener('click', function(){
 body.classList.add('site-body--dark')
});
 var localmoon = elHeaderLight.addEventListener('click', function(){
body.classList.remove('site-body--dark')
});



///// firstModal/////

var modalForm = $_('.js-announce-modal__form');
var modalFormAll = $_('.announce__form-item');
var modalTitle = $_('.js-announce__title-input');
var modalCompany = $_('.js-announce__company');
var modalTechs = $_('.js-announce__tech');
var modalTg = $_('.js-announce__tg');
var modalTel = $_('.js-announce__tel');
var modalLocate = $_('.js-announce__locate');
var modalResponse = $_('.js-announce__response');
var modalWorkTime = $_('.js-announce__work-time');
var modalSalary = $_('.js-announce__salary');
var modalTextarea = $_('.js-announce__textarea');

/////secondModal/////

var sModalCompany = $_('.js-s-company');
var sModalLocate = $_('.js-s-locate');
var sModalTechs = $_('.js-s-techs');
var sModalInfo = $_('.js-s-tg-info');
var sModalNumber = $_('.js-s-tel-number');
var sModalResponse = $_('.js-s-seponsible');
var sModalTime = $_('.js-s-time');
var sModalSalary = $_('.js-s-salary');
var sModalEnnounceTitle = $_('.js-s-modal-title');
var sModalMoreText = $_('.js-s-more-texxt');


var elMainTime = $_('.js-time');
var elMainWorkTime = $_('.js-worktime');
var elMainNameLink = $_('.js-announce-name-link');
var elMainEmployers = $_('.js-employers');
var elMainLocation = $_('.js-location');


var elTemplate = $_('.main__template').content;

var announcements = JSON.parse(localStorage.getItem('array')) || [];
var count = Number(localStorage.getItem('count')) || 0;

var itemFragment = document.createDocumentFragment()
announcements.forEach(function(announcement){

  // console.log(announcement)

  modalForm.reset()

  var elItemTemplate = elTemplate.cloneNode(true);
  $_('.js-worktime', elItemTemplate ).textContent = announcement.workTime;
  $_('.js-announce-name-link', elItemTemplate ).textContent = announcement.title;
  $_('.js-announce-name-link', elItemTemplate ).dataset.id = announcement.id;
  $_('.js-employers', elItemTemplate ).textContent = announcement.companyName;
  $_('.js-location', elItemTemplate).textContent = announcement.location;



  sModalCompany.textContent = announcement.companyName;
  sModalLocate.textContent = announcement.location;
  sModalTechs.textContent = announcement.techs;
  sModalInfo.textContent = announcement.telegram;
  sModalNumber.textContent = announcement.tel;
  sModalResponse.textContent = announcement.respone;
  sModalTime.textContent = announcement.workTime;
  sModalSalary.textContent = announcement.minSalary;
  sModalEnnounceTitle.textContent = announcement.title;
  sModalMoreText.textContent = announcement.more;


  itemFragment.appendChild(elItemTemplate)
});
elMainList.appendChild(itemFragment)


modalForm.addEventListener('submit', function(evt){
  evt.preventDefault();

  count++;
  localStorage.setItem('count', JSON.stringify(count));

  announcements.push(
    {
      title:modalTitle.value,
      companyName:modalCompany.value,
      techs:modalTechs.value,
      telegram:modalTg.value,
      tel:modalTel.value,
      location:modalLocate.value,
      respone:modalResponse.value,
      workTime:modalWorkTime.value,
      minSalary:modalSalary.value,
      more:modalTextarea.value,
      id:count
    }
    );
    localStorage.setItem('array', JSON.stringify(announcements));

    var elMainList = $_('.js-main-section__list');
    var itemFragment = document.createDocumentFragment()

    announcements.forEach(function(announcement){


      elMainList.innerHTML = ''
      modalForm.reset()


      var elItemTemplate = elTemplate.cloneNode(true);
      $_('.js-worktime', elItemTemplate ).textContent = announcement.workTime;
      $_('.js-announce-name-link', elItemTemplate ).textContent = announcement.title;
      $_('.js-announce-name-link', elItemTemplate ).dataset.id = announcement.id;
      $_('.js-employers', elItemTemplate ).textContent = announcement.companyName;
      $_('.js-location', elItemTemplate).textContent = announcement.location;

      itemFragment.appendChild(elItemTemplate)
    });
    elMainList.appendChild(itemFragment)
  });



var elNavTextInput = $_('.js-navigation__text-input');
var elNavHududSelect = $_('.js-navigation__hudud-select');
var elNavTimeSelect = $_('.js-avigation__time-select');
var elNavSalaryText = $_('.js-navigation__salary-text');
var elNavButton = $_('.js-navigation__button-search');
var elNavForm = $_('.js-navigation__form')


elNavForm.addEventListener('submit', function(evt){
evt.preventDefault()

elMainList.innerHTML = '';

navInput = new RegExp(elNavTextInput.value, 'gi');
hududInput = new RegExp(elNavHududSelect.value, 'gi');
// salaryInput = new RegExp(elNavSalaryText.value, 'gi');

var filteredAnniunce =  announcements.filter(function(announce){

// var salary = announce.minSalary.toString().match(salaryInput)
  return announce.techs.toString().match(navInput) && announce.location.toString().match(hududInput);
});

filteredAnniunce.forEach(function(announcement){

  var elNavTemplate = elTemplate.cloneNode(true);
  $_('.js-worktime', elNavTemplate ).textContent = announcement.workTime;
  $_('.js-announce-name-link', elNavTemplate ).textContent = announcement.title;
  $_('.js-announce-name-link', elNavTemplate ).dataset.id = announcement.id;
  $_('.js-employers', elNavTemplate ).textContent = announcement.companyName;
  $_('.js-location', elNavTemplate).textContent = announcement.location;

  console.log(announcement)
  itemFragment.appendChild(elNavTemplate)
});
 elMainList.appendChild( itemFragment)
});
