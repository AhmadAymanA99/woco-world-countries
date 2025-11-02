import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Settings, Heart, Trash2, AlertTriangle } from "lucide-react";

const Profile = () => {
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
        if (deleteConfirmText !== "DELETE") {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
                <p className="text-gray-600">Manage your account settings and travel preferences</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <User className="h-6 w-6 mr-2" />
                                Basic Information
                            </h2>
                            <button onClick={() => setIsEditing(!isEditing)} className="btn-outline flex items-center space-x-1">
                                <Settings className="h-4 w-4" />
                                <span>{isEditing ? "Cancel" : "Edit"}</span>
                            </button>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="input-field" required />
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button type="button" onClick={handleCancel} className="btn-secondary">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isLoading} className="btn-primary">
                                        {isLoading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <p className="text-gray-900">{user.firstName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <p className="text-gray-900">{user.lastName}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <p className="text-gray-900">{user.username}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="text-gray-900">{user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Travel Preferences */}
                    <div className="card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <MapPin className="h-6 w-6 mr-2" />
                            Travel Preferences
                        </h2>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
                                    <select name="preferences.travelStyle" value={formData.preferences.travelStyle} onChange={handleChange} className="input-field">
                                        <option value="budget">Budget</option>
                                        <option value="luxury">Luxury</option>
                                        <option value="adventure">Adventure</option>
                                        <option value="cultural">Cultural</option>
                                        <option value="relaxation">Relaxation</option>
                                        <option value="mixed">Mixed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Accommodation</label>
                                    <select name="preferences.accommodation" value={formData.preferences.accommodation} onChange={handleChange} className="input-field">
                                        <option value="hotel">Hotel</option>
                                        <option value="hostel">Hostel</option>
                                        <option value="airbnb">Airbnb</option>
                                        <option value="camping">Camping</option>
                                        <option value="mixed">Mixed</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
                                    <p className="text-gray-900 capitalize">{user.preferences?.travelStyle || "Not specified"}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Accommodation</label>
                                    <p className="text-gray-900 capitalize">{user.preferences?.accommodation || "Not specified"}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Account Stats */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Member since</span>
                                <span className="text-gray-900">
                                    {user.createdAt 
                                      ? new Date(user.createdAt).toLocaleDateString('en-GB', { 
                                          year: 'numeric', 
                                          month: 'short', 
                                          day: 'numeric' 
                                        })
                                      : 'N/A'}
                                </span>
                            </div>
                            {user.lastLogin && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last login</span>
                                    <span className="text-gray-900">
                                        {user.lastLogin 
                                          ? new Date(user.lastLogin).toLocaleDateString('en-GB', { 
                                              year: 'numeric', 
                                              month: 'short', 
                                              day: 'numeric' 
                                            })
                                          : 'N/A'}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Countries visited</span>
                                <span className="text-gray-900">{user.visitedCountries?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Wishlist items</span>
                                <span className="text-gray-900">{user.wishlist?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <a href="/my-world" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <MapPin className="h-4 w-4 inline mr-2" />
                                View My World
                            </a>
                            <a href="/countries" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <Heart className="h-4 w-4 inline mr-2" />
                                Explore Countries
                            </a>
                        </div>
                    </div>

                    {/* Delete Account */}
                    <div className="card border-red-200 bg-red-50">
                        <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Danger Zone
                        </h3>
                        <p className="text-sm text-red-700 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn-outline border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 flex items-center space-x-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete Account</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-red-100 p-2 rounded-full">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Delete Account</h3>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                This action cannot be undone. This will permanently delete your account and remove all associated data including:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
                                <li>Your profile and personal information</li>
                                <li>All your trips and travel plans</li>
                                <li>All your collections</li>
                                <li>All your stories and posts</li>
                                <li>Your visited countries and wishlist</li>
                                <li>All your social connections</li>
                            </ul>
                            <p className="text-gray-700 mt-4">
                                To confirm, please type <strong className="text-red-600">DELETE</strong> in the box below:
                            </p>
                        </div>

                        <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="Type DELETE to confirm"
                            className="input-field w-full"
                            autoFocus
                        />

                        <div className="flex justify-end space-x-3 pt-2">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirmText("");
                                }}
                                className="btn-secondary"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4" />
                                        <span>Delete Account</span>
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
