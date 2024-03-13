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
        const exerciseInput = existingForm.querySelector('input[name="cardioname"]');
        if (exerciseInput) {
            exerciseInput.value = selectedExercise.trim();
        } else {
            const newExerciseInput = document.createElement('input');
            newExerciseInput.type = 'text';
            newExerciseInput.name = 'cardioname';
            newExerciseInput.value = selectedExercise;
            newExerciseInput.readOnly = true;

            existingForm.appendChild(newExerciseInput);
        }
        return; 
    }

    // Create a new form
    const form = document.createElement('form');
    form.action = '/exerciselog';
    form.method = 'post';

    const exerciseInput = document.createElement('input');
    exerciseInput.type = 'text';
    exerciseInput.name = 'cardioname';
    exerciseInput.value = selectedExercise.trim();
    exerciseInput.readOnly = true;

    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.name = 'duration';
    durationInput.placeholder = 'Workout duration';

    const caloriesInput = document.createElement('input');
    caloriesInput.type = 'number';
    caloriesInput.name = 'calories';
    caloriesInput.placeholder = 'Calories burned';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Exercise';
    submitButton.className = 'formbtn';

    form.appendChild(exerciseInput);
    form.appendChild(durationInput);
    form.appendChild(caloriesInput);
    form.appendChild(submitButton);

    document.body.appendChild(form);
    existingForm = form;

    form.addEventListener('submit', function () {
        existingForm = null;
    });
}
