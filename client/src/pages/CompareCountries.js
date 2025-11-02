import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { countriesAPI } from '../utils/api';
import { Search, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const CompareCountries = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { data: comparisonData, isLoading } = useQuery(
    ['compare', selectedCountries],
    () => countriesAPI.compare(selectedCountries.map(c => c._id)),
    { enabled: selectedCountries.length >= 2 }
  );

  // Auto-search on typing with debounce
  useEffect(() => {
    const search = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await countriesAPI.search(searchTerm, 10);
        setSearchResults(response.data.countries || []);
      } catch (error) {
        // Silently handle search errors
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        search();
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const addCountry = (country) => {
    if (selectedCountries.length >= 4) {
      return;
    }
    if (selectedCountries.find(c => c._id === country._id)) {
      return;
    }
    setSelectedCountries([...selectedCountries, country]);
    setSearchTerm('');
    setSearchResults([]);
  };

  const removeCountry = (id) => {
    setSelectedCountries(selectedCountries.filter(c => c._id !== id));
  };

  const prepareChartData = () => {
    if (!comparisonData?.data) return [];

    const countries = comparisonData.data;
    
    return [
      {
        name: 'Population (Millions)',
        ...countries.reduce((acc, c, i) => {
          acc[`country${i + 1}`] = c.population?.total ? (c.population.total / 1000000).toFixed(1) : 0;
          return acc;
        }, {})
      },
      {
        name: 'GDP (Billions)',
        ...countries.reduce((acc, c, i) => {
          acc[`country${i + 1}`] = c.gdp?.total ? (c.gdp.total / 1000000000).toFixed(1) : 0;
          return acc;
        }, {})
      },
      {
        name: 'Area (1000 km²)',
        ...countries.reduce((acc, c, i) => {
          acc[`country${i + 1}`] = c.geographicLocation?.area ? (c.geographicLocation.area / 1000).toFixed(1) : 0;
          return acc;
        }, {})
      }
    ];
  };

  const prepareRadarData = () => {
    if (!comparisonData?.data) return [];

    const countries = comparisonData.data;
    
    // Calculate max values for normalization (avoid division by zero)
    const populations = countries.map(c => c.population?.total || 0);
    const gdps = countries.map(c => c.gdp?.total || 0);
    const areas = countries.map(c => c.geographicLocation?.area || 0);
    
    const maxPop = Math.max(...populations, 1);
    const maxGdp = Math.max(...gdps, 1);
    const maxArea = Math.max(...areas, 1);

    // Create data array with all metrics
    const radarData = [
      {
        name: 'Population',
        ...countries.reduce((acc, country, index) => {
          acc[`country${index + 1}`] = ((country.population?.total || 0) / maxPop) * 100;
          return acc;
        }, {})
      },
      {
        name: 'GDP',
        ...countries.reduce((acc, country, index) => {
          acc[`country${index + 1}`] = ((country.gdp?.total || 0) / maxGdp) * 100;
          return acc;
        }, {})
      },
      {
        name: 'Area',
        ...countries.reduce((acc, country, index) => {
          acc[`country${index + 1}`] = ((country.geographicLocation?.area || 0) / maxArea) * 100;
          return acc;
        }, {})
      }
    ];

    return radarData;
  };

  const chartData = prepareChartData();
  const radarData = prepareRadarData();
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Countries</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select 2-4 countries to compare their statistics, demographics, and more.
        </p>
      </div>

      {/* Country Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Selected Countries</h2>
        <div className="space-y-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-2 max-h-60 overflow-y-auto">
              {searchResults.map(country => (
                <button
                  key={country._id}
                  onClick={() => addCountry(country)}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img src={country.flag} alt={country.name} className="w-8 h-6 object-cover rounded" />
                  <span className="flex-1 text-left">{country.name}</span>
                </button>
              ))}
            </div>
          )}

          {selectedCountries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country, index) => (
                <div
                  key={country._id}
                  className="flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-lg px-3 py-2"
                >
                  <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded" />
                  <span className="font-medium">{country.name}</span>
                  <button
                    onClick={() => removeCountry(country._id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedCountries.length < 2 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Select at least 2 countries to compare
            </p>
          )}
        </div>
      </div>

      {/* Comparison Results */}
      {isLoading && selectedCountries.length >= 2 && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )}

      {comparisonData?.data && selectedCountries.length >= 2 && (
        <div className="space-y-6">
          {/* Detailed Comparison Table */}
          <div className="card overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Detailed Comparison</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Property</th>
                  {comparisonData.data.map((country, index) => (
                    <th key={country._id} className="text-left p-3">
                      <div className="flex items-center space-x-2">
                        <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded" />
                        <span>{country.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Continent</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">{country.continent}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Capital</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">{country.capital || 'N/A'}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Population</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.population?.total
                        ? `${(country.population.total / 1000000).toFixed(2)}M`
                        : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">GDP</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.gdp?.total
                        ? `$${(country.gdp.total / 1000000000).toFixed(2)}B`
                        : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">GDP per Capita</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.gdp?.perCapita
                        ? `$${country.gdp.perCapita.toLocaleString()}`
                        : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Area</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.geographicLocation?.area
                        ? `${country.geographicLocation.area.toLocaleString()} km²`
                        : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium">Languages</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.languages?.join(', ') || 'N/A'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Charts */}
          {chartData.length > 0 && (
            <>
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Comparison Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {comparisonData.data.map((_, index) => (
                      <Bar
                        key={index}
                        dataKey={`country${index + 1}`}
                        fill={colors[index]}
                        name={comparisonData.data[index].name}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {radarData.length > 0 && comparisonData?.data && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Radar Comparison</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      {comparisonData.data.map((country, index) => (
                        <Radar
                          key={country._id}
                          name={country.name}
                          dataKey={`country${index + 1}`}
                          stroke={colors[index % colors.length]}
                          fill={colors[index % colors.length]}
                          fillOpacity={0.3}
                        />
                      ))}
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CompareCountries;

