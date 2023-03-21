const DOM = {
  input: document.querySelector("#searchInput"),
  button: document.querySelector("#searchButton"),
  allProductsButton: document.querySelector("#showAllProducts"),
  content: document.querySelector("#content"),
};

function init() {
  DOM.allProductsButton.addEventListener("click", hadnleAll)
  DOM.button.addEventListener("click", handleSearch);
}
init();

async function hadnleAll() {
  try {
    showLoader();
    const result = await getAllProducts();
    console.log(result)
    for (let index = 0; index < result.length; index++) {
      const product = result[index];
      drawProduct(product);
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "Something went wrong!",
      text: "Contact Admin",
      icon: "error",
    });
  } finally {
    removeLoader();
  }
}

async function handleSearch() {
  try {
    showLoader();
    const result = await searchProduct(DOM.input.value);
    // if (!Array.isArray(result)) throw new Error("Api error");
    console.log(result)
    drawProduct(result);
    DOM.input.value = ""
  } catch (error) {
    console.log(error);
    swal({
      title: "Something went wrong!",
      text: "Contact Admin",
      icon: "error",
    });
  } finally {
    removeLoader();
  }
}

function drawProduct(productToDraw) {
  const div = document.createElement("div")
  div.classList.add("productDiv")
  const img = getImg(productToDraw.thumbnail);
  const p = document.createElement("p");
  p.innerText = productToDraw.title;
  div.append(img, p);
  DOM.content.append(div);
}

async function searchProduct(name) {
  const result = await fetch(`https://dummyjson.com/products`);
  const json = await result.json();
  return json.products.find(p => p.title.toLowerCase() == name);
}

async function getAllProducts() {
  const result = await fetch(`https://dummyjson.com/products`);
  const json = await result.json();
  return json.products;
}

function showLoader() {
  DOM.content.innerHTML = "";
  const loader = document.createElement("div");
  loader.id = "searchLoader";
  loader.classList.add("spinner-border");
  DOM.content.append(loader);
}

function removeLoader() {
  const loader = document.querySelector("#searchLoader");
  if (loader) {
    loader.remove();
  }
}
