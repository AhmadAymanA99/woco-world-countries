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
    axios.get(getApiUrl(`/countries/search/${query}`), { params: { limit } })
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
  addAuthHeader: (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  removeAuthHeader: () => {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default axios;
