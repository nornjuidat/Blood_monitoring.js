async function getUsers() {
    let res = await fetch("/users");
    let { data: users } = await res.json();
    const select = document.getElementById("selectPatients");
    if (select) {
        select.innerHTML = '<option value="">Select a patient</option>' + users.map(user => `<option value="${user.id}">${user.full_name}</option>`).join('');
    }
    return users;
}

function showMetricsForm() {
    const metricsForm = document.getElementById("metricsForm");
    const display = document.getElementById("selectPatients").value ? "block" : "none";
    metricsForm.style.display = display;
    metricsForm.classList.toggle("active", display === "block");
}
