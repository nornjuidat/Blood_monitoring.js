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

const addMeasurementForm = document.getElementById("addMeasurementForm");
if (addMeasurementForm) {
    addMeasurementForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userId = document.getElementById("user").value;
        const systolic = document.getElementById("systolic").value;
        const diastolic = document.getElementById("diastolic").value;
        const pulse = document.getElementById("pulse").value;

        fetch("/api/measurements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, systolic, diastolic, pulse })
        })
            .then(response => response.json())
            .then(data => {
                alert("מדידה נוספה בהצלחה!");
                addMeasurementForm.reset();
            })
            .catch(error => console.error("Error adding measurement:", error));
    });
}
function fetchMeasurements() {
    const userId = document.getElementById("user").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    fetch(`/api/measurements?userId=${userId}&startDate=${startDate}&endDate=${endDate}`)
        .then(response => response.json())
        .then(measurements => {
            const tableBody = document.getElementById("measurementsTable");
            tableBody.innerHTML = "";
            measurements.forEach(measurement => {
                let row = document.createElement("tr");
                if (measurement.isAbnormal) row.classList.add("abnormal");
                row.innerHTML = `
                    <td>${measurement.date}</td>
                    <td>${measurement.systolic}</td>
                    <td>${measurement.diastolic}</td>
                    <td>${measurement.pulse}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching measurements:", error));
}