import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { countriesAPI } from '../utils/api';
import { 
  Globe, 
  MapPin, 
  Users, 
  Star,
  ArrowRight,
  Heart
} from 'lucide-react';

const Home = () => {
  const { data: continentsData } = useQuery('continents', countriesAPI.getContinents);
  const { data: countriesData } = useQuery('featured-countries', () => 
    countriesAPI.getAll({ limit: 6, sortBy: 'population', sortOrder: 'desc' })
  );

  const features = [
    {
      icon: Globe,
      title: 'Explore Countries',
      description: 'Discover detailed information about every country in the world',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Track Your Travels',
      description: 'Keep a record of countries you\'ve visited with photos and memories',
      color: 'text-green-600'
    },
    {
      icon: Heart,
      title: 'Build Your Wishlist',
      description: 'Save countries you want to visit and plan your next adventure',
      color: 'text-red-600'
    }
  ];

  const stats = [
    { label: 'Countries', value: '195+', icon: Globe },
    { label: 'Continents', value: '7', icon: MapPin },
    { label: 'Users', value: '1K+', icon: Users },
    { label: 'Memories', value: '10K+', icon: Star }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore the <span className="text-gradient">World</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover countries, track your travels, and build memories with WoCo - 
            your personal world exploration companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/countries" className="btn-primary text-lg px-8 py-3">
              Explore Countries
            </Link>
            <Link to="/register" className="btn-outline text-lg px-8 py-3">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white rounded-2xl shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Explore
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From detailed country information to personal travel tracking, 
            WoCo provides all the tools you need for your world exploration journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Icon className={`h-8 w-8 ${color}`} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Continents Section */}
      {continentsData && (
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore by Continent
            </h2>
            <p className="text-gray-600">
              Discover countries organized by their continents
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {continentsData.data.map((continent) => (
              <Link
                key={continent}
                to={`/countries?continent=${continent}`}
                className="card hover:shadow-lg transition-all hover:scale-105 text-center group"
              >
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {continent}
                </h3>
                <div className="flex items-center justify-center mt-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Countries */}
      {countriesData && (
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Countries
            </h2>
            <p className="text-gray-600">
              Discover some of the most populous countries in the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countriesData.data.countries.slice(0, 6).map((country) => (
              <Link
                key={country._id}
                to={`/countries/${country._id}`}
                className="card hover:shadow-lg transition-all hover:scale-105 group"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-12 h-8 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-sm text-gray-600">{country.continent}</p>
                    {country.population?.total && (
                      <p className="text-xs text-gray-500">
                        Population: {country.population.total.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/countries" className="btn-primary">
              View All Countries
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 gradient-bg rounded-2xl text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers exploring the world with WoCo
          </p>
          <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
