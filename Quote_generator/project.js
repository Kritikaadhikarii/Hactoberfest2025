const api_url = "https://programming-quotes-api.herokuapp.com/quotes/random";

      async function fetchQuote() {
        const response = await fetch(api_url);
        const data = await response.json();
        document.getElementById("quote").innerText = `"${data.content}"`;
        document.getElementById("author").innerText = `- ${data.author}`;
      }

      fetchQuote(); // Load a quote on page load