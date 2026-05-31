const output = document.getElementById('output-display');
const keyboard = document.querySelector('.keyboard');

window.onload = () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    setTheme(savedTheme);
    document.getElementById('theme-selector').value = savedTheme;
};

// Handle letter clicks
keyboard.addEventListener('click', (event) => {
    const btn = event.target.closest('.key, .key-wide');
    if (!btn || btn.classList.contains('read-btn')) return;

    const char = btn.getAttribute('data-char');

    if (char === 'BACK') {
        output.innerText = output.innerText.slice(0, -1);
    } else {
        // 1. Append the character to the display (This handles the space)
        output.innerText += char;
        
        // 2. Decide what to say
        // If the character is a space, tell the engine to say "Space",
        // otherwise, say the letter itself.
        const textToSpeak = (char === ' ') ? "Space" : char;
        
        speakText(textToSpeak);
    }
});

function clearDisplay() {
    output.innerText = "";
}

// Read full sentence
function readFullSentence() {
    const text = output.innerText;
    if (text.trim() !== "") {
        speakText(text);
    }
}

function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName); 
}

// Unified speech function
function speakText(text) {
    window.speechSynthesis.cancel();

    const textToSay = (text.length === 1) ? text.toLowerCase() : text;
    
    const utterance = new SpeechSynthesisUtterance(textToSay);
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
}