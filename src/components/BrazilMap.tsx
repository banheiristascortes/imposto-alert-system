import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const stateCoordinates = [
  { state: "SP", position: [-23.5505, -46.6333], changes: 12 },
  { state: "RJ", position: [-22.9068, -43.1729], changes: 8 },
  { state: "MG", position: [-19.9167, -43.9345], changes: 6 },
  { state: "RS", position: [-30.0346, -51.2177], changes: 5 },
  { state: "PR", position: [-25.4284, -49.2733], changes: 4 },
];

export const BrazilMap = () => {
  useEffect(() => {
    // Ensure Leaflet updates when component mounts
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <div className="h-[400px] w-full">
      <MapContainer
        center={[-15.7801, -47.9292]} // Brasília coordinates
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stateCoordinates.map(({ state, position, changes }) => (
          <Marker key={state} position={position}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{state}</h3>
                <p>{changes} alterações fiscais</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};