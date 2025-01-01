import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface StateData {
  state: string;
  changes: number;
}

const stateData: StateData[] = [
  { state: "SP", changes: 12 },
  { state: "RJ", changes: 8 },
  { state: "MG", changes: 6 },
  { state: "RS", changes: 5 },
  { state: "PR", changes: 4 },
];

const stateCoordinates: Record<string, [number, number]> = {
  SP: [-22.5, -48.5],
  RJ: [-22.9, -43.2],
  MG: [-19.9, -44.0],
  RS: [-30.0, -51.2],
  PR: [-25.4, -51.5],
};

export const BrazilMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([-15.0, -55.0], 4);

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    // Add markers for each state
    stateData.forEach((data) => {
      const coordinates = stateCoordinates[data.state];
      if (!coordinates || !map.current) return;

      // Create marker with circle
      const circle = L.circleMarker(coordinates, {
        radius: 10,
        fillColor: `rgba(30, 58, 138, ${0.2 + (data.changes / 12) * 0.8})`,
        color: "#1E3A8A",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map.current);

      // Add popup
      circle.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">${data.state}</h3>
          <p>${data.changes} alterações fiscais</p>
        </div>
      `);
    });

    // Cleanup
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};