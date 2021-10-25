  const togglePopup = () => {

    const callbackBtn = document.querySelector('#top-callback'),
          buttonServices = document.querySelector('.button-services'),
          callBackModalWindow = document.querySelector('#callback'),
          overlay = document.querySelector('.modal-overlay'),
          modalWindowShowButton = [callbackBtn, buttonServices];


    const popupHendler = function() {

      const popAnimation = function (opacity, displayValue){
        callBackModalWindow.style.opacity = `${opacity}%`;
        const phoneBox = document.querySelector('.tel');
        phoneBox.style.border = '2px solid #E3E3E4';
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


    modalWindowShowButton.forEach((button)=>{
      
      button.addEventListener('click', ()=>{
        popupHendler();
        callBackModalWindow.addEventListener('click', (event) => {
          let target = event.target;
          target = target.closest('div');

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
    });
  };

  export default togglePopup;