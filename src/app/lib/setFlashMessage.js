function setFlashMessage(type, title, message) {
    return {
        type: type,
        title: title,
        message: message
    }
}
module.exports = setFlashMessage;