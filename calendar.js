var calendar;

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    const dates = new Date();
    dates.setDate(dates.getDate() + 1);
    console.log(dates);
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        timeZone: 'UTC',
        initialDate: dates,
        eventColor: '#ff0000',
        eventClick: handleEventClick,
    });
    calendar.render();
});

function handleEventClick(info) {
    document.getElementById('eventId').value = info.event.id;
    document.getElementById('eventTitle').innerHTML = info.event.title;
    document.getElementById('eventStart').innerHTML = info.event.start.toISOString().substring(0,10);

    var modal = document.getElementById('eventModal');
    modal.style.display = 'block';

    var closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            modal.style.display = 'none';
        }
    });
}



function togglePopup() {
    var popup = document.getElementById("popup-1");
    popup.classList.toggle("active");
}

function closePopupOnOutsideClick(event) {
    var popup = document.getElementById("popup-1");
    var overlay = document.querySelector(".overlay");
    if (event.target === overlay && popup.classList.contains("active")) {
        togglePopup();
    }
}

function closePopupOnEscapeKey(event) {
    if (event.key === "Escape" && document.getElementById("popup-1").classList.contains("active")) {
        togglePopup();
    }
}

document.addEventListener("click", closePopupOnOutsideClick);
document.addEventListener("keydown", closePopupOnEscapeKey);

var exerciseForm = document.getElementById('exerciseForm');
var submitted = false;

exerciseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!submitted) { 
        submitted = true; 

        var selectedValue = document.querySelector('input[name="input"]:checked').value;

        console.log('Selected value:', selectedValue);
        addDay(selectedValue);
        localStorage.setItem('exerciseSelection', selectedValue);

        togglePopup();
    }
});

window.onload = function () {
    togglePopup();
};

function addDay(select) {
    const utcDate = new Date();
    console.log("UTC DATE: " + utcDate);
    var event = {
        title: 'Exercise',
        start: utcDate, // or any specific date you want
        allDay: true, // or false depending on your needs
        backgroundColor: '#FFA500',
    }
    if (select === 'yes') {
        calendar.addEvent(event);
    } else {
        console.log("Sorry, but you did not exercise today");
    }
}
function addReminder() {
    var reminderForm = document.getElementById('reminderForm');
    reminderForm.style.display = 'block'; // Display the reminder form
}

function togglePopup2() {
    var popup = document.getElementById("popup-2");
    popup.classList.toggle("active");
}

function closePopupOnOutsideClick2(event) {
    var popup = document.getElementById("popup-2");
    var overlay = document.querySelector(".overlay2");
    if (event.target === overlay && popup.classList.contains("active")) {
        togglePopup2();
    }
}

function closePopupOnEscapeKey2(event) {
    if (event.key === "Escape" && document.getElementById("popup-2").classList.contains("active")) {
        togglePopup2();
    }
}

document.addEventListener("click", closePopupOnOutsideClick2);
document.addEventListener("keydown", closePopupOnEscapeKey2);
var reminderForm = document.getElementById('reminderForm');
let rfDate = new Date();
document.getElementById('date1').value = rfDate.toISOString().substring(0,10);

reminderForm.addEventListener('submit', function (event) { 
    console.log("Form Submitted");
    event.preventDefault(); 
    // Get the input values
    const dateValue = document.getElementById('date1').value;
    const reminderText = document.getElementById('text1').value;

    console.log('Date:', dateValue);
    console.log('Reminder Text:', reminderText);

    addReminders(dateValue, reminderText);
    // Close the popup
    togglePopup2();
});
function addReminders(dateValue, reminderText) {
    var date = new Date(dateValue);
  var event = {
        title: 'Reminders: ' + reminderText,
        start: date,
        allDay: true,
        backgroundColor: '#89CFF0',
        borderColor: '#89CFF0',
    };

    fetch('/calendar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save event');
        }
        // Parse the response as JSON
        return response.json();
    })
    .then(savedEvent => {
        // Add the event to the calendar with the returned ID
        calendar.addEvent({
            id: savedEvent._id, //Use the ID
            title: event.title,
            start: event.start,
            allDay: event.allDay,
            backgroundColor: event.backgroundColor,
            borderColor: event.borderColor
        });
        console.log('Event saved successfully');
    })
    .catch(error => {
        console.error('Error saving event:', error);
    });
}

function editReminders() {
    var modal = document.getElementById('eventModal');
    modal.style.display = '';
    var modal2 = document.getElementById('eventModal2');
    modal2.style.display = 'block';

    var eventTitle = document.getElementById('eventTitle').textContent;
    var eventStart = document.getElementById('eventStart').textContent;
    var eventId = document.getElementById('eventId').value;

    var editDate = document.getElementById('editDate');
    editDate.value = eventStart;

    var editText = document.getElementById('editText');
    editText.value = eventTitle.substring(10);

    var editEventId = document.getElementById('editEventId');
    editEventId.value = eventId;

    var closeModal = false;

    var closeButton = document.getElementsByClassName('close')[1];
    closeButton.onclick = function () {
        modal2.style.display = 'none';
        closeModal = true;
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            modal2.style.display = 'none';
            closeModal = true;
        }
    });

    modal2.addEventListener('transitionend', function () {
        if (!closeModal) {
            var oldEvent = calendar.getEventById(eventId);
            if (oldEvent) {
                oldEvent.remove();
            }
        }
    }, { once: true });
}

var editReminderForm = document.getElementById('editReminderForm');
editReminderForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    var editDate = document.getElementById('editDate').value;
    var editText = document.getElementById('editText').value;
    var editEventId = document.getElementById('editEventId').value;

    console.log("EDIT " + editDate);
    console.log("EDIT " + editText);
    console.log("EDIT " + editEventId);
    var modal2 = document.getElementById('eventModal2');
    modal2.style.display = 'none';
  
    var eventData = {
        eventId: editEventId, // Include the event ID
        title: 'Reminder: ' + editText,
        start: editDate
    };

  fetch('/calendar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update event');
        }
        return response.json();
    })
    .then(updatedEvent => {
        console.log('Event updated successfully:', updatedEvent);
        var calendarEvent = calendar.getEventById(updatedEvent._id);
        if (calendarEvent) {
            calendarEvent.setProp('title', updatedEvent.title);
            calendarEvent.setStart(new Date(updatedEvent.start));
        } else {
            calendar.addEvent({
                id: updatedEvent._id,
                title: updatedEvent.title,
                start: updatedEvent.start,
                allDay: true,
                backgroundColor: '#89CFF0',
                borderColor: '#89CFF0'
            });
        }
        var modal = document.getElementById('eventModal');
        modal.style.display = '';
    })
    .catch(error => {
        console.error('Error updating event:', error);
    });
});
function deleteReminders() { 
    const eventId = document.getElementById('eventId').value;
    console.log(eventId);
    const events = calendar.getEvents();

    events.forEach(function(event) {
        if (event.id === eventId) {
            event.remove();

            fetch('/calendar', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventId: eventId })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete event from database');
                }
                console.log('Event deleted from database successfully');
            })
            .catch(error => {
                console.error('Error deleting event from database:', error);
            });

            var modalElement = document.querySelector('.modal');
            modalElement.style.display = 'none'; // Hide the modal after deleting the event
        }
    });
}
function fetchRemindersAndAddToCalendar() {
    fetch('/reminders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch reminders');
            }
            return response.json();
        })
        .then(reminders => {
            reminders.forEach(reminder => {
                calendar.addEvent({
                    id: reminder._id,
                    title: reminder.title,
                    start: new Date(reminder.start),
                    allDay: true,
                    backgroundColor: '#89CFF0',
                    borderColor: '#89CFF0'
                });
            });
        })
        .catch(error => {
            console.error('Error fetching reminders:', error);
        });
}
document.addEventListener('DOMContentLoaded', function() {
    fetchRemindersAndAddToCalendar();
});
