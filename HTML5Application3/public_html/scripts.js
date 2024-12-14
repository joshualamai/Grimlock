// Game Variables
let currentLevel = 1;
let attemptsLeft = 3;
let otp = "";
let scrambledPassword = "";
let otpTimer;

// Password Challenge: Level 1 - 3
const levelPasswords = {
    1: "secure123",
    2: "password456",
    3: "hardToGuess789",
    4: "SHA256complex!"
};

// Hints for SHA Password (Level 4)
const level4Hints = [
    "The password starts with 'SHA'.",
    "It contains 12 characters.",
    "It includes a number.",
    "It has special characters."
];

let hintIndex = 0;

// Verify Password Function
function verifyPassword() {
    const enteredPassword = document.getElementById("password-input").value;
    if (enteredPassword === levelPasswords[currentLevel]) {
        document.getElementById("message").innerText = "Correct password! Proceeding to the next challenge.";
        proceedToNextChallenge();
    } else {
        attemptsLeft--;
        document.getElementById("attempts-left").innerText = attemptsLeft;
        if (currentLevel === 4 && attemptsLeft > 0) {
            // Give hints for SHA password
            document.getElementById("message").innerText = `Incorrect! Hint: ${level4Hints[hintIndex]}`;
            hintIndex = (hintIndex + 1) % level4Hints.length;
        } else if (attemptsLeft <= 0) {
            // Reveal password after three failed attempts
            document.getElementById("message").innerText = `Game Over! The correct password was: ${levelPasswords[currentLevel]}`;
        } else {
            document.getElementById("message").innerText = "Incorrect password. Try again.";
        }
    }
}

// Scrambled Password: Level 2
function generateScrambledPassword() {
    const password = levelPasswords[2];
    scrambledPassword = password.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById("scrambled-password").innerText = scrambledPassword;
}

function checkScrambledPassword() {
    const enteredPassword = document.getElementById("scrambled-input").value;
    if (enteredPassword === levelPasswords[2]) {
        document.getElementById("message").innerText = "Correct! Proceeding to the next challenge.";
        proceedToNextChallenge();
    } else {
        document.getElementById("message").innerText = "Incorrect! Try again.";
    }
}

// OTP Challenge: Level 3
function startOTPTimer() {
    otp = Math.floor(100000 + Math.random() * 900000).toString();
    document.getElementById("generated-otp").innerText = otp;

    let timer = 30;
    document.getElementById("timer").innerText = timer;
    otpTimer = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            clearInterval(otpTimer);
            document.getElementById("message").innerText = "OTP expired!";
        }
    }, 1000);
}

function verifyOTP() {
    const enteredOTP = document.getElementById("otp-input").value;
    if (enteredOTP === otp) {
        clearInterval(otpTimer);
        document.getElementById("message").innerText = "2FA successful! Proceeding to the next challenge.";
        proceedToNextChallenge();
    } else {
        document.getElementById("message").innerText = "Incorrect OTP. Try again.";
    }
}

// SHA Scrambled Password: Level 4
function generateSHAScrambledPassword() {
    const password = levelPasswords[4];
    scrambledPassword = password.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById("scrambled-password").innerText = scrambledPassword;
}

// Handle Level Progression
function proceedToNextChallenge() {
    switch (currentLevel) {
        case 1:
            currentLevel++;
            document.getElementById("current-level").innerText = currentLevel;
            document.getElementById("password-section").style.display = "none";
            document.getElementById("scrambled-password-section").style.display = "block";
            generateScrambledPassword();
            break;
        case 2:
            currentLevel++;
            document.getElementById("current-level").innerText = currentLevel;
            document.getElementById("scrambled-password-section").style.display = "none";
            document.getElementById("otp-section").style.display = "block";
            startOTPTimer();
            break;
        case 3:
            currentLevel++;
            document.getElementById("current-level").innerText = currentLevel;
            document.getElementById("otp-section").style.display = "none";
            document.getElementById("password-section").style.display = "block";
            document.getElementById("message").innerText = "Level 4: Crack the SHA scrambled password!";
            generateSHAScrambledPassword();
            break;
        default:
            document.getElementById("message").innerText = "Congratulations! You've completed all levels.";
    }
}
