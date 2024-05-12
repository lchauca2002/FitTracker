function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.querySelector('#datetime').textContent = currentDateTime;
}

// Call the function initially
updateDateTime();

// Use setInterval to update the time continuously
setInterval(updateDateTime, 1000);

function editExercise(id, type, name, duration, calories) {
    document.querySelector('#editId').value = id;
    document.querySelector('#editType').value = type;
    document.querySelector('#editName').value = name;
    document.querySelector('#editDuration').value = duration;
    document.querySelector('#editCalories').value = calories;
    document.getElementById('editForm').style.display = 'block';
}

function submitForm() {

    const editedId = document.getElementById('editId').value;
    const editedType = document.getElementById('editType').value;
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

    const typeInput = document.createElement('input');
    typeInput.type = 'hidden';
    typeInput.name = 'exercisetype';
    typeInput.value = editedType;
    form.appendChild(typeInput);
    
    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'exercisename';
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


//edit for strength exercise
function editstrengthExercise(id, type, name, numofsets, repetitions, weight) {
    document.querySelector('#editId').value = id;
    document.querySelector('#editType').value = type;
    document.querySelector('#editName').value = name;
    document.querySelector('#editNumofsets').value = numofsets;
    document.querySelector('#editRepetitions').value = repetitions;
    document.querySelector('#editWeight').value = weight;
    document.getElementById('editstrengthForm').style.display = 'block';
}

//form for strength exercise
function submitstrengthForm() {

    const editedId = document.getElementById('editId').value;
    const editedType = document.getElementById('editType').value;
    const editedName = document.getElementById('editName').value;
    const editedNumofsets = document.getElementById('editNumofsets').value;
    const editedRepetitions = document.getElementById('editRepetitions').value;
    const editedWeight = document.getElementById('editWeight').value;


    // Create a form 
    const form = document.createElement('form');
    form.action = `/exerciselog/?_method=put`;
    form.method = 'post';
   
    const idInput = document.createElement('input');
    idInput.type = 'hidden'; 
    idInput.name = '_id';
    idInput.value = editedId;
    form.appendChild(idInput); 

    const typeInput = document.createElement('input');
    typeInput.type = 'hidden';
    typeInput.name = 'exercisetype';
    typeInput.value = editedType;
    form.appendChild(typeInput);
    
    const nameInput = document.createElement('input');
    nameInput.type = 'hidden';
    nameInput.name = 'exercisename';
    nameInput.value = editedName;
    form.appendChild(nameInput);

    const numofsetsInput = document.createElement('input');
    numofsetsInput.type = 'number'; 
    numofsetsInput.name = 'numofsets';
    numofsetsInput.value = editedNumofsets;
    form.appendChild(numofsetsInput);

    const repetitionsInput = document.createElement('input');
    repetitionsInput.type = 'number'; 
    repetitionsInput.name = 'repetitions';
    repetitionsInput.value = editedRepetitions; 
    form.appendChild(repetitionsInput);

    const weightInput = document.createElement('input');
    weightInput.type = 'number'; 
    weightInput.name = 'weight';
    weightInput.value = editedWeight; 
    form.appendChild(weightInput);

    document.body.appendChild(form);

    form.submit();
}

function submitDeleteForm() {
    document.querySelector('#id').value;
    document.querySelector('#deleteForm').submit();
}

function hideFormOnClick(id) {
    let form1 = document.getElementById('editForm');
    let form2 = document.getElementById('editstrengthForm');
    if(id==='editForm'){
        form1.style.display = 'none';
    }else if(id==='editstrengthForm'){
        form2.style.display = 'none';
    }
}
