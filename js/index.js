import { USER } from "./user.js";

function checkSecret() {
    const xhttp = new XMLHttpRequest();
    const secret_text = document.getElementById("secret-text").value;
    xhttp.open(
        "GET",
        "/?secret=" + encodeURIComponent(secret_text),
        true
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            document.getElementById("secret-response").textContent = response.response;
        }
    }
}

function askChatbot() {
    const chatbot_text = document.getElementById("chatbot-text").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/chat");
    xhr.setRequestHeader(
        "Content-Type",
        "application/json"
    );
    document.getElementById("chatbot-loading").textContent = USER.loading;
    document.getElementById("chatbot-response").textContent = "";
    xhr.send(JSON.stringify({question: chatbot_text}));
    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        document.getElementById("chatbot-response").textContent = response.response;
        document.getElementById("chatbot-loading").textContent = USER.loaded;
    };
}

document.getElementById("secret-btn")
    .addEventListener("click", checkSecret);

document.getElementById("ask-btn")
    .addEventListener("click", askChatbot);