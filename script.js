const form = document.getElementById("contactForm");
const message = document.getElementById("message");

// ⬇️ Replace with your actual Web App URL:
const scriptURL = "https://script.google.com/macros/s/AKfycbxW2LOssdWCdpoTHbCu68Y2-sG0gL0XmClNq03bFSJ77cMjjN9tLeU0sMbGU5tfW6Mo-A/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.text();
    if (result === "Success") {
      message.innerText = "✅ Submitted Successfully!";
      form.reset();
    } else {
      message.innerText = "❌ Error submitting data.";
    }
  } catch (err) {
    message.innerText = "⚠️ Network error: " + err.message;
  }
});
