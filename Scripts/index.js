const typingTextArray = [
    "The way to get started is to quit talking and begin doing.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "Life is what happens when you're busy making other plans.",
    "When you reach the end of your rope, tie a knot in it and hang on",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    "The future belongs to those who believe in the beauty of their dreams."
];

//total duration of typing test in seconds
const duration = 60;
let timeLeft = duration;
let timePassed = 0;
let timer = null;
let timeTextElement = document.querySelector('.time')
//Typing quote array index
let typingTextIndex = 0;
//cpm and wpm elements
let cpmText = document.querySelector('.cpm');
let cpmGroup = document.querySelector('.charecterPerMinute');
let wpmText = document.querySelector('.wpm');
let wpmGroup = document.querySelector('.wordPerMinute');

//typing quote element from document
let typingTextElement = document.getElementById('typingText');
let typingText = '';

//count of charecters typed
let typedCharecters = 0;

//Typing area element
let typingAreaElement = document.getElementById('typingArea');

//error variables declaration
let errors = 0;
let error = 0;

//error text on scoreboard
let errortext = document.querySelector('.errors');

//accuracy text on scoreboard
let accuracyText = document.querySelector('.accuracy');
let textcheckingindex = 0;

//restart button element
let restart = document.getElementById('restartBtn');

function startTyping() {
    typingAreaElement.disabled = false;
    resetValues();
    showTypingText();
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}
function resetValues() {
    typingTextIndex = 0;
    typingText = '';
    typedCharecters = 0;
    errors = 0;
    error = 0;
    textcheckingindex = 0;
    timeLeft = duration;
    timePassed = 0;
    cpmGroup.style.display = "none";
    wpmGroup.style.display = "none";
    errortext.textContent = 0
    restart.style.display = "none";
    accuracyText.textContent = '100 %';
}

function showTypingText() {

    typingTextElement.textContent = '';
    typingAreaElement.value = '';
    textcheckingindex = 0;
    if (typingTextIndex == typingTextArray.length) {
        typingTextIndex = 0;
    }
    if (typingTextIndex < typingTextArray.length) {
        typingText = typingTextArray[typingTextIndex];
        typingText.split('').forEach((char) => {
            const spanElement = document.createElement('span');
            spanElement.innerText = char;
            typingTextElement.appendChild(spanElement);
        })
        typingTextIndex++;
    }
}

function charecterTyped() {
    typedCharecters++;
    textcheckingindex++;
    accessText();
}

function accessText() {
    let typedtextArray = typingAreaElement.value.split('');
    let typingTextSpanArray = typingTextElement.querySelectorAll('span');
    let compareCharecter = typingTextSpanArray[textcheckingindex - 1]
    let typedText = typedtextArray[textcheckingindex - 1];
    if (typedText == null) {
        compareCharecter.classList.remove('correct_char');
        compareCharecter.classList.remove('incorrect_char');
    }
    else if (typedText === compareCharecter.innerText) {
        compareCharecter.classList.add('correct_char');
        compareCharecter.classList.remove('incorrect_char');
    }
    else {
        compareCharecter.classList.remove('correct_char');
        compareCharecter.classList.add('incorrect_char');
        errors++;

    }
    //update error text
    errortext.textContent = errors;
    //update accuracy text
    let correctCharecters = typedCharecters - errors;
    accuracyText.textContent = Math.round((correctCharecters / typedCharecters) * 100) + ' %';
    if (typedtextArray.length === typingText.length) {
        errors = errors + error;
        showTypingText();
    }
}
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timePassed++;
        timeTextElement.textContent = timeLeft + 's';
    }
    else {
        finishTyping();
    }
}

function finishTyping() {
    clearInterval(timer);
    typingTextElement.textContent = 'Click on restart to type again'
    restart.style.display = "block";
    cpmText.textContent = Math.round((typedCharecters / timePassed) * 60);
    wpmText.textContent = Math.round(((typedCharecters/5) / timePassed) * 60);
    console.log(charecterTyped + " " + timePassed);
    cpmGroup.style.display = "block";
    wpmGroup.style.display = "block";
    typingAreaElement.value = "";
    typingAreaElement.disabled = true;
}