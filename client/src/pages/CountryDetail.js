import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import { countriesAPI, usersAPI } from '../utils/api';
import Skeleton from '../components/Skeleton';
import ErrorDisplay from '../components/ErrorDisplay';
import { fmtNum, fmtAbbr } from '../utils/format';
import { SEO } from '../components/SEO';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
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
  Heart,
  Filter,
  Clock,
  DollarSign as DollarIcon,
  ExternalLink
} from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to handle image loading errors
const ImageWithErrorHandling = ({ src, alt, className, onClick, onError, ...props }) => {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
    if (onError) onError();
  };

  if (imageError || !src) {
    return null; // Don't render anything if image fails to load or no src
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={handleError}
      style={{ display: imageError ? 'none' : 'block' }}
      {...props}
    />
  );
};

const CountryDetail = () => {
  const { t, i18n } = useTranslation();
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
  
  const { data: country, isLoading, isError: countryError, refetch: refetchCountry } = useQuery(
    ['country', id, i18n.language],
    () => countriesAPI.getById(id),
    { enabled: !!id, staleTime: 0 }
  );

  const { data: visitedCountries, isError: visitedError } = useQuery(
    'visited-countries',
    usersAPI.getVisitedCountries,
    { enabled: !!user }
  );

  const { data: wishlist, isError: wishlistError } = useQuery(
    'wishlist',
    usersAPI.getWishlist,
    { enabled: !!user }
  );

  const addToWishlistMutation = useMutation(
    () => usersAPI.addToWishlist(id),
    {
      onSuccess: () => {
        toast.success(t('countryDetail.addedToWishlist'));
        queryClient.invalidateQueries('wishlist');
      },
      onError: () => toast.error(t('countryDetail.wishlistAddError')),
    }
  );

  const removeFromWishlistMutation = useMutation(
    () => usersAPI.removeFromWishlist(id),
    {
      onSuccess: () => {
        toast.success(t('countryDetail.removedFromWishlist'));
        queryClient.invalidateQueries('wishlist');
      },
      onError: () => toast.error(t('countryDetail.wishlistRemoveError')),
    }
  );

  const addVisitedCountryMutation = useMutation(
    (data) => usersAPI.addVisitedCountry(data),
    {
      onSuccess: () => {
        toast.success(t('countryDetail.addedToVisited'));
        setShowAddVisitForm(false);
        queryClient.invalidateQueries('visited-countries');
        queryClient.invalidateQueries('wishlist');
      },
      onError: () => toast.error(t('countryDetail.visitedAddError')),
    }
  );

  const isVisited = !visitedError && visitedCountries?.data?.some(
    visit => visit.country._id === id
  );

  const isInWishlist = !wishlistError && wishlist?.data?.some(
    c => c._id === id
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

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [mapView, setMapView] = useState(false);

  // Show map by default if there are attractions with coordinates
  useEffect(() => {
    if (country?.data?.touristAttractions) {
      const hasAttractionsWithCoords = country.data.touristAttractions.some(
        a => a.coordinates?.latitude && a.coordinates?.longitude
      );
      if (hasAttractionsWithCoords) {
        setMapView(true);
      }
    }
  }, [country?.data]);

  const [imageErrors, setImageErrors] = useState(new Set());

  const getAttractionImages = (attraction) => {
    const images = [];
    // Add images from images array
    if (attraction.images && attraction.images.length > 0) {
      attraction.images.forEach(img => {
        const imageUrl = img.url;
        // Only include images that haven't failed to load
        if (!imageErrors.has(imageUrl)) {
          images.push({
            original: imageUrl,
            thumbnail: imageUrl,
            description: img.caption || attraction.name
          });
        }
      });
    }
    // Add legacy imageUrl if no images array and it hasn't failed
    if (images.length === 0 && attraction.imageUrl && !imageErrors.has(attraction.imageUrl)) {
      images.push({
        original: attraction.imageUrl,
        thumbnail: attraction.imageUrl,
        description: attraction.name
      });
    }
    return images;
  };

  const handleImageError = (imageUrl) => {
    setImageErrors(prev => new Set([...prev, imageUrl]));
  };


  const filteredAttractions = country?.data?.touristAttractions?.filter(attraction => {
    if (selectedCategory === 'all') return true;
    return attraction.category === selectedCategory;
  }) || [];

  const attractionsWithCoords = filteredAttractions.filter(a => a.coordinates?.latitude && a.coordinates?.longitude);
  
  const getMapCenter = () => {
    if (attractionsWithCoords.length === 0) {
      return country?.data?.geographicLocation?.coordinates 
        ? [country.data.geographicLocation.coordinates.latitude, country.data.geographicLocation.coordinates.longitude]
        : [0, 0];
    }
    
    const avgLat = attractionsWithCoords.reduce((sum, a) => sum + a.coordinates.latitude, 0) / attractionsWithCoords.length;
    const avgLng = attractionsWithCoords.reduce((sum, a) => sum + a.coordinates.longitude, 0) / attractionsWithCoords.length;
    return [avgLat, avgLng];
  };

  const categories = [...new Set(country?.data?.touristAttractions?.map(a => a.category).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96 dark:bg-gray-700">
        <Skeleton variant="avatar" className="!h-32 !w-32" />
      </div>
    );
  }

  if (countryError) {
    return (
      <ErrorDisplay onRetry={refetchCountry} />
    );
  }

  if (!country?.data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('countryDetail.notFound')}</h2>
        <Link to="/countries" className="btn-primary">
          {t('countryDetail.backToCountries')}
        </Link>
      </div>
    );
  }

  const countryData = country.data;

  return (
    <div className="space-y-8">
      <SEO 
        title={t('seo.countryDetailTitle', { name: countryData.name })}
        description={t('seo.countryDetailDescription', { name: countryData.name, continent: countryData.continent })}
        keywords={`${countryData.name}, ${countryData.continent}, country information, population, GDP, landmarks, travel, ${countryData.capital || ''}`}
        image={countryData.flag}
        url={`/countries/${countryData._id}`}
      />
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/countries" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t('countryDetail.backToCountries')}</span>
        </Link>
        
        {user && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToWishlist}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isInWishlist
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
              <span>{isInWishlist ? t('countryDetail.inWishlist') : t('countries.addToWishlist')}</span>
            </button>
            
            {!isVisited && (
              <button
                onClick={() => setShowAddVisitForm(true)}
                className="btn-primary flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                <span>{t('countryDetail.markVisited')}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Country Header */}
      <div className="card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:gap-8">
          <ImageWithErrorHandling
            src={countryData.flag}
            alt={t('countries.flagAlt', { name: countryData.name })}
            loading="lazy"
            className="w-24 h-16 object-cover rounded border shadow-sm dark:shadow-gray-900/50"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {countryData.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{countryData.continent}</span>
              </div>
              {countryData.capital && (
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{countryData.capital}</span>
                </div>
              )}
              {countryData.currency && (
                <span>{t('countryDetail.currency')}: {countryData.currency}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Anthem Section */}
      {countryData.anthem && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Music className="h-6 w-6 me-2" />
            {t('countryDetail.nationalAnthem')}
          </h2>
          {countryData.anthem.title && (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {countryData.anthem.title}
            </h3>
          )}
          {countryData.anthem.lyrics && (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-serif">
                {countryData.anthem.lyrics}
              </pre>
            </div>
          )}
          {countryData.anthem.audioUrl && (
            <div className="mt-4">
              <audio controls className="w-full">
                <source src={countryData.anthem.audioUrl} type="audio/mpeg" />
                {t('countryDetail.audioUnsupported')}
              </audio>
            </div>
          )}
        </div>
      )}

      {/* Geographic Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <MapPin className="h-6 w-6 me-2" />
            {t('countryDetail.geographicLocation')}
          </h2>
          <div className="space-y-3">
            {countryData.geographicLocation?.coordinates && (
              <div>
                <span className="font-semibold">{t('countryDetail.coordinates')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {fmtNum(countryData.geographicLocation.coordinates.latitude)}°N, 
                  {fmtNum(countryData.geographicLocation.coordinates.longitude)}°E
                </span>
              </div>
            )}
            {countryData.geographicLocation?.area && (
              <div>
                <span className="font-semibold">{t('countryDetail.area')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {fmtNum(countryData.geographicLocation.area)} {t('countryDetail.sqKm')}
                </span>
              </div>
            )}
            {!!countryData.geographicLocation?.coastline && (
              <div>
                <span className="font-semibold">{t('countryDetail.coastline')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {fmtNum(countryData.geographicLocation.coastline)} {t('countryDetail.km')}
                </span>
              </div>
            )}
            {countryData.geographicLocation?.borders?.length > 0 && (
              <div>
                <span className="font-semibold">{t('countryDetail.borders')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {countryData.geographicLocation.borders.join(', ')}
                </span>
              </div>
            )}
            {countryData.climate && (
              <div>
                <span className="font-semibold">{t('countryDetail.climate')}: </span>
                <span className="text-gray-600 dark:text-gray-400">{countryData.climate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Users className="h-6 w-6 me-2" />
            {t('countryDetail.population')}
          </h2>
          <div className="space-y-3">
            {countryData.population?.total && (
              <div>
                <span className="font-semibold">{t('countryDetail.totalPopulation')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {fmtNum(countryData.population.total)}
                </span>
              </div>
            )}
            {countryData.population?.density && (
              <div>
                <span className="font-semibold">{t('countryDetail.density')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {fmtNum(countryData.population.density)} {t('countryDetail.peoplePerKm')}
                </span>
              </div>
            )}
            {countryData.population?.growthRate && (
              <div>
                <span className="font-semibold">{t('countryDetail.growthRate')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                                      {fmtNum(countryData.population.growthRate)}% {t('countryDetail.annually')}
                </span>
              </div>
            )}
            {countryData.population?.urbanPopulation && (
              <div>
                <span className="font-semibold">{t('countryDetail.urbanPopulation')}: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {fmtNum(countryData.population.urbanPopulation)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GDP Section */}
      {countryData.gdp && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <DollarSign className="h-6 w-6 me-2" />
            {t('countryDetail.gdp')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {countryData.gdp.total && (
                <div>
                  <span className="font-semibold">{t('countryDetail.totalGdp')}: </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ${fmtAbbr(countryData.gdp.total)}
                  </span>
                </div>
              )}
              {countryData.gdp.perCapita && (
                <div>
                  <span className="font-semibold">{t('countryDetail.gdpPerCapita')}: </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ${fmtNum(countryData.gdp.perCapita)}
                  </span>
                </div>
              )}
              {countryData.gdp.growthRate && (
                <div>
<span className="font-semibold">{t('countryDetail.growthRate')}: </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {fmtNum(countryData.gdp.growthRate)}% {t('countryDetail.annually')}
                  </span>
                </div>
              )}
            </div>
            {countryData.gdp.sectors && (
              <div>
                <h3 className="font-semibold mb-2">{t('countryDetail.economicSectors')}:</h3>
                <div className="space-y-2">
                  {countryData.gdp.sectors.agriculture && (
                    <div className="flex justify-between">
                      <span>{t('countryDetail.agriculture')}</span>
                      <span>{fmtNum(countryData.gdp.sectors.agriculture)}%</span>
                    </div>
                  )}
                  {countryData.gdp.sectors.industry && (
                    <div className="flex justify-between">
                      <span>{t('countryDetail.industry')}</span>
                      <span>{fmtNum(countryData.gdp.sectors.industry)}%</span>
                    </div>
                  )}
                  {countryData.gdp.sectors.services && (
                    <div className="flex justify-between">
                      <span>{t('countryDetail.services')}</span>
                      <span>{fmtNum(countryData.gdp.sectors.services)}%</span>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('countryDetail.religions')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {countryData.religions.map((religion, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="font-medium">{religion.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{fmtNum(religion.percentage)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Traditions */}
      {countryData.traditions?.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('countryDetail.traditions')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {countryData.traditions.map((tradition, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{tradition.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{tradition.description}</p>
                <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                  {tradition.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tourist Attractions */}
      {countryData.touristAttractions?.length > 0 && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center mb-4 md:mb-0">
                  <Mountain className="h-6 w-6 me-2" />
                  {t('countryDetail.touristAttractions')} ({fmtNum(countryData.touristAttractions.length)})
              </h2>
              
              {/* Filter and View Toggle */}
              <div className="flex items-center gap-4">
                {categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input-field py-1 text-sm"
                    >
                      <option value="all">{t('countryDetail.allCategories')}</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setMapView(true)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
mapView ? 'bg-white dark:bg-gray-700 shadow-sm dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {t('countryDetail.map')}
                  </button>
                  <button
                    onClick={() => setMapView(false)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      !mapView ? 'bg-white dark:bg-gray-700 shadow-sm dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {t('countryDetail.listView')}
                  </button>
                </div>
              </div>
            </div>

            {/* Map View */}
            {mapView && (
              <div className="mb-6" style={{ height: attractionsWithCoords.length > 0 ? '500px' : '300px' }}>
                {attractionsWithCoords.length > 0 ? (
                  <MapContainer
                    center={getMapCenter()}
                    zoom={attractionsWithCoords.length === 1 ? 10 : 7}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {attractionsWithCoords.map((attraction, index) => (
                      <Marker
                        key={index}
                        position={[attraction.coordinates.latitude, attraction.coordinates.longitude]}
                        eventHandlers={{
                          click: () => setSelectedAttraction(attraction)
                        }}
                      >
                        <Popup>
                          <div className="text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{attraction.name}</h3>
                            {attraction.location && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">{attraction.location}</p>
                            )}
                            {attraction.rating && (
                              <div className="flex items-center justify-center gap-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs">{fmtNum(attraction.rating)}/5</span>
                              </div>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">{t('countryDetail.noCoordinates') || 'No locations with coordinates available'}</p>
                  </div>
                )}
              </div>
            )}

            {/* Attractions Grid/List */}
            {!mapView ? (
              filteredAttractions.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map((attraction, index) => {
                  const images = getAttractionImages(attraction);
                  return (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
                      {/* Images */}
                      {images.length > 0 ? (
                        <div className="relative h-48">
                          {images.length === 1 ? (
                            <ImageWithErrorHandling
                              src={images[0].original}
                              alt={attraction.name}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => setSelectedAttraction(attraction)}
                              onError={() => handleImageError(images[0].original)}
                            />
                          ) : (
                            <div className="relative h-full">
                              <ImageWithErrorHandling
                                src={images[0].original}
                                alt={attraction.name}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => setSelectedAttraction(attraction)}
                                onError={() => handleImageError(images[0].original)}
                              />
                              {images.length > 1 && (
                                <div className="absolute bottom-2 end-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                                  {t('countryDetail.moreImages', { count: fmtNum(images.length - 1) })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : null}
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{attraction.name}</h3>
                          {attraction.rating && (
                            <div className="flex items-center gap-1 flex-shrink-0 ms-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{fmtNum(attraction.rating)}</span>
                            </div>
                          )}
                        </div>
                        
                        {attraction.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{attraction.description}</p>
                        )}
                        
                        {attraction.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{attraction.location}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                          {attraction.category && (
                            <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full capitalize">
                              {attraction.category}
                            </span>
                          )}
                          {images.length > 1 && (
                            <button
                              onClick={() => setSelectedAttraction(attraction)}
                              className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium"
                            >
                              {t('countryDetail.viewPhotos', { count: fmtNum(images.length) })}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">{t('countryDetail.noAttractions')}</p>
                </div>
              )
            ) : null}
          </div>

          {/* Attraction Detail Modal */}
          {selectedAttraction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 !mt-0" style={{ zIndex: 9999 }} onClick={() => setSelectedAttraction(null)}>
              <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{ zIndex: 10000 }} onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedAttraction.name}</h2>
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Image Gallery */}
                  {(() => {
                    const modalImages = getAttractionImages(selectedAttraction);
                    // Filter out images that have already failed
                    const validImages = modalImages.filter(img => 
                      img.original && !imageErrors.has(img.original)
                    );
                    return validImages.length > 0 && (
                      <div className="mb-6">
                        <ImageGallery 
                          items={validImages}
                          showPlayButton={false}
                          showFullscreenButton={true}
                        />
                      </div>
                    );
                  })()}
                  
                  {/* Details */}
                  <div className="space-y-4">
                    {selectedAttraction.description && (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedAttraction.description}</p>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedAttraction.location && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('countryDetail.location')}</p>
                            <p className="text-gray-600 dark:text-gray-400">{selectedAttraction.location}</p>
                            {selectedAttraction.coordinates && (
                              <a
                                href={`https://www.google.com/maps?q=${selectedAttraction.coordinates.latitude},${selectedAttraction.coordinates.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:underline text-sm flex items-center gap-1 mt-1"
                              >
                                <span>{t('countryDetail.openInGoogleMaps')}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {selectedAttraction.category && (
                        <div className="flex items-start gap-2">
                          <Mountain className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('countryDetail.category')}</p>
                            <p className="text-gray-600 dark:text-gray-400 capitalize">{selectedAttraction.category}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedAttraction.openingHours && (
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('countryDetail.openingHours')}</p>
                            <p className="text-gray-600 dark:text-gray-400">{selectedAttraction.openingHours}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedAttraction.admissionFee && (
                        <div className="flex items-start gap-2">
                          <DollarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('countryDetail.admissionFee')}</p>
                            <p className="text-gray-600 dark:text-gray-400">{selectedAttraction.admissionFee}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedAttraction.rating && (
                        <div className="flex items-start gap-2">
                          <Star className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('countryDetail.rating')}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-gray-600 dark:text-gray-400">{fmtNum(selectedAttraction.rating)}/5</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedAttraction.website && (
                        <div className="flex items-start gap-2">
                          <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('countryDetail.website')}</p>
                            <a
                              href={selectedAttraction.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline text-sm flex items-center gap-1"
                            >
                              <span>{t('countryDetail.visitWebsite')}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Map for single attraction */}
                    {selectedAttraction.coordinates && (
                      <div className="mt-6" style={{ height: '300px' }}>
                        <MapContainer
                          center={[selectedAttraction.coordinates.latitude, selectedAttraction.coordinates.longitude]}
                          zoom={13}
                          style={{ height: '100%', width: '100%' }}
                          scrollWheelZoom={true}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                            position={[selectedAttraction.coordinates.latitude, selectedAttraction.coordinates.longitude]}
                          >
                            <Popup>
                              <div className="text-center">
                                <h3 className="font-semibold">{selectedAttraction.name}</h3>
                                {selectedAttraction.location && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAttraction.location}</p>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                        </MapContainer>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('countryDetail.additionalInfo')}</h2>
          <div className="space-y-3">
            {countryData.languages?.length > 0 && (
              <div>
                <span className="font-semibold">{t('countryDetail.languages')}: </span>
                <span className="text-gray-600 dark:text-gray-400">{countryData.languages.join(', ')}</span>
              </div>
            )}
            {countryData.timezone?.length > 0 && (
              <div>
                <span className="font-semibold">{t('countryDetail.timezone')}: </span>
                <span className="text-gray-600 dark:text-gray-400">{countryData.timezone.join(', ')}</span>
              </div>
            )}
            {countryData.government && (
              <div>
                <span className="font-semibold">{t('countryDetail.government')}: </span>
                <span className="text-gray-600 dark:text-gray-400">{countryData.government}</span>
              </div>
            )}
            {countryData.independence && (
              <div>
                <span className="font-semibold">{t('countryDetail.independence')}: </span>
                <span className="text-gray-600 dark:text-gray-400">{countryData.independence}</span>
              </div>
            )}
            {countryData.nationalDay && (
              <div>
                <span className="font-semibold">{t('countryDetail.nationalDay')}: </span>
                <span className="text-gray-600 dark:text-gray-400">{countryData.nationalDay}</span>
              </div>
            )}
        </div>
      </div>
    </div>

    {/* Add Visit Form Modal */}
      {showAddVisitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 !mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('countryDetail.addVisit')}</h2>
              <button
                onClick={() => setShowAddVisitForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddVisit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('countryDetail.visitDate')}
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('countryDetail.duration')}
                </label>
                <input
                  type="number"
                  value={visitFormData.duration}
                  onChange={(e) => setVisitFormData({...visitFormData, duration: e.target.value})}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('countryDetail.rating')}
                </label>
                <select
                  value={visitFormData.rating}
                  onChange={(e) => setVisitFormData({...visitFormData, rating: parseInt(e.target.value)})}
                  className="input-field"
                >
                  <option value={1}>{t('countryDetail.starRating', { count: 1 })}</option>
                  <option value={2}>{t('countryDetail.starRating', { count: 2 })}</option>
                  <option value={3}>{t('countryDetail.starRating', { count: 3 })}</option>
                  <option value={4}>{t('countryDetail.starRating', { count: 4 })}</option>
                  <option value={5}>{t('countryDetail.starRating', { count: 5 })}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('countryDetail.citiesVisited')}
                </label>
                <input
                  type="text"
                  value={visitFormData.cities}
                  onChange={(e) => setVisitFormData({...visitFormData, cities: e.target.value})}
                  className="input-field"
                  placeholder={t('countryDetail.citiesPlaceholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('countryDetail.activities')}
                </label>
                <input
                  type="text"
                  value={visitFormData.activities}
                  onChange={(e) => setVisitFormData({...visitFormData, activities: e.target.value})}
                  className="input-field"
                  placeholder={t('countryDetail.activitiesPlaceholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('countryDetail.notes')}
                </label>
                <textarea
                  value={visitFormData.notes}
                  onChange={(e) => setVisitFormData({...visitFormData, notes: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder={t('countryDetail.notesPlaceholder')}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddVisitForm(false)}
                  className="btn-secondary"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={addVisitedCountryMutation.isLoading}
                  className="btn-primary"
                >
                  {addVisitedCountryMutation.isLoading ? t('countryDetail.adding') : t('countryDetail.addVisit')}
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
