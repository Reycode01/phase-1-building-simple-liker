const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for the hearts
  document.addEventListener("click", function(event) {
    const heart = event.target.closest(".like-glyph");
    if (!heart) return; // Exit if the click wasn't on a heart
    if (heart.classList.contains("activated-heart")) {
      // Handle click event for full heart
      mimicServerCall()
        .then(() => {
          console.log("Server call successful: Unliked"); // Log successful server call
          heart.innerText = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        })
        .catch(error => {
          // Simulate failed server response
          displayErrorModal(error);
        });
    } else {
      // Handle click event for empty heart
      mimicServerCall()
        .then(() => {
          console.log("Server call successful: Liked"); // Log successful server call
          heart.innerText = FULL_HEART;
          heart.classList.add("activated-heart");
        })
        .catch(error => {
          // Simulate failed server response
          displayErrorModal(error);
        });
    }
  });
});

function displayErrorModal(error) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = error;
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 3000);
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}


