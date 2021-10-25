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

export default accordeon;