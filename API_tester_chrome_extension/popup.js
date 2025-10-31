document.getElementById("apiForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = document.getElementById("url").value;
  const method = document.getElementById("method").value;
  const headers = document.getElementById("headers").value;
  const body = document.getElementById("body").value;

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers ? JSON.parse(headers) : {},
      body: method !== "GET" && method !== "DELETE" ? body : null,
    });

    const data = await response.json();
    document.getElementById("responseOutput").textContent = JSON.stringify(
      data,
      null,
      2
    );
  } catch (error) {
    document.getElementById(
      "responseOutput"
    ).textContent = `Error: ${error.message}`;
  }
});
