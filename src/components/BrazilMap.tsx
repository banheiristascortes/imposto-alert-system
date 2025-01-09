import { useEffect, useRef } from "react";
import L from "leaflet";
import { api } from "@/services/api";

export const BrazilMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map.current) return;

      try {
        const response = await api.getStateData();
        const stateData = response.data || [];

        // Initialize map
        map.current = L.map(mapContainer.current, {
          center: [-15.0, -55.0],
          zoom: 4,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© OpenStreetMap',
        }).addTo(map.current);

        markersLayer.current = L.layerGroup().addTo(map.current);

        stateData.forEach((state) => {
          const marker = L.marker([state.latitude, state.longitude])
            .bindPopup(`<strong>${state.name}</strong><br>Alterações: ${state.changes}`)
            .addTo(markersLayer.current);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-[400px] rounded-lg overflow-hidden" />
  );
};
