async function getUsers() {
    let url= "/users";
    let res = await fetch(url);
    let replay = await res.json();
    let users= replay.data;
    const select= document.getElementById("selectPatients")
    if (select){
        let s = '<option value="">Select a patient</option>';
        for (let user_id in users) {
            s += `<option value="${users[user_id].id}" >${users[user_id].full_name}</option>`;
        }
        select.innerHTML = s;

    }
    return users
}
function showMetricsForm() {
    const metricsForm = document.getElementById("metricsForm");
    if (document.getElementById("selectPatients").value) {
        metricsForm.style.display = "block";
        metricsForm.classList.add("active");
    } else {
        metricsForm.style.display = "none";
        metricsForm.classList.remove("active");
    }
}
async function getMeasures(){
    let url= "/measures";
    let res = await fetch(url);
    let replay = await res.json();
    let data=replay.data;
    return data;
}
async function AddMeasures() {
    let user_id= document.getElementById("selectPatients").value;
    let systolic = document.getElementById("systolic").value;
    let diastolic = document.getElementById("diastolic").value;
    let pulse = document.getElementById("pulse").value;
    let date = document.getElementById("date").value;

    if (!systolic || !diastolic || !pulse || !date) {
        alert('Please fill in all measurement fields');
        return;
    }
    let url= "/measures";
    let res = await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({
            user_id: user_id,
            sys_high: systolic,
            dia_low: diastolic,
            pulse: pulse,
            date:date
        }),
    });
    let data = await res.json();
    if (data.msg){
        alert("Measurement saved successfully!");
    }
}
