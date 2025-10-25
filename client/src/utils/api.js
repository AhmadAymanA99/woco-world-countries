import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Countries API
export const countriesAPI = {
  getAll: (params = {}) => axios.get(`${API_BASE_URL}/countries`, { params }),
  getById: (id) => axios.get(`${API_BASE_URL}/countries/${id}`),
  getByContinent: (continent, params = {}) => 
    axios.get(`${API_BASE_URL}/countries/continent/${continent}`, { params }),
  getContinents: () => axios.get(`${API_BASE_URL}/countries/meta/continents`),
  search: (query, limit = 20) => 
    axios.get(`${API_BASE_URL}/countries/search/${query}`, { params: { limit } })
};

// Users API
export const usersAPI = {
  getVisitedCountries: () => axios.get(`${API_BASE_URL}/users/visited-countries`),
  addVisitedCountry: (data) => axios.post(`${API_BASE_URL}/users/visited-countries`, data),
  updateVisitedCountry: (countryId, data) => 
    axios.put(`${API_BASE_URL}/users/visited-countries/${countryId}`, data),
  removeVisitedCountry: (countryId) => 
    axios.delete(`${API_BASE_URL}/users/visited-countries/${countryId}`),
  uploadPhoto: (countryId, formData) => 
    axios.post(`${API_BASE_URL}/users/visited-countries/${countryId}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  deletePhoto: (countryId, photoIndex) => 
    axios.delete(`${API_BASE_URL}/users/visited-countries/${countryId}/photos/${photoIndex}`),
  getWishlist: () => axios.get(`${API_BASE_URL}/users/wishlist`),
  addToWishlist: (countryId) => axios.post(`${API_BASE_URL}/users/wishlist/${countryId}`),
  removeFromWishlist: (countryId) => axios.delete(`${API_BASE_URL}/users/wishlist/${countryId}`)
};

// Auth API
export const authAPI = {
  login: (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials),
  register: (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData),
  getMe: () => axios.get(`${API_BASE_URL}/auth/me`),
  updateProfile: (profileData) => axios.put(`${API_BASE_URL}/auth/profile`, profileData)
};

export default axios;
