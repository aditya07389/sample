import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, MapPin, Sun } from 'lucide-react';
import Map from '../components/locations/Map';
import LocationCard from '../components/locations/LocationCard';
import SearchFilter from '../components/locations/SearchFilter';
import mockLocations from '../data/mockLocations';
import { LocationData } from '../types';
import AnimatedSection from '../components/common/AnimatedSection';
import axios from 'axios';

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>(mockLocations);
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>(mockLocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [showTopFive, setShowTopFive] = useState(false);
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState('');

  // Get top 5 locations sorted by suitability score
  const topFiveLocations = [...locations]
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 5);

  useEffect(() => {
    // Only filter if we're not in search mode (showTopFive is false)
    if (!showTopFive) {
      let filtered = locations.filter(location => {
        const matchesSearch = 
          location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.city.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesScore = location.suitabilityScore >= minScore;
        
        return matchesSearch && matchesScore;
      });
      
      setFilteredLocations(filtered);
    }
  }, [locations, searchQuery, minScore, showTopFive]);

  const handleSearch = (query: string) => {
    console.log('Search query updated:', query);
    setSearchQuery(query);
    setShowTopFive(false);
  };

  const handleFilterChange = (score: number) => {
    setMinScore(score);
    setShowTopFive(false);
  };

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setShowTopFive(true); // Show top 5 when a location is selected
    
    // Scroll to the selected location's card if on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const element = document.getElementById(`location-${location.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const getRanking = (location: LocationData): number => {
    if (!showTopFive) return 0;
    // Get the index of the location in the filtered locations array
    return filteredLocations.findIndex(loc => loc.id === location.id) + 1;
  };

  const getSuitabilityText = (score: number): string => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "very good";
    if (score >= 40) return "good";
    return "suitable";
  };

  const getSuitabilityColor = (score: number): string => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const handleMLPredict = async (query: string) => {
    console.log('Prediction requested for:', query);
    if (!query.trim()) {
      setMlError('Please enter a location name');
      return;
    }

    setMlLoading(true);
    setMlError('');
    setSelectedLocation(null);
    setShowTopFive(true);
    
    try {
      console.log('Sending prediction request for:', query);
      const response = await axios.post('http://localhost:5000/predict', { 
        location: query 
      });
      
      console.log('Received response:', response.data);
      
      if (!response.data.results || !Array.isArray(response.data.results)) {
        throw new Error('Invalid response format from server');
      }

      const results = response.data.results;
      // Map backend results to LocationData format with improved formatting
      const mlLocations: LocationData[] = results.map((item: any, idx: number) => ({
        id: `ml-${idx}`,
        city: `${query}`,
        state: `Score: ${Math.round(item.predicted_score)}%`,
        suitabilityScore: Math.round(item.predicted_score),
        solarRadiation: 0,
        landAvailability: 0,
        windSpeed: 0,
        coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
        details: {
          latitude: item.lat.toFixed(4),
          longitude: item.lon.toFixed(4),
          predictedScore: Math.round(item.predicted_score)
        }
      }));

      setFilteredLocations(mlLocations);
      console.log('Processed locations:', mlLocations);
    } catch (err: any) {
      console.error('Prediction error:', err);
      setFilteredLocations([]);
      setMlError(err.response?.data?.error || 'Failed to get prediction. Please try again.');
    } finally {
      setMlLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="container mx-auto px-4 py-12">
        <AnimatedSection className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Optimal <span className="text-blue-600 dark:text-blue-400">Solar Locations</span> in India
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search for a city or region to find the top 5 most suitable locations for solar energy projects.
          </p>
        </AnimatedSection>

        <SearchFilter 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
          onMLPredict={handleMLPredict}
          mlLoading={mlLoading}
        />
        {mlError && <div className="text-red-600 text-center mb-4">{mlError}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <AnimatedSection>
              <Map 
                locations={filteredLocations} 
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </AnimatedSection>
            
            {/* Selected Location Info */}
            {selectedLocation && (
              <AnimatedSection className="mt-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center mb-4">
                    <Target className="text-blue-600 dark:text-blue-400 mr-2" size={24} />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Selected: {selectedLocation.city}, {selectedLocation.state}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-semibold">Ranking:</span> #{getRanking(selectedLocation)} out of {locations.length} locations
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-semibold">Suitability Score:</span> {selectedLocation.suitabilityScore}/100
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        This location is <span className={`font-semibold ${getSuitabilityColor(selectedLocation.suitabilityScore)}`}>
                          {getSuitabilityText(selectedLocation.suitabilityScore)}
                        </span> for solar energy projects.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Solar: {selectedLocation.solarRadiation}%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Land: {selectedLocation.landAvailability}%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Wind: {selectedLocation.windSpeed}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {showTopFive ? (
                    <div className="flex items-center">
                      <Trophy className="text-yellow-500 mr-2" size={24} />
                      Top 5 Solar Locations
                    </div>
                  ) : (
                    `${filteredLocations.length} Locations Found`
                  )}
                </h2>
                {showTopFive && (
                  <button
                    onClick={() => {
                      setShowTopFive(false);
                      setSelectedLocation(null);
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Show All
                  </button>
                )}
              </div>
              
              {showTopFive && (
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <Trophy size={16} className="inline mr-1" />
                    Showing top 5 locations ranked by solar efficiency
                  </p>
                </div>
              )}
            </AnimatedSection>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <AnimatedSection key={location.id} delay={index * 0.05} className="h-auto">
                    <div 
                      id={`location-${location.id}`}
                      className="cursor-pointer transition-all"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <LocationCard 
                        location={location} 
                        ranking={showTopFive ? index + 1 : undefined}
                        isSelected={selectedLocation?.id === location.id}
                        onClick={() => handleLocationSelect(location)}
                      />
                    </div>
                  </AnimatedSection>
                ))
              ) : (
                <AnimatedSection>
                  <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">No locations found matching your criteria.</p>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationsPage;