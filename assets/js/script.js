// Define variables for DOM elements
const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

// Function to fetch a random quote from the API
function randomQuote() {
    // Add loading state to the button
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    // Fetch a random quote from the API
    fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(result => {
            // Update the quote text and author name
            quoteText.innerText = result.content;
            authorName.innerText = result.author;

            // Remove loading state from the button
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}

// Event listener for speech button
speechBtn.addEventListener("click", () => {
    // Check if the quote button is not in loading state
    if (!quoteBtn.classList.contains("loading")) {
        // Create a new speech synthesis utterance
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        // Speak the utterance
        synth.speak(utterance);

        // Check for speaking state of the speech synthesis
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

// Event listener for copy button
copyBtn.addEventListener("click", () => {
    // Copy the quote text to the clipboard
    navigator.clipboard.writeText(quoteText.innerText);
});

// Event listener for Twitter button
twitterBtn.addEventListener("click", () => {
    // Construct the tweet URL with the quote text
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    // Open the tweet URL in a new tab
    window.open(tweetUrl, "_blank");
});

// Event listener for new quote button
quoteBtn.addEventListener("click", randomQuote);
