import { menuArray } from "/data/data.js"

/*___ Declarations ___*/
const orderArr = []
let orderTotalPrice = 0

/*___ Start App ___*/
renderMenu()

/*___ Event Listeners ___*/
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  } else if (e.target.id === "order-visibility-btn") {
    toggleOrderVisibility()
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove)
  }
})

/*___ Functions ___*/
function renderMenu() {
  const articlesEl = document.querySelector("#articles")
  const menuHTML = getMenuHTML()
  articlesEl.innerHTML = menuHTML
}

function renderOrder() {
  const productsOrderEl = document.querySelector("#products-order")
  const orderHTML = getOrderHTML()
  productsOrderEl.innerHTML = orderHTML
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

function getOrderHTML() {
  let index = -1
  const orderHTML = orderArr
    .map((product) => {
      index++
      /*_______ Acabar amb uuid _______*/
      return `
      <div class="product-order">
        <h2 class="product-order-title">${product.name}</h2>
        <button class="remove-btn" data-remove="${index}">
          remove
        </button>
        <p class="price">$${product.price}</p>
      </div>
    `
    })
    .join("")
  return orderHTML
}

function renderTotalPrice() {
  const orderTotalPriceEl = document.querySelector("#order-total-price")
  orderTotalPrice = getOrderTotalPrice()
  orderTotalPriceEl.textContent = `$${orderTotalPrice}`
}

function getOrderTotalPrice() {
  const totalPrice = orderArr.reduce((acc, cur) => acc + cur.price, 0)
  return totalPrice
}

function handleAddClick(productID) {
  const productTarget = menuArray.filter(
    (product) => Number(productID) === product.id
  )[0]
  orderArr.push(productTarget)
  renderOrder()
  renderTotalPrice()
}

function handleRemoveClick(productIndex) {
  const targetProductIndex = Number(productIndex)
  orderArr.splice(targetProductIndex, 1)
  renderOrder()
  renderTotalPrice()
}

function toggleOrderVisibility() {
  document.querySelector("#products-order").classList.toggle("hidden")
}

function formatIngredientsList(ingredientsArr) {
  const formatter = new Intl.ListFormat("en-gb", {
    style: "long",
    type: "conjunction",
  })
  return formatter.format(ingredientsArr)
}
