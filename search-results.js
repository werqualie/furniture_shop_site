// Функция для загрузки данных из products.json
async function fetchProducts() {
    try {
      const response = await fetch("products.json");
      if (!response.ok) throw new Error("Не удалось загрузить данные.");
      return await response.json();
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      return [];
    }
  }
  
  // Функция для отображения товаров
  function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
  
    if (products.length === 0) {
      container.innerHTML = "<p>Ничего не найдено.</p>";
      return;
    }
  
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "box";
  
      productCard.innerHTML = `
        <div class="image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="content">
          <h3>${product.name}</h3>
          <div class="price">${product.price} ₽</div>
          <div class="stars">
            ${generateStars(5)} <!-- Пока что показываем 5 звезд -->
            <span>(50)</span>
          </div>
        </div>
      `;
  
      container.appendChild(productCard);
    });
  }
  
  // Генерация звезд для рейтинга
  function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return stars;
  }
  
  // Фильтрация товаров по запросу
  function filterProducts(query, products) {
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Сортировка товаров
  function sortProducts(products, sortBy) {
    switch (sortBy) {
      case "name-asc":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }
  
  // Получение параметров из URL
  function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("query")?.toLowerCase() || "";
  }
  
  // Главная функция для загрузки и отображения результатов
  async function loadResults() {
    const query = getSearchQuery();
    const products = await fetchProducts();
    const filteredProducts = filterProducts(query, products);
  
    // Сохраняем отфильтрованные товары для сортировки
    localStorage.setItem("filteredProducts", JSON.stringify(filteredProducts));
  
    // Отображаем результаты
    displayProducts(filteredProducts);
  }
  
  // Обработка изменения сортировки
  function sortResults() {
    const sortBy = document.getElementById("sort-by").value;
    const filteredProducts = JSON.parse(localStorage.getItem("filteredProducts")) || [];
    const sortedProducts = sortProducts(filteredProducts, sortBy);
    displayProducts(sortedProducts);
  }
  
  // Загрузка результатов при загрузке страницы
  document.addEventListener("DOMContentLoaded", loadResults);