const mail = document.getElementById('emailInput');
const emailIcon = document.getElementById('emailIcon');

const name = document.getElementById('nameInput');
const nameIcon = document.getElementById('nameIcon');

const user = document.getElementById('usernameInput');
const usernameIcon = document.getElementById('usernameIcon');

const pass = document.getElementById('passwordInput');
const passwordIcon = document.getElementById('passwordIcon');

const signupBtn = document.getElementById("signupBtn");

mail.addEventListener('input', () => validate(mail, emailIcon, isValidEmail));
name.addEventListener('input', () => validate(name, nameIcon, isValidName));
user.addEventListener('input', () => validate(user, usernameIcon, isValidUsername));
pass.addEventListener('input', () => validate(pass, passwordIcon, isValidPassword));

function validate(input, icon, validationFunction) {
    const isValid = validationFunction(input.value);
    if (isValid) {
        icon.style.display = 'none';
    } else {
        icon.style.display = 'block';
    }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var nameRegex = /^[A-Za-z]{2,}/i;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;


function isValidEmail(mail) {
    return emailRegex.test(mail);
}

function isValidName(name) {
    return nameRegex.test(name);
}

//unigue username
function isValidUsername(user) { 
    localStorage.removeItem("userLog");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(key));

        if (userData && userData.user === user) {
            return false; // User already exists, not valid
        }
    }
    return user.length >= 1;
}

function isValidPassword(pass) {
    return passwordRegex.test(pass);
}

function storeValue() {
    const name = document.getElementById("nameInput").value;
    const user = document.getElementById("usernameInput").value;
    const mail = document.getElementById("emailInput").value;
    const pass = document.getElementById("passwordInput").value;

    // Validate input regular expressions
    const isValidName = name.match(nameRegex);
    const isValidEmail = mail.match(emailRegex);
    const isValidPassword = pass.match(passwordRegex);

    const userData = {
        name: name,
        user: user,
        mail: mail,
        pass: pass
    };

    if (!isValidName || !isValidEmail || !isValidPassword) {
        validLogin.innerHTML = "Sorry, Enter Correct Data.";
    } else {
        let count = parseInt(localStorage.getItem('count')) || 0;
        const key = "user_" + (count + 1);
        count++;
        localStorage.setItem('count', count.toString());

        
        localStorage.setItem(key, JSON.stringify(userData));

        let userLog = userData.user;           
        localStorage.setItem('userLog', userLog);
        window.location.href = "loading.html";
    }
}


/////show password
document.querySelectorAll(".show-password").forEach((el) =>
    el.addEventListener("click", () => {
        const typeAttr = pass.getAttribute("type");
        const newType = typeAttr === "password" ? "text" : "password";
        pass.setAttribute("type", newType);
    })
);