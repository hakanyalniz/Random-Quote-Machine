import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";

function App() {
  const quotes: Record<string, string> = {
    "Deng Xiaoping":
      "Keep a cool head and maintain a low profile. Never take the lead - but aim to do something big.",
    "Walt Whitman":
      "Let your soul stand cool and composed before a million universes.",
    "Thomas Jefferson":
      "Nothing gives one person so much advantage over another as to remain always cool and unruffled under all circumstances.",
    "Elia Kazan":
      "Whatever hysteria exists is inflamed by mystery, suspicion and secrecy. Hard and exact facts will cool it.",
    "Joyce Meyer":
      "It's so important to realize that every time you get upset, it drains your emotional energy. Losing your cool makes you tired. Getting angry a lot messes with your health.",
    "Oscar Wilde": "Be yourself; everyone else is already taken.",
    "Bernard M. Baruch":
      "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "Dr. Seuss":
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    "Mae West": "You only live once, but if you do it right, once is enough.",
    "Robert Frost":
      "In three words I can sum up everything I've learned about life: it goes on.",
    "Mark Twain": "If you tell the truth, you don't have to remember anything.",
  };

  // Array of background colors corresponding to each quote
  const backgroundColors = [
    "#92676d",
    "#ac4330",
    "#5a945a",
    "#5c5f19",
    "#29053b",
    "#0b5c48",
    "#605e1b",
    "#224d61",
    "#067538",
    "#63143f",
    "#612222",
  ];

  const quoteKeys: string[] = Object.keys(quotes);

  // State to store the random index
  const [randomQuoteIndex, setRandomQuoteIndex] = useState<number>(
    Math.floor(Math.random() * quoteKeys.length)
  );
  const [quoteVisible, setQuoteVisible] = useState<boolean>(true);

  // Object.keys(quotes): Returns an array of the object's keys.
  // .length: Gets the length of the array (i.e., the number of keys).
  // Math.random(): Generates a random number between 0 (inclusive) and 1 (exclusive).
  // Math.floor(): Rounds the number down to the nearest whole number, ensuring it’s a valid index for the keys array.
  const handleButtonClick: () => void = () => {
    setQuoteVisible(false);

    setTimeout(() => {
      const randomQuoteIndex = Math.floor(Math.random() * quoteKeys.length);

      // Dynamically change the CSS variables
      document.documentElement.style.setProperty(
        "--dynamic-color",
        backgroundColors[randomQuoteIndex]
      );

      setQuoteVisible(true);

      setRandomQuoteIndex(randomQuoteIndex); // Update the state with the random index
    }, 300);
  };

  function changeButtonContent() {
    const button = document.getElementById("new-quote") as HTMLButtonElement;

    if (window.innerWidth <= 400) {
      button.textContent = "New"; // Change button text for larger screens
    } else {
      button.textContent = "New Quote"; // Change button text for smaller screens
    }
  }

  // Call the function when the window is resized
  window.addEventListener("resize", changeButtonContent);

  // Fire once at mount to get a random quote color
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--dynamic-color",
      backgroundColors[randomQuoteIndex]
    );
  }, []);

  return (
    <div className="container">
      <div id="quote-box">
        <p id="text" className={`${quoteVisible ? "" : "hidden"}`}>
          <FontAwesomeIcon
            icon={faQuoteLeft}
            size="1x"
            className="dynamic-icon"
          />
          {quotes[quoteKeys[randomQuoteIndex]]}
        </p>
        <p id="author">- {quoteKeys[randomQuoteIndex]}</p>
        <a
          href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
            `${quotes[quoteKeys[randomQuoteIndex]]}\n\n- ${
              quoteKeys[randomQuoteIndex]
            }`
          )}`}
          id="tweet-quote"
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} size="1x" color={"white"} />
        </a>
        <button id="new-quote" onClick={handleButtonClick}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
