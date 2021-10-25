window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const pageNavigation = () => {

    const topMenu = document.querySelector('.top-menu');

    topMenu.addEventListener('click', (event)=>{
      event.preventDefault();
      let target = event.target;
      target = target.closest('a');
      if(target) {
        const moveToSection = () => {
          const selector = target.href.substring(target.href.indexOf("#")),
                section = document.querySelector(selector);
          let position = section.getBoundingClientRect();
          window.scrollTo(position.left, position.top + window.scrollY - 100);
        };
        moveToSection();
      }
    });
  };

  pageNavigation();

  const togglePopup = () => {

    const callbackBtn = document.querySelector('#top-callback'),
          callBackModalWindow = document.querySelector('#callback'),
          overlay = document.querySelector('.modal-overlay');


    const popupHendler = function() {

      const popAnimation = function (opacity, displayValue){
        callBackModalWindow.style.opacity = `${opacity}%`;
        function initiateTimeOut() {
          setTimeout(function() { opacityChanger();}, 50);
        }

        function opacityChanger() {
          if(displayValue === 'block') {
            callBackModalWindow.style.display = displayValue;
            overlay.style.display = displayValue;
            opacity += 10;
            callBackModalWindow.style.opacity = `${opacity}%`;
            overlay.style.opacity = `${opacity}%`;
            if (opacity < 100) {
                initiateTimeOut(); 
            }

          } else {
            opacity -= 10;
            callBackModalWindow.style.opacity = `${opacity}%`;
            overlay.style.opacity = `${opacity}%`;
            if (opacity > 0) {
                initiateTimeOut(); 
            } else {
              callBackModalWindow.style.display = displayValue;
              overlay.style.display = displayValue;
            }
          } 
        }
        initiateTimeOut();
      };

      if(!callBackModalWindow.style.display || callBackModalWindow.style.display === 'none') {
        if(window.innerWidth < 768) {
          callBackModalWindow.style.display = 'block';  
        } else {
          popAnimation(0, 'block');
        }
      } else {
        if(window.innerWidth < 768) {
          callBackModalWindow.style.display = 'none';
        } else {
          popAnimation(100, 'none');
        }
      }
    };

    callbackBtn.addEventListener('click', ()=>{
      popupHendler();
      callBackModalWindow.addEventListener('click', (event) => {
        let target = event.target;
        target = target.closest('div');
        //console.log(target);
        

        if (target.classList.contains('modal-close')) {
          popupHendler();
        }
      });

      overlay.addEventListener('click', (event)=>{
          let target = event.target;
          target = target.closest('#callback');
          if(!target) {popupHendler();}
      });
      
    });
  };

  togglePopup();


  const scrollBack = () => {
    const services = document.querySelector('#services'),
          upButton = document.querySelector('.up'),
          topSlider = document.querySelector('.top-slider');
    let mouseDown;

    window.addEventListener('scroll', ()=>{
      const position = services.getBoundingClientRect();

      if(position.y < 100) {
        upButton.style.display = 'block';
      } else {
        upButton.style.display = 'none';
      }
    });

    upButton.addEventListener('mousedown', (event)=>{

      mouseDown = true;

      function initiateTimeOut() {
          setTimeout(function() { scroller();}, 50);
        }

        function scroller() {
          window.scrollBy(0, -50);
          let topSliderPosition = topSlider.getBoundingClientRect();
          if (topSliderPosition.y < 0 && mouseDown) {
                initiateTimeOut(); 
            }
        }
        initiateTimeOut();
    });

    upButton.addEventListener('mouseup', (event)=>{
      mouseDown = true; //put 'false' if you'd loke to stop scrolling by mouseUp
    });
  };

  scrollBack();


  //Slider
  const slider = () => {

    const slide = document.querySelectorAll('.item'),
          slider = document.querySelector('.top-slider');
    let currentSlide = 1,
        previousSlide = 0,
        interval;

      slide[currentSlide-1].childNodes[1].style.opacity = '100%';
      slide[currentSlide-1].childNodes[1].style.visibility = 'visible';

    const autoPlay = () => {
      slide[currentSlide].childNodes[1].style.opacity = '100%';
      slide[currentSlide].childNodes[1].style.visibility = 'visible';
      slide[currentSlide].style.display = 'block';
      slide[previousSlide].style.display = 'none';
      currentSlide += 1;
      if(currentSlide > 2) {
        currentSlide = 0;
      }
      previousSlide += 1;
      if(previousSlide > 2) {
        previousSlide = 0;
      }
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlay, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('mouseout', (event) => {
        startSlide();
    });
    startSlide();
  };

  slider();


  //servicesCarousel
  const servicesCarousel = () => {

    class SliderCarousel{
		  constructor({main, 
        wrap, 
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
      }){
			if(!main || !wrap){
				console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
			}
			this.main = document.querySelector(main);
			this.wrap = document.querySelector(wrap);
			this.slides = document.querySelector(wrap).children;
			this.next = document.querySelector(next);
			this.prev = document.querySelector(prev);
			this.slidesToShow = slidesToShow;
			this.options = {
				position,
				infinity,
				widthSlide: Math.floor(100 / this.slidesToShow)
			};
			this.responsive = responsive;
		  }
	
      init(){
        this.addGloClass();
        this.addStyle();
    
        if(this.prev && this.next){
          this.controlSlider();
        }else{
          this.controlSlider();
        }
        if(this.responsive){
          this.responsiveInit();
        }
      }
	
      addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for(const item of this.slides){
          item.classList.add('glo-slider__item');
        }
      }
	
      addStyle(){
        let style = document.getElementById('sliderCarousel-style');
        if(!style){
          style = document.createElement('style');
          style.id = 'sliderCarousel-style';
        }
    
        style.textContent = `
          .glo-slider{
            overflow: hidden !important;
          }
          .glo-slider__wrap{
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
          }
          .glo-slider__item{
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 ${this.options.widthSlide}% !important;
            margin: auto 0 !important;
          }
        `;
        document.head.appendChild(style);
      }
	
      controlSlider(){
        this.next.addEventListener('click', this.nextSlider.bind(this));
        this.prev.addEventListener('click', this.prevSlider.bind(this));
      }
	
      prevSlider(){
        if(this.options.infinity || this.options.position > 0){
          --this.options.position;
          if(this.options.position < 0){
            this.options.position = this.slides.length - this.slidesToShow;
          }
          this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
      }
    
      nextSlider(){
        if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
          ++this.options.position;
          if(this.options.position > this.slides.length - this.slidesToShow){
            this.options.position = 0;
          }
          this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
      }
	
      responsiveInit(){
        const slidesToShowDefault = this.slidesToShow,
          allResponse = this.responsive.map(item => item.breakpoint),
          maxResponse = Math.max(...allResponse);
    
        const checkResponse = () =>{
          const widthWindow = document.documentElement.clientWidth;
    
          if(widthWindow < maxResponse){
            for(let i = 0; i < allResponse.length; i++){
              if(widthWindow < allResponse[i]){
                this.slidesToShow = this.responsive[i].slideToShow;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
              }
            }
          }else{
            this.slidesToShow = slidesToShowDefault;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
          }
        };
        checkResponse();
    
        window.addEventListener('resize', checkResponse);
      }
	
	  }
	
    const carousel = new SliderCarousel({
      main: '.services-elements',
      wrap: '.services-carousel',
      next: '.arrow-right',
      prev: '.arrow-left',
      slidesToShow: 3,
      infinity: true,
      responsive: [{
        breakpoint: 1024,
        slideToShow: 3
        },
        {
        breakpoint: 768,
        slideToShow: 2
        },
        {
        breakpoint: 576,
        slideToShow: 1
        }
      ]
	  });
	
	  carousel.init();
  };
  

  servicesCarousel();



  const togglePopup2 = () => {

    const buttonServices = document.querySelector('.button-services'),
          callBackModalWindow = document.querySelector('#callback'),
          overlay = document.querySelector('.modal-overlay');


    const popupHendler = function() {

      const popAnimation = function (opacity, displayValue){
        callBackModalWindow.style.opacity = `${opacity}%`;
        function initiateTimeOut() {
          setTimeout(function() { opacityChanger();}, 50);
        }

        function opacityChanger() {
          if(displayValue === 'block') {
            callBackModalWindow.style.display = displayValue;
            overlay.style.display = displayValue;
            opacity += 10;
            callBackModalWindow.style.opacity = `${opacity}%`;
            overlay.style.opacity = `${opacity}%`;
            if (opacity < 100) {
                initiateTimeOut(); 
            }

          } else {
            opacity -= 10;
            callBackModalWindow.style.opacity = `${opacity}%`;
            overlay.style.opacity = `${opacity}%`;
            if (opacity > 0) {
                initiateTimeOut(); 
            } else {
              callBackModalWindow.style.display = displayValue;
              overlay.style.display = displayValue;
            }
          } 
        }
        initiateTimeOut();
      };

      if(!callBackModalWindow.style.display || callBackModalWindow.style.display === 'none') {
        if(window.innerWidth < 768) {
          callBackModalWindow.style.display = 'block';  
        } else {
          popAnimation(0, 'block');
        }
      } else {
        if(window.innerWidth < 768) {
          callBackModalWindow.style.display = 'none';
        } else {
          popAnimation(100, 'none');
        }
      }
    };

    buttonServices.addEventListener('click', ()=>{
      popupHendler();
      callBackModalWindow.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('div');
      //console.log(target);
      

      if (target.classList.contains('modal-close')) {
        popupHendler();
      } else {
        // Тут будет обработчик формы
      }
      });

      overlay.addEventListener('click', (event)=>{
        console.log("tut");
          let target = event.target;
          target = target.closest('#callback');
          console.log(target);
          
          if(!target) {popupHendler();}
      });
      
    });
  };

  togglePopup2();

