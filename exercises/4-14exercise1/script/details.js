window.onload = init;
function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const courseId = urlParams.get("courseid");
  getCourseDetails(courseId);
}

function getCourseDetails(courseId) {
  fetch("http://localhost:8081/api/courses/" + courseId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const row = document.createElement("tr");

      const departmentCell = document.createElement("td");
      departmentCell.textContent = data.id;
      row.appendChild(departmentCell);

      const courseNumberCell = document.createElement("td");
      courseNumberCell.textContent = data.dept;
      row.appendChild(courseNumberCell);

      const tvalue1 = document.createElement("td");
      tvalue1.textContent = data.courseNum;
      row.appendChild(tvalue1);

      const tvalue2 = document.createElement("td");
      tvalue2.textContent = data.courseName;
      row.appendChild(tvalue2);

      const tvalue3 = document.createElement("td");
      tvalue3.textContent = data.instructor;
      row.appendChild(tvalue3);

      const tvalue4 = document.createElement("td");
      tvalue4.textContent = data.startDate;
      row.appendChild(tvalue4);

      courseTableBody.appendChild(row);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
