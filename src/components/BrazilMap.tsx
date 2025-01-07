import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "@/services/api";

export const BrazilMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      const stateData = await api.getStateData();

      // Initialize map
      map.current = L.map(mapContainer.current).setView([-15.0, -55.0], 4);

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.current);

      // Add markers for each state
      stateData.forEach((data) => {
        const coordinates = data.coordinates; // Access coordinates directly from state data
        if (!coordinates || !map.current) return;

        // Create marker with circle
        const circle = L.circleMarker([coordinates[0], coordinates[1]], {
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