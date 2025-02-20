// Получаем ID товара из URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'), 10);

// Функция для загрузки данных из JSON
async function loadProducts() {
  const response = await fetch('json/products.json');
  const products = await response.json();
  return products;
}

// Функция для отображения товара
function displayProduct(product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `Цена: ${product.price.toLocaleString()} ₽`;
  document.getElementById('product-description').textContent = product.description;
}

// Основная функция для выполнения
async function main() {
  const products = await loadProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    displayProduct(product);
  } else {
    alert('Товар не найден');
  }
}

main();