const userList = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");
let skip = 0;
const limit = 10;

async function loadUsers() {
  try {
    loadMoreBtn.disabled = true;
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    data.users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
      userCard.innerHTML = `
            <img src="${user.image}" alt="${user.firstName}">
            <h3>${user.firstName} ${user.lastName}</h3>
            `;
      userList.appendChild(userCard);
    });

    skip += limit;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadMoreBtn.disabled = false;
  }
}
loadMoreBtn.addEventListener("click", () => {
  loadUsers();
});

app.js;
