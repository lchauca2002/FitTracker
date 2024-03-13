function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.querySelector('#datetime').textContent = currentDateTime;
}

// Call the function initially
updateDateTime();

// Use setInterval to update the time continuously
setInterval(updateDateTime, 1000);

function editExercise(id, name, duration, calories) {
    document.querySelector('#editId').value = id;
    document.querySelector('#editName').value = name;
    document.querySelector('#editDuration').value = duration;
    document.querySelector('#editCalories').value = calories;
    document.getElementById('editForm').style.display = 'block';
}

function hideFormOnClick() {
    document.getElementById('editForm').style.display = 'none';
}

function submitForm() {

    const editedId = document.getElementById('editId').value;
    const editedName = document.getElementById('editName').value;
    const editedDuration = document.getElementById('editDuration').value;
    const editedCalories = document.getElementById('editCalories').value;

    // Create a form 
    const form = document.createElement('form');
    form.action = `/exerciselog/?_method=put`;
    form.method = 'post';
   
    const idInput = document.createElement('input');
    idInput.type = 'hidden'; 
    idInput.name = '_id';
    idInput.value = editedId;
    form.appendChild(idInput); 

    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'cardioname';
    nameInput.value = editedName;
    form.appendChild(nameInput);

    const durationInput = document.createElement('input');
    durationInput.type = 'number'; 
    durationInput.name = 'duration';
    durationInput.value = editedDuration;
    form.appendChild(durationInput);

    const caloriesInput = document.createElement('input');
    caloriesInput.type = 'number'; 
    caloriesInput.name = 'calories';
    caloriesInput.value = editedCalories; 
    form.appendChild(caloriesInput);

    document.body.appendChild(form);

    form.submit();
}
function submitDeleteForm() {
    const deleteId = document.querySelector('#id').value;

    document.querySelector('#id').value = deleteId;

    document.querySelector('#deleteForm').submit();
}
