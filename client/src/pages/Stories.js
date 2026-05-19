import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { storiesAPI } from '../utils/api';
import Skeleton from '../components/Skeleton';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Heart, MessageCircle, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizeName, formatDate } from '../utils/format';
import { SEO } from '../components/SEO';

const Stories = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: storiesData, isLoading } = useQuery(
    'stories',
    () => storiesAPI.getAll({ page: 1, limit: 12 })
  );

  const stories = storiesData?.data?.stories || [];

  return (
    <div className="space-y-6">
      <SEO
        title={t('seo.storiesTitle')}
        description={t('stories.description')}
        url="/stories"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('stories.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('stories.description')}</p>
      </div>
        {user && (
          <Link to="/stories/create" className="btn-primary flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>{t('stories.createStory')}</span>
          </Link>
        )}

      {isLoading ? (
        <div className="flex justify-center py-12 dark:bg-gray-700">
          <Skeleton variant="avatar" />
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">{t('stories.noStories')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link
              key={story._id}
              to={`/stories/${story._id}`}
              className="card hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all group"
            >
              {story.coverImage && (
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <img
                    src={story.country?.flag}
                    alt={story.country?.name}
                    className="w-6 h-4 object-cover rounded"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{localizeName(story.country?.name)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {story.title}
                </h3>
                {story.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{story.excerpt}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{story.comments?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{story.views || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    {formatDate(story.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stories;

