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
        } else {
            containerExercise.style.display = 'none'; // Hide the container
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

    // Exercisetype
    const divCol1 = document.createElement('div');
    divCol1.classList.add('col-md-4');
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

    // Exercisename 
    const divCol2 = document.createElement('div');
    divCol2.classList.add('col-md-4');
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

    // Empty column
    const divEmpty = document.createElement('div');
    divEmpty.classList.add('col-md-4');

    //NumOfSets
    const divCol3 = document.createElement('div');
    divCol3.classList.add('col-md-4');
    const labelNumOfSets = document.createElement('label');
    labelNumOfSets.setAttribute('for', 'validationCustom03');
    labelNumOfSets.textContent = 'NumOfSets';
    labelNumOfSets.classList.add('form-label');

    const numofsetsInput = document.createElement('input');
    numofsetsInput.type = 'number';
    numofsetsInput.classList.add('form-control');
    numofsetsInput.id = 'validationCustom03';
    numofsetsInput.name = 'numofsets';
    numofsetsInput.placeholder = 'Number Of Sets';
    numofsetsInput.setAttribute('required', '');
    const divfeedback = document.createElement('div');
    divfeedback.classList.add('invalid-feedback');
    divfeedback.textContent = 'Please provide valid numofsets.';
    divCol3.appendChild(labelNumOfSets);
    divCol3.appendChild(numofsetsInput);
    divCol3.appendChild(divfeedback);

    //Repetitions
    const divCol4 = document.createElement('div');
    divCol4.classList.add('col-md-4');
    const labelRepetitions = document.createElement('label');
    labelRepetitions.setAttribute('for', 'validationCustom04');
    labelRepetitions.textContent = 'Repetitions';
    labelRepetitions.classList.add('form-label');

    const repetitionsInput = document.createElement('input');
    repetitionsInput.type = 'number';
    repetitionsInput.classList.add('form-control');
    repetitionsInput.id = 'validationCustom04';
    repetitionsInput.name = 'repetitions';
    repetitionsInput.placeholder = 'Number of Repetitions';
    repetitionsInput.setAttribute('required', '');
    const divfeedback2 = document.createElement('div');
    divfeedback2.classList.add('invalid-feedback');
    divfeedback2.textContent = 'Please provide valid repetitions.';
    divCol4.appendChild(labelRepetitions);
    divCol4.appendChild(repetitionsInput);
    divCol4.appendChild(divfeedback2);

    // Empty column
    const divEmpty2 = document.createElement('div');
    divEmpty2.classList.add('col-12');

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
    weightInput.placeholder = 'Amount of Weight';
    weightInput.setAttribute('required', '');
    const divfeeback3 = document.createElement('div');
    divfeeback3.classList.add('invalid-feedback');
    divfeeback3.textContent = 'Please provide valid weight.';
    divCol5.appendChild(labelWeight);
    divCol5.appendChild(weightInput);
    divCol5.appendChild(divfeeback3);

    // Submit button
    const divCol6 = document.createElement('div');
    divCol6.classList.add('col-12');
    const submitButton = document.createElement('button');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit form';
    divCol6.appendChild(submitButton);

    form.appendChild(divCol1);
    form.appendChild(divCol2);
    form.appendChild(divEmpty);
    form.appendChild(divCol3);
    form.appendChild(divCol4);
    form.appendChild(divEmpty2);
    form.appendChild(divCol5);
    form.appendChild(divCol6);

    document.body.appendChild(form);
    existingForm = form;

    form.addEventListener('submit', function (event) {
        // Check if any required fields are empty
        const reqInput = form.querySelectorAll('input[required]');
        let emptyF = false;
        reqInput.forEach(input => {
            if (!input.value.trim()) {
                emptyF = true;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        if (emptyF) {
            event.preventDefault();
            return false;
        }
        existingForm = null;
    });
}
