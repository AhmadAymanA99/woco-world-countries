import React from "react";
import { useTranslation } from 'react-i18next';
import { useQuery } from "react-query";
import { usersAPI } from "../utils/api";
import Skeleton from "../components/Skeleton";
import { Link } from "react-router-dom";
import { Calendar, Star, Camera } from "lucide-react";
import { fmtNum, localizeName, localizeContinent, formatDate } from '../utils/format';

const TravelTimeline = () => {
    const { t } = useTranslation();
    const { data: visitedData, isLoading } = useQuery("visited-countries", usersAPI.getVisitedCountries);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-96 dark:bg-gray-700">
                <Skeleton variant="avatar" className="!h-32 !w-32" />
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
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('timeline.title')}</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('timeline.description')}</p>
            </div>

            {sortedVisits.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('timeline.noTravels')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('timeline.noTravelsDesc')}</p>
                    <Link to="/countries" className="btn-primary">
                        {t('timeline.exploreCountries')}
                    </Link>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>

                    <div className="space-y-12">
                        {years.map((year) => (
                            <div key={year}>
                                <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 py-4 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{year}</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {t('timeline.countryCount', { count: groupedByYear[year].length })}
                                    </p>
                                </div>

                                <div className="space-y-6 ms-8">
                                    {groupedByYear[year].map((visit, index) => (
                                        <div key={visit._id} className="relative">
                                            {/* Timeline dot */}
                                            <div className="absolute -start-11 top-6 w-6 h-6 bg-primary-600 dark:bg-primary-500 rounded-full border-4 border-white dark:border-gray-800 shadow-md dark:shadow-gray-900/50"></div>

                                            <div className="card hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    {/* Flag and Country Info */}
                                                    <div className="flex items-start gap-4 flex-1">
                                                        <img src={visit.country.flag} alt={localizeName(visit.country.name)} className="w-16 h-12 object-cover rounded border shadow-sm dark:shadow-gray-900/50" />
                                                        <div className="flex-1">
                                                            <Link to={`/countries/${visit.country._id}`} className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                                {localizeName(visit.country.name)}
                                                            </Link>
                                                            <p className="text-gray-600 dark:text-gray-400 mb-2">{localizeContinent(visit.country.continent)}</p>

                                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
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
                                                                {visit.photos?.length > 0 && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Camera className="h-4 w-4" />
                                                                        <span>{t('timeline.photosCount', { count: visit.photos.length })}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {visit.cities?.length > 0 && (
                                                                <div className="mb-2">
                                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('timeline.cities')}</span>
                                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{visit.cities.join(", ")}</span>
                                                                </div>
                                                            )}

                                                            {visit.activities?.length > 0 && (
                                                                <div className="mb-2">
                                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('timeline.activities')}</span>
                                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{visit.activities.join(", ")}</span>
                                                                </div>
                                                            )}

                                                            {visit.notes && <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mt-2">{visit.notes}</p>}

                                                            {visit.photos?.length > 0 && (
                                                                <div className="mt-4 grid grid-cols-4 gap-2">
                                                                    {visit.photos.slice(0, 4).map((photo, photoIndex) => (
                                                                        <img key={photoIndex} src={photo.url} alt={photo.caption || t('timeline.photoAlt')} className="w-full h-20 object-cover rounded-lg" />
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
