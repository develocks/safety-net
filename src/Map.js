import { useListVals } from "react-firebase-hooks/database";
import { GoogleMap, LoadScript, Circle } from "@react-google-maps/api";
import firebase from "./firebase";
import Loading from "./Loading";

const center = {
  lat: -28.5972647,
  lng: 25.014888,
};
const severityColor = ["#00FF00", "#FF0000"];

export default function Map() {
  const [reports, loading, error] = useListVals(
    firebase.database().ref("reports")
  );
  if (loading) return <Loading />;
  if (error) return <span>Error occurred!</span>;
  return (
    <LoadScript googleMapsApiKey="AIzaSyDVh9CxxdFRMtj8c4r0tAKHxHI2gy1Cn_k">
      <GoogleMap
        center={center}
        zoom={6}
        clickableIcons={false}
        mapContainerClassName="map"
      >
        {reports
          .filter(({ active }) => active)
          .map(({ latitude: lat, longitude: lng, radius, severity }, i) => (
            <Circle
              key={i}
              options={{
                strokeColor: severityColor[severity],
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: severityColor[severity],
                fillOpacity: 0.5,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius,
                zIndex: severity + 1,
              }}
              center={{ lat, lng }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}
