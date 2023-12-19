//Bakkend connection
const BASE_URL = 'https://api.example.com';

function makeRequest(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// For registration
makeRequest('/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "sampleUser",
        password: "samplePassword"
    })
})
.then(data => alert(data.message))
.catch(error => console.error('There was a problem with the fetch operation:', error));

// For login
makeRequest('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "sampleUser",
        password: "samplePassword"
    })
})
.then(data => alert(data.message))
.catch(error => console.error('There was a problem with the fetch operation:', error));
