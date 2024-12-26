const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.onsubmit = async (e) => {
  e.preventDefault(); 

  if (!username.value || !password.value) {
    return alert("Please fill in all fields.");
  }

  const res = await fetch("https://67697d4f863eaa5ac0dbd1ce.mockapi.io/ToDo/users");
  const data = await res.json();
  
  const foundUser = data.find((user) => user.username === username.value); 
  if (foundUser) {
    return alert("User already exists");
  }

  const newUser = {
    _id:
      Math.random().toString().split(".")[1] +
      Math.random().toString().split(".")[1],
    username: username.value,
    password: password.value,
  };

  await fetch("https://67697d4f863eaa5ac0dbd1ce.mockapi.io/ToDo/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  }).catch((err) => console.log(err));

  localStorage.setItem("user_id", newUser._id);
  window.location.href = "/login.html";
};
