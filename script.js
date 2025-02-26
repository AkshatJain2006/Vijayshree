document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');

        // If it's an external link (e.g., buy.html), allow normal navigation
        if (targetId.includes('.html')) return; 

        event.preventDefault();
        const targetSection = document.getElementById(targetId.substring(1));

        if (targetSection) { // ✅ Only scroll if the target exists
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Thank you for contacting us! We will get back to you soon.");
});
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
    let isValid = true;

    // Reset styles before checking
    [name, email, message].forEach(field => field.style.border = "1px solid #ccc");

    if (name.value.trim() === "") {
        name.style.border = "2px solid red";
        isValid = false;
    }

    if (email.value.trim() === "") {
        email.style.border = "2px solid red";
        isValid = false;
    }

    if (message.value.trim() === "") {
        message.style.border = "2px solid red";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Show success message
    let successMessage = document.createElement("p");
    successMessage.textContent = "Thank you for contacting us! We will get back to you soon.";
    successMessage.style.color = "green";
    document.getElementById("contact").appendChild(successMessage);

    // Clear form fields
    name.value = "";
    email.value = "";
    message.value = "";
});
let backToTop = document.getElementById("back-to-top");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});






