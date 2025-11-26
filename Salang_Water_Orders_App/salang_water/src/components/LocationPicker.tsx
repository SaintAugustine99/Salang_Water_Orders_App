import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '0.75rem'
};

// Default to Nairobi
const defaultCenter = {
    lat: -1.2921,
    lng: 36.8219
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';

interface LocationPickerProps {
    onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const [markerPosition, setMarkerPosition] = useState(defaultCenter);

    const onLoad = useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);
    }, []);

    const onUnmount = useCallback((map: google.maps.Map) => {
        // Clean up if needed
    }, []);

    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPosition({ lat, lng });
            onLocationSelect({ lat, lng });
        }
    }, [onLocationSelect]);

    if (!isLoaded) {
        return <div className="h-[300px] w-full bg-slate-100 rounded-xl flex items-center justify-center animate-pulse">Loading Map...</div>;
    }

    if (GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
        return (
            <div className="h-[300px] w-full bg-slate-100 rounded-xl flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-slate-300">
                <p className="text-slate-500 font-medium mb-2">Map Unavailable</p>
                <p className="text-xs text-slate-400">Please add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file to enable the map.</p>
            </div>
        )
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            <Marker position={markerPosition} />
        </GoogleMap>
    );
};

export default React.memo(LocationPicker);
