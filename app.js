const fingerprintImg = document.getElementById('fingerprint-img');
const scanToAnalyseElement = document.getElementById('scan-to-analyse');
const resetBtn = document.getElementById('reset-btn');
let scanTimer;
let isScanning = false;
let countdownTimer;
let countdown = 5; // 5-second countdown

// Array of blood groups for random selection
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Event listener for when the image is clicked
fingerprintImg.addEventListener('click', startScan);

// Function to start scanning when the image is clicked
function startScan(e) {
  if (!isScanning) {
    isScanning = true;
    countdown = 5; // Reset countdown
    scanToAnalyseElement.innerHTML = `<h2>Scan Done, Remove Your finger </h2>`; // Countdown message
    fingerprintImg.style.pointerEvents = 'none'; // Disable the image to prevent further clicks during scan

    // Start countdown
    countdownTimer = setInterval(() => {
      countdown--;
      scanToAnalyseElement.innerHTML = `<h2> Analyzing Blood Group in: ${countdown} seconds...</h2>`; // Update countdown message

      if (countdown <= 0) {
        clearInterval(countdownTimer); // Clear the countdown when it reaches 0
        scanToAnalyseElement.innerHTML = "<h2>Analysis Completed. Please Wait...</h2>"; // Show that scanning is complete

        // After 5 seconds of the scan, show the result
        setTimeout(() => {
          const randomBloodGroup = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
          scanToAnalyseElement.innerHTML = `<h2>Blood Group Detected: ${randomBloodGroup} 🩸</h2>`; // Show result here
          scanToAnalyseElement.style.color = "#fff";  // Set the text color to white for better visibility
          scanToAnalyseElement.style.backgroundColor = "rgba(226, 255, 6, 1)";  // Add a background color to make it pop

          fingerprintImg.style.pointerEvents = 'auto'; // Re-enable the image after the scan
          isScanning = false;

          // Show the Reset button after the scan is complete
          resetBtn.style.display = 'block';

          // Reset the result automatically after 20 seconds
          setTimeout(() => {
            resetScan();  // Call the reset function
          }, 10000); // 20 seconds delay before resetting the result
        }, 5000); // Wait 5 seconds before displaying the result
      }
    }, 1000); // Update the countdown every second
  }
}

// Function to reset the result and bring back the default text
function resetScan() {
  scanToAnalyseElement.innerHTML = "<h2>Scan To Analyse!</h2>"; // Reset to original text
  scanToAnalyseElement.style.color = '';  // Reset text color
  scanToAnalyseElement.style.backgroundColor = ''; // Reset background color
  resetBtn.style.display = 'none';  // Hide the Reset button again
}
  
// Reset button click listener to manually reset
resetBtn.addEventListener('click', function () {
  resetScan(); // Reset the scan result immediately when the Reset button is clicked
});
