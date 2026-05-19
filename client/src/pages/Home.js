import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { countriesAPI } from "../utils/api";
import { Globe, MapPin, Users, Star, ArrowRight, Heart } from "lucide-react";
import { SEO } from "../components/SEO";
import { useTranslation, Trans } from 'react-i18next';
import { fmtNum, fmtAbbr, localizeName, localizeContinent } from '../utils/format';
import ErrorDisplay from '../components/ErrorDisplay';

const Home = () => {
    const { t } = useTranslation();
    const { data: continentsData, isError: continentsError, refetch: refetchContinents } = useQuery("continents", countriesAPI.getContinents);
    const { data: countriesData, isError: countriesError, refetch: refetchCountries } = useQuery("featured-countries", () => countriesAPI.getAll({ limit: 6, sortBy: "population", sortOrder: "desc" }));

    const features = [
        {
            icon: Globe,
            title: t('home.feature1Title'),
            description: t('home.feature1Desc'),
            color: "text-primary-600",
            link: "/countries",
        },
        {
            icon: MapPin,
            title: t('home.feature2Title'),
            description: t('home.feature2Desc'),
            color: "text-green-600",
            link: "/my-world",
        },
        {
            icon: Heart,
            title: t('home.feature3Title'),
            description: t('home.feature3Desc'),
            color: "text-red-600",
            link: "/profile",
        },
    ];

    const stats = [
        { label: t('home.statCountries'), value: `${fmtNum(195)}+`, icon: Globe },
        { label: t('home.statContinents'), value: fmtNum(7), icon: MapPin },
        { label: t('home.statUsers'), value: `${fmtAbbr(1000)}+`, icon: Users },
        { label: t('home.statMemories'), value: `${fmtAbbr(10000)}+`, icon: Star },
    ];

    const getContinentEmoji = (continent) => {
        const emojiMap = {
            Africa: "🌍",
            Asia: "🌏",
            Europe: "🌍",
            "North America": "🌎",
            "South America": "🌎",
            Oceania: "🌏",
        };
        return emojiMap[continent] || "";
    };

    return (
        <div className="space-y-16">
            <SEO 
                title={t('seo.homeTitle')}
                description={t('seo.homeDescription')}
                keywords="countries, world countries, travel tracker, country information, world map, population, GDP, landmarks, cultures, traditions"
                url="/"
            />
            {/* Hero Section */}
            <section className="text-center py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        <Trans i18nKey="home.heroTitle" components={{ gradient: <span className="text-gradient" /> }} />
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">{t('home.heroSubtitle')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/countries" className="btn-primary text-lg px-8 py-3">
                            {t('home.heroExploreBtn')}
                        </Link>
                        <Link to="/register" className="btn-outline text-lg px-8 py-3">
                            {t('home.heroStartBtn')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(({ label, value, icon: Icon }) => (
                        <article key={label} className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full" role="img" aria-label={label}>
                                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{value}</div>
                            <div className="text-gray-600 dark:text-gray-400">{label}</div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('home.featuresTitle')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('home.featuresDesc')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map(({ icon: Icon, title, description, color, link }) => (
                        <Link key={title} to={link} className="card text-center hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all hover:scale-105 group">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    <Icon className={`h-8 w-8 ${color}`} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>
                            <div className="flex items-center justify-center mt-3 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm">{t('nav.explore')}</span>
                                <ArrowRight className="h-4 w-4 ms-1 rtl:rotate-180" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Continents Section */}
            {continentsError ? (
                <ErrorDisplay onRetry={refetchContinents} />
            ) : continentsData && (
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('home.continentsTitle')}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t('home.continentsDesc')}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {continentsData.data.map((continent) => (
                            <Link key={continent} to={`/countries?continent=${continent}`} className="card hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all hover:scale-105 text-center group">
                                <div className="text-2xl mb-2">{getContinentEmoji(continent)}</div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{localizeContinent(continent)}</h3>
                                <div className="flex items-center justify-center mt-2 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-sm">{t('nav.explore')}</span>
                                    <ArrowRight className="h-4 w-4 ms-1 rtl:rotate-180" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Countries */}
            {countriesError ? (
                <ErrorDisplay onRetry={refetchCountries} />
            ) : countriesData && (
                <section className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('home.popularTitle')}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t('home.popularDesc')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countriesData.data.countries.slice(0, 6).map((country) => (
                            <Link key={country._id} to={`/countries/${country._id}`} className="card hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all hover:scale-105 group">
                                <div className="flex items-center gap-4">
                                    <img src={country.flag} alt={t('home.flagAlt', { name: localizeName(country.name) })} loading="lazy" className="w-12 h-8 object-cover rounded border" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{localizeName(country.name)}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{localizeContinent(country.continent)}</p>
                                        {country.population?.total && <p className="text-xs text-gray-500 dark:text-gray-400"><span>{t('home.population')}{fmtNum(country.population.total)}</span></p>}
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors rtl:rotate-180" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/countries" className="btn-primary">
                            {t('home.viewAllCountries')}
                        </Link>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 gradient-bg rounded-2xl text-white text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">{t('home.ctaTitle')}</h2>
                    <p className="text-xl mb-8 opacity-90">{t('home.ctaDesc')}</p>
                    <Link to="/register" className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-3 px-8 rounded-lg transition-colors">
                        {t('home.ctaButton')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
