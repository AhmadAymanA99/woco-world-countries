import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { tripsAPI } from '../utils/api';
import { Plus, Calendar, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Skeleton from '../components/Skeleton';
import { localizeName, formatDate } from '../utils/format';

const MyTrips = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'planned'
  });

  const { data: trips, isLoading } = useQuery('trips', tripsAPI.getAll);
  const createMutation = useMutation(tripsAPI.create, {
    onSuccess: () => {
      toast.success(t('trips.created'));
      queryClient.invalidateQueries('trips');
      setShowCreateForm(false);
      setFormData({ title: '', description: '', startDate: '', endDate: '', status: 'planned' });
    },
    onError: () => toast.error(t('trips.createError')),
  });

  const deleteMutation = useMutation(tripsAPI.delete, {
    onSuccess: () => {
      toast.success(t('trips.deleted'));
      queryClient.invalidateQueries('trips');
    },
    onError: () => toast.error(t('trips.deleteError')),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStatusColor = (status) => {
    const colors = {
      planned: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
      'in-progress': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
      completed: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
      cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
    };
    return colors[status] || colors.planned;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('trips.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {t('trips.description')}
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>{t('trips.newTrip')}</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('trips.createNew')}</h2>
            <button onClick={() => setShowCreateForm(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('trips.titleRequired')}</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder={t('trips.titlePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('trips.description')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('trips.startDate')} *</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('trips.endDate')} *</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                {t('common.cancel')}
              </button>
              <button type="submit" className="btn-primary" disabled={createMutation.isLoading}>
                {t('trips.createTrip')}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12 dark:bg-gray-700">
          <Skeleton variant="avatar" />
        </div>
      ) : !trips?.data || trips.data.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('trips.noTrips')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('trips.noTripsDesc')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trips.data.map((trip) => (
            <div key={trip._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{trip.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(trip.status)}`}>
                    {trip.status.replace('-', ' ')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(t('trips.deleteConfirm'))) {
                      deleteMutation.mutate(trip._id);
                    }
                  }}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {trip.description && <p className="text-gray-600 dark:text-gray-400 mb-4">{trip.description}</p>}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
              </div>
              {trip.countries?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {trip.countries.map((item) => (
                    <Link
                      key={item.country._id}
                      to={`/countries/${item.country._id}`}
                      className="flex items-center gap-1 text-sm"
                    >
                      <img src={item.country.flag} alt={item.country.name} className="w-4 h-3 object-cover rounded" />
                      <span>{localizeName(item.country.name)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;

