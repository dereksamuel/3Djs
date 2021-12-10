window.onload = () => {
  let method = "static";

  if (method === "static") {
    return renderPlaces(staticLoadPlaces());
  }

  return navigator.geolocation.getCurrentPosition(
    (position) => {
      dynamicLoadPlaces(position.coords)
        .then((places) => {
          renderPlaces(places);
        });
    },
    (error) => {
      console.error("Error on get position", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000,
    }
  );
};


function staticLoadPlaces() {
  return [
    {
      name: "Restrepo Millan",
      location: {
        lat: "4.57916",
        lon: "-74.12120",
      },
    },
    {
      name: "Mormones Place",
      location: {
        lat: "4.57928",
        lon: "-74.12027",
      },
    }
  ];
}


function dynamicLoadPlaces() {}


function renderPlaces(places) {
  let $scene = document.querySelector("a-scene");

  places.map((place) => {
    const { lat, lon } = place.location;

    const $marker = document.createElement("a-image");

    $marker.setAttribute("gps-entity-place", `latitude: ${lat}; longitude: ${lon};`);
    $marker.setAttribute("name", place.name);
    $marker.setAttribute("src", "../assets/images/blue-arrow-up-md.png");
    $marker.setAttribute("scale", "30, 30, 30");

    $marker.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    $scene.appendChild($marker);
  });
}

