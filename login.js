const togglePasswordElems = document.querySelectorAll('.toggle-password');
const loginFormElem = document.querySelector("#login-form");
const registerFormElem = document.querySelector("#register-form");
const loginUsernameElem = document.querySelector("#login-username");
const loginPasswordElem = document.querySelector("#login-password");
const registerUsernameElem = document.querySelector("#register-username");
const registerPasswordElem = document.querySelector("#register-password");
const verifyPasswordElem = document.querySelector("#verify-password");

togglePasswordElems.forEach(button => {
    button.addEventListener('click', () => {
        const passwordInput = button.previousElementSibling;

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            button.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            button.textContent = 'Show';
        }
    });
});

loginFormElem.addEventListener("submit", evt => {
    evt.preventDefault();
    if (!authenticate(loginUsernameElem.value, loginPasswordElem.value)) {
        alert("Username or password are invalid");
        return;
    }
    location.href = "index.html";
});

registerFormElem.addEventListener("submit", evt => {
    evt.preventDefault();
    if (registerPasswordElem.value !== verifyPasswordElem.value) {
        alert("Register password and verify password do not match");
        return;
    }
    register(registerUsernameElem.value, registerPasswordElem.value);
    alert("Register successfully");
});

function register(username, password) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
}

function authenticate(username, password) {
    const expectedUsername = sessionStorage.getItem("username");
    if (expectedUsername === null) {
        return false;
    }

    const expectedPassword = sessionStorage.getItem("password");
    if (expectedPassword === null) {
        return false;
    }

    return username === expectedUsername && password === expectedPassword;
}