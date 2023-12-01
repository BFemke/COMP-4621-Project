document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");
    const button = document.getElementById("submitBtn");

    //Sends confirmation message upon successful submission
    button.addEventListener("click", function(event) {
        // Show the confirmation message
        confirmationMessage.style.display = "block";
    });

});
