import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { storiesAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Heart, MessageCircle, Eye } from 'lucide-react';

const Stories = () => {
  const { user } = useAuth();

  const { data: storiesData, isLoading } = useQuery(
    'stories',
    () => storiesAPI.getAll({ page: 1, limit: 12 })
  );

  const stories = storiesData?.data?.stories || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Stories</h1>
          <p className="text-gray-600 max-w-2xl">
            Read and share travel experiences from around the world.
          </p>
        </div>
        {user && (
          <Link to="/stories/create" className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Write Story</span>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No stories yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link
              key={story._id}
              to={`/stories/${story._id}`}
              className="card hover:shadow-lg transition-all group"
            >
              {story.coverImage && (
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={story.country?.flag}
                    alt={story.country?.name}
                    className="w-6 h-4 object-cover rounded"
                  />
                  <span className="text-sm text-gray-600">{story.country?.name}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {story.title}
                </h3>
                {story.excerpt && (
                  <p className="text-gray-600 line-clamp-3">{story.excerpt}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{story.comments?.length || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{story.views || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    {new Date(story.createdAt).toLocaleDateString()}
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

