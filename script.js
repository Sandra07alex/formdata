// Client-side JavaScript
const form = document.getElementById("contactForm");
const message = document.getElementById("message");

const scriptURL = "https://script.google.com/macros/s/AKfycbwB9W9nino3_9PAAck7X87-LsVsHkj3qvDuSdnvJUNLkVTtEffuTQwLqJZtve4wzcd3fw/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.innerText = "Submitting...";

  // Create a hidden iframe for form submission
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  // Create a form within the iframe that posts to the Google Script
  const iframeDoc = iframe.contentWindow.document;
  const iframeForm = iframeDoc.createElement("form");
  iframeForm.method = "POST";
  iframeForm.action = scriptURL;
  iframeDoc.body.appendChild(iframeForm);

  // Add all form fields from the original form
  const formData = new FormData(form);
  const userData = {};
  for (const pair of formData.entries()) {
    const input = iframeDoc.createElement("input");
    input.type = "hidden";
    input.name = pair[0];
    input.value = pair[1];
    iframeForm.appendChild(input);
    userData[pair[0]] = pair[1]; // Store for WhatsApp
  }

  // Submit the form and handle the response
  iframe.onload = function() {
    message.innerText = "✅ Submitted Successfully!";
    form.reset();

    // Send WhatsApp message
    const phoneNumber = "9037846438"; // <-- change to your number (no +, no spaces)
    const whatsappMessage = `Name: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  };

  iframe.onerror = function() {
    message.innerText = "⚠️ Network error";
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  };

  iframeForm.submit();
});
