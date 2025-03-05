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

async function getMeasures() {
    let res = await fetch("/measures");
    let { data } = await res.json();
    return data;
}

async function AddMeasures() {
    const { value: user_id } = document.getElementById("selectPatients");
    const systolic = document.getElementById("systolic").value;
    const diastolic = document.getElementById("diastolic").value;
    const pulse = document.getElementById("pulse").value;
    const date = document.getElementById("date").value;

    if (!systolic || !diastolic || !pulse || !date) return alert('Please fill in all measurement fields');

    const res = await fetch("/measures", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ user_id, sys_high: systolic, dia_low: diastolic, pulse, date })
    });
    const { msg } = await res.json();
    if (msg) alert("Measurement saved successfully!");
}
