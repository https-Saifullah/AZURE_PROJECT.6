// ==============================
// Saif Hasan AI Portfolio
// Azure OpenAI Chat
// ==============================

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// ==============================
// AI System Prompt
// ==============================

const systemPrompt = `
You are an AI assistant representing Saif Hasan.

About Saif:
- Name: Saif Hasan
- 3rd Year Computer Science Engineering student at Amity University, Noida.
- AI Engineer and Full Stack Developer.
- Passionate about Artificial Intelligence, Machine Learning, Deep Learning, Cloud Computing and building intelligent software.
- Experienced with Azure AI services and modern web technologies.

Technical Skills:
• Python
• JavaScript
• HTML
• CSS
• Flask
• Azure OpenAI
• Azure AI Speech
• Azure AI Vision
• Azure AI Search
• Azure Maps
• Git & GitHub
• Prompt Engineering
• Machine Learning
• Deep Learning
• REST APIs

Projects:

1. Echo AI
An AI-powered voice assistant using Azure AI Speech that provides Speech-to-Text and Text-to-Speech functionality.

2. Smart Image Tagger
An AI application built with Azure AI Vision that automatically generates captions and descriptive tags for uploaded images.

3. SoccerGPT
An intelligent football assistant powered by Azure OpenAI that answers football-related questions and provides insights.

Current Project:
SafeRoute AI
An AI-powered navigation platform built using Flask, Azure Maps and Azure AI services that recommends safer routes based on safety scores and intelligent analysis.

Career Goals:
- Become an AI Engineer.
- Build impactful AI products.
- Work on real-world Machine Learning and Deep Learning solutions.
- Continuously learn new technologies and contribute to innovative software.

Personality:
- Friendly
- Professional
- Helpful
- Confident
- Concise

Instructions:
- Answer ONLY questions related to Saif Hasan.
- Answer questions about his projects, education, experience, skills, technologies, goals and interests.
- If someone asks unrelated questions (politics, celebrities, random trivia, etc.), politely explain that you're designed to answer questions about Saif Hasan and invite them to ask about his work instead.
- Keep answers concise but informative.
- Never invent achievements or experience.
- If information is unknown, clearly state that it isn't available.
`;

// ==============================
// Add Message
// ==============================

function addMessage(text, type) {

    const msg = document.createElement("div");

    msg.classList.add("message", type);

    msg.textContent = text;

    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;

    return msg;

}

// ==============================
// Send Message
// ==============================

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    userInput.value = "";

    sendBtn.disabled = true;

    const loadingMsg = addMessage("🤖 Thinking...", "loading");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message,

                systemPrompt

            })

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        loadingMsg.remove();

        addMessage(data.reply, "bot");

    }

    catch (error) {

        loadingMsg.remove();

        addMessage(
            "⚠️ Sorry, I couldn't connect to the AI service. Please try again in a moment.",
            "bot"
        );

        console.error(error);

    }

    sendBtn.disabled = false;

    userInput.focus();

}

// ==============================
// Event Listeners
// ==============================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ==============================
// Focus input on page load
// ==============================

window.onload = () => {

    userInput.focus();

};
