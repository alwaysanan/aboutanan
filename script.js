// Subscrbe YouTube Always Anan

function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform  = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform  = "translateY(-500px)"
}

// Animasi Menulis

const texts = [
    "DEVELOPER",
    "YOUTUBER",
    "DESIGNER"
]

let speed = 100;

const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if(charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, 1000)
    }
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

function toggleChat() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.style.display = chatWindow.style.display === "block" ? "none" : "block";
}

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

    // Kirim pesan ke AI
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
        const botResponse = data.choices[0].message.content;
        displayBotMessage(botResponse);
    })
    .catch(error => {
        console.error("Error:", error);
        displayBotMessage("Sorry, there is a problem in the system.");
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
