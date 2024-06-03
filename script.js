let startTime, endTime;
let imageSize = "";
const image = new Image();
const bitOutput = document.getElementById("bits");
const kbOutput = document.getElementById("kbs");
const mbOutput = document.getElementById("mbs");

// gets random image from unsplash.com
const imageLink = "https://source.unsplash.com/random?topics=nature";

// when image loads
image.onload = async function () {
  endTime = new Date().getTime();
  // get image size
  await fetch(imageLink).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
};

/**
 * Function to calculate speed.
 */
function calculateSpeed() {
  // time in seconds
  const timeDuration = (endTime - startTime) / 1000;
  // total bots
  const loadedBits = imageSize * 8;
  const speedInBps = (loadedBits / timeDuration).toFixed(2);
  const speedInKbps = (speedInBps / 1024).toFixed(2);
  const speedInMbps = (speedInKbps / 1024).toFixed(2);

  bitOutput.innerHTML += `${speedInBps}`;
  kbOutput.innerHTML += `${speedInKbps}`;
  mbOutput.innerHTML += `${speedInMbps}`;
}

// initial
const init = async () => {
  startTime = new Date().getTime();
  image.src = imageLink;
};
window.onload = () => init();
