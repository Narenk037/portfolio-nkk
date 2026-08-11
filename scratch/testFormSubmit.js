async function testFormSubmit() {
  try {
    const res = await fetch("https://formsubmit.co/ajax/rameshnarendiran@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:5174",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        name: "Test Visitor",
        email: "rameshnarendiran@gmail.com",
        message: "Hello Narendiran, testing instant email notification for your portfolio!",
        _subject: "💼 New Portfolio Message Notification"
      })
    });
    const json = await res.json();
    console.log("FormSubmit response with origin:", json);
  } catch (err) {
    console.error("FormSubmit error:", err.message);
  }
}

testFormSubmit();
