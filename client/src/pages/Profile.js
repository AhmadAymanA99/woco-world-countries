import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Settings, Heart, Trash2, AlertTriangle } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/format';

const Profile = () => {
    const { t } = useTranslation();
    const { user, updateProfile, deleteAccount } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        preferences: user?.preferences || {
            interests: [],
            travelStyle: "mixed",
            accommodation: "mixed",
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("preferences.")) {
            const prefKey = name.split(".")[1];
            setFormData({
                ...formData,
                preferences: {
                    ...formData.preferences,
                    [prefKey]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await updateProfile(formData);

        if (result.success) {
            setIsEditing(false);
        }

        setIsLoading(false);
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            username: user?.username || "",
            preferences: user?.preferences || {
                interests: [],
                travelStyle: "mixed",
                accommodation: "mixed",
            },
        });
        setIsEditing(false);
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== t('profile.deleteConfirmToken')) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteAccount();
        setIsDeleting(false);

        if (result.success) {
            setShowDeleteModal(false);
            navigate("/");
        }
    };

    if (!user) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('profile.loginRequired')}</h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('profile.title')}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t('profile.description')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                                <User className="h-6 w-6 me-2" />
                                {t('profile.personalInfo')}
                            </h2>
                            <button onClick={() => setIsEditing(!isEditing)} className="btn-outline flex items-center gap-1">
                                <Settings className="h-4 w-4" />
                                <span>{isEditing ? t('common.cancel') : t('common.edit')}</span>
                            </button>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.firstName')}</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.lastName')}</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.username')}</label>
                                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="input-field" required />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button type="button" onClick={handleCancel} className="btn-secondary">
                                        {t('common.cancel')}
                                    </button>
                                    <button type="submit" disabled={isLoading} className="btn-primary">
                                        {isLoading ? t('profile.updating') : t('profile.updateProfile')}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.firstName')}</label>
                                        <p className="text-gray-900 dark:text-gray-100">{user.firstName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.lastName')}</label>
                                        <p className="text-gray-900 dark:text-gray-100">{user.lastName}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.username')}</label>
                                    <p className="text-gray-900 dark:text-gray-100">{user.username}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.email')}</label>
                                    <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Travel Preferences */}
                    <div className="card">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <MapPin className="h-6 w-6 me-2" />
                            {t('profile.travelPreferences')}
                        </h2>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.travelStyle')}</label>
                                    <select name="preferences.travelStyle" value={formData.preferences.travelStyle} onChange={handleChange} className="input-field">
                                        <option value="budget">{t('profile.travelStyleBudget')}</option>
                                        <option value="luxury">{t('profile.travelStyleLuxury')}</option>
                                        <option value="adventure">{t('profile.travelStyleAdventure')}</option>
                                        <option value="cultural">{t('profile.travelStyleCultural')}</option>
                                        <option value="relaxation">{t('profile.travelStyleRelaxation')}</option>
                                        <option value="mixed">{t('profile.travelStyleMixed')}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.accommodation')}</label>
                                    <select name="preferences.accommodation" value={formData.preferences.accommodation} onChange={handleChange} className="input-field">
                                        <option value="hotel">{t('profile.accommodationHotel')}</option>
                                        <option value="hostel">{t('profile.accommodationHostel')}</option>
                                        <option value="airbnb">{t('profile.accommodationAirbnb')}</option>
                                        <option value="camping">{t('profile.accommodationCamping')}</option>
                                        <option value="mixed">{t('profile.accommodationMixed')}</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.travelStyle')}</label>
                                    <p className="text-gray-900 dark:text-gray-100 capitalize">{user.preferences?.travelStyle || t('profile.notSpecified')}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('profile.accommodation')}</label>
                                    <p className="text-gray-900 dark:text-gray-100 capitalize">{user.preferences?.accommodation || t('profile.notSpecified')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Account Stats */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('profile.accountStats')}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('profile.memberSince')}</span>
                                <span className="text-gray-900 dark:text-gray-100">
                                    {user.createdAt 
                                      ? formatDate(user.createdAt)
                                      : t('common.notAvailable', 'N/A')}
                                </span>
                            </div>
                            {user.lastLogin && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">{t('profile.lastLogin')}</span>
                                    <span className="text-gray-900 dark:text-gray-100">
                                        {user.lastLogin 
                                          ? formatDate(user.lastLogin)
                                          : t('common.notAvailable', 'N/A')}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('profile.countriesVisited')}</span>
                                <span className="text-gray-900 dark:text-gray-100">{user.visitedCountries?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('profile.wishlistItems')}</span>
                                <span className="text-gray-900 dark:text-gray-100">{user.wishlist?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('profile.quickActions')}</h3>
                        <div className="space-y-3">
                            <a href="/my-world" className="block w-full text-start px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <MapPin className="h-4 w-4 inline me-2" />
                                {t('profile.viewMyWorld')}
                            </a>
                            <a href="/countries" className="block w-full text-start px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <Heart className="h-4 w-4 inline me-2" />
                                {t('profile.exploreCountries')}
                            </a>
                        </div>
                    </div>

                    {/* Delete Account */}
                    <div className="card border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center">
                            <AlertTriangle className="h-5 w-5 me-2" />
                            {t('profile.dangerZone')}
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                            {t('profile.dangerZoneDesc')}
                        </p>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn-outline border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-400 dark:hover:border-red-500 flex items-center gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>{t('profile.deleteAccount')}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t('profile.deleteAccount')}</h3>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-gray-700 dark:text-gray-300">
                                {t('profile.deleteConfirmMessage')}
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ms-2">
                                <li>{t('profile.deleteItemProfile')}</li>
                                <li>{t('profile.deleteItemTrips')}</li>
                                <li>{t('profile.deleteItemCollections')}</li>
                                <li>{t('profile.deleteItemStories')}</li>
                                <li>{t('profile.deleteItemCountries')}</li>
                                <li>{t('profile.deleteItemSocial')}</li>
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 mt-4">
                                {t('profile.deleteConfirmInstruction')}
                            </p>
                        </div>

                        <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder={t('profile.deleteConfirmPlaceholder')}
                            className="input-field w-full"
                            autoFocus
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirmText("");
                                }}
                                className="btn-secondary"
                                disabled={isDeleting}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== t('profile.deleteConfirmToken') || isDeleting}
                                className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <span>{t('profile.deleting')}</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4" />
                                        <span>{t('profile.deleteAccount')}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
