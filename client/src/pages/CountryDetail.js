import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import { countriesAPI, usersAPI } from '../utils/api';
import { SEO } from '../components/SEO';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  DollarSign, 
  Music,
  Plus,
  X,
  Globe,
  Mountain,
  Building,
  Star,
  Heart
} from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const CountryDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAddVisitForm, setShowAddVisitForm] = useState(false);
  const [visitFormData, setVisitFormData] = useState({
    visitDate: '',
    duration: '',
    notes: '',
    rating: 5,
    cities: '',
    activities: ''
  });

  const { data: country, isLoading } = useQuery(
    ['country', id],
    () => countriesAPI.getById(id),
    { enabled: !!id }
  );

  const { data: visitedCountries } = useQuery(
    'visited-countries',
    usersAPI.getVisitedCountries,
    { enabled: !!user }
  );

  const addToWishlistMutation = useMutation(
    () => usersAPI.addToWishlist(id),
    {
      onSuccess: () => {
        toast.success('Added to wishlist!');
        queryClient.invalidateQueries('visited-countries');
      },
      onError: () => toast.error('Failed to add to wishlist'),
    }
  );

  const removeFromWishlistMutation = useMutation(
    () => usersAPI.removeFromWishlist(id),
    {
      onSuccess: () => {
        toast.success('Removed from wishlist!');
        queryClient.invalidateQueries('visited-countries');
      },
      onError: () => toast.error('Failed to remove from wishlist'),
    }
  );

  const addVisitedCountryMutation = useMutation(
    (data) => usersAPI.addVisitedCountry(data),
    {
      onSuccess: () => {
        toast.success('Country added to your visited list!');
        setShowAddVisitForm(false);
        queryClient.invalidateQueries('visited-countries');
      },
      onError: () => toast.error('Failed to add country to visited list'),
    }
  );

  const isVisited = visitedCountries?.data?.some(
    visit => visit.country._id === id
  );

  const isInWishlist = visitedCountries?.data?.some(
    visit => visit.country._id === id
  );

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      removeFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }
  };

  const handleAddVisit = (e) => {
    e.preventDefault();
    const data = {
      countryId: id,
      ...visitFormData,
      cities: visitFormData.cities.split(',').map(c => c.trim()).filter(c => c),
      activities: visitFormData.activities.split(',').map(a => a.trim()).filter(a => a)
    };
    addVisitedCountryMutation.mutate(data);
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString();
  };

  const getAttractionImages = () => {
    return country?.data?.touristAttractions
      ?.filter(attraction => attraction.imageUrl)
      ?.map(attraction => ({
        original: attraction.imageUrl,
        thumbnail: attraction.imageUrl,
        description: attraction.name
      })) || [];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!country?.data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h2>
        <Link to="/countries" className="btn-primary">
          Back to Countries
        </Link>
      </div>
    );
  }

  const countryData = country.data;

  return (
    <div className="space-y-8">
      <SEO 
        title={`${countryData.name} - Country Information`}
        description={`Learn about ${countryData.name}: population, capital, GDP, landmarks, and cultural traditions. Discover ${countryData.continent} and plan your travel adventure.`}
        keywords={`${countryData.name}, ${countryData.continent}, country information, population, GDP, landmarks, travel, ${countryData.capital || ''}`}
        image={countryData.flag}
        url={`/countries/${countryData._id}`}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/countries" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Countries</span>
        </Link>
        
        {user && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddToWishlist}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                isInWishlist
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
              <span>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
            
            {!isVisited && (
              <button
                onClick={() => setShowAddVisitForm(true)}
                className="btn-primary flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Mark as Visited</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Country Header */}
      <div className="card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
          <img
            src={countryData.flag}
            alt={`Flag of ${countryData.name}`}
            loading="lazy"
            className="w-24 h-16 object-cover rounded border shadow-sm"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {countryData.name}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{countryData.continent}</span>
              </div>
              {countryData.capital && (
                <div className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span>{countryData.capital}</span>
                </div>
              )}
              {countryData.currency && (
                <span>Currency: {countryData.currency}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Anthem Section */}
      {countryData.anthem && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Music className="h-6 w-6 mr-2" />
            National Anthem
          </h2>
          {countryData.anthem.title && (
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {countryData.anthem.title}
            </h3>
          )}
          {countryData.anthem.lyrics && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-gray-700 font-serif">
                {countryData.anthem.lyrics}
              </pre>
            </div>
          )}
          {countryData.anthem.audioUrl && (
            <div className="mt-4">
              <audio controls className="w-full">
                <source src={countryData.anthem.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}

      {/* Geographic Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-6 w-6 mr-2" />
            Geographic Location
          </h2>
          <div className="space-y-3">
            {countryData.geographicLocation?.coordinates && (
              <div>
                <span className="font-semibold">Coordinates: </span>
                <span className="text-gray-600">
                  {countryData.geographicLocation.coordinates.latitude}°N, 
                  {countryData.geographicLocation.coordinates.longitude}°E
                </span>
              </div>
            )}
            {countryData.geographicLocation?.area && (
              <div>
                <span className="font-semibold">Area: </span>
                <span className="text-gray-600">
                  {countryData.geographicLocation.area.toLocaleString()} km²
                </span>
              </div>
            )}
            {countryData.geographicLocation?.coastline && (
              <div>
                <span className="font-semibold">Coastline: </span>
                <span className="text-gray-600">
                  {countryData.geographicLocation.coastline.toLocaleString()} km
                </span>
              </div>
            )}
            {countryData.geographicLocation?.borders?.length > 0 && (
              <div>
                <span className="font-semibold">Borders: </span>
                <span className="text-gray-600">
                  {countryData.geographicLocation.borders.join(', ')}
                </span>
              </div>
            )}
            {countryData.climate && (
              <div>
                <span className="font-semibold">Climate: </span>
                <span className="text-gray-600">{countryData.climate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Population
          </h2>
          <div className="space-y-3">
            {countryData.population?.total && (
              <div>
                <span className="font-semibold">Total Population: </span>
                <span className="text-gray-600">
                  {countryData.population.total.toLocaleString()}
                </span>
              </div>
            )}
            {countryData.population?.density && (
              <div>
                <span className="font-semibold">Density: </span>
                <span className="text-gray-600">
                  {countryData.population.density.toLocaleString()} people/km²
                </span>
              </div>
            )}
            {countryData.population?.growthRate && (
              <div>
                <span className="font-semibold">Growth Rate: </span>
                <span className="text-gray-600">
                  {countryData.population.growthRate}% annually
                </span>
              </div>
            )}
            {countryData.population?.urbanPopulation && (
              <div>
                <span className="font-semibold">Urban Population: </span>
                <span className="text-gray-600">
                  {countryData.population.urbanPopulation}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GDP Section */}
      {countryData.gdp && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <DollarSign className="h-6 w-6 mr-2" />
            Gross Domestic Product (GDP)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {countryData.gdp.total && (
                <div>
                  <span className="font-semibold">Total GDP: </span>
                  <span className="text-gray-600">
                    ${formatNumber(countryData.gdp.total)}
                  </span>
                </div>
              )}
              {countryData.gdp.perCapita && (
                <div>
                  <span className="font-semibold">GDP per Capita: </span>
                  <span className="text-gray-600">
                    ${countryData.gdp.perCapita.toLocaleString()}
                  </span>
                </div>
              )}
              {countryData.gdp.growthRate && (
                <div>
                  <span className="font-semibold">Growth Rate: </span>
                  <span className="text-gray-600">
                    {countryData.gdp.growthRate}% annually
                  </span>
                </div>
              )}
            </div>
            {countryData.gdp.sectors && (
              <div>
                <h3 className="font-semibold mb-2">Economic Sectors:</h3>
                <div className="space-y-2">
                  {countryData.gdp.sectors.agriculture && (
                    <div className="flex justify-between">
                      <span>Agriculture:</span>
                      <span>{countryData.gdp.sectors.agriculture}%</span>
                    </div>
                  )}
                  {countryData.gdp.sectors.industry && (
                    <div className="flex justify-between">
                      <span>Industry:</span>
                      <span>{countryData.gdp.sectors.industry}%</span>
                    </div>
                  )}
                  {countryData.gdp.sectors.services && (
                    <div className="flex justify-between">
                      <span>Services:</span>
                      <span>{countryData.gdp.sectors.services}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Religions */}
      {countryData.religions?.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Religions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {countryData.religions.map((religion, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{religion.name}</span>
                <span className="text-gray-600">{religion.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Traditions */}
      {countryData.traditions?.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Traditions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {countryData.traditions.map((tradition, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{tradition.name}</h3>
                <p className="text-gray-600 mb-2">{tradition.description}</p>
                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                  {tradition.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tourist Attractions */}
      {countryData.touristAttractions?.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Mountain className="h-6 w-6 mr-2" />
            Tourist Attractions
          </h2>
          
          {/* Image Gallery */}
          {getAttractionImages().length > 0 && (
            <div className="mb-6">
              <ImageGallery items={getAttractionImages()} />
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            {countryData.touristAttractions.map((attraction, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{attraction.name}</h3>
                  {attraction.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{attraction.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{attraction.description}</p>
                {attraction.location && (
                  <p className="text-sm text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {attraction.location}
                  </p>
                )}
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {attraction.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
          <div className="space-y-3">
            {countryData.languages?.length > 0 && (
              <div>
                <span className="font-semibold">Languages: </span>
                <span className="text-gray-600">{countryData.languages.join(', ')}</span>
              </div>
            )}
            {countryData.timezone?.length > 0 && (
              <div>
                <span className="font-semibold">Timezone: </span>
                <span className="text-gray-600">{countryData.timezone.join(', ')}</span>
              </div>
            )}
            {countryData.government && (
              <div>
                <span className="font-semibold">Government: </span>
                <span className="text-gray-600">{countryData.government}</span>
              </div>
            )}
            {countryData.independence && (
              <div>
                <span className="font-semibold">Independence: </span>
                <span className="text-gray-600">{countryData.independence}</span>
              </div>
            )}
            {countryData.nationalDay && (
              <div>
                <span className="font-semibold">National Day: </span>
                <span className="text-gray-600">{countryData.nationalDay}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Visit Form Modal */}
      {showAddVisitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 !mt-0">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add Visit</h2>
              <button
                onClick={() => setShowAddVisitForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddVisit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit Date *
                </label>
                <input
                  type="date"
                  required
                  value={visitFormData.visitDate}
                  onChange={(e) => setVisitFormData({...visitFormData, visitDate: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={visitFormData.duration}
                  onChange={(e) => setVisitFormData({...visitFormData, duration: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <select
                  value={visitFormData.rating}
                  onChange={(e) => setVisitFormData({...visitFormData, rating: parseInt(e.target.value)})}
                  className="input-field"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cities Visited (comma-separated)
                </label>
                <input
                  type="text"
                  value={visitFormData.cities}
                  onChange={(e) => setVisitFormData({...visitFormData, cities: e.target.value})}
                  className="input-field"
                  placeholder="e.g., Paris, Lyon, Marseille"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activities (comma-separated)
                </label>
                <input
                  type="text"
                  value={visitFormData.activities}
                  onChange={(e) => setVisitFormData({...visitFormData, activities: e.target.value})}
                  className="input-field"
                  placeholder="e.g., Sightseeing, Hiking, Museums"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={visitFormData.notes}
                  onChange={(e) => setVisitFormData({...visitFormData, notes: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Share your memories..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddVisitForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addVisitedCountryMutation.isLoading}
                  className="btn-primary"
                >
                  {addVisitedCountryMutation.isLoading ? 'Adding...' : 'Add Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
