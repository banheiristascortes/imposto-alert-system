import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface BrazilMapProps {
  stateData: Array<{
    estado: string;
    alteracoes: number;
    coordinates: [number, number];
  }>;
}

// Define state coordinates as regular arrays instead of readonly tuples
const stateCoordinates: Record<string, [number, number]> = {
  'SP': [-22.9099, -48.5483],
  'RJ': [-22.9068, -43.1729],
  'MG': [-19.9167, -44.0383],
  'RS': [-30.0346, -51.2177],
  'PR': [-25.4284, -51.4166],
};

export const BrazilMap = ({ stateData }: BrazilMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return <div className="w-full h-[400px] bg-gray-100 rounded-lg" />;
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={[-15.0000, -55.0000]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stateData.map((state, index) => {
          const coordinates = stateCoordinates[state.estado];
          if (coordinates) {
            return (
              <Marker 
                key={index} 
                position={coordinates}
              >
                <Popup>
                  <strong>{state.estado}</strong><br/>
                  Alterações: {state.alteracoes}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};