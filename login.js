const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

if(localStorage.getItem("user_id")) {
    return (window.location.href = "/toDo.html")
}

form.onsubmit = async (e) => {
    e.preventDefault()

const res = await fetch("https://67697d4f863eaa5ac0dbd1ce.mockapi.io/ToDo/users")
const data =await res.json()

const findUser =data.find(
    (user) => user.username == username.value && user.password == password.value
 ) 
 if (!findUser) {
    return alert("incorrect name or password")
 }
 localStorage.setItem("user_id" , findUser._id)

 window.location.href = "/toDo.html"
}
