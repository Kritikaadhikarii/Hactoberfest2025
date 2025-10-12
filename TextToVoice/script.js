const textEL = document.getElementById('text');
const speakEL = document.getElementById('speak');

speakEL.addEventListener('click', speakText);
function speakText() {

    // stop any speaking in progress
    window.speechSynthesis.cancel();

    const text = textEL.value;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}