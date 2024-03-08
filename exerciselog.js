function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.querySelector('#datetime').textContent = currentDateTime;
}

// Call the function initially
updateDateTime();

// Use setInterval to update the time continuously
setInterval(updateDateTime, 1000);
