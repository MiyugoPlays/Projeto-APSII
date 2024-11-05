document.addEventListener("DOMContentLoaded", () => {
    const spacesList = document.getElementById('spaces-list');

    // Fetch spaces from the backend API
    fetch('http://localhost:8000/spaces')  // Replace with correct endpoint
        .then(response => response.json())  // Parse the response as JSON
        .then(spaces => {
            // Loop through the spaces and create HTML for each space
            spaces.forEach(space => {
                const spaceItem = document.createElement('div');
                spaceItem.classList.add('space-item');
                spaceItem.innerHTML = `
                    <h3>${space.space_name}</h3>
                    <img src="${space.space_photo}" alt="${space.space_name}" class="space-image">
                    <p>${space.space_desc}</p>
                    <p class="price">${space.price} per night</p>
                    <a href="espaco.html?id=${space.id_space}" class="btn">View Details</a>
                `;
                spacesList.appendChild(spaceItem);
            });
        })
        .catch(error => {
            console.error('Error fetching spaces:', error);
            spacesList.innerHTML = "<p>Failed to load spaces.</p>";
        });
});
