var recognizing = false;
var finalTranscript = '';

// Speech Recognition API
if (!('webkitSpeechRecognition' in window)) {
    // Checks browser support
    document.getElementById('not-supported').classList.remove('hidden');
    
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Set en-US as default language
    
    recognition.onstart = function() {
        recognizing = true;
    };
    
    recognition.onerror = function() {
        console.log('An error occurred while recognizing your speech!');
    };
    
    recognition.onresult = function(event) {
        var interimTranscript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }   
        }
        
        document.getElementById('final-span').innerHTML = finalTranscript;
        document.getElementById('interim-span').innerHTML = interimTranscript;
        
        console.log(interimTranscript);
        console.log(finalTranscript);
        
    };
}

function toggleRecognition(event) {
    // Toggle speech recognition by clicking on the mic button
    if (recognizing) {
        recognizing = false;
        recognition.stop();
        
        document.getElementById('start-speech').classList.remove('hidden');
        document.getElementById('stop-speech').classList.add('hidden');
        
        return;
        
    } else {
        finalTranscript = '';
        
        document.getElementById('start-speech').classList.add('hidden');
        document.getElementById('stop-speech').classList.remove('hidden');
        
        recognition.start();
        document.getElementById('final-span').innerHTML = '';
        document.getElementById('interim-span').innerHTML = '';
    }
}