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
async function CreateMeasuresTable() {
    const { value: user_id } = document.getElementById("selectPatients");
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const res = await fetch("/measuresByUId", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ user_id, startDate, endDate })
    });
    const { data } = await res.json();
    const row = data.map((measure, idx) => `
        <tr class="${measure.critical ? 'crit' : ''}">
            <td>${Number(idx) + 1}</td>
            <td>${new Date(measure.date).toLocaleDateString('he-IL')}</td>
            <td>${measure.sys_high}</td>
            <td>${measure.dia_low}</td>
            <td>${measure.pulse}</td>
            <td><button onclick="UpdateMeasuresForm(${measure.id})">Edit</button></td>
            <td><button onclick="DeleteMeasures(${measure.id})">Delete</button></td>
        </tr>
    `).join('');
    document.getElementById("MeasuresTable").innerHTML = row;
}
function UpdateMeasuresForm(idx) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'modalOverlay';
    modalOverlay.innerHTML = `
        <div class="modal-content glossy">
            <div class="form-container">
                <h2>Update Measurement</h2>
                ${['systolic', 'diastolic', 'pulse', 'date'].map(field => `
                    <div class="form-group">
                        <label for="${field}">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <div class="input-field">
                            <input type="${field === 'date' ? 'date' : 'number'}" id="${field}" name="${field}" placeholder="${field.charAt(0).toUpperCase() + field.slice(1)}">
                        </div>
                    </div>
                `).join('')}
                <div class="modal-buttons">
                    <button type="submit" onclick="UpdateMeasures(${idx})">Save Measurement</button>
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
    modalOverlay.addEventListener('click', e => e.target === modalOverlay && closeModal());

    setTimeout(() => modalOverlay.classList.add('active'), 10);
}
function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('active');
    setTimeout(() => document.body.removeChild(modalOverlay), 300);
}

async function UpdateMeasures(idx) {
    const systolic = document.getElementById("systolic").value;
    const diastolic = document.getElementById("diastolic").value;
    const pulse = document.getElementById("pulse").value;
    const date = document.getElementById("date").value;

    if (!systolic || !diastolic || !pulse || !date) return alert('Please fill in all measurement fields');

    const res = await fetch("/measures", {
        method: 'PUT',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ idx, sys_high: systolic, dia_low: diastolic, pulse, date })
    });
    const { msg } = await res.json();
    closeModal();
    await CreateMeasuresTable();
    if (msg) setTimeout(() => alert("Measurement updated successfully!"), 500);
}

async function DeleteMeasures(idx) {
    const res = await fetch("/measures", {
        method: 'DELETE',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ idx })
    });
    const { message } = await res.json();
    await CreateMeasuresTable();
    alert(message || "Measurement deleted successfully!");
}