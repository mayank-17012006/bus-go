import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Filter, Users, ArrowUpDown } from 'lucide-react';
import { useBusStore } from '../store/busStore';
import BusFilters from '../components/BusFilters';
import { useNavigate } from 'react-router-dom';
import { indianCities } from '../data/indianCities';
import { format } from 'date-fns';

const Search = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams, buses, searchBuses, selectBus, sortBuses } = useBusStore();
  const [sourceDropdown, setSourceDropdown] = useState(false);
  const [destinationDropdown, setDestinationDropdown] = useState(false);
  const [filteredSourceCities, setFilteredSourceCities] = useState<string[]>([]);
  const [filteredDestinationCities, setFilteredDestinationCities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<'price' | 'departure' | 'duration' | 'rating'>('price');

  useEffect(() => {
    if (searchParams.source) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(searchParams.source.toLowerCase())
      ).slice(0, 5);
      setFilteredSourceCities(filtered);
    } else {
      setFilteredSourceCities([]);
    }
  }, [searchParams.source]);

  useEffect(() => {
    if (searchParams.destination) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(searchParams.destination.toLowerCase())
      ).slice(0, 5);
      setFilteredDestinationCities(filtered);
    } else {
      setFilteredDestinationCities([]);
    }
  }, [searchParams.destination]);

  useEffect(() => {
    // If no buses are loaded and we have search params, search for buses
    if (buses.length === 0 && searchParams.source && searchParams.destination) {
      searchBuses();
    }
  }, [buses.length, searchParams.source, searchParams.destination, searchBuses]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchParams.source || !searchParams.destination) {
      alert('Please select both source and destination cities');
      return;
    }
    
    searchBuses();
  };

  const handleSelectBus = (bus: any) => {
    selectBus(bus);
    navigate('/select-seats');
  };

  const handleSort = (option: 'price' | 'departure' | 'duration' | 'rating') => {
    setSortOption(option);
    sortBuses(option);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchParams.source}
                onChange={(e) => {
                  setSearchParams({ source: e.target.value });
                  setSourceDropdown(true);
                }}
                onFocus={() => setSourceDropdown(true)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
                placeholder="From"
              />
              {sourceDropdown && filteredSourceCities.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                  {filteredSourceCities.map((city) => (
                    <div
                      key={city}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchParams({ source: city });
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
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchParams.destination}
                onChange={(e) => {
                  setSearchParams({ destination: e.target.value });
                  setDestinationDropdown(true);
                }}
                onFocus={() => setDestinationDropdown(true)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
                placeholder="To"
              />
              {destinationDropdown && filteredDestinationCities.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                  {filteredDestinationCities.map((city) => (
                    <div
                      key={city}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchParams({ destination: city });
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
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ date: e.target.value })}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
              />
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={searchParams.passengers}
                onChange={(e) => setSearchParams({ passengers: parseInt(e.target.value) })}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#06D6A0] focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="bg-[#06D6A0] text-white px-4 py-2 rounded-md hover:bg-[#05bf8f] transition-colors flex items-center justify-center gap-2">
            <Filter className="h-5 w-5" />
            Search Buses
          </button>
        </div>
      </form>

      {/* Mobile Filters Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-white p-3 rounded-md shadow-sm flex items-center justify-center gap-2"
        >
          <Filter className="h-5 w-5" />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:col-span-1`}>
          <BusFilters />
        </div>

        {/* Bus List */}
        <div className="md:col-span-3">
          {/* Sort options */}
          {buses.length > 0 && (
            <div className="bg-white p-3 rounded-lg shadow-md mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {buses.length} buses found from {searchParams.source} to {searchParams.destination}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value as any)}
                    className="p-1 border rounded-md text-sm"
                  >
                    <option value="price">Price</option>
                    <option value="departure">Departure</option>
                    <option value="duration">Duration</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* No buses found message */}
          {buses.length === 0 && searchParams.source && searchParams.destination && (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg text-gray-600 mb-2">No buses found for this route</p>
              <p className="text-sm text-gray-500">Try changing your search criteria or date</p>
            </div>
          )}

          {/* Bus list */}
          <div className="space-y-4">
            {buses.map((bus) => (
              <div key={bus.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{bus.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{bus.type}</span>
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                        {bus.rating} ★
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-medium">{bus.departureTime}</p>
                        <p className="text-xs text-gray-500">{bus.source}</p>
                      </div>
                      <div className="text-gray-400 text-xs px-2">
                        {bus.duration}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{bus.arrivalTime}</p>
                        <p className="text-xs text-gray-500">{bus.destination}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Available Seats: {bus.availableSeats}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className="text-2xl font-bold text-[#06D6A0]">₹{bus.price}</p>
                  </div>

                  <button
                    onClick={() => handleSelectBus(bus)}
                    className="w-full md:w-auto bg-[#06D6A0] text-white px-6 py-2 rounded-md hover:bg-[#05bf8f] transition-colors"
                  >
                    Select Seats
                  </button>
                </div>

                {/* Amenities */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {bus.amenities.map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;