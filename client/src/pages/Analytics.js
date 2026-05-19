import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { analyticsAPI, usersAPI } from '../utils/api';
import { Globe, Camera, Star, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import WorldMap from '../components/WorldMap';
import Skeleton from '../components/Skeleton';
import { localizeContinent, formatDateShort } from '../utils/format';
import toast from 'react-hot-toast';

const Analytics = () => {
  const { t } = useTranslation();
  const { data: statsData, isLoading } = useQuery('analytics', analyticsAPI.getStats);
  const { data: visitedData } = useQuery('visited-countries', usersAPI.getVisitedCountries);

  const handleExport = async () => {
    try {
      const response = await analyticsAPI.exportData();
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `woco-data-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(t('analytics.dataExported'));
    } catch (error) {
      toast.error(t('analytics.exportError'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96 dark:bg-gray-700">
        <Skeleton variant="avatar" className="!h-32 !w-32" />
      </div>
    );
  }

  const stats = statsData?.data || {};
  const overview = stats.overview || {};
  const byContinent = stats.byContinent || {};
  const ratingDistribution = stats.ratingDistribution || {};

  const continentData = Object.entries(byContinent).map(([name, value]) => ({
    name,
    value,
    countries: value
  }));

  const ratingData = Object.entries(ratingDistribution).map(([name, value]) => ({
    name: t('analytics.starsLabel', { name }),
    value
  })).filter(item => item.value > 0);

  const timelineData = (stats.timeline || []).map(item => ({
    date: formatDateShort(item.date),
    countries: 1
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('analytics.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {t('analytics.description')}
          </p>
        </div>
        <button onClick={handleExport} className="btn-outline flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>{t('analytics.exportData')}</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{overview.totalCountries || 0}</div>
          <div className="text-gray-600 dark:text-gray-400">{t('analytics.countriesVisited')}</div>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{overview.totalPhotos || 0}</div>
          <div className="text-gray-600 dark:text-gray-400">{t('analytics.photosUploaded')}</div>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{overview.averageRating || '0.0'}</div>
          <div className="text-gray-600 dark:text-gray-400">{t('analytics.averageRating')}</div>
        </div>

        <div className="card text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{overview.totalDays || 0}</div>
          <div className="text-gray-600 dark:text-gray-400">{t('analytics.totalDays')}</div>
        </div>
      </div>

      {/* World Map */}
      {stats.mapData && stats.mapData.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('analytics.travelMap')}</h2>
          <WorldMap visitedCountries={visitedData?.data || []} height="500px" />
        </div>
      )}

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Countries by Continent */}
        {continentData.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{t('analytics.byContinent')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={continentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${localizeContinent(name)}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {continentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Rating Distribution */}
        {ratingData.length > 0 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{t('analytics.ratingDistribution')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Top Cities */}
      {stats.topCities && stats.topCities.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">{t('analytics.mostVisitedCities')}</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {stats.topCities.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{item.count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{item.city}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Chart */}
      {timelineData.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">{t('analytics.timeline')}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="countries" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Analytics;
