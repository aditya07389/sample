import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationData } from '../../types';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  locations: LocationData[];
  selectedLocation: LocationData | null;
  onLocationSelect: (location: LocationData) => void;
}

const Map: React.FC<MapProps> = ({ locations, selectedLocation, onLocationSelect }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#22c55e'; // green-500
    if (score >= 60) return '#eab308'; // yellow-500
    if (score >= 40) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  const getMarkerRadius = (score: number): number => {
    if (score >= 80) return 12;
    if (score >= 60) return 10;
    if (score >= 40) return 8;
    return 6;
  };

  const getLandType = (score: number): string => {
    if (score >= 80) return 'Excellent - Flat, barren land with high solar potential';
    if (score >= 60) return 'Good - Suitable terrain with moderate vegetation';
    if (score >= 40) return 'Moderate - Some terrain challenges but usable';
    return 'Challenging - Requires significant preparation';
  };

  const getEnergyPotential = (score: number): string => {
    if (score >= 80) return '5-6 kWh/m²/day';
    if (score >= 60) return '4-5 kWh/m²/day';
    if (score >= 40) return '3-4 kWh/m²/day';
    return '2-3 kWh/m²/day';
  };

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        className="dark:invert dark:hue-rotate-180"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates[1], location.coordinates[0]]}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <h3 className="font-semibold mb-2">
                  {location.city}
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Land Type:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getLandType(location.suitabilityScore)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Energy Potential:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getEnergyPotential(location.suitabilityScore)}
                    </p>
                  </div>
                  {location.details && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Lat: {location.details.latitude}, Lon: {location.details.longitude}
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;