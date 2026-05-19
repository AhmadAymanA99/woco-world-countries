import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { usersAPI } from "../utils/api";
import toast from "react-hot-toast";
import { MapPin, Calendar, Star, Camera, Plus, X, Trash2, Globe } from "lucide-react";
import WorldMap from "../components/WorldMap";
import { useTranslation } from "react-i18next";
import Skeleton from "../components/Skeleton";
import { fmtNum, localizeName, localizeContinent, formatDate } from '../utils/format';

const MyWorld = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showPhotoUpload, setShowPhotoUpload] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoCaption, setPhotoCaption] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    const { data: visitedCountries, isLoading } = useQuery("visited-countries", usersAPI.getVisitedCountries);

    const uploadPhotoMutation = useMutation(({ countryId, formData }) => usersAPI.uploadPhoto(countryId, formData), {
        onSuccess: () => {
            toast.success(t('myWorld.photoUploaded'));
            setShowPhotoUpload(false);
            setPhotoFile(null);
            setPhotoCaption("");
            queryClient.invalidateQueries("visited-countries");
        },
        onError: () => toast.error(t('myWorld.photoUploadError')),
    });

    const deletePhotoMutation = useMutation(({ countryId, photoIndex }) => usersAPI.deletePhoto(countryId, photoIndex), {
        onSuccess: () => {
            toast.success(t('myWorld.photoDeleted'));
            queryClient.invalidateQueries("visited-countries");
        },
        onError: () => toast.error(t('myWorld.photoDeleteError')),
    });

    const removeVisitedCountryMutation = useMutation((countryId) => usersAPI.removeVisitedCountry(countryId), {
        onSuccess: () => {
            toast.success(t('myWorld.countryRemoved'));
            queryClient.invalidateQueries("visited-countries");
        },
        onError: () => toast.error(t('myWorld.countryRemoveError')),
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
        if (window.confirm(t('myWorld.deletePhotoConfirm'))) {
            deletePhotoMutation.mutate({ countryId, photoIndex });
        }
    };

    const handleRemoveCountry = (countryId) => {
        if (window.confirm(t('myWorld.removeCountryConfirm'))) {
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
            <div className="flex justify-center items-center min-h-96 dark:bg-gray-700">
                <Skeleton variant="avatar" className="!h-32 !w-32" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("myWorld.title")}</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('myWorld.description')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                            <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalCountries}</div>
                    <div className="text-gray-600 dark:text-gray-400">{t("myWorld.countriesVisited")}</div>
                </div>

                <div className="card text-center">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.totalPhotos}</div>
                    <div className="text-gray-600 dark:text-gray-400">{t('myWorld.photosUploaded')}</div>
                </div>

                <div className="card text-center">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                            <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stats.averageRating.toFixed(1)}</div>
                    <div className="text-gray-600 dark:text-gray-400">{t('myWorld.averageRating')}</div>
                </div>
            </div>

            {/* World Map */}
            {visitedCountries?.data && visitedCountries.data.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('myWorld.travelMap')}</h2>
                <WorldMap visitedCountries={visitedCountries.data} height="500px" />
              </div>
            )}

            {/* Visited Countries */}
            {visitedCountries?.data?.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                        <MapPin className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('myWorld.noVisited')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('myWorld.noVisitedDesc')}</p>
                    <Link to="/countries" className="btn-primary">
                        {t('myWorld.exploreCountries')}
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('myWorld.visitedCountries')}</h2>

                    <div className="grid gap-6">
                        {visitedCountries?.data?.map((visit) => (
                            <div key={visit._id} className="card">
                                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:gap-6">
                                    {/* Country Info */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <img src={visit.country.flag} alt={t('myWorld.flagAlt', { name: visit.country.name })} className="w-16 h-12 object-cover rounded border shadow-sm dark:shadow-gray-900/50" />
                                        <div className="flex-1">
                                            <Link to={`/countries/${visit.country._id}`} className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                {localizeName(visit.country.name)}
                                            </Link>
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">{localizeContinent(visit.country.continent)}</p>

                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{formatDate(visit.visitDate)}</span>
                                                </div>
                                                {visit.duration && (
                                                    <div className="flex items-center gap-1">
                                                        <span>{fmtNum(visit.duration)} {t('common.days')}</span>
                                                    </div>
                                                )}
                                                {visit.rating && (
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                        <span>{visit.rating}/5</span>
                                                    </div>
                                                )}
                                            </div>

                                            {visit.cities?.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('myWorld.cities')}</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{visit.cities.join(", ")}</span>
                                                </div>
                                            )}

                                            {visit.activities?.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('myWorld.activities')}</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{visit.activities.join(", ")}</span>
                                                </div>
                                            )}

                                            {visit.notes && <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">{visit.notes}</p>}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => {
                                                setSelectedCountry(visit);
                                                setShowPhotoUpload(true);
                                            }}
                                            className="btn-outline flex items-center gap-1"
                                            disabled={visit.photos?.length >= 10}
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>{t('myWorld.addPhoto')}</span>
                                        </button>

                                        <button onClick={() => handleRemoveCountry(visit.country._id)} className="btn-secondary flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                                            <Trash2 className="h-4 w-4" />
                                            <span>{t('myWorld.remove')}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Photos */}
                                {visit.photos?.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                            <Camera className="h-5 w-5 me-2" />
                                            {t('myWorld.photosCount', { count: visit.photos.length })}
                                        </h3>

                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {visit.photos.map((photo, photoIndex) => (
                                                <div key={photoIndex} className="relative group">
                                                    <img src={photo.url} alt={photo.caption || t('myWorld.photoAlt')} className="w-full h-32 object-cover rounded-lg shadow-sm dark:shadow-gray-900/50 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handlePhotoClick(photo)} />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center pointer-events-none">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 pointer-events-auto">
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
                                                    {<p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">{photo.caption || ""}</p>}
                                                    <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(photo.uploadDate)}</p>
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
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('myWorld.addPhotoTo', { name: localizeName(selectedCountry.country.name) })}</h2>
                            <button
                                onClick={() => {
                                    setShowPhotoUpload(false);
                                    setPhotoFile(null);
                                    setPhotoCaption("");
                                }}
                                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handlePhotoUpload} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('myWorld.photoLabel')}</label>
                                <input type="file" accept="image/*" required onChange={(e) => setPhotoFile(e.target.files[0])} className="input-field" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('myWorld.caption')}</label>
                                <textarea value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} className="input-field" rows={3} placeholder={t('myWorld.captionPlaceholder')} />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPhotoUpload(false);
                                        setPhotoFile(null);
                                        setPhotoCaption("");
                                    }}
                                    className="btn-secondary"
                                >
                                    {t("common.cancel")}
                                </button>
                                <button type="submit" disabled={uploadPhotoMutation.isLoading || !photoFile} className="btn-primary">
                                    {uploadPhotoMutation.isLoading ? t('myWorld.uploading') : t('myWorld.uploadPhoto')}
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
                        <button onClick={() => setShowPhotoModal(false)} className="absolute top-4 end-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                        <img src={selectedPhoto.url} alt={selectedPhoto.caption || t('myWorld.photoAlt')} className="max-w-full max-h-full object-contain rounded-lg" />
                        {(selectedPhoto.caption || selectedPhoto.uploadDate) && (
                            <div className="absolute bottom-0 start-0 end-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                                <p className="text-sm">{selectedPhoto.caption || ""}</p>
                                <p className="text-xs text-gray-300 dark:text-gray-400 mt-1">{t('myWorld.uploadedOn', { date: formatDate(selectedPhoto.uploadDate) })}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyWorld;
