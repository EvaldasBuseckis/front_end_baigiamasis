document.querySelector("form").addEventListener("submit", registerForm);

function registerForm(e) {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const surname = e.target.elements.surname.value;
  const email = e.target.elements.email.value;

  const post = {
    Name: name,
    Surname: surname,
    Email: email,
  };

  console.log("1");
  fetch("https://testapi.io/api/Evaldas/resource/userInformation", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.href = "/login/login.html";
    })
    .catch((error) => console.log(error));
}
