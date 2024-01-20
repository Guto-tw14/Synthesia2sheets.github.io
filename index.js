function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const fileButton = document.querySelector('.fileButton');
    const videoPlayerDiv = document.querySelector('.videoPlayerDiv');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlayerBars = document.querySelector('.videoPlayerBars');
    const videoPlayerLeftBar = document.querySelector('.videoPlayerLeftBar');
    const videoPlayerBottomBar = document.querySelector('.videoPlayerBottomBar');

    fileButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];

        if (file) { // if theres a selected file, provides the videoplayer with it
            videoPlayer.src = URL.createObjectURL(file);

            const fileSelectionDiv = document.querySelector('.fileSelectionDiv');
            fileSelectionDiv.style.display = 'none';

            videoPlayerDiv.style.display = 'flex'; // Adjust display property
            requestFullScreen(document.body); // Make the body go full screen.
        }
    }

    videoPlayer.addEventListener('loadedmetadata', function () {
        const videoAspectRatio = videoPlayer.videoWidth / videoPlayer.videoHeight;
        const windowAspectRatio = window.innerWidth / window.innerHeight;

        if (videoAspectRatio > windowAspectRatio) {
            videoPlayer.style.width = '100%';
            videoPlayer.style.height = 'auto';
        } else {
            videoPlayer.style.width = 'auto';
            videoPlayer.style.height = '100%';
        }

        videoPlayerDiv.style.display = 'flex';
    });

    window.addEventListener('resize', function () { //handles window resize
        const videoAspectRatio = videoPlayer.videoWidth / videoPlayer.videoHeight;
        const windowAspectRatio = window.innerWidth / window.innerHeight;

        if (videoAspectRatio > windowAspectRatio) {
            videoPlayer.style.width = '100%';
            videoPlayer.style.height = 'auto';
        } else {
            videoPlayer.style.width = 'auto';
            videoPlayer.style.height = '100%';
        }

        videoPlayerLeftBar.style.width = `${videoPlayer.offsetWidth * 0.05}px`;
        videoPlayerBottomBar.style.height = `${videoPlayer.offsetHeight * 0.1}px`;
    });
});