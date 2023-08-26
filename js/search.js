document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    let usersData = [];

    fetch("https://reqres.in/api/users")
        .then(response => response.json())
        .then(data => {
            usersData = data.data;
            displayUsers(usersData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    function displayUsers(users) {
        userList.innerHTML = '';

        users.forEach(user => {
            const col = document.createElement("div");
            col.className = "col-lg-4 m-4";

            const card = document.createElement("div");
            card.className = "card";

            const img = document.createElement("img");
            img.src = user.avatar;
            img.className = "card-img-top";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const name = document.createElement("h5");
            name.className = "card-title";
            name.textContent = `${user.first_name} ${user.last_name}`;

            const username = document.createElement("p");
            username.className = "card-text";
            username.textContent = `@${user.first_name.toLowerCase()}`;

            cardBody.appendChild(name);
            cardBody.appendChild(username);

            card.appendChild(img);
            card.appendChild(cardBody);

            col.appendChild(card);

            userList.appendChild(col);
        });
    }

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = usersData.filter(user =>
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });
});
