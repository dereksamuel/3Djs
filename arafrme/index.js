window.onload = async () => {
  const $webcam = document.getElementById("webcam");
  const $canvas = document.getElementById("root");
  const $modified = document.getElementById("modified");

  const ctx = $canvas.getContext("2d");
  const ctx2 = $modified.getContext("2d");

  const stream = await navigator.mediaDevices.getUserMedia({ video: true, });
  $webcam.srcObject = stream;

  $webcam.addEventListener("loadedmetadata", ({ target }) => {
    $canvas.width = target.videoWidth;
    $canvas.height = target.videoHeight;

    $modified.width = target.videoWidth;
    $modified.height = target.videoHeight;
  });

  $webcam.addEventListener("play", ({ target }) => {
    (function drawVideo() {
      const pixels = ctx.getImageData(0, 0, $canvas.width, $canvas.height); // no cambia
      const pixelsData = pixels.data;
      let mappedImage = [];

      if (!target.paused && !target.ended) {
        for (let i = 0; i < pixelsData.length; i+= 4) {
          pixelsData[i + 0] = ((pixelsData[i] + pixelsData[i + 1] + pixelsData[i + 2]) / 3) + 100;
          pixelsData[i + 1] = ((pixelsData[i] + pixelsData[i + 1] + pixelsData[i + 2]) / 3) + 10;
          pixelsData[i + 2] = ((pixelsData[i] + pixelsData[i + 1] + pixelsData[i + 2]) / 3) + 10;

          // if (green > 100 && red > 100 && blue < 100) {
          //   // pixelsData[i + 1] = 255
          //   // pixelsData[i + 3] = 1;
          // }
        }

        ctx.drawImage(target, 0, 0, $canvas.width, $canvas.height);

        ctx2.putImageData(pixels, 0, 0);
        requestAnimationFrame(drawVideo);
      }
    })();
  });
};
