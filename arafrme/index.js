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

      if (!target.paused && !target.ended) {
        ctx.drawImage(target, 0, 0, $canvas.width, $canvas.height);

        ctx2.putImageData(pixels, 0, 0);
        requestAnimationFrame(drawVideo);
      }
    })();
    ctx.drawImage(target, 0, 0, $canvas.width, $canvas.height);
  });
};

function calculateBrightness(red, green, blue) {
  return Math.sqrt(
    (red * red) * 0.299 +
    (green * green) * 0.587 +
    (blue * blue) * 0.114
  ) / 100;
}
