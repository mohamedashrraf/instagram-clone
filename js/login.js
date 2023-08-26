
function loginUser() {
    const mail = document.getElementById('emailInput').value;
    const pass = document.getElementById('passwordInput').value;
    
    const validLogin = document.getElementById("validLogin");
    let isLoggedIn = false;

    let userData;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
         userData = JSON.parse(localStorage.getItem(key));

        if (userData && userData.mail === mail && userData.pass === pass) {
            isLoggedIn = true;
            break;
        }
    }

    if (isLoggedIn) {
        let userLog = userData.user;
        localStorage.setItem('userLog', userLog);

        window.location.href = "./loading.html"; 
    } else {
        validLogin.innerHTML = "Sorry, your password or email was incorrect.";
    }
}


//show password
document.querySelectorAll(".show-password").forEach((el) =>
    el.addEventListener("click", () => {
        const pass = document.getElementById('passwordInput');
        const typeAttr = pass.getAttribute("type");
        const newType = typeAttr === "password" ? "text" : "password";
        pass.setAttribute("type", newType);
    })
);