window.onload = init;
function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ProductId = urlParams.get("productid");
  if (ProductId) {
    getProductDetails(ProductId);
  } else {
    window.location.href = "index.html";
  }
}

function getProductDetails(ProductId) {
  fetch("http://localhost:8081/api/Products/" + ProductId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const row = document.createElement("tr");

      const departmentCell = document.createElement("td");
      departmentCell.textContent = data.productId;
      row.appendChild(departmentCell);

      const ProductNumberCell = document.createElement("td");
      ProductNumberCell.textContent = data.productName;
      row.appendChild(ProductNumberCell);

      const tvalue1 = document.createElement("td");
      tvalue1.textContent = data.unitPrice;
      row.appendChild(tvalue1);

      const tvalue2 = document.createElement("td");
      tvalue2.textContent = data.unitsInStock;
      row.appendChild(tvalue2);

      const tvalue3 = document.createElement("td");
      tvalue3.textContent = data.categoryId;
      row.appendChild(tvalue3);

      const tvalue4 = document.createElement("td");
      tvalue4.textContent = data.supplier;
      row.appendChild(tvalue4);

      const tvalue5 = document.createElement("td");
      tvalue5.textContent = data.discontinued;
      row.appendChild(tvalue5);

      ProductTableBody.appendChild(row);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
