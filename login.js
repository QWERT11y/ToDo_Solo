const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

// if (localStorage.getItem("user_id")) {
//     window.location.href = "/toDo.html";
// }

form.onsubmit = async (e) => {
    e.preventDefault();

    if (!username.value.trim() || !password.value.trim()) {
        return alert("Please enter both username and password.");
    }

    try {
        const res = await fetch("https://67697d4f863eaa5ac0dbd1ce.mockapi.io/ToDo/users");
        if (!res.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await res.json();

        const findUser = data.find(
            (user) => user.username === username.value && user.password === password.value
        );

        if (!findUser) {
            return alert("Incorrect username or password.");
        }

        localStorage.setItem("user_id", findUser.id || findUser._id);
        window.location.href = "/toDo.html";
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
};