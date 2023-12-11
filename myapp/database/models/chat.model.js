const chatModel = {};

chatModel.history = [];

chatModel.addMessage = function (user, message) {
    const newMessage = { user, message };
    chatModel.history.push(newMessage);
};

chatModel.getHistory = function () {
    return chatModel.history;
};

module.exports = chatModel;
