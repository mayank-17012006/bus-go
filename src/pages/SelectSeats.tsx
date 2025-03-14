import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusStore } from '../store/busStore';
import SeatLayout from '../components/SeatLayout';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const SelectSeats = () => {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, getTotalFare, createBooking } = useBusStore();
  const [passengerDetails, setPassengerDetails] = useState(false);
  const [passengers, setPassengers] = useState<Array<{name: string; age: number; gender: 'male' | 'female' | 'other'; seatNumber: string}>>([]);

  if (!selectedBus) {
    navigate('/search');
    return null;
  }

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers];
    
    if (!updatedPassengers[index]) {
      updatedPassengers[index] = {
        name: '',
        age: 0,
        gender: 'male',
        seatNumber: selectedSeats[index]?.number || ''
      };
    }
    
    if (field === 'age') {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: parseInt(value) || 0
      };
    } else {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: value
      };
    }
    
    setPassengers(updatedPassengers);
  };

  const validatePassengerDetails = () => {
    if (passengers.length !== selectedSeats.length) {
      toast.error('Please fill details for all passengers');
      return false;
    }
    
    for (const passenger of passengers) {
      if (!passenger.name || passenger.name.trim() === '') {
        toast.error('Please enter name for all passengers');
        return false;
      }
      
      if (!passenger.age || passenger.age < 1) {
        toast.error('Please enter valid age for all passengers');
        return false;
      }
      
      if (!passenger.gender) {
        toast.error('Please select gender for all passengers');
        return false;
      }
    }
    
    return true;
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat to continue');
      return;
    }
    
    if (!passengerDetails) {
      setPassengerDetails(true);
      return;
    }
    
    if (!validatePassengerDetails()) {
      return;
    }
    
    // Create booking
    const booking = createBooking(passengers);
    
    if (booking) {
      toast.success('Booking successful! Confirmation sent to your email.');
      navigate('/my-bookings');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button 
        onClick={() => navigate('/search')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to search results
      </button>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">{selectedBus.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-600 text-sm">Route</p>
              <p className="font-medium">{selectedBus.source} → {selectedBus.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-600 text-sm">Date</p>
              <p className="font-medium">{selectedBus.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-600 text-sm">Departure</p>
              <p className="font-medium">{selectedBus.departureTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-600 text-sm">Bus Type</p>
              <p className="font-medium">{selectedBus.type}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeatLayout />
        </div>

        <div className="lg:col-span-1">
          {selectedSeats.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Selected Seats</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedSeats.map((seat) => (
                      <span key={seat.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                        {seat.number}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base Fare</span>
                    <span>₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span>₹{Math.round(selectedSeats.reduce((sum, seat) => sum + seat.price, 0) * 0.05)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                    <span>Total Amount</span>
                    <span className="text-[#06D6A0]">₹{getTotalFare()}</span>
                  </div>
                </div>
                
                {/* Passenger Details Toggle */}
                <div>
                  <button
                    onClick={() => setPassengerDetails(!passengerDetails)}
                    className="w-full text-left text-[#06D6A0] hover:text-[#05bf8f] font-medium"
                  >
                    {passengerDetails ? 'Hide passenger details' : 'Enter passenger details'}
                  </button>
                  
                  {passengerDetails && (
                    <div className="mt-3 space-y-3">
                      {selectedSeats.map((seat, index) => (
                        <div key={seat.id} className="border border-gray-200 rounded-md p-3">
                          <p className="font-medium mb-2">Passenger {index + 1} - Seat {seat.number}</p>
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={passengers[index]?.name || ''}
                              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                              type="number"
                              placeholder="Age"
                              value={passengers[index]?.age || ''}
                              onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <select 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={passengers[index]?.gender || 'male'}
                              onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 bg-[#06D6A0] text-white py-3 rounded-md hover:bg-[#05bf8f] transition-colors font-medium"
                >
                  {passengerDetails ? 'Confirm Booking' : 'Enter Passenger Details'}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  By proceeding, you agree to our terms and conditions
                </p>
              </div>
            </div>
          )}
          
          {selectedSeats.length === 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-center text-gray-600">
                Please select seats to continue with booking
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectSeats;