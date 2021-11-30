import { useState, useEffect, useRef } from "react";
import { loadModules, setDefaultOptions } from "esri-loader";
setDefaultOptions({
  version: "4.21",
  css: true,
});

export default function MapWithFeatureLayer(props) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const featureLayer = useRef(null);
  const GraphicClass = useRef(null);
  const FeatureLayerClass = useRef(null);

  const x = -79.558593;
  const y = 43.796749;
  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/FeatureLayer",
    ])
      .then(async ([Map, MapView, Graphic, FeatureLayer]) => {
        GraphicClass.current = Graphic;
        FeatureLayerClass.current = FeatureLayer;

        const map = new Map({
          basemap: "topo",
        });

        const mapView = new MapView({
          map: map,
          center: [x, y],
          zoom: 20,
          container: mapRef.current,
        });

        setMap(map);
      })
      .catch((error) => {
        alert("Error in loading arcgis modules");
        console.log("Error in loading arcgis modules", error);
      });
  }, [mapRef]);

  const showLayer = () => {
    const { current: Graphic } = GraphicClass;
    const { current: FeatureLayer } = FeatureLayerClass;

    // https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
    const pg = new Graphic({
      geometry: {
        type: "point",
        longitude: x, // -79.47708380074425, 43.81768252386507
        latitude: y,
      },
    });
    const pg0 = new Graphic({
      geometry: {
        type: "point",
        longitude: x + 0.001, // -79.47708380074425, 43.81768252386507
        latitude: y,
      },
    });

    map.remove(featureLayer.current);

    // https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
    featureLayer.current = new FeatureLayer({
      source: [pg, pg0],
      objectIdField: "ObjectID",
      popupTemplate: {
        title: "HHH",
      },
    });
    map.add(featureLayer.current);
  };

  return (
    <div>
      <button onClick={showLayer}>remove</button>
      <div ref={mapRef} style={{ height: "100vh" }}></div>
    </div>
  );
}
