document.querySelector("form").addEventListener("submit", registerForm);

const emailEl = document.querySelector(".email");

async function registerForm(e) {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const surname = e.target.elements.surname.value;
  const email = e.target.elements.email.value;

  const post = {
    Name: name,
    Surname: surname,
    Email: email,
  };

  const result = await fetch(
    `https://testapi.io/api/Evaldas/resource/userInformation`
  );

  const people = await result.json();

  const peopleArray = people.data;

  console.log(forLooper());

  function forLooper() {
    for (i = 0; i <= Object.keys(peopleArray).length; i++) {
      console.log(i);
      if (peopleArray[i].Email === emailEl.value) {
        return true;
      } else {
        continue;
      }
    }
  }
  if (forLooper() === true) {
    alert("User with this email already exists.");
  } else {
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
}

// console.log(Object.values(peopleArray)["Email"]);
// }