const accordeon = () => {
    const accordeonWrapper = document.querySelector('.accordeon');
    Array.from(accordeonWrapper.children).forEach((element, index) => {
      element.addEventListener('click', ()=>{
        for(let i = 0; i < accordeonWrapper.children.length; i++ ){
          if (i === index) {
            accordeonWrapper.children[i].classList.add('active');
            accordeonWrapper.children[i].children[1].style.display = 'block';
          } else {
            accordeonWrapper.children[i].classList.remove('active');
            accordeonWrapper.children[i].children[1].style.display = 'none';
          }
        }
      });
   });
 };

 accordeon();

































  

 

  

  // sent-ajax-form

  const postData = (body) => {
    
    return fetch('./server.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'Application/json'},
                    body: JSON.stringify(body)
                });
  };

  const formSender = (event, element) => {
    event.preventDefault();

    const errorMesssage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          succsessMessage = 'Спасибо!!! Мы скоро с Вами свяжемся...',
          statuseMessage = document.createElement('div'),
          formData = new FormData(element),
          body = {};
    
    statuseMessage.style.color = '#000';
    element.append(statuseMessage);

    formData.forEach((val, key) => {
      body[key] = val;
    });

    statuseMessage.textContent = loadMessage;

    postData(body)
    .then((response)=>{
            if (response.status !== 200) {
              throw new Error('Network status is not 200');
            }
            statuseMessage.textContent = succsessMessage;
          })
    .catch((error)=>{
            statuseMessage.textContent = errorMesssage;
            console.error(error);
          })
    .finally(()=>{
            element.reset();
            setInterval(()=>{
              statuseMessage.remove();
            }, 3000);
          });
  };



   
  const validator = (value, name) => {
    switch (name) {
      case 'fio':
          value = value.replace(/[^а-яё ,!?\d\-\.]/ig, '');
          return value;
      case 'tel':
        let phone = value.replace(/[^0-9+]/g, '');
        return phone;
    }
  };
  
  
  
  const formHeandler = (event) => {
    let target = event.target;
      let value = target.value;
      let name = target.name;
      target.value = validator(value,name);
  };

  const feedbackSender = () =>{
    const formCallback = document.querySelector('form');

    formCallback.addEventListener('input', (event) => {
      formHeandler(event);
    });

    formCallback.addEventListener('submit', (event)=>{
      event.preventDefault();
      const phoneBox = event.target.children[1].children[0],
            element = event.target;
      phoneBox.style.border = '2px solid #E3E3E4';
      if(phoneBox.value === '') {
        phoneBox.style.border = 'solid 2px red';
        return;
      }
      
      formSender(event, element);
    });
    
  };

  feedbackSender();














});