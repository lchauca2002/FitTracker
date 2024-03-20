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

            existingForm.appendChild(newExerciseInput);
        }
        return; 
    }

    // Create a new form
    const form = document.createElement('form');
    form.action = '/exerciselog';
    form.method = 'post';

    const exercisetypeInput = document.createElement('input');
    exercisetypeInput.type = 'text';
    exercisetypeInput.name = 'exercisetype';
    exercisetypeInput.value = 'strength';
    exercisetypeInput.readOnly = true;

    const exerciseInput = document.createElement('input');
    exerciseInput.type = 'text';
    exerciseInput.name = 'exercisename';
    exerciseInput.value = selectedExercise.trim();
    exerciseInput.readOnly = true;

    const numofsetsInput = document.createElement('input');
    numofsetsInput.type = 'number';
    numofsetsInput.name = 'numofsets';
    numofsetsInput.placeholder = 'Num Of Sets';

    const repetitionsInput = document.createElement('input');
    repetitionsInput.type = 'number';
    repetitionsInput.name = 'repetitions';
    repetitionsInput.placeholder = 'Num Of Repetitions';

    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.name = 'weight';
    weightInput.placeholder = 'Weight Amount';

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Exercise';
    submitButton.className = 'formbtn';

    form.appendChild(exercisetypeInput);
    form.appendChild(exerciseInput);
    form.appendChild(numofsetsInput);
    form.appendChild(repetitionsInput);
    form.appendChild(weightInput);
    form.appendChild(submitButton);

    document.body.appendChild(form);
    existingForm = form;

    form.addEventListener('submit', function () {
        existingForm = null;
    });
}
