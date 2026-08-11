async function getWeb3Key() {
  try {
    const res = await fetch("https://api.web3forms.com/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "rameshnarendiran@gmail.com"
      })
    });
    const text = await res.text();
    console.log("Web3Forms Key Request Response:", text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

getWeb3Key();
