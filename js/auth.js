document.addEventListener('DOMContentLoaded', () => {
    // Обработчики для модальных окон
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const closerLogin = document.getElementById('closer-login');
    const closerRegister = document.getElementById('closer-register');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
  
    loginBtn.addEventListener('click', () => {
      loginForm.classList.add('active');
    });
  
    registerBtn.addEventListener('click', () => {
      registerForm.classList.add('active');
    });
  
    closerLogin.addEventListener('click', () => {
      loginForm.classList.remove('active');
    });
  
    closerRegister.addEventListener('click', () => {
      registerForm.classList.remove('active');
    });
  
    switchToRegister.addEventListener('click', (event) => {
      event.preventDefault();
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    });
  
    switchToLogin.addEventListener('click', (event) => {
      event.preventDefault();
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  
    // Закрытие модальных окон при клике вне них
    document.addEventListener('click', (event) => {
      if (!loginForm.contains(event.target) && event.target !== loginBtn) {
        loginForm.classList.remove('active');
      }
      if (!registerForm.contains(event.target) && event.target !== registerBtn) {
        registerForm.classList.remove('active');
      }
    });
  });