import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Ensure API_BASE_URL ends with /api
const getApiUrl = (endpoint) => {
  // Remove trailing slash and ensure it ends with /api
  let baseUrl = API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  if (!baseUrl.endsWith('/api')) {
    baseUrl = `${baseUrl}/api`;
  }
  return `${baseUrl}${endpoint}`;
};

// Countries API
export const countriesAPI = {
  getAll: (params = {}) => axios.get(getApiUrl('/countries'), { params }),
  getById: (id) => axios.get(getApiUrl(`/countries/${id}`)),
  getByContinent: (continent, params = {}) => 
    axios.get(getApiUrl(`/countries/continent/${continent}`), { params }),
  getContinents: () => axios.get(getApiUrl('/countries/meta/continents')),
  search: (query, limit = 20) => 
    axios.get(getApiUrl(`/countries/search/${query}`), { params: { limit } }),
  compare: (countryIds) => axios.post(getApiUrl('/countries/compare'), { countryIds })
};

// Users API
export const usersAPI = {
  getVisitedCountries: () => axios.get(getApiUrl('/users/visited-countries')),
  addVisitedCountry: (data) => axios.post(getApiUrl('/users/visited-countries'), data),
  updateVisitedCountry: (countryId, data) => 
    axios.put(getApiUrl(`/users/visited-countries/${countryId}`), data),
  removeVisitedCountry: (countryId) => 
    axios.delete(getApiUrl(`/users/visited-countries/${countryId}`)),
  uploadPhoto: (countryId, formData) => 
    axios.post(getApiUrl(`/users/visited-countries/${countryId}/photos`), formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deletePhoto: (countryId, photoIndex) => 
    axios.delete(getApiUrl(`/users/visited-countries/${countryId}/photos/${photoIndex}`)),
  getWishlist: () => axios.get(getApiUrl('/users/wishlist')),
  addToWishlist: (countryId) => axios.post(getApiUrl(`/users/wishlist/${countryId}`)),
  removeFromWishlist: (countryId) => axios.delete(getApiUrl(`/users/wishlist/${countryId}`))
};

// Auth API
export const authAPI = {
  login: (credentials) => axios.post(getApiUrl('/auth/login'), credentials),
  register: (userData) => axios.post(getApiUrl('/auth/register'), userData),
  getMe: () => axios.get(getApiUrl('/auth/me')),
  updateProfile: (profileData) => axios.put(getApiUrl('/auth/profile'), profileData),
  deleteAccount: () => axios.delete(getApiUrl('/auth/account')),
  addAuthHeader: (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  removeAuthHeader: () => {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Stories API
export const storiesAPI = {
  getAll: (params = {}) => axios.get(getApiUrl('/stories'), { params }),
  getById: (id) => axios.get(getApiUrl(`/stories/${id}`)),
  create: (data) => axios.post(getApiUrl('/stories'), data),
  update: (id, data) => axios.put(getApiUrl(`/stories/${id}`), data),
  delete: (id) => axios.delete(getApiUrl(`/stories/${id}`)),
  like: (id) => axios.post(getApiUrl(`/stories/${id}/like`)),
  addComment: (id, content) => axios.post(getApiUrl(`/stories/${id}/comments`), { content }),
  deleteComment: (id, commentId) => axios.delete(getApiUrl(`/stories/${id}/comments/${commentId}`))
};

// Trips API
export const tripsAPI = {
  getAll: (params = {}) => axios.get(getApiUrl('/trips'), { params }),
  getById: (id) => axios.get(getApiUrl(`/trips/${id}`)),
  create: (data) => axios.post(getApiUrl('/trips'), data),
  update: (id, data) => axios.put(getApiUrl(`/trips/${id}`), data),
  delete: (id) => axios.delete(getApiUrl(`/trips/${id}`)),
  addCountry: (id, data) => axios.post(getApiUrl(`/trips/${id}/countries`), data)
};

// Collections API
export const collectionsAPI = {
  getAll: (params = {}) => axios.get(getApiUrl('/collections'), { params }),
  getMyCollections: () => axios.get(getApiUrl('/collections/my-collections')),
  getById: (id) => axios.get(getApiUrl(`/collections/${id}`)),
  create: (data) => axios.post(getApiUrl('/collections'), data),
  update: (id, data) => axios.put(getApiUrl(`/collections/${id}`), data),
  delete: (id) => axios.delete(getApiUrl(`/collections/${id}`)),
  addCountry: (id, countryId) => axios.post(getApiUrl(`/collections/${id}/countries/${countryId}`)),
  removeCountry: (id, countryId) => axios.delete(getApiUrl(`/collections/${id}/countries/${countryId}`))
};

// Social API
export const socialAPI = {
  getProfile: (username) => axios.get(getApiUrl(`/social/profile/${username}`)),
  follow: (userId) => axios.post(getApiUrl(`/social/follow/${userId}`)),
  checkFollow: (userId) => axios.get(getApiUrl(`/social/follow/${userId}`)),
  getFollowers: (userId) => axios.get(getApiUrl(`/social/followers/${userId}`)),
  getFollowing: (userId) => axios.get(getApiUrl(`/social/following/${userId}`)),
  getLeaderboard: (type, limit = 10) => axios.get(getApiUrl(`/social/leaderboard/${type}`), { params: { limit } }),
  getRecommendations: (type) => axios.get(getApiUrl(`/social/recommendations/${type}`))
};

// Analytics API
export const analyticsAPI = {
  getStats: () => axios.get(getApiUrl('/analytics/stats')),
  exportData: () => axios.get(getApiUrl('/analytics/export'), { responseType: 'blob' })
};

// Attractions API
export const attractionsAPI = {
  getByCountry: (countryId) => axios.get(getApiUrl(`/attractions/country/${countryId}`)),
  add: (countryId, data) => axios.post(getApiUrl(`/attractions/country/${countryId}`), data),
  update: (countryId, attractionIndex, data) => 
    axios.put(getApiUrl(`/attractions/country/${countryId}/attraction/${attractionIndex}`), data),
  delete: (countryId, attractionIndex) => 
    axios.delete(getApiUrl(`/attractions/country/${countryId}/attraction/${attractionIndex}`)),
  addImage: (countryId, attractionIndex, formData) => 
    axios.post(getApiUrl(`/attractions/country/${countryId}/attraction/${attractionIndex}/image`), formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};

export default axios;
