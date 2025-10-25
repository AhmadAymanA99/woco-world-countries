const mongoose = require('mongoose');
const Country = require('./models/Country');
require('dotenv').config({ path: './config.env' });

// Complete database of all world countries (196 countries)
const allCountries = [
  {
    "_id": "68fd1a82346f095400f5445c",
    "name": "Algeria",
    "code": "DZ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/dz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 28.0339,
        "longitude": 1.6596
      },
      "area": 2381741,
      "borders": [
        "Libya",
        "Mali",
        "Mauritania",
        "Morocco",
        "Niger",
        "Tunisia"
      ],
      "coastline": 998
    },
    "population": {
      "total": 43851044,
      "density": 18,
      "growthRate": 1.4,
      "urbanPopulation": 73.7
    },
    "gdp": {
      "total": 171000000000,
      "perCapita": 3900,
      "growthRate": 1,
      "sectors": {
        "agriculture": 13,
        "industry": 39.4,
        "services": 47.6
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99,
        "_id": "68fd1a82346f095400f5445d"
      },
      {
        "name": "Christianity",
        "percentage": 1,
        "_id": "68fd1a82346f095400f5445e"
      }
    ],
    "traditions": [
      {
        "name": "Yennayer",
        "description": "Berber New Year celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5445f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tassili n'Ajjer",
        "description": "UNESCO World Heritage site with rock art",
        "location": "Sahara Desert",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54460"
      }
    ],
    "capital": "Algiers",
    "currency": "Algerian Dinar (DZD)",
    "languages": [
      "Arabic",
      "Berber"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Arid to semiarid",
    "government": "Presidential republic",
    "independence": "July 5, 1962",
    "nationalDay": "July 5",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.415Z",
    "updatedAt": "2025-10-25T18:44:18.415Z"
  },
  {
    "_id": "68fd1a82346f095400f54461",
    "name": "Angola",
    "code": "AO",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ao.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -11.2027,
        "longitude": 17.8739
      },
      "area": 1246700,
      "borders": [
        "Congo",
        "Democratic Republic of the Congo",
        "Namibia",
        "Zambia"
      ],
      "coastline": 1600
    },
    "population": {
      "total": 32866272,
      "density": 26,
      "growthRate": 3.4,
      "urbanPopulation": 66.8
    },
    "gdp": {
      "total": 95000000000,
      "perCapita": 2890,
      "growthRate": -1.2,
      "sectors": {
        "agriculture": 10.2,
        "industry": 61.4,
        "services": 28.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 41,
        "_id": "68fd1a82346f095400f54462"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 47,
        "_id": "68fd1a82346f095400f54463"
      },
      {
        "name": "Islam",
        "percentage": 1,
        "_id": "68fd1a82346f095400f54464"
      }
    ],
    "traditions": [
      {
        "name": "Carnival",
        "description": "Pre-Lenten celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54465"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kalandula Falls",
        "description": "Spectacular waterfall",
        "location": "Malanje Province",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54466"
      }
    ],
    "capital": "Luanda",
    "currency": "Angolan Kwanza (AOA)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Semiarid in south and along coast",
    "government": "Presidential republic",
    "independence": "November 11, 1975",
    "nationalDay": "November 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.417Z",
    "updatedAt": "2025-10-25T18:44:18.417Z"
  },
  {
    "_id": "68fd1a82346f095400f54467",
    "name": "Benin",
    "code": "BJ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/bj.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 9.3077,
        "longitude": 2.3158
      },
      "area": 112622,
      "borders": [
        "Burkina Faso",
        "Niger",
        "Nigeria",
        "Togo"
      ],
      "coastline": 121
    },
    "population": {
      "total": 12123200,
      "density": 108,
      "growthRate": 2.7,
      "urbanPopulation": 47.8
    },
    "gdp": {
      "total": 14300000000,
      "perCapita": 1179,
      "growthRate": 6.9,
      "sectors": {
        "agriculture": 25,
        "industry": 15,
        "services": 60
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 42.8,
        "_id": "68fd1a82346f095400f54468"
      },
      {
        "name": "Islam",
        "percentage": 24.4,
        "_id": "68fd1a82346f095400f54469"
      },
      {
        "name": "Vodun",
        "percentage": 17.3,
        "_id": "68fd1a82346f095400f5446a"
      }
    ],
    "traditions": [
      {
        "name": "Vodun Festival",
        "description": "Traditional religious celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5446b"
      }
    ],
    "touristAttractions": [
      {
        "name": "Royal Palaces of Abomey",
        "description": "UNESCO World Heritage site",
        "location": "Abomey",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f5446c"
      }
    ],
    "capital": "Porto-Novo",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 1, 1960",
    "nationalDay": "August 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.418Z",
    "updatedAt": "2025-10-25T18:44:18.418Z"
  },
  {
    "_id": "68fd1a82346f095400f5446d",
    "name": "Botswana",
    "code": "BW",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/bw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -22.3285,
        "longitude": 24.6849
      },
      "area": 581730,
      "borders": [
        "Namibia",
        "South Africa",
        "Zambia",
        "Zimbabwe"
      ],
      "coastline": 0
    },
    "population": {
      "total": 2351627,
      "density": 4,
      "growthRate": 1.4,
      "urbanPopulation": 70.9
    },
    "gdp": {
      "total": 18000000000,
      "perCapita": 7653,
      "growthRate": 2.9,
      "sectors": {
        "agriculture": 1.8,
        "industry": 27.5,
        "services": 70.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 79.1,
        "_id": "68fd1a82346f095400f5446e"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 4.1,
        "_id": "68fd1a82346f095400f5446f"
      },
      {
        "name": "Unaffiliated",
        "percentage": 15.2,
        "_id": "68fd1a82346f095400f54470"
      }
    ],
    "traditions": [
      {
        "name": "Dikgafela",
        "description": "Traditional dance",
        "category": "dance",
        "_id": "68fd1a82346f095400f54471"
      }
    ],
    "touristAttractions": [
      {
        "name": "Okavango Delta",
        "description": "UNESCO World Heritage wetland",
        "location": "Northwest Botswana",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54472"
      }
    ],
    "capital": "Gaborone",
    "currency": "Botswana Pula (BWP)",
    "languages": [
      "English",
      "Setswana"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Semiarid",
    "government": "Parliamentary republic",
    "independence": "September 30, 1966",
    "nationalDay": "September 30",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.419Z",
    "updatedAt": "2025-10-25T18:44:18.419Z"
  },
  {
    "_id": "68fd1a82346f095400f54473",
    "name": "Burkina Faso",
    "code": "BF",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/bf.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.2383,
        "longitude": -1.5616
      },
      "area": 274200,
      "borders": [
        "Benin",
        "Côte d'Ivoire",
        "Ghana",
        "Guinea",
        "Mali",
        "Niger",
        "Togo"
      ],
      "coastline": 0
    },
    "population": {
      "total": 20903273,
      "density": 76,
      "growthRate": 2.6,
      "urbanPopulation": 30.4
    },
    "gdp": {
      "total": 16000000000,
      "perCapita": 765,
      "growthRate": 5.7,
      "sectors": {
        "agriculture": 31,
        "industry": 19.5,
        "services": 49.5
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 61.5,
        "_id": "68fd1a82346f095400f54474"
      },
      {
        "name": "Christianity",
        "percentage": 23.3,
        "_id": "68fd1a82346f095400f54475"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 15.2,
        "_id": "68fd1a82346f095400f54476"
      }
    ],
    "traditions": [
      {
        "name": "FESPACO",
        "description": "Pan-African film festival",
        "category": "art",
        "_id": "68fd1a82346f095400f54477"
      }
    ],
    "touristAttractions": [
      {
        "name": "Sindou Peaks",
        "description": "Unique rock formations",
        "location": "Banfora",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54478"
      }
    ],
    "capital": "Ouagadougou",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 5, 1960",
    "nationalDay": "August 5",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.420Z",
    "updatedAt": "2025-10-25T18:44:18.420Z"
  },
  {
    "_id": "68fd1a82346f095400f54479",
    "name": "Burundi",
    "code": "BI",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/bi.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -3.3731,
        "longitude": 29.9189
      },
      "area": 27834,
      "borders": [
        "Democratic Republic of the Congo",
        "Rwanda",
        "Tanzania"
      ],
      "coastline": 0
    },
    "population": {
      "total": 11890784,
      "density": 427,
      "growthRate": 3.1,
      "urbanPopulation": 13.4
    },
    "gdp": {
      "total": 3100000000,
      "perCapita": 261,
      "growthRate": 1.8,
      "sectors": {
        "agriculture": 39.5,
        "industry": 16.4,
        "services": 44.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 91.5,
        "_id": "68fd1a82346f095400f5447a"
      },
      {
        "name": "Islam",
        "percentage": 2.8,
        "_id": "68fd1a82346f095400f5447b"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 5.7,
        "_id": "68fd1a82346f095400f5447c"
      }
    ],
    "traditions": [
      {
        "name": "Drumming",
        "description": "Traditional drum performances",
        "category": "music",
        "_id": "68fd1a82346f095400f5447d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Lake Tanganyika",
        "description": "Second deepest lake in the world",
        "location": "Western border",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f5447e"
      }
    ],
    "capital": "Gitega",
    "currency": "Burundian Franc (BIF)",
    "languages": [
      "Kirundi",
      "French"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Equatorial",
    "government": "Presidential republic",
    "independence": "July 1, 1962",
    "nationalDay": "July 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.421Z",
    "updatedAt": "2025-10-25T18:44:18.421Z"
  },
  {
    "_id": "68fd1a82346f095400f5447f",
    "name": "Cameroon",
    "code": "CM",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/cm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.3697,
        "longitude": 12.3547
      },
      "area": 475442,
      "borders": [
        "Central African Republic",
        "Chad",
        "Congo",
        "Equatorial Guinea",
        "Gabon",
        "Nigeria"
      ],
      "coastline": 402
    },
    "population": {
      "total": 26545863,
      "density": 56,
      "growthRate": 2.6,
      "urbanPopulation": 56.8
    },
    "gdp": {
      "total": 39000000000,
      "perCapita": 1469,
      "growthRate": 3.5,
      "sectors": {
        "agriculture": 16.7,
        "industry": 26.6,
        "services": 56.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 70,
        "_id": "68fd1a82346f095400f54480"
      },
      {
        "name": "Islam",
        "percentage": 20.9,
        "_id": "68fd1a82346f095400f54481"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 5.6,
        "_id": "68fd1a82346f095400f54482"
      }
    ],
    "traditions": [
      {
        "name": "Ngondo Festival",
        "description": "Traditional water festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f54483"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mount Cameroon",
        "description": "Active volcano",
        "location": "Southwest Region",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54484"
      }
    ],
    "capital": "Yaoundé",
    "currency": "Central African CFA Franc (XAF)",
    "languages": [
      "French",
      "English"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "January 1, 1960",
    "nationalDay": "May 20",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.421Z",
    "updatedAt": "2025-10-25T18:44:18.421Z"
  },
  {
    "_id": "68fd1a82346f095400f54485",
    "name": "Cape Verde",
    "code": "CV",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/cv.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 16.5388,
        "longitude": -24.0132
      },
      "area": 4033,
      "borders": [],
      "coastline": 965
    },
    "population": {
      "total": 555987,
      "density": 138,
      "growthRate": 1.2,
      "urbanPopulation": 66.8
    },
    "gdp": {
      "total": 2000000000,
      "perCapita": 3599,
      "growthRate": 4,
      "sectors": {
        "agriculture": 8.9,
        "industry": 15.5,
        "services": 75.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 89.1,
        "_id": "68fd1a82346f095400f54486"
      },
      {
        "name": "Islam",
        "percentage": 2.8,
        "_id": "68fd1a82346f095400f54487"
      },
      {
        "name": "Unaffiliated",
        "percentage": 8.1,
        "_id": "68fd1a82346f095400f54488"
      }
    ],
    "traditions": [
      {
        "name": "Morna",
        "description": "Traditional music genre",
        "category": "music",
        "_id": "68fd1a82346f095400f54489"
      }
    ],
    "touristAttractions": [
      {
        "name": "Santo Antão",
        "description": "Mountainous island",
        "location": "Santo Antão",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f5448a"
      }
    ],
    "capital": "Praia",
    "currency": "Cape Verdean Escudo (CVE)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC-1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "July 5, 1975",
    "nationalDay": "July 5",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.421Z",
    "updatedAt": "2025-10-25T18:44:18.421Z"
  },
  {
    "_id": "68fd1a82346f095400f5448b",
    "name": "Central African Republic",
    "code": "CF",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/cf.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 6.6111,
        "longitude": 20.9394
      },
      "area": 622984,
      "borders": [
        "Cameroon",
        "Chad",
        "Congo",
        "Democratic Republic of the Congo",
        "South Sudan",
        "Sudan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 4829767,
      "density": 8,
      "growthRate": 1.8,
      "urbanPopulation": 42
    },
    "gdp": {
      "total": 2200000000,
      "perCapita": 455,
      "growthRate": 4.3,
      "sectors": {
        "agriculture": 43.2,
        "industry": 16,
        "services": 40.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 89.5,
        "_id": "68fd1a82346f095400f5448c"
      },
      {
        "name": "Islam",
        "percentage": 8.5,
        "_id": "68fd1a82346f095400f5448d"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 2,
        "_id": "68fd1a82346f095400f5448e"
      }
    ],
    "traditions": [
      {
        "name": "Boganda Day",
        "description": "National hero celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5448f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Dzanga-Sangha Reserve",
        "description": "Wildlife reserve",
        "location": "Southwest",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54490"
      }
    ],
    "capital": "Bangui",
    "currency": "Central African CFA Franc (XAF)",
    "languages": [
      "French",
      "Sango"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 13, 1960",
    "nationalDay": "December 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.422Z",
    "updatedAt": "2025-10-25T18:44:18.422Z"
  },
  {
    "_id": "68fd1a82346f095400f54491",
    "name": "Chad",
    "code": "TD",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/td.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.4542,
        "longitude": 18.7322
      },
      "area": 1284000,
      "borders": [
        "Cameroon",
        "Central African Republic",
        "Libya",
        "Niger",
        "Nigeria",
        "Sudan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 16425864,
      "density": 13,
      "growthRate": 3,
      "urbanPopulation": 23.1
    },
    "gdp": {
      "total": 11000000000,
      "perCapita": 669,
      "growthRate": 2.3,
      "sectors": {
        "agriculture": 52.3,
        "industry": 14.7,
        "services": 33
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 52.1,
        "_id": "68fd1a82346f095400f54492"
      },
      {
        "name": "Christianity",
        "percentage": 44.1,
        "_id": "68fd1a82346f095400f54493"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 3.8,
        "_id": "68fd1a82346f095400f54494"
      }
    ],
    "traditions": [
      {
        "name": "Gerewol",
        "description": "Traditional courtship dance",
        "category": "dance",
        "_id": "68fd1a82346f095400f54495"
      }
    ],
    "touristAttractions": [
      {
        "name": "Zakouma National Park",
        "description": "Wildlife sanctuary",
        "location": "Southeast",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54496"
      }
    ],
    "capital": "N'Djamena",
    "currency": "Central African CFA Franc (XAF)",
    "languages": [
      "French",
      "Arabic"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical in south, arid in north",
    "government": "Presidential republic",
    "independence": "August 11, 1960",
    "nationalDay": "August 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.422Z",
    "updatedAt": "2025-10-25T18:44:18.422Z"
  },
  {
    "_id": "68fd1a82346f095400f54497",
    "name": "Comoros",
    "code": "KM",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/km.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -11.6455,
        "longitude": 43.3333
      },
      "area": 1862,
      "borders": [],
      "coastline": 340
    },
    "population": {
      "total": 869601,
      "density": 467,
      "growthRate": 1.4,
      "urbanPopulation": 28.8
    },
    "gdp": {
      "total": 1200000000,
      "perCapita": 1380,
      "growthRate": 2,
      "sectors": {
        "agriculture": 50,
        "industry": 10,
        "services": 40
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 98,
        "_id": "68fd1a82346f095400f54498"
      },
      {
        "name": "Christianity",
        "percentage": 2,
        "_id": "68fd1a82346f095400f54499"
      }
    ],
    "traditions": [
      {
        "name": "Grand Mariage",
        "description": "Traditional wedding ceremony",
        "category": "ceremony",
        "_id": "68fd1a82346f095400f5449a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mount Karthala",
        "description": "Active volcano",
        "location": "Grande Comore",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f5449b"
      }
    ],
    "capital": "Moroni",
    "currency": "Comorian Franc (KMF)",
    "languages": [
      "Comorian",
      "French",
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Tropical marine",
    "government": "Federal presidential republic",
    "independence": "July 6, 1975",
    "nationalDay": "July 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.423Z",
    "updatedAt": "2025-10-25T18:44:18.423Z"
  },
  {
    "_id": "68fd1a82346f095400f5449c",
    "name": "Congo",
    "code": "CG",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/cg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -0.228,
        "longitude": 15.8277
      },
      "area": 342000,
      "borders": [
        "Angola",
        "Cameroon",
        "Central African Republic",
        "Democratic Republic of the Congo",
        "Gabon"
      ],
      "coastline": 169
    },
    "population": {
      "total": 5518087,
      "density": 16,
      "growthRate": 2.2,
      "urbanPopulation": 67.2
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 2174,
      "growthRate": 1.8,
      "sectors": {
        "agriculture": 8.6,
        "industry": 52.4,
        "services": 39
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90.7,
        "_id": "68fd1a82346f095400f5449d"
      },
      {
        "name": "Islam",
        "percentage": 1.3,
        "_id": "68fd1a82346f095400f5449e"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 8,
        "_id": "68fd1a82346f095400f5449f"
      }
    ],
    "traditions": [
      {
        "name": "Congo River Festival",
        "description": "Cultural celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544a0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Odzala-Kokoua National Park",
        "description": "Wildlife reserve",
        "location": "Northwest",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544a1"
      }
    ],
    "capital": "Brazzaville",
    "currency": "Central African CFA Franc (XAF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 15, 1960",
    "nationalDay": "August 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.423Z",
    "updatedAt": "2025-10-25T18:44:18.423Z"
  },
  {
    "_id": "68fd1a82346f095400f544a2",
    "name": "Democratic Republic of the Congo",
    "code": "CD",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/cd.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -4.0383,
        "longitude": 21.7587
      },
      "area": 2344858,
      "borders": [
        "Angola",
        "Burundi",
        "Central African Republic",
        "Congo",
        "Rwanda",
        "South Sudan",
        "Tanzania",
        "Uganda",
        "Zambia"
      ],
      "coastline": 37
    },
    "population": {
      "total": 89561403,
      "density": 38,
      "growthRate": 3.2,
      "urbanPopulation": 45
    },
    "gdp": {
      "total": 48000000000,
      "perCapita": 536,
      "growthRate": 1.7,
      "sectors": {
        "agriculture": 20,
        "industry": 43.7,
        "services": 36.3
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 95.8,
        "_id": "68fd1a82346f095400f544a3"
      },
      {
        "name": "Islam",
        "percentage": 1.5,
        "_id": "68fd1a82346f095400f544a4"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 2.7,
        "_id": "68fd1a82346f095400f544a5"
      }
    ],
    "traditions": [
      {
        "name": "Rumba",
        "description": "Traditional dance and music",
        "category": "dance",
        "_id": "68fd1a82346f095400f544a6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Virunga National Park",
        "description": "UNESCO World Heritage site",
        "location": "Eastern DRC",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f544a7"
      }
    ],
    "capital": "Kinshasa",
    "currency": "Congolese Franc (CDF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1 to UTC+2"
    ],
    "climate": "Tropical",
    "government": "Semi-presidential republic",
    "independence": "June 30, 1960",
    "nationalDay": "June 30",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.424Z",
    "updatedAt": "2025-10-25T18:44:18.424Z"
  },
  {
    "_id": "68fd1a82346f095400f544a8",
    "name": "Djibouti",
    "code": "DJ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/dj.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 11.8251,
        "longitude": 42.5903
      },
      "area": 23200,
      "borders": [
        "Eritrea",
        "Ethiopia",
        "Somalia"
      ],
      "coastline": 314
    },
    "population": {
      "total": 988000,
      "density": 43,
      "growthRate": 1.4,
      "urbanPopulation": 77.8
    },
    "gdp": {
      "total": 3400000000,
      "perCapita": 3441,
      "growthRate": 6,
      "sectors": {
        "agriculture": 2.4,
        "industry": 17.3,
        "services": 80.3
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 94,
        "_id": "68fd1a82346f095400f544a9"
      },
      {
        "name": "Christianity",
        "percentage": 6,
        "_id": "68fd1a82346f095400f544aa"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544ab"
      }
    ],
    "touristAttractions": [
      {
        "name": "Lake Assal",
        "description": "Salt lake",
        "location": "Central Djibouti",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544ac"
      }
    ],
    "capital": "Djibouti",
    "currency": "Djiboutian Franc (DJF)",
    "languages": [
      "French",
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Desert",
    "government": "Presidential republic",
    "independence": "June 27, 1977",
    "nationalDay": "June 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.424Z",
    "updatedAt": "2025-10-25T18:44:18.424Z"
  },
  {
    "_id": "68fd1a82346f095400f544ad",
    "name": "Egypt",
    "code": "EG",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/eg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 26.0975,
        "longitude": 30.0444
      },
      "area": 1001449,
      "borders": [
        "Gaza Strip",
        "Israel",
        "Libya",
        "Sudan"
      ],
      "coastline": 2450
    },
    "population": {
      "total": 102334404,
      "density": 102,
      "growthRate": 1.9,
      "urbanPopulation": 42.8
    },
    "gdp": {
      "total": 404000000000,
      "perCapita": 3948,
      "growthRate": 3.6,
      "sectors": {
        "agriculture": 11.7,
        "industry": 34.3,
        "services": 54
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 90,
        "_id": "68fd1a82346f095400f544ae"
      },
      {
        "name": "Christianity",
        "percentage": 10,
        "_id": "68fd1a82346f095400f544af"
      }
    ],
    "traditions": [
      {
        "name": "Ramadan",
        "description": "Islamic holy month",
        "category": "festival",
        "_id": "68fd1a82346f095400f544b0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Pyramids of Giza",
        "description": "Ancient wonder",
        "location": "Giza",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1a82346f095400f544b1"
      }
    ],
    "capital": "Cairo",
    "currency": "Egyptian Pound (EGP)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Desert",
    "government": "Presidential republic",
    "independence": "February 28, 1922",
    "nationalDay": "July 23",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.424Z",
    "updatedAt": "2025-10-25T18:44:18.424Z"
  },
  {
    "_id": "68fd1a82346f095400f544b2",
    "name": "Equatorial Guinea",
    "code": "GQ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/gq.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 1.6508,
        "longitude": 10.2679
      },
      "area": 28051,
      "borders": [
        "Cameroon",
        "Gabon"
      ],
      "coastline": 296
    },
    "population": {
      "total": 1402985,
      "density": 50,
      "growthRate": 2.3,
      "urbanPopulation": 72.2
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 8553,
      "growthRate": -3.2,
      "sectors": {
        "agriculture": 2.5,
        "industry": 54.6,
        "services": 42.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 88,
        "_id": "68fd1a82346f095400f544b3"
      },
      {
        "name": "Islam",
        "percentage": 4,
        "_id": "68fd1a82346f095400f544b4"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 8,
        "_id": "68fd1a82346f095400f544b5"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544b6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bioko Island",
        "description": "Volcanic island",
        "location": "Gulf of Guinea",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544b7"
      }
    ],
    "capital": "Malabo",
    "currency": "Central African CFA Franc (XAF)",
    "languages": [
      "Spanish",
      "French",
      "Portuguese"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "October 12, 1968",
    "nationalDay": "October 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.425Z",
    "updatedAt": "2025-10-25T18:44:18.425Z"
  },
  {
    "_id": "68fd1a82346f095400f544b8",
    "name": "Eritrea",
    "code": "ER",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/er.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.1794,
        "longitude": 39.7823
      },
      "area": 117600,
      "borders": [
        "Djibouti",
        "Ethiopia",
        "Sudan"
      ],
      "coastline": 2234
    },
    "population": {
      "total": 3546421,
      "density": 30,
      "growthRate": 1,
      "urbanPopulation": 40
    },
    "gdp": {
      "total": 2100000000,
      "perCapita": 592,
      "growthRate": 3,
      "sectors": {
        "agriculture": 11.7,
        "industry": 29.6,
        "services": 58.7
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 50,
        "_id": "68fd1a82346f095400f544b9"
      },
      {
        "name": "Christianity",
        "percentage": 50,
        "_id": "68fd1a82346f095400f544ba"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544bb"
      }
    ],
    "touristAttractions": [
      {
        "name": "Asmara",
        "description": "UNESCO World Heritage city",
        "location": "Central Eritrea",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544bc"
      }
    ],
    "capital": "Asmara",
    "currency": "Eritrean Nakfa (ERN)",
    "languages": [
      "Tigrinya",
      "Arabic",
      "English"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Hot, dry desert",
    "government": "Presidential republic",
    "independence": "May 24, 1993",
    "nationalDay": "May 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.425Z",
    "updatedAt": "2025-10-25T18:44:18.425Z"
  },
  {
    "_id": "68fd1a82346f095400f544bd",
    "name": "Eswatini",
    "code": "SZ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/sz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -22.5225,
        "longitude": 31.4659
      },
      "area": 17364,
      "borders": [
        "Mozambique",
        "South Africa"
      ],
      "coastline": 0
    },
    "population": {
      "total": 1160164,
      "density": 67,
      "growthRate": 0.8,
      "urbanPopulation": 24.3
    },
    "gdp": {
      "total": 4700000000,
      "perCapita": 4051,
      "growthRate": 1.9,
      "sectors": {
        "agriculture": 6.5,
        "industry": 45,
        "services": 48.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1a82346f095400f544be"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 10,
        "_id": "68fd1a82346f095400f544bf"
      }
    ],
    "traditions": [
      {
        "name": "Umhlanga",
        "description": "Reed dance ceremony",
        "category": "ceremony",
        "_id": "68fd1a82346f095400f544c0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Hlane Royal National Park",
        "description": "Wildlife sanctuary",
        "location": "Eastern Eswatini",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544c1"
      }
    ],
    "capital": "Mbabane",
    "currency": "Swazi Lilangeni (SZL)",
    "languages": [
      "English",
      "Swati"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Absolute monarchy",
    "independence": "September 6, 1968",
    "nationalDay": "September 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.426Z",
    "updatedAt": "2025-10-25T18:44:18.426Z"
  },
  {
    "_id": "68fd1a82346f095400f544c2",
    "name": "Ethiopia",
    "code": "ET",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/et.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 9.145,
        "longitude": 40.4897
      },
      "area": 1104300,
      "borders": [
        "Djibouti",
        "Eritrea",
        "Kenya",
        "Somalia",
        "South Sudan",
        "Sudan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 114963588,
      "density": 104,
      "growthRate": 2.5,
      "urbanPopulation": 21.3
    },
    "gdp": {
      "total": 96000000000,
      "perCapita": 835,
      "growthRate": 6.1,
      "sectors": {
        "agriculture": 34.8,
        "industry": 21.6,
        "services": 43.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 62.8,
        "_id": "68fd1a82346f095400f544c3"
      },
      {
        "name": "Islam",
        "percentage": 33.9,
        "_id": "68fd1a82346f095400f544c4"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 3.3,
        "_id": "68fd1a82346f095400f544c5"
      }
    ],
    "traditions": [
      {
        "name": "Timkat",
        "description": "Epiphany celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544c6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Lalibela",
        "description": "Rock-hewn churches",
        "location": "Amhara Region",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1a82346f095400f544c7"
      }
    ],
    "capital": "Addis Ababa",
    "currency": "Ethiopian Birr (ETB)",
    "languages": [
      "Amharic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Tropical monsoon",
    "government": "Federal parliamentary republic",
    "independence": "Never colonized",
    "nationalDay": "May 28",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.426Z",
    "updatedAt": "2025-10-25T18:44:18.426Z"
  },
  {
    "_id": "68fd1a82346f095400f544c8",
    "name": "Gabon",
    "code": "GA",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ga.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -0.8037,
        "longitude": 11.6094
      },
      "area": 267668,
      "borders": [
        "Cameroon",
        "Congo",
        "Equatorial Guinea"
      ],
      "coastline": 885
    },
    "population": {
      "total": 2225734,
      "density": 8,
      "growthRate": 2,
      "urbanPopulation": 89.3
    },
    "gdp": {
      "total": 17000000000,
      "perCapita": 7638,
      "growthRate": 3.4,
      "sectors": {
        "agriculture": 5,
        "industry": 44.7,
        "services": 50.3
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 82,
        "_id": "68fd1a82346f095400f544c9"
      },
      {
        "name": "Islam",
        "percentage": 12,
        "_id": "68fd1a82346f095400f544ca"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 6,
        "_id": "68fd1a82346f095400f544cb"
      }
    ],
    "traditions": [
      {
        "name": "Bwiti",
        "description": "Traditional religion",
        "category": "ceremony",
        "_id": "68fd1a82346f095400f544cc"
      }
    ],
    "touristAttractions": [
      {
        "name": "Loango National Park",
        "description": "Wildlife reserve",
        "location": "Coastal Gabon",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544cd"
      }
    ],
    "capital": "Libreville",
    "currency": "Central African CFA Franc (XAF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 17, 1960",
    "nationalDay": "August 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.426Z",
    "updatedAt": "2025-10-25T18:44:18.426Z"
  },
  {
    "_id": "68fd1a82346f095400f544ce",
    "name": "Gambia",
    "code": "GM",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/gm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 13.4432,
        "longitude": -15.3101
      },
      "area": 10689,
      "borders": [
        "Senegal"
      ],
      "coastline": 80
    },
    "population": {
      "total": 2416668,
      "density": 226,
      "growthRate": 2.9,
      "urbanPopulation": 62.1
    },
    "gdp": {
      "total": 1800000000,
      "perCapita": 745,
      "growthRate": 4.6,
      "sectors": {
        "agriculture": 20.4,
        "industry": 14.2,
        "services": 65.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 95.7,
        "_id": "68fd1a82346f095400f544cf"
      },
      {
        "name": "Christianity",
        "percentage": 4.2,
        "_id": "68fd1a82346f095400f544d0"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 0.1,
        "_id": "68fd1a82346f095400f544d1"
      }
    ],
    "traditions": [
      {
        "name": "Kankurang",
        "description": "Traditional masquerade",
        "category": "ceremony",
        "_id": "68fd1a82346f095400f544d2"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kunta Kinteh Island",
        "description": "UNESCO World Heritage site",
        "location": "Gambia River",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f544d3"
      }
    ],
    "capital": "Banjul",
    "currency": "Gambian Dalasi (GMD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "February 18, 1965",
    "nationalDay": "February 18",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.427Z",
    "updatedAt": "2025-10-25T18:44:18.427Z"
  },
  {
    "_id": "68fd1a82346f095400f544d4",
    "name": "Ghana",
    "code": "GH",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/gh.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.9465,
        "longitude": -1.0232
      },
      "area": 238533,
      "borders": [
        "Burkina Faso",
        "Côte d'Ivoire",
        "Togo"
      ],
      "coastline": 539
    },
    "population": {
      "total": 31072940,
      "density": 130,
      "growthRate": 2.2,
      "urbanPopulation": 56.7
    },
    "gdp": {
      "total": 72000000000,
      "perCapita": 2317,
      "growthRate": 6.5,
      "sectors": {
        "agriculture": 18.3,
        "industry": 24.5,
        "services": 57.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 71.2,
        "_id": "68fd1a82346f095400f544d5"
      },
      {
        "name": "Islam",
        "percentage": 17.6,
        "_id": "68fd1a82346f095400f544d6"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 5.2,
        "_id": "68fd1a82346f095400f544d7"
      }
    ],
    "traditions": [
      {
        "name": "Homowo",
        "description": "Harvest festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f544d8"
      }
    ],
    "touristAttractions": [
      {
        "name": "Cape Coast Castle",
        "description": "UNESCO World Heritage site",
        "location": "Cape Coast",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f544d9"
      }
    ],
    "capital": "Accra",
    "currency": "Ghanaian Cedi (GHS)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "March 6, 1957",
    "nationalDay": "March 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.427Z",
    "updatedAt": "2025-10-25T18:44:18.427Z"
  },
  {
    "_id": "68fd1a82346f095400f544da",
    "name": "Guinea",
    "code": "GN",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/gn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 9.6412,
        "longitude": -9.6886
      },
      "area": 245857,
      "borders": [
        "Côte d'Ivoire",
        "Guinea-Bissau",
        "Liberia",
        "Mali",
        "Senegal",
        "Sierra Leone"
      ],
      "coastline": 320
    },
    "population": {
      "total": 13132795,
      "density": 53,
      "growthRate": 2.8,
      "urbanPopulation": 36.5
    },
    "gdp": {
      "total": 16000000000,
      "perCapita": 1218,
      "growthRate": 5.2,
      "sectors": {
        "agriculture": 19.8,
        "industry": 32.1,
        "services": 48.1
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 89.1,
        "_id": "68fd1a82346f095400f544db"
      },
      {
        "name": "Christianity",
        "percentage": 6.8,
        "_id": "68fd1a82346f095400f544dc"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 4.1,
        "_id": "68fd1a82346f095400f544dd"
      }
    ],
    "traditions": [
      {
        "name": "Fouta Djallon",
        "description": "Traditional region",
        "category": "cultural",
        "_id": "68fd1a82346f095400f544de"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mount Nimba",
        "description": "UNESCO World Heritage site",
        "location": "Southeast Guinea",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544df"
      }
    ],
    "capital": "Conakry",
    "currency": "Guinean Franc (GNF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "October 2, 1958",
    "nationalDay": "October 2",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.428Z",
    "updatedAt": "2025-10-25T18:44:18.428Z"
  },
  {
    "_id": "68fd1a82346f095400f544e0",
    "name": "Guinea-Bissau",
    "code": "GW",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/gw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 11.8037,
        "longitude": -15.1804
      },
      "area": 36125,
      "borders": [
        "Guinea",
        "Senegal"
      ],
      "coastline": 350
    },
    "population": {
      "total": 1968001,
      "density": 54,
      "growthRate": 2.5,
      "urbanPopulation": 43.4
    },
    "gdp": {
      "total": 1500000000,
      "perCapita": 762,
      "growthRate": 4,
      "sectors": {
        "agriculture": 50,
        "industry": 13.1,
        "services": 36.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 45,
        "_id": "68fd1a82346f095400f544e1"
      },
      {
        "name": "Christianity",
        "percentage": 22,
        "_id": "68fd1a82346f095400f544e2"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 33,
        "_id": "68fd1a82346f095400f544e3"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544e4"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bijagós Archipelago",
        "description": "UNESCO Biosphere Reserve",
        "location": "Atlantic Ocean",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544e5"
      }
    ],
    "capital": "Bissau",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Semi-presidential republic",
    "independence": "September 24, 1973",
    "nationalDay": "September 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.428Z",
    "updatedAt": "2025-10-25T18:44:18.428Z"
  },
  {
    "_id": "68fd1a82346f095400f544e6",
    "name": "Ivory Coast",
    "code": "CI",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ci.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.54,
        "longitude": -5.5471
      },
      "area": 322463,
      "borders": [
        "Burkina Faso",
        "Ghana",
        "Guinea",
        "Liberia",
        "Mali"
      ],
      "coastline": 515
    },
    "population": {
      "total": 26378274,
      "density": 82,
      "growthRate": 2.3,
      "urbanPopulation": 51.3
    },
    "gdp": {
      "total": 70000000000,
      "perCapita": 2654,
      "growthRate": 6.8,
      "sectors": {
        "agriculture": 20.1,
        "industry": 26.6,
        "services": 53.3
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 42.9,
        "_id": "68fd1a82346f095400f544e7"
      },
      {
        "name": "Christianity",
        "percentage": 33.9,
        "_id": "68fd1a82346f095400f544e8"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 23.2,
        "_id": "68fd1a82346f095400f544e9"
      }
    ],
    "traditions": [
      {
        "name": "Fête du Dipri",
        "description": "Traditional festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f544ea"
      }
    ],
    "touristAttractions": [
      {
        "name": "Taï National Park",
        "description": "UNESCO World Heritage site",
        "location": "Southwest",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544eb"
      }
    ],
    "capital": "Yamoussoukro",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 7, 1960",
    "nationalDay": "August 7",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.429Z",
    "updatedAt": "2025-10-25T18:44:18.429Z"
  },
  {
    "_id": "68fd1a82346f095400f544ec",
    "name": "Kenya",
    "code": "KE",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ke.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -0.0236,
        "longitude": 37.9062
      },
      "area": 580367,
      "borders": [
        "Ethiopia",
        "Somalia",
        "South Sudan",
        "Tanzania",
        "Uganda"
      ],
      "coastline": 536
    },
    "population": {
      "total": 53771296,
      "density": 93,
      "growthRate": 2.3,
      "urbanPopulation": 28
    },
    "gdp": {
      "total": 110000000000,
      "perCapita": 2046,
      "growthRate": 5.4,
      "sectors": {
        "agriculture": 34.5,
        "industry": 17.8,
        "services": 47.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 85.5,
        "_id": "68fd1a82346f095400f544ed"
      },
      {
        "name": "Islam",
        "percentage": 10.9,
        "_id": "68fd1a82346f095400f544ee"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 1.8,
        "_id": "68fd1a82346f095400f544ef"
      }
    ],
    "traditions": [
      {
        "name": "Maasai Culture",
        "description": "Traditional pastoralist culture",
        "category": "cultural",
        "_id": "68fd1a82346f095400f544f0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Maasai Mara",
        "description": "Wildlife reserve",
        "location": "Southwest Kenya",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f544f1"
      }
    ],
    "capital": "Nairobi",
    "currency": "Kenyan Shilling (KES)",
    "languages": [
      "English",
      "Swahili"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "December 12, 1963",
    "nationalDay": "December 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.430Z",
    "updatedAt": "2025-10-25T18:44:18.430Z"
  },
  {
    "_id": "68fd1a82346f095400f544f2",
    "name": "Lesotho",
    "code": "LS",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ls.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -29.61,
        "longitude": 28.2336
      },
      "area": 30355,
      "borders": [
        "South Africa"
      ],
      "coastline": 0
    },
    "population": {
      "total": 2142249,
      "density": 71,
      "growthRate": 0.3,
      "urbanPopulation": 28.6
    },
    "gdp": {
      "total": 2500000000,
      "perCapita": 1167,
      "growthRate": 2.6,
      "sectors": {
        "agriculture": 5.8,
        "industry": 39.2,
        "services": 55
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1a82346f095400f544f3"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 10,
        "_id": "68fd1a82346f095400f544f4"
      }
    ],
    "traditions": [
      {
        "name": "Morija Arts Festival",
        "description": "Cultural celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544f5"
      }
    ],
    "touristAttractions": [
      {
        "name": "Sehlabathebe National Park",
        "description": "Mountain park",
        "location": "Southeast Lesotho",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544f6"
      }
    ],
    "capital": "Maseru",
    "currency": "Lesotho Loti (LSL)",
    "languages": [
      "Sesotho",
      "English"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Parliamentary constitutional monarchy",
    "independence": "October 4, 1966",
    "nationalDay": "October 4",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.431Z",
    "updatedAt": "2025-10-25T18:44:18.431Z"
  },
  {
    "_id": "68fd1a82346f095400f544f7",
    "name": "Liberia",
    "code": "LR",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/lr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 6.4281,
        "longitude": -9.4295
      },
      "area": 111369,
      "borders": [
        "Guinea",
        "Côte d'Ivoire",
        "Sierra Leone"
      ],
      "coastline": 579
    },
    "population": {
      "total": 5057681,
      "density": 45,
      "growthRate": 2.4,
      "urbanPopulation": 51.2
    },
    "gdp": {
      "total": 3200000000,
      "perCapita": 633,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 34,
        "industry": 13.8,
        "services": 52.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 85.6,
        "_id": "68fd1a82346f095400f544f8"
      },
      {
        "name": "Islam",
        "percentage": 12.2,
        "_id": "68fd1a82346f095400f544f9"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 2.2,
        "_id": "68fd1a82346f095400f544fa"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f544fb"
      }
    ],
    "touristAttractions": [
      {
        "name": "Sapo National Park",
        "description": "Wildlife sanctuary",
        "location": "Southeast Liberia",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f544fc"
      }
    ],
    "capital": "Monrovia",
    "currency": "Liberian Dollar (LRD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "July 26, 1847",
    "nationalDay": "July 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.431Z",
    "updatedAt": "2025-10-25T18:44:18.431Z"
  },
  {
    "_id": "68fd1a82346f095400f544fd",
    "name": "Libya",
    "code": "LY",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ly.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 26.3351,
        "longitude": 17.2283
      },
      "area": 1759540,
      "borders": [
        "Algeria",
        "Chad",
        "Egypt",
        "Niger",
        "Sudan",
        "Tunisia"
      ],
      "coastline": 1770
    },
    "population": {
      "total": 6871292,
      "density": 4,
      "growthRate": 1.4,
      "urbanPopulation": 78.4
    },
    "gdp": {
      "total": 33000000000,
      "perCapita": 4803,
      "growthRate": -31.3,
      "sectors": {
        "agriculture": 1.3,
        "industry": 52.3,
        "services": 46.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 96.6,
        "_id": "68fd1a82346f095400f544fe"
      },
      {
        "name": "Christianity",
        "percentage": 2.7,
        "_id": "68fd1a82346f095400f544ff"
      },
      {
        "name": "Other",
        "percentage": 0.7,
        "_id": "68fd1a82346f095400f54500"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54501"
      }
    ],
    "touristAttractions": [
      {
        "name": "Leptis Magna",
        "description": "Ancient Roman city",
        "location": "Eastern Libya",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f54502"
      }
    ],
    "capital": "Tripoli",
    "currency": "Libyan Dinar (LYD)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Mediterranean along coast",
    "government": "Provisional government",
    "independence": "December 24, 1951",
    "nationalDay": "December 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.432Z",
    "updatedAt": "2025-10-25T18:44:18.432Z"
  },
  {
    "_id": "68fd1a82346f095400f54503",
    "name": "Madagascar",
    "code": "MG",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/mg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -18.7669,
        "longitude": 46.8691
      },
      "area": 587041,
      "borders": [],
      "coastline": 4828
    },
    "population": {
      "total": 27691018,
      "density": 47,
      "growthRate": 2.7,
      "urbanPopulation": 38.5
    },
    "gdp": {
      "total": 14000000000,
      "perCapita": 506,
      "growthRate": 4.2,
      "sectors": {
        "agriculture": 24,
        "industry": 19.5,
        "services": 56.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 41,
        "_id": "68fd1a82346f095400f54504"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 52,
        "_id": "68fd1a82346f095400f54505"
      },
      {
        "name": "Islam",
        "percentage": 7,
        "_id": "68fd1a82346f095400f54506"
      }
    ],
    "traditions": [
      {
        "name": "Famadihana",
        "description": "Turning of the bones ceremony",
        "category": "ceremony",
        "_id": "68fd1a82346f095400f54507"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tsingy de Bemaraha",
        "description": "UNESCO World Heritage limestone formations",
        "location": "Western Madagascar",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54508"
      }
    ],
    "capital": "Antananarivo",
    "currency": "Malagasy Ariary (MGA)",
    "languages": [
      "Malagasy",
      "French"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Tropical along coast",
    "government": "Semi-presidential republic",
    "independence": "June 26, 1960",
    "nationalDay": "June 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.432Z",
    "updatedAt": "2025-10-25T18:44:18.432Z"
  },
  {
    "_id": "68fd1a82346f095400f54509",
    "name": "Malawi",
    "code": "MW",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/mw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -13.2543,
        "longitude": 34.3015
      },
      "area": 118484,
      "borders": [
        "Mozambique",
        "Tanzania",
        "Zambia"
      ],
      "coastline": 0
    },
    "population": {
      "total": 19129952,
      "density": 161,
      "growthRate": 2.7,
      "urbanPopulation": 17.3
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 627,
      "growthRate": 4,
      "sectors": {
        "agriculture": 28.6,
        "industry": 15.4,
        "services": 56
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 82.6,
        "_id": "68fd1a82346f095400f5450a"
      },
      {
        "name": "Islam",
        "percentage": 13,
        "_id": "68fd1a82346f095400f5450b"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 4.4,
        "_id": "68fd1a82346f095400f5450c"
      }
    ],
    "traditions": [
      {
        "name": "Lake of Stars Festival",
        "description": "Music festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f5450d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Lake Malawi",
        "description": "UNESCO World Heritage freshwater lake",
        "location": "Eastern Malawi",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f5450e"
      }
    ],
    "capital": "Lilongwe",
    "currency": "Malawian Kwacha (MWK)",
    "languages": [
      "English",
      "Chichewa"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Subtropical",
    "government": "Presidential republic",
    "independence": "July 6, 1964",
    "nationalDay": "July 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.433Z",
    "updatedAt": "2025-10-25T18:44:18.433Z"
  },
  {
    "_id": "68fd1a82346f095400f5450f",
    "name": "Mali",
    "code": "ML",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ml.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 17.5707,
        "longitude": -3.9962
      },
      "area": 1240192,
      "borders": [
        "Algeria",
        "Burkina Faso",
        "Côte d'Ivoire",
        "Guinea",
        "Mauritania",
        "Niger",
        "Senegal"
      ],
      "coastline": 0
    },
    "population": {
      "total": 20250833,
      "density": 16,
      "growthRate": 3,
      "urbanPopulation": 43.5
    },
    "gdp": {
      "total": 17000000000,
      "perCapita": 839,
      "growthRate": 5,
      "sectors": {
        "agriculture": 41,
        "industry": 18,
        "services": 41
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 94.8,
        "_id": "68fd1a82346f095400f54510"
      },
      {
        "name": "Christianity",
        "percentage": 2.4,
        "_id": "68fd1a82346f095400f54511"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 2.8,
        "_id": "68fd1a82346f095400f54512"
      }
    ],
    "traditions": [
      {
        "name": "Festival au Désert",
        "description": "Desert music festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f54513"
      }
    ],
    "touristAttractions": [
      {
        "name": "Timbuktu",
        "description": "Historic trading city",
        "location": "Northern Mali",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f54514"
      }
    ],
    "capital": "Bamako",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Subtropical to arid",
    "government": "Transitional government",
    "independence": "September 22, 1960",
    "nationalDay": "September 22",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.435Z",
    "updatedAt": "2025-10-25T18:44:18.435Z"
  },
  {
    "_id": "68fd1a82346f095400f54515",
    "name": "Mauritania",
    "code": "MR",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/mr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 21.0079,
        "longitude": -10.9408
      },
      "area": 1030700,
      "borders": [
        "Algeria",
        "Mali",
        "Senegal"
      ],
      "coastline": 754
    },
    "population": {
      "total": 4649658,
      "density": 5,
      "growthRate": 2.7,
      "urbanPopulation": 53.7
    },
    "gdp": {
      "total": 5000000000,
      "perCapita": 1075,
      "growthRate": 3.5,
      "sectors": {
        "agriculture": 27.8,
        "industry": 29.3,
        "services": 42.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 100,
        "_id": "68fd1a82346f095400f54516"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54517"
      }
    ],
    "touristAttractions": [
      {
        "name": "Banc d'Arguin National Park",
        "description": "UNESCO World Heritage site",
        "location": "Atlantic coast",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54518"
      }
    ],
    "capital": "Nouakchott",
    "currency": "Mauritanian Ouguiya (MRU)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Desert",
    "government": "Presidential republic",
    "independence": "November 28, 1960",
    "nationalDay": "November 28",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.436Z",
    "updatedAt": "2025-10-25T18:44:18.436Z"
  },
  {
    "_id": "68fd1a82346f095400f54519",
    "name": "Mauritius",
    "code": "MU",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/mu.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -20.3484,
        "longitude": 57.5522
      },
      "area": 2040,
      "borders": [],
      "coastline": 177
    },
    "population": {
      "total": 1271768,
      "density": 623,
      "growthRate": 0.1,
      "urbanPopulation": 40.8
    },
    "gdp": {
      "total": 14000000000,
      "perCapita": 11008,
      "growthRate": 3.6,
      "sectors": {
        "agriculture": 4,
        "industry": 22,
        "services": 74
      }
    },
    "religions": [
      {
        "name": "Hinduism",
        "percentage": 48.5,
        "_id": "68fd1a82346f095400f5451a"
      },
      {
        "name": "Christianity",
        "percentage": 32.7,
        "_id": "68fd1a82346f095400f5451b"
      },
      {
        "name": "Islam",
        "percentage": 17.3,
        "_id": "68fd1a82346f095400f5451c"
      }
    ],
    "traditions": [
      {
        "name": "Divali",
        "description": "Hindu festival of lights",
        "category": "festival",
        "_id": "68fd1a82346f095400f5451d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Le Morne Brabant",
        "description": "UNESCO World Heritage mountain",
        "location": "Southwest Mauritius",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f5451e"
      }
    ],
    "capital": "Port Louis",
    "currency": "Mauritian Rupee (MUR)",
    "languages": [
      "English",
      "French",
      "Creole"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "March 12, 1968",
    "nationalDay": "March 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.437Z",
    "updatedAt": "2025-10-25T18:44:18.437Z"
  },
  {
    "_id": "68fd1a82346f095400f5451f",
    "name": "Morocco",
    "code": "MA",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ma.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 31.6295,
        "longitude": -7.9811
      },
      "area": 446550,
      "borders": [
        "Algeria",
        "Western Sahara"
      ],
      "coastline": 1835
    },
    "population": {
      "total": 36910560,
      "density": 83,
      "growthRate": 1.2,
      "urbanPopulation": 63
    },
    "gdp": {
      "total": 120000000000,
      "perCapita": 3251,
      "growthRate": 3,
      "sectors": {
        "agriculture": 14,
        "industry": 29,
        "services": 57
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99,
        "_id": "68fd1a82346f095400f54520"
      },
      {
        "name": "Christianity",
        "percentage": 1,
        "_id": "68fd1a82346f095400f54521"
      }
    ],
    "traditions": [
      {
        "name": "Mawlid",
        "description": "Prophet's birthday celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54522"
      }
    ],
    "touristAttractions": [
      {
        "name": "Marrakech",
        "description": "Historic imperial city",
        "location": "Central Morocco",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54523"
      }
    ],
    "capital": "Rabat",
    "currency": "Moroccan Dirham (MAD)",
    "languages": [
      "Arabic",
      "Berber"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Mediterranean",
    "government": "Parliamentary constitutional monarchy",
    "independence": "March 2, 1956",
    "nationalDay": "July 30",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.437Z",
    "updatedAt": "2025-10-25T18:44:18.437Z"
  },
  {
    "_id": "68fd1a82346f095400f54524",
    "name": "Mozambique",
    "code": "MZ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/mz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -18.6657,
        "longitude": 35.5296
      },
      "area": 801590,
      "borders": [
        "Malawi",
        "South Africa",
        "Swaziland",
        "Tanzania",
        "Zambia",
        "Zimbabwe"
      ],
      "coastline": 2470
    },
    "population": {
      "total": 31255435,
      "density": 39,
      "growthRate": 2.9,
      "urbanPopulation": 37
    },
    "gdp": {
      "total": 15000000000,
      "perCapita": 480,
      "growthRate": 2.3,
      "sectors": {
        "agriculture": 23.9,
        "industry": 19.3,
        "services": 56.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 56.1,
        "_id": "68fd1a82346f095400f54525"
      },
      {
        "name": "Islam",
        "percentage": 17.9,
        "_id": "68fd1a82346f095400f54526"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 26,
        "_id": "68fd1a82346f095400f54527"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54528"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bazaruto Archipelago",
        "description": "Marine national park",
        "location": "Indian Ocean",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54529"
      }
    ],
    "capital": "Maputo",
    "currency": "Mozambican Metical (MZN)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "June 25, 1975",
    "nationalDay": "June 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.437Z",
    "updatedAt": "2025-10-25T18:44:18.437Z"
  },
  {
    "_id": "68fd1a82346f095400f5452a",
    "name": "Namibia",
    "code": "NA",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/na.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -22.9576,
        "longitude": 18.4904
      },
      "area": 824292,
      "borders": [
        "Angola",
        "Botswana",
        "South Africa",
        "Zambia"
      ],
      "coastline": 1572
    },
    "population": {
      "total": 2540905,
      "density": 3,
      "growthRate": 1.9,
      "urbanPopulation": 50.7
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 4722,
      "growthRate": -0.8,
      "sectors": {
        "agriculture": 6.7,
        "industry": 26.3,
        "services": 67
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1a82346f095400f5452b"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 10,
        "_id": "68fd1a82346f095400f5452c"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5452d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Etosha National Park",
        "description": "Wildlife sanctuary",
        "location": "Northern Namibia",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f5452e"
      }
    ],
    "capital": "Windhoek",
    "currency": "Namibian Dollar (NAD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Desert",
    "government": "Presidential republic",
    "independence": "March 21, 1990",
    "nationalDay": "March 21",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.438Z",
    "updatedAt": "2025-10-25T18:44:18.438Z"
  },
  {
    "_id": "68fd1a82346f095400f5452f",
    "name": "Niger",
    "code": "NE",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ne.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 17.6078,
        "longitude": 8.0817
      },
      "area": 1267000,
      "borders": [
        "Algeria",
        "Benin",
        "Burkina Faso",
        "Chad",
        "Libya",
        "Mali",
        "Nigeria"
      ],
      "coastline": 0
    },
    "population": {
      "total": 24206644,
      "density": 19,
      "growthRate": 3.8,
      "urbanPopulation": 16.5
    },
    "gdp": {
      "total": 13000000000,
      "perCapita": 537,
      "growthRate": 5.9,
      "sectors": {
        "agriculture": 39.6,
        "industry": 20.2,
        "services": 40.2
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.3,
        "_id": "68fd1a82346f095400f54530"
      },
      {
        "name": "Christianity",
        "percentage": 0.3,
        "_id": "68fd1a82346f095400f54531"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 0.4,
        "_id": "68fd1a82346f095400f54532"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54533"
      }
    ],
    "touristAttractions": [
      {
        "name": "Air and Ténéré Natural Reserves",
        "description": "UNESCO World Heritage site",
        "location": "Northern Niger",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54534"
      }
    ],
    "capital": "Niamey",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Desert",
    "government": "Presidential republic",
    "independence": "August 3, 1960",
    "nationalDay": "August 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.438Z",
    "updatedAt": "2025-10-25T18:44:18.438Z"
  },
  {
    "_id": "68fd1a82346f095400f54535",
    "name": "Nigeria",
    "code": "NG",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ng.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 9.082,
        "longitude": 8.6753
      },
      "area": 923768,
      "borders": [
        "Benin",
        "Cameroon",
        "Chad",
        "Niger"
      ],
      "coastline": 853
    },
    "population": {
      "total": 206139589,
      "density": 223,
      "growthRate": 2.6,
      "urbanPopulation": 52
    },
    "gdp": {
      "total": 448000000000,
      "perCapita": 2173,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 21.1,
        "industry": 23.4,
        "services": 55.5
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 50,
        "_id": "68fd1a82346f095400f54536"
      },
      {
        "name": "Christianity",
        "percentage": 40,
        "_id": "68fd1a82346f095400f54537"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 10,
        "_id": "68fd1a82346f095400f54538"
      }
    ],
    "traditions": [
      {
        "name": "Nollywood",
        "description": "Film industry",
        "category": "art",
        "_id": "68fd1a82346f095400f54539"
      }
    ],
    "touristAttractions": [
      {
        "name": "Yankari National Park",
        "description": "Wildlife reserve",
        "location": "Bauchi State",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f5453a"
      }
    ],
    "capital": "Abuja",
    "currency": "Nigerian Naira (NGN)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Tropical",
    "government": "Federal presidential republic",
    "independence": "October 1, 1960",
    "nationalDay": "October 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.439Z",
    "updatedAt": "2025-10-25T18:44:18.439Z"
  },
  {
    "_id": "68fd1a82346f095400f5453b",
    "name": "Rwanda",
    "code": "RW",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/rw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -1.9403,
        "longitude": 29.8739
      },
      "area": 26338,
      "borders": [
        "Burundi",
        "Democratic Republic of the Congo",
        "Tanzania",
        "Uganda"
      ],
      "coastline": 0
    },
    "population": {
      "total": 12952218,
      "density": 492,
      "growthRate": 2.3,
      "urbanPopulation": 17.2
    },
    "gdp": {
      "total": 10000000000,
      "perCapita": 772,
      "growthRate": 8,
      "sectors": {
        "agriculture": 30.9,
        "industry": 17.6,
        "services": 51.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 93.4,
        "_id": "68fd1a82346f095400f5453c"
      },
      {
        "name": "Islam",
        "percentage": 4.9,
        "_id": "68fd1a82346f095400f5453d"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 1.7,
        "_id": "68fd1a82346f095400f5453e"
      }
    ],
    "traditions": [
      {
        "name": "Umuganda",
        "description": "Community work day",
        "category": "custom",
        "_id": "68fd1a82346f095400f5453f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Volcanoes National Park",
        "description": "Mountain gorilla sanctuary",
        "location": "Northwest Rwanda",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54540"
      }
    ],
    "capital": "Kigali",
    "currency": "Rwandan Franc (RWF)",
    "languages": [
      "Kinyarwanda",
      "French",
      "English"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Presidential republic",
    "independence": "July 1, 1962",
    "nationalDay": "July 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.439Z",
    "updatedAt": "2025-10-25T18:44:18.439Z"
  },
  {
    "_id": "68fd1a82346f095400f54541",
    "name": "São Tomé and Príncipe",
    "code": "ST",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/st.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 0.1864,
        "longitude": 6.6131
      },
      "area": 964,
      "borders": [],
      "coastline": 209
    },
    "population": {
      "total": 219159,
      "density": 227,
      "growthRate": 1.8,
      "urbanPopulation": 73.2
    },
    "gdp": {
      "total": 400000000,
      "perCapita": 1825,
      "growthRate": 4,
      "sectors": {
        "agriculture": 11.8,
        "industry": 14.8,
        "services": 73.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 80,
        "_id": "68fd1a82346f095400f54542"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 20,
        "_id": "68fd1a82346f095400f54543"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54544"
      }
    ],
    "touristAttractions": [
      {
        "name": "Obo Natural Park",
        "description": "Biodiversity reserve",
        "location": "São Tomé Island",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54545"
      }
    ],
    "capital": "São Tomé",
    "currency": "São Tomé and Príncipe Dobra (STN)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Semi-presidential republic",
    "independence": "July 12, 1975",
    "nationalDay": "July 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.440Z",
    "updatedAt": "2025-10-25T18:44:18.440Z"
  },
  {
    "_id": "68fd1a82346f095400f54546",
    "name": "Senegal",
    "code": "SN",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/sn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 14.4974,
        "longitude": -14.4524
      },
      "area": 196722,
      "borders": [
        "Gambia",
        "Guinea",
        "Guinea-Bissau",
        "Mali",
        "Mauritania"
      ],
      "coastline": 531
    },
    "population": {
      "total": 16743927,
      "density": 85,
      "growthRate": 2.7,
      "urbanPopulation": 47.2
    },
    "gdp": {
      "total": 24000000000,
      "perCapita": 1433,
      "growthRate": 6.8,
      "sectors": {
        "agriculture": 16.9,
        "industry": 24.3,
        "services": 58.8
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 96.1,
        "_id": "68fd1a82346f095400f54547"
      },
      {
        "name": "Christianity",
        "percentage": 3.9,
        "_id": "68fd1a82346f095400f54548"
      }
    ],
    "traditions": [
      {
        "name": "Festival of Saint-Louis",
        "description": "Cultural festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f54549"
      }
    ],
    "touristAttractions": [
      {
        "name": "Gorée Island",
        "description": "UNESCO World Heritage site",
        "location": "Dakar",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f5454a"
      }
    ],
    "capital": "Dakar",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "April 4, 1960",
    "nationalDay": "April 4",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.440Z",
    "updatedAt": "2025-10-25T18:44:18.440Z"
  },
  {
    "_id": "68fd1a82346f095400f5454b",
    "name": "Seychelles",
    "code": "SC",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/sc.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -4.6796,
        "longitude": 55.492
      },
      "area": 452,
      "borders": [],
      "coastline": 491
    },
    "population": {
      "total": 98347,
      "density": 218,
      "growthRate": 0.6,
      "urbanPopulation": 56.8
    },
    "gdp": {
      "total": 1600000000,
      "perCapita": 16263,
      "growthRate": 3,
      "sectors": {
        "agriculture": 2.5,
        "industry": 13.8,
        "services": 83.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 76.2,
        "_id": "68fd1a82346f095400f5454c"
      },
      {
        "name": "Hinduism",
        "percentage": 10.6,
        "_id": "68fd1a82346f095400f5454d"
      },
      {
        "name": "Islam",
        "percentage": 2.4,
        "_id": "68fd1a82346f095400f5454e"
      }
    ],
    "traditions": [
      {
        "name": "Festival Kreol",
        "description": "Creole culture festival",
        "category": "festival",
        "_id": "68fd1a82346f095400f5454f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Aldabra Atoll",
        "description": "UNESCO World Heritage site",
        "location": "Indian Ocean",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54550"
      }
    ],
    "capital": "Victoria",
    "currency": "Seychellois Rupee (SCR)",
    "languages": [
      "Seychellois Creole",
      "English",
      "French"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Tropical marine",
    "government": "Presidential republic",
    "independence": "June 29, 1976",
    "nationalDay": "June 29",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.440Z",
    "updatedAt": "2025-10-25T18:44:18.440Z"
  },
  {
    "_id": "68fd1a82346f095400f54551",
    "name": "Sierra Leone",
    "code": "SL",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/sl.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 8.4606,
        "longitude": -11.7799
      },
      "area": 71740,
      "borders": [
        "Guinea",
        "Liberia"
      ],
      "coastline": 402
    },
    "population": {
      "total": 7976983,
      "density": 111,
      "growthRate": 2.1,
      "urbanPopulation": 42.1
    },
    "gdp": {
      "total": 4000000000,
      "perCapita": 501,
      "growthRate": 3.8,
      "sectors": {
        "agriculture": 60.7,
        "industry": 6.5,
        "services": 32.8
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 78.6,
        "_id": "68fd1a82346f095400f54552"
      },
      {
        "name": "Christianity",
        "percentage": 20.8,
        "_id": "68fd1a82346f095400f54553"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 0.6,
        "_id": "68fd1a82346f095400f54554"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54555"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tacugama Chimpanzee Sanctuary",
        "description": "Wildlife sanctuary",
        "location": "Western Area",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54556"
      }
    ],
    "capital": "Freetown",
    "currency": "Sierra Leonean Leone (SLL)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "April 27, 1961",
    "nationalDay": "April 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.441Z",
    "updatedAt": "2025-10-25T18:44:18.441Z"
  },
  {
    "_id": "68fd1a82346f095400f54557",
    "name": "Somalia",
    "code": "SO",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/so.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 5.1521,
        "longitude": 46.1996
      },
      "area": 637657,
      "borders": [
        "Djibouti",
        "Ethiopia",
        "Kenya"
      ],
      "coastline": 3025
    },
    "population": {
      "total": 15893222,
      "density": 25,
      "growthRate": 2.9,
      "urbanPopulation": 46
    },
    "gdp": {
      "total": 7000000000,
      "perCapita": 440,
      "growthRate": 2.8,
      "sectors": {
        "agriculture": 60.2,
        "industry": 7.4,
        "services": 32.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.8,
        "_id": "68fd1a82346f095400f54558"
      },
      {
        "name": "Christianity",
        "percentage": 0.2,
        "_id": "68fd1a82346f095400f54559"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5455a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Laas Geel",
        "description": "Prehistoric cave paintings",
        "location": "Somaliland",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f5455b"
      }
    ],
    "capital": "Mogadishu",
    "currency": "Somali Shilling (SOS)",
    "languages": [
      "Somali",
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Principally desert",
    "government": "Federal parliamentary republic",
    "independence": "July 1, 1960",
    "nationalDay": "July 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.441Z",
    "updatedAt": "2025-10-25T18:44:18.441Z"
  },
  {
    "_id": "68fd1a82346f095400f5455c",
    "name": "South Africa",
    "code": "ZA",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/za.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -30.5595,
        "longitude": 22.9375
      },
      "area": 1221037,
      "borders": [
        "Botswana",
        "Lesotho",
        "Mozambique",
        "Namibia",
        "Eswatini",
        "Zimbabwe"
      ],
      "coastline": 2798
    },
    "population": {
      "total": 59308690,
      "density": 49,
      "growthRate": 1.3,
      "urbanPopulation": 66.4
    },
    "gdp": {
      "total": 419000000000,
      "perCapita": 7065,
      "growthRate": 0.2,
      "sectors": {
        "agriculture": 2.8,
        "industry": 29.7,
        "services": 67.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 86,
        "_id": "68fd1a82346f095400f5455d"
      },
      {
        "name": "Islam",
        "percentage": 1.7,
        "_id": "68fd1a82346f095400f5455e"
      },
      {
        "name": "Hinduism",
        "percentage": 1,
        "_id": "68fd1a82346f095400f5455f"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 5.4,
        "_id": "68fd1a82346f095400f54560"
      }
    ],
    "traditions": [
      {
        "name": "Heritage Day",
        "description": "Cultural celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54561"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kruger National Park",
        "description": "Wildlife sanctuary",
        "location": "Northeast South Africa",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54562"
      }
    ],
    "capital": "Cape Town",
    "currency": "South African Rand (ZAR)",
    "languages": [
      "Afrikaans",
      "English",
      "Zulu",
      "Xhosa"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "May 31, 1910",
    "nationalDay": "April 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.442Z",
    "updatedAt": "2025-10-25T18:44:18.442Z"
  },
  {
    "_id": "68fd1a82346f095400f54563",
    "name": "South Sudan",
    "code": "SS",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ss.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 6.877,
        "longitude": 31.3069
      },
      "area": 644329,
      "borders": [
        "Central African Republic",
        "Democratic Republic of the Congo",
        "Ethiopia",
        "Kenya",
        "Sudan",
        "Uganda"
      ],
      "coastline": 0
    },
    "population": {
      "total": 11193725,
      "density": 17,
      "growthRate": 5,
      "urbanPopulation": 20.5
    },
    "gdp": {
      "total": 3000000000,
      "perCapita": 268,
      "growthRate": -11,
      "sectors": {
        "agriculture": 15,
        "industry": 8,
        "services": 77
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 60.5,
        "_id": "68fd1a82346f095400f54564"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 32.9,
        "_id": "68fd1a82346f095400f54565"
      },
      {
        "name": "Islam",
        "percentage": 6.6,
        "_id": "68fd1a82346f095400f54566"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54567"
      }
    ],
    "touristAttractions": [
      {
        "name": "Boma National Park",
        "description": "Wildlife sanctuary",
        "location": "Eastern South Sudan",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54568"
      }
    ],
    "capital": "Juba",
    "currency": "South Sudanese Pound (SSP)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Hot with seasonal rainfall",
    "government": "Presidential republic",
    "independence": "July 9, 2011",
    "nationalDay": "July 9",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.442Z",
    "updatedAt": "2025-10-25T18:44:18.442Z"
  },
  {
    "_id": "68fd1a82346f095400f54569",
    "name": "Sudan",
    "code": "SD",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/sd.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.8628,
        "longitude": 30.2176
      },
      "area": 1886068,
      "borders": [
        "Central African Republic",
        "Chad",
        "Egypt",
        "Eritrea",
        "Ethiopia",
        "Libya",
        "South Sudan"
      ],
      "coastline": 853
    },
    "population": {
      "total": 43849260,
      "density": 23,
      "growthRate": 2.4,
      "urbanPopulation": 35
    },
    "gdp": {
      "total": 33000000000,
      "perCapita": 753,
      "growthRate": -2.3,
      "sectors": {
        "agriculture": 39.6,
        "industry": 2.6,
        "services": 57.8
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 97,
        "_id": "68fd1a82346f095400f5456a"
      },
      {
        "name": "Christianity",
        "percentage": 3,
        "_id": "68fd1a82346f095400f5456b"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5456c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Meroe",
        "description": "Ancient pyramids",
        "location": "Northern Sudan",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f5456d"
      }
    ],
    "capital": "Khartoum",
    "currency": "Sudanese Pound (SDG)",
    "languages": [
      "Arabic",
      "English"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Hot and dry",
    "government": "Transitional government",
    "independence": "January 1, 1956",
    "nationalDay": "January 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.443Z",
    "updatedAt": "2025-10-25T18:44:18.443Z"
  },
  {
    "_id": "68fd1a82346f095400f5456e",
    "name": "Tanzania",
    "code": "TZ",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/tz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -6.369,
        "longitude": 34.8888
      },
      "area": 945087,
      "borders": [
        "Burundi",
        "Democratic Republic of the Congo",
        "Kenya",
        "Malawi",
        "Mozambique",
        "Rwanda",
        "Uganda",
        "Zambia"
      ],
      "coastline": 1424
    },
    "population": {
      "total": 59734218,
      "density": 63,
      "growthRate": 3,
      "urbanPopulation": 35.2
    },
    "gdp": {
      "total": 62000000000,
      "perCapita": 1038,
      "growthRate": 5.4,
      "sectors": {
        "agriculture": 23.4,
        "industry": 28.6,
        "services": 48
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 61.4,
        "_id": "68fd1a82346f095400f5456f"
      },
      {
        "name": "Islam",
        "percentage": 35.2,
        "_id": "68fd1a82346f095400f54570"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 3.4,
        "_id": "68fd1a82346f095400f54571"
      }
    ],
    "traditions": [
      {
        "name": "Union Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54572"
      }
    ],
    "touristAttractions": [
      {
        "name": "Serengeti National Park",
        "description": "UNESCO World Heritage site",
        "location": "Northern Tanzania",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54573"
      }
    ],
    "capital": "Dodoma",
    "currency": "Tanzanian Shilling (TZS)",
    "languages": [
      "Swahili",
      "English"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "December 9, 1961",
    "nationalDay": "April 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.443Z",
    "updatedAt": "2025-10-25T18:44:18.443Z"
  },
  {
    "_id": "68fd1a82346f095400f54574",
    "name": "Togo",
    "code": "TG",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/tg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 8.6195,
        "longitude": 0.8248
      },
      "area": 56785,
      "borders": [
        "Benin",
        "Burkina Faso",
        "Ghana"
      ],
      "coastline": 56
    },
    "population": {
      "total": 8278724,
      "density": 146,
      "growthRate": 2.4,
      "urbanPopulation": 42.4
    },
    "gdp": {
      "total": 14000000000,
      "perCapita": 1691,
      "growthRate": 4.4,
      "sectors": {
        "agriculture": 28.8,
        "industry": 21.8,
        "services": 49.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 43.7,
        "_id": "68fd1a82346f095400f54575"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 35.6,
        "_id": "68fd1a82346f095400f54576"
      },
      {
        "name": "Islam",
        "percentage": 14,
        "_id": "68fd1a82346f095400f54577"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54578"
      }
    ],
    "touristAttractions": [
      {
        "name": "Koutammakou",
        "description": "UNESCO World Heritage site",
        "location": "Northern Togo",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1a82346f095400f54579"
      }
    ],
    "capital": "Lomé",
    "currency": "West African CFA Franc (XOF)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "April 27, 1960",
    "nationalDay": "April 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.444Z",
    "updatedAt": "2025-10-25T18:44:18.444Z"
  },
  {
    "_id": "68fd1a82346f095400f5457a",
    "name": "Tunisia",
    "code": "TN",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/tn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 33.8869,
        "longitude": 9.5375
      },
      "area": 163610,
      "borders": [
        "Algeria",
        "Libya"
      ],
      "coastline": 1148
    },
    "population": {
      "total": 11818619,
      "density": 72,
      "growthRate": 0.9,
      "urbanPopulation": 69.9
    },
    "gdp": {
      "total": 40000000000,
      "perCapita": 3384,
      "growthRate": 1,
      "sectors": {
        "agriculture": 10.1,
        "industry": 20,
        "services": 69.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.1,
        "_id": "68fd1a82346f095400f5457b"
      },
      {
        "name": "Christianity",
        "percentage": 0.9,
        "_id": "68fd1a82346f095400f5457c"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5457d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Carthage",
        "description": "Ancient Phoenician city",
        "location": "Tunis",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f5457e"
      }
    ],
    "capital": "Tunis",
    "currency": "Tunisian Dinar (TND)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate in north",
    "government": "Parliamentary republic",
    "independence": "March 20, 1956",
    "nationalDay": "March 20",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.444Z",
    "updatedAt": "2025-10-25T18:44:18.444Z"
  },
  {
    "_id": "68fd1a82346f095400f5457f",
    "name": "Uganda",
    "code": "UG",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/ug.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 1.3733,
        "longitude": 32.2903
      },
      "area": 241550,
      "borders": [
        "Democratic Republic of the Congo",
        "Kenya",
        "Rwanda",
        "South Sudan",
        "Tanzania"
      ],
      "coastline": 0
    },
    "population": {
      "total": 45741007,
      "density": 189,
      "growthRate": 3.3,
      "urbanPopulation": 25.4
    },
    "gdp": {
      "total": 34000000000,
      "perCapita": 743,
      "growthRate": 6.2,
      "sectors": {
        "agriculture": 24.2,
        "industry": 21.1,
        "services": 54.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 85.2,
        "_id": "68fd1a82346f095400f54580"
      },
      {
        "name": "Islam",
        "percentage": 12.1,
        "_id": "68fd1a82346f095400f54581"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 2.7,
        "_id": "68fd1a82346f095400f54582"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54583"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bwindi Impenetrable National Park",
        "description": "Mountain gorilla sanctuary",
        "location": "Southwest Uganda",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f54584"
      }
    ],
    "capital": "Kampala",
    "currency": "Ugandan Shilling (UGX)",
    "languages": [
      "English",
      "Swahili"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "October 9, 1962",
    "nationalDay": "October 9",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.447Z",
    "updatedAt": "2025-10-25T18:44:18.447Z"
  },
  {
    "_id": "68fd1a82346f095400f54585",
    "name": "Zambia",
    "code": "ZM",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/zm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -13.1339,
        "longitude": 27.8493
      },
      "area": 752612,
      "borders": [
        "Angola",
        "Botswana",
        "Democratic Republic of the Congo",
        "Malawi",
        "Mozambique",
        "Namibia",
        "Tanzania",
        "Zimbabwe"
      ],
      "coastline": 0
    },
    "population": {
      "total": 18383955,
      "density": 24,
      "growthRate": 2.9,
      "urbanPopulation": 44.7
    },
    "gdp": {
      "total": 23000000000,
      "perCapita": 1251,
      "growthRate": 1.4,
      "sectors": {
        "agriculture": 7.5,
        "industry": 35.3,
        "services": 57.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 95.5,
        "_id": "68fd1a82346f095400f54586"
      },
      {
        "name": "Islam",
        "percentage": 0.5,
        "_id": "68fd1a82346f095400f54587"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 4,
        "_id": "68fd1a82346f095400f54588"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f54589"
      }
    ],
    "touristAttractions": [
      {
        "name": "Victoria Falls",
        "description": "UNESCO World Heritage waterfall",
        "location": "Livingstone",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1a82346f095400f5458a"
      }
    ],
    "capital": "Lusaka",
    "currency": "Zambian Kwacha (ZMW)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "October 24, 1964",
    "nationalDay": "October 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.448Z",
    "updatedAt": "2025-10-25T18:44:18.448Z"
  },
  {
    "_id": "68fd1a82346f095400f5458b",
    "name": "Zimbabwe",
    "code": "ZW",
    "continent": "Africa",
    "flag": "https://flagcdn.com/w320/zw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -19.0154,
        "longitude": 29.1549
      },
      "area": 390757,
      "borders": [
        "Botswana",
        "Mozambique",
        "South Africa",
        "Zambia"
      ],
      "coastline": 0
    },
    "population": {
      "total": 14862924,
      "density": 38,
      "growthRate": 2,
      "urbanPopulation": 32.2
    },
    "gdp": {
      "total": 18000000000,
      "perCapita": 1211,
      "growthRate": 3,
      "sectors": {
        "agriculture": 8,
        "industry": 24.6,
        "services": 67.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 87,
        "_id": "68fd1a82346f095400f5458c"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 13,
        "_id": "68fd1a82346f095400f5458d"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1a82346f095400f5458e"
      }
    ],
    "touristAttractions": [
      {
        "name": "Great Zimbabwe",
        "description": "UNESCO World Heritage ruins",
        "location": "Masvingo",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1a82346f095400f5458f"
      }
    ],
    "capital": "Harare",
    "currency": "Zimbabwean Dollar (ZWL)",
    "languages": [
      "English",
      "Shona",
      "Ndebele"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "April 18, 1980",
    "nationalDay": "April 18",
    "__v": 0,
    "createdAt": "2025-10-25T18:44:18.449Z",
    "updatedAt": "2025-10-25T18:44:18.449Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031094",
    "name": "Afghanistan",
    "code": "AF",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/af.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 33.9391,
        "longitude": 67.71
      },
      "area": 652230,
      "borders": [
        "China",
        "Iran",
        "Pakistan",
        "Tajikistan",
        "Turkmenistan",
        "Uzbekistan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 38928346,
      "density": 60,
      "growthRate": 2.3,
      "urbanPopulation": 25.4
    },
    "gdp": {
      "total": 19800000000,
      "perCapita": 508,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 23,
        "industry": 21.1,
        "services": 55.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.7,
        "_id": "68fd1b0885cd5a0e05031095"
      },
      {
        "name": "Other",
        "percentage": 0.3,
        "_id": "68fd1b0885cd5a0e05031096"
      }
    ],
    "traditions": [
      {
        "name": "Nowruz",
        "description": "Persian New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031097"
      }
    ],
    "touristAttractions": [
      {
        "name": "Buddha Statues of Bamiyan",
        "description": "Ancient Buddhist monuments",
        "location": "Bamiyan Valley",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031098"
      }
    ],
    "capital": "Kabul",
    "currency": "Afghan Afghani (AFN)",
    "languages": [
      "Pashto",
      "Dari"
    ],
    "timezone": [
      "UTC+4:30"
    ],
    "climate": "Arid to semiarid",
    "government": "Islamic emirate",
    "independence": "August 19, 1919",
    "nationalDay": "August 19",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.779Z",
    "updatedAt": "2025-10-25T18:46:32.779Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031099",
    "name": "Armenia",
    "code": "AM",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/am.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 40.0691,
        "longitude": 45.0382
      },
      "area": 29743,
      "borders": [
        "Azerbaijan",
        "Georgia",
        "Iran",
        "Turkey"
      ],
      "coastline": 0
    },
    "population": {
      "total": 2963243,
      "density": 100,
      "growthRate": 0.2,
      "urbanPopulation": 63
    },
    "gdp": {
      "total": 13000000000,
      "perCapita": 4386,
      "growthRate": 5.7,
      "sectors": {
        "agriculture": 16.7,
        "industry": 28.2,
        "services": 55.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 92.6,
        "_id": "68fd1b0885cd5a0e0503109a"
      },
      {
        "name": "Other",
        "percentage": 7.4,
        "_id": "68fd1b0885cd5a0e0503109b"
      }
    ],
    "traditions": [
      {
        "name": "Vardavar",
        "description": "Water festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503109c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Geghard Monastery",
        "description": "UNESCO World Heritage site",
        "location": "Kotayk Province",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503109d"
      }
    ],
    "capital": "Yerevan",
    "currency": "Armenian Dram (AMD)",
    "languages": [
      "Armenian"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Highland continental",
    "government": "Parliamentary republic",
    "independence": "September 21, 1991",
    "nationalDay": "September 21",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.781Z",
    "updatedAt": "2025-10-25T18:46:32.781Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503109e",
    "name": "Azerbaijan",
    "code": "AZ",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/az.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 40.1431,
        "longitude": 47.5769
      },
      "area": 86600,
      "borders": [
        "Armenia",
        "Georgia",
        "Iran",
        "Russia",
        "Turkey"
      ],
      "coastline": 713
    },
    "population": {
      "total": 10139177,
      "density": 117,
      "growthRate": 0.9,
      "urbanPopulation": 56.2
    },
    "gdp": {
      "total": 48000000000,
      "perCapita": 4734,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 6.1,
        "industry": 53.5,
        "services": 40.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 96.9,
        "_id": "68fd1b0885cd5a0e0503109f"
      },
      {
        "name": "Christianity",
        "percentage": 3.1,
        "_id": "68fd1b0885cd5a0e050310a0"
      }
    ],
    "traditions": [
      {
        "name": "Novruz",
        "description": "Persian New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310a1"
      }
    ],
    "touristAttractions": [
      {
        "name": "Old City of Baku",
        "description": "UNESCO World Heritage site",
        "location": "Baku",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310a2"
      }
    ],
    "capital": "Baku",
    "currency": "Azerbaijani Manat (AZN)",
    "languages": [
      "Azerbaijani"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Dry, semiarid steppe",
    "government": "Presidential republic",
    "independence": "October 18, 1991",
    "nationalDay": "May 28",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.782Z",
    "updatedAt": "2025-10-25T18:46:32.782Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310a3",
    "name": "Bahrain",
    "code": "BH",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/bh.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 25.9304,
        "longitude": 50.6378
      },
      "area": 760,
      "borders": [],
      "coastline": 161
    },
    "population": {
      "total": 1701583,
      "density": 2239,
      "growthRate": 1,
      "urbanPopulation": 89.4
    },
    "gdp": {
      "total": 38000000000,
      "perCapita": 22334,
      "growthRate": 1.8,
      "sectors": {
        "agriculture": 0.3,
        "industry": 39.3,
        "services": 60.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 70.3,
        "_id": "68fd1b0885cd5a0e050310a4"
      },
      {
        "name": "Christianity",
        "percentage": 14.5,
        "_id": "68fd1b0885cd5a0e050310a5"
      },
      {
        "name": "Hinduism",
        "percentage": 9.8,
        "_id": "68fd1b0885cd5a0e050310a6"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310a7"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bahrain Fort",
        "description": "UNESCO World Heritage site",
        "location": "Manama",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310a8"
      }
    ],
    "capital": "Manama",
    "currency": "Bahraini Dinar (BHD)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Arid",
    "government": "Constitutional monarchy",
    "independence": "August 15, 1971",
    "nationalDay": "December 16",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.783Z",
    "updatedAt": "2025-10-25T18:46:32.783Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310a9",
    "name": "Bangladesh",
    "code": "BD",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/bd.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 23.685,
        "longitude": 90.3563
      },
      "area": 147570,
      "borders": [
        "India",
        "Myanmar"
      ],
      "coastline": 580
    },
    "population": {
      "total": 164689383,
      "density": 1116,
      "growthRate": 1,
      "urbanPopulation": 37.4
    },
    "gdp": {
      "total": 302600000000,
      "perCapita": 1837,
      "growthRate": 5.2,
      "sectors": {
        "agriculture": 14.2,
        "industry": 29.5,
        "services": 56.3
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 90.4,
        "_id": "68fd1b0885cd5a0e050310aa"
      },
      {
        "name": "Hinduism",
        "percentage": 8.5,
        "_id": "68fd1b0885cd5a0e050310ab"
      },
      {
        "name": "Buddhism",
        "percentage": 0.6,
        "_id": "68fd1b0885cd5a0e050310ac"
      },
      {
        "name": "Christianity",
        "percentage": 0.4,
        "_id": "68fd1b0885cd5a0e050310ad"
      }
    ],
    "traditions": [
      {
        "name": "Pohela Boishakh",
        "description": "Bengali New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310ae"
      }
    ],
    "touristAttractions": [
      {
        "name": "Sundarbans",
        "description": "Largest mangrove forest",
        "location": "Khulna Division",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310af"
      }
    ],
    "capital": "Dhaka",
    "currency": "Bangladeshi Taka (BDT)",
    "languages": [
      "Bengali"
    ],
    "timezone": [
      "UTC+6"
    ],
    "climate": "Tropical monsoon",
    "government": "Parliamentary republic",
    "independence": "March 26, 1971",
    "nationalDay": "March 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.785Z",
    "updatedAt": "2025-10-25T18:46:32.785Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310b0",
    "name": "Bhutan",
    "code": "BT",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/bt.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 27.5142,
        "longitude": 90.4336
      },
      "area": 38394,
      "borders": [
        "China",
        "India"
      ],
      "coastline": 0
    },
    "population": {
      "total": 771608,
      "density": 20,
      "growthRate": 1.1,
      "urbanPopulation": 41
    },
    "gdp": {
      "total": 2500000000,
      "perCapita": 3241,
      "growthRate": 2.4,
      "sectors": {
        "agriculture": 16.2,
        "industry": 41.8,
        "services": 42
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 75.3,
        "_id": "68fd1b0885cd5a0e050310b1"
      },
      {
        "name": "Hinduism",
        "percentage": 22.1,
        "_id": "68fd1b0885cd5a0e050310b2"
      },
      {
        "name": "Other",
        "percentage": 2.6,
        "_id": "68fd1b0885cd5a0e050310b3"
      }
    ],
    "traditions": [
      {
        "name": "Tsechu",
        "description": "Religious festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310b4"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tiger's Nest Monastery",
        "description": "Sacred Buddhist site",
        "location": "Paro Valley",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310b5"
      }
    ],
    "capital": "Thimphu",
    "currency": "Bhutanese Ngultrum (BTN)",
    "languages": [
      "Dzongkha"
    ],
    "timezone": [
      "UTC+6"
    ],
    "climate": "Varies; tropical in southern plains",
    "government": "Constitutional monarchy",
    "independence": "December 17, 1907",
    "nationalDay": "December 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.786Z",
    "updatedAt": "2025-10-25T18:46:32.786Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310b6",
    "name": "Brunei",
    "code": "BN",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/bn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 4.5353,
        "longitude": 114.7277
      },
      "area": 5765,
      "borders": [
        "Malaysia"
      ],
      "coastline": 161
    },
    "population": {
      "total": 437479,
      "density": 76,
      "growthRate": 0.9,
      "urbanPopulation": 78
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 27414,
      "growthRate": 1.3,
      "sectors": {
        "agriculture": 1.2,
        "industry": 56.6,
        "services": 42.2
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 78.8,
        "_id": "68fd1b0885cd5a0e050310b7"
      },
      {
        "name": "Christianity",
        "percentage": 8.7,
        "_id": "68fd1b0885cd5a0e050310b8"
      },
      {
        "name": "Buddhism",
        "percentage": 7.8,
        "_id": "68fd1b0885cd5a0e050310b9"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310ba"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kampong Ayer",
        "description": "Water village",
        "location": "Bandar Seri Begawan",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310bb"
      }
    ],
    "capital": "Bandar Seri Begawan",
    "currency": "Brunei Dollar (BND)",
    "languages": [
      "Malay"
    ],
    "timezone": [
      "UTC+8"
    ],
    "climate": "Tropical",
    "government": "Absolute monarchy",
    "independence": "January 1, 1984",
    "nationalDay": "February 23",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.787Z",
    "updatedAt": "2025-10-25T18:46:32.787Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310bc",
    "name": "Cambodia",
    "code": "KH",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/kh.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.5657,
        "longitude": 104.991
      },
      "area": 181035,
      "borders": [
        "Laos",
        "Thailand",
        "Vietnam"
      ],
      "coastline": 443
    },
    "population": {
      "total": 16718965,
      "density": 92,
      "growthRate": 1.4,
      "urbanPopulation": 24.2
    },
    "gdp": {
      "total": 27000000000,
      "perCapita": 1614,
      "growthRate": 7,
      "sectors": {
        "agriculture": 25.3,
        "industry": 32.8,
        "services": 41.9
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 97.9,
        "_id": "68fd1b0885cd5a0e050310bd"
      },
      {
        "name": "Islam",
        "percentage": 1.1,
        "_id": "68fd1b0885cd5a0e050310be"
      },
      {
        "name": "Christianity",
        "percentage": 0.5,
        "_id": "68fd1b0885cd5a0e050310bf"
      }
    ],
    "traditions": [
      {
        "name": "Water Festival",
        "description": "Annual boat racing festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310c0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Angkor Wat",
        "description": "UNESCO World Heritage temple complex",
        "location": "Siem Reap",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310c1"
      }
    ],
    "capital": "Phnom Penh",
    "currency": "Cambodian Riel (KHR)",
    "languages": [
      "Khmer"
    ],
    "timezone": [
      "UTC+7"
    ],
    "climate": "Tropical monsoon",
    "government": "Constitutional monarchy",
    "independence": "November 9, 1953",
    "nationalDay": "November 9",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.788Z",
    "updatedAt": "2025-10-25T18:46:32.788Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310c2",
    "name": "China",
    "code": "CN",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/cn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 35.8617,
        "longitude": 104.1954
      },
      "area": 9596961,
      "borders": [
        "Afghanistan",
        "Bhutan",
        "India",
        "Kazakhstan",
        "Kyrgyzstan",
        "Laos",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "North Korea",
        "Pakistan",
        "Russia",
        "Tajikistan",
        "Vietnam"
      ],
      "coastline": 14500
    },
    "population": {
      "total": 1439323776,
      "density": 150,
      "growthRate": 0.3,
      "urbanPopulation": 60.3
    },
    "gdp": {
      "total": 14300000000000,
      "perCapita": 9937,
      "growthRate": 6,
      "sectors": {
        "agriculture": 7.9,
        "industry": 40.5,
        "services": 51.6
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 52.2,
        "_id": "68fd1b0885cd5a0e050310c3"
      },
      {
        "name": "Buddhism",
        "percentage": 18.2,
        "_id": "68fd1b0885cd5a0e050310c4"
      },
      {
        "name": "Taoism",
        "percentage": 5.5,
        "_id": "68fd1b0885cd5a0e050310c5"
      },
      {
        "name": "Christianity",
        "percentage": 5.1,
        "_id": "68fd1b0885cd5a0e050310c6"
      }
    ],
    "traditions": [
      {
        "name": "Chinese New Year",
        "description": "Spring Festival celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310c7"
      }
    ],
    "touristAttractions": [
      {
        "name": "Great Wall of China",
        "description": "UNESCO World Heritage site",
        "location": "Northern China",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310c8"
      }
    ],
    "capital": "Beijing",
    "currency": "Chinese Yuan (CNY)",
    "languages": [
      "Mandarin"
    ],
    "timezone": [
      "UTC+8"
    ],
    "climate": "Extremely diverse",
    "government": "Communist state",
    "independence": "October 1, 1949",
    "nationalDay": "October 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.789Z",
    "updatedAt": "2025-10-25T18:46:32.789Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310c9",
    "name": "Cyprus",
    "code": "CY",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/cy.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 35.1264,
        "longitude": 33.4299
      },
      "area": 9251,
      "borders": [],
      "coastline": 648
    },
    "population": {
      "total": 1207359,
      "density": 131,
      "growthRate": 1.1,
      "urbanPopulation": 66.8
    },
    "gdp": {
      "total": 25000000000,
      "perCapita": 20712,
      "growthRate": 3,
      "sectors": {
        "agriculture": 2,
        "industry": 12.5,
        "services": 85.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 73,
        "_id": "68fd1b0885cd5a0e050310ca"
      },
      {
        "name": "Islam",
        "percentage": 25,
        "_id": "68fd1b0885cd5a0e050310cb"
      },
      {
        "name": "Other",
        "percentage": 2,
        "_id": "68fd1b0885cd5a0e050310cc"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310cd"
      }
    ],
    "touristAttractions": [
      {
        "name": "Paphos",
        "description": "UNESCO World Heritage archaeological site",
        "location": "Paphos",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310ce"
      }
    ],
    "capital": "Nicosia",
    "currency": "Euro (EUR)",
    "languages": [
      "Greek",
      "Turkish"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Presidential republic",
    "independence": "August 16, 1960",
    "nationalDay": "October 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.790Z",
    "updatedAt": "2025-10-25T18:46:32.790Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310cf",
    "name": "Georgia",
    "code": "GE",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ge.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 42.3154,
        "longitude": 43.3569
      },
      "area": 69700,
      "borders": [
        "Armenia",
        "Azerbaijan",
        "Russia",
        "Turkey"
      ],
      "coastline": 310
    },
    "population": {
      "total": 3989167,
      "density": 57,
      "growthRate": 0.1,
      "urbanPopulation": 58.9
    },
    "gdp": {
      "total": 18000000000,
      "perCapita": 4513,
      "growthRate": 4.8,
      "sectors": {
        "agriculture": 8.2,
        "industry": 23.7,
        "services": 68.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 83.4,
        "_id": "68fd1b0885cd5a0e050310d0"
      },
      {
        "name": "Islam",
        "percentage": 10.7,
        "_id": "68fd1b0885cd5a0e050310d1"
      },
      {
        "name": "Other",
        "percentage": 5.9,
        "_id": "68fd1b0885cd5a0e050310d2"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310d3"
      }
    ],
    "touristAttractions": [
      {
        "name": "Svetitskhoveli Cathedral",
        "description": "UNESCO World Heritage site",
        "location": "Mtskheta",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310d4"
      }
    ],
    "capital": "Tbilisi",
    "currency": "Georgian Lari (GEL)",
    "languages": [
      "Georgian"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Warm and pleasant",
    "government": "Semi-presidential republic",
    "independence": "April 9, 1991",
    "nationalDay": "May 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.791Z",
    "updatedAt": "2025-10-25T18:46:32.791Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310d5",
    "name": "India",
    "code": "IN",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/in.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 20.5937,
        "longitude": 78.9629
      },
      "area": 3287263,
      "borders": [
        "Bangladesh",
        "Bhutan",
        "China",
        "Myanmar",
        "Nepal",
        "Pakistan"
      ],
      "coastline": 7517
    },
    "population": {
      "total": 1380004385,
      "density": 420,
      "growthRate": 1,
      "urbanPopulation": 35
    },
    "gdp": {
      "total": 3170000000000,
      "perCapita": 2296,
      "growthRate": 6.1,
      "sectors": {
        "agriculture": 15.4,
        "industry": 23,
        "services": 61.6
      }
    },
    "religions": [
      {
        "name": "Hinduism",
        "percentage": 79.8,
        "_id": "68fd1b0885cd5a0e050310d6"
      },
      {
        "name": "Islam",
        "percentage": 14.2,
        "_id": "68fd1b0885cd5a0e050310d7"
      },
      {
        "name": "Christianity",
        "percentage": 2.3,
        "_id": "68fd1b0885cd5a0e050310d8"
      },
      {
        "name": "Sikhism",
        "percentage": 1.7,
        "_id": "68fd1b0885cd5a0e050310d9"
      }
    ],
    "traditions": [
      {
        "name": "Diwali",
        "description": "Festival of lights",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310da"
      }
    ],
    "touristAttractions": [
      {
        "name": "Taj Mahal",
        "description": "UNESCO World Heritage mausoleum",
        "location": "Agra",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310db"
      }
    ],
    "capital": "New Delhi",
    "currency": "Indian Rupee (INR)",
    "languages": [
      "Hindi",
      "English"
    ],
    "timezone": [
      "UTC+5:30"
    ],
    "climate": "Varies from tropical monsoon",
    "government": "Federal parliamentary republic",
    "independence": "August 15, 1947",
    "nationalDay": "August 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.791Z",
    "updatedAt": "2025-10-25T18:46:32.791Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310dc",
    "name": "Indonesia",
    "code": "ID",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/id.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -0.7893,
        "longitude": 121.774
      },
      "area": 1904569,
      "borders": [
        "Malaysia",
        "Papua New Guinea",
        "Timor-Leste"
      ],
      "coastline": 54716
    },
    "population": {
      "total": 273523615,
      "density": 144,
      "growthRate": 1.1,
      "urbanPopulation": 56.4
    },
    "gdp": {
      "total": 1100000000000,
      "perCapita": 4020,
      "growthRate": 5,
      "sectors": {
        "agriculture": 13.7,
        "industry": 41,
        "services": 45.3
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 87.2,
        "_id": "68fd1b0885cd5a0e050310dd"
      },
      {
        "name": "Christianity",
        "percentage": 9.9,
        "_id": "68fd1b0885cd5a0e050310de"
      },
      {
        "name": "Hinduism",
        "percentage": 1.7,
        "_id": "68fd1b0885cd5a0e050310df"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310e0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Borobudur",
        "description": "UNESCO World Heritage Buddhist temple",
        "location": "Central Java",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310e1"
      }
    ],
    "capital": "Jakarta",
    "currency": "Indonesian Rupiah (IDR)",
    "languages": [
      "Indonesian"
    ],
    "timezone": [
      "UTC+7 to UTC+9"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "August 17, 1945",
    "nationalDay": "August 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.792Z",
    "updatedAt": "2025-10-25T18:46:32.792Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310e2",
    "name": "Iran",
    "code": "IR",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ir.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 32.4279,
        "longitude": 53.688
      },
      "area": 1648195,
      "borders": [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Iraq",
        "Pakistan",
        "Turkey",
        "Turkmenistan"
      ],
      "coastline": 2440
    },
    "population": {
      "total": 83992949,
      "density": 51,
      "growthRate": 1,
      "urbanPopulation": 75.9
    },
    "gdp": {
      "total": 458500000000,
      "perCapita": 5459,
      "growthRate": 3.7,
      "sectors": {
        "agriculture": 9.1,
        "industry": 35.4,
        "services": 55.5
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.4,
        "_id": "68fd1b0885cd5a0e050310e3"
      },
      {
        "name": "Other",
        "percentage": 0.6,
        "_id": "68fd1b0885cd5a0e050310e4"
      }
    ],
    "traditions": [
      {
        "name": "Nowruz",
        "description": "Persian New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310e5"
      }
    ],
    "touristAttractions": [
      {
        "name": "Persepolis",
        "description": "Ancient Persian capital",
        "location": "Fars Province",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310e6"
      }
    ],
    "capital": "Tehran",
    "currency": "Iranian Rial (IRR)",
    "languages": [
      "Persian"
    ],
    "timezone": [
      "UTC+3:30"
    ],
    "climate": "Arid or semiarid",
    "government": "Theocratic republic",
    "independence": "April 1, 1979",
    "nationalDay": "February 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.792Z",
    "updatedAt": "2025-10-25T18:46:32.792Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310e7",
    "name": "Iraq",
    "code": "IQ",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/iq.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 33.2232,
        "longitude": 43.6793
      },
      "area": 438317,
      "borders": [
        "Iran",
        "Jordan",
        "Kuwait",
        "Saudi Arabia",
        "Syria",
        "Turkey"
      ],
      "coastline": 58
    },
    "population": {
      "total": 40222493,
      "density": 92,
      "growthRate": 2.3,
      "urbanPopulation": 70.9
    },
    "gdp": {
      "total": 200000000000,
      "perCapita": 4972,
      "growthRate": 4.4,
      "sectors": {
        "agriculture": 3.3,
        "industry": 51,
        "services": 45.7
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99,
        "_id": "68fd1b0885cd5a0e050310e8"
      },
      {
        "name": "Christianity",
        "percentage": 0.8,
        "_id": "68fd1b0885cd5a0e050310e9"
      },
      {
        "name": "Other",
        "percentage": 0.2,
        "_id": "68fd1b0885cd5a0e050310ea"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310eb"
      }
    ],
    "touristAttractions": [
      {
        "name": "Babylon",
        "description": "Ancient Mesopotamian city",
        "location": "Babil Governorate",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050310ec"
      }
    ],
    "capital": "Baghdad",
    "currency": "Iraqi Dinar (IQD)",
    "languages": [
      "Arabic",
      "Kurdish"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Mostly desert",
    "government": "Federal parliamentary republic",
    "independence": "October 3, 1932",
    "nationalDay": "July 14",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.793Z",
    "updatedAt": "2025-10-25T18:46:32.793Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310ed",
    "name": "Israel",
    "code": "IL",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/il.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 31.0461,
        "longitude": 34.8516
      },
      "area": 20770,
      "borders": [
        "Egypt",
        "Jordan",
        "Lebanon",
        "Syria"
      ],
      "coastline": 273
    },
    "population": {
      "total": 8655535,
      "density": 417,
      "growthRate": 1.6,
      "urbanPopulation": 92.6
    },
    "gdp": {
      "total": 400000000000,
      "perCapita": 46218,
      "growthRate": 3.2,
      "sectors": {
        "agriculture": 2.4,
        "industry": 26.5,
        "services": 71.1
      }
    },
    "religions": [
      {
        "name": "Judaism",
        "percentage": 74.2,
        "_id": "68fd1b0885cd5a0e050310ee"
      },
      {
        "name": "Islam",
        "percentage": 17.8,
        "_id": "68fd1b0885cd5a0e050310ef"
      },
      {
        "name": "Christianity",
        "percentage": 2,
        "_id": "68fd1b0885cd5a0e050310f0"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310f1"
      }
    ],
    "touristAttractions": [
      {
        "name": "Old City of Jerusalem",
        "description": "UNESCO World Heritage site",
        "location": "Jerusalem",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310f2"
      }
    ],
    "capital": "Jerusalem",
    "currency": "Israeli Shekel (ILS)",
    "languages": [
      "Hebrew",
      "Arabic"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Parliamentary democracy",
    "independence": "May 14, 1948",
    "nationalDay": "May 14",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.793Z",
    "updatedAt": "2025-10-25T18:46:32.793Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310f3",
    "name": "Japan",
    "code": "JP",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/jp.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 36.2048,
        "longitude": 138.2529
      },
      "area": 377975,
      "borders": [],
      "coastline": 29751
    },
    "population": {
      "total": 125836021,
      "density": 333,
      "growthRate": -0.2,
      "urbanPopulation": 91.8
    },
    "gdp": {
      "total": 4937000000000,
      "perCapita": 39285,
      "growthRate": 1,
      "sectors": {
        "agriculture": 1.1,
        "industry": 30.1,
        "services": 68.8
      }
    },
    "religions": [
      {
        "name": "Shinto",
        "percentage": 70.4,
        "_id": "68fd1b0885cd5a0e050310f4"
      },
      {
        "name": "Buddhism",
        "percentage": 69.8,
        "_id": "68fd1b0885cd5a0e050310f5"
      },
      {
        "name": "Christianity",
        "percentage": 1.5,
        "_id": "68fd1b0885cd5a0e050310f6"
      },
      {
        "name": "Other",
        "percentage": 6.9,
        "_id": "68fd1b0885cd5a0e050310f7"
      }
    ],
    "traditions": [
      {
        "name": "Cherry Blossom Festival",
        "description": "Hanami celebration of cherry blossoms in spring",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310f8"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mount Fuji",
        "description": "Japan's highest mountain and active volcano",
        "location": "Shizuoka and Yamanashi prefectures",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310f9"
      }
    ],
    "capital": "Tokyo",
    "currency": "Japanese Yen (JPY)",
    "languages": [
      "Japanese"
    ],
    "timezone": [
      "UTC+9"
    ],
    "climate": "Temperate",
    "government": "Constitutional monarchy",
    "independence": "660 BC",
    "nationalDay": "February 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.794Z",
    "updatedAt": "2025-10-25T18:46:32.794Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050310fa",
    "name": "Jordan",
    "code": "JO",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/jo.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 30.5852,
        "longitude": 36.2384
      },
      "area": 89342,
      "borders": [
        "Iraq",
        "Israel",
        "Saudi Arabia",
        "Syria"
      ],
      "coastline": 26
    },
    "population": {
      "total": 10203134,
      "density": 114,
      "growthRate": 1,
      "urbanPopulation": 91.4
    },
    "gdp": {
      "total": 45000000000,
      "perCapita": 4410,
      "growthRate": 2,
      "sectors": {
        "agriculture": 4.2,
        "industry": 28.8,
        "services": 67
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 97.2,
        "_id": "68fd1b0885cd5a0e050310fb"
      },
      {
        "name": "Christianity",
        "percentage": 2.2,
        "_id": "68fd1b0885cd5a0e050310fc"
      },
      {
        "name": "Other",
        "percentage": 0.6,
        "_id": "68fd1b0885cd5a0e050310fd"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050310fe"
      }
    ],
    "touristAttractions": [
      {
        "name": "Petra",
        "description": "UNESCO World Heritage ancient city",
        "location": "Ma'an Governorate",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050310ff"
      }
    ],
    "capital": "Amman",
    "currency": "Jordanian Dinar (JOD)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Mostly arid desert",
    "government": "Constitutional monarchy",
    "independence": "May 25, 1946",
    "nationalDay": "May 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.794Z",
    "updatedAt": "2025-10-25T18:46:32.794Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031100",
    "name": "Kazakhstan",
    "code": "KZ",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/kz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 48.0196,
        "longitude": 66.9237
      },
      "area": 2724900,
      "borders": [
        "China",
        "Kyrgyzstan",
        "Russia",
        "Turkmenistan",
        "Uzbekistan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 18776707,
      "density": 7,
      "growthRate": 1.1,
      "urbanPopulation": 57.4
    },
    "gdp": {
      "total": 180000000000,
      "perCapita": 9588,
      "growthRate": 4.1,
      "sectors": {
        "agriculture": 4.7,
        "industry": 34.1,
        "services": 61.2
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 70.2,
        "_id": "68fd1b0885cd5a0e05031101"
      },
      {
        "name": "Christianity",
        "percentage": 26.2,
        "_id": "68fd1b0885cd5a0e05031102"
      },
      {
        "name": "Other",
        "percentage": 3.6,
        "_id": "68fd1b0885cd5a0e05031103"
      }
    ],
    "traditions": [
      {
        "name": "Nauryz",
        "description": "Spring festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031104"
      }
    ],
    "touristAttractions": [
      {
        "name": "Almaty",
        "description": "Former capital and cultural center",
        "location": "Almaty Region",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031105"
      }
    ],
    "capital": "Nur-Sultan",
    "currency": "Kazakhstani Tenge (KZT)",
    "languages": [
      "Kazakh",
      "Russian"
    ],
    "timezone": [
      "UTC+5 to UTC+6"
    ],
    "climate": "Continental",
    "government": "Presidential republic",
    "independence": "December 16, 1991",
    "nationalDay": "December 16",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.795Z",
    "updatedAt": "2025-10-25T18:46:32.795Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031106",
    "name": "Kuwait",
    "code": "KW",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/kw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 29.3117,
        "longitude": 47.4818
      },
      "area": 17818,
      "borders": [
        "Iraq",
        "Saudi Arabia"
      ],
      "coastline": 499
    },
    "population": {
      "total": 4270571,
      "density": 240,
      "growthRate": 1.2,
      "urbanPopulation": 100
    },
    "gdp": {
      "total": 110000000000,
      "perCapita": 25764,
      "growthRate": 0.5,
      "sectors": {
        "agriculture": 0.4,
        "industry": 58.7,
        "services": 40.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 74.6,
        "_id": "68fd1b0885cd5a0e05031107"
      },
      {
        "name": "Christianity",
        "percentage": 18.2,
        "_id": "68fd1b0885cd5a0e05031108"
      },
      {
        "name": "Other",
        "percentage": 7.2,
        "_id": "68fd1b0885cd5a0e05031109"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503110a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kuwait Towers",
        "description": "Iconic water towers",
        "location": "Kuwait City",
        "category": "city",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503110b"
      }
    ],
    "capital": "Kuwait City",
    "currency": "Kuwaiti Dinar (KWD)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Dry desert",
    "government": "Constitutional monarchy",
    "independence": "June 19, 1961",
    "nationalDay": "February 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.795Z",
    "updatedAt": "2025-10-25T18:46:32.795Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503110c",
    "name": "Kyrgyzstan",
    "code": "KG",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/kg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 41.2044,
        "longitude": 74.7661
      },
      "area": 199951,
      "borders": [
        "China",
        "Kazakhstan",
        "Tajikistan",
        "Uzbekistan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 6524195,
      "density": 33,
      "growthRate": 1,
      "urbanPopulation": 36.2
    },
    "gdp": {
      "total": 8000000000,
      "perCapita": 1226,
      "growthRate": 4,
      "sectors": {
        "agriculture": 14.6,
        "industry": 31.2,
        "services": 54.2
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 90,
        "_id": "68fd1b0885cd5a0e0503110d"
      },
      {
        "name": "Christianity",
        "percentage": 7,
        "_id": "68fd1b0885cd5a0e0503110e"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1b0885cd5a0e0503110f"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031110"
      }
    ],
    "touristAttractions": [
      {
        "name": "Issyk-Kul",
        "description": "Mountain lake",
        "location": "Issyk-Kul Region",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031111"
      }
    ],
    "capital": "Bishkek",
    "currency": "Kyrgyzstani Som (KGS)",
    "languages": [
      "Kyrgyz",
      "Russian"
    ],
    "timezone": [
      "UTC+6"
    ],
    "climate": "Dry continental to polar",
    "government": "Parliamentary republic",
    "independence": "August 31, 1991",
    "nationalDay": "August 31",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.796Z",
    "updatedAt": "2025-10-25T18:46:32.796Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031112",
    "name": "Laos",
    "code": "LA",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/la.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 19.8563,
        "longitude": 102.4955
      },
      "area": 236800,
      "borders": [
        "Cambodia",
        "China",
        "Myanmar",
        "Thailand",
        "Vietnam"
      ],
      "coastline": 0
    },
    "population": {
      "total": 7275560,
      "density": 31,
      "growthRate": 1.5,
      "urbanPopulation": 35.7
    },
    "gdp": {
      "total": 19000000000,
      "perCapita": 2612,
      "growthRate": 6.9,
      "sectors": {
        "agriculture": 20.9,
        "industry": 33.2,
        "services": 45.9
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 64.7,
        "_id": "68fd1b0885cd5a0e05031113"
      },
      {
        "name": "Animism",
        "percentage": 31.4,
        "_id": "68fd1b0885cd5a0e05031114"
      },
      {
        "name": "Christianity",
        "percentage": 1.5,
        "_id": "68fd1b0885cd5a0e05031115"
      }
    ],
    "traditions": [
      {
        "name": "Boun Pi Mai",
        "description": "Lao New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031116"
      }
    ],
    "touristAttractions": [
      {
        "name": "Luang Prabang",
        "description": "UNESCO World Heritage city",
        "location": "Luang Prabang Province",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031117"
      }
    ],
    "capital": "Vientiane",
    "currency": "Lao Kip (LAK)",
    "languages": [
      "Lao"
    ],
    "timezone": [
      "UTC+7"
    ],
    "climate": "Tropical monsoon",
    "government": "Communist state",
    "independence": "July 19, 1949",
    "nationalDay": "December 2",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.796Z",
    "updatedAt": "2025-10-25T18:46:32.796Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031118",
    "name": "Lebanon",
    "code": "LB",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/lb.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 33.8547,
        "longitude": 35.8623
      },
      "area": 10452,
      "borders": [
        "Israel",
        "Syria"
      ],
      "coastline": 225
    },
    "population": {
      "total": 6825445,
      "density": 653,
      "growthRate": 0.7,
      "urbanPopulation": 88.6
    },
    "gdp": {
      "total": 52000000000,
      "perCapita": 7618,
      "growthRate": -6.5,
      "sectors": {
        "agriculture": 3.9,
        "industry": 13.1,
        "services": 83
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 61.1,
        "_id": "68fd1b0885cd5a0e05031119"
      },
      {
        "name": "Christianity",
        "percentage": 33.7,
        "_id": "68fd1b0885cd5a0e0503111a"
      },
      {
        "name": "Druze",
        "percentage": 5.2,
        "_id": "68fd1b0885cd5a0e0503111b"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503111c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Byblos",
        "description": "UNESCO World Heritage ancient city",
        "location": "Mount Lebanon",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503111d"
      }
    ],
    "capital": "Beirut",
    "currency": "Lebanese Pound (LBP)",
    "languages": [
      "Arabic",
      "French"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Mediterranean",
    "government": "Parliamentary republic",
    "independence": "November 22, 1943",
    "nationalDay": "November 22",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.797Z",
    "updatedAt": "2025-10-25T18:46:32.797Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503111e",
    "name": "Malaysia",
    "code": "MY",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/my.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 4.2105,
        "longitude": 101.9758
      },
      "area": 330803,
      "borders": [
        "Brunei",
        "Indonesia",
        "Thailand"
      ],
      "coastline": 4675
    },
    "population": {
      "total": 32365999,
      "density": 98,
      "growthRate": 1.3,
      "urbanPopulation": 76.6
    },
    "gdp": {
      "total": 400000000000,
      "perCapita": 12359,
      "growthRate": 4.3,
      "sectors": {
        "agriculture": 8.2,
        "industry": 37.6,
        "services": 54.2
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 61.3,
        "_id": "68fd1b0885cd5a0e0503111f"
      },
      {
        "name": "Buddhism",
        "percentage": 19.8,
        "_id": "68fd1b0885cd5a0e05031120"
      },
      {
        "name": "Christianity",
        "percentage": 9.2,
        "_id": "68fd1b0885cd5a0e05031121"
      },
      {
        "name": "Hinduism",
        "percentage": 6.3,
        "_id": "68fd1b0885cd5a0e05031122"
      }
    ],
    "traditions": [
      {
        "name": "Hari Merdeka",
        "description": "Independence Day celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031123"
      }
    ],
    "touristAttractions": [
      {
        "name": "Petronas Towers",
        "description": "Iconic twin towers",
        "location": "Kuala Lumpur",
        "category": "city",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031124"
      }
    ],
    "capital": "Kuala Lumpur",
    "currency": "Malaysian Ringgit (MYR)",
    "languages": [
      "Malay"
    ],
    "timezone": [
      "UTC+8"
    ],
    "climate": "Tropical",
    "government": "Federal constitutional monarchy",
    "independence": "August 31, 1957",
    "nationalDay": "August 31",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.798Z",
    "updatedAt": "2025-10-25T18:46:32.798Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031125",
    "name": "Maldives",
    "code": "MV",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/mv.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 3.2028,
        "longitude": 73.2207
      },
      "area": 300,
      "borders": [],
      "coastline": 644
    },
    "population": {
      "total": 540544,
      "density": 1802,
      "growthRate": 1.8,
      "urbanPopulation": 40.4
    },
    "gdp": {
      "total": 5000000000,
      "perCapita": 9250,
      "growthRate": 6.9,
      "sectors": {
        "agriculture": 3,
        "industry": 17,
        "services": 80
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 100,
        "_id": "68fd1b0885cd5a0e05031126"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031127"
      }
    ],
    "touristAttractions": [
      {
        "name": "Malé",
        "description": "Capital city and cultural center",
        "location": "Malé Atoll",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031128"
      }
    ],
    "capital": "Malé",
    "currency": "Maldivian Rufiyaa (MVR)",
    "languages": [
      "Dhivehi"
    ],
    "timezone": [
      "UTC+5"
    ],
    "climate": "Tropical monsoon",
    "government": "Presidential republic",
    "independence": "July 26, 1965",
    "nationalDay": "July 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.798Z",
    "updatedAt": "2025-10-25T18:46:32.798Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031129",
    "name": "Mongolia",
    "code": "MN",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/mn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 46.8625,
        "longitude": 103.8467
      },
      "area": 1564116,
      "borders": [
        "China",
        "Russia"
      ],
      "coastline": 0
    },
    "population": {
      "total": 3278290,
      "density": 2,
      "growthRate": 1.4,
      "urbanPopulation": 68.5
    },
    "gdp": {
      "total": 14000000000,
      "perCapita": 4271,
      "growthRate": 6.9,
      "sectors": {
        "agriculture": 12.1,
        "industry": 38.2,
        "services": 49.7
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 53,
        "_id": "68fd1b0885cd5a0e0503112a"
      },
      {
        "name": "Unaffiliated",
        "percentage": 38.6,
        "_id": "68fd1b0885cd5a0e0503112b"
      },
      {
        "name": "Islam",
        "percentage": 3,
        "_id": "68fd1b0885cd5a0e0503112c"
      }
    ],
    "traditions": [
      {
        "name": "Naadam",
        "description": "Traditional festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503112d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Gobi Desert",
        "description": "Vast desert landscape",
        "location": "Southern Mongolia",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503112e"
      }
    ],
    "capital": "Ulaanbaatar",
    "currency": "Mongolian Tugrik (MNT)",
    "languages": [
      "Mongolian"
    ],
    "timezone": [
      "UTC+7 to UTC+8"
    ],
    "climate": "Desert",
    "government": "Semi-presidential republic",
    "independence": "December 29, 1911",
    "nationalDay": "July 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.799Z",
    "updatedAt": "2025-10-25T18:46:32.799Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503112f",
    "name": "Myanmar",
    "code": "MM",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/mm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 21.9162,
        "longitude": 95.956
      },
      "area": 676578,
      "borders": [
        "Bangladesh",
        "China",
        "India",
        "Laos",
        "Thailand"
      ],
      "coastline": 1930
    },
    "population": {
      "total": 54409800,
      "density": 80,
      "growthRate": 0.7,
      "urbanPopulation": 31
    },
    "gdp": {
      "total": 76000000000,
      "perCapita": 1396,
      "growthRate": 6.8,
      "sectors": {
        "agriculture": 24,
        "industry": 35.9,
        "services": 40.1
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 87.9,
        "_id": "68fd1b0885cd5a0e05031130"
      },
      {
        "name": "Christianity",
        "percentage": 6.2,
        "_id": "68fd1b0885cd5a0e05031131"
      },
      {
        "name": "Islam",
        "percentage": 4.3,
        "_id": "68fd1b0885cd5a0e05031132"
      }
    ],
    "traditions": [
      {
        "name": "Thingyan",
        "description": "Water festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031133"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bagan",
        "description": "Ancient temple city",
        "location": "Mandalay Region",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031134"
      }
    ],
    "capital": "Naypyidaw",
    "currency": "Myanmar Kyat (MMK)",
    "languages": [
      "Burmese"
    ],
    "timezone": [
      "UTC+6:30"
    ],
    "climate": "Tropical monsoon",
    "government": "Parliamentary republic",
    "independence": "January 4, 1948",
    "nationalDay": "January 4",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.800Z",
    "updatedAt": "2025-10-25T18:46:32.800Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031135",
    "name": "Nepal",
    "code": "NP",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/np.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 28.3949,
        "longitude": 84.124
      },
      "area": 147181,
      "borders": [
        "China",
        "India"
      ],
      "coastline": 0
    },
    "population": {
      "total": 29136808,
      "density": 198,
      "growthRate": 1.1,
      "urbanPopulation": 20.8
    },
    "gdp": {
      "total": 33000000000,
      "perCapita": 1133,
      "growthRate": 6.3,
      "sectors": {
        "agriculture": 27,
        "industry": 13.5,
        "services": 59.5
      }
    },
    "religions": [
      {
        "name": "Hinduism",
        "percentage": 81.3,
        "_id": "68fd1b0885cd5a0e05031136"
      },
      {
        "name": "Buddhism",
        "percentage": 9,
        "_id": "68fd1b0885cd5a0e05031137"
      },
      {
        "name": "Islam",
        "percentage": 4.4,
        "_id": "68fd1b0885cd5a0e05031138"
      }
    ],
    "traditions": [
      {
        "name": "Dashain",
        "description": "Hindu festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031139"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mount Everest",
        "description": "World's highest peak",
        "location": "Himalayas",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e0503113a"
      }
    ],
    "capital": "Kathmandu",
    "currency": "Nepalese Rupee (NPR)",
    "languages": [
      "Nepali"
    ],
    "timezone": [
      "UTC+5:45"
    ],
    "climate": "Varies from cool summers",
    "government": "Federal parliamentary republic",
    "independence": "December 21, 1923",
    "nationalDay": "September 20",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.800Z",
    "updatedAt": "2025-10-25T18:46:32.800Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503113b",
    "name": "North Korea",
    "code": "KP",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/kp.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 40.3399,
        "longitude": 127.5101
      },
      "area": 120538,
      "borders": [
        "China",
        "South Korea",
        "Russia"
      ],
      "coastline": 2495
    },
    "population": {
      "total": 25778816,
      "density": 214,
      "growthRate": 0.5,
      "urbanPopulation": 61.9
    },
    "gdp": {
      "total": 18000000000,
      "perCapita": 698,
      "growthRate": -1.1,
      "sectors": {
        "agriculture": 22.5,
        "industry": 47.6,
        "services": 29.9
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 64.3,
        "_id": "68fd1b0885cd5a0e0503113c"
      },
      {
        "name": "Korean shamanism",
        "percentage": 16,
        "_id": "68fd1b0885cd5a0e0503113d"
      },
      {
        "name": "Chondoism",
        "percentage": 13.5,
        "_id": "68fd1b0885cd5a0e0503113e"
      }
    ],
    "traditions": [
      {
        "name": "Day of the Sun",
        "description": "Birthday of Kim Il-sung",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503113f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mount Paektu",
        "description": "Sacred mountain",
        "location": "Ryanggang Province",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031140"
      }
    ],
    "capital": "Pyongyang",
    "currency": "North Korean Won (KPW)",
    "languages": [
      "Korean"
    ],
    "timezone": [
      "UTC+9"
    ],
    "climate": "Temperate",
    "government": "Communist state",
    "independence": "September 9, 1948",
    "nationalDay": "September 9",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.801Z",
    "updatedAt": "2025-10-25T18:46:32.801Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031141",
    "name": "Oman",
    "code": "OM",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/om.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 21.4735,
        "longitude": 55.9754
      },
      "area": 309500,
      "borders": [
        "Saudi Arabia",
        "United Arab Emirates",
        "Yemen"
      ],
      "coastline": 2092
    },
    "population": {
      "total": 5106626,
      "density": 16,
      "growthRate": 2,
      "urbanPopulation": 85.9
    },
    "gdp": {
      "total": 70000000000,
      "perCapita": 13708,
      "growthRate": 0.5,
      "sectors": {
        "agriculture": 1.8,
        "industry": 46.4,
        "services": 51.8
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 85.9,
        "_id": "68fd1b0885cd5a0e05031142"
      },
      {
        "name": "Christianity",
        "percentage": 6.5,
        "_id": "68fd1b0885cd5a0e05031143"
      },
      {
        "name": "Hinduism",
        "percentage": 5.5,
        "_id": "68fd1b0885cd5a0e05031144"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031145"
      }
    ],
    "touristAttractions": [
      {
        "name": "Nizwa Fort",
        "description": "Historic fortress",
        "location": "Nizwa",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031146"
      }
    ],
    "capital": "Muscat",
    "currency": "Omani Rial (OMR)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Dry desert",
    "government": "Absolute monarchy",
    "independence": "November 18, 1650",
    "nationalDay": "November 18",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.802Z",
    "updatedAt": "2025-10-25T18:46:32.802Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031147",
    "name": "Pakistan",
    "code": "PK",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/pk.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 30.3753,
        "longitude": 69.3451
      },
      "area": 881912,
      "borders": [
        "Afghanistan",
        "China",
        "India",
        "Iran"
      ],
      "coastline": 1046
    },
    "population": {
      "total": 220892340,
      "density": 251,
      "growthRate": 2,
      "urbanPopulation": 37.2
    },
    "gdp": {
      "total": 300000000000,
      "perCapita": 1358,
      "growthRate": 3.9,
      "sectors": {
        "agriculture": 22,
        "industry": 19.1,
        "services": 58.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 96.4,
        "_id": "68fd1b0885cd5a0e05031148"
      },
      {
        "name": "Hinduism",
        "percentage": 2.1,
        "_id": "68fd1b0885cd5a0e05031149"
      },
      {
        "name": "Christianity",
        "percentage": 1.3,
        "_id": "68fd1b0885cd5a0e0503114a"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503114b"
      }
    ],
    "touristAttractions": [
      {
        "name": "Lahore Fort",
        "description": "UNESCO World Heritage site",
        "location": "Lahore",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503114c"
      }
    ],
    "capital": "Islamabad",
    "currency": "Pakistani Rupee (PKR)",
    "languages": [
      "Urdu",
      "English"
    ],
    "timezone": [
      "UTC+5"
    ],
    "climate": "Mostly hot, dry desert",
    "government": "Federal parliamentary republic",
    "independence": "August 14, 1947",
    "nationalDay": "August 14",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.803Z",
    "updatedAt": "2025-10-25T18:46:32.803Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503114d",
    "name": "Palestine",
    "code": "PS",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ps.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 31.9522,
        "longitude": 35.2332
      },
      "area": 6020,
      "borders": [
        "Israel"
      ],
      "coastline": 40
    },
    "population": {
      "total": 5101414,
      "density": 847,
      "growthRate": 2.4,
      "urbanPopulation": 77
    },
    "gdp": {
      "total": 15000000000,
      "perCapita": 2940,
      "growthRate": 3,
      "sectors": {
        "agriculture": 4.2,
        "industry": 13.5,
        "services": 82.3
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 93,
        "_id": "68fd1b0885cd5a0e0503114e"
      },
      {
        "name": "Christianity",
        "percentage": 6,
        "_id": "68fd1b0885cd5a0e0503114f"
      },
      {
        "name": "Other",
        "percentage": 1,
        "_id": "68fd1b0885cd5a0e05031150"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031151"
      }
    ],
    "touristAttractions": [
      {
        "name": "Church of the Nativity",
        "description": "UNESCO World Heritage site",
        "location": "Bethlehem",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031152"
      }
    ],
    "capital": "Ramallah",
    "currency": "Israeli Shekel (ILS)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Semi-presidential republic",
    "independence": "November 15, 1988",
    "nationalDay": "November 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.804Z",
    "updatedAt": "2025-10-25T18:46:32.804Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031153",
    "name": "Philippines",
    "code": "PH",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ph.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.8797,
        "longitude": 121.774
      },
      "area": 300000,
      "borders": [],
      "coastline": 36289
    },
    "population": {
      "total": 109581078,
      "density": 365,
      "growthRate": 1.4,
      "urbanPopulation": 47.1
    },
    "gdp": {
      "total": 400000000000,
      "perCapita": 3651,
      "growthRate": 6.1,
      "sectors": {
        "agriculture": 9.6,
        "industry": 30.6,
        "services": 59.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 92.5,
        "_id": "68fd1b0885cd5a0e05031154"
      },
      {
        "name": "Islam",
        "percentage": 5.6,
        "_id": "68fd1b0885cd5a0e05031155"
      },
      {
        "name": "Other",
        "percentage": 1.9,
        "_id": "68fd1b0885cd5a0e05031156"
      }
    ],
    "traditions": [
      {
        "name": "Sinulog Festival",
        "description": "Religious festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031157"
      }
    ],
    "touristAttractions": [
      {
        "name": "Boracay",
        "description": "Famous beach destination",
        "location": "Aklan Province",
        "category": "beach",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031158"
      }
    ],
    "capital": "Manila",
    "currency": "Philippine Peso (PHP)",
    "languages": [
      "Filipino",
      "English"
    ],
    "timezone": [
      "UTC+8"
    ],
    "climate": "Tropical marine",
    "government": "Presidential republic",
    "independence": "June 12, 1898",
    "nationalDay": "June 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.805Z",
    "updatedAt": "2025-10-25T18:46:32.805Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031159",
    "name": "Qatar",
    "code": "QA",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/qa.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 25.3548,
        "longitude": 51.1839
      },
      "area": 11586,
      "borders": [
        "Saudi Arabia"
      ],
      "coastline": 563
    },
    "population": {
      "total": 2881053,
      "density": 249,
      "growthRate": 1.7,
      "urbanPopulation": 99.2
    },
    "gdp": {
      "total": 180000000000,
      "perCapita": 62488,
      "growthRate": 1.6,
      "sectors": {
        "agriculture": 0.1,
        "industry": 50.2,
        "services": 49.7
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 67.7,
        "_id": "68fd1b0885cd5a0e0503115a"
      },
      {
        "name": "Christianity",
        "percentage": 13.8,
        "_id": "68fd1b0885cd5a0e0503115b"
      },
      {
        "name": "Hinduism",
        "percentage": 13.8,
        "_id": "68fd1b0885cd5a0e0503115c"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503115d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Museum of Islamic Art",
        "description": "Cultural museum",
        "location": "Doha",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503115e"
      }
    ],
    "capital": "Doha",
    "currency": "Qatari Riyal (QAR)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Arid",
    "government": "Absolute monarchy",
    "independence": "September 3, 1971",
    "nationalDay": "December 18",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.806Z",
    "updatedAt": "2025-10-25T18:46:32.806Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503115f",
    "name": "Russia",
    "code": "RU",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ru.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 61.524,
        "longitude": 105.3188
      },
      "area": 17098242,
      "borders": [
        "Azerbaijan",
        "Belarus",
        "China",
        "Estonia",
        "Finland",
        "Georgia",
        "Kazakhstan",
        "North Korea",
        "Latvia",
        "Lithuania",
        "Mongolia",
        "Norway",
        "Poland",
        "Ukraine"
      ],
      "coastline": 37653
    },
    "population": {
      "total": 145934462,
      "density": 9,
      "growthRate": 0,
      "urbanPopulation": 74
    },
    "gdp": {
      "total": 1700000000000,
      "perCapita": 11647,
      "growthRate": 1.3,
      "sectors": {
        "agriculture": 4.7,
        "industry": 32.4,
        "services": 62.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 73.6,
        "_id": "68fd1b0885cd5a0e05031160"
      },
      {
        "name": "Islam",
        "percentage": 7,
        "_id": "68fd1b0885cd5a0e05031161"
      },
      {
        "name": "Unaffiliated",
        "percentage": 16.2,
        "_id": "68fd1b0885cd5a0e05031162"
      }
    ],
    "traditions": [
      {
        "name": "Victory Day",
        "description": "World War II commemoration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031163"
      }
    ],
    "touristAttractions": [
      {
        "name": "Red Square",
        "description": "Historic square in Moscow",
        "location": "Moscow",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031164"
      }
    ],
    "capital": "Moscow",
    "currency": "Russian Ruble (RUB)",
    "languages": [
      "Russian"
    ],
    "timezone": [
      "UTC+2 to UTC+12"
    ],
    "climate": "Ranges from steppes",
    "government": "Federal semi-presidential republic",
    "independence": "December 25, 1991",
    "nationalDay": "June 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.806Z",
    "updatedAt": "2025-10-25T18:46:32.806Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031165",
    "name": "Saudi Arabia",
    "code": "SA",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/sa.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 23.8859,
        "longitude": 45.0792
      },
      "area": 2149690,
      "borders": [
        "Iraq",
        "Jordan",
        "Kuwait",
        "Oman",
        "Qatar",
        "United Arab Emirates",
        "Yemen"
      ],
      "coastline": 2640
    },
    "population": {
      "total": 34813871,
      "density": 16,
      "growthRate": 1.6,
      "urbanPopulation": 84
    },
    "gdp": {
      "total": 800000000000,
      "perCapita": 22986,
      "growthRate": 0.3,
      "sectors": {
        "agriculture": 2.6,
        "industry": 44.2,
        "services": 53.2
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 100,
        "_id": "68fd1b0885cd5a0e05031166"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031167"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mecca",
        "description": "Holiest city in Islam",
        "location": "Makkah Province",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031168"
      }
    ],
    "capital": "Riyadh",
    "currency": "Saudi Riyal (SAR)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Harsh, dry desert",
    "government": "Absolute monarchy",
    "independence": "September 23, 1932",
    "nationalDay": "September 23",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.807Z",
    "updatedAt": "2025-10-25T18:46:32.807Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031169",
    "name": "Singapore",
    "code": "SG",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/sg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 1.3521,
        "longitude": 103.8198
      },
      "area": 719,
      "borders": [],
      "coastline": 193
    },
    "population": {
      "total": 5850342,
      "density": 8134,
      "growthRate": 0.9,
      "urbanPopulation": 100
    },
    "gdp": {
      "total": 400000000000,
      "perCapita": 68393,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 0,
        "industry": 24.8,
        "services": 75.2
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 33.2,
        "_id": "68fd1b0885cd5a0e0503116a"
      },
      {
        "name": "Christianity",
        "percentage": 18.8,
        "_id": "68fd1b0885cd5a0e0503116b"
      },
      {
        "name": "Islam",
        "percentage": 14,
        "_id": "68fd1b0885cd5a0e0503116c"
      },
      {
        "name": "Taoism",
        "percentage": 10,
        "_id": "68fd1b0885cd5a0e0503116d"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503116e"
      }
    ],
    "touristAttractions": [
      {
        "name": "Marina Bay Sands",
        "description": "Iconic integrated resort",
        "location": "Singapore",
        "category": "city",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e0503116f"
      }
    ],
    "capital": "Singapore",
    "currency": "Singapore Dollar (SGD)",
    "languages": [
      "English",
      "Malay",
      "Mandarin",
      "Tamil"
    ],
    "timezone": [
      "UTC+8"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "August 9, 1965",
    "nationalDay": "August 9",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.807Z",
    "updatedAt": "2025-10-25T18:46:32.807Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031170",
    "name": "South Korea",
    "code": "KR",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/kr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 35.9078,
        "longitude": 127.7669
      },
      "area": 100210,
      "borders": [
        "North Korea"
      ],
      "coastline": 2413
    },
    "population": {
      "total": 51269185,
      "density": 512,
      "growthRate": 0.1,
      "urbanPopulation": 81.4
    },
    "gdp": {
      "total": 1800000000000,
      "perCapita": 35120,
      "growthRate": 2,
      "sectors": {
        "agriculture": 2.2,
        "industry": 39.3,
        "services": 58.5
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 56.1,
        "_id": "68fd1b0885cd5a0e05031171"
      },
      {
        "name": "Christianity",
        "percentage": 27.6,
        "_id": "68fd1b0885cd5a0e05031172"
      },
      {
        "name": "Buddhism",
        "percentage": 15.5,
        "_id": "68fd1b0885cd5a0e05031173"
      }
    ],
    "traditions": [
      {
        "name": "Chuseok",
        "description": "Harvest festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031174"
      }
    ],
    "touristAttractions": [
      {
        "name": "Gyeongbokgung Palace",
        "description": "Royal palace",
        "location": "Seoul",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031175"
      }
    ],
    "capital": "Seoul",
    "currency": "South Korean Won (KRW)",
    "languages": [
      "Korean"
    ],
    "timezone": [
      "UTC+9"
    ],
    "climate": "Temperate",
    "government": "Presidential republic",
    "independence": "August 15, 1945",
    "nationalDay": "August 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.808Z",
    "updatedAt": "2025-10-25T18:46:32.808Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031176",
    "name": "Sri Lanka",
    "code": "LK",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/lk.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.8731,
        "longitude": 80.7718
      },
      "area": 65610,
      "borders": [],
      "coastline": 1340
    },
    "population": {
      "total": 21413249,
      "density": 326,
      "growthRate": 0.4,
      "urbanPopulation": 18.5
    },
    "gdp": {
      "total": 84000000000,
      "perCapita": 3922,
      "growthRate": 3.3,
      "sectors": {
        "agriculture": 7.8,
        "industry": 30.5,
        "services": 61.7
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 70.2,
        "_id": "68fd1b0885cd5a0e05031177"
      },
      {
        "name": "Hinduism",
        "percentage": 12.6,
        "_id": "68fd1b0885cd5a0e05031178"
      },
      {
        "name": "Islam",
        "percentage": 9.7,
        "_id": "68fd1b0885cd5a0e05031179"
      },
      {
        "name": "Christianity",
        "percentage": 7.4,
        "_id": "68fd1b0885cd5a0e0503117a"
      }
    ],
    "traditions": [
      {
        "name": "Sinhala and Tamil New Year",
        "description": "Traditional New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503117b"
      }
    ],
    "touristAttractions": [
      {
        "name": "Sigiriya",
        "description": "UNESCO World Heritage rock fortress",
        "location": "Central Province",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e0503117c"
      }
    ],
    "capital": "Colombo",
    "currency": "Sri Lankan Rupee (LKR)",
    "languages": [
      "Sinhala",
      "Tamil"
    ],
    "timezone": [
      "UTC+5:30"
    ],
    "climate": "Tropical monsoon",
    "government": "Presidential republic",
    "independence": "February 4, 1948",
    "nationalDay": "February 4",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.808Z",
    "updatedAt": "2025-10-25T18:46:32.808Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503117d",
    "name": "Syria",
    "code": "SY",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/sy.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 34.8021,
        "longitude": 38.9968
      },
      "area": 185180,
      "borders": [
        "Iraq",
        "Israel",
        "Jordan",
        "Lebanon",
        "Turkey"
      ],
      "coastline": 193
    },
    "population": {
      "total": 17500658,
      "density": 94,
      "growthRate": 1.2,
      "urbanPopulation": 54.8
    },
    "gdp": {
      "total": 50000000000,
      "perCapita": 2857,
      "growthRate": -2,
      "sectors": {
        "agriculture": 20,
        "industry": 19.5,
        "services": 60.5
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 87,
        "_id": "68fd1b0885cd5a0e0503117e"
      },
      {
        "name": "Christianity",
        "percentage": 10,
        "_id": "68fd1b0885cd5a0e0503117f"
      },
      {
        "name": "Druze",
        "percentage": 3,
        "_id": "68fd1b0885cd5a0e05031180"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031181"
      }
    ],
    "touristAttractions": [
      {
        "name": "Palmyra",
        "description": "UNESCO World Heritage ancient city",
        "location": "Homs Governorate",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e05031182"
      }
    ],
    "capital": "Damascus",
    "currency": "Syrian Pound (SYP)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Mostly desert",
    "government": "Presidential republic",
    "independence": "April 17, 1946",
    "nationalDay": "April 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.809Z",
    "updatedAt": "2025-10-25T18:46:32.809Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031183",
    "name": "Taiwan",
    "code": "TW",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/tw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 23.6978,
        "longitude": 120.9605
      },
      "area": 36193,
      "borders": [],
      "coastline": 1566
    },
    "population": {
      "total": 23816775,
      "density": 658,
      "growthRate": 0.2,
      "urbanPopulation": 78.9
    },
    "gdp": {
      "total": 700000000000,
      "perCapita": 29394,
      "growthRate": 2.7,
      "sectors": {
        "agriculture": 1.8,
        "industry": 36,
        "services": 62.2
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 35.1,
        "_id": "68fd1b0885cd5a0e05031184"
      },
      {
        "name": "Taoism",
        "percentage": 33,
        "_id": "68fd1b0885cd5a0e05031185"
      },
      {
        "name": "Christianity",
        "percentage": 3.9,
        "_id": "68fd1b0885cd5a0e05031186"
      }
    ],
    "traditions": [
      {
        "name": "Double Ten Day",
        "description": "National Day celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031187"
      }
    ],
    "touristAttractions": [
      {
        "name": "Taipei 101",
        "description": "Iconic skyscraper",
        "location": "Taipei",
        "category": "city",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031188"
      }
    ],
    "capital": "Taipei",
    "currency": "New Taiwan Dollar (TWD)",
    "languages": [
      "Mandarin"
    ],
    "timezone": [
      "UTC+8"
    ],
    "climate": "Tropical",
    "government": "Semi-presidential republic",
    "independence": "October 10, 1911",
    "nationalDay": "October 10",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.809Z",
    "updatedAt": "2025-10-25T18:46:32.809Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031189",
    "name": "Tajikistan",
    "code": "TJ",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/tj.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 38.861,
        "longitude": 71.2761
      },
      "area": 143100,
      "borders": [
        "Afghanistan",
        "China",
        "Kyrgyzstan",
        "Uzbekistan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 9537645,
      "density": 67,
      "growthRate": 1.7,
      "urbanPopulation": 27.4
    },
    "gdp": {
      "total": 8000000000,
      "perCapita": 839,
      "growthRate": 7,
      "sectors": {
        "agriculture": 28.6,
        "industry": 25.5,
        "services": 45.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 98,
        "_id": "68fd1b0885cd5a0e0503118a"
      },
      {
        "name": "Christianity",
        "percentage": 1,
        "_id": "68fd1b0885cd5a0e0503118b"
      },
      {
        "name": "Other",
        "percentage": 1,
        "_id": "68fd1b0885cd5a0e0503118c"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503118d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Ismaili Centre",
        "description": "Cultural center",
        "location": "Dushanbe",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503118e"
      }
    ],
    "capital": "Dushanbe",
    "currency": "Tajikistani Somoni (TJS)",
    "languages": [
      "Tajik"
    ],
    "timezone": [
      "UTC+5"
    ],
    "climate": "Midlatitude continental",
    "government": "Presidential republic",
    "independence": "September 9, 1991",
    "nationalDay": "September 9",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.810Z",
    "updatedAt": "2025-10-25T18:46:32.810Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503118f",
    "name": "Thailand",
    "code": "TH",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/th.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.87,
        "longitude": 100.9925
      },
      "area": 513120,
      "borders": [
        "Cambodia",
        "Laos",
        "Malaysia",
        "Myanmar"
      ],
      "coastline": 3219
    },
    "population": {
      "total": 69799978,
      "density": 136,
      "growthRate": 0.2,
      "urbanPopulation": 50.7
    },
    "gdp": {
      "total": 500000000000,
      "perCapita": 7164,
      "growthRate": 2.6,
      "sectors": {
        "agriculture": 8.2,
        "industry": 36.2,
        "services": 55.6
      }
    },
    "religions": [
      {
        "name": "Buddhism",
        "percentage": 94.6,
        "_id": "68fd1b0885cd5a0e05031190"
      },
      {
        "name": "Islam",
        "percentage": 4.3,
        "_id": "68fd1b0885cd5a0e05031191"
      },
      {
        "name": "Christianity",
        "percentage": 1,
        "_id": "68fd1b0885cd5a0e05031192"
      }
    ],
    "traditions": [
      {
        "name": "Songkran",
        "description": "Thai New Year water festival",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031193"
      }
    ],
    "touristAttractions": [
      {
        "name": "Grand Palace",
        "description": "Royal palace complex",
        "location": "Bangkok",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e05031194"
      }
    ],
    "capital": "Bangkok",
    "currency": "Thai Baht (THB)",
    "languages": [
      "Thai"
    ],
    "timezone": [
      "UTC+7"
    ],
    "climate": "Tropical",
    "government": "Constitutional monarchy",
    "independence": "Never colonized",
    "nationalDay": "December 5",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.810Z",
    "updatedAt": "2025-10-25T18:46:32.810Z"
  },
  {
    "_id": "68fd1b0885cd5a0e05031195",
    "name": "Timor-Leste",
    "code": "TL",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/tl.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -8.8742,
        "longitude": 125.7275
      },
      "area": 14874,
      "borders": [
        "Indonesia"
      ],
      "coastline": 706
    },
    "population": {
      "total": 1318445,
      "density": 89,
      "growthRate": 2.4,
      "urbanPopulation": 30.8
    },
    "gdp": {
      "total": 3000000000,
      "perCapita": 2276,
      "growthRate": 4,
      "sectors": {
        "agriculture": 8.1,
        "industry": 56.3,
        "services": 35.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 99.1,
        "_id": "68fd1b0885cd5a0e05031196"
      },
      {
        "name": "Islam",
        "percentage": 0.8,
        "_id": "68fd1b0885cd5a0e05031197"
      },
      {
        "name": "Other",
        "percentage": 0.1,
        "_id": "68fd1b0885cd5a0e05031198"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e05031199"
      }
    ],
    "touristAttractions": [
      {
        "name": "Atauro Island",
        "description": "Diving destination",
        "location": "Dili District",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e0503119a"
      }
    ],
    "capital": "Dili",
    "currency": "US Dollar (USD)",
    "languages": [
      "Tetum",
      "Portuguese"
    ],
    "timezone": [
      "UTC+9"
    ],
    "climate": "Tropical",
    "government": "Semi-presidential republic",
    "independence": "May 20, 2002",
    "nationalDay": "May 20",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.811Z",
    "updatedAt": "2025-10-25T18:46:32.811Z"
  },
  {
    "_id": "68fd1b0885cd5a0e0503119b",
    "name": "Turkey",
    "code": "TR",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/tr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 38.9637,
        "longitude": 35.2433
      },
      "area": 783562,
      "borders": [
        "Armenia",
        "Azerbaijan",
        "Bulgaria",
        "Georgia",
        "Greece",
        "Iran",
        "Iraq",
        "Syria"
      ],
      "coastline": 7200
    },
    "population": {
      "total": 84339067,
      "density": 108,
      "growthRate": 1.1,
      "urbanPopulation": 75.1
    },
    "gdp": {
      "total": 800000000000,
      "perCapita": 9485,
      "growthRate": 2.6,
      "sectors": {
        "agriculture": 6.1,
        "industry": 32.3,
        "services": 61.6
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.8,
        "_id": "68fd1b0885cd5a0e0503119c"
      },
      {
        "name": "Christianity",
        "percentage": 0.2,
        "_id": "68fd1b0885cd5a0e0503119d"
      }
    ],
    "traditions": [
      {
        "name": "Republic Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e0503119e"
      }
    ],
    "touristAttractions": [
      {
        "name": "Hagia Sophia",
        "description": "UNESCO World Heritage site",
        "location": "Istanbul",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e0503119f"
      }
    ],
    "capital": "Ankara",
    "currency": "Turkish Lira (TRY)",
    "languages": [
      "Turkish"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Temperate",
    "government": "Presidential republic",
    "independence": "October 29, 1923",
    "nationalDay": "October 29",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.811Z",
    "updatedAt": "2025-10-25T18:46:32.811Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050311a0",
    "name": "Turkmenistan",
    "code": "TM",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/tm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 38.9697,
        "longitude": 59.5563
      },
      "area": 488100,
      "borders": [
        "Afghanistan",
        "Iran",
        "Kazakhstan",
        "Uzbekistan"
      ],
      "coastline": 1768
    },
    "population": {
      "total": 6031200,
      "density": 12,
      "growthRate": 1.3,
      "urbanPopulation": 52.8
    },
    "gdp": {
      "total": 45000000000,
      "perCapita": 7461,
      "growthRate": 6.2,
      "sectors": {
        "agriculture": 7.5,
        "industry": 43,
        "services": 49.5
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 93,
        "_id": "68fd1b0885cd5a0e050311a1"
      },
      {
        "name": "Christianity",
        "percentage": 6,
        "_id": "68fd1b0885cd5a0e050311a2"
      },
      {
        "name": "Other",
        "percentage": 1,
        "_id": "68fd1b0885cd5a0e050311a3"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050311a4"
      }
    ],
    "touristAttractions": [
      {
        "name": "Door to Hell",
        "description": "Natural gas crater",
        "location": "Derweze",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050311a5"
      }
    ],
    "capital": "Ashgabat",
    "currency": "Turkmenistani Manat (TMT)",
    "languages": [
      "Turkmen"
    ],
    "timezone": [
      "UTC+5"
    ],
    "climate": "Subtropical desert",
    "government": "Presidential republic",
    "independence": "October 27, 1991",
    "nationalDay": "October 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.812Z",
    "updatedAt": "2025-10-25T18:46:32.812Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050311a6",
    "name": "United Arab Emirates",
    "code": "AE",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ae.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 23.4241,
        "longitude": 53.8478
      },
      "area": 83600,
      "borders": [
        "Oman",
        "Saudi Arabia"
      ],
      "coastline": 1318
    },
    "population": {
      "total": 9890402,
      "density": 118,
      "growthRate": 1.2,
      "urbanPopulation": 86.5
    },
    "gdp": {
      "total": 400000000000,
      "perCapita": 40438,
      "growthRate": 1.7,
      "sectors": {
        "agriculture": 0.8,
        "industry": 49.8,
        "services": 49.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 76,
        "_id": "68fd1b0885cd5a0e050311a7"
      },
      {
        "name": "Christianity",
        "percentage": 9,
        "_id": "68fd1b0885cd5a0e050311a8"
      },
      {
        "name": "Hinduism",
        "percentage": 8,
        "_id": "68fd1b0885cd5a0e050311a9"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050311aa"
      }
    ],
    "touristAttractions": [
      {
        "name": "Burj Khalifa",
        "description": "World's tallest building",
        "location": "Dubai",
        "category": "city",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050311ab"
      }
    ],
    "capital": "Abu Dhabi",
    "currency": "UAE Dirham (AED)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+4"
    ],
    "climate": "Desert",
    "government": "Federal presidential republic",
    "independence": "December 2, 1971",
    "nationalDay": "December 2",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.812Z",
    "updatedAt": "2025-10-25T18:46:32.812Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050311ac",
    "name": "Uzbekistan",
    "code": "UZ",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/uz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 41.3775,
        "longitude": 64.5853
      },
      "area": 447400,
      "borders": [
        "Afghanistan",
        "Kazakhstan",
        "Kyrgyzstan",
        "Tajikistan",
        "Turkmenistan"
      ],
      "coastline": 0
    },
    "population": {
      "total": 33469203,
      "density": 75,
      "growthRate": 1.5,
      "urbanPopulation": 50.5
    },
    "gdp": {
      "total": 58000000000,
      "perCapita": 1733,
      "growthRate": 5.4,
      "sectors": {
        "agriculture": 17.9,
        "industry": 33.7,
        "services": 48.4
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 96.3,
        "_id": "68fd1b0885cd5a0e050311ad"
      },
      {
        "name": "Christianity",
        "percentage": 2.2,
        "_id": "68fd1b0885cd5a0e050311ae"
      },
      {
        "name": "Other",
        "percentage": 1.5,
        "_id": "68fd1b0885cd5a0e050311af"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050311b0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Samarkand",
        "description": "UNESCO World Heritage city",
        "location": "Samarkand Region",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050311b1"
      }
    ],
    "capital": "Tashkent",
    "currency": "Uzbekistani Som (UZS)",
    "languages": [
      "Uzbek"
    ],
    "timezone": [
      "UTC+5"
    ],
    "climate": "Mostly midlatitude desert",
    "government": "Presidential republic",
    "independence": "September 1, 1991",
    "nationalDay": "September 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.813Z",
    "updatedAt": "2025-10-25T18:46:32.813Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050311b2",
    "name": "Vietnam",
    "code": "VN",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/vn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 14.0583,
        "longitude": 108.2772
      },
      "area": 331212,
      "borders": [
        "Cambodia",
        "China",
        "Laos"
      ],
      "coastline": 3444
    },
    "population": {
      "total": 97338579,
      "density": 294,
      "growthRate": 0.9,
      "urbanPopulation": 37.3
    },
    "gdp": {
      "total": 340000000000,
      "perCapita": 3493,
      "growthRate": 6.8,
      "sectors": {
        "agriculture": 15.3,
        "industry": 33.3,
        "services": 51.4
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 81.8,
        "_id": "68fd1b0885cd5a0e050311b3"
      },
      {
        "name": "Buddhism",
        "percentage": 7.9,
        "_id": "68fd1b0885cd5a0e050311b4"
      },
      {
        "name": "Christianity",
        "percentage": 6.6,
        "_id": "68fd1b0885cd5a0e050311b5"
      }
    ],
    "traditions": [
      {
        "name": "Tet",
        "description": "Vietnamese New Year celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050311b6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Ha Long Bay",
        "description": "UNESCO World Heritage site",
        "location": "Quang Ninh Province",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1b0885cd5a0e050311b7"
      }
    ],
    "capital": "Hanoi",
    "currency": "Vietnamese Dong (VND)",
    "languages": [
      "Vietnamese"
    ],
    "timezone": [
      "UTC+7"
    ],
    "climate": "Tropical in south",
    "government": "Communist state",
    "independence": "September 2, 1945",
    "nationalDay": "September 2",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.814Z",
    "updatedAt": "2025-10-25T18:46:32.814Z"
  },
  {
    "_id": "68fd1b0885cd5a0e050311b8",
    "name": "Yemen",
    "code": "YE",
    "continent": "Asia",
    "flag": "https://flagcdn.com/w320/ye.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.5527,
        "longitude": 48.5164
      },
      "area": 527968,
      "borders": [
        "Oman",
        "Saudi Arabia"
      ],
      "coastline": 1906
    },
    "population": {
      "total": 29825964,
      "density": 56,
      "growthRate": 2.3,
      "urbanPopulation": 37.2
    },
    "gdp": {
      "total": 20000000000,
      "perCapita": 671,
      "growthRate": -5,
      "sectors": {
        "agriculture": 20.3,
        "industry": 11.8,
        "services": 67.9
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 99.1,
        "_id": "68fd1b0885cd5a0e050311b9"
      },
      {
        "name": "Other",
        "percentage": 0.9,
        "_id": "68fd1b0885cd5a0e050311ba"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1b0885cd5a0e050311bb"
      }
    ],
    "touristAttractions": [
      {
        "name": "Old City of Sana'a",
        "description": "UNESCO World Heritage site",
        "location": "Sana'a",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1b0885cd5a0e050311bc"
      }
    ],
    "capital": "Sana'a",
    "currency": "Yemeni Rial (YER)",
    "languages": [
      "Arabic"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Mostly desert",
    "government": "In transition",
    "independence": "November 30, 1967",
    "nationalDay": "May 22",
    "__v": 0,
    "createdAt": "2025-10-25T18:46:32.816Z",
    "updatedAt": "2025-10-25T18:46:32.816Z"
  },
  {
    "_id": "68fd1ba67e1cf8338c17fec8",
    "name": "Albania",
    "code": "AL",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/al.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 41.1533,
        "longitude": 20.1683
      },
      "area": 28748,
      "borders": [
        "Greece",
        "Kosovo",
        "Macedonia",
        "Montenegro"
      ],
      "coastline": 362
    },
    "population": {
      "total": 2877797,
      "density": 100,
      "growthRate": 0.3,
      "urbanPopulation": 61
    },
    "gdp": {
      "total": 15000000000,
      "perCapita": 5213,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 21.7,
        "industry": 24.2,
        "services": 54.1
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 58.8,
        "_id": "68fd1ba67e1cf8338c17fec9"
      },
      {
        "name": "Christianity",
        "percentage": 16.9,
        "_id": "68fd1ba67e1cf8338c17feca"
      },
      {
        "name": "Unaffiliated",
        "percentage": 24.3,
        "_id": "68fd1ba67e1cf8338c17fecb"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba67e1cf8338c17fecc"
      }
    ],
    "touristAttractions": [
      {
        "name": "Butrint",
        "description": "UNESCO World Heritage archaeological site",
        "location": "Southern Albania",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1ba67e1cf8338c17fecd"
      }
    ],
    "capital": "Tirana",
    "currency": "Albanian Lek (ALL)",
    "languages": [
      "Albanian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mild temperate",
    "government": "Parliamentary republic",
    "independence": "November 28, 1912",
    "nationalDay": "November 28",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.280Z",
    "updatedAt": "2025-10-25T18:49:11.280Z"
  },
  {
    "_id": "68fd1ba67e1cf8338c17fece",
    "name": "Andorra",
    "code": "AD",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ad.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 42.5462,
        "longitude": 1.6016
      },
      "area": 468,
      "borders": [
        "France",
        "Spain"
      ],
      "coastline": 0
    },
    "population": {
      "total": 77265,
      "density": 165,
      "growthRate": 0.2,
      "urbanPopulation": 87.9
    },
    "gdp": {
      "total": 3200000000,
      "perCapita": 41430,
      "growthRate": 1.9,
      "sectors": {
        "agriculture": 0.4,
        "industry": 4.7,
        "services": 94.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 88.2,
        "_id": "68fd1ba67e1cf8338c17fecf"
      },
      {
        "name": "Islam",
        "percentage": 0.8,
        "_id": "68fd1ba67e1cf8338c17fed0"
      },
      {
        "name": "Other",
        "percentage": 11,
        "_id": "68fd1ba67e1cf8338c17fed1"
      }
    ],
    "traditions": [
      {
        "name": "Our Lady of Meritxell Day",
        "description": "National holiday",
        "category": "festival",
        "_id": "68fd1ba67e1cf8338c17fed2"
      }
    ],
    "touristAttractions": [
      {
        "name": "Valley of Madriu-Perafita-Claror",
        "description": "UNESCO World Heritage cultural landscape",
        "location": "Eastern Andorra",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1ba67e1cf8338c17fed3"
      }
    ],
    "capital": "Andorra la Vella",
    "currency": "Euro (EUR)",
    "languages": [
      "Catalan"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary co-principality",
    "independence": "1278",
    "nationalDay": "September 8",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.281Z",
    "updatedAt": "2025-10-25T18:49:11.281Z"
  },
  {
    "_id": "68fd1ba67e1cf8338c17fed4",
    "name": "Austria",
    "code": "AT",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/at.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 47.5162,
        "longitude": 14.5501
      },
      "area": 83871,
      "borders": [
        "Czech Republic",
        "Germany",
        "Hungary",
        "Italy",
        "Liechtenstein",
        "Slovakia",
        "Slovenia",
        "Switzerland"
      ],
      "coastline": 0
    },
    "population": {
      "total": 9006398,
      "density": 107,
      "growthRate": 0.4,
      "urbanPopulation": 58.8
    },
    "gdp": {
      "total": 450000000000,
      "perCapita": 49950,
      "growthRate": 1.4,
      "sectors": {
        "agriculture": 1.3,
        "industry": 28.4,
        "services": 70.3
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 73.6,
        "_id": "68fd1ba67e1cf8338c17fed5"
      },
      {
        "name": "Islam",
        "percentage": 4.2,
        "_id": "68fd1ba67e1cf8338c17fed6"
      },
      {
        "name": "Unaffiliated",
        "percentage": 20,
        "_id": "68fd1ba67e1cf8338c17fed7"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17fed8"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Vienna",
        "description": "UNESCO World Heritage site",
        "location": "Vienna",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17fed9"
      }
    ],
    "capital": "Vienna",
    "currency": "Euro (EUR)",
    "languages": [
      "German"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Federal parliamentary republic",
    "independence": "October 26, 1955",
    "nationalDay": "October 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.281Z",
    "updatedAt": "2025-10-25T18:49:11.281Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17feda",
    "name": "Belarus",
    "code": "BY",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/by.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 53.7098,
        "longitude": 27.9534
      },
      "area": 207600,
      "borders": [
        "Latvia",
        "Lithuania",
        "Poland",
        "Russia",
        "Ukraine"
      ],
      "coastline": 0
    },
    "population": {
      "total": 9449323,
      "density": 45,
      "growthRate": -0.2,
      "urbanPopulation": 79.5
    },
    "gdp": {
      "total": 63000000000,
      "perCapita": 6670,
      "growthRate": 1.2,
      "sectors": {
        "agriculture": 8.1,
        "industry": 40.8,
        "services": 51.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 48.3,
        "_id": "68fd1ba77e1cf8338c17fedb"
      },
      {
        "name": "Unaffiliated",
        "percentage": 41.1,
        "_id": "68fd1ba77e1cf8338c17fedc"
      },
      {
        "name": "Islam",
        "percentage": 6.7,
        "_id": "68fd1ba77e1cf8338c17fedd"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17fede"
      }
    ],
    "touristAttractions": [
      {
        "name": "Mir Castle Complex",
        "description": "UNESCO World Heritage site",
        "location": "Mir",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17fedf"
      }
    ],
    "capital": "Minsk",
    "currency": "Belarusian Ruble (BYN)",
    "languages": [
      "Belarusian",
      "Russian"
    ],
    "timezone": [
      "UTC+3"
    ],
    "climate": "Cold winters, cool summers",
    "government": "Presidential republic",
    "independence": "August 25, 1991",
    "nationalDay": "July 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.282Z",
    "updatedAt": "2025-10-25T18:49:11.282Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17fee0",
    "name": "Belgium",
    "code": "BE",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/be.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 50.5039,
        "longitude": 4.4699
      },
      "area": 30528,
      "borders": [
        "France",
        "Germany",
        "Luxembourg",
        "Netherlands"
      ],
      "coastline": 66
    },
    "population": {
      "total": 11589623,
      "density": 380,
      "growthRate": 0.6,
      "urbanPopulation": 98.1
    },
    "gdp": {
      "total": 530000000000,
      "perCapita": 45743,
      "growthRate": 1.4,
      "sectors": {
        "agriculture": 0.7,
        "industry": 22.1,
        "services": 77.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 60,
        "_id": "68fd1ba77e1cf8338c17fee1"
      },
      {
        "name": "Islam",
        "percentage": 7,
        "_id": "68fd1ba77e1cf8338c17fee2"
      },
      {
        "name": "Unaffiliated",
        "percentage": 31,
        "_id": "68fd1ba77e1cf8338c17fee3"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17fee4"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Bruges",
        "description": "UNESCO World Heritage site",
        "location": "Bruges",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17fee5"
      }
    ],
    "capital": "Brussels",
    "currency": "Euro (EUR)",
    "languages": [
      "Dutch",
      "French",
      "German"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Federal parliamentary constitutional monarchy",
    "independence": "July 21, 1831",
    "nationalDay": "July 21",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.283Z",
    "updatedAt": "2025-10-25T18:49:11.283Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17fee6",
    "name": "Bosnia and Herzegovina",
    "code": "BA",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ba.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 43.9159,
        "longitude": 17.6791
      },
      "area": 51209,
      "borders": [
        "Croatia",
        "Montenegro",
        "Serbia"
      ],
      "coastline": 20
    },
    "population": {
      "total": 3280819,
      "density": 64,
      "growthRate": -0.2,
      "urbanPopulation": 48.2
    },
    "gdp": {
      "total": 20000000000,
      "perCapita": 6097,
      "growthRate": 3,
      "sectors": {
        "agriculture": 6.8,
        "industry": 28.9,
        "services": 64.3
      }
    },
    "religions": [
      {
        "name": "Islam",
        "percentage": 50.7,
        "_id": "68fd1ba77e1cf8338c17fee7"
      },
      {
        "name": "Christianity",
        "percentage": 45.9,
        "_id": "68fd1ba77e1cf8338c17fee8"
      },
      {
        "name": "Other",
        "percentage": 3.4,
        "_id": "68fd1ba77e1cf8338c17fee9"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17feea"
      }
    ],
    "touristAttractions": [
      {
        "name": "Old Bridge Area of the Old City of Mostar",
        "description": "UNESCO World Heritage site",
        "location": "Mostar",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17feeb"
      }
    ],
    "capital": "Sarajevo",
    "currency": "Bosnia and Herzegovina Convertible Mark (BAM)",
    "languages": [
      "Bosnian",
      "Croatian",
      "Serbian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Hot summers and cold winters",
    "government": "Federal parliamentary republic",
    "independence": "March 1, 1992",
    "nationalDay": "March 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.284Z",
    "updatedAt": "2025-10-25T18:49:11.284Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17feec",
    "name": "Bulgaria",
    "code": "BG",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/bg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 42.7339,
        "longitude": 25.4858
      },
      "area": 110879,
      "borders": [
        "Greece",
        "Macedonia",
        "Romania",
        "Serbia",
        "Turkey"
      ],
      "coastline": 354
    },
    "population": {
      "total": 6948445,
      "density": 63,
      "growthRate": -0.7,
      "urbanPopulation": 75.7
    },
    "gdp": {
      "total": 69000000000,
      "perCapita": 9933,
      "growthRate": 3.4,
      "sectors": {
        "agriculture": 4.3,
        "industry": 28,
        "services": 67.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 59.4,
        "_id": "68fd1ba77e1cf8338c17feed"
      },
      {
        "name": "Islam",
        "percentage": 7.8,
        "_id": "68fd1ba77e1cf8338c17feee"
      },
      {
        "name": "Unaffiliated",
        "percentage": 31.8,
        "_id": "68fd1ba77e1cf8338c17feef"
      }
    ],
    "traditions": [
      {
        "name": "Liberation Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17fef0"
      }
    ],
    "touristAttractions": [
      {
        "name": "Boyana Church",
        "description": "UNESCO World Heritage site",
        "location": "Sofia",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17fef1"
      }
    ],
    "capital": "Sofia",
    "currency": "Bulgarian Lev (BGN)",
    "languages": [
      "Bulgarian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "September 22, 1908",
    "nationalDay": "March 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.285Z",
    "updatedAt": "2025-10-25T18:49:11.285Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17fef2",
    "name": "Croatia",
    "code": "HR",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/hr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 45.1,
        "longitude": 15.2
      },
      "area": 56594,
      "borders": [
        "Bosnia and Herzegovina",
        "Hungary",
        "Montenegro",
        "Serbia",
        "Slovenia"
      ],
      "coastline": 5835
    },
    "population": {
      "total": 4105267,
      "density": 73,
      "growthRate": -0.4,
      "urbanPopulation": 57.8
    },
    "gdp": {
      "total": 60000000000,
      "perCapita": 14612,
      "growthRate": 2.9,
      "sectors": {
        "agriculture": 3.7,
        "industry": 26.2,
        "services": 70.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 86.3,
        "_id": "68fd1ba77e1cf8338c17fef3"
      },
      {
        "name": "Islam",
        "percentage": 1.5,
        "_id": "68fd1ba77e1cf8338c17fef4"
      },
      {
        "name": "Unaffiliated",
        "percentage": 4.6,
        "_id": "68fd1ba77e1cf8338c17fef5"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17fef6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Plitvice Lakes National Park",
        "description": "UNESCO World Heritage site",
        "location": "Central Croatia",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17fef7"
      }
    ],
    "capital": "Zagreb",
    "currency": "Croatian Kuna (HRK)",
    "languages": [
      "Croatian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mediterranean and continental",
    "government": "Parliamentary republic",
    "independence": "June 25, 1991",
    "nationalDay": "June 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.285Z",
    "updatedAt": "2025-10-25T18:49:11.285Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17fef8",
    "name": "Czech Republic",
    "code": "CZ",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/cz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 49.7438,
        "longitude": 15.3386
      },
      "area": 78865,
      "borders": [
        "Austria",
        "Germany",
        "Poland",
        "Slovakia"
      ],
      "coastline": 0
    },
    "population": {
      "total": 10708981,
      "density": 136,
      "growthRate": 0.2,
      "urbanPopulation": 73.8
    },
    "gdp": {
      "total": 250000000000,
      "perCapita": 23346,
      "growthRate": 2.4,
      "sectors": {
        "agriculture": 2.8,
        "industry": 37.8,
        "services": 59.4
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 78.4,
        "_id": "68fd1ba77e1cf8338c17fef9"
      },
      {
        "name": "Christianity",
        "percentage": 21.6,
        "_id": "68fd1ba77e1cf8338c17fefa"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17fefb"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Prague",
        "description": "UNESCO World Heritage site",
        "location": "Prague",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17fefc"
      }
    ],
    "capital": "Prague",
    "currency": "Czech Koruna (CZK)",
    "languages": [
      "Czech"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "January 1, 1993",
    "nationalDay": "October 28",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.286Z",
    "updatedAt": "2025-10-25T18:49:11.286Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17fefd",
    "name": "Denmark",
    "code": "DK",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/dk.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 56.2639,
        "longitude": 9.5018
      },
      "area": 43094,
      "borders": [
        "Germany"
      ],
      "coastline": 7314
    },
    "population": {
      "total": 5792202,
      "density": 134,
      "growthRate": 0.4,
      "urbanPopulation": 87.9
    },
    "gdp": {
      "total": 350000000000,
      "perCapita": 60415,
      "growthRate": 2,
      "sectors": {
        "agriculture": 1.3,
        "industry": 24,
        "services": 74.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 75.9,
        "_id": "68fd1ba77e1cf8338c17fefe"
      },
      {
        "name": "Islam",
        "percentage": 4.4,
        "_id": "68fd1ba77e1cf8338c17feff"
      },
      {
        "name": "Unaffiliated",
        "percentage": 19.7,
        "_id": "68fd1ba77e1cf8338c17ff00"
      }
    ],
    "traditions": [
      {
        "name": "Constitution Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff01"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kronborg Castle",
        "description": "UNESCO World Heritage site",
        "location": "Helsingør",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff02"
      }
    ],
    "capital": "Copenhagen",
    "currency": "Danish Krone (DKK)",
    "languages": [
      "Danish"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary constitutional monarchy",
    "independence": "Never colonized",
    "nationalDay": "June 5",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.286Z",
    "updatedAt": "2025-10-25T18:49:11.286Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff03",
    "name": "Estonia",
    "code": "EE",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ee.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 58.5953,
        "longitude": 25.0136
      },
      "area": 45227,
      "borders": [
        "Latvia",
        "Russia"
      ],
      "coastline": 3794
    },
    "population": {
      "total": 1326535,
      "density": 29,
      "growthRate": 0,
      "urbanPopulation": 68.2
    },
    "gdp": {
      "total": 31000000000,
      "perCapita": 23366,
      "growthRate": 3,
      "sectors": {
        "agriculture": 2.8,
        "industry": 29.2,
        "services": 68
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 54.1,
        "_id": "68fd1ba77e1cf8338c17ff04"
      },
      {
        "name": "Christianity",
        "percentage": 45.9,
        "_id": "68fd1ba77e1cf8338c17ff05"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff06"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Tallinn",
        "description": "UNESCO World Heritage site",
        "location": "Tallinn",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff07"
      }
    ],
    "capital": "Tallinn",
    "currency": "Euro (EUR)",
    "languages": [
      "Estonian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Maritime, wet, moderate winters",
    "government": "Parliamentary republic",
    "independence": "August 20, 1991",
    "nationalDay": "February 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.287Z",
    "updatedAt": "2025-10-25T18:49:11.287Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff08",
    "name": "Finland",
    "code": "FI",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/fi.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 61.9241,
        "longitude": 25.7482
      },
      "area": 338424,
      "borders": [
        "Norway",
        "Russia",
        "Sweden"
      ],
      "coastline": 1250
    },
    "population": {
      "total": 5540720,
      "density": 16,
      "growthRate": 0.3,
      "urbanPopulation": 85.5
    },
    "gdp": {
      "total": 270000000000,
      "perCapita": 48725,
      "growthRate": 1,
      "sectors": {
        "agriculture": 2.7,
        "industry": 28.2,
        "services": 69.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 67.8,
        "_id": "68fd1ba77e1cf8338c17ff09"
      },
      {
        "name": "Unaffiliated",
        "percentage": 32.2,
        "_id": "68fd1ba77e1cf8338c17ff0a"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff0b"
      }
    ],
    "touristAttractions": [
      {
        "name": "Fortress of Suomenlinna",
        "description": "UNESCO World Heritage site",
        "location": "Helsinki",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff0c"
      }
    ],
    "capital": "Helsinki",
    "currency": "Euro (EUR)",
    "languages": [
      "Finnish",
      "Swedish"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Cold temperate",
    "government": "Parliamentary republic",
    "independence": "December 6, 1917",
    "nationalDay": "December 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.287Z",
    "updatedAt": "2025-10-25T18:49:11.287Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff0d",
    "name": "France",
    "code": "FR",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/fr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 46.2276,
        "longitude": 2.2137
      },
      "area": 551695,
      "borders": [
        "Andorra",
        "Belgium",
        "Germany",
        "Italy",
        "Luxembourg",
        "Monaco",
        "Spain",
        "Switzerland"
      ],
      "coastline": 3427
    },
    "population": {
      "total": 65273511,
      "density": 118,
      "growthRate": 0.2,
      "urbanPopulation": 80.4
    },
    "gdp": {
      "total": 2800000000000,
      "perCapita": 42903,
      "growthRate": 1.5,
      "sectors": {
        "agriculture": 1.7,
        "industry": 19.5,
        "services": 78.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 63,
        "_id": "68fd1ba77e1cf8338c17ff0e"
      },
      {
        "name": "Islam",
        "percentage": 7.5,
        "_id": "68fd1ba77e1cf8338c17ff0f"
      },
      {
        "name": "Unaffiliated",
        "percentage": 28,
        "_id": "68fd1ba77e1cf8338c17ff10"
      }
    ],
    "traditions": [
      {
        "name": "Bastille Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff11"
      }
    ],
    "touristAttractions": [
      {
        "name": "Palace and Park of Versailles",
        "description": "UNESCO World Heritage site",
        "location": "Versailles",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff12"
      }
    ],
    "capital": "Paris",
    "currency": "Euro (EUR)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Generally cool winters and mild summers",
    "government": "Semi-presidential republic",
    "independence": "Never colonized",
    "nationalDay": "July 14",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.288Z",
    "updatedAt": "2025-10-25T18:49:11.288Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff13",
    "name": "Germany",
    "code": "DE",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/de.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 51.1657,
        "longitude": 10.4515
      },
      "area": 357114,
      "borders": [
        "Austria",
        "Belgium",
        "Czech Republic",
        "Denmark",
        "France",
        "Luxembourg",
        "Netherlands",
        "Poland",
        "Switzerland"
      ],
      "coastline": 2389
    },
    "population": {
      "total": 83783942,
      "density": 235,
      "growthRate": 0.2,
      "urbanPopulation": 77.5
    },
    "gdp": {
      "total": 4000000000000,
      "perCapita": 47756,
      "growthRate": 1.5,
      "sectors": {
        "agriculture": 0.7,
        "industry": 30.7,
        "services": 68.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 55,
        "_id": "68fd1ba77e1cf8338c17ff14"
      },
      {
        "name": "Islam",
        "percentage": 5,
        "_id": "68fd1ba77e1cf8338c17ff15"
      },
      {
        "name": "Unaffiliated",
        "percentage": 40,
        "_id": "68fd1ba77e1cf8338c17ff16"
      }
    ],
    "traditions": [
      {
        "name": "German Unity Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff17"
      }
    ],
    "touristAttractions": [
      {
        "name": "Cologne Cathedral",
        "description": "UNESCO World Heritage site",
        "location": "Cologne",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff18"
      }
    ],
    "capital": "Berlin",
    "currency": "Euro (EUR)",
    "languages": [
      "German"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate and marine",
    "government": "Federal parliamentary republic",
    "independence": "October 3, 1990",
    "nationalDay": "October 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.289Z",
    "updatedAt": "2025-10-25T18:49:11.289Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff19",
    "name": "Greece",
    "code": "GR",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/gr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 39.0742,
        "longitude": 21.8243
      },
      "area": 131957,
      "borders": [
        "Albania",
        "Bulgaria",
        "Macedonia",
        "Turkey"
      ],
      "coastline": 13676
    },
    "population": {
      "total": 10423054,
      "density": 79,
      "growthRate": -0.5,
      "urbanPopulation": 79.7
    },
    "gdp": {
      "total": 210000000000,
      "perCapita": 20151,
      "growthRate": 1.9,
      "sectors": {
        "agriculture": 3.9,
        "industry": 15.9,
        "services": 80.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1ba77e1cf8338c17ff1a"
      },
      {
        "name": "Islam",
        "percentage": 2,
        "_id": "68fd1ba77e1cf8338c17ff1b"
      },
      {
        "name": "Other",
        "percentage": 8,
        "_id": "68fd1ba77e1cf8338c17ff1c"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff1d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Acropolis",
        "description": "UNESCO World Heritage site",
        "location": "Athens",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff1e"
      }
    ],
    "capital": "Athens",
    "currency": "Euro (EUR)",
    "languages": [
      "Greek"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "March 25, 1821",
    "nationalDay": "March 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.290Z",
    "updatedAt": "2025-10-25T18:49:11.290Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff1f",
    "name": "Hungary",
    "code": "HU",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/hu.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 47.1625,
        "longitude": 19.5033
      },
      "area": 93028,
      "borders": [
        "Austria",
        "Croatia",
        "Romania",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Ukraine"
      ],
      "coastline": 0
    },
    "population": {
      "total": 9660351,
      "density": 104,
      "growthRate": -0.2,
      "urbanPopulation": 71.4
    },
    "gdp": {
      "total": 160000000000,
      "perCapita": 16565,
      "growthRate": 4.9,
      "sectors": {
        "agriculture": 3.9,
        "industry": 31.3,
        "services": 64.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 67.4,
        "_id": "68fd1ba77e1cf8338c17ff20"
      },
      {
        "name": "Unaffiliated",
        "percentage": 29.6,
        "_id": "68fd1ba77e1cf8338c17ff21"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1ba77e1cf8338c17ff22"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Revolution celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff23"
      }
    ],
    "touristAttractions": [
      {
        "name": "Budapest",
        "description": "UNESCO World Heritage site",
        "location": "Budapest",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff24"
      }
    ],
    "capital": "Budapest",
    "currency": "Hungarian Forint (HUF)",
    "languages": [
      "Hungarian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "October 23, 1989",
    "nationalDay": "March 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.291Z",
    "updatedAt": "2025-10-25T18:49:11.291Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff25",
    "name": "Iceland",
    "code": "IS",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/is.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 64.9631,
        "longitude": -19.0208
      },
      "area": 103000,
      "borders": [],
      "coastline": 4970
    },
    "population": {
      "total": 341243,
      "density": 3,
      "growthRate": 1,
      "urbanPopulation": 94
    },
    "gdp": {
      "total": 24000000000,
      "perCapita": 70333,
      "growthRate": 1.9,
      "sectors": {
        "agriculture": 4.2,
        "industry": 20.2,
        "services": 75.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 67.2,
        "_id": "68fd1ba77e1cf8338c17ff26"
      },
      {
        "name": "Unaffiliated",
        "percentage": 32.8,
        "_id": "68fd1ba77e1cf8338c17ff27"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff28"
      }
    ],
    "touristAttractions": [
      {
        "name": "Thingvellir National Park",
        "description": "UNESCO World Heritage site",
        "location": "Southwest Iceland",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff29"
      }
    ],
    "capital": "Reykjavik",
    "currency": "Icelandic Krona (ISK)",
    "languages": [
      "Icelandic"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "June 17, 1944",
    "nationalDay": "June 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.291Z",
    "updatedAt": "2025-10-25T18:49:11.291Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff2a",
    "name": "Ireland",
    "code": "IE",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ie.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 53.4129,
        "longitude": -8.2439
      },
      "area": 70273,
      "borders": [
        "United Kingdom"
      ],
      "coastline": 1448
    },
    "population": {
      "total": 4937786,
      "density": 70,
      "growthRate": 1.1,
      "urbanPopulation": 63.2
    },
    "gdp": {
      "total": 430000000000,
      "perCapita": 87099,
      "growthRate": 5.5,
      "sectors": {
        "agriculture": 1.2,
        "industry": 38.6,
        "services": 60.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 78.3,
        "_id": "68fd1ba77e1cf8338c17ff2b"
      },
      {
        "name": "Unaffiliated",
        "percentage": 20,
        "_id": "68fd1ba77e1cf8338c17ff2c"
      },
      {
        "name": "Other",
        "percentage": 1.7,
        "_id": "68fd1ba77e1cf8338c17ff2d"
      }
    ],
    "traditions": [
      {
        "name": "Saint Patrick's Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff2e"
      }
    ],
    "touristAttractions": [
      {
        "name": "Brú na Bóinne",
        "description": "UNESCO World Heritage archaeological site",
        "location": "County Meath",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff2f"
      }
    ],
    "capital": "Dublin",
    "currency": "Euro (EUR)",
    "languages": [
      "Irish",
      "English"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Temperate maritime",
    "government": "Parliamentary republic",
    "independence": "December 6, 1921",
    "nationalDay": "March 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.291Z",
    "updatedAt": "2025-10-25T18:49:11.291Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff30",
    "name": "Italy",
    "code": "IT",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/it.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 41.8719,
        "longitude": 12.5674
      },
      "area": 301340,
      "borders": [
        "Austria",
        "France",
        "San Marino",
        "Slovenia",
        "Switzerland",
        "Vatican City"
      ],
      "coastline": 7600
    },
    "population": {
      "total": 60461826,
      "density": 201,
      "growthRate": -0.1,
      "urbanPopulation": 71
    },
    "gdp": {
      "total": 2100000000000,
      "perCapita": 34745,
      "growthRate": 0.3,
      "sectors": {
        "agriculture": 2.1,
        "industry": 23.9,
        "services": 74
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 80,
        "_id": "68fd1ba77e1cf8338c17ff31"
      },
      {
        "name": "Unaffiliated",
        "percentage": 20,
        "_id": "68fd1ba77e1cf8338c17ff32"
      }
    ],
    "traditions": [
      {
        "name": "Republic Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff33"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Rome",
        "description": "UNESCO World Heritage site",
        "location": "Rome",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff34"
      }
    ],
    "capital": "Rome",
    "currency": "Euro (EUR)",
    "languages": [
      "Italian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Predominantly Mediterranean",
    "government": "Parliamentary republic",
    "independence": "March 17, 1861",
    "nationalDay": "June 2",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.292Z",
    "updatedAt": "2025-10-25T18:49:11.292Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff35",
    "name": "Latvia",
    "code": "LV",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/lv.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 56.8796,
        "longitude": 24.6032
      },
      "area": 64589,
      "borders": [
        "Belarus",
        "Estonia",
        "Lithuania",
        "Russia"
      ],
      "coastline": 498
    },
    "population": {
      "total": 1886198,
      "density": 29,
      "growthRate": -0.6,
      "urbanPopulation": 68.1
    },
    "gdp": {
      "total": 34000000000,
      "perCapita": 18030,
      "growthRate": 2,
      "sectors": {
        "agriculture": 3.9,
        "industry": 22.4,
        "services": 73.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 70,
        "_id": "68fd1ba77e1cf8338c17ff36"
      },
      {
        "name": "Unaffiliated",
        "percentage": 25,
        "_id": "68fd1ba77e1cf8338c17ff37"
      },
      {
        "name": "Other",
        "percentage": 5,
        "_id": "68fd1ba77e1cf8338c17ff38"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff39"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Riga",
        "description": "UNESCO World Heritage site",
        "location": "Riga",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff3a"
      }
    ],
    "capital": "Riga",
    "currency": "Euro (EUR)",
    "languages": [
      "Latvian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Maritime",
    "government": "Parliamentary republic",
    "independence": "August 21, 1991",
    "nationalDay": "November 18",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.292Z",
    "updatedAt": "2025-10-25T18:49:11.292Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff3b",
    "name": "Liechtenstein",
    "code": "LI",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/li.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 47.166,
        "longitude": 9.5554
      },
      "area": 160,
      "borders": [
        "Austria",
        "Switzerland"
      ],
      "coastline": 0
    },
    "population": {
      "total": 38128,
      "density": 238,
      "growthRate": 0.7,
      "urbanPopulation": 14.3
    },
    "gdp": {
      "total": 6000000000,
      "perCapita": 157400,
      "growthRate": 1.8,
      "sectors": {
        "agriculture": 7,
        "industry": 41,
        "services": 52
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 75.9,
        "_id": "68fd1ba77e1cf8338c17ff3c"
      },
      {
        "name": "Islam",
        "percentage": 5.4,
        "_id": "68fd1ba77e1cf8338c17ff3d"
      },
      {
        "name": "Other",
        "percentage": 18.7,
        "_id": "68fd1ba77e1cf8338c17ff3e"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff3f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Vaduz Castle",
        "description": "Royal residence",
        "location": "Vaduz",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff40"
      }
    ],
    "capital": "Vaduz",
    "currency": "Swiss Franc (CHF)",
    "languages": [
      "German"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Continental",
    "government": "Constitutional monarchy",
    "independence": "January 23, 1719",
    "nationalDay": "August 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.293Z",
    "updatedAt": "2025-10-25T18:49:11.293Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff41",
    "name": "Lithuania",
    "code": "LT",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/lt.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 55.1694,
        "longitude": 23.8813
      },
      "area": 65300,
      "borders": [
        "Belarus",
        "Latvia",
        "Poland",
        "Russia"
      ],
      "coastline": 90
    },
    "population": {
      "total": 2722289,
      "density": 42,
      "growthRate": -1.1,
      "urbanPopulation": 67.7
    },
    "gdp": {
      "total": 54000000000,
      "perCapita": 19834,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 3.5,
        "industry": 28.5,
        "services": 68
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 77.2,
        "_id": "68fd1ba77e1cf8338c17ff42"
      },
      {
        "name": "Unaffiliated",
        "percentage": 22.8,
        "_id": "68fd1ba77e1cf8338c17ff43"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff44"
      }
    ],
    "touristAttractions": [
      {
        "name": "Vilnius Historic Centre",
        "description": "UNESCO World Heritage site",
        "location": "Vilnius",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff45"
      }
    ],
    "capital": "Vilnius",
    "currency": "Euro (EUR)",
    "languages": [
      "Lithuanian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Transitional, between maritime and continental",
    "government": "Parliamentary republic",
    "independence": "March 11, 1990",
    "nationalDay": "February 16",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.294Z",
    "updatedAt": "2025-10-25T18:49:11.294Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff46",
    "name": "Luxembourg",
    "code": "LU",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/lu.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 49.8153,
        "longitude": 6.1296
      },
      "area": 2586,
      "borders": [
        "Belgium",
        "France",
        "Germany"
      ],
      "coastline": 0
    },
    "population": {
      "total": 625978,
      "density": 242,
      "growthRate": 1.7,
      "urbanPopulation": 91.4
    },
    "gdp": {
      "total": 70000000000,
      "perCapita": 111875,
      "growthRate": 2.3,
      "sectors": {
        "agriculture": 0.3,
        "industry": 12.8,
        "services": 86.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 70.4,
        "_id": "68fd1ba77e1cf8338c17ff47"
      },
      {
        "name": "Islam",
        "percentage": 2.3,
        "_id": "68fd1ba77e1cf8338c17ff48"
      },
      {
        "name": "Unaffiliated",
        "percentage": 27.3,
        "_id": "68fd1ba77e1cf8338c17ff49"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff4a"
      }
    ],
    "touristAttractions": [
      {
        "name": "City of Luxembourg",
        "description": "UNESCO World Heritage site",
        "location": "Luxembourg City",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff4b"
      }
    ],
    "capital": "Luxembourg",
    "currency": "Euro (EUR)",
    "languages": [
      "Luxembourgish",
      "French",
      "German"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Modified continental",
    "government": "Constitutional monarchy",
    "independence": "June 9, 1815",
    "nationalDay": "June 23",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.294Z",
    "updatedAt": "2025-10-25T18:49:11.294Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff4c",
    "name": "Malta",
    "code": "MT",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/mt.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 35.9375,
        "longitude": 14.3754
      },
      "area": 316,
      "borders": [],
      "coastline": 196
    },
    "population": {
      "total": 441543,
      "density": 1397,
      "growthRate": 0.3,
      "urbanPopulation": 94.8
    },
    "gdp": {
      "total": 15000000000,
      "perCapita": 33976,
      "growthRate": 4,
      "sectors": {
        "agriculture": 1.1,
        "industry": 10.4,
        "services": 88.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 98.1,
        "_id": "68fd1ba77e1cf8338c17ff4d"
      },
      {
        "name": "Islam",
        "percentage": 1,
        "_id": "68fd1ba77e1cf8338c17ff4e"
      },
      {
        "name": "Other",
        "percentage": 0.9,
        "_id": "68fd1ba77e1cf8338c17ff4f"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff50"
      }
    ],
    "touristAttractions": [
      {
        "name": "Valletta",
        "description": "UNESCO World Heritage city",
        "location": "Valletta",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff51"
      }
    ],
    "capital": "Valletta",
    "currency": "Euro (EUR)",
    "languages": [
      "Maltese",
      "English"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mediterranean",
    "government": "Parliamentary republic",
    "independence": "September 21, 1964",
    "nationalDay": "September 21",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.294Z",
    "updatedAt": "2025-10-25T18:49:11.294Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff52",
    "name": "Moldova",
    "code": "MD",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/md.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 47.4116,
        "longitude": 28.3699
      },
      "area": 33846,
      "borders": [
        "Romania",
        "Ukraine"
      ],
      "coastline": 0
    },
    "population": {
      "total": 4033963,
      "density": 119,
      "growthRate": -0.2,
      "urbanPopulation": 42.7
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 2975,
      "growthRate": 3.8,
      "sectors": {
        "agriculture": 14.2,
        "industry": 20.3,
        "services": 65.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1ba77e1cf8338c17ff53"
      },
      {
        "name": "Other",
        "percentage": 10,
        "_id": "68fd1ba77e1cf8338c17ff54"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff55"
      }
    ],
    "touristAttractions": [
      {
        "name": "Chișinău",
        "description": "Capital city",
        "location": "Central Moldova",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff56"
      }
    ],
    "capital": "Chișinău",
    "currency": "Moldovan Leu (MDL)",
    "languages": [
      "Romanian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Moderate winters, warm summers",
    "government": "Parliamentary republic",
    "independence": "August 27, 1991",
    "nationalDay": "August 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.295Z",
    "updatedAt": "2025-10-25T18:49:11.295Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff57",
    "name": "Monaco",
    "code": "MC",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/mc.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 43.7384,
        "longitude": 7.4246
      },
      "area": 2,
      "borders": [
        "France"
      ],
      "coastline": 4
    },
    "population": {
      "total": 39242,
      "density": 19621,
      "growthRate": 0.1,
      "urbanPopulation": 100
    },
    "gdp": {
      "total": 7000000000,
      "perCapita": 178400,
      "growthRate": 1.2,
      "sectors": {
        "agriculture": 0,
        "industry": 14,
        "services": 86
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 83.2,
        "_id": "68fd1ba77e1cf8338c17ff58"
      },
      {
        "name": "Other",
        "percentage": 16.8,
        "_id": "68fd1ba77e1cf8338c17ff59"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff5a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Monte Carlo Casino",
        "description": "Famous casino",
        "location": "Monte Carlo",
        "category": "city",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff5b"
      }
    ],
    "capital": "Monaco",
    "currency": "Euro (EUR)",
    "languages": [
      "French"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mediterranean",
    "government": "Constitutional monarchy",
    "independence": "January 8, 1297",
    "nationalDay": "November 19",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.296Z",
    "updatedAt": "2025-10-25T18:49:11.296Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff5c",
    "name": "Montenegro",
    "code": "ME",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/me.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 42.7087,
        "longitude": 19.3744
      },
      "area": 13812,
      "borders": [
        "Albania",
        "Bosnia and Herzegovina",
        "Croatia",
        "Kosovo",
        "Serbia"
      ],
      "coastline": 293
    },
    "population": {
      "total": 628066,
      "density": 45,
      "growthRate": 0,
      "urbanPopulation": 64.2
    },
    "gdp": {
      "total": 5000000000,
      "perCapita": 7962,
      "growthRate": 3,
      "sectors": {
        "agriculture": 7.5,
        "industry": 15.9,
        "services": 76.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 72.1,
        "_id": "68fd1ba77e1cf8338c17ff5d"
      },
      {
        "name": "Islam",
        "percentage": 19.1,
        "_id": "68fd1ba77e1cf8338c17ff5e"
      },
      {
        "name": "Other",
        "percentage": 8.8,
        "_id": "68fd1ba77e1cf8338c17ff5f"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff60"
      }
    ],
    "touristAttractions": [
      {
        "name": "Durmitor National Park",
        "description": "UNESCO World Heritage site",
        "location": "Northern Montenegro",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff61"
      }
    ],
    "capital": "Podgorica",
    "currency": "Euro (EUR)",
    "languages": [
      "Montenegrin"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mediterranean",
    "government": "Parliamentary republic",
    "independence": "June 3, 2006",
    "nationalDay": "July 13",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.296Z",
    "updatedAt": "2025-10-25T18:49:11.296Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff62",
    "name": "Netherlands",
    "code": "NL",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/nl.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 52.1326,
        "longitude": 5.2913
      },
      "area": 41543,
      "borders": [
        "Belgium",
        "Germany"
      ],
      "coastline": 451
    },
    "population": {
      "total": 17134872,
      "density": 412,
      "growthRate": 0.4,
      "urbanPopulation": 91.5
    },
    "gdp": {
      "total": 900000000000,
      "perCapita": 52510,
      "growthRate": 1.7,
      "sectors": {
        "agriculture": 1.6,
        "industry": 17.9,
        "services": 80.5
      }
    },
    "religions": [
      {
        "name": "Unaffiliated",
        "percentage": 50.1,
        "_id": "68fd1ba77e1cf8338c17ff63"
      },
      {
        "name": "Christianity",
        "percentage": 39.8,
        "_id": "68fd1ba77e1cf8338c17ff64"
      },
      {
        "name": "Islam",
        "percentage": 5,
        "_id": "68fd1ba77e1cf8338c17ff65"
      }
    ],
    "traditions": [
      {
        "name": "King's Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff66"
      }
    ],
    "touristAttractions": [
      {
        "name": "Seventeenth-Century Canal Ring Area of Amsterdam",
        "description": "UNESCO World Heritage site",
        "location": "Amsterdam",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff67"
      }
    ],
    "capital": "Amsterdam",
    "currency": "Euro (EUR)",
    "languages": [
      "Dutch"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary constitutional monarchy",
    "independence": "July 26, 1581",
    "nationalDay": "April 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.297Z",
    "updatedAt": "2025-10-25T18:49:11.297Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff68",
    "name": "North Macedonia",
    "code": "MK",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/mk.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 41.6086,
        "longitude": 21.7453
      },
      "area": 25713,
      "borders": [
        "Albania",
        "Bulgaria",
        "Greece",
        "Kosovo",
        "Serbia"
      ],
      "coastline": 0
    },
    "population": {
      "total": 2083374,
      "density": 81,
      "growthRate": 0,
      "urbanPopulation": 58.2
    },
    "gdp": {
      "total": 13000000000,
      "perCapita": 6240,
      "growthRate": 2.7,
      "sectors": {
        "agriculture": 10.9,
        "industry": 26.6,
        "services": 62.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 64.8,
        "_id": "68fd1ba77e1cf8338c17ff69"
      },
      {
        "name": "Islam",
        "percentage": 33.3,
        "_id": "68fd1ba77e1cf8338c17ff6a"
      },
      {
        "name": "Other",
        "percentage": 1.9,
        "_id": "68fd1ba77e1cf8338c17ff6b"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff6c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Ohrid",
        "description": "UNESCO World Heritage city",
        "location": "Southwestern Macedonia",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff6d"
      }
    ],
    "capital": "Skopje",
    "currency": "Macedonian Denar (MKD)",
    "languages": [
      "Macedonian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Warm, dry summers and autumns",
    "government": "Parliamentary republic",
    "independence": "September 8, 1991",
    "nationalDay": "September 8",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.298Z",
    "updatedAt": "2025-10-25T18:49:11.298Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff6e",
    "name": "Norway",
    "code": "NO",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/no.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 60.472,
        "longitude": 8.4689
      },
      "area": 323802,
      "borders": [
        "Finland",
        "Russia",
        "Sweden"
      ],
      "coastline": 25148
    },
    "population": {
      "total": 5421241,
      "density": 17,
      "growthRate": 0.8,
      "urbanPopulation": 82.4
    },
    "gdp": {
      "total": 400000000000,
      "perCapita": 73776,
      "growthRate": 1.2,
      "sectors": {
        "agriculture": 2.3,
        "industry": 33.7,
        "services": 64
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 68.1,
        "_id": "68fd1ba77e1cf8338c17ff6f"
      },
      {
        "name": "Unaffiliated",
        "percentage": 31.9,
        "_id": "68fd1ba77e1cf8338c17ff70"
      }
    ],
    "traditions": [
      {
        "name": "Constitution Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff71"
      }
    ],
    "touristAttractions": [
      {
        "name": "West Norwegian Fjords",
        "description": "UNESCO World Heritage site",
        "location": "Western Norway",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff72"
      }
    ],
    "capital": "Oslo",
    "currency": "Norwegian Krone (NOK)",
    "languages": [
      "Norwegian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate along coast",
    "government": "Parliamentary constitutional monarchy",
    "independence": "June 7, 1905",
    "nationalDay": "May 17",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.298Z",
    "updatedAt": "2025-10-25T18:49:11.298Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff73",
    "name": "Poland",
    "code": "PL",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/pl.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 51.9194,
        "longitude": 19.1451
      },
      "area": 312679,
      "borders": [
        "Belarus",
        "Czech Republic",
        "Germany",
        "Lithuania",
        "Russia",
        "Slovakia",
        "Ukraine"
      ],
      "coastline": 440
    },
    "population": {
      "total": 37846611,
      "density": 121,
      "growthRate": -0.1,
      "urbanPopulation": 60
    },
    "gdp": {
      "total": 590000000000,
      "perCapita": 15595,
      "growthRate": 4.1,
      "sectors": {
        "agriculture": 2.4,
        "industry": 40.2,
        "services": 57.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 87.5,
        "_id": "68fd1ba77e1cf8338c17ff74"
      },
      {
        "name": "Unaffiliated",
        "percentage": 12.5,
        "_id": "68fd1ba77e1cf8338c17ff75"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff76"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Kraków",
        "description": "UNESCO World Heritage site",
        "location": "Kraków",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff77"
      }
    ],
    "capital": "Warsaw",
    "currency": "Polish Zloty (PLN)",
    "languages": [
      "Polish"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "November 11, 1918",
    "nationalDay": "November 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.299Z",
    "updatedAt": "2025-10-25T18:49:11.299Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff78",
    "name": "Portugal",
    "code": "PT",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/pt.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 39.3999,
        "longitude": -8.2245
      },
      "area": 92090,
      "borders": [
        "Spain"
      ],
      "coastline": 1793
    },
    "population": {
      "total": 10196709,
      "density": 111,
      "growthRate": -0.2,
      "urbanPopulation": 65.8
    },
    "gdp": {
      "total": 230000000000,
      "perCapita": 22558,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 2.2,
        "industry": 22.1,
        "services": 75.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 81,
        "_id": "68fd1ba77e1cf8338c17ff79"
      },
      {
        "name": "Unaffiliated",
        "percentage": 19,
        "_id": "68fd1ba77e1cf8338c17ff7a"
      }
    ],
    "traditions": [
      {
        "name": "Portugal Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff7b"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Centre of Porto",
        "description": "UNESCO World Heritage site",
        "location": "Porto",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff7c"
      }
    ],
    "capital": "Lisbon",
    "currency": "Euro (EUR)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Maritime temperate",
    "government": "Semi-presidential republic",
    "independence": "December 1, 1640",
    "nationalDay": "June 10",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.300Z",
    "updatedAt": "2025-10-25T18:49:11.300Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff7d",
    "name": "Romania",
    "code": "RO",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ro.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 45.9432,
        "longitude": 24.9668
      },
      "area": 238391,
      "borders": [
        "Bulgaria",
        "Hungary",
        "Moldova",
        "Serbia",
        "Ukraine"
      ],
      "coastline": 225
    },
    "population": {
      "total": 19237691,
      "density": 81,
      "growthRate": -0.4,
      "urbanPopulation": 54
    },
    "gdp": {
      "total": 250000000000,
      "perCapita": 12995,
      "growthRate": 4.1,
      "sectors": {
        "agriculture": 4.2,
        "industry": 33.2,
        "services": 62.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 81.9,
        "_id": "68fd1ba77e1cf8338c17ff7e"
      },
      {
        "name": "Unaffiliated",
        "percentage": 18.1,
        "_id": "68fd1ba77e1cf8338c17ff7f"
      }
    ],
    "traditions": [
      {
        "name": "Great Union Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff80"
      }
    ],
    "touristAttractions": [
      {
        "name": "Danube Delta",
        "description": "UNESCO World Heritage site",
        "location": "Eastern Romania",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff81"
      }
    ],
    "capital": "Bucharest",
    "currency": "Romanian Leu (RON)",
    "languages": [
      "Romanian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate",
    "government": "Semi-presidential republic",
    "independence": "May 9, 1877",
    "nationalDay": "December 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.301Z",
    "updatedAt": "2025-10-25T18:49:11.301Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff82",
    "name": "San Marino",
    "code": "SM",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/sm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 43.9424,
        "longitude": 12.4578
      },
      "area": 61,
      "borders": [
        "Italy"
      ],
      "coastline": 0
    },
    "population": {
      "total": 33931,
      "density": 556,
      "growthRate": 0.2,
      "urbanPopulation": 97
    },
    "gdp": {
      "total": 1600000000,
      "perCapita": 47150,
      "growthRate": 1,
      "sectors": {
        "agriculture": 0.1,
        "industry": 39.2,
        "services": 60.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97,
        "_id": "68fd1ba77e1cf8338c17ff83"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1ba77e1cf8338c17ff84"
      }
    ],
    "traditions": [
      {
        "name": "Founding Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff85"
      }
    ],
    "touristAttractions": [
      {
        "name": "San Marino Historic Centre",
        "description": "UNESCO World Heritage site",
        "location": "San Marino",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff86"
      }
    ],
    "capital": "San Marino",
    "currency": "Euro (EUR)",
    "languages": [
      "Italian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mediterranean",
    "government": "Parliamentary republic",
    "independence": "September 3, 301",
    "nationalDay": "September 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.302Z",
    "updatedAt": "2025-10-25T18:49:11.302Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff87",
    "name": "Serbia",
    "code": "RS",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/rs.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 44.0165,
        "longitude": 21.0059
      },
      "area": 88361,
      "borders": [
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Hungary",
        "Kosovo",
        "Macedonia",
        "Montenegro",
        "Romania"
      ],
      "coastline": 0
    },
    "population": {
      "total": 8737371,
      "density": 99,
      "growthRate": -0.5,
      "urbanPopulation": 56
    },
    "gdp": {
      "total": 52000000000,
      "perCapita": 5951,
      "growthRate": 3,
      "sectors": {
        "agriculture": 9.8,
        "industry": 41.1,
        "services": 49.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 84.6,
        "_id": "68fd1ba77e1cf8338c17ff88"
      },
      {
        "name": "Islam",
        "percentage": 3.1,
        "_id": "68fd1ba77e1cf8338c17ff89"
      },
      {
        "name": "Other",
        "percentage": 12.3,
        "_id": "68fd1ba77e1cf8338c17ff8a"
      }
    ],
    "traditions": [
      {
        "name": "Statehood Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff8b"
      }
    ],
    "touristAttractions": [
      {
        "name": "Studenica Monastery",
        "description": "UNESCO World Heritage site",
        "location": "Central Serbia",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff8c"
      }
    ],
    "capital": "Belgrade",
    "currency": "Serbian Dinar (RSD)",
    "languages": [
      "Serbian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Continental",
    "government": "Parliamentary republic",
    "independence": "June 5, 2006",
    "nationalDay": "February 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.303Z",
    "updatedAt": "2025-10-25T18:49:11.303Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff8d",
    "name": "Slovakia",
    "code": "SK",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/sk.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 48.669,
        "longitude": 19.699
      },
      "area": 49035,
      "borders": [
        "Austria",
        "Czech Republic",
        "Hungary",
        "Poland",
        "Ukraine"
      ],
      "coastline": 0
    },
    "population": {
      "total": 5459642,
      "density": 111,
      "growthRate": 0.1,
      "urbanPopulation": 53.8
    },
    "gdp": {
      "total": 110000000000,
      "perCapita": 20152,
      "growthRate": 2.4,
      "sectors": {
        "agriculture": 3.8,
        "industry": 35,
        "services": 61.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 62,
        "_id": "68fd1ba77e1cf8338c17ff8e"
      },
      {
        "name": "Unaffiliated",
        "percentage": 38,
        "_id": "68fd1ba77e1cf8338c17ff8f"
      }
    ],
    "traditions": [
      {
        "name": "Constitution Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff90"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Town of Banská Štiavnica",
        "description": "UNESCO World Heritage site",
        "location": "Central Slovakia",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff91"
      }
    ],
    "capital": "Bratislava",
    "currency": "Euro (EUR)",
    "languages": [
      "Slovak"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary republic",
    "independence": "January 1, 1993",
    "nationalDay": "September 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.304Z",
    "updatedAt": "2025-10-25T18:49:11.304Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff92",
    "name": "Slovenia",
    "code": "SI",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/si.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 46.1512,
        "longitude": 14.9955
      },
      "area": 20273,
      "borders": [
        "Austria",
        "Croatia",
        "Hungary",
        "Italy"
      ],
      "coastline": 47
    },
    "population": {
      "total": 2078938,
      "density": 103,
      "growthRate": 0,
      "urbanPopulation": 54.8
    },
    "gdp": {
      "total": 54000000000,
      "perCapita": 25966,
      "growthRate": 2.4,
      "sectors": {
        "agriculture": 2.2,
        "industry": 32.2,
        "services": 65.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 77.3,
        "_id": "68fd1ba77e1cf8338c17ff93"
      },
      {
        "name": "Islam",
        "percentage": 2.4,
        "_id": "68fd1ba77e1cf8338c17ff94"
      },
      {
        "name": "Unaffiliated",
        "percentage": 20.3,
        "_id": "68fd1ba77e1cf8338c17ff95"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff96"
      }
    ],
    "touristAttractions": [
      {
        "name": "Škocjan Caves",
        "description": "UNESCO World Heritage site",
        "location": "Southwestern Slovenia",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ff97"
      }
    ],
    "capital": "Ljubljana",
    "currency": "Euro (EUR)",
    "languages": [
      "Slovenian"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Mediterranean climate on the coast",
    "government": "Parliamentary republic",
    "independence": "June 25, 1991",
    "nationalDay": "June 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.304Z",
    "updatedAt": "2025-10-25T18:49:11.304Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff98",
    "name": "Spain",
    "code": "ES",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/es.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 40.4637,
        "longitude": -3.7492
      },
      "area": 505992,
      "borders": [
        "Andorra",
        "France",
        "Gibraltar",
        "Morocco",
        "Portugal"
      ],
      "coastline": 4964
    },
    "population": {
      "total": 46754778,
      "density": 92,
      "growthRate": 0,
      "urbanPopulation": 80.8
    },
    "gdp": {
      "total": 1400000000000,
      "perCapita": 29940,
      "growthRate": 2,
      "sectors": {
        "agriculture": 2.6,
        "industry": 23.2,
        "services": 74.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 68,
        "_id": "68fd1ba77e1cf8338c17ff99"
      },
      {
        "name": "Unaffiliated",
        "percentage": 30,
        "_id": "68fd1ba77e1cf8338c17ff9a"
      },
      {
        "name": "Other",
        "percentage": 2,
        "_id": "68fd1ba77e1cf8338c17ff9b"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ff9c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Alhambra",
        "description": "UNESCO World Heritage palace",
        "location": "Granada",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ff9d"
      }
    ],
    "capital": "Madrid",
    "currency": "Euro (EUR)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Parliamentary constitutional monarchy",
    "independence": "Never colonized",
    "nationalDay": "October 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.305Z",
    "updatedAt": "2025-10-25T18:49:11.305Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ff9e",
    "name": "Sweden",
    "code": "SE",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/se.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 60.1282,
        "longitude": 18.6435
      },
      "area": 450295,
      "borders": [
        "Finland",
        "Norway"
      ],
      "coastline": 3218
    },
    "population": {
      "total": 10099265,
      "density": 22,
      "growthRate": 0.6,
      "urbanPopulation": 87.9
    },
    "gdp": {
      "total": 530000000000,
      "perCapita": 52477,
      "growthRate": 1.2,
      "sectors": {
        "agriculture": 1.6,
        "industry": 33,
        "services": 65.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 60.2,
        "_id": "68fd1ba77e1cf8338c17ff9f"
      },
      {
        "name": "Unaffiliated",
        "percentage": 39.8,
        "_id": "68fd1ba77e1cf8338c17ffa0"
      }
    ],
    "traditions": [
      {
        "name": "National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ffa1"
      }
    ],
    "touristAttractions": [
      {
        "name": "Royal Domain of Drottningholm",
        "description": "UNESCO World Heritage site",
        "location": "Stockholm",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ffa2"
      }
    ],
    "capital": "Stockholm",
    "currency": "Swedish Krona (SEK)",
    "languages": [
      "Swedish"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate in south",
    "government": "Parliamentary constitutional monarchy",
    "independence": "June 6, 1523",
    "nationalDay": "June 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.306Z",
    "updatedAt": "2025-10-25T18:49:11.306Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ffa3",
    "name": "Switzerland",
    "code": "CH",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ch.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 46.8182,
        "longitude": 8.2275
      },
      "area": 41284,
      "borders": [
        "Austria",
        "France",
        "Germany",
        "Italy",
        "Liechtenstein"
      ],
      "coastline": 0
    },
    "population": {
      "total": 8654622,
      "density": 210,
      "growthRate": 0.7,
      "urbanPopulation": 73.9
    },
    "gdp": {
      "total": 700000000000,
      "perCapita": 80890,
      "growthRate": 1.1,
      "sectors": {
        "agriculture": 0.7,
        "industry": 25.6,
        "services": 73.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 65,
        "_id": "68fd1ba77e1cf8338c17ffa4"
      },
      {
        "name": "Islam",
        "percentage": 5,
        "_id": "68fd1ba77e1cf8338c17ffa5"
      },
      {
        "name": "Unaffiliated",
        "percentage": 30,
        "_id": "68fd1ba77e1cf8338c17ffa6"
      }
    ],
    "traditions": [
      {
        "name": "Swiss National Day",
        "description": "Independence celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ffa7"
      }
    ],
    "touristAttractions": [
      {
        "name": "Swiss Alps Jungfrau-Aletsch",
        "description": "UNESCO World Heritage site",
        "location": "Central Switzerland",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ffa8"
      }
    ],
    "capital": "Bern",
    "currency": "Swiss Franc (CHF)",
    "languages": [
      "German",
      "French",
      "Italian",
      "Romansh"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Federal republic",
    "independence": "August 1, 1291",
    "nationalDay": "August 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.306Z",
    "updatedAt": "2025-10-25T18:49:11.306Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ffa9",
    "name": "Ukraine",
    "code": "UA",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/ua.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 48.3794,
        "longitude": 31.1656
      },
      "area": 603550,
      "borders": [
        "Belarus",
        "Hungary",
        "Moldova",
        "Poland",
        "Romania",
        "Russia",
        "Slovakia"
      ],
      "coastline": 2782
    },
    "population": {
      "total": 43733762,
      "density": 72,
      "growthRate": -0.5,
      "urbanPopulation": 69.4
    },
    "gdp": {
      "total": 200000000000,
      "perCapita": 4572,
      "growthRate": 3.2,
      "sectors": {
        "agriculture": 12.2,
        "industry": 28.6,
        "services": 59.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 67.3,
        "_id": "68fd1ba77e1cf8338c17ffaa"
      },
      {
        "name": "Unaffiliated",
        "percentage": 32.7,
        "_id": "68fd1ba77e1cf8338c17ffab"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ffac"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kyiv: Saint-Sophia Cathedral",
        "description": "UNESCO World Heritage site",
        "location": "Kyiv",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1ba77e1cf8338c17ffad"
      }
    ],
    "capital": "Kyiv",
    "currency": "Ukrainian Hryvnia (UAH)",
    "languages": [
      "Ukrainian"
    ],
    "timezone": [
      "UTC+2"
    ],
    "climate": "Temperate continental",
    "government": "Semi-presidential republic",
    "independence": "August 24, 1991",
    "nationalDay": "August 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.307Z",
    "updatedAt": "2025-10-25T18:49:11.307Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ffae",
    "name": "United Kingdom",
    "code": "GB",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/gb.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 55.3781,
        "longitude": -3.436
      },
      "area": 242495,
      "borders": [
        "Ireland"
      ],
      "coastline": 12429
    },
    "population": {
      "total": 67886011,
      "density": 280,
      "growthRate": 0.5,
      "urbanPopulation": 83.9
    },
    "gdp": {
      "total": 2800000000000,
      "perCapita": 41259,
      "growthRate": 1.4,
      "sectors": {
        "agriculture": 0.6,
        "industry": 19.2,
        "services": 80.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 59.5,
        "_id": "68fd1ba77e1cf8338c17ffaf"
      },
      {
        "name": "Unaffiliated",
        "percentage": 25.7,
        "_id": "68fd1ba77e1cf8338c17ffb0"
      },
      {
        "name": "Islam",
        "percentage": 4.4,
        "_id": "68fd1ba77e1cf8338c17ffb1"
      }
    ],
    "traditions": [
      {
        "name": "Trooping the Colour",
        "description": "Queen's birthday celebration",
        "category": "festival",
        "_id": "68fd1ba77e1cf8338c17ffb2"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tower of London",
        "description": "UNESCO World Heritage site",
        "location": "London",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ffb3"
      }
    ],
    "capital": "London",
    "currency": "British Pound (GBP)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+0"
    ],
    "climate": "Temperate",
    "government": "Parliamentary constitutional monarchy",
    "independence": "Never colonized",
    "nationalDay": "June 2",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.308Z",
    "updatedAt": "2025-10-25T18:49:11.308Z"
  },
  {
    "_id": "68fd1ba77e1cf8338c17ffb4",
    "name": "Vatican City",
    "code": "VA",
    "continent": "Europe",
    "flag": "https://flagcdn.com/w320/va.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 41.9029,
        "longitude": 12.4534
      },
      "area": 0,
      "borders": [
        "Italy"
      ],
      "coastline": 0
    },
    "population": {
      "total": 825,
      "density": 2063,
      "growthRate": 0,
      "urbanPopulation": 100
    },
    "gdp": {
      "total": 1000000000,
      "perCapita": 1212121,
      "growthRate": 0,
      "sectors": {
        "agriculture": 0,
        "industry": 0,
        "services": 100
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 100,
        "_id": "68fd1ba77e1cf8338c17ffb5"
      }
    ],
    "traditions": [
      {
        "name": "Election of Pope",
        "description": "Religious ceremony",
        "category": "ceremony",
        "_id": "68fd1ba77e1cf8338c17ffb6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Vatican City",
        "description": "UNESCO World Heritage site",
        "location": "Vatican City",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1ba77e1cf8338c17ffb7"
      }
    ],
    "capital": "Vatican City",
    "currency": "Euro (EUR)",
    "languages": [
      "Italian",
      "Latin"
    ],
    "timezone": [
      "UTC+1"
    ],
    "climate": "Temperate",
    "government": "Ecclesiastical elective monarchy",
    "independence": "February 11, 1929",
    "nationalDay": "February 11",
    "__v": 0,
    "createdAt": "2025-10-25T18:49:11.309Z",
    "updatedAt": "2025-10-25T18:49:11.309Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95c4",
    "name": "Antigua and Barbuda",
    "code": "AG",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/ag.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 17.0608,
        "longitude": -61.7964
      },
      "area": 442,
      "borders": [],
      "coastline": 153
    },
    "population": {
      "total": 97929,
      "density": 222,
      "growthRate": 1.2,
      "urbanPopulation": 24.6
    },
    "gdp": {
      "total": 1600000000,
      "perCapita": 16327,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 2.1,
        "industry": 20,
        "services": 77.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 77,
        "_id": "68fd1c0340d28bb3585c95c5"
      },
      {
        "name": "Other",
        "percentage": 23,
        "_id": "68fd1c0340d28bb3585c95c6"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95c7"
      }
    ],
    "touristAttractions": [
      {
        "name": "Nelson's Dockyard",
        "description": "UNESCO World Heritage site",
        "location": "English Harbour",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95c8"
      }
    ],
    "capital": "Saint John's",
    "currency": "East Caribbean Dollar (XCD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical maritime",
    "government": "Parliamentary constitutional monarchy",
    "independence": "November 1, 1981",
    "nationalDay": "November 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.417Z",
    "updatedAt": "2025-10-25T18:50:43.417Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95c9",
    "name": "Bahamas",
    "code": "BS",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/bs.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 25.0343,
        "longitude": -77.3963
      },
      "area": 13880,
      "borders": [],
      "coastline": 3542
    },
    "population": {
      "total": 393244,
      "density": 28,
      "growthRate": 0.9,
      "urbanPopulation": 83
    },
    "gdp": {
      "total": 12000000000,
      "perCapita": 30525,
      "growthRate": 0.9,
      "sectors": {
        "agriculture": 2.1,
        "industry": 7.4,
        "services": 90.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 95.8,
        "_id": "68fd1c0340d28bb3585c95ca"
      },
      {
        "name": "Other",
        "percentage": 4.2,
        "_id": "68fd1c0340d28bb3585c95cb"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95cc"
      }
    ],
    "touristAttractions": [
      {
        "name": "Pink Sand Beach",
        "description": "Famous beach",
        "location": "Harbour Island",
        "category": "beach",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c95cd"
      }
    ],
    "capital": "Nassau",
    "currency": "Bahamian Dollar (BSD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical marine",
    "government": "Parliamentary constitutional monarchy",
    "independence": "July 10, 1973",
    "nationalDay": "July 10",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.418Z",
    "updatedAt": "2025-10-25T18:50:43.418Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95ce",
    "name": "Barbados",
    "code": "BB",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/bb.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 13.1939,
        "longitude": -59.5432
      },
      "area": 430,
      "borders": [],
      "coastline": 97
    },
    "population": {
      "total": 287375,
      "density": 668,
      "growthRate": 0.2,
      "urbanPopulation": 31.2
    },
    "gdp": {
      "total": 5000000000,
      "perCapita": 17391,
      "growthRate": 0,
      "sectors": {
        "agriculture": 1.5,
        "industry": 11.9,
        "services": 86.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 75.6,
        "_id": "68fd1c0340d28bb3585c95cf"
      },
      {
        "name": "Other",
        "percentage": 24.4,
        "_id": "68fd1c0340d28bb3585c95d0"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95d1"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Bridgetown",
        "description": "UNESCO World Heritage site",
        "location": "Bridgetown",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95d2"
      }
    ],
    "capital": "Bridgetown",
    "currency": "Barbadian Dollar (BBD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "November 30, 1966",
    "nationalDay": "November 30",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.419Z",
    "updatedAt": "2025-10-25T18:50:43.419Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95d3",
    "name": "Belize",
    "code": "BZ",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/bz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 17.1899,
        "longitude": -88.4976
      },
      "area": 22966,
      "borders": [
        "Guatemala",
        "Mexico"
      ],
      "coastline": 386
    },
    "population": {
      "total": 397628,
      "density": 17,
      "growthRate": 1.9,
      "urbanPopulation": 45.7
    },
    "gdp": {
      "total": 1800000000,
      "perCapita": 4527,
      "growthRate": 0.8,
      "sectors": {
        "agriculture": 10.3,
        "industry": 21.6,
        "services": 68.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 74.3,
        "_id": "68fd1c0340d28bb3585c95d4"
      },
      {
        "name": "Other",
        "percentage": 25.7,
        "_id": "68fd1c0340d28bb3585c95d5"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95d6"
      }
    ],
    "touristAttractions": [
      {
        "name": "Belize Barrier Reef",
        "description": "UNESCO World Heritage site",
        "location": "Caribbean coast",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c95d7"
      }
    ],
    "capital": "Belmopan",
    "currency": "Belize Dollar (BZD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-6"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "September 21, 1981",
    "nationalDay": "September 21",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.420Z",
    "updatedAt": "2025-10-25T18:50:43.420Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95d8",
    "name": "Canada",
    "code": "CA",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/ca.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 56.1304,
        "longitude": -106.3468
      },
      "area": 9984670,
      "borders": [
        "United States"
      ],
      "coastline": 202080
    },
    "population": {
      "total": 37742154,
      "density": 4,
      "growthRate": 0.9,
      "urbanPopulation": 81.4
    },
    "gdp": {
      "total": 1700000000000,
      "perCapita": 45032,
      "growthRate": 1.7,
      "sectors": {
        "agriculture": 1.6,
        "industry": 28.2,
        "services": 70.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 67.3,
        "_id": "68fd1c0340d28bb3585c95d9"
      },
      {
        "name": "Unaffiliated",
        "percentage": 23.9,
        "_id": "68fd1c0340d28bb3585c95da"
      },
      {
        "name": "Other",
        "percentage": 8.8,
        "_id": "68fd1c0340d28bb3585c95db"
      }
    ],
    "traditions": [
      {
        "name": "Canada Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95dc"
      }
    ],
    "touristAttractions": [
      {
        "name": "Banff National Park",
        "description": "UNESCO World Heritage site",
        "location": "Alberta",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c95dd"
      }
    ],
    "capital": "Ottawa",
    "currency": "Canadian Dollar (CAD)",
    "languages": [
      "English",
      "French"
    ],
    "timezone": [
      "UTC-3:30 to UTC-8"
    ],
    "climate": "Varies from temperate in south to subarctic and arctic in north",
    "government": "Federal parliamentary constitutional monarchy",
    "independence": "July 1, 1867",
    "nationalDay": "July 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.420Z",
    "updatedAt": "2025-10-25T18:50:43.420Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95de",
    "name": "Costa Rica",
    "code": "CR",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/cr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 9.7489,
        "longitude": -83.7534
      },
      "area": 51100,
      "borders": [
        "Nicaragua",
        "Panama"
      ],
      "coastline": 1290
    },
    "population": {
      "total": 5094118,
      "density": 100,
      "growthRate": 1,
      "urbanPopulation": 80
    },
    "gdp": {
      "total": 61000000000,
      "perCapita": 11977,
      "growthRate": 2.1,
      "sectors": {
        "agriculture": 5.5,
        "industry": 18.6,
        "services": 75.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 76.3,
        "_id": "68fd1c0340d28bb3585c95df"
      },
      {
        "name": "Unaffiliated",
        "percentage": 13,
        "_id": "68fd1c0340d28bb3585c95e0"
      },
      {
        "name": "Other",
        "percentage": 10.7,
        "_id": "68fd1c0340d28bb3585c95e1"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95e2"
      }
    ],
    "touristAttractions": [
      {
        "name": "Cocos Island National Park",
        "description": "UNESCO World Heritage site",
        "location": "Pacific Ocean",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95e3"
      }
    ],
    "capital": "San José",
    "currency": "Costa Rican Colón (CRC)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-6"
    ],
    "climate": "Tropical and subtropical",
    "government": "Presidential republic",
    "independence": "September 15, 1821",
    "nationalDay": "September 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.421Z",
    "updatedAt": "2025-10-25T18:50:43.421Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95e4",
    "name": "Cuba",
    "code": "CU",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/cu.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 21.5218,
        "longitude": -77.7812
      },
      "area": 110860,
      "borders": [],
      "coastline": 3735
    },
    "population": {
      "total": 11326616,
      "density": 102,
      "growthRate": -0.2,
      "urbanPopulation": 77.1
    },
    "gdp": {
      "total": 100000000000,
      "perCapita": 8827,
      "growthRate": 1,
      "sectors": {
        "agriculture": 4,
        "industry": 22.8,
        "services": 73.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 58.9,
        "_id": "68fd1c0340d28bb3585c95e5"
      },
      {
        "name": "Unaffiliated",
        "percentage": 23,
        "_id": "68fd1c0340d28bb3585c95e6"
      },
      {
        "name": "Other",
        "percentage": 18.1,
        "_id": "68fd1c0340d28bb3585c95e7"
      }
    ],
    "traditions": [
      {
        "name": "Revolution Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95e8"
      }
    ],
    "touristAttractions": [
      {
        "name": "Old Havana",
        "description": "UNESCO World Heritage site",
        "location": "Havana",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c95e9"
      }
    ],
    "capital": "Havana",
    "currency": "Cuban Peso (CUP)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical",
    "government": "Communist state",
    "independence": "May 20, 1902",
    "nationalDay": "January 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.422Z",
    "updatedAt": "2025-10-25T18:50:43.422Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95ea",
    "name": "Dominica",
    "code": "DM",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/dm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.415,
        "longitude": -61.371
      },
      "area": 751,
      "borders": [],
      "coastline": 148
    },
    "population": {
      "total": 71986,
      "density": 96,
      "growthRate": 0.2,
      "urbanPopulation": 70
    },
    "gdp": {
      "total": 500000000,
      "perCapita": 6944,
      "growthRate": 0.5,
      "sectors": {
        "agriculture": 15.7,
        "industry": 15.2,
        "services": 69.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 94.4,
        "_id": "68fd1c0340d28bb3585c95eb"
      },
      {
        "name": "Other",
        "percentage": 5.6,
        "_id": "68fd1c0340d28bb3585c95ec"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95ed"
      }
    ],
    "touristAttractions": [
      {
        "name": "Morne Trois Pitons National Park",
        "description": "UNESCO World Heritage site",
        "location": "Central Dominica",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95ee"
      }
    ],
    "capital": "Roseau",
    "currency": "East Caribbean Dollar (XCD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "November 3, 1978",
    "nationalDay": "November 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.422Z",
    "updatedAt": "2025-10-25T18:50:43.422Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95ef",
    "name": "Dominican Republic",
    "code": "DO",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/do.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 18.7357,
        "longitude": -70.1627
      },
      "area": 48671,
      "borders": [
        "Haiti"
      ],
      "coastline": 1288
    },
    "population": {
      "total": 10847910,
      "density": 223,
      "growthRate": 1,
      "urbanPopulation": 81.8
    },
    "gdp": {
      "total": 89000000000,
      "perCapita": 8204,
      "growthRate": 4.6,
      "sectors": {
        "agriculture": 5.6,
        "industry": 33,
        "services": 61.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 88,
        "_id": "68fd1c0340d28bb3585c95f0"
      },
      {
        "name": "Other",
        "percentage": 12,
        "_id": "68fd1c0340d28bb3585c95f1"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95f2"
      }
    ],
    "touristAttractions": [
      {
        "name": "Colonial City of Santo Domingo",
        "description": "UNESCO World Heritage site",
        "location": "Santo Domingo",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95f3"
      }
    ],
    "capital": "Santo Domingo",
    "currency": "Dominican Peso (DOP)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical maritime",
    "government": "Presidential republic",
    "independence": "February 27, 1844",
    "nationalDay": "February 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.423Z",
    "updatedAt": "2025-10-25T18:50:43.423Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95f4",
    "name": "El Salvador",
    "code": "SV",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/sv.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 13.7942,
        "longitude": -88.8965
      },
      "area": 21041,
      "borders": [
        "Guatemala",
        "Honduras"
      ],
      "coastline": 307
    },
    "population": {
      "total": 6486205,
      "density": 308,
      "growthRate": 0.5,
      "urbanPopulation": 73
    },
    "gdp": {
      "total": 27000000000,
      "perCapita": 4162,
      "growthRate": 2.3,
      "sectors": {
        "agriculture": 10.5,
        "industry": 30,
        "services": 59.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 75,
        "_id": "68fd1c0340d28bb3585c95f5"
      },
      {
        "name": "Unaffiliated",
        "percentage": 25,
        "_id": "68fd1c0340d28bb3585c95f6"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95f7"
      }
    ],
    "touristAttractions": [
      {
        "name": "Joya de Cerén",
        "description": "UNESCO World Heritage archaeological site",
        "location": "La Libertad Department",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95f8"
      }
    ],
    "capital": "San Salvador",
    "currency": "US Dollar (USD)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-6"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "September 15, 1821",
    "nationalDay": "September 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.423Z",
    "updatedAt": "2025-10-25T18:50:43.423Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95f9",
    "name": "Grenada",
    "code": "GD",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/gd.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.2626,
        "longitude": -61.6043
      },
      "area": 344,
      "borders": [],
      "coastline": 121
    },
    "population": {
      "total": 112523,
      "density": 327,
      "growthRate": 0.4,
      "urbanPopulation": 36
    },
    "gdp": {
      "total": 1200000000,
      "perCapita": 10666,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 6.8,
        "industry": 15.8,
        "services": 77.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97.3,
        "_id": "68fd1c0340d28bb3585c95fa"
      },
      {
        "name": "Other",
        "percentage": 2.7,
        "_id": "68fd1c0340d28bb3585c95fb"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c95fc"
      }
    ],
    "touristAttractions": [
      {
        "name": "Grand Etang National Park",
        "description": "Volcanic crater lake",
        "location": "Central Grenada",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c95fd"
      }
    ],
    "capital": "Saint George's",
    "currency": "East Caribbean Dollar (XCD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "February 7, 1974",
    "nationalDay": "February 7",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.424Z",
    "updatedAt": "2025-10-25T18:50:43.424Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c95fe",
    "name": "Guatemala",
    "code": "GT",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/gt.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.7835,
        "longitude": -90.2308
      },
      "area": 108889,
      "borders": [
        "Belize",
        "El Salvador",
        "Honduras",
        "Mexico"
      ],
      "coastline": 400
    },
    "population": {
      "total": 17915568,
      "density": 165,
      "growthRate": 1.7,
      "urbanPopulation": 51.8
    },
    "gdp": {
      "total": 77000000000,
      "perCapita": 4298,
      "growthRate": 2.8,
      "sectors": {
        "agriculture": 13.3,
        "industry": 23.4,
        "services": 63.3
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 88,
        "_id": "68fd1c0340d28bb3585c95ff"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 12,
        "_id": "68fd1c0340d28bb3585c9600"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9601"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tikal National Park",
        "description": "UNESCO World Heritage site",
        "location": "Petén Department",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c9602"
      }
    ],
    "capital": "Guatemala City",
    "currency": "Guatemalan Quetzal (GTQ)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-6"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "September 15, 1821",
    "nationalDay": "September 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.425Z",
    "updatedAt": "2025-10-25T18:50:43.425Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9603",
    "name": "Haiti",
    "code": "HT",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/ht.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 18.9712,
        "longitude": -72.2852
      },
      "area": 27750,
      "borders": [
        "Dominican Republic"
      ],
      "coastline": 1771
    },
    "population": {
      "total": 11402528,
      "density": 411,
      "growthRate": 1.2,
      "urbanPopulation": 57
    },
    "gdp": {
      "total": 20000000000,
      "perCapita": 1754,
      "growthRate": 1.2,
      "sectors": {
        "agriculture": 22.1,
        "industry": 20.3,
        "services": 57.6
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 55,
        "_id": "68fd1c0340d28bb3585c9604"
      },
      {
        "name": "Vodou",
        "percentage": 40,
        "_id": "68fd1c0340d28bb3585c9605"
      },
      {
        "name": "Other",
        "percentage": 5,
        "_id": "68fd1c0340d28bb3585c9606"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9607"
      }
    ],
    "touristAttractions": [
      {
        "name": "Citadelle Laferrière",
        "description": "UNESCO World Heritage fortress",
        "location": "Northern Haiti",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c9608"
      }
    ],
    "capital": "Port-au-Prince",
    "currency": "Haitian Gourde (HTG)",
    "languages": [
      "Haitian Creole",
      "French"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical",
    "government": "Semi-presidential republic",
    "independence": "January 1, 1804",
    "nationalDay": "January 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.425Z",
    "updatedAt": "2025-10-25T18:50:43.425Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9609",
    "name": "Honduras",
    "code": "HN",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/hn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 15.2,
        "longitude": -86.2419
      },
      "area": 112492,
      "borders": [
        "El Salvador",
        "Guatemala",
        "Nicaragua"
      ],
      "coastline": 823
    },
    "population": {
      "total": 9904607,
      "density": 88,
      "growthRate": 1.6,
      "urbanPopulation": 57
    },
    "gdp": {
      "total": 25000000000,
      "perCapita": 2524,
      "growthRate": 2.6,
      "sectors": {
        "agriculture": 14.2,
        "industry": 28.8,
        "services": 57
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97,
        "_id": "68fd1c0340d28bb3585c960a"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1c0340d28bb3585c960b"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c960c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Maya Site of Copán",
        "description": "UNESCO World Heritage site",
        "location": "Copán Department",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c960d"
      }
    ],
    "capital": "Tegucigalpa",
    "currency": "Honduran Lempira (HNL)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-6"
    ],
    "climate": "Subtropical in lowlands",
    "government": "Presidential republic",
    "independence": "September 15, 1821",
    "nationalDay": "September 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.425Z",
    "updatedAt": "2025-10-25T18:50:43.425Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c960e",
    "name": "Jamaica",
    "code": "JM",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/jm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 18.1096,
        "longitude": -77.2975
      },
      "area": 10991,
      "borders": [],
      "coastline": 1022
    },
    "population": {
      "total": 2961167,
      "density": 269,
      "growthRate": 0.4,
      "urbanPopulation": 55
    },
    "gdp": {
      "total": 16000000000,
      "perCapita": 5404,
      "growthRate": 1.4,
      "sectors": {
        "agriculture": 7,
        "industry": 21,
        "services": 72
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 64.8,
        "_id": "68fd1c0340d28bb3585c960f"
      },
      {
        "name": "Other",
        "percentage": 35.2,
        "_id": "68fd1c0340d28bb3585c9610"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9611"
      }
    ],
    "touristAttractions": [
      {
        "name": "Blue and John Crow Mountains",
        "description": "UNESCO World Heritage site",
        "location": "Eastern Jamaica",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c9612"
      }
    ],
    "capital": "Kingston",
    "currency": "Jamaican Dollar (JMD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "August 6, 1962",
    "nationalDay": "August 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.426Z",
    "updatedAt": "2025-10-25T18:50:43.426Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9613",
    "name": "Mexico",
    "code": "MX",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/mx.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 23.6345,
        "longitude": -102.5528
      },
      "area": 1964375,
      "borders": [
        "Belize",
        "Guatemala",
        "United States"
      ],
      "coastline": 9330
    },
    "population": {
      "total": 128932753,
      "density": 66,
      "growthRate": 1.1,
      "urbanPopulation": 80.4
    },
    "gdp": {
      "total": 1300000000000,
      "perCapita": 10079,
      "growthRate": 2,
      "sectors": {
        "agriculture": 3.6,
        "industry": 31.9,
        "services": 64.5
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 82.7,
        "_id": "68fd1c0340d28bb3585c9614"
      },
      {
        "name": "Unaffiliated",
        "percentage": 17.3,
        "_id": "68fd1c0340d28bb3585c9615"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9616"
      }
    ],
    "touristAttractions": [
      {
        "name": "Chichen Itza",
        "description": "UNESCO World Heritage site",
        "location": "Yucatán",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c9617"
      }
    ],
    "capital": "Mexico City",
    "currency": "Mexican Peso (MXN)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-5 to UTC-8"
    ],
    "climate": "Varies from tropical to desert",
    "government": "Federal presidential republic",
    "independence": "September 16, 1810",
    "nationalDay": "September 16",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.426Z",
    "updatedAt": "2025-10-25T18:50:43.426Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9618",
    "name": "Nicaragua",
    "code": "NI",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/ni.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.8654,
        "longitude": -85.2072
      },
      "area": 130373,
      "borders": [
        "Costa Rica",
        "Honduras"
      ],
      "coastline": 910
    },
    "population": {
      "total": 6624554,
      "density": 51,
      "growthRate": 1,
      "urbanPopulation": 58.5
    },
    "gdp": {
      "total": 13000000000,
      "perCapita": 1962,
      "growthRate": 4.9,
      "sectors": {
        "agriculture": 15.5,
        "industry": 24.4,
        "services": 60.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 84.6,
        "_id": "68fd1c0340d28bb3585c9619"
      },
      {
        "name": "Other",
        "percentage": 15.4,
        "_id": "68fd1c0340d28bb3585c961a"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c961b"
      }
    ],
    "touristAttractions": [
      {
        "name": "León Cathedral",
        "description": "UNESCO World Heritage site",
        "location": "León",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c961c"
      }
    ],
    "capital": "Managua",
    "currency": "Nicaraguan Córdoba (NIO)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-6"
    ],
    "climate": "Tropical in lowlands",
    "government": "Presidential republic",
    "independence": "September 15, 1821",
    "nationalDay": "September 15",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.426Z",
    "updatedAt": "2025-10-25T18:50:43.426Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c961d",
    "name": "Panama",
    "code": "PA",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/pa.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 8.538,
        "longitude": -80.7821
      },
      "area": 75417,
      "borders": [
        "Colombia",
        "Costa Rica"
      ],
      "coastline": 2490
    },
    "population": {
      "total": 4314767,
      "density": 57,
      "growthRate": 1.2,
      "urbanPopulation": 68
    },
    "gdp": {
      "total": 66000000000,
      "perCapita": 15295,
      "growthRate": 4,
      "sectors": {
        "agriculture": 2.4,
        "industry": 15.7,
        "services": 81.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 85,
        "_id": "68fd1c0340d28bb3585c961e"
      },
      {
        "name": "Other",
        "percentage": 15,
        "_id": "68fd1c0340d28bb3585c961f"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9620"
      }
    ],
    "touristAttractions": [
      {
        "name": "Panama Canal",
        "description": "Engineering marvel",
        "location": "Central Panama",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c9621"
      }
    ],
    "capital": "Panama City",
    "currency": "Panamanian Balboa (PAB)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical maritime",
    "government": "Presidential republic",
    "independence": "November 3, 1903",
    "nationalDay": "November 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.427Z",
    "updatedAt": "2025-10-25T18:50:43.427Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9622",
    "name": "Saint Kitts and Nevis",
    "code": "KN",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/kn.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 17.3578,
        "longitude": -62.783
      },
      "area": 261,
      "borders": [],
      "coastline": 135
    },
    "population": {
      "total": 53199,
      "density": 204,
      "growthRate": 0.6,
      "urbanPopulation": 30.8
    },
    "gdp": {
      "total": 1000000000,
      "perCapita": 18797,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 1.8,
        "industry": 23.1,
        "services": 75.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 82.4,
        "_id": "68fd1c0340d28bb3585c9623"
      },
      {
        "name": "Other",
        "percentage": 17.6,
        "_id": "68fd1c0340d28bb3585c9624"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9625"
      }
    ],
    "touristAttractions": [
      {
        "name": "Brimstone Hill Fortress",
        "description": "UNESCO World Heritage site",
        "location": "Saint Kitts",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c9626"
      }
    ],
    "capital": "Basseterre",
    "currency": "East Caribbean Dollar (XCD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "September 19, 1983",
    "nationalDay": "September 19",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.427Z",
    "updatedAt": "2025-10-25T18:50:43.427Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9627",
    "name": "Saint Lucia",
    "code": "LC",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/lc.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 13.9094,
        "longitude": -60.9789
      },
      "area": 616,
      "borders": [],
      "coastline": 158
    },
    "population": {
      "total": 183627,
      "density": 298,
      "growthRate": 0.3,
      "urbanPopulation": 18.9
    },
    "gdp": {
      "total": 2000000000,
      "perCapita": 10890,
      "growthRate": 1,
      "sectors": {
        "agriculture": 2.9,
        "industry": 14.2,
        "services": 82.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1c0340d28bb3585c9628"
      },
      {
        "name": "Other",
        "percentage": 10,
        "_id": "68fd1c0340d28bb3585c9629"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c962a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Pitons",
        "description": "UNESCO World Heritage volcanic peaks",
        "location": "Southwestern Saint Lucia",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c962b"
      }
    ],
    "capital": "Castries",
    "currency": "East Caribbean Dollar (XCD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "February 22, 1979",
    "nationalDay": "February 22",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.427Z",
    "updatedAt": "2025-10-25T18:50:43.427Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c962c",
    "name": "Saint Vincent and the Grenadines",
    "code": "VC",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/vc.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 12.9843,
        "longitude": -61.2872
      },
      "area": 389,
      "borders": [],
      "coastline": 84
    },
    "population": {
      "total": 110940,
      "density": 285,
      "growthRate": 0.3,
      "urbanPopulation": 53
    },
    "gdp": {
      "total": 800000000,
      "perCapita": 7211,
      "growthRate": 1,
      "sectors": {
        "agriculture": 5.2,
        "industry": 18.1,
        "services": 76.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 88.7,
        "_id": "68fd1c0340d28bb3585c962d"
      },
      {
        "name": "Other",
        "percentage": 11.3,
        "_id": "68fd1c0340d28bb3585c962e"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c962f"
      }
    ],
    "touristAttractions": [
      {
        "name": "La Soufrière",
        "description": "Active volcano",
        "location": "Northern Saint Vincent",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c9630"
      }
    ],
    "capital": "Kingstown",
    "currency": "East Caribbean Dollar (XCD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "October 27, 1979",
    "nationalDay": "October 27",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.428Z",
    "updatedAt": "2025-10-25T18:50:43.428Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9631",
    "name": "Trinidad and Tobago",
    "code": "TT",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/tt.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 10.6918,
        "longitude": -61.2225
      },
      "area": 5130,
      "borders": [],
      "coastline": 362
    },
    "population": {
      "total": 1399488,
      "density": 273,
      "growthRate": 0.3,
      "urbanPopulation": 53.2
    },
    "gdp": {
      "total": 24000000000,
      "perCapita": 17150,
      "growthRate": -0.2,
      "sectors": {
        "agriculture": 0.4,
        "industry": 47.8,
        "services": 51.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 32.1,
        "_id": "68fd1c0340d28bb3585c9632"
      },
      {
        "name": "Hinduism",
        "percentage": 18.2,
        "_id": "68fd1c0340d28bb3585c9633"
      },
      {
        "name": "Islam",
        "percentage": 5,
        "_id": "68fd1c0340d28bb3585c9634"
      },
      {
        "name": "Other",
        "percentage": 44.7,
        "_id": "68fd1c0340d28bb3585c9635"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c9636"
      }
    ],
    "touristAttractions": [
      {
        "name": "Trinidad and Tobago",
        "description": "Caribbean islands",
        "location": "Caribbean Sea",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c0340d28bb3585c9637"
      }
    ],
    "capital": "Port of Spain",
    "currency": "Trinidad and Tobago Dollar (TTD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "August 31, 1962",
    "nationalDay": "August 31",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.428Z",
    "updatedAt": "2025-10-25T18:50:43.428Z"
  },
  {
    "_id": "68fd1c0340d28bb3585c9638",
    "name": "United States",
    "code": "US",
    "continent": "North America",
    "flag": "https://flagcdn.com/w320/us.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 39.8283,
        "longitude": -98.5795
      },
      "area": 9833517,
      "borders": [
        "Canada",
        "Mexico"
      ],
      "coastline": 19924
    },
    "population": {
      "total": 331002651,
      "density": 34,
      "growthRate": 0.6,
      "urbanPopulation": 82.7
    },
    "gdp": {
      "total": 21000000000000,
      "perCapita": 63416,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 0.9,
        "industry": 18.9,
        "services": 80.2
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 65,
        "_id": "68fd1c0340d28bb3585c9639"
      },
      {
        "name": "Unaffiliated",
        "percentage": 26,
        "_id": "68fd1c0340d28bb3585c963a"
      },
      {
        "name": "Other",
        "percentage": 9,
        "_id": "68fd1c0340d28bb3585c963b"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c0340d28bb3585c963c"
      }
    ],
    "touristAttractions": [
      {
        "name": "Grand Canyon",
        "description": "UNESCO World Heritage site",
        "location": "Arizona",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c0340d28bb3585c963d"
      }
    ],
    "capital": "Washington, D.C.",
    "currency": "US Dollar (USD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-5 to UTC-10"
    ],
    "climate": "Mostly temperate",
    "government": "Federal presidential constitutional republic",
    "independence": "July 4, 1776",
    "nationalDay": "July 4",
    "__v": 0,
    "createdAt": "2025-10-25T18:50:43.428Z",
    "updatedAt": "2025-10-25T18:50:43.428Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5bf7",
    "name": "Argentina",
    "code": "AR",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/ar.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -38.4161,
        "longitude": -63.6167
      },
      "area": 2780400,
      "borders": [
        "Bolivia",
        "Brazil",
        "Chile",
        "Paraguay",
        "Uruguay"
      ],
      "coastline": 4989
    },
    "population": {
      "total": 45195774,
      "density": 16,
      "growthRate": 0.9,
      "urbanPopulation": 92
    },
    "gdp": {
      "total": 450000000000,
      "perCapita": 9958,
      "growthRate": -2,
      "sectors": {
        "agriculture": 6,
        "industry": 24.1,
        "services": 69.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 85,
        "_id": "68fd1c70a669a65c2fdd5bf8"
      },
      {
        "name": "Unaffiliated",
        "percentage": 15,
        "_id": "68fd1c70a669a65c2fdd5bf9"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5bfa"
      }
    ],
    "touristAttractions": [
      {
        "name": "Iguazu Falls",
        "description": "UNESCO World Heritage waterfall",
        "location": "Misiones Province",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5bfb"
      }
    ],
    "capital": "Buenos Aires",
    "currency": "Argentine Peso (ARS)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-3"
    ],
    "climate": "Mostly temperate",
    "government": "Federal presidential republic",
    "independence": "July 9, 1816",
    "nationalDay": "May 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.937Z",
    "updatedAt": "2025-10-25T18:52:32.937Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5bfc",
    "name": "Bolivia",
    "code": "BO",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/bo.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -16.2902,
        "longitude": -63.5887
      },
      "area": 1098581,
      "borders": [
        "Argentina",
        "Brazil",
        "Chile",
        "Paraguay",
        "Peru"
      ],
      "coastline": 0
    },
    "population": {
      "total": 11673021,
      "density": 11,
      "growthRate": 1.4,
      "urbanPopulation": 69.4
    },
    "gdp": {
      "total": 40000000000,
      "perCapita": 3426,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 13.8,
        "industry": 37.8,
        "services": 48.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 95,
        "_id": "68fd1c70a669a65c2fdd5bfd"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 5,
        "_id": "68fd1c70a669a65c2fdd5bfe"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5bff"
      }
    ],
    "touristAttractions": [
      {
        "name": "Salar de Uyuni",
        "description": "World's largest salt flat",
        "location": "Southwestern Bolivia",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c00"
      }
    ],
    "capital": "Sucre",
    "currency": "Bolivian Boliviano (BOB)",
    "languages": [
      "Spanish",
      "Quechua",
      "Aymara"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Varies with altitude",
    "government": "Presidential republic",
    "independence": "August 6, 1825",
    "nationalDay": "August 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.938Z",
    "updatedAt": "2025-10-25T18:52:32.938Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c01",
    "name": "Brazil",
    "code": "BR",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/br.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -14.235,
        "longitude": -51.9253
      },
      "area": 8514877,
      "borders": [
        "Argentina",
        "Bolivia",
        "Colombia",
        "French Guiana",
        "Guyana",
        "Paraguay",
        "Peru",
        "Suriname",
        "Uruguay",
        "Venezuela"
      ],
      "coastline": 7491
    },
    "population": {
      "total": 212559417,
      "density": 25,
      "growthRate": 0.7,
      "urbanPopulation": 87
    },
    "gdp": {
      "total": 1600000000000,
      "perCapita": 7527,
      "growthRate": 1.1,
      "sectors": {
        "agriculture": 6.6,
        "industry": 20.7,
        "services": 72.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 86.8,
        "_id": "68fd1c70a669a65c2fdd5c02"
      },
      {
        "name": "Unaffiliated",
        "percentage": 8,
        "_id": "68fd1c70a669a65c2fdd5c03"
      },
      {
        "name": "Other",
        "percentage": 5.2,
        "_id": "68fd1c70a669a65c2fdd5c04"
      }
    ],
    "traditions": [
      {
        "name": "Carnival",
        "description": "Pre-Lenten celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c05"
      }
    ],
    "touristAttractions": [
      {
        "name": "Christ the Redeemer",
        "description": "UNESCO World Heritage statue",
        "location": "Rio de Janeiro",
        "category": "religious",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c06"
      }
    ],
    "capital": "Brasília",
    "currency": "Brazilian Real (BRL)",
    "languages": [
      "Portuguese"
    ],
    "timezone": [
      "UTC-2 to UTC-5"
    ],
    "climate": "Mostly tropical",
    "government": "Federal presidential republic",
    "independence": "September 7, 1822",
    "nationalDay": "September 7",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.939Z",
    "updatedAt": "2025-10-25T18:52:32.939Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c07",
    "name": "Chile",
    "code": "CL",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/cl.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -35.6751,
        "longitude": -71.543
      },
      "area": 756102,
      "borders": [
        "Argentina",
        "Bolivia",
        "Peru"
      ],
      "coastline": 6435
    },
    "population": {
      "total": 19116201,
      "density": 25,
      "growthRate": 0.8,
      "urbanPopulation": 87.7
    },
    "gdp": {
      "total": 280000000000,
      "perCapita": 14658,
      "growthRate": 1,
      "sectors": {
        "agriculture": 4.2,
        "industry": 32.8,
        "services": 63
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 66.7,
        "_id": "68fd1c70a669a65c2fdd5c08"
      },
      {
        "name": "Unaffiliated",
        "percentage": 33.3,
        "_id": "68fd1c70a669a65c2fdd5c09"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c0a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Easter Island",
        "description": "UNESCO World Heritage site",
        "location": "Pacific Ocean",
        "category": "cultural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c0b"
      }
    ],
    "capital": "Santiago",
    "currency": "Chilean Peso (CLP)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-3"
    ],
    "climate": "Temperate",
    "government": "Presidential republic",
    "independence": "September 18, 1810",
    "nationalDay": "September 18",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.940Z",
    "updatedAt": "2025-10-25T18:52:32.940Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c0c",
    "name": "Colombia",
    "code": "CO",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/co.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 4.5709,
        "longitude": -74.2973
      },
      "area": 1141748,
      "borders": [
        "Brazil",
        "Ecuador",
        "Panama",
        "Peru",
        "Venezuela"
      ],
      "coastline": 3208
    },
    "population": {
      "total": 50882891,
      "density": 45,
      "growthRate": 1,
      "urbanPopulation": 80.4
    },
    "gdp": {
      "total": 320000000000,
      "perCapita": 6288,
      "growthRate": 3.3,
      "sectors": {
        "agriculture": 6.6,
        "industry": 30.6,
        "services": 62.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 90,
        "_id": "68fd1c70a669a65c2fdd5c0d"
      },
      {
        "name": "Other",
        "percentage": 10,
        "_id": "68fd1c70a669a65c2fdd5c0e"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c0f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Cartagena",
        "description": "UNESCO World Heritage city",
        "location": "Caribbean coast",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c10"
      }
    ],
    "capital": "Bogotá",
    "currency": "Colombian Peso (COP)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical along coast",
    "government": "Presidential republic",
    "independence": "July 20, 1810",
    "nationalDay": "July 20",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.940Z",
    "updatedAt": "2025-10-25T18:52:32.940Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c11",
    "name": "Ecuador",
    "code": "EC",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/ec.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -1.8312,
        "longitude": -78.1834
      },
      "area": 283561,
      "borders": [
        "Colombia",
        "Peru"
      ],
      "coastline": 2237
    },
    "population": {
      "total": 17643054,
      "density": 62,
      "growthRate": 1.2,
      "urbanPopulation": 64
    },
    "gdp": {
      "total": 110000000000,
      "perCapita": 6234,
      "growthRate": 0.1,
      "sectors": {
        "agriculture": 6.7,
        "industry": 32.9,
        "services": 60.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 94,
        "_id": "68fd1c70a669a65c2fdd5c12"
      },
      {
        "name": "Other",
        "percentage": 6,
        "_id": "68fd1c70a669a65c2fdd5c13"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c14"
      }
    ],
    "touristAttractions": [
      {
        "name": "Galápagos Islands",
        "description": "UNESCO World Heritage site",
        "location": "Pacific Ocean",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c15"
      }
    ],
    "capital": "Quito",
    "currency": "US Dollar (USD)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Tropical along coast",
    "government": "Presidential republic",
    "independence": "May 24, 1822",
    "nationalDay": "May 24",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.941Z",
    "updatedAt": "2025-10-25T18:52:32.941Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c16",
    "name": "Guyana",
    "code": "GY",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/gy.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 4.8604,
        "longitude": -58.9302
      },
      "area": 214969,
      "borders": [
        "Brazil",
        "Suriname",
        "Venezuela"
      ],
      "coastline": 459
    },
    "population": {
      "total": 786552,
      "density": 4,
      "growthRate": 0.5,
      "urbanPopulation": 26.9
    },
    "gdp": {
      "total": 5000000000,
      "perCapita": 6354,
      "growthRate": 3.4,
      "sectors": {
        "agriculture": 20.3,
        "industry": 33.9,
        "services": 45.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 57.4,
        "_id": "68fd1c70a669a65c2fdd5c17"
      },
      {
        "name": "Hinduism",
        "percentage": 28.4,
        "_id": "68fd1c70a669a65c2fdd5c18"
      },
      {
        "name": "Islam",
        "percentage": 7.2,
        "_id": "68fd1c70a669a65c2fdd5c19"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c1a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kaieteur Falls",
        "description": "Spectacular waterfall",
        "location": "Central Guyana",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c1b"
      }
    ],
    "capital": "Georgetown",
    "currency": "Guyanese Dollar (GYD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "May 26, 1966",
    "nationalDay": "May 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.942Z",
    "updatedAt": "2025-10-25T18:52:32.942Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c1c",
    "name": "Paraguay",
    "code": "PY",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/py.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -23.4425,
        "longitude": -58.4438
      },
      "area": 406752,
      "borders": [
        "Argentina",
        "Bolivia",
        "Brazil"
      ],
      "coastline": 0
    },
    "population": {
      "total": 7132538,
      "density": 18,
      "growthRate": 1.2,
      "urbanPopulation": 61.9
    },
    "gdp": {
      "total": 40000000000,
      "perCapita": 5608,
      "growthRate": 4,
      "sectors": {
        "agriculture": 17.9,
        "industry": 27.7,
        "services": 54.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 96.9,
        "_id": "68fd1c70a669a65c2fdd5c1d"
      },
      {
        "name": "Other",
        "percentage": 3.1,
        "_id": "68fd1c70a669a65c2fdd5c1e"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c1f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Jesuit Missions of La Santísima Trinidad de Paraná",
        "description": "UNESCO World Heritage site",
        "location": "Itapúa Department",
        "category": "religious",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c20"
      }
    ],
    "capital": "Asunción",
    "currency": "Paraguayan Guarani (PYG)",
    "languages": [
      "Spanish",
      "Guaraní"
    ],
    "timezone": [
      "UTC-3"
    ],
    "climate": "Subtropical to temperate",
    "government": "Presidential republic",
    "independence": "May 14, 1811",
    "nationalDay": "May 14",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.942Z",
    "updatedAt": "2025-10-25T18:52:32.942Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c21",
    "name": "Peru",
    "code": "PE",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/pe.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -9.19,
        "longitude": -75.0152
      },
      "area": 1285216,
      "borders": [
        "Bolivia",
        "Brazil",
        "Chile",
        "Colombia",
        "Ecuador"
      ],
      "coastline": 2414
    },
    "population": {
      "total": 32971854,
      "density": 26,
      "growthRate": 1,
      "urbanPopulation": 78.3
    },
    "gdp": {
      "total": 230000000000,
      "perCapita": 6977,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 7.6,
        "industry": 32.7,
        "services": 59.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 81.3,
        "_id": "68fd1c70a669a65c2fdd5c22"
      },
      {
        "name": "Other",
        "percentage": 18.7,
        "_id": "68fd1c70a669a65c2fdd5c23"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c24"
      }
    ],
    "touristAttractions": [
      {
        "name": "Machu Picchu",
        "description": "UNESCO World Heritage site",
        "location": "Cusco Region",
        "category": "historical",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c25"
      }
    ],
    "capital": "Lima",
    "currency": "Peruvian Sol (PEN)",
    "languages": [
      "Spanish",
      "Quechua"
    ],
    "timezone": [
      "UTC-5"
    ],
    "climate": "Varies from tropical in east",
    "government": "Presidential republic",
    "independence": "July 28, 1821",
    "nationalDay": "July 28",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.943Z",
    "updatedAt": "2025-10-25T18:52:32.943Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c26",
    "name": "Suriname",
    "code": "SR",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/sr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 3.9193,
        "longitude": -56.0278
      },
      "area": 163820,
      "borders": [
        "Brazil",
        "French Guiana",
        "Guyana"
      ],
      "coastline": 386
    },
    "population": {
      "total": 586632,
      "density": 4,
      "growthRate": 0.9,
      "urbanPopulation": 65.2
    },
    "gdp": {
      "total": 4000000000,
      "perCapita": 6818,
      "growthRate": 2,
      "sectors": {
        "agriculture": 9,
        "industry": 31,
        "services": 60
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 48.4,
        "_id": "68fd1c70a669a65c2fdd5c27"
      },
      {
        "name": "Hinduism",
        "percentage": 22.3,
        "_id": "68fd1c70a669a65c2fdd5c28"
      },
      {
        "name": "Islam",
        "percentage": 13.9,
        "_id": "68fd1c70a669a65c2fdd5c29"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c2a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Central Suriname Nature Reserve",
        "description": "UNESCO World Heritage site",
        "location": "Central Suriname",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c2b"
      }
    ],
    "capital": "Paramaribo",
    "currency": "Surinamese Dollar (SRD)",
    "languages": [
      "Dutch"
    ],
    "timezone": [
      "UTC-3"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "November 25, 1975",
    "nationalDay": "November 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.943Z",
    "updatedAt": "2025-10-25T18:52:32.943Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c2c",
    "name": "Uruguay",
    "code": "UY",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/uy.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -32.5228,
        "longitude": -55.7658
      },
      "area": 176215,
      "borders": [
        "Argentina",
        "Brazil"
      ],
      "coastline": 660
    },
    "population": {
      "total": 3473730,
      "density": 20,
      "growthRate": 0.3,
      "urbanPopulation": 95.5
    },
    "gdp": {
      "total": 56000000000,
      "perCapita": 16118,
      "growthRate": 0.4,
      "sectors": {
        "agriculture": 6.2,
        "industry": 24.1,
        "services": 69.7
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 58,
        "_id": "68fd1c70a669a65c2fdd5c2d"
      },
      {
        "name": "Unaffiliated",
        "percentage": 42,
        "_id": "68fd1c70a669a65c2fdd5c2e"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c2f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Historic Quarter of the City of Colonia del Sacramento",
        "description": "UNESCO World Heritage site",
        "location": "Colonia Department",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c30"
      }
    ],
    "capital": "Montevideo",
    "currency": "Uruguayan Peso (UYU)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-3"
    ],
    "climate": "Warm temperate",
    "government": "Presidential republic",
    "independence": "August 25, 1825",
    "nationalDay": "August 25",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.944Z",
    "updatedAt": "2025-10-25T18:52:32.944Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c31",
    "name": "Venezuela",
    "code": "VE",
    "continent": "South America",
    "flag": "https://flagcdn.com/w320/ve.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 6.4238,
        "longitude": -66.5897
      },
      "area": 916445,
      "borders": [
        "Brazil",
        "Colombia",
        "Guyana"
      ],
      "coastline": 2800
    },
    "population": {
      "total": 28435940,
      "density": 31,
      "growthRate": 1.3,
      "urbanPopulation": 88
    },
    "gdp": {
      "total": 100000000000,
      "perCapita": 3517,
      "growthRate": -25,
      "sectors": {
        "agriculture": 4.7,
        "industry": 40.4,
        "services": 54.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 96,
        "_id": "68fd1c70a669a65c2fdd5c32"
      },
      {
        "name": "Other",
        "percentage": 4,
        "_id": "68fd1c70a669a65c2fdd5c33"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c34"
      }
    ],
    "touristAttractions": [
      {
        "name": "Canaima National Park",
        "description": "UNESCO World Heritage site",
        "location": "Bolívar State",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c35"
      }
    ],
    "capital": "Caracas",
    "currency": "Venezuelan Bolívar (VES)",
    "languages": [
      "Spanish"
    ],
    "timezone": [
      "UTC-4"
    ],
    "climate": "Tropical",
    "government": "Federal presidential republic",
    "independence": "July 5, 1811",
    "nationalDay": "July 5",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.946Z",
    "updatedAt": "2025-10-25T18:52:32.946Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c36",
    "name": "Australia",
    "code": "AU",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/au.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -25.2744,
        "longitude": 133.7751
      },
      "area": 7692024,
      "borders": [],
      "coastline": 25760
    },
    "population": {
      "total": 25499884,
      "density": 3,
      "growthRate": 1.2,
      "urbanPopulation": 86.2
    },
    "gdp": {
      "total": 1500000000000,
      "perCapita": 58825,
      "growthRate": 1.9,
      "sectors": {
        "agriculture": 3.6,
        "industry": 25.1,
        "services": 71.3
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 52.1,
        "_id": "68fd1c70a669a65c2fdd5c37"
      },
      {
        "name": "Unaffiliated",
        "percentage": 30.1,
        "_id": "68fd1c70a669a65c2fdd5c38"
      },
      {
        "name": "Other",
        "percentage": 17.8,
        "_id": "68fd1c70a669a65c2fdd5c39"
      }
    ],
    "traditions": [
      {
        "name": "Australia Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c3a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Great Barrier Reef",
        "description": "UNESCO World Heritage site",
        "location": "Queensland",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c3b"
      }
    ],
    "capital": "Canberra",
    "currency": "Australian Dollar (AUD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+8 to UTC+10"
    ],
    "climate": "Generally arid to semiarid",
    "government": "Federal parliamentary constitutional monarchy",
    "independence": "January 1, 1901",
    "nationalDay": "January 26",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.947Z",
    "updatedAt": "2025-10-25T18:52:32.947Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c3c",
    "name": "Fiji",
    "code": "FJ",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/fj.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -16.578,
        "longitude": 179.4144
      },
      "area": 18272,
      "borders": [],
      "coastline": 1129
    },
    "population": {
      "total": 896445,
      "density": 49,
      "growthRate": 0.6,
      "urbanPopulation": 56.2
    },
    "gdp": {
      "total": 5000000000,
      "perCapita": 5578,
      "growthRate": 3,
      "sectors": {
        "agriculture": 13.5,
        "industry": 17.4,
        "services": 69.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 64.4,
        "_id": "68fd1c70a669a65c2fdd5c3d"
      },
      {
        "name": "Hinduism",
        "percentage": 27.9,
        "_id": "68fd1c70a669a65c2fdd5c3e"
      },
      {
        "name": "Islam",
        "percentage": 6.3,
        "_id": "68fd1c70a669a65c2fdd5c3f"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c40"
      }
    ],
    "touristAttractions": [
      {
        "name": "Levuka",
        "description": "UNESCO World Heritage town",
        "location": "Ovalau Island",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c41"
      }
    ],
    "capital": "Suva",
    "currency": "Fijian Dollar (FJD)",
    "languages": [
      "English",
      "Fijian",
      "Hindi"
    ],
    "timezone": [
      "UTC+12"
    ],
    "climate": "Tropical marine",
    "government": "Parliamentary republic",
    "independence": "October 10, 1970",
    "nationalDay": "October 10",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.947Z",
    "updatedAt": "2025-10-25T18:52:32.947Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c42",
    "name": "Kiribati",
    "code": "KI",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/ki.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -3.3704,
        "longitude": -168.734
      },
      "area": 811,
      "borders": [],
      "coastline": 1143
    },
    "population": {
      "total": 119449,
      "density": 147,
      "growthRate": 1.6,
      "urbanPopulation": 54
    },
    "gdp": {
      "total": 200000000,
      "perCapita": 1675,
      "growthRate": 3,
      "sectors": {
        "agriculture": 23,
        "industry": 7,
        "services": 70
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 96,
        "_id": "68fd1c70a669a65c2fdd5c43"
      },
      {
        "name": "Other",
        "percentage": 4,
        "_id": "68fd1c70a669a65c2fdd5c44"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c45"
      }
    ],
    "touristAttractions": [
      {
        "name": "Phoenix Islands Protected Area",
        "description": "UNESCO World Heritage site",
        "location": "Phoenix Islands",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c46"
      }
    ],
    "capital": "Tarawa",
    "currency": "Australian Dollar (AUD)",
    "languages": [
      "English",
      "Gilbertese"
    ],
    "timezone": [
      "UTC+12 to UTC+14"
    ],
    "climate": "Tropical marine",
    "government": "Presidential republic",
    "independence": "July 12, 1979",
    "nationalDay": "July 12",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.948Z",
    "updatedAt": "2025-10-25T18:52:32.948Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c47",
    "name": "Marshall Islands",
    "code": "MH",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/mh.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.1315,
        "longitude": 171.1845
      },
      "area": 181,
      "borders": [],
      "coastline": 370
    },
    "population": {
      "total": 59190,
      "density": 327,
      "growthRate": 1.5,
      "urbanPopulation": 77.8
    },
    "gdp": {
      "total": 200000000,
      "perCapita": 3379,
      "growthRate": 2,
      "sectors": {
        "agriculture": 4.4,
        "industry": 9.7,
        "services": 85.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97,
        "_id": "68fd1c70a669a65c2fdd5c48"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1c70a669a65c2fdd5c49"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c4a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Bikini Atoll",
        "description": "UNESCO World Heritage nuclear test site",
        "location": "Bikini Atoll",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c4b"
      }
    ],
    "capital": "Majuro",
    "currency": "US Dollar (USD)",
    "languages": [
      "English",
      "Marshallese"
    ],
    "timezone": [
      "UTC+12"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "October 21, 1986",
    "nationalDay": "October 21",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.949Z",
    "updatedAt": "2025-10-25T18:52:32.949Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c4c",
    "name": "Micronesia",
    "code": "FM",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/fm.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.4256,
        "longitude": 150.5508
      },
      "area": 702,
      "borders": [],
      "coastline": 6112
    },
    "population": {
      "total": 548914,
      "density": 782,
      "growthRate": 0.9,
      "urbanPopulation": 22.9
    },
    "gdp": {
      "total": 400000000,
      "perCapita": 729,
      "growthRate": 2,
      "sectors": {
        "agriculture": 26.3,
        "industry": 18.9,
        "services": 54.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 95.3,
        "_id": "68fd1c70a669a65c2fdd5c4d"
      },
      {
        "name": "Other",
        "percentage": 4.7,
        "_id": "68fd1c70a669a65c2fdd5c4e"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c4f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Nan Madol",
        "description": "UNESCO World Heritage archaeological site",
        "location": "Pohnpei",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c50"
      }
    ],
    "capital": "Palikir",
    "currency": "US Dollar (USD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+10 to UTC+11"
    ],
    "climate": "Tropical",
    "government": "Federal republic",
    "independence": "November 3, 1986",
    "nationalDay": "November 3",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.950Z",
    "updatedAt": "2025-10-25T18:52:32.950Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c51",
    "name": "Nauru",
    "code": "NR",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/nr.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -0.5228,
        "longitude": 166.9315
      },
      "area": 21,
      "borders": [],
      "coastline": 30
    },
    "population": {
      "total": 10824,
      "density": 515,
      "growthRate": 0.5,
      "urbanPopulation": 100
    },
    "gdp": {
      "total": 100000000,
      "perCapita": 9238,
      "growthRate": 4,
      "sectors": {
        "agriculture": 6.1,
        "industry": 33,
        "services": 60.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 60,
        "_id": "68fd1c70a669a65c2fdd5c52"
      },
      {
        "name": "Other",
        "percentage": 40,
        "_id": "68fd1c70a669a65c2fdd5c53"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c54"
      }
    ],
    "touristAttractions": [
      {
        "name": "Nauru",
        "description": "Smallest island nation",
        "location": "Pacific Ocean",
        "category": "natural",
        "rating": 3,
        "_id": "68fd1c70a669a65c2fdd5c55"
      }
    ],
    "capital": "Yaren",
    "currency": "Australian Dollar (AUD)",
    "languages": [
      "English",
      "Nauruan"
    ],
    "timezone": [
      "UTC+12"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "January 31, 1968",
    "nationalDay": "January 31",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.951Z",
    "updatedAt": "2025-10-25T18:52:32.951Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c56",
    "name": "New Zealand",
    "code": "NZ",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/nz.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -40.9006,
        "longitude": 174.886
      },
      "area": 268838,
      "borders": [],
      "coastline": 15134
    },
    "population": {
      "total": 4822233,
      "density": 18,
      "growthRate": 1,
      "urbanPopulation": 86.5
    },
    "gdp": {
      "total": 210000000000,
      "perCapita": 43558,
      "growthRate": 2.2,
      "sectors": {
        "agriculture": 5.7,
        "industry": 20.2,
        "services": 74.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 37.3,
        "_id": "68fd1c70a669a65c2fdd5c57"
      },
      {
        "name": "Unaffiliated",
        "percentage": 48.6,
        "_id": "68fd1c70a669a65c2fdd5c58"
      },
      {
        "name": "Other",
        "percentage": 14.1,
        "_id": "68fd1c70a669a65c2fdd5c59"
      }
    ],
    "traditions": [
      {
        "name": "Waitangi Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c5a"
      }
    ],
    "touristAttractions": [
      {
        "name": "Te Wahipounamu",
        "description": "UNESCO World Heritage site",
        "location": "South Island",
        "category": "natural",
        "rating": 5,
        "_id": "68fd1c70a669a65c2fdd5c5b"
      }
    ],
    "capital": "Wellington",
    "currency": "New Zealand Dollar (NZD)",
    "languages": [
      "English",
      "Māori"
    ],
    "timezone": [
      "UTC+12"
    ],
    "climate": "Temperate",
    "government": "Parliamentary constitutional monarchy",
    "independence": "September 26, 1907",
    "nationalDay": "February 6",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.951Z",
    "updatedAt": "2025-10-25T18:52:32.951Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c5c",
    "name": "Palau",
    "code": "PW",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/pw.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": 7.515,
        "longitude": 134.5825
      },
      "area": 459,
      "borders": [],
      "coastline": 1519
    },
    "population": {
      "total": 18094,
      "density": 39,
      "growthRate": 0.4,
      "urbanPopulation": 81
    },
    "gdp": {
      "total": 300000000,
      "perCapita": 16580,
      "growthRate": 2,
      "sectors": {
        "agriculture": 3.2,
        "industry": 20,
        "services": 76.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 77.9,
        "_id": "68fd1c70a669a65c2fdd5c5d"
      },
      {
        "name": "Other",
        "percentage": 22.1,
        "_id": "68fd1c70a669a65c2fdd5c5e"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c5f"
      }
    ],
    "touristAttractions": [
      {
        "name": "Rock Islands Southern Lagoon",
        "description": "UNESCO World Heritage site",
        "location": "Koror State",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c60"
      }
    ],
    "capital": "Ngerulmud",
    "currency": "US Dollar (USD)",
    "languages": [
      "English",
      "Palauan"
    ],
    "timezone": [
      "UTC+9"
    ],
    "climate": "Tropical",
    "government": "Presidential republic",
    "independence": "October 1, 1994",
    "nationalDay": "October 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.952Z",
    "updatedAt": "2025-10-25T18:52:32.952Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c61",
    "name": "Papua New Guinea",
    "code": "PG",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/pg.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -6.315,
        "longitude": 143.9555
      },
      "area": 462840,
      "borders": [
        "Indonesia"
      ],
      "coastline": 5152
    },
    "population": {
      "total": 8947024,
      "density": 19,
      "growthRate": 1.8,
      "urbanPopulation": 13.2
    },
    "gdp": {
      "total": 25000000000,
      "perCapita": 2794,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 22.1,
        "industry": 42.9,
        "services": 35
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 95.4,
        "_id": "68fd1c70a669a65c2fdd5c62"
      },
      {
        "name": "Indigenous beliefs",
        "percentage": 4.6,
        "_id": "68fd1c70a669a65c2fdd5c63"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c64"
      }
    ],
    "touristAttractions": [
      {
        "name": "Kuk Early Agricultural Site",
        "description": "UNESCO World Heritage site",
        "location": "Western Highlands",
        "category": "historical",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c65"
      }
    ],
    "capital": "Port Moresby",
    "currency": "Papua New Guinean Kina (PGK)",
    "languages": [
      "English",
      "Tok Pisin",
      "Hiri Motu"
    ],
    "timezone": [
      "UTC+10"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "September 16, 1975",
    "nationalDay": "September 16",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.953Z",
    "updatedAt": "2025-10-25T18:52:32.953Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c66",
    "name": "Samoa",
    "code": "WS",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/ws.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -13.759,
        "longitude": -172.1046
      },
      "area": 2842,
      "borders": [],
      "coastline": 403
    },
    "population": {
      "total": 198414,
      "density": 70,
      "growthRate": 0.6,
      "urbanPopulation": 18.2
    },
    "gdp": {
      "total": 800000000,
      "perCapita": 4033,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 10.4,
        "industry": 25.2,
        "services": 64.4
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 98,
        "_id": "68fd1c70a669a65c2fdd5c67"
      },
      {
        "name": "Other",
        "percentage": 2,
        "_id": "68fd1c70a669a65c2fdd5c68"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c69"
      }
    ],
    "touristAttractions": [
      {
        "name": "Samoa",
        "description": "Polynesian culture",
        "location": "South Pacific",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c6a"
      }
    ],
    "capital": "Apia",
    "currency": "Samoan Tala (WST)",
    "languages": [
      "Samoan",
      "English"
    ],
    "timezone": [
      "UTC+13"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "January 1, 1962",
    "nationalDay": "June 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.953Z",
    "updatedAt": "2025-10-25T18:52:32.953Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c6b",
    "name": "Solomon Islands",
    "code": "SB",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/sb.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -9.6457,
        "longitude": 160.1562
      },
      "area": 28896,
      "borders": [],
      "coastline": 5313
    },
    "population": {
      "total": 686884,
      "density": 24,
      "growthRate": 2,
      "urbanPopulation": 23.2
    },
    "gdp": {
      "total": 1500000000,
      "perCapita": 2184,
      "growthRate": 3,
      "sectors": {
        "agriculture": 34.3,
        "industry": 7.6,
        "services": 58.1
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97.4,
        "_id": "68fd1c70a669a65c2fdd5c6c"
      },
      {
        "name": "Other",
        "percentage": 2.6,
        "_id": "68fd1c70a669a65c2fdd5c6d"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c6e"
      }
    ],
    "touristAttractions": [
      {
        "name": "East Rennell",
        "description": "UNESCO World Heritage site",
        "location": "Rennell Island",
        "category": "natural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c6f"
      }
    ],
    "capital": "Honiara",
    "currency": "Solomon Islands Dollar (SBD)",
    "languages": [
      "English"
    ],
    "timezone": [
      "UTC+11"
    ],
    "climate": "Tropical monsoon",
    "government": "Parliamentary constitutional monarchy",
    "independence": "July 7, 1978",
    "nationalDay": "July 7",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.953Z",
    "updatedAt": "2025-10-25T18:52:32.953Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c70",
    "name": "Tonga",
    "code": "TO",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/to.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -21.1789,
        "longitude": -175.1982
      },
      "area": 747,
      "borders": [],
      "coastline": 419
    },
    "population": {
      "total": 105695,
      "density": 142,
      "growthRate": 0.8,
      "urbanPopulation": 23
    },
    "gdp": {
      "total": 500000000,
      "perCapita": 4730,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 19.9,
        "industry": 20.3,
        "services": 59.8
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97,
        "_id": "68fd1c70a669a65c2fdd5c71"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1c70a669a65c2fdd5c72"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c73"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tonga",
        "description": "Polynesian kingdom",
        "location": "South Pacific",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c74"
      }
    ],
    "capital": "Nuku'alofa",
    "currency": "Tongan Paʻanga (TOP)",
    "languages": [
      "Tongan",
      "English"
    ],
    "timezone": [
      "UTC+13"
    ],
    "climate": "Tropical",
    "government": "Constitutional monarchy",
    "independence": "June 4, 1970",
    "nationalDay": "June 4",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.954Z",
    "updatedAt": "2025-10-25T18:52:32.954Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c75",
    "name": "Tuvalu",
    "code": "TV",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/tv.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -7.1095,
        "longitude": 177.6493
      },
      "area": 26,
      "borders": [],
      "coastline": 24
    },
    "population": {
      "total": 11792,
      "density": 454,
      "growthRate": 0.9,
      "urbanPopulation": 62
    },
    "gdp": {
      "total": 40000000,
      "perCapita": 3392,
      "growthRate": 3,
      "sectors": {
        "agriculture": 24.5,
        "industry": 5.6,
        "services": 69.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 97,
        "_id": "68fd1c70a669a65c2fdd5c76"
      },
      {
        "name": "Other",
        "percentage": 3,
        "_id": "68fd1c70a669a65c2fdd5c77"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c78"
      }
    ],
    "touristAttractions": [
      {
        "name": "Tuvalu",
        "description": "Small island nation",
        "location": "Pacific Ocean",
        "category": "natural",
        "rating": 3,
        "_id": "68fd1c70a669a65c2fdd5c79"
      }
    ],
    "capital": "Funafuti",
    "currency": "Tuvaluan Dollar (TVD)",
    "languages": [
      "English",
      "Tuvaluan"
    ],
    "timezone": [
      "UTC+12"
    ],
    "climate": "Tropical",
    "government": "Parliamentary constitutional monarchy",
    "independence": "October 1, 1978",
    "nationalDay": "October 1",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.954Z",
    "updatedAt": "2025-10-25T18:52:32.954Z"
  },
  {
    "_id": "68fd1c70a669a65c2fdd5c7a",
    "name": "Vanuatu",
    "code": "VU",
    "continent": "Oceania",
    "flag": "https://flagcdn.com/w320/vu.png",
    "geographicLocation": {
      "coordinates": {
        "latitude": -15.3767,
        "longitude": 166.9592
      },
      "area": 12189,
      "borders": [],
      "coastline": 2528
    },
    "population": {
      "total": 307145,
      "density": 25,
      "growthRate": 1.8,
      "urbanPopulation": 25.2
    },
    "gdp": {
      "total": 900000000,
      "perCapita": 2930,
      "growthRate": 2.5,
      "sectors": {
        "agriculture": 27.3,
        "industry": 11.8,
        "services": 60.9
      }
    },
    "religions": [
      {
        "name": "Christianity",
        "percentage": 93.3,
        "_id": "68fd1c70a669a65c2fdd5c7b"
      },
      {
        "name": "Other",
        "percentage": 6.7,
        "_id": "68fd1c70a669a65c2fdd5c7c"
      }
    ],
    "traditions": [
      {
        "name": "Independence Day",
        "description": "National celebration",
        "category": "festival",
        "_id": "68fd1c70a669a65c2fdd5c7d"
      }
    ],
    "touristAttractions": [
      {
        "name": "Chief Roi Mata's Domain",
        "description": "UNESCO World Heritage site",
        "location": "Efate Island",
        "category": "cultural",
        "rating": 4,
        "_id": "68fd1c70a669a65c2fdd5c7e"
      }
    ],
    "capital": "Port Vila",
    "currency": "Vanuatu Vatu (VUV)",
    "languages": [
      "Bislama",
      "English",
      "French"
    ],
    "timezone": [
      "UTC+11"
    ],
    "climate": "Tropical",
    "government": "Parliamentary republic",
    "independence": "July 30, 1980",
    "nationalDay": "July 30",
    "__v": 0,
    "createdAt": "2025-10-25T18:52:32.955Z",
    "updatedAt": "2025-10-25T18:52:32.955Z"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Country.deleteMany({});
    console.log('Cleared existing countries');

    // Insert all countries
    await Country.insertMany(allCountries);
    console.log(`Inserted ${allCountries.length} countries`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeder
seedDatabase();