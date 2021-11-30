import { useState, useEffect, useRef } from "react";
import { loadModules, setDefaultOptions } from "esri-loader";
setDefaultOptions({
  version: "4.21",
  css: true,
});

export default function Barebone(props) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapView, setMapView] = useState(null);

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/MapView", "esri/Graphic"])
      .then(async ([Map, MapView, Graphic]) => {
        const map = new Map({
          basemap: "topo",
        });

        const mapView = new MapView({
          map: map,
          // center: [-118.805, 34.027], // Longitude, latitude
          // zoom: 13, // Zoom level
          container: mapRef.current, // Div element
        });

        const polyline = {
          type: "polyline",
          paths: [
            [-118.821527826096, 34.0139576938577], //Longitude, latitude
            [-118.814893761649, 34.0080602407843], //Longitude, latitude
            [-118.808878330345, 34.0016642996246], //Longitude, latitude
          ],
        };

        const lineSymbol = {
          // color: [226, 119, 40],
          type: "simple-line",
          color: [0, 255, 239],
          // color: [226, 119, 40],
          width: 4,
        };

        const polylineGraphic = new Graphic({
          geometry: polyline,
          symbol: lineSymbol,
          attributes: {},
          popupTemplate: {
            title: "some info could be display here",
            content: `the path is drawn on <b>{date}</b>`,
          },
        });

        const pg = new Graphic({
          geometry: {
            type: "point",
            longitude: -118.805,
            latitude: 34.027,
          },
          symbol: {
            type: "text",
            color: "$7A003C",
            text: "\ue61d",
            font: {
              size: 36,
              family: "CalciteWebCoreIcons",
            },
          },
        });

        mapView.graphics.add(pg);
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

  return (
    <div>
      <div ref={mapRef} style={{ height: "100vh" }}></div>
    </div>
  );
}
