const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Obtén el historial de chat desde el servidor al cargar la página
socket.on("chat history", (history) => {
  history.forEach((msg) => {
    const item = document.createElement("li");
    item.textContent = `${msg.user}: ${msg.message}`;
    messages.appendChild(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    const messageData = {
      user: getUsername(),
      message: input.value
    };
    socket.emit("chat", messageData);

    // Agrega el mensaje a la base de datos local del cliente
    const item = document.createElement("li");
    item.textContent = `${messageData.user}: ${messageData.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    // Envía el mensaje a la base de datos en el servidor
    socket.emit("save to database", messageData);

    input.value = "";
  }
});

socket.on("chat", (msg) => {
  const item = document.createElement("li");
  item.textContent = `${msg.user}: ${msg.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function getUsername() {
  return loggedInUser ? loggedInUser.username : 'Usuario Anónimo';
}
