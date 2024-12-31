import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BrazilMapProps {
  stateData: Array<{
    estado: string;
    alteracoes: number;
    coordinates: [number, number];
  }>;
}

const stateCoordinates = {
  'SP': [-48.5483, -22.9099],
  'RJ': [-43.1729, -22.9068],
  'MG': [-44.0383, -19.9167],
  'RS': [-51.2177, -30.0346],
  'PR': [-51.4166, -25.4284],
};

export const BrazilMap = ({ stateData }: BrazilMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Substitua com sua chave pública do Mapbox
    mapboxgl.accessToken = 'pk.seu_token_aqui';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-55.0000, -15.0000], // Centro do Brasil
      zoom: 3
    });

    map.current.on('load', () => {
      if (!map.current) return;

      stateData.forEach((state) => {
        const coordinates = stateCoordinates[state.estado as keyof typeof stateCoordinates];
        if (coordinates) {
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <strong>${state.estado}</strong><br/>
              Alterações: ${state.alteracoes}
            `);

          new mapboxgl.Marker({
            color: "#1E3A8A"
          })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [stateData]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};