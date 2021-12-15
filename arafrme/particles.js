window.onload = async () => {
  let mappedImage = [];
  let particlesArray = [];

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
    // (function drawVideo() {
    //   const pixels = ctx.getImageData(0, 0, $canvas.width, $canvas.height); // no cambia
    //   const pixelsData = pixels.data;

    //   if (!target.paused && !target.ended) {
    //     ctx.drawImage(target, 0, 0, $canvas.width, $canvas.height);

    //     ctx2.putImageData(pixels, 0, 0);
    //     requestAnimationFrame(drawVideo);
    //   }
    // })();
    ctx.drawImage(target, 0, 0, $canvas.width, $canvas.height);

    const pixels = ctx.getImageData(0, 0, $canvas.width, $canvas.height); // no cambia
    const pixelsData = pixels.data;

    for (let y = 0; y < $canvas.height; y++) {
      let row = [];

      for (let x = 0; x < $canvas.width; x++) {
        const red = pixelsData[(y * 4 * pixels.width) + (x * 4)];
        const green = pixelsData[(y * 4 * pixels.width) + (x * 4 + 1)];
        const blue = pixelsData[(y * 4 * pixels.width) + (x * 4 + 2)];
        const brightness = calculateBrightness(red, green, blue);
        const cell = [
          cellBrightness = brightness,
        ];

        row.push(cell);
      }

      mappedImage.push(row);
    }

    initParticles($canvas, ctx);
    animateParticles($canvas, ctx);
  });

  class Particle {
    constructor(numberOfParticles) {
      this.numberOfParticles = numberOfParticles;

      this.x = Math.random() * $canvas.width;
      this.y = 0;
      this.speed = 0;
      this.velocity = Math.random() * 1;
      this.size = Math.random() * 1.5 + 1;

      this.position = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
    }

    update() {
      this.position = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.speed = mappedImage[this.position]?.[this.position2][0];

      let movement = (2.5 - this.speed) + this.velocity;

      this.y += movement;

      if (this.y >= $canvas.height) {
        this.restart();
      }
    }

    restart() {
      this.y = 0;
      this.x = Math.random() * $canvas.width;
    }

    draw() {
      ctx.beginPath();

      ctx.fillStyle = "white";
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < 5000; i++) {
      particlesArray.push(new Particle(5000));
    }
  }

  function animateParticles() {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }

    requestAnimationFrame(animateParticles);
  }
};

function calculateBrightness(red, green, blue) {
  return Math.sqrt(
    (red * red) * 0.299 +
    (green * green) * 0.587 +
    (blue * blue) * 0.114
  ) / 100;
}
