let existingForm = null; // Variable to store the existing form
function filterResults() {
    let input, filter, exercises;
    input = document.querySelector('#searchInput');
    containerExercise = document.querySelector('#containerExercise');
    if (event.key === 'Enter') {
        filter = input.value.toLowerCase();
        exercises = document.querySelectorAll('.exercise');
        let foundMatch = false;

        for (let exercise of exercises) {
            let exerciseName = exercise.textContent.toLowerCase();
            //if nothing is type in search nothing displays
            if (filter.trim() === '') {
                exercise.style.diplay = 'none';
                //otherwise checks if there is a match if so it displays 
            } else if (exerciseName.includes(filter)) {
                exercise.style.display = '';
                foundMatch = true;
            }
            //otherwise we dont display anything
            else {
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

//This allows us to listen for an event such as click 
//What I wanted to do here is after i click on an exercise it display a form in which we fill out
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
    form.setAttribute('novalidate','');
    form.classList.add('row', 'g-2', 'needs-validation');

    //Date input
    const dateInput = document.createElement('input');
    dateInput.type = 'hidden';
    dateInput.name = 'date';
    dateInput.value = new Date().toLocaleString();

    // Exercisetype input
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
    exercisetypeInput.value = 'cardio';
    exercisetypeInput.readOnly = true;



    divCol1.appendChild(labelType);
    divCol1.appendChild(exercisetypeInput);

    // Exercisename input
    const divCol2 = document.createElement('div');
    divCol2.classList.add('col-md-4');
    const labelName = document.createElement('label');
    labelName.setAttribute('for', 'validationCustom02');
    labelName.textContent = 'Exercisename';
    labelName.classList.add('form-label');
    //exercise input
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

    // Duration input
    const divCol3 = document.createElement('div');
    divCol3.classList.add('col-md-4');
    const labelDuration = document.createElement('label');
    labelDuration.setAttribute('for', 'validationCustom03');
    labelDuration.textContent = 'Duration';
    labelDuration.classList.add('form-label');
    //durationInput
    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.classList.add('form-control');
    durationInput.id = 'validationCustom03';
    durationInput.name = 'duration';
    durationInput.placeholder = 'Workout duration';
    durationInput.setAttribute('required', '');
    const divDurationFeedback = document.createElement('div');
    divDurationFeedback.classList.add('invalid-feedback');
    divDurationFeedback.textContent = 'Please provide a valid duration.';
    divCol3.appendChild(labelDuration);
    divCol3.appendChild(durationInput);
    divCol3.appendChild(divDurationFeedback);

    // Calories input
    const divCol4 = document.createElement('div');
    divCol4.classList.add('col-md-4');
    const labelCalories = document.createElement('label');
    labelCalories.setAttribute('for', 'validationCustom04');
    labelCalories.textContent = 'Calories';
    labelCalories.classList.add('form-label');

    const caloriesInput = document.createElement('input');
    caloriesInput.type = 'number';
    caloriesInput.classList.add('form-control');
    caloriesInput.id = 'validationCustom04';
    caloriesInput.name = 'calories';
    caloriesInput.placeholder = 'Calories burned';
    caloriesInput.setAttribute('required', '');
    const divCaloriesFeedback = document.createElement('div');
    divCaloriesFeedback.classList.add('invalid-feedback');
    divCaloriesFeedback.textContent = 'Please provide valid calories.';
    divCol4.appendChild(labelCalories);
    divCol4.appendChild(caloriesInput);
    divCol4.appendChild(divCaloriesFeedback);

    // Empty column
    const divEmpty2 = document.createElement('div');
    divEmpty2.classList.add('col-12');

    // Submit button
    const divCol5 = document.createElement('div');
    divCol5.classList.add('col-12');
    const submitButton = document.createElement('button');
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit form';
    divCol5.appendChild(submitButton);

    form.appendChild(divCol1);
    form.appendChild(divCol2);
    form.appendChild(divEmpty);
    form.appendChild(divCol3);
    form.appendChild(divCol4);
    form.appendChild(divEmpty2);
    form.appendChild(divCol5);

    document.body.appendChild(form);
    existingForm = form;

    form.addEventListener('submit', function (event) {
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
