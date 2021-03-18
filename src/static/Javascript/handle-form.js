function login(){
  const form = document.getElementById('btn-login');
  
  form.addEventListener('click',function (e){
    console.log('fet login');
    e.preventDefault();
    var user = document.getElementById('login-username-input').value;
    var pass = document.getElementById('login-password-input').value;

    fetch(url_login,{
      method: 'post',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({username: user, password: pass})
    }).then(function (response){
        if (response.status === 200)
        {
        location.replace(url_management);
        alert('đăng nhập thành công');
        }
      else {
          alert('đăng nhập không thành công');
          location.replace(url_home);
        }
    })
  });
}

// change the forms
function changeForms(showForm) {
    let formHidden = document.getElementsByClassName('fm');
    for(let f of formHidden){
      f.style.display = 'none';
    }

      document.querySelector('.modal').style.display = 'flex';
      showForm.style.display = 'block';
  }

// handle register and login forms
function handleForms() {
    let regItem = document.getElementById('register-item'); // get element of register item
    let logItem = document.getElementById('login-item'); // get element of register item

    let modalLayer = document.querySelector('.modal'); // get element of modal layer

    let regForm = document.getElementById('register-form'); // get element of register form
    let logForm = document.getElementById('login-form'); // get element of login form

    let regToLogBtn = document.querySelector('#register-form .auth-form__switch-btn'); // get element of login button from register form
    let logToRegBtn = document.querySelector('#login-form .auth-form__switch-btn'); // get element of register button from login form
    
    // handle register form
    regItem.onclick = () => {
        Validator('#register-form', '.auth-form__group', 3);
        changeForms(regForm);
        
    }

    // switch to login form
    regToLogBtn.onclick = () => {
        Validator('#login-form', '.auth-form__group', 3);
        changeForms(logForm);
    }

    // handle login form
    logItem.onclick = () => {
        changeForms(logForm);
    }
   
    // switch to register form
    logToRegBtn.onclick = () => {
        Validator('#register-form', '.auth-form__group', 3);
        changeForms(regForm);
    }

    // get element of overlay and remove the modal layer when clicked outside
    document.querySelector('.modal__overlay').onclick = () => {
        Validator('#register-form', '.auth-form__group', 3, ' ');
        Validator('#login-form', '.auth-form__group', 3, ' ');
        modalLayer.style.display = 'none';
    }
    addHandleForm();
}

function addHandleForm(){}

function Validator(form, childForm, min, str) {
    let formEl = document.querySelector(form); // get element of form
    
    let childFormEls = formEl.querySelectorAll(childForm); // get elements of child form
    let inpEls = formEl.querySelectorAll('input[rule]'); // get elements of input whose attribute is rule

    // add span element to child form
    for (let childFormEl of childFormEls) {
        childFormEl.appendChild(document.createElement('span')).setAttribute('class', 'error-message');
    }

    // check rule of each input
    function ruleChecking(inpEl, str) {
        let inpAttr = inpEl.getAttribute('rule'); // get attribute value of input

        if (inpAttr === 'email') {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            return regex.test(inpEl.value) ? undefined : messageAdding(inpEl, str||'Trường này phải là Email', str||'red');
        } else if (inpAttr === 'password') {
            let regex = new RegExp(`^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{${min},}$`);

            return regex.test(inpEl.value) ? undefined : messageAdding(inpEl, str||`Vui lòng nhập tối thiểu ${min} kí tự`, str||'red');
        } else if (inpAttr === 'password_confirmation') {
            let passInp = formEl.querySelector('input[rule=password]');

            return inpEl.value === passInp.value ? undefined : messageAdding(inpEl, str||'Mật khẩu nhập lại không chính xác', str||'red');
        } 
    }

    // check if input has a parent and add error message
    function messageAdding(inpEl, message, color) {
        while (inpEl.parentElement) {
            let inpParent = inpEl.parentElement;

            if (inpParent.matches(childForm)) {
                let inpSpan = inpParent.querySelector('span.error-message');

                inpSpan.innerHTML = message;
                inpSpan.style = 'color: red; font-size: 0.95rem';
                inpEl.style = `border-color: ${color}`;
            }
            inpEl = inpParent;
        }
    }

    // loop through each input
    for (let inpEl of inpEls) {
        // clear form
        if (str) {
            formEl.reset();
            ruleChecking(inpEl, str);
            messageAdding(inpEl, str);
        }

        inpEl.onblur = () => {
            if (inpEl.value) {
                ruleChecking(inpEl);
            } else {
                messageAdding(inpEl, str||'Vui lòng nhập trường này', str||'red');
            }
        }

        inpEl.oninput = () => {
            messageAdding(inpEl, str||'', 'none');
        }
    }

    // handle when submit form
    formEl.onsubmit = (e) => {
        e.preventDefault();

        // check all forms before submitting
        for (let inpEl of inpEls) {
            if (inpEl.value) {
                ruleChecking(inpEl);
            } else {
                messageAdding(inpEl, str||'Vui lòng nhập trường này', str||'red');
            }
        }
    }
}

// check if input has a parent and add error message
function messageAdding(inpEl,childForm, message, color) {
    while (inpEl.parentElement) {
        let inpParent = inpEl.parentElement;

        if (inpParent.matches(childForm)) {
            let inpSpan = inpParent.querySelector('span.error-message');
            console.log('ok');

            inpSpan.innerHTML = message;
            inpSpan.style = 'color: red; font-size: 0.95rem';
            inpEl.style = `border-color: ${color}`;
        }
        inpEl = inpParent;
    }
}