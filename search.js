document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resultsContainer = document.getElementById("search-results");
  
    // Функция для загрузки данных из JSON
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
  
    // Функция для отображения результатов поиска
    function displayResults(results) {
      resultsContainer.innerHTML = ""; // Очистить контейнер
  
      if (results.length === 0) {
        resultsContainer.innerHTML = "<p>Ничего не найдено.</p>";
        return;
      }
  
      results.forEach(product => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
          <h3>${product.name}</h3>
          <p><strong>Цена:</strong> ${product.price} руб.</p>
          <p><strong>Описание:</strong> ${product.description}</p>
          <img src="images/${product.image}" alt="${product.name}" style="max-width: 100px;">
        `;
        resultsContainer.appendChild(resultItem);
      });
    }
  
    // Обработчик клика на кнопку поиска
    searchButton.addEventListener("click", async () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;
  
      const products = await fetchProducts();
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
  
      displayResults(filteredProducts);
    });
  
    // Автопоиск при нажатии Enter
    searchInput.addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
  });