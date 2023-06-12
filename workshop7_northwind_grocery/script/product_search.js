window.onload = init;
function init() {
  var productSelect = document.getElementById("productSelect");
  productSelect.addEventListener("change", searchProducts);
}

function searchProducts(e) {
  resetformContainers();
  var selectedValue = document.getElementById("productSelect").value;
  if (selectedValue === "ByCategory") {
    getCategories();
  }
  if (selectedValue === "ViewAll") {
    getAllProducts();
  }
}

function searchProductByCategory(e) {
  var formContainer = document.getElementById("resultContainer");
  formContainer.innerHTML = "";

  var selectedCategory = document.getElementById("categorySelect").value;
  if (selectedCategory) {
    getProductByCategory(selectedCategory);
  }
}

function loadCategorySelect(data) {
  var formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = "";

  //create select element
  var selectList = document.createElement("select");
  selectList.id = "categorySelect";
  selectList.className = "form-select form-select-lg mb-3";

  var option = document.createElement("option");
  option.text = "Select Category";
  option.value = "";
  selectList.appendChild(option);

  data.forEach((category) => {
    var option = document.createElement("option");
    option.value = category.categoryId;
    option.text = category.name;
    selectList.appendChild(option);
  });

  formContainer.appendChild(selectList);

  var categorySelect = document.getElementById("categorySelect");
  categorySelect.addEventListener("change", searchProductByCategory);
}

function displayProducts(data) {
  sortedData = data.sort((a, b) =>
    a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1
  );

  var formContainer = document.getElementById("resultContainer");
  formContainer.innerHTML = "\n Total Products : " + data.length;

  // Create the table element
  var table = document.createElement("table");
  table.classList.add("table");

  // Create the table header
  var thead = document.createElement("thead");
  thead.classList.add("table-primary");
  var headerRow = document.createElement("tr");

  var tableHeading = ["Product Id", "Product Name", "Price"];

  tableHeading.forEach((element) => {
    var th = document.createElement("th");
    th.textContent = element;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement("tbody");

  sortedData.forEach((product) => {
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    cell.textContent = product.productId;
    row.appendChild(cell);

    var cell = document.createElement("td");
    var aTag = document.createElement("a");
    aTag.setAttribute("href", "product_detail.html");
    aTag.setAttribute(
      "href",
      "product_detail.html?productid=" + product.productId
    );
    aTag.innerText = product.productName;
    aTag.target = "_blank";
    cell.appendChild(aTag);
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.textContent = "$ " + product.unitPrice;
    row.appendChild(cell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  resultContainer.appendChild(table);
}

function resetformContainers() {
  var formContainer = document.getElementById("formContainer");
  formContainer.innerHTML = "";
  var formContainer = document.getElementById("resultContainer");
  formContainer.innerHTML = "";
}

// =================== API Calls Start ======================
function getCategories() {
  fetch("http://localhost:8081/api/categories")
    .then((response) => response.json())
    .then((data) => {
      loadCategorySelect(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getAllProducts() {
  fetch("http://localhost:8081/api/products")
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getProductByCategory(productCategory) {
  fetch("http://localhost:8081/api/categories/" + productCategory)
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// =================== API Calls END ======================
