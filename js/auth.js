document.addEventListener("DOMContentLoaded", () => {
  // Элементы модальных окон
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const closerLogin = document.getElementById("closer-login");
  const closerRegister = document.getElementById("closer-register");
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  // Функция для открытия модального окна
  const openModal = (modal) => {
    modal.classList.add("active");
  };

  // Функция для закрытия модального окна
  const closeModal = (modal) => {
    modal.classList.remove("active");
  };

  // Обработчики событий для открытия модальных окон
  loginBtn.addEventListener("click", () => openModal(loginForm));
  registerBtn.addEventListener("click", () => openModal(registerForm));

  // Обработчики событий для закрытия модальных окон
  closerLogin.addEventListener("click", () => closeModal(loginForm));
  closerRegister.addEventListener("click", () => closeModal(registerForm));

  // Переключение между формами
  switchToRegister.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal(loginForm);
    openModal(registerForm);
  });

  switchToLogin.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal(registerForm);
    openModal(loginForm);
  });

  // Закрытие модальных окон при клике вне них
  document.addEventListener("click", (event) => {
    if (!loginForm.contains(event.target) && event.target !== loginBtn) {
      closeModal(loginForm);
    }
    if (!registerForm.contains(event.target) && event.target !== registerBtn) {
      closeModal(registerForm);
    }
  });

  // Закрытие модальных окон по нажатию клавиши Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(loginForm);
      closeModal(registerForm);
    }
  });

  // Валидация форм
  const validateForm = (form) => {
    let valid = true;
    const errors = form.querySelectorAll(".error-message");

    // Сброс сообщений об ошибках
    errors.forEach((error) => (error.style.display = "none"));

    form.querySelectorAll("input[required]").forEach((input) => {
      if (!input.value) {
        const errorMessage = form.querySelector(`#${input.id}-error`);
        errorMessage.innerText = `Пожалуйста, введите ${input.previousElementSibling.innerText.toLowerCase()}.`;
        errorMessage.style.display = "block";
        valid = false;
      }
    });

    return valid;
  };

  // Обработка отправки формы
  const handleFormSubmit = (event, form) => {
    event.preventDefault();
    if (validateForm(form)) {
      alert("Форма успешно отправлена!");
      closeModal(form);
    }
  };

  // Привязка обработчиков к формам
  const loginFormContent = document.getElementById("login-form-content");
  const registerFormContent = document.getElementById("register-form-content");

  loginFormContent.addEventListener("submit", (event) =>
    handleFormSubmit(event, loginFormContent)
  );
  registerFormContent.addEventListener("submit", (event) =>
    handleFormSubmit(event, registerFormContent)
  );
});
