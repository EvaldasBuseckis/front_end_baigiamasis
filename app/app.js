// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document
  .querySelector(".createPostForm")
  .addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const type = e.target.elements.type.value;
  const content = e.target.elements.content.value;
  const date = e.target.elements.endDate.value;
  const email = localStorage.getItem("email");
  console.log(email);

  const post = {
    Type: type,
    Content: content,
    endDate: date,
    Email: email,
  };

  console.log("1");
  fetch("https://testapi.io/api/Evaldas/resource/toDoList", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".posts").innerHTML = "";
      getPosts();
    })
    .catch((error) => console.log(error));
}

function getPosts() {
  fetch("https://testapi.io/api/Evaldas/resource/toDoList")
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i <= data.data.length; i++) {
        console.log(data.data[i]);
        if (data.data[i].Email === localStorage.getItem("email")) {
          createPostsHTML([data.data[i]]);
          console.log("veik");
        }
      }
      // createPostsHTML([data.data[0]]);
      console.log([data.data[0]]);
      console.log(data.data[0].Email);
    })
    .catch((error) => console.log(error));
}

function createPostsHTML(data) {
  // console.log(data);

  data.forEach((post) => {
    const containerEl = document.createElement("table");
    containerEl.id = "post_id_" + post.id;
    containerEl.style.border = "1px solid black";
    containerEl.style.padding = "5px";
    containerEl.style.height = "75px";
    containerEl.style.width = "1000px";
    containerEl.style.borderRadius = "5px";
    containerEl.style.backgroundColor = "#5996e3";

    const typeEl = document.createElement("td");
    typeEl.style.width = "100px";
    typeEl.style.display = "block";
    typeEl.style.overflowY = "auto";
    typeEl.style.whiteSpace = "nowrap";
    typeEl.style.borderRadius = "5px";
    typeEl.style.backgroundColor = "white";
    typeEl.textContent = post.Type;
    containerEl.append(typeEl);

    const dateEl = document.createElement("td");
    dateEl.style.width = "100px";
    dateEl.style.borderRadius = "5px";
    dateEl.style.backgroundColor = "white";
    dateEl.textContent = post.endDate;
    containerEl.append(dateEl);

    const updatedEl = document.createElement("td");
    updatedEl.style.width = "250px";
    updatedEl.style.borderRadius = "5px";
    updatedEl.style.backgroundColor = "white";
    updatedEl.textContent = post.updatedAt;
    containerEl.append(updatedEl);

    const contentEl = document.createElement("td");
    contentEl.style.display = "block";
    contentEl.style.overflowY = "auto";
    contentEl.style.whiteSpace = "nowrap";
    contentEl.style.width = "100px";
    contentEl.style.borderRadius = "5px";
    contentEl.style.backgroundColor = "white";
    contentEl.textContent = post.Content;
    containerEl.append(contentEl);

    const editButtonEl = document.createElement("button");
    editButtonEl.addEventListener("click", openEditModal);
    editButtonEl.style.margin = "5px";
    editButtonEl.style.borderRadius = "5px";
    editButtonEl.textContent = "Edit";
    containerEl.append(editButtonEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.addEventListener("click", deletePost);
    deleteButtonEl.style.borderRadius = "5px";
    deleteButtonEl.textContent = "Delete";
    containerEl.append(deleteButtonEl);

    document.querySelector(".posts").append(containerEl);
  });
}

function openEditModal(e) {
  modal.style.display = "block";
  console.log(e.target.parentElement.id);

  const idValue = e.target.parentElement.id.substring(8);
  const typeValue = document.querySelector(
    `#${e.target.parentElement.id} h2`
  ).textContent;
  const contentValue = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(2)`
  ).textContent;
  const dateValue = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(3)`
  ).textContent;

  console.log(idValue, typeValue, contentValue, dateValue);

  document.querySelector(".editPostForm").elements.id.value = idValue;
  document.querySelector(".editPostForm").elements.type.value = typeValue;
  document.querySelector(".editPostForm").elements.content.value = contentValue;
  document.querySelector(".editPostForm").elements.endDate.value = dateValue;
}

function deletePost(e) {
  const idValue = e.target.parentElement.id.substring(8);

  fetch(`https://testapi.io/api/Evaldas/resource/toDoList/${idValue}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        document.querySelector(`#${e.target.parentElement.id}`).remove();
      }
    })
    .catch((error) => console.log(error));
}

getPosts();

document
  .querySelector(".editPostForm")
  .addEventListener("submit", submitEditForm);

function submitEditForm(e) {
  e.preventDefault();
  const type = e.target.elements.type.value;
  const content = e.target.elements.content.value;
  const id = e.target.elements.id.value;
  const date = e.target.elements.endDate.value;

  const post = {
    Type: type,
    Content: content,
    endDate: date,
  };

  fetch(`https://testapi.io/api/Evaldas/resource/toDoList/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      modal.style.display = "none";
    })
    .catch((error) => console.log(error));
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
