document.addEventListener("DOMContentLoaded", function () {
  const studentList = document.getElementById("student-list");
  const addStudentForm = document.getElementById("add-student-form");
  const editStudentForm = document.getElementById("edit-student-form");

  function fetchStudents() {
    fetch("http://localhost:3000/students")
      .then((response) => response.json())
      .then((data) => {
        studentList.innerHTML = "";
        data.forEach((student) => {
          const studentRow = document.createElement("tr");
          studentRow.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.yearOfBirth}</td>
            <td>${student.phone}</td>
            <td>${student.gender}</td>
            <td>${student.address}</td>
            <td>
              <button onclick="editStudent('${student.id}')">Sửa</button>
              <button onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
          `;
          studentList.appendChild(studentRow);
        });
      });
  }

  function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const yearOfBirth = document.getElementById("yearOfBirth").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;

    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        yearOfBirth,
        phone,
        gender,
        address,
      }),
    }).then(() => {
      fetchStudents();
      addStudentForm.reset();
    });
  }

  function deleteStudent(id) {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchStudents();
    });
  }

  function editStudent(id) {
    console.log(id);
    fetch(`http://localhost:3000/students/${id}`)
      .then((response) => response.json())
      .then((student) => {
        document.getElementById("edit-id").value = student.id;
        document.getElementById("edit-name").value = student.name;
        document.getElementById("edit-email").value = student.email;
        document.getElementById("edit-yearOfBirth").value = student.yearOfBirth;
        document.getElementById("edit-phone").value = student.phone;
        document.getElementById("edit-gender").value = student.gender;
        document.getElementById("edit-address").value = student.address;
        editStudentForm.style.display = "block";
      });
  }

  function updateStudent(event) {
    event.preventDefault();
    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const yearOfBirth = document.getElementById("edit-yearOfBirth").value;
    const phone = document.getElementById("edit-phone").value;
    const gender = document.getElementById("edit-gender").value;
    const address = document.getElementById("edit-address").value;

    fetch(`http://localhost:3000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        yearOfBirth,
        phone,
        gender,
        address,
      }),
    }).then(() => {
      fetchStudents();
      editStudentForm.reset();
      editStudentForm.style.display = "none";
    });
  }

  addStudentForm.addEventListener("submit", addStudent);
  editStudentForm.addEventListener("submit", updateStudent);

  // Đăng ký các hàm vào window để chúng có thể được gọi từ HTML
  window.editStudent = editStudent;
  window.deleteStudent = deleteStudent;

  fetchStudents();
});
