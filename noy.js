const DOM = {
    input: document.querySelector("#searchInput"),
    button: document.querySelector("#searchButton"),
    allButton: document.querySelector("#allProductButton"),
    content: document.querySelector("#content"),
  };
  
  function init() {
    DOM.button.addEventListener("click", handleSearch);
    DOM.allButton.addEventListener("click", handleAll);
    // inputValue(DOM.input.value);
  }
  init();
  // function inputValue() {
  //   const input = DOM.input.value;
  //   return input;
  // }
  async function searchProducts(name) {
    const result = await fetch(`https://dummyjson.com/products`);
    const json = await result.json();
    return json.products.find((p) => p.title.toLowerCase() == name);
  }
  async function allProducts() {
    const result = await fetch(`https://dummyjson.com/products`);
    const json = await result.json();
    return json;
  }
  async function handleAll() {
    try {
      showLoader();
      const result = await allProducts();
      console.log(result);
      for (let index = 0; index < result.length; index++) {
        const product = result[index];
        draw(product);
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
      const result = await searchProducts(DOM.input.value);
      console.log(result);
      draw(result);
      DOM.input.value = "";
    } catch (error) {
      console.log("I AM HERE AND I AM NOT HAPPY");
      DOM.input.value = "";
      swal({
        title: "Something went wrong!",
        text: "Contact admin " + inputValue(),
        icon: "error",
      });
    } finally {
      removeLoader();
    }
  }
  
  function draw(productToDraw) {
    const img = getImg(productToDraw?.thumbnail);
    const h1 = document.createElement("h1");
    h1.innerText = productToDraw.title;
    DOM.content.append(img, h1);
  }
  function getImg(src, width = 400) {
    const img = document.createElement("img");
    img.height = 400;
    img.width = width;
    img.src = src;
    return img;
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