document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      alert('Вход успешен!');
      // Сохраняем информацию о пользователе в sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'https://werqualie.github.io/furniture_shop_site/';
    } else {
      alert('Неверный email или пароль');
    }
  });