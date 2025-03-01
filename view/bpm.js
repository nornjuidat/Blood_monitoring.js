document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("user")) {
        loadUsers();
    }
});
function loadUsers() {
    fetch("/api/users")
        .then(response => response.json())
        .then(users => {
            const userSelect = document.getElementById("user");
            users.forEach(user => {
                let option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading users:", error));
}
