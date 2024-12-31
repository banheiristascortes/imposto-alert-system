import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

const stateCoordinates = {
  SP: [-48.5, -22.5],
  RJ: [-43.2, -22.9],
  MG: [-44.0, -19.9],
  RS: [-51.2, -30.0],
  PR: [-51.5, -25.4],
};

export const BrazilMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-55.0, -15.0], // Center of Brazil
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add markers for each state
    stateData.forEach((data) => {
      const coordinates = stateCoordinates[data.state as keyof typeof stateCoordinates];
      if (!coordinates || !map.current) return;

      // Create marker element
      const el = document.createElement("div");
      el.className = "state-marker";
      el.style.backgroundColor = `rgba(30, 58, 138, ${0.2 + (data.changes / 12) * 0.8})`; // Using primary color with opacity based on changes
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${data.state}</h3>
          <p>${data.changes} alterações fiscais</p>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="w-full h-[400px] relative">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};