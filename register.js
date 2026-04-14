import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBM5CTdEtO0p4NfVSwxzBQXXLY7Nl8sQy0",
  authDomain: "gigadummy-5167f.firebaseapp.com",
  projectId: "gigadummy-5167f",
  storageBucket: "gigadummy-5167f.firebasestorage.app",
  messagingSenderId: "1049136260117",
  appId: "1:1049136260117:web:1a431c53e19d437c9d1a1c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (!messageDiv) return; 
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => { messageDiv.style.opacity = 0; }, 5000);
}

// LOGIN LOGIC
const signInBtn = document.getElementById("submitLogin");
if (signInBtn) {
  signInBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("loggedInUserId", userCredential.user.uid);
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error);
        // Changed to match your HTML ID "signInMessage"
        showMessage("Incorrect Email or Password.", "signInMessage"); 
      });
  });
}

// SIGNUP LOGIC
//const signUpBtn = document.getElementById("submitSignup");
if (signUpBtn) {
  signUpBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    // Ensure these IDs match your signup.html exactly
    const firstName = document.getElementById("firstname-input").value; 
    const lastName = document.getElementById("lastname-input").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return setDoc(doc(db, "users", user.uid), {
          email: email,
          firstName: firstName,
          lastName: lastName
        });
      })
      .then(() => {
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error(error);
        showMessage("Registration failed: " + error.message, "signUpMessage");
      });
  });
}