// get elements
const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// disable/enable button

function toggleButton() {
  button.disabled = !button.disabled;
}

// pass joke to VoiceRSS API

function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: apiKey,
    src: jokeString,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// get jokes fom API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // using if else
    // if (data.setup) {
    //   joke = `${data.setup} ... ${data.delivery}`;
    // } else {
    //   joke = data.joke;
    // }
    // using ternary
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;
    // text to speech
    tellMe(joke);
    console.log(joke);
    // disable button
    toggleButton();
  } catch (error) {
    // catch errors
    console.log("whoops", error);
  }
}

// add event listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

// on load
