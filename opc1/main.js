let qrCode = window.qrcode;
let scanIcon = document.querySelector("#scan");

const video = document.createElement("video");
const canvasElement = document.getElementById("canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("result");
const outputData = document.getElementById("output");

let scanning = false;

qrCode.callback = (res) => {
    if (res) {
      //in here you can pass your data  "res" to an endpoint or something
      outputData.innerText = res;
      scanning = false;
  
      video.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
  
      qrResult.hidden = false;
  
      canvasElement.hidden = true;
    }
  };

  scanIcon.onclick = () => {

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
          scanning = true;
          qrResult.hidden = true;
  
          canvasElement.hidden = false;
          video.setAttribute("playsinline", true); 
          video.srcObject = stream;
          video.play();
          tick();
          scan();
        });
    } else {
      output.innerHTML = `Sorry, Your Browser Cannot support this feature`;
    }
  };

  function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
  }

  function scan() {
    try {
      qrCode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
  }
  
  