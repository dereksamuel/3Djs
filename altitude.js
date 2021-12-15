// import * as THREE from "https://cdn.skypack.dev/three@latest";

window.onload = () => {
  // const scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // const renderer = new THREE.WebGLRenderer({ alpha: true });
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.setClearAlpha(0.0);

  // document.body.appendChild( renderer.domElement );

  // const constraints = {
  //   video: true,
  // };
  
  // const video = document.querySelector("video");
  
  // navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  //   video.srcObject = stream;
  // });

  function getDistance(pointA, pointB) {
    const { latA, lonA } = pointA;
    const { latB, lonB } = pointB;
    let orderLat = latB - latA;
    let orderLon = lonB - lonA;
  
    return Math.hypot(orderLat, orderLon) * 100000;
  }
  
  function getAngule(orderLat, distance) {
    return toDegrees(Math.asin(orderLat / distance));
  }
  
  function toDegrees (angle) {
    return angle * (180 / Math.PI);
  }
  
  setInterval(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const $aScene = document.querySelector("a-scene");
      const { latitude, longitude, altitude, altitudeAccuracy } = position.coords;
  
      const objective = {
        latB: 4.57976,
        lonB: -74.12093,
      };
  
      const orderLat = objective.latB - latitude;
      const orderLon = objective.lonB - longitude;
  
      const distance = getDistance({
        latA: latitude,
        lonA: longitude,
      }, objective);
  
      //console.log(latitude - objective.latB);
      //console.log(longitude - objective.lonB);
      console.log("x:", orderLon, "y:", orderLat, "z:", distance);
  
      // $aScene.innerHTML = `
      //   <a-box position="${orderLon} ${orderLat} ${distance}"></a-box>
      // `;
    }, (error) => {
      console.error(error);
    });
  }, 400);
};