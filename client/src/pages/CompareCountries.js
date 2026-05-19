import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { countriesAPI } from '../utils/api';
import Skeleton from '../components/Skeleton';
import { Search, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { fmtNum, localizeName, localizeContinent } from '../utils/format';
import { SEO } from '../components/SEO';

const CompareCountries = () => {
  const { t } = useTranslation();
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
        name: t('compare.populationMillions'),
        ...countries.reduce((acc, c, i) => {
          acc[`country${i + 1}`] = c.population?.total ? (c.population.total / 1000000).toFixed(1) : 0;
          return acc;
        }, {})
      },
      {
        name: t('compare.gdpBillions'),
        ...countries.reduce((acc, c, i) => {
          acc[`country${i + 1}`] = c.gdp?.total ? (c.gdp.total / 1000000000).toFixed(1) : 0;
          return acc;
        }, {})
      },
      {
        name: t('compare.areaThousandKm'),
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
    <div className="max-w-7xl mx-auto space-y-6">
      <SEO
        title={t('seo.compareTitle')}
        description={t('compare.description')}
        url="/compare"
      />
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('compare.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('compare.description')}</p>
      </div>

      {/* Country Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">{t('compare.selectedCountries')}</h2>
        <div className="space-y-4">
          <div className="flex-1 relative">
            <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t('countries.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field ps-10"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 max-h-60 overflow-y-auto">
              {searchResults.map(country => (
                <button
                  key={country._id}
                  onClick={() => addCountry(country)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <img src={country.flag} alt={country.name} className="w-8 h-6 object-cover rounded" />
                  <span className="flex-1 text-start">{localizeName(country.name)}</span>
                </button>
              ))}
            </div>
          )}

          {selectedCountries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country, index) => (
                <div
                  key={country._id}
                  className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg px-3 py-2"
                >
                  <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded" />
                  <span className="font-medium">{localizeName(country.name)}</span>
                  <button
                    onClick={() => removeCountry(country._id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedCountries.length < 2 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              {t('compare.selectCountries')}
            </p>
          )}
        </div>
      </div>

      {/* Comparison Results */}
      {isLoading && selectedCountries.length >= 2 && (
        <div className="flex justify-center py-12 dark:bg-gray-700">
          <Skeleton variant="avatar" />
        </div>
      )}

      {comparisonData?.data && selectedCountries.length >= 2 && (
        <div className="space-y-6">
          {/* Detailed Comparison Table */}
          <div className="card overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">{t('compare.detailed')}</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-start p-3">{t('compare.property')}</th>
                  {comparisonData.data.map((country, index) => (
                    <th key={country._id} className="text-start p-3">
                      <div className="flex items-center gap-2">
                        <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded" />
                        <span>{localizeName(country.name)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">{t('compare.continent')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">{localizeContinent(country.continent)}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">{t('compare.capital')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">{country.capital || t('common.notApplicable')}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">{t('compare.population')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.population?.total
                        ? `${(country.population.total / 1000000).toFixed(2)}M`
                        : t('common.notApplicable')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">{t('compare.gdp')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.gdp?.total
                        ? `$${(country.gdp.total / 1000000000).toFixed(2)}B`
                        : t('common.notApplicable')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">{t('compare.gdpPerCapita')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.gdp?.perCapita
                        ? `$${fmtNum(country.gdp.perCapita)}`
                        : t('common.notApplicable')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">{t('compare.area')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.geographicLocation?.area
                        ? `${fmtNum(country.geographicLocation.area)} km²`
                        : t('common.notApplicable')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-medium">{t('compare.languages')}</td>
                  {comparisonData.data.map(country => (
                    <td key={country._id} className="p-3">
                      {country.languages?.join(', ') || t('common.notApplicable')}
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
                <h2 className="text-xl font-semibold mb-4">{t('compare.comparisonChart')}</h2>
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
                        name={localizeName(comparisonData.data[index].name)}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {radarData.length > 0 && comparisonData?.data && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">{t('compare.radar')}</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      {comparisonData.data.map((country, index) => (
                        <Radar
                          key={country._id}
                          name={localizeName(country.name)}
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

