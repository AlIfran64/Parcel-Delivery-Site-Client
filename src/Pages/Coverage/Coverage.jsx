import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../../src/data/warehouses.json';

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to change map center dynamically
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 12, {
        animate: true
      });
    }
  }, [center, map]);
  return null;
};

const Coverage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(data);
  const [targetDistrict, setTargetDistrict] = useState(null);

  useEffect(() => {
    const text = searchText.toLowerCase().trim();

    const filtered = data.filter(d =>
      d.district.toLowerCase().includes(text)
    );

    setFilteredDistricts(filtered);

    if (filtered.length === 1) {
      setTargetDistrict(filtered[0]);
    } else {
      setTargetDistrict(null);
    }

    if (searchText && filtered.length === 0) {
      toast.error('No matching district found!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [searchText]);

  const handleSearchClick = () => {
    setSearchText(searchInput);
  };

  return (
    <div className='bg-white rounded-2xl p-10 w-11/12 mx-auto my-10 z-0'>
      <h1 className='text-[#03373D] text-3xl md:text-5xl font-extrabold mb-6'>
        We are available in all districts
      </h1>

      <div className='mt-8 mb-8'>
        <h1 className='text-[#03373D] text-xl md:text-3xl font-extrabold'>
          We deliver almost all over Bangladesh
        </h1>
      </div>

      {/* Map with search bar overlay */}
      <div className="relative h-[500px] w-full rounded-lg overflow-hidden mb-8 z-0">
        {/* Search bar positioned over map */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-lg px-4 py-2 flex flex-col sm:flex-row items-center gap-2 z-[1000] w-11/12 sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search your district..."
            className="w-full sm:w-[250px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CAEB66]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchClick();
            }}
          />
          <button
            onClick={handleSearchClick}
            className="px-6 py-2 bg-[#CAEB66] rounded-full text-white font-semibold hover:bg-[#02656d] transition"
          >
            Search
          </button>
        </div>

        {/* Leaflet Map */}
        <MapContainer
          center={[23.8103, 90.4125]} // Default center Dhaka
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredDistricts.map((district, i) => (
            <Marker
              key={i}
              position={[district.latitude, district.longitude]}
              icon={redIcon}
            >
              <Popup>
                <strong>{district.district}</strong><br />
                Region: {district.region}<br />
                City: {district.city}<br />
                Areas: {district.covered_area.join(', ')}<br />
                <a href={district.flowchart} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>
                  View Flowchart
                </a>
              </Popup>
            </Marker>
          ))}

          {targetDistrict && (
            <ChangeMapCenter center={[targetDistrict.latitude, targetDistrict.longitude]} />
          )}
        </MapContainer>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Coverage;
