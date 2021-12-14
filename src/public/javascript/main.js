var page = 0;

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");
        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
        const icons = {
            success: "checkmark-circle-outline",
            info: "information-circle-outline",
            warning: "alert-circle-outline",
            error: "bug-outline"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <ion-icon name="${icon}"></ion-icon>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
function showSuccessToast(message, title = "Successfully", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'success',
        duration: duration
    })
}
function showInfoToast(message, title = "Information", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'info',
        duration: duration
    })
}
function showErrorToast(message, title = "Error", duration = 3000) {
    toast({
        title: title,
        message: message,
        type: 'error',
        duration: duration
    })
}