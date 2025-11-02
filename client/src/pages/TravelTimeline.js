import React from "react";
import { useQuery } from "react-query";
import { usersAPI } from "../utils/api";
import { Link } from "react-router-dom";
import { Calendar, Star, Camera } from "lucide-react";

const TravelTimeline = () => {
    const { data: visitedData, isLoading } = useQuery("visited-countries", usersAPI.getVisitedCountries);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const visitedCountries = visitedData?.data || [];
    const sortedVisits = [...visitedCountries].sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate));

    const groupedByYear = sortedVisits.reduce((acc, visit) => {
        const year = new Date(visit.visitDate).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(visit);
        return acc;
    }, {});

    const years = Object.keys(groupedByYear).sort((a, b) => b - a);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Timeline</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Your travel journey through time - relive your adventures chronologically.</p>
            </div>

            {sortedVisits.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No travels yet</h3>
                    <p className="text-gray-600 mb-6">Start exploring and add countries you've visited!</p>
                    <Link to="/countries" className="btn-primary">
                        Explore Countries
                    </Link>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

                    <div className="space-y-12">
                        {years.map((year) => (
                            <div key={year}>
                                <div className="sticky top-0 bg-gray-50 z-10 py-4 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
                                    <p className="text-sm text-gray-600">
                                        {groupedByYear[year].length} {groupedByYear[year].length === 1 ? "country" : "countries"} visited
                                    </p>
                                </div>

                                <div className="space-y-6 ml-8">
                                    {groupedByYear[year].map((visit, index) => (
                                        <div key={visit._id} className="relative">
                                            {/* Timeline dot */}
                                            <div className="absolute -left-11 top-6 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-md"></div>

                                            <div className="card hover:shadow-lg transition-shadow">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    {/* Flag and Country Info */}
                                                    <div className="flex items-start space-x-4 flex-1">
                                                        <img src={visit.country.flag} alt={visit.country.name} className="w-16 h-12 object-cover rounded border shadow-sm" />
                                                        <div className="flex-1">
                                                            <Link to={`/countries/${visit.country._id}`} className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                                                                {visit.country.name}
                                                            </Link>
                                                            <p className="text-gray-600 mb-2">{visit.country.continent}</p>

                                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3 flex-wrap">
                                                                <div className="flex items-center space-x-1">
                                                                    <Calendar className="h-4 w-4" />
                                                                    <span>{new Date(visit.visitDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
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
                                                                {visit.photos?.length > 0 && (
                                                                    <div className="flex items-center space-x-1">
                                                                        <Camera className="h-4 w-4" />
                                                                        <span>{visit.photos.length} photos</span>
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

                                                            {visit.notes && <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-2">{visit.notes}</p>}

                                                            {visit.photos?.length > 0 && (
                                                                <div className="mt-4 grid grid-cols-4 gap-2">
                                                                    {visit.photos.slice(0, 4).map((photo, photoIndex) => (
                                                                        <img key={photoIndex} src={photo.url} alt={photo.caption || "Travel photo"} className="w-full h-20 object-cover rounded-lg" />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelTimeline;
