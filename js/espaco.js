// js/scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Grab the form element and other necessary elements
    const form = document.querySelector('form');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');
    const submitButton = form.querySelector('button[type="submit"]');

    // Set up form submission event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const checkinDate = checkinInput.value;
        const checkoutDate = checkoutInput.value;
        const guests = guestsInput.value;

        // Basic form validation
        if (!checkinDate || !checkoutDate || !guests || guests < 1) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        // Log form data for debugging (optional)
        console.log(`Reserva confirmada: 
            Check-in: ${checkinDate} 
            Check-out: ${checkoutDate} 
            Hóspedes: ${guests}`);

        // Here you could send the form data to your backend (e.g., using Fetch API or AJAX)
        // For now, let's simulate the booking process:

        showBookingConfirmation(checkinDate, checkoutDate, guests);

        // Optionally, you could also reset the form after submission (if you want)
        // form.reset();
    });

    // Show a confirmation modal or message
    function showBookingConfirmation(checkinDate, checkoutDate, guests) {
        const confirmationMessage = `
            <h3>Confirmação de Reserva</h3>
            <p><strong>Check-in:</strong> ${checkinDate}</p>
            <p><strong>Check-out:</strong> ${checkoutDate}</p>
            <p><strong>Hóspedes:</strong> ${guests}</p>
            <p>Sua reserva foi feita com sucesso!</p>
        `;

        const bookingSection = document.querySelector('.booking-section');
        const confirmationDiv = document.createElement('div');
        confirmationDiv.classList.add('confirmation-message');
        confirmationDiv.innerHTML = confirmationMessage;

        // Append confirmation message to the booking section
        bookingSection.appendChild(confirmationDiv);

        // Optionally, disable the form inputs to prevent further changes after booking
        disableForm();
    }

    // Disable form inputs after a successful booking
    function disableForm() {
        checkinInput.disabled = true;
        checkoutInput.disabled = true;
        guestsInput.disabled = true;
        submitButton.disabled = true;
    }

    // Add a smooth scroll behavior to the page for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add tooltips to form fields (optional)
    addTooltips();

    function addTooltips() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.innerText = `Por favor, insira um(a) ${input.name}`;
                input.parentElement.appendChild(tooltip);
            });

            input.addEventListener('blur', function() {
                const tooltip = input.parentElement.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    }

    // Optional: Add a date picker for check-in and check-out inputs
    // The HTML5 input type="date" should already give a date picker, but we can add custom functionality if needed.
    addDatePickerBehavior();

    function addDatePickerBehavior() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
        checkinInput.setAttribute('min', today);  // Set minimum date for check-in
        checkoutInput.setAttribute('min', today); // Set minimum date for check-out
    }
});
