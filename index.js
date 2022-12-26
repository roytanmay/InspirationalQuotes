const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const getRandomQuote = () => {
  showLoadingSpinner();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};
const getQuotes = async () => {
  showLoadingSpinner();
  try {
    const response = await fetch("https://type.fit/api/quotes");
    quotes = await response.json();
    getRandomQuote();
  } catch (error) {}
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getRandomQuote);

// On load
getQuotes();
