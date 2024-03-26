import { menuArray } from "/data/data.js"

renderMenu()

document.addEventListener("click", (e) => {
  e.target.dataset.add && handleAddClick(e.target.dataset.add)
  e.target.id === "order-visibility-btn" && toggleOrderVisibility()
})

function renderMenu() {
  const articlesEl = document.querySelector("#articles")
  const menuHTML = getMenuHTML()
  articlesEl.innerHTML = menuHTML
}

function getMenuHTML() {
  const menuHTML = menuArray
    .map((product) => {
      const { name, ingredients, price, image, id } = product
      const ingredientsList = formatIngredientsList(ingredients)
      return `
      <article class="product">
        <img class="product-img" src="${image}" alt="${name}" />
        <div class="product-details">
          <h2>${name}</h2>
          <p>${ingredientsList}</p>
          <p class="price">$${price}</p>
        </div>
        <button class="add-product-btn" data-add="${id}">+</button>
      </article>
    `
    })
    .join("")
  return menuHTML
}

function formatIngredientsList(ingredientsArr) {
  const formatter = new Intl.ListFormat("en-gb", {
    style: "long",
    type: "conjunction",
  })
  return formatter.format(ingredientsArr)
}

function handleAddClick(productID) {
  console.log(productID)
}

function toggleOrderVisibility() {
  document.querySelector("#products-order").classList.toggle("hidden")
}
