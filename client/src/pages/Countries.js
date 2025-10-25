import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { countriesAPI } from '../utils/api';
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  ArrowRight,
  Users,
  DollarSign
} from 'lucide-react';

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');

  const { data: continentsData } = useQuery('continents', countriesAPI.getContinents);
  
  const { data: countriesData, isLoading } = useQuery(
    ['countries', selectedContinent, sortBy, sortOrder, searchTerm],
    () => {
      if (searchTerm) {
        return countriesAPI.search(searchTerm);
      }
      if (selectedContinent !== 'all') {
        return countriesAPI.getByContinent(selectedContinent, { sortBy, sortOrder });
      }
      return countriesAPI.getAll({ continent: selectedContinent, sortBy, sortOrder });
    }
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
        sortBy === field
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <span>{children}</span>
      {sortBy === field && (
        sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
      )}
    </button>
  );

  const CountryCard = ({ country }) => (
    <Link
      to={`/countries/${country._id}`}
      className="card hover:shadow-lg transition-all hover:scale-105 group"
    >
      <div className="flex items-start space-x-4">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-16 h-12 object-cover rounded border shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {country.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{country.continent}</p>
          {country.capital && (
            <p className="text-xs text-gray-500 mb-2">Capital: {country.capital}</p>
          )}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {country.population?.total && (
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>
                  {country.population.total >= 1000000 
                    ? `${Math.round(country.population.total / 1000000)}M`
                    : `${Math.round(country.population.total / 1000)}K`
                  }
                </span>
              </div>
            )}
            {country.gdp?.total && (
              <div className="flex items-center space-x-1">
                <DollarSign className="h-3 w-3" />
                <span>
                  {country.gdp.total >= 1000000000 
                    ? `${Math.round(country.gdp.total / 1000000000)}B`
                    : `${Math.round(country.gdp.total / 1000000)}M`
                  }
                </span>
              </div>
            )}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
      </div>
    </Link>
  );

  const CountryListItem = ({ country }) => (
    <Link
      to={`/countries/${country._id}`}
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
    >
      <div className="flex items-center space-x-4">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-12 h-8 object-cover rounded border"
        />
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {country.name}
          </h3>
          <p className="text-sm text-gray-600">{country.continent}</p>
        </div>
      </div>
      <div className="flex items-center space-x-6 text-sm text-gray-500">
        {country.capital && <span>{country.capital}</span>}
        {country.population?.total && (
          <span>
            {country.population.total >= 1000000 
              ? `${Math.round(country.population.total / 1000000)}M people`
              : `${Math.round(country.population.total / 1000)}K people`
            }
          </span>
        )}
        {country.gdp?.total && (
          <span>
            {country.gdp.total >= 1000000000 
              ? `$${Math.round(country.gdp.total / 1000000000)}B`
              : `$${Math.round(country.gdp.total / 1000000)}M`
            }
          </span>
        )}
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </Link>
  );


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Countries
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover detailed information about every country in the world. 
          Sort by continent, population, GDP, or search for specific countries.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Continent Filter */}
          <div className="lg:w-48">
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="input-field"
            >
              <option value="all">All Continents</option>
              {continentsData?.data.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <SortButton field="name">Name</SortButton>
            <SortButton field="continent">Continent</SortButton>
            <SortButton field="population">Population</SortButton>
            <SortButton field="gdp">GDP</SortButton>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {countriesData?.data.total || 0} Countries Found
          </h2>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear Search
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : countriesData?.data.countries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No countries found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-3'
          }>
            {countriesData?.data.countries.map((country) => (
              viewMode === 'grid' ? (
                <CountryCard key={country._id} country={country} />
              ) : (
                <CountryListItem key={country._id} country={country} />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
