
```javascript
// Hamburger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('nav-active');
});

// Firebase configuration and functions
// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Handling newsletter signup form
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;

    try {
        await db.collection('subscribers').add({
            email: email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Subscription successful!');
        newsletterForm.reset();
    } catch (error) {
        alert('Error subscribing: ' + error.message);
    }
});

// Handling comments form
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const comment = document.getElementById('commentInput').value;

    try {
        await db.collection('comments').add({
            name: name,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Comment posted successfully!');
        commentForm.reset();
        // You can update the UI to display the new comment immediately if needed
    } catch (error) {
        alert('Error posting comment: ' + error.message);
    }
});

// Real-time listener for comments
db.collection('comments').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    commentsList.innerHTML = '';
    snapshot.forEach(doc => {
        const commentData = doc.data();
        const commentItem = document.createElement('div');
        commentItem.innerHTML = `
            <h4>${commentData.name}</h4>
            <p>${commentData.comment}</p>
        `;
        commentsList.appendChild(commentItem);
    });
});
