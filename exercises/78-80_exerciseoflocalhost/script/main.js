window.onload = init;
function init() {
  getCourses();
}

function getCourses() {
  fetch("http://localhost:8081/api/courses")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((course) => {
        const row = document.createElement("tr");

        const departmentCell = document.createElement("td");
        departmentCell.textContent = course.dept;
        row.appendChild(departmentCell);

        const courseNumberCell = document.createElement("td");
        courseNumberCell.textContent = course.courseNum;
        row.appendChild(courseNumberCell);

        const titleCell = document.createElement("td");
        var aTag = document.createElement("a");
        aTag.setAttribute("href", "details.html?courseid=" + course.id);
        aTag.innerText = course.courseName;
        // aTag.target = "_blank";
        titleCell.appendChild(aTag);

        row.appendChild(titleCell);

        courseTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
