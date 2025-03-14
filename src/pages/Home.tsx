import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useBusStore } from '../store/busStore';
import { indianCities, popularRoutes } from '../data/indianCities';
import { format } from 'date-fns';

const Home = () => {
  const navigate = useNavigate();
  const { setSearchParams, searchBuses } = useBusStore();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [passengers, setPassengers] = useState(1);
  const [sourceDropdown, setSourceDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [filteredSourceCities, setFilteredSourceCities] = useState<string[]>([]);
  const [filteredDestinationCities, setFilteredDestinationCities] = useState<string[]>([]);

  useEffect(() => {
    if (source) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(source.toLowerCase())
      ).slice(0, 5);
      setFilteredSourceCities(filtered);
    } else {
      setFilteredSourceCities([]);
    }
  }, [source]);

  useEffect(() => {
    if (destination) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(destination.toLowerCase())
      ).slice(0, 5);
      setFilteredDestinationCities(filtered);
    } else {
      setFilteredDestinationCities([]);
    }
  }, [destination]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!source || !destination) {
      alert('Please select both source and destination cities');
      return;
    }
    
    setSearchParams({
      source,
      destination,
      date,
      passengers
    });
    
    searchBuses();
    navigate('/search');
  };

  const handlePopularRouteClick = (from: string, to: string) => {
    setSource(from);
    setDestination(to);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)]">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your Journey Begins Here
          </h1>
          <p className="text-xl text-gray-200">
            Book bus tickets easily with just a few clicks
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => {
                      setSource(e.target.value);
                      setSourceDropdown(true);
                    }}
                    onFocus={() => setSourceDropdown(true)}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
                    placeholder="Departure City"
                  />
                  {sourceDropdown && filteredSourceCities.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                      {filteredSourceCities.map((city) => (
                        <div
                          key={city}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSource(city);
                            setSourceDropdown(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setDestinationDropdown(true);
                    }}
                    onFocus={() => setDestinationDropdown(true)}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
                    placeholder="Destination City"
                  />
                  {destinationDropdown && filteredDestinationCities.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                      {filteredDestinationCities.map((city) => (
                        <div
                          key={city}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDestination(city);
                            setDestinationDropdown(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#06D6A0] text-white py-3 rounded-md hover:bg-[#05bf8f] transition-colors font-medium"
            >
              Search Buses
            </button>
          </form>

          {/* Popular Routes */}
          <div className="mt-6 bg-white bg-opacity-90 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Routes:</h3>
            <div className="flex flex-wrap gap-2">
              {popularRoutes.map((route, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularRouteClick(route.from, route.to)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                >
                  {route.from} → {route.to}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Live Tracking",
              description: "Track your bus in real-time with accurate ETA updates",
              icon: "🚌"
            },
            {
              title: "Secure Booking",
              description: "Safe and secure payment options with instant confirmation",
              icon: "🔒"
            },
            {
              title: "24/7 Support",
              description: "Round the clock customer service for all your travel needs",
              icon: "💬"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-90 p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;