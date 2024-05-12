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
            containerExercise.style.display = 'block';

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

            const contain = document.querySelector('#containerExercise > .unlist');
            const addp = document.createElement('p');
            addp.textContent = "No Matches Found";
            addp.classList.add('no-matches');
            contain.insertBefore(addp, document.querySelector('.notfound'));
            console.log("ADDED");
            containerExercise.style.display = 'block';
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
    exercisetypeInput.value = 'cardio';
    exercisetypeInput.readOnly = true;



    divCol1.appendChild(labelType);
    divCol1.appendChild(exercisetypeInput);

    const divEmpty1 = document.createElement('div');
    divEmpty1.classList.add('col-md-8');
    
    // Exercisename input
    const divCol2 = document.createElement('div');
    divCol2.classList.add('col-md-6');
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
    
    const divEmpty2 = document.createElement('div');
    divEmpty2.classList.add('col-md-8');

    const userBoxdiv1 = document.createElement('div');
    userBoxdiv1.classList.add('user-box');
    
    // Duration input
    const divCol3 = document.createElement('div');
    divCol3.classList.add('col-md-6');
    const labelDuration = document.createElement('label');
    labelDuration.setAttribute('for', 'validationCustom03');
    labelDuration.textContent = 'Workout Duration';
    labelDuration.classList.add('form-label');
    //durationInput
    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.classList.add('form-control');
    durationInput.id = 'validationCustom03';
    durationInput.name = 'duration';
    durationInput.setAttribute('required', '');
    const divDurationFeedback = document.createElement('div');
    divDurationFeedback.classList.add('invalid-feedback');
    divDurationFeedback.textContent = 'Please provide a valid duration.';
    userBoxdiv1.appendChild(durationInput);
    userBoxdiv1.appendChild(labelDuration);
    userBoxdiv1.appendChild(divDurationFeedback);

    divCol3.appendChild(userBoxdiv1);
    
    const divEmpty3 = document.createElement('div');
    divEmpty3.classList.add('col-md-8');

    const userBoxdiv2 = document.createElement('div');
    userBoxdiv2.classList.add('user-box');

    // Calories input
    const divCol4 = document.createElement('div');
    divCol4.classList.add('col-md-6');
    const labelCalories = document.createElement('label');
    labelCalories.setAttribute('for', 'validationCustom04');
    labelCalories.textContent = 'Calories burned';
    labelCalories.classList.add('form-label');

    const caloriesInput = document.createElement('input');
    caloriesInput.type = 'number';
    caloriesInput.classList.add('form-control');
    caloriesInput.id = 'validationCustom04';
    caloriesInput.name = 'calories';
    caloriesInput.setAttribute('required', '');
    const divCaloriesFeedback = document.createElement('div');
    divCaloriesFeedback.classList.add('invalid-feedback');
    divCaloriesFeedback.textContent = 'Please provide valid calories.';
    serBoxdiv2.appendChild(caloriesInput);
    userBoxdiv2.appendChild(labelCalories);
    userBoxdiv2.appendChild(divCaloriesFeedback);

    divCol4.appendChild(userBoxdiv2);
    
    const divEmpty4 = document.createElement('div');
    divEmpty4.classList.add('col-12');

    // Submit button
    const divCol5 = document.createElement('div');
    divCol5.classList.add('col-12');
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
    divCol5.appendChild(submitButton);

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

    divsubForm.appendChild(form);
    document.body.appendChild(divsubForm);

    

    document.querySelector('#FORM').appendChild(divsubForm);
    existingForm = form;

    form.addEventListener('submit', function (event) {
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
