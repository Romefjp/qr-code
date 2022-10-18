
// Get the video element
const video = document.querySelector('#video')

// Check if device has camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Use video without audio
    const constraints = { 
        video: true,
        audio: false
    }

    // Start video stream
    navigator.mediaDevices.getUserMedia(constraints).then(stream => video.srcObject = stream);

    // Create new barcode detector
    const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
    
    // Detect code function 
    const detectCode = () => {
        // Start detecting codes on to the video element
        barcodeDetector.detect(video).then(codes => {
            // If no codes exit function
            if (codes.length === 0) return;
        
            for (const barcode of codes)  {
            // Log the barcode to the console
            console.log(barcode);
            }
        }).catch(err => {
            // Log an error if one happens
            console.error(err);
        })
    }

    // Run detect code function every 100 milliseconds
    setInterval(detectCode, 100);
}