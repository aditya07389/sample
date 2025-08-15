import React from 'react';
import { MapPin, Sun, Zap, LandPlot } from 'lucide-react';
import { LocationData } from '../../types';

interface LocationCardProps {
  location: LocationData;
  isSelected: boolean;
  onClick: () => void;
  ranking?: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, isSelected, onClick, ranking }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
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
    <div
      id={`location-${location.id}`}
      onClick={onClick}
      className={`p-6 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {location.city}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {location.state}
          </p>
        </div>
        {ranking && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold">
            {ranking}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <LandPlot className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Land Type:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getLandType(location.suitabilityScore)}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Zap className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-2 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Energy Potential:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getEnergyPotential(location.suitabilityScore)}
            </p>
          </div>
        </div>

        {location.details && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span>Lat: {location.details.latitude}, Lon: {location.details.longitude}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;