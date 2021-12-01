import { useState, useEffect, useRef } from "react";
import { loadModules, setDefaultOptions } from "esri-loader";
setDefaultOptions({
  version: "4.21",
  css: true,
});

export default function Barebone(props) {
  const mapRef = useRef(null);
  const downloadBtnRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapView, setMapView] = useState(null);

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Search",
      "esri/widgets/Expand",
      "esri/widgets/BasemapGallery",
    ])
      .then(async ([Map, MapView, Search, Expand, BasemapGallery]) => {
        const map = new Map({
          basemap: "topo",
        });

        const mapView = new MapView({
          map: map,
          // center: [-118.805, 34.027], // Longitude, latitude
          // zoom: 13, // Zoom level
          container: mapRef.current, // Div element
          ui: {
            components: ["attribution"], // remove all default UI, ie: zoom in / zoom out btns, except "attribution", [] means remove everything
          },
        });

        const basemapGallery = new BasemapGallery({
          view: mapView,
          container: document.createElement("div"),
        });

        // Create an Expand instance and set the content
        // property to the DOM node of the basemap gallery widget
        // Use an Esri icon font to represent the content inside
        // of the Expand widget

        const bgExpand = new Expand({
          view: mapView,
          content: basemapGallery,
        });

        const searchComponent = new Search({ view: mapView });

        mapView.ui.add([searchComponent, bgExpand], "top-right");
        mapView.ui.add(downloadBtnRef.current, "top-left");
        // mapView.ui.add(bgExpand, "top-right");

        setMap(map);
        setMapView(mapView);

        // console.log("MPVv", mapView);
      })
      .catch((error) => {
        alert("Error in loading arcgis modules");
        console.log("Error in loading arcgis modules", error);
      });
  }, [mapRef]);

  useEffect(() => {
    if (mapView) {
      mapView.center = [-118.805, 34.027];
      mapView.zoom = 13;
    }
  }, [mapView]);

  const downloadFunction = () => {
    alert("TBD");
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: "100vh" }}>
        <div
          // disabled={true} // note: don't bother to disabled this component, ie: replace div as button, cause it is simply not working, on version 4.21, button is disabled but clicking still trigger the function
          ref={downloadBtnRef}
          className="esri-widget--button"
          title="download something"
          onClick={downloadFunction}
        >
          {/* esri icon font list
          https://developers.arcgis.com/javascript/latest/esri-icon-font/ */}
          <span className="esri-icon-download"></span>
        </div>
      </div>
    </div>
  );
}
