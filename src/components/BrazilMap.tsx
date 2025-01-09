import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "@/services/api";

// Coordenadas fixas para cada estado
const stateCoordinates: Record<string, [number, number]> = {
  SP: [-23.5505, -46.6333],
  RJ: [-22.9068, -43.1729],
  MG: [-19.9167, -43.9345],
  RS: [-30.0346, -51.2177],
  PR: [-25.4284, -49.2733],
  BA: [-12.9714, -38.5014],
  SC: [-27.5954, -48.5480],
  GO: [-16.6799, -49.2550],
  PE: [-8.0476, -34.8770],
  CE: [-3.7172, -38.5433],
  PA: [-1.4558, -48.4902],
  MT: [-15.6014, -56.0979],
  ES: [-20.2976, -40.2958],
  PB: [-7.1195, -34.8450],
  RN: [-5.7945, -35.2120],
  MS: [-20.4428, -54.6464],
  PI: [-5.0892, -42.8016],
  MA: [-2.5297, -44.3028],
  RO: [-8.7619, -63.9039],
  SE: [-10.9095, -37.0748],
  TO: [-10.2128, -48.3603],
  AL: [-9.6498, -35.7089],
  AC: [-9.9754, -67.8249],
  AP: [0.0349, -51.0694],
  RR: [2.8235, -60.6758],
  DF: [-15.7975, -47.8919]
};

export const BrazilMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      const response = await api.getStateData();
      // Acessando a propriedade 'data' do objeto retornado
      const stateData = response.data || [];

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
    };

    initializeMap();

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