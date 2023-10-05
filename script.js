document.addEventListener('DOMContentLoaded', function() {
   // Fetch the JSON data
   fetchJsonData().then(data => {
       // Generate the cards based on the JSON data
       generateCards(data);

       // Define filterButtons and cards
       const filterButtons = document.querySelectorAll('#filter-buttons button');
       const cards = document.querySelectorAll('#filterable-cards .card');

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
        
                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-name') === filter) {
                        card.style.display = ''; // Reset display property
                        card.classList.remove('out'); // Remove the out class
                        card.classList.add('hide'); // Add the fall back animation
                        setTimeout(() => {
                            card.classList.remove('hide'); // Remove hide class after animation completes
                            card.classList.add('slide'); // Add slide animation to make it look like it's loading in
                            setTimeout(() => {
                                card.classList.remove('slide'); // Remove slide class after animation completes
                            }, 500); // 500ms matches the animation duration
                        }, 500); // 500ms matches the animation duration
                    } else {
                        card.classList.add('hide'); // Add the hide class to make it fall back
                        setTimeout(() => {
                            card.classList.add('out'); // Add the out class to move it out of view
                            card.style.display = 'none'; // Hide the card after the animation
                        }, 500); // 500ms matches the animation duration
                    }
                });
        
                // Remove active class from all buttons and add to the clicked one
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });

       // Set height based on the first card
       const firstCardHeight = document.querySelector('#filterable-cards .card').offsetHeight;
       cards.forEach(card => {
           card.style.height = `${firstCardHeight}px`;
       });

       // Sort cards
       sortCards();
   });
});

function fetchJsonData() {
   // Replace this with the path to your JSON file if it's not in the same directory
   return fetch('data.json')
       .then(response => response.json())
       .catch(error => console.error('Error fetching the JSON data:', error));
}

function generateCards(data) {
   const cardContainer = document.getElementById('filterable-cards');

   data.forEach(item => {
       const card = document.createElement('div');
       card.classList.add('card', 'p-0');
       card.setAttribute('data-name', item.dataName);

       const img = document.createElement('img');
       img.src = item.imgSrc;
       img.alt = 'img';

       const cardBody = document.createElement('div');
       cardBody.classList.add('card-body');

       const cardTitle = document.createElement('h6');
       cardTitle.classList.add('card-title');
       cardTitle.textContent = item.cardTitle;

       cardBody.appendChild(cardTitle);
       card.appendChild(img);
       card.appendChild(cardBody);
       cardContainer.appendChild(card);
   });
}

function sortCards() {
   const cardContainer = document.getElementById('filterable-cards');
   const cards = Array.from(cardContainer.children); // Convert NodeList to array

   const sortedCards = cards.sort((a, b) => {
       const titleA = a.querySelector('.card-title').textContent.trim().toLowerCase();
       const titleB = b.querySelector('.card-title').textContent.trim().toLowerCase();
       return titleA.localeCompare(titleB, 'el'); // 'el' is for Greek locale
   });

   // Append sorted cards back to the container
   sortedCards.forEach(card => cardContainer.appendChild(card));
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-name') === filter) {
                card.style.display = ''; // Reset display property
                card.classList.remove('hide');
                card.classList.add('slide'); // Add slide animation
                setTimeout(() => {
                    card.classList.remove('slide'); // Remove slide class after animation completes
                }, 500); // 500ms matches the animation duration
            } else {
                card.classList.add('hide');
                setTimeout(() => {
                    if (card.classList.contains('hide')) {
                        card.style.display = 'none';
                    }
                }, 500); // 500ms matches the animation duration
            }
        });

        // Remove active class from all buttons and add to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});
