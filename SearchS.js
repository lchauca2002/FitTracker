let existingForm = null;
function filterResults() {
    let input, filter, exercises;
    input = document.querySelector('#searchInput');
    containerExercise = document.querySelector('#containerExercise');
    if (event.key === 'Enter') {
        filter = input.value.toLowerCase(); // Convert search query to lowercase
        exercises = document.querySelectorAll('.exercise');
        let foundMatch = false;

        for (let exercise of exercises) {
            let exerciseName = exercise.textContent.toLowerCase(); // Don't convert exercise name to lowercase
            //if nothing is typed in search, nothing displays
            if (filter.trim() === '') {
                exercise.style.display = 'none';
            } else if (exerciseName.includes(filter)) {
                // Convert exercise name to lowercase for comparison
                exercise.style.display = '';
                foundMatch = true;
            } else {
                exercise.style.display = 'none';
            }
        }
        if (foundMatch) {
            containerExercise.style.display = 'block'; // Show the container
            const noMatchesMessage = document.querySelector('#containerExercise > .unlist > .no-matches');
            if (noMatchesMessage) {
                noMatchesMessage.remove();
                console.log("REMOVED!");
            }
        } else {
            const noMatchesMessage = document.querySelector('#containerExercise > .unlist > .no-matches');
            if (noMatchesMessage) {
                noMatchesMessage.remove();
                console.log("REMOVED!");
            }

            // Add the "No Matches Found" message if it doesn't exist
            const contain = document.querySelector('#containerExercise > .unlist');
            const addp = document.createElement('p');
            addp.textContent = "No Matches Found";
            addp.classList.add('no-matches');
            contain.insertBefore(addp, document.querySelector('.notfound')); // Insert before the first p element
            console.log("ADDED");
            // Hide the container
            containerExercise.style.display = 'block'; 
        }
    }
}

// This loop adds a click event listener to each exercise element
const exercises = document.querySelectorAll('.exercise');
for (let exercise of exercises) {
    exercise.addEventListener('click', function () {
        showFormAndSelectExercise(exercise.textContent);
    });
}

