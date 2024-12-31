import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrigir o problema dos ícones do Leaflet
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

const stateCoordinates = {
  'SP': [-48.5483, -22.9099],
  'RJ': [-43.1729, -22.9068],
  'MG': [-44.0383, -19.9167],
  'RS': [-51.2177, -30.0346],
  'PR': [-51.4166, -25.4284],
} as const;

export const BrazilMap = ({ stateData }: BrazilMapProps) => {
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
          const coordinates = stateCoordinates[state.estado as keyof typeof stateCoordinates];
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