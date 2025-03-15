// Subscrbe YouTube Always Anan
AOS.init({
    offset: 50, // Mengurangi jarak pemicu animasi
    duration: 600, // Mempercepat durasi animasi (default: 1200ms)
    easing: 'ease-in-out',
    once: true // Animasi hanya terjadi sekali
});

function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform  = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform  = "translateY(-500px)"
}

function eraseText() {
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1)
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter,500)
    }
}

window.onload = typeWriter;

// Subscrbe YouTube Always Anan
const apiKey = "YOUR_OPENAI_API_KEY";  // Ganti dengan API key OpenAI

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Tambah pesan pengguna ke chat
    const chatBody = document.getElementById("chat-body");
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatBody.appendChild(userMessage);
    document.getElementById("user-input").value = "";

    // Scroll ke bawah
    chatBody.scrollTop = chatBody.scrollHeight;

    // Kirim pesan ke API
    fetchAIResponse(userInput);
}

function fetchAIResponse(message) {
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data); // Debugging
        if (data.choices && data.choices.length > 0) {
            displayBotMessage(data.choices[0].message.content);
        } else {
            displayBotMessage("Maaf, terjadi kesalahan.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        displayBotMessage("Maaf, terjadi kesalahan dalam sistem.");
    });
}

function displayBotMessage(message) {
    const chatBody = document.getElementById("chat-body");
    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = message;
    chatBody.appendChild(botMessage);

    // Scroll ke bawah
    chatBody.scrollTop = chatBody.scrollHeight;
}
