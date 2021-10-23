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

         // popupForm = popupWindow.querySelector('#form3');

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
      mouseDown = false; 
    });
  };

  scrollBack();






});