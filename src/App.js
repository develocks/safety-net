import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./firebase";
import Map from "./Map";

function App() {
  return (
    <div className="safety-net">
      <Map />
    </div>
  );
}

export default App;
