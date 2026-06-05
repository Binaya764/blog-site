document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Elements
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const formResponse = document.getElementById('formResponse');

    // Reset errors
    resetErrors();

    let isValid = true;

    // 1. Username Validation
    if (username.value.trim().length < 3) {
        showError(username, 'usernameError', 'Username must be at least 3 characters.');
        isValid = false;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, 'emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    // 3. Password Validation
    if (password.value.length < 6) {
        showError(password, 'passwordError', 'Password must be at least 6 characters.');
        isValid = false;
    }

    // 4. Confirm Password Validation
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'confirmPasswordError', 'Passwords do not match.');
        isValid = false;
    }

    // If front-end validation passes, send data to Node.js backend
    if (isValid) {
        const formData = {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value
        };

        try {
            // Replace with your actual backend URL if running on a different port (e.g., http://localhost:5000/api/signup)
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                showResponse(data.message || 'Signup successful!', 'success');
                document.getElementById('signupForm').reset();
            } else {
                showResponse(data.message || 'Something went wrong.', 'error');
            }

        } catch (error) {
            console.error('Error connecting to backend:', error);
            showResponse('Unable to connect to the server. Please try again later.', 'error');
        }
    }
});

function showError(inputElement, errorSpanId, message) {
    inputElement.classList.add('invalid');
    document.getElementById(errorSpanId).textContent = message;
}

function resetErrors() {
    const inputs = document.querySelectorAll('.input-group input');
    const errors = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => input.classList.remove('invalid'));
    errors.forEach(error => error.textContent = '');
    
    const responseBox = document.getElementById('formResponse');
    responseBox.className = 'form-response';
    responseBox.style.display = 'none';
}

function showResponse(message, type) {
    const responseBox = document.getElementById('formResponse');
    responseBox.textContent = message;
    responseBox.className = `form-response ${type}`;
}