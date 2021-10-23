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
          body = document.querySelector('body');

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
            opacity += 10;
            callBackModalWindow.style.opacity = `${opacity}%`;
            if (opacity < 100) {
                initiateTimeOut(); 
            }

          } else {
            opacity -= 10;
            callBackModalWindow.style.opacity = `${opacity}%`;
            if (opacity > 0) {
                initiateTimeOut(); 
            } else {
              callBackModalWindow.style.display = displayValue;
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

      body.addEventListener('click', (event)=>{
        console.log("tut");
          let target = event.target;
          target = target.closest('#callback');
          console.log(target);
          
          if(!target) {popupHendler();}
      });
      
    });
  };

  togglePopup();


});