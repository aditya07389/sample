import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (score: number) => void;
  onMLPredict: (query: string) => Promise<void>;
  mlLoading: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilterChange, onMLPredict, mlLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await onMLPredict(searchQuery);
    }
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinScore(value);
    onFilterChange(value);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Enter city or region name for ML prediction..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={mlLoading}
          className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {mlLoading ? 'Predicting...' : 'Predict'}
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </button>
      </form>

      {showFilters && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Minimum Score:
              <input
                type="range"
                min="0"
                max="100"
                value={minScore}
                onChange={handleScoreChange}
                className="w-full mt-1"
              />
              <span className="ml-2">{minScore}</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;