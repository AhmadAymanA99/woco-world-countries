import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to fetch and display country boundaries
const CountryBoundaries = ({ visitedCountryCodes, visitedCountries }) => {
  const [countryGeoJson, setCountryGeoJson] = React.useState(null);

  useEffect(() => {
    // Fetch world countries GeoJSON (simplified boundaries)
    // Using a public GeoJSON service for country boundaries
    const fetchCountries = async () => {
      try {
        // Try multiple GeoJSON sources with different property names
        const sources = [
          'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
          'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
          'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.geojson'
        ];
        
        for (const url of sources) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              // Log first feature to debug property names
              if (data.features && data.features.length > 0) {
                console.log('GeoJSON loaded from:', url);
                console.log('Sample feature properties:', Object.keys(data.features[0].properties || {}));
              }
              setCountryGeoJson(data);
              return; // Successfully loaded
            }
          } catch (err) {
            continue; // Try next source
          }
        }
        console.warn('Could not load country boundaries from any source, using markers only');
      } catch (error) {
        console.warn('Error loading country boundaries:', error);
      }
    };

    if (visitedCountryCodes.length > 0 || visitedCountries.length > 0) {
      fetchCountries();
    }
  }, [visitedCountryCodes, visitedCountries.length]);

  if (!countryGeoJson) return null;

  // Helper function to extract country code from feature properties
  const getCountryCodeFromFeature = (feature) => {
    const props = feature.properties || {};
    // Try various property name variations (case-insensitive)
    const possibleCodes = [
      props.iso_a2, props.ISO_A2, props.iso_a2_eh, props.ISO_A2_EH,
      props.iso2, props.ISO2, props.iso, props.ISO,
      props.ADM0_A3, props.adm0_a3, props.iso_3166_1_alpha_2,
      props.ISO_3166_1_alpha_2, props.ISO3166_1_alpha_2,
      props.ISO_A3, props.iso_a3
    ].filter(Boolean);
    
    return possibleCodes[0]?.toUpperCase() || '';
  };

  // Helper function to get country name from feature
  const getCountryNameFromFeature = (feature) => {
    const props = feature.properties || {};
    return props.name || props.NAME || props.NAME_EN || props.ADMIN || props.name_long || '';
  };

  // Style function for countries
  const getCountryStyle = (feature) => {
    const countryCode = getCountryCodeFromFeature(feature);
    const countryName = getCountryNameFromFeature(feature);
    
    // Match by code first (case-insensitive)
    let isVisited = visitedCountryCodes.some(vc => 
      vc && countryCode && vc.toUpperCase() === countryCode.toUpperCase()
    );
    
    // Fallback: match by country name (case-insensitive)
    if (!isVisited && countryName) {
      isVisited = visitedCountries.some(v => {
        const dbName = v.country?.name || '';
        return dbName && countryName && dbName.toLowerCase() === countryName.toLowerCase();
      });
    }
    
    return {
      fillColor: isVisited ? '#10b981' : '#e5e7eb', // Green for visited, gray for not visited
      fillOpacity: isVisited ? 0.6 : 0.2,
      color: isVisited ? '#059669' : '#9ca3af',
      weight: isVisited ? 2 : 1,
      opacity: isVisited ? 0.8 : 0.4
    };
  };

  // Handle click on country
  const onEachCountry = (feature, layer) => {
    const countryCode = getCountryCodeFromFeature(feature);
    const countryName = getCountryNameFromFeature(feature);
    
    // Try to find visited country by code first
    let visitedCountry = visitedCountries.find(v => 
      v.country?.code && v.country.code.toUpperCase() === countryCode
    );
    
    // Fallback: match by country name
    if (!visitedCountry) {
      visitedCountry = visitedCountries.find(v => {
        const dbName = v.country?.name || '';
        return dbName.toLowerCase() === countryName.toLowerCase();
      });
    }
    
    if (visitedCountry) {
      const displayName = visitedCountry.country?.name || countryName;
      const popupContent = `
        <div style="text-align: center;">
          ${visitedCountry.country?.flag ? `
            <img 
              src="${visitedCountry.country.flag}" 
              alt="${displayName}" 
              style="width: 32px; height: 24px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;"
            />
          ` : ''}
          <div style="font-weight: 600; color: #059669; margin-bottom: 4px;">
            ${displayName}
          </div>
          ${visitedCountry.visitDate ? `
            <div style="font-size: 12px; color: #6b7280;">
              Visited: ${new Date(visitedCountry.visitDate).toLocaleDateString()}
            </div>
          ` : ''}
        </div>
      `;
      layer.bindPopup(popupContent);
      
      // Add hover effect for visited countries
      layer.on({
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            weight: 3,
            fillOpacity: 0.8
          });
        },
        mouseout: (e) => {
          const layer = e.target;
          const code = getCountryCodeFromFeature(feature);
          const name = getCountryNameFromFeature(feature);
          let isVisited = visitedCountryCodes.includes(code);
          if (!isVisited) {
            isVisited = visitedCountries.some(v => {
              const dbName = v.country?.name || '';
              return dbName.toLowerCase() === name.toLowerCase();
            });
          }
          layer.setStyle({
            weight: isVisited ? 2 : 1,
            fillOpacity: isVisited ? 0.6 : 0.2
          });
        }
      });
    }
  };

  return (
    <GeoJSON
      data={countryGeoJson}
      style={getCountryStyle}
      onEachFeature={onEachCountry}
    />
  );
};

const WorldMap = ({ visitedCountries = [], height = '600px' }) => {
  const hasData = visitedCountries && visitedCountries.length > 0;

  // Get country codes for visited countries (ensure uppercase for matching)
  const visitedCountryCodes = visitedCountries
    .map(v => v.country?.code?.toUpperCase())
    .filter(Boolean);

  const getMapCenter = () => {
    if (!hasData) return [20, 0];
    
    const lats = visitedCountries
      .filter(v => v.country?.geographicLocation?.coordinates?.latitude)
      .map(v => v.country.geographicLocation.coordinates.latitude);
    const lngs = visitedCountries
      .filter(v => v.country?.geographicLocation?.coordinates?.longitude)
      .map(v => v.country.geographicLocation.coordinates.longitude);
    
    if (lats.length === 0) return [20, 0];
    
    return [
      lats.reduce((a, b) => a + b, 0) / lats.length,
      lngs.reduce((a, b) => a + b, 0) / lngs.length
    ];
  };

  if (!hasData) {
    return (
      <div className="card text-center" style={{ height }}>
        <div className="py-12">
          <p className="text-gray-600">No visited countries to display on map</p>
        </div>
      </div>
    );
  }

  const center = getMapCenter();

  return (
    <div className="card p-0 overflow-hidden relative" style={{ height }}>
      <MapContainer
        center={center}
        zoom={hasData ? 3 : 2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Country boundaries layer */}
        <CountryBoundaries 
          visitedCountryCodes={visitedCountryCodes}
          visitedCountries={visitedCountries}
        />

        {/* Markers for visited countries */}
        {visitedCountries
          .filter(v => v.country?.geographicLocation?.coordinates)
          .map((visit, index) => {
            const coords = visit.country.geographicLocation.coordinates;
            return (
              <Marker
                key={`marker-${index}`}
                position={[coords.latitude, coords.longitude]}
                icon={L.divIcon({
                  className: 'custom-country-marker',
                  html: `<div style="
                    width: 20px;
                    height: 20px;
                    background: #10b981;
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  "></div>`,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })}
              >
                <Popup>
                  <div className="text-center">
                    <img 
                      src={visit.country.flag} 
                      alt={visit.country.name} 
                      className="w-8 h-6 mx-auto mb-2 object-cover rounded"
                    />
                    <Link 
                      to={`/countries/${visit.country._id}`}
                      className="font-semibold text-primary-600 hover:underline"
                    >
                      {visit.country.name}
                    </Link>
                    {visit.visitDate && (
                      <p className="text-sm text-gray-600 mt-1">
                        Visited: {new Date(visit.visitDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white px-3 py-2 rounded-lg shadow-lg text-xs sm:text-sm z-10">
        <div className="flex items-center mb-1.5">
          <div className="w-4 h-3 sm:w-5 sm:h-3 bg-[#10b981] mr-2 rounded-sm"></div>
          <span className="whitespace-nowrap">Visited</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-3 sm:w-5 sm:h-3 bg-[#e5e7eb] mr-2 rounded-sm"></div>
          <span className="whitespace-nowrap">Not Visited</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;

