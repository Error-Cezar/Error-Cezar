// Get the current location
const currentLocation = window.location;

// Determine the WebSocket protocol based on the current protocol
const wsProtocol = currentLocation.protocol === 'https:' ? 'wss://' : 'ws://';

// Construct the WebSocket URL
const wsUrl = `${wsProtocol}${currentLocation.host}/fm`; // Adjust the path as needed

// Create a new WebSocket connection
const socket = new WebSocket(wsUrl);

let trackname = document.getElementById("track-name");
let trackartist = document.getElementById("track-artist");
let trackimage = document.getElementById("track-image");
let trackpause = document.getElementById("track-pause");
let trackplay = document.getElementById("track-play");

// Event listener for when the connection is opened
socket.onopen = function(event) {
    console.log('WebSocket connected.');
};

// Event listener for when a message is received from the server
socket.onmessage = function(event) {
    console.log('WebSocket message received:', event.data);
    const data = JSON.parse(event.data);
    if(!data.artist) {
        trackname.onclick = null;
        trackname.innerHTML = "N/A";
        trackartist.innerHTML = "N/A";
        trackimage.setAttribute("src", "https://placecats.com/300/200");
        trackpause.style.display = "none";
        trackplay.style.display = "block";
        return;
    }

    trackname.innerHTML = data.track;
    trackartist.innerHTML = data.artist;
    trackimage.setAttribute("src", data.image || "https://placecats.com/300/200");
    trackpause.style.display = "block";
    trackplay.style.display = "none";

    trackname.onclick = function() {
        // Open the URL in a new tab
        window.open(data.url, '_blank');
  };
};

// Event listener for errors
socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};