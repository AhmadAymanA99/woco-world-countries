import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { countriesAPI } from "../utils/api";
import { Search, SortAsc, SortDesc, Grid, List, ArrowRight, Users, DollarSign } from "lucide-react";
import { SEO } from "../components/SEO";
import { useTranslation } from 'react-i18next';
import Skeleton from '../components/Skeleton';
import ErrorDisplay from '../components/ErrorDisplay';
import { fmtNum, localizeName, localizeContinent } from '../utils/format';

const Countries = () => {
    const { t, i18n } = useTranslation();
    const fmtNum = (num) => new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(num);

    const fmtAbbr = (num) => {
        if (i18n.language === 'ar') {
            if (num >= 1000000000) return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(num / 1000000000)} ${t('common.billion')}`;
            if (num >= 1000000) return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(num / 1000000)} ${t('common.million')}`;
            if (num >= 1000) return `${new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(num / 1000)} ${t('common.thousand')}`;
            return fmtNum(num);
        }
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `${Math.round(num / 1000000)}M`;
        if (num >= 1000) return `${Math.round(num / 1000)}K`;
        return fmtNum(num);
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const continentFromUrl = searchParams.get("continent");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContinent, setSelectedContinent] = useState(continentFromUrl || "all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewMode, setViewMode] = useState("grid");

    // Sync state with URL parameter
    useEffect(() => {
        if (continentFromUrl) {
            setSelectedContinent(continentFromUrl);
        } else {
            setSelectedContinent("all");
        }
    }, [continentFromUrl]);

    const { data: continentsData } = useQuery("continents", countriesAPI.getContinents);

    const { data: countriesData, isLoading, isError: countriesError, refetch: refetchCountries } = useQuery(["countries", selectedContinent, sortBy, sortOrder, searchTerm], () => {
        if (searchTerm) {
            return countriesAPI.search(searchTerm);
        }
        if (selectedContinent !== "all") {
            return countriesAPI.getByContinent(selectedContinent, { sortBy, sortOrder });
        }
        return countriesAPI.getAll({ continent: selectedContinent, sortBy, sortOrder });
    });

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const SortButton = ({ field, children }) => (
        <button onClick={() => handleSort(field)} className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${sortBy === field ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            <span>{children}</span>
            {sortBy === field && (sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
        </button>
    );

    const CountryCard = ({ country }) => (
        <Link to={`/countries/${country._id}`} className="card hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all hover:scale-105 group">
            <div className="flex items-start gap-4">
                <img src={country.flag} alt={t('countries.flagAlt', { name: country.name })} loading="lazy" className="w-16 h-12 object-cover rounded border shadow-sm dark:shadow-gray-900/50" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">{localizeName(country.name)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{localizeContinent(country.continent)}</p>
                    {country.capital && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('countries.capital')}: {country.capital}</p>}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {country.population?.total && (
                                <div className="flex items-center gap-1" title={t('countries.sortPopulation')}>
                                    <Users className="h-3 w-3" />
                                    <span>{fmtAbbr(country.population.total)}</span>
                                </div>
                            )}
                            {country.gdp?.total && (
                                <div className="flex items-center gap-1" title={t('countries.sortGdp')}>
                                <DollarSign className="h-3 w-3" />
                                <span>{fmtAbbr(country.gdp.total)}</span>
                            </div>
                        )}
                    </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 rtl:rotate-180" />
            </div>
        </Link>
    );

    const CountryListItem = ({ country }) => (
        <Link to={`/countries/${country._id}`} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md dark:hover:shadow-gray-900/50 transition-all group gap-3">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <img src={country.flag} alt={t('countries.flagAlt', { name: country.name })} loading="lazy" className="w-12 h-8 object-cover rounded border flex-shrink-0" />
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">{localizeName(country.name)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{localizeContinent(country.continent)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap justify-end">
                {country.capital && <span className="whitespace-nowrap">{country.capital}</span>}
                {country.population?.total && <span className="whitespace-nowrap">{fmtAbbr(country.population.total)}</span>}
                {country.gdp?.total && <span className="whitespace-nowrap">${fmtAbbr(country.gdp.total)}</span>}
                <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 rtl:rotate-180" />
            </div>
        </Link>
    );

    return (
        <div className="space-y-6">
            <SEO 
                title={t('seo.countriesTitle')}
                description={t('countries.seoDescription')}
                keywords={`countries, ${selectedContinent !== 'all' ? selectedContinent : ''}, world map, population, GDP, travel, ${searchTerm}`}
                url={`/countries${searchParams.toString() ? `?${searchParams}` : ''}`}
            />
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('countries.title')}</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('countries.description')}</p>
            </div>

            {/* Filters and Search */}
            <div className="card">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <input type="text" placeholder={t('countries.searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field ps-10" />
                        </div>
                    </div>

                    {/* Continent Filter */}
                    <div className="lg:w-48">
                        <select
                            value={selectedContinent}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedContinent(value);
                                if (value === "all") {
                                    searchParams.delete("continent");
                                } else {
                                    searchParams.set("continent", value);
                                }
                                setSearchParams(searchParams);
                            }}
                            className="input-field"
                        >
                            <option value="all">{t('countries.allContinents')}</option>
                            {continentsData?.data.map((continent) => (
                                <option key={continent} value={continent}>
                                    {localizeContinent(continent)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4">
                        <SortButton field="name">{t('countries.sortName')}</SortButton>
                        <SortButton field="continent">{t('countries.sortContinent')}</SortButton>
                        <SortButton field="population">{t('countries.sortPopulation')}</SortButton>
                        <SortButton field="gdp">{t('countries.sortGdp')}</SortButton>
                    </div>

                    {/* View Mode */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                            <Grid className="h-4 w-4" />
                        </button>
                        <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
                {!isLoading && (
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('countries.resultsFound', { count: fmtNum(countriesData?.data.total || 0) })}</h2>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-600">
                                {t('countries.clearSearch')}
                            </button>
                        )}
                    </div>
                )}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12 dark:bg-gray-700">
                        <Skeleton variant="avatar" />
                    </div>
                ) : countriesError ? (
                    <ErrorDisplay onRetry={refetchCountries} />
                ) : countriesData?.data.countries.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('countries.noResults')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('countries.adjustSearch')}</p>
                    </div>
                ) : (
                    <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
                        {countriesData?.data.countries.map((country) => (viewMode === "grid" ? <CountryCard key={country._id} country={country} /> : <CountryListItem key={country._id} country={country} />))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Countries;
