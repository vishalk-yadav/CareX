import React, { useState, useMemo } from 'react';
import {
  Hospital,
  Search,
  Phone,
  Navigation,
  Clock,
  Star,
  MapPin
} from 'lucide-react';
import { INITIAL_EMERGENCY_SERVICES } from '../../services/mockData';
import type { FacilityCategory } from '../../types';
import { generateGoogleMapsUrl } from '../../services/geoService';

export const EmergencyServicesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: FacilityCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Services', icon: '📍' },
    { id: 'hospital', label: 'Hospitals', icon: '🏥' },
    { id: 'ambulance', label: 'Ambulances', icon: '🚑' },
    { id: 'pharmacy', label: 'Pharmacies', icon: '💊' },
    { id: 'police', label: 'Police', icon: '🚓' },
    { id: 'fire', label: 'Fire Stations', icon: '🚒' }
  ];

  const filteredFacilities = useMemo(() => {
    return INITIAL_EMERGENCY_SERVICES.filter((srv) => {
      const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
      const matchesSearch =
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Hospital className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Nearby Emergency Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Verified local hospitals, trauma centers, 24x7 pharmacies, and first responder stations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
            Demo Geo Registry
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facility name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFacilities.map((facility) => {
          const mapUrl = generateGoogleMapsUrl(facility.coordinates.lat, facility.coordinates.lng);
          return (
            <div
              key={facility.id}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {facility.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span className="truncate">{facility.address}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {facility.distanceKm} km
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  {facility.isOpen24Hours ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Open 24x7</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Regular Operating Hours</span>
                  )}

                  {facility.rating && (
                    <span className="inline-flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{facility.rating}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${facility.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Emergency</span>
                </a>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
