async function testWeb3Forms() {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "YOUR_WEB3FORMS_KEY",
        name: "Test User",
        email: "test@example.com",
        message: "Test message from Portfolio Contact Form"
      })
    });
    const json = await res.json();
    console.log("Web3Forms API response:", json);
  } catch (err) {
    console.error("Error sending test email:", err.message);
  }
}

testWeb3Forms();
