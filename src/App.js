import logo from "./logo.svg";
import "./App.css";
import Barebone from "./components/barebone/Barebone";
import MapWithFeatureLayer from "./components/customFeatureLayer/MapWithCustomFeatureLayer";

function App() {
  return (
    <div className="App">
      {/* <Barebone /> */}
      <MapWithFeatureLayer />
    </div>
  );
}

export default App;