function showFormAndSelectExercise(selectedExercise) {
    if (existingForm) {
        const exerciseInput = existingForm.querySelector('input[name="exercisename"]');
        if (exerciseInput) {
            exerciseInput.value = selectedExercise.trim();
        } else {
            const newExerciseInput = document.createElement('input');
            newExerciseInput.type = 'text';
            newExerciseInput.name = 'exercisename';
            newExerciseInput.value = selectedExercise;
            newExerciseInput.readOnly = true;

            const nameLabel = document.createElement('label');
            nameLabel.textContent = 'Exercisename';
            nameLabel.classList.add('form-label');

            const divCol = document.createElement('div');
            divCol.classList.add('col-md-4');
            divCol.appendChild(nameLabel);
            divCol.appendChild(newExerciseInput);

            existingForm.appendChild(divCol);
        }
        return;
    }

    // Create a new form
    const form = document.createElement('form');
    form.action = '/exerciselog';
    form.method = 'post';
    form.setAttribute('novalidate', '');
    form.classList.add('row', 'g-2', 'needs-validation');

    //Date input
    const dateInput = document.createElement('input');
    dateInput.type = 'hidden';
    dateInput.name = 'date';
    dateInput.value = new Date().toLocaleString();
    
    // Exercisetype
    const divCol1 = document.createElement('div');
    divCol1.classList.add('col-md-6');
    const labelType = document.createElement('label');
    labelType.setAttribute('for', 'validationCustom01');
    labelType.textContent = 'Exercisetype';
    labelType.classList.add('form-label');

    const exercisetypeInput = document.createElement('input');
    exercisetypeInput.type = 'text';
    exercisetypeInput.classList.add('form-control');
    exercisetypeInput.id = 'validationCustom01';
    exercisetypeInput.name = 'exercisetype';
    exercisetypeInput.value = 'strength';
    exercisetypeInput.readOnly = true;

    divCol1.appendChild(labelType);
    divCol1.appendChild(exercisetypeInput);

    const divEmpty1 = document.createElement('div');
    divEmpty1.classList.add('col-8');
    
    // Exercisename 
    const divCol2 = document.createElement('div');
    divCol2.classList.add('col-md-6');
    const labelName = document.createElement('label');
    labelName.setAttribute('for', 'validationCustom02');
    labelName.textContent = 'Exercisename';
    labelName.classList.add('form-label');

    const exerciseInput = document.createElement('input');
    exerciseInput.type = 'text';
    exerciseInput.classList.add('form-control');
    exerciseInput.id = 'validationCustom02';
    exerciseInput.name = 'exercisename';
    exerciseInput.value = selectedExercise.trim();
    exerciseInput.readOnly = true;
    divCol2.appendChild(labelName);
    divCol2.appendChild(exerciseInput);

    const divEmpty2 = document.createElement('div');
    divEmpty2.classList.add('col-md-8');

    const userBoxdiv1 = document.createElement('div');
    userBoxdiv1.classList.add('user-box');

    //NumOfSets
    const divCol3 = document.createElement('div');
    divCol3.classList.add('col-md-6');
    const labelNumOfSets = document.createElement('label');
    labelNumOfSets.setAttribute('for', 'validationCustom03');
    labelNumOfSets.textContent = 'Number Of Sets';
    labelNumOfSets.classList.add('form-label');

    const numofsetsInput = document.createElement('input');
    numofsetsInput.type = 'number';
    numofsetsInput.classList.add('form-control');
    numofsetsInput.id = 'validationCustom03';
    numofsetsInput.name = 'numofsets';
    numofsetsInput.setAttribute('required', '');
    const divfeedback = document.createElement('div');
    divfeedback.classList.add('invalid-feedback');
    divfeedback.textContent = 'Please provide valid numofsets.';
    userBoxdiv1.appendChild(numofsetsInput);
    userBoxdiv1.appendChild(labelNumOfSets);
    userBoxdiv1.appendChild(divfeedback);

    divCol3.appendChild(userBoxdiv1);

    const divEmpty3 = document.createElement('div');
    divEmpty3.classList.add('col-8');

    const userBoxdiv2 = document.createElement('div');
    userBoxdiv2.classList.add('user-box');
    
    //Repetitions
    const divCol4 = document.createElement('div');
    divCol4.classList.add('col-md-6');
    const labelRepetitions = document.createElement('label');
    labelRepetitions.setAttribute('for', 'validationCustom04');
    labelRepetitions.textContent = 'Number of Repetitions';
    labelRepetitions.classList.add('form-label');

    const repetitionsInput = document.createElement('input');
    repetitionsInput.type = 'number';
    repetitionsInput.classList.add('form-control');
    repetitionsInput.id = 'validationCustom04';
    repetitionsInput.name = 'repetitions';
    repetitionsInput.setAttribute('required', '');
    const divfeedback2 = document.createElement('div');
    divfeedback2.classList.add('invalid-feedback');
    divfeedback2.textContent = 'Please provide valid repetitions.';
    userBoxdiv2.appendChild(repetitionsInput);
    userBoxdiv2.appendChild(labelRepetitions);
    userBoxdiv2.appendChild(divfeedback2);

    divCol4.appendChild(userBoxdiv2);

    const divEmpty4 = document.createElement('div');
    divEmpty4.classList.add('col-12');

    const userBoxdiv3 = document.createElement('div');
    userBoxdiv3.classList.add('user-box');

    //Weight
    const divCol5 = document.createElement('div');
    divCol5.classList.add('col-md-4');
    const labelWeight = document.createElement('label');
    labelWeight.setAttribute('for', 'validationCustom05');
    labelWeight.textContent = 'Weight';
    labelWeight.classList.add('form-label');

    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.classList.add('form-control');
    weightInput.id = 'validationCustom05';
    weightInput.name = 'weight';
    weightInput.setAttribute('required', '');
    const divfeeback3 = document.createElement('div');
    divfeeback3.classList.add('invalid-feedback');
    divfeeback3.textContent = 'Please provide valid weight.';
    userBoxdiv3.appendChild(weightInput);
    userBoxdiv3.appendChild(labelWeight);
    userBoxdiv3.appendChild(divfeeback3);

    divCol5.appendChild(userBoxdiv3);

    // Submit button
    const divCol6 = document.createElement('div');
    divCol6.classList.add('col-12');
    const submitButton = document.createElement('button');
    submitButton.classList.add('btn', 'btn-secondary');
    submitButton.setAttribute('id', 'buttonsub');
    submitButton.type = 'submit';
    
    submitButton.textContent = 'Submit form';
    span1 = document.createElement('span');
    span2 = document.createElement('span');
    span3 = document.createElement('span');
    span4 = document.createElement('span');
    submitButton.appendChild(span1);
    submitButton.appendChild(span2);
    submitButton.appendChild(span3);
    submitButton.appendChild(span4);
    divCol6.appendChild(submitButton);

    const divsubForm = document.createElement('div');
    divsubForm.classList.add('subForm');
    
    form.appendChild(dateInput);
    form.appendChild(divCol1);
    form.appendChild(divEmpty1);
    form.appendChild(divCol2);
    form.appendChild(divEmpty2);
    form.appendChild(divCol3);
    form.appendChild(divEmpty3);
    form.appendChild(divCol4);
    form.appendChild(divEmpty4);
    form.appendChild(divCol5);
    form.appendChild(divCol6);

    divsubForm.appendChild(form);
    document.body.appendChild(divsubForm);
    
    document.querySelector('#FORM').appendChild(divsubForm);
    existingForm = form;

    form.addEventListener('submit', function (event) {
        // Check if any required fields are empty
        const reqInput = form.querySelectorAll('input[required]');
        let emptyF = false;
        reqInput.forEach(input => {
            if (!input.value.trim()) {
                emptyF = true;
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        if (emptyF) {
            event.preventDefault();
            return false;
        }
        existingForm = null;
    });
}
