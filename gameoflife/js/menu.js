window.onload = function () {
    const allTheThings = document.getElementById('allthethings');
    const exitButton = document.getElementById('exit');
    const playButton = document.getElementById('play'); // Assuming playButton exists in your HTML
    const patternsButton = document.getElementById('patterns'); // Presets button

    // Show the popup when the page loads
    allTheThings.style.visibility = 'visible';
    allTheThings.style.opacity = '1';

    // Function to toggle the menu visibility
    function toggleMenu() {
        if (allTheThings.style.visibility === 'visible') {
            allTheThings.style.opacity = '0';
            setTimeout(() => {
                allTheThings.style.visibility = 'hidden';
            }, 500);
        } else {
            allTheThings.style.visibility = 'visible';
            allTheThings.style.opacity = '1';
        }
    }

    function togglePresetPanel() {
        const panel = document.getElementById('presetPanel');
        panel.classList.toggle('open');
        allTheThings.style.opacity = '0';
        setTimeout(() => {
            allTheThings.style.visibility = 'hidden';
        }, 500);
    }

    // Hide the popup when the exit button is clicked
    exitButton.onclick = toggleMenu;

    // Hide the popup when the play button is clicked
    playButton.onclick = toggleMenu;

    // Show the popup when the patterns button is clicked
    patternsButton.onclick = togglePresetPanel;

    // Show the popup when 'Esc' key is pressed
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") { // Detect 'Esc' key press
            toggleMenu();
        }
    });
};
