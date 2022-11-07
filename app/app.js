// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document
  .querySelector(".createPostForm")
  .addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const title = e.target.elements.title.value;
  const content = e.target.elements.content.value;
  const datete = e.target.elements.endDate.value;

  const post = {
    Title: title,
    Content: content,
    endDate: datete,
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
      createPostsHTML(data.data);
    })
    .catch((error) => console.log(error));
}

function createPostsHTML(data) {
  console.log(data);

  data.forEach((post) => {
    const containerEl = document.createElement("div");
    containerEl.id = "post_id_" + post.id;
    containerEl.style.border = "1px solid black";
    containerEl.style.padding = "5px";
    containerEl.style.margin = "5px";

    const titleEl = document.createElement("h2");
    titleEl.textContent = post.Title;
    containerEl.append(titleEl);

    const dateEl = document.createElement("p");
    dateEl.textContent = post.endDate;
    containerEl.append(dateEl);

    const updatedEl = document.createElement("p");
    updatedEl.textContent = post.updatedAt;
    containerEl.append(updatedEl);

    const contentEl = document.createElement("p");
    contentEl.textContent = post.Content;
    containerEl.append(contentEl);

    const editButtonEl = document.createElement("button");
    editButtonEl.addEventListener("click", openEditModal);
    editButtonEl.textContent = "Edit";
    containerEl.append(editButtonEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.addEventListener("click", deletePost);
    deleteButtonEl.textContent = "Delete";
    containerEl.append(deleteButtonEl);

    document.querySelector(".posts").append(containerEl);
  });
}

function openEditModal(e) {
  modal.style.display = "block";
  console.log(e.target.parentElement.id);

  const idValue = e.target.parentElement.id.substring(8);
  const titleValue = document.querySelector(
    `#${e.target.parentElement.id} h2`
  ).textContent;
  const contentValue = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(2)`
  ).textContent;
  const dateValue = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(3)`
  ).textContent;

  console.log(idValue, titleValue, contentValue, dateValue);

  document.querySelector(".editPostForm").elements.id.value = idValue;
  document.querySelector(".editPostForm").elements.title.value = titleValue;
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
  const title = e.target.elements.title.value;
  const content = e.target.elements.content.value;
  const id = e.target.elements.id.value;
  const date = e.target.elements.endDate.value;

  const post = {
    Title: title,
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
