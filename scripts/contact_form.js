const form = document.querySelector('#contact_me form');
const inputs = form.querySelectorAll('input[required], textarea[required]');
const submitBtn = document.querySelector('button[type="submit"]');
const statusDiv = form.querySelector('.form-status');

function checkInputs() {
    const allValid = Array.from(inputs).every(input => input.checkValidity());
    submitBtn.disabled = !allValid;
}

form.addEventListener('input', checkInputs);

form.addEventListener('submit', async function(e) {
    e.preventDefault(); //Stop page reload

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    statusDiv.style.display = "none";

    try {
        const formData = new FormData(form);
        const plainObject = Object.fromEntries(formData.entries());
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(plainObject),
        });

        if (response.ok) {
            statusDiv.className = "form-status success";
            statusDiv.innerText = "🎉 Thank you! Your message was sent successfully!";
            statusDiv.style.display = "block";
            form.reset(); // Clear input fields
            submitBtn.disabled = false;
        } else {
            throw new Error('FormSubmit rejected the post request.');
        }
    } catch (error) {
        statusDiv.className = "form-status error";
        statusDiv.innerText = "😞 Your message could not be sent. Please try again later.";
        statusDiv.style.display = "block";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Message";
    }
});
