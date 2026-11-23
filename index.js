const url = "/api/chat"

const chatBox = document.getElementById("chat-box")
const userInput = document.getElementById("user-input")
const sendBtn = document.getElementById("send-btn")
const clearBtn = document.getElementById("clear-btn")

const systemMessage = {
    role: "system",
    content: "You are Polly, a friendly parrot chatbot. You chat with people and help them translate text into other languages. Keep your replies short and use plain text only."
}

let messages = [systemMessage]

sendBtn.addEventListener("click", sendMessage)
clearBtn.addEventListener("click", clearChat)

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage()
    }
})

function clearChat() {
    messages = [systemMessage]
    chatBox.innerHTML = `<p class="message bot">Squawk! I'm Polly. Chat with me or ask me to translate something. 🦜</p>`
}

async function sendMessage() {
    const text = userInput.value

    if (text === "") {
        return
    }

    chatBox.innerHTML += `<p class="message user">${text}</p>`
    chatBox.scrollTop = chatBox.scrollHeight
    userInput.value = ""
    messages.push({ role: "user", content: text })

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: messages
        })
    })
    const data = await response.json()
    console.log(data)

    if (data.choices === undefined) {
        messages.pop()
        chatBox.innerHTML += `<p class="message bot">Squawk! Something went wrong. Please try again.</p>`
        chatBox.scrollTop = chatBox.scrollHeight
        return
    }

    const reply = data.choices[0].message.content
    messages.push({ role: "assistant", content: reply })
    chatBox.innerHTML += `<p class="message bot">${reply}</p>`
    chatBox.scrollTop = chatBox.scrollHeight
}