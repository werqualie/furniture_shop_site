// Функция для загрузки данных из JSON
async function loadProducts() {
    try {
      const response = await fetch('json/products.json');
      if (!response.ok) {
        throw new Error('Не удалось загрузить товары');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(error);
      alert('Ошибка загрузки товаров');
    }
  }
  
  // Функция для отображения товаров
  function displayProducts(products, containerId = 'products-container') {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Очищаем контейнер перед добавлением новых товаров
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('box');
      productCard.innerHTML = `
        <div class="image">
          <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
          </a>
        </div>
        <div class="content">
          <h3>${product.name}</h3>
          <div class="price">${product.price.toLocaleString()} ₽</div>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <span> (50) </span>
          </div>
          <button class="btn">Подробнее</button>
        </div>
      `;
      container.appendChild(productCard);
    });
  }
  
  // Функция для поиска товаров
  function searchProducts(query, products) {
    return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  }
  
  // Обработчик события поиска
  document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const products = await loadProducts();
    if (products) {
      const filteredProducts = searchProducts(query, products);
      displayProducts(filteredProducts, 'search-results');
      document.getElementById('search-results').style.display = 'block';
    }
  });
  
  // Обработчик нажатия клавиши Enter в поле поиска
  document.getElementById('search-input').addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      const query = document.getElementById('search-input').value;
      const products = await loadProducts();
      if (products) {
        const filteredProducts = searchProducts(query, products);
        displayProducts(filteredProducts, 'search-results');
        document.getElementById('search-results').style.display = 'block';
      }
    }
  });
  
  // Основная функция для выполнения
  async function main() {
    const products = await loadProducts();
    if (products) {
      displayProducts(products);
    }
  }
  
  main();