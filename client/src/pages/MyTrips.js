import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { tripsAPI } from '../utils/api';
import { Plus, Calendar, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyTrips = () => {
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
      toast.success('Trip created!');
      queryClient.invalidateQueries('trips');
      setShowCreateForm(false);
      setFormData({ title: '', description: '', startDate: '', endDate: '', status: 'planned' });
    },
    onError: () => toast.error('Failed to create trip'),
  });

  const deleteMutation = useMutation(tripsAPI.delete, {
    onSuccess: () => {
      toast.success('Trip deleted');
      queryClient.invalidateQueries('trips');
    },
    onError: () => toast.error('Failed to delete trip'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStatusColor = (status) => {
    const colors = {
      planned: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.planned;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Trips</h1>
          <p className="text-gray-600 max-w-2xl">
            Plan and track your upcoming and past adventures.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Trip</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New Trip</h2>
            <button onClick={() => setShowCreateForm(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Europe Adventure 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={createMutation.isLoading}>
                Create Trip
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : !trips?.data || trips.data.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
          <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trips.data.map((trip) => (
            <div key={trip._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(trip.status)}`}>
                    {trip.status.replace('-', ' ')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this trip?')) {
                      deleteMutation.mutate(trip._id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {trip.description && <p className="text-gray-600 mb-4">{trip.description}</p>}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {trip.countries?.length > 0 && (
                <div className="flex items-center space-x-2 flex-wrap">
                  {trip.countries.map((item) => (
                    <Link
                      key={item.country._id}
                      to={`/countries/${item.country._id}`}
                      className="flex items-center space-x-1 text-sm"
                    >
                      <img src={item.country.flag} alt={item.country.name} className="w-4 h-3 object-cover rounded" />
                      <span>{item.country.name}</span>
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

