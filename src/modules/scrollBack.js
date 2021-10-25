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

  export default scrollBack;