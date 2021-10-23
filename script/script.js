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






});