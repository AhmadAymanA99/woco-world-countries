import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { usersAPI } from "../utils/api";
import toast from "react-hot-toast";
import { MapPin, Calendar, Star, Camera, Plus, X, Trash2, Globe } from "lucide-react";
import WorldMap from "../components/WorldMap";

const MyWorld = () => {
    const queryClient = useQueryClient();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showPhotoUpload, setShowPhotoUpload] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoCaption, setPhotoCaption] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    const { data: visitedCountries, isLoading } = useQuery("visited-countries", usersAPI.getVisitedCountries);

    const uploadPhotoMutation = useMutation(({ countryId, formData }) => usersAPI.uploadPhoto(countryId, formData), {
        onSuccess: () => {
            toast.success("Photo uploaded successfully!");
            setShowPhotoUpload(false);
            setPhotoFile(null);
            setPhotoCaption("");
            queryClient.invalidateQueries("visited-countries");
        },
        onError: () => toast.error("Failed to upload photo"),
    });

    const deletePhotoMutation = useMutation(({ countryId, photoIndex }) => usersAPI.deletePhoto(countryId, photoIndex), {
        onSuccess: () => {
            toast.success("Photo deleted successfully!");
            queryClient.invalidateQueries("visited-countries");
        },
        onError: () => toast.error("Failed to delete photo"),
    });

    const removeVisitedCountryMutation = useMutation((countryId) => usersAPI.removeVisitedCountry(countryId), {
        onSuccess: () => {
            toast.success("Country removed from visited list!");
            queryClient.invalidateQueries("visited-countries");
        },
        onError: () => toast.error("Failed to remove country"),
    });

    const handlePhotoUpload = (e) => {
        e.preventDefault();
        if (!photoFile || !selectedCountry) return;

        const formData = new FormData();
        formData.append("photo", photoFile);
        formData.append("caption", photoCaption);

        uploadPhotoMutation.mutate({
            countryId: selectedCountry.country._id,
            formData,
        });
    };

    const handleDeletePhoto = (countryId, photoIndex) => {
        if (window.confirm("Are you sure you want to delete this photo?")) {
            deletePhotoMutation.mutate({ countryId, photoIndex });
        }
    };

    const handleRemoveCountry = (countryId) => {
        if (window.confirm("Are you sure you want to remove this country from your visited list?")) {
            removeVisitedCountryMutation.mutate(countryId);
        }
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setShowPhotoModal(true);
    };

    const getStats = () => {
        if (!visitedCountries?.data) return { totalCountries: 0, totalPhotos: 0, averageRating: 0 };

        const totalCountries = visitedCountries.data.length;
        const totalPhotos = visitedCountries.data.reduce((sum, visit) => sum + (visit.photos?.length || 0), 0);
        const averageRating = visitedCountries.data.reduce((sum, visit) => sum + (visit.rating || 0), 0) / totalCountries;

        return { totalCountries, totalPhotos, averageRating: averageRating || 0 };
    };

    const stats = getStats();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">My World</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Track your travels, upload photos, and relive your adventures around the world.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-primary-100 rounded-full">
                            <Globe className="h-6 w-6 text-primary-600" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalCountries}</div>
                    <div className="text-gray-600">Countries Visited</div>
                </div>

                <div className="card text-center">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Camera className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalPhotos}</div>
                    <div className="text-gray-600">Photos Uploaded</div>
                </div>

                <div className="card text-center">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Star className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.averageRating.toFixed(1)}</div>
                    <div className="text-gray-600">Average Rating</div>
                </div>
            </div>

            {/* World Map */}
            {visitedCountries?.data && visitedCountries.data.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Travel Map</h2>
                <WorldMap visitedCountries={visitedCountries.data} height="500px" />
              </div>
            )}

            {/* Visited Countries */}
            {visitedCountries?.data?.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <MapPin className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No countries visited yet</h3>
                    <p className="text-gray-600 mb-6">Start exploring the world and mark countries as visited!</p>
                    <Link to="/countries" className="btn-primary">
                        Explore Countries
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Your Visited Countries</h2>

                    <div className="grid gap-6">
                        {visitedCountries?.data?.map((visit) => (
                            <div key={visit._id} className="card">
                                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                                    {/* Country Info */}
                                    <div className="flex items-start space-x-4 flex-1">
                                        <img src={visit.country.flag} alt={`${visit.country.name} flag`} className="w-16 h-12 object-cover rounded border shadow-sm" />
                                        <div className="flex-1">
                                            <Link to={`/countries/${visit.country._id}`} className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                                                {visit.country.name}
                                            </Link>
                                            <p className="text-gray-600 mb-2">{visit.country.continent}</p>

                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(visit.visitDate).toLocaleDateString("en-GB")}</span>
                                                </div>
                                                {visit.duration && (
                                                    <div className="flex items-center space-x-1">
                                                        <span>{visit.duration} days</span>
                                                    </div>
                                                )}
                                                {visit.rating && (
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                        <span>{visit.rating}/5</span>
                                                    </div>
                                                )}
                                            </div>

                                            {visit.cities?.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Cities: </span>
                                                    <span className="text-sm text-gray-600">{visit.cities.join(", ")}</span>
                                                </div>
                                            )}

                                            {visit.activities?.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-sm font-medium text-gray-700">Activities: </span>
                                                    <span className="text-sm text-gray-600">{visit.activities.join(", ")}</span>
                                                </div>
                                            )}

                                            {visit.notes && <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{visit.notes}</p>}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => {
                                                setSelectedCountry(visit);
                                                setShowPhotoUpload(true);
                                            }}
                                            className="btn-outline flex items-center space-x-1"
                                            disabled={visit.photos?.length >= 10}
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Add Photo</span>
                                        </button>

                                        <button onClick={() => handleRemoveCountry(visit.country._id)} className="btn-secondary flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Photos */}
                                {visit.photos?.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <Camera className="h-5 w-5 mr-2" />
                                            Photos ({visit.photos.length}/10)
                                        </h3>

                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {visit.photos.map((photo, photoIndex) => (
                                                <div key={photoIndex} className="relative group">
                                                    <img src={photo.url} alt={photo.caption || "Travel photo"} className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handlePhotoClick(photo)} />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center pointer-events-none">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 pointer-events-auto">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeletePhoto(visit.country._id, photoIndex);
                                                                }}
                                                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {<p className="text-xs text-gray-600 mt-1 truncate">{photo.caption || ""}</p>}
                                                    <p className="text-xs text-gray-400">{new Date(photo.uploadDate).toLocaleDateString("en-GB")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Photo Upload Modal */}
            {showPhotoUpload && selectedCountry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 !mt-0">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Add Photo to {selectedCountry.country.name}</h2>
                            <button
                                onClick={() => {
                                    setShowPhotoUpload(false);
                                    setPhotoFile(null);
                                    setPhotoCaption("");
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handlePhotoUpload} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo *</label>
                                <input type="file" accept="image/*" required onChange={(e) => setPhotoFile(e.target.files[0])} className="input-field" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                                <textarea value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} className="input-field" rows={3} placeholder="Describe this photo..." />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPhotoUpload(false);
                                        setPhotoFile(null);
                                        setPhotoCaption("");
                                    }}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" disabled={uploadPhotoMutation.isLoading || !photoFile} className="btn-primary">
                                    {uploadPhotoMutation.isLoading ? "Uploading..." : "Upload Photo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Photo Modal */}
            {showPhotoModal && selectedPhoto && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 !mt-0" onClick={() => setShowPhotoModal(false)}>
                    <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowPhotoModal(false)} className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                        <img src={selectedPhoto.url} alt={selectedPhoto.caption || "Travel photo"} className="max-w-full max-h-full object-contain rounded-lg" />
                        {(selectedPhoto.caption || selectedPhoto.uploadDate) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                                <p className="text-sm">{selectedPhoto.caption || ""}</p>
                                <p className="text-xs text-gray-300 mt-1">Uploaded on {new Date(selectedPhoto.uploadDate).toLocaleDateString("en-GB")}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyWorld;
