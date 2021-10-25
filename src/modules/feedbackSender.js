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


export default feedbackSender;
