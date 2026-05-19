import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { collectionsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, X, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { localizeName } from '../utils/format';

const Collections = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'custom',
    visibility: 'public'
  });

  const { data: collectionsData } = useQuery(
    'collections',
    user ? collectionsAPI.getMyCollections : () => collectionsAPI.getAll(),
    { enabled: !!user }
  );

  const createMutation = useMutation(collectionsAPI.create, {
    onSuccess: () => {
      toast.success(t('collections.created'));
      queryClient.invalidateQueries('collections');
      setShowCreateForm(false);
      setFormData({ name: '', description: '', category: 'custom', visibility: 'public' });
    },
  });

  const collections = collectionsData?.data || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('collections.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {t('collections.description')}
          </p>
        </div>
        {user && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>{t('collections.createCollection')}</span>
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('collections.createCollection')}</h2>
            <button onClick={() => setShowCreateForm(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('collections.collectionName')}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder={t('collections.namePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('collections.description')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('collections.categoryLabel')}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="custom">{t('collections.custom')}</option>
                  <option value="islands">{t('collections.islands')}</option>
                  <option value="landlocked">{t('collections.landlocked')}</option>
                  <option value="coastal">{t('collections.coastal')}</option>
                  <option value="mountains">{t('collections.mountains')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('collections.visibilityLabel')}</label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                  className="input-field"
                >
                  <option value="public">{t('collections.public')}</option>
                  <option value="private">{t('collections.private')}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreateForm(false)} className="btn-secondary">
                {t('collections.cancel')}
              </button>
              <button type="submit" className="btn-primary" disabled={createMutation.isLoading}>
                {t('collections.create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {collections.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('collections.noCollections')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection._id}
              to={`/collections/${collection._id}`}
              className="card hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {collection.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {collection.countries?.length || 0}
                  </span>
                </div>
                {collection.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{collection.description}</p>
                )}
                {collection.countries && collection.countries.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {collection.countries.slice(0, 6).map((country) => (
                      <img
                        key={country._id}
                        src={country.flag}
                        alt={localizeName(country.name)}
                                                        className="w-8 h-6 object-cover rounded border"
                                                        title={localizeName(country.name)}
                      />
                    ))}
                    {collection.countries.length > 6 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                        {t('collections.moreCountries', { count: collection.countries.length - 6 })}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;

