import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { storiesAPI, countriesAPI, usersAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, Save, Globe, EyeOff, Users, Tag, X } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CreateStory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        countryId: "",
        excerpt: "",
        tags: [],
        visibility: "public",
    });

    const [tagInput, setTagInput] = useState("");

    // Get visited countries for selection
    const { data: visitedData } = useQuery("visited-countries", usersAPI.getVisitedCountries, {
        enabled: !!user,
    });

    // Search countries
    const [countrySearch, setCountrySearch] = useState("");
    const { data: countriesData } = useQuery(["countries-search", countrySearch], () => countriesAPI.search(countrySearch, 10), { enabled: countrySearch.length > 0 });

    const createMutation = useMutation(storiesAPI.create, {
        onSuccess: (data) => {
            toast.success("Story created successfully!");
            queryClient.invalidateQueries("stories");
            navigate(`/stories/${data.data._id}`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create story");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        if (!formData.content.trim() || formData.content === "<p><br></p>") {
            toast.error("Please enter story content");
            return;
        }

        if (!formData.countryId) {
            toast.error("Please select a country");
            return;
        }

        // Auto-generate excerpt if not provided
        const excerpt = formData.excerpt || formData.content.replace(/<[^>]*>/g, "").substring(0, 300);

        createMutation.mutate({
            ...formData,
            excerpt,
        });
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()],
            });
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t !== tag),
        });
    };

    const handleContentChange = (content) => {
        setFormData({ ...formData, content });
        // Auto-generate excerpt from first 300 characters of plain text
        if (!formData.excerpt) {
            const plainText = content.replace(/<[^>]*>/g, "");
            if (plainText.length > 300) {
                setFormData((prev) => ({ ...prev, content, excerpt: plainText.substring(0, 300) }));
            } else {
                setFormData({ ...formData, content });
            }
        } else {
            setFormData({ ...formData, content });
        }
    };

    const visitedCountries = visitedData?.data || [];
    const searchResults = countriesData?.data?.countries || [];

    const modules = {
        toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], [{ color: [] }, { background: [] }], ["link", "image"], ["clean"]],
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link to="/stories" className="text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Write Your Story</h1>
                    <p className="text-gray-600 mt-1">Share your travel experience with the world</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="card">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Title *</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter a captivating title for your story..." className="input-field text-xl font-semibold" maxLength={200} />
                    <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
                </div>

                {/* Country Selection */}
                <div className="card">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>

                    {/* Visited Countries Quick Select */}
                    {visitedCountries.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Quick select from your visited countries:</p>
                            <div className="flex flex-wrap gap-2">
                                {visitedCountries.map((visit) => (
                                    <button
                                        key={visit._id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, countryId: visit.country._id })}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${formData.countryId === visit.country._id ? "bg-primary-100 border-primary-500 text-primary-700" : "bg-white border-gray-300 hover:border-primary-400"}`}
                                    >
                                        <img src={visit.country.flag} alt={visit.country.name} className="w-5 h-4 object-cover rounded" />
                                        <span className="text-sm font-medium">{visit.country.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Country Search */}
                    <div className="relative">
                        <input type="text" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} placeholder="Or search for any country..." className="input-field" />
                        {searchResults.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {searchResults.map((country) => (
                                    <button
                                        key={country._id}
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, countryId: country._id });
                                            setCountrySearch("");
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded" />
                                        <span>{country.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {formData.countryId && visitedCountries.find((v) => v.country._id === formData.countryId) && (
                        <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                            <p className="text-sm text-primary-700">
                                <span className="font-medium">Tip:</span> You can link this story to a specific visit from your travel history.
                            </p>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="card">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Story Content *</label>
                    <ReactQuill theme="snow" value={formData.content} onChange={handleContentChange} modules={modules} placeholder="Write your travel story here..." className="bg-white" style={{ minHeight: "400px" }} />
                </div>

                {/* Excerpt */}
                <div className="card">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Excerpt (Optional)</label>
                    <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="A brief summary that will appear in story listings..." className="input-field" rows={3} maxLength={300} />
                    <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 characters. If left empty, will be auto-generated from content.</p>
                </div>

                {/* Tags */}
                <div className="card">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex gap-2 mb-3">
                        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())} placeholder="Add tags (press Enter)" className="input-field flex-1" />
                        <button type="button" onClick={handleAddTag} className="btn-outline flex items-center space-x-1">
                            <Tag className="h-4 w-4" />
                            <span>Add</span>
                        </button>
                    </div>
                    {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                                    <span>{tag}</span>
                                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-primary-900">
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Visibility */}
                <div className="card">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, visibility: "public" })}
                            className={`p-4 rounded-lg border-2 transition-all ${formData.visibility === "public" ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}
                        >
                            <Globe className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                            <p className="font-medium text-gray-900">Public</p>
                            <p className="text-xs text-gray-500 mt-1">Visible to everyone</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, visibility: "friends" })}
                            className={`p-4 rounded-lg border-2 transition-all ${formData.visibility === "friends" ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}
                        >
                            <Users className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                            <p className="font-medium text-gray-900">Friends</p>
                            <p className="text-xs text-gray-500 mt-1">Visible to followers</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, visibility: "private" })}
                            className={`p-4 rounded-lg border-2 transition-all ${formData.visibility === "private" ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}
                        >
                            <EyeOff className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                            <p className="font-medium text-gray-900">Private</p>
                            <p className="text-xs text-gray-500 mt-1">Only visible to you</p>
                        </button>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-3">
                    <Link to="/stories" className="btn-secondary">
                        Cancel
                    </Link>
                    <button type="submit" disabled={createMutation.isLoading} className="btn-primary flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>{createMutation.isLoading ? "Publishing..." : "Publish Story"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateStory;
