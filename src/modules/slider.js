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

    startSlide();
  };


  export default slider;