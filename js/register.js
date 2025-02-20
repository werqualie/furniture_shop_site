document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;
  
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
  
    // Здесь можно добавить логику сохранения данных пользователя, например, в localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);
  
    if (userExists) {
      alert('Пользователь с таким email уже зарегистрирован');
      return;
    }
  
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Регистрация успешна!');
    window.location.href = 'login.html';
  });