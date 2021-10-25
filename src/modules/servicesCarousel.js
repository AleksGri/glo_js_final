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


export default servicesCarousel;
  