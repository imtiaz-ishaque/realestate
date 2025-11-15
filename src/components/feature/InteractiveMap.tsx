import React, { useEffect, useRef, useState } from 'react';

interface Property {
  id: number;
  title: string;
  zone: string;
  price: number;
  type: string;
  sqm: number;
  rooms: number;
  bathrooms: number;
  category: string;
  subCategory?: string;
  subSubCategory?: string;
}

interface InteractiveMapProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  highlightedPropertyId?: number;
}

// Rome zone coordinates mapping
const zoneCoordinates: { [key: string]: { lat: number, lng: number } } = {
  // Centro Storico
  'Centro Storico': { lat: 41.8986, lng: 12.4768 },
  'Pantheon': { lat: 41.8986, lng: 12.4768 },
  'Campo de\' Fiori': { lat: 41.8955, lng: 12.4729 },
  'Piazza Navona': { lat: 41.8992, lng: 12.4731 },

  // Trastevere
  'Trastevere': { lat: 41.8890, lng: 12.4692 },

  // Vatican
  'Vaticano': { lat: 41.9029, lng: 12.4534 },
  'Borgo': { lat: 41.9029, lng: 12.4534 },

  // Prati
  'Prati': { lat: 41.9109, lng: 12.4581 },
  'Della Vittoria': { lat: 41.9109, lng: 12.4581 },

  // Flaminio
  'Flaminio': { lat: 41.9194, lng: 12.4762 },
  'Parioli': { lat: 41.9194, lng: 12.4762 },
  'Villa Borghese': { lat: 41.9194, lng: 12.4762 },

  // Trieste
  'Trieste': { lat: 41.9267, lng: 12.5034 },
  'Salario': { lat: 41.9267, lng: 12.5034 },
  'Villa Ada': { lat: 41.9267, lng: 12.5034 },

  // Nomentano
  'Nomentano': { lat: 41.9267, lng: 12.5156 },
  'Monte Sacro': { lat: 41.9267, lng: 12.5156 },

  // Tiburtino
  'Tiburtino': { lat: 41.9099, lng: 12.5343 },
  'Casal Bruciato': { lat: 41.9099, lng: 12.5343 },

  // Prenestino
  'Prenestino': { lat: 41.8889, lng: 12.5343 },
  'Centocelle': { lat: 41.8889, lng: 12.5343 },

  // Casilino
  'Casilino': { lat: 41.8778, lng: 12.5456 },
  'Tor Pignattara': { lat: 41.8778, lng: 12.5456 },

  // Appio Latino
  'Appio Latino': { lat: 41.8667, lng: 12.5123 },
  'Furio Camillo': { lat: 41.8667, lng: 12.5123 },

  // Tuscolano
  'Tuscolano': { lat: 41.8556, lng: 12.5234 },
  'Don Bosco': { lat: 41.8556, lng: 12.5234 },

  // Appio Pignatelli
  'Appio Pignatelli': { lat: 41.8445, lng: 12.5012 },
  'Capannelle': { lat: 41.8445, lng: 12.5012 },

  // Ardeatino
  'Ardeatino': { lat: 41.8334, lng: 12.4901 },
  'Tor Marancia': { lat: 41.8334, lng: 12.4901 },

  // Ostiense
  'Ostiense': { lat: 41.8556, lng: 12.4789 },
  'Garbatella': { lat: 41.8556, lng: 12.4789 },

  // Testaccio
  'Testaccio': { lat: 41.8778, lng: 12.4789 },
  'Aventino': { lat: 41.8778, lng: 12.4789 },

  // Trastevere areas
  'Monteverde': { lat: 41.8667, lng: 12.4567 },
  'Gianicolense': { lat: 41.8667, lng: 12.4567 },

  // Aurelio
  'Aurelio': { lat: 41.8889, lng: 12.4345 },
  'Boccea': { lat: 41.8889, lng: 12.4345 },

  // Trionfale
  'Trionfale': { lat: 41.9111, lng: 12.4456 },
  'Monte Mario': { lat: 41.9111, lng: 12.4456 },

  // Default Rome center for unknown zones
  'Roma': { lat: 41.9028, lng: 12.4964 }
};

// Custom Overlay for Price Labels
class PriceLabel extends google.maps.OverlayView {
  private position: google.maps.LatLng;
  private price: string;
  private div: HTMLDivElement | null = null;

  constructor(position: google.maps.LatLng, price: string) {
    super();
    this.position = position;
    this.price = price;
  }

  onAdd() {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.background = '#D97860';
    div.style.color = '#FFFFFF';
    div.style.padding = '4px 8px';
    div.style.borderRadius = '4px';
    div.style.fontSize = '12px';
    div.style.fontWeight = 'bold';
    div.style.whiteSpace = 'nowrap';
    div.style.border = '1px solid #FFFFFF';
    div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    div.style.cursor = 'pointer';
    div.style.zIndex = '1000';
    div.textContent = this.price;

    this.div = div;
    const panes = this.getPanes();
    panes?.overlayLayer.appendChild(div);
  }

  draw() {
    if (!this.div) return;

    const overlayProjection = this.getProjection();
    const position = overlayProjection.fromLatLngToDivPixel(this.position);

    if (position) {
      this.div.style.left = (position.x - 30) + 'px';
      this.div.style.top = (position.y - 60) + 'px';
    }
  }

  onRemove() {
    if (this.div && this.div.parentNode) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  onPropertyClick,
  highlightedPropertyId
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [priceLabels, setPriceLabels] = useState<PriceLabel[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate property coordinates based on Rome zones
  const getPropertyCoordinates = (property: Property) => {
    const baseCoords = zoneCoordinates[property.zone] || zoneCoordinates['Roma'];

    // Add small random offset to avoid overlapping markers
    const offset = 0.003;
    return {
      lat: baseCoords.lat + (Math.random() - 0.5) * offset,
      lng: baseCoords.lng + (Math.random() - 0.5) * offset
    };
  };

  // Format price for display on pins
  const formatPrice = (price: number, type: string) => {
    if (type === 'buy') {
      if (price >= 1000000) {
        return `€${(price / 1000000).toFixed(1)}M`;
      } else if (price >= 1000) {
        return `€${(price / 1000).toFixed(0)}k`;
      } else {
        return `€${price}`;
      }
    } else {
      return `€${price}`;
    }
  };

  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      try {
        console.log('Initializing Google Maps...');

        // Rome center coordinates
        const romeCenter = { lat: 41.9028, lng: 12.4964 };

        // Simplified map styles for better reliability
        const mapStyles = [
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#FAF7F2" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#FFFFFF" }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#C9A876" }]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          }
        ];

        const mapInstance = new google.maps.Map(mapRef.current!, {
          zoom: 11,
          center: romeCenter,
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          backgroundColor: '#FAF7F2'
        });

        console.log('Map created successfully');
        setMap(mapInstance);

        // Create info window
        const infoWindowInstance = new google.maps.InfoWindow({
          maxWidth: 300
        });
        setInfoWindow(infoWindowInstance);
        setIsLoading(false);

        console.log('Map initialization complete');
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    // Check if Google Maps is available
    const checkGoogleMaps = () => {
      if (typeof google !== 'undefined' && google.maps && google.maps.Map) {
        console.log('Google Maps API is ready');
        initMap();
        return true;
      }
      return false;
    };

    // Load Google Maps API if not already loaded
    if (!checkGoogleMaps()) {
      console.log('Loading Google Maps API...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=key-here&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('Google Maps script loaded');
        // Wait longer for Google Maps to fully initialize
        let attempts = 0;
        const checkReady = () => {
          attempts++;
          if (checkGoogleMaps()) {
            return;
          }
          if (attempts < 10) {
            setTimeout(checkReady, 200);
          } else {
            console.error('Google Maps failed to initialize after multiple attempts');
            setIsLoading(false);
          }
        };
        setTimeout(checkReady, 300);
      };

      script.onerror = (error) => {
        console.error('Failed to load Google Maps API:', error);
        setIsLoading(false);
      };

      document.head.appendChild(script);
    }
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!map || !infoWindow) {
      console.log('Map or infoWindow not ready yet');
      return;
    }

    console.log('Creating markers for', properties.length, 'properties');

    // Clear existing markers and price labels
    markers.forEach(marker => marker.setMap(null));
    priceLabels.forEach(label => label.setMap(null));

    // Create reliable marker icon using Google Charts API
    const createMarkerIcon = (price: string) => {
      // Use Google Charts API for reliable pin creation
      return {
        url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|D97860|FFFFFF`,
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 40)
      };
    };

    // Create new markers for filtered properties
    const newMarkers: google.maps.Marker[] = [];
    const newPriceLabels: PriceLabel[] = [];

    properties.forEach((property, index) => {
      const position = getPropertyCoordinates(property);
      const priceLabel = formatPrice(property.price, property.type);

      console.log(`Creating marker ${index + 1} for property:`, property.title, 'at position:', position);

      // Create marker with reliable Google Charts pin
      const marker = new google.maps.Marker({
        position,
        map,
        title: property.title,
        icon: createMarkerIcon(priceLabel),
        animation: google.maps.Animation.DROP,
        optimized: false // Important for custom icons
      });

      // Create simplified price label overlay
      const label = new PriceLabel(
        new google.maps.LatLng(position.lat, position.lng),
        priceLabel
      );
      label.setMap(map);

      // Simplified info window content
      const infoContent = `
        <div style="max-width: 280px; padding: 16px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #3D2817; font-size: 16px;">
            ${property.title}
          </h3>
          <p style="margin: 0 0 8px 0; color: #5C4B42; font-size: 14px;">
            📍 ${property.zone}, Roma
          </p>
          <div style="font-size: 18px; font-weight: bold; color: #D97860; margin-bottom: 12px;">
            ${property.type === 'buy' ? `€${property.price.toLocaleString()}` : `€${property.price}/mese`}
          </div>
          <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 13px; color: #5C4B42;">
            <span><strong>${property.sqm}</strong> m²</span>
            <span><strong>${property.rooms}</strong> locali</span>
            <span><strong>${property.bathrooms}</strong> bagni</span>
          </div>
          <button onclick="window.selectProperty(${property.id})"
                  style="width: 100%; padding: 8px; background: #D97860; color: white; border: none;
                         border-radius: 4px; cursor: pointer; font-weight: bold;">
            Visualizza Dettagli
          </button>
        </div>
      `;

      // Add click listener to marker
      marker.addListener('click', () => {
        console.log('Marker clicked for property:', property.title);
        infoWindow.setContent(infoContent);
        infoWindow.open(map, marker);
        onPropertyClick(property);
      });

      newMarkers.push(marker);
      newPriceLabels.push(label);
    });

    console.log('Created', newMarkers.length, 'markers');
    setMarkers(newMarkers);
    setPriceLabels(newPriceLabels);

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      });
      map.fitBounds(bounds);

      // Ensure reasonable zoom level
      const listener = google.maps.event.addListener(map, 'idle', () => {
        const currentZoom = map.getZoom();
        if (currentZoom && currentZoom > 15) map.setZoom(15);
        if (currentZoom && currentZoom < 10) map.setZoom(10);
        google.maps.event.removeListener(listener);
      });
    }

    // Add global function for property selection from info window
    (window as any).selectProperty = (propertyId: number) => {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        onPropertyClick(property);
        infoWindow.close();
      }
    };

  }, [map, properties, infoWindow, onPropertyClick]);

  // Highlight specific property marker
  useEffect(() => {
    if (!highlightedPropertyId || !markers.length) return;

    markers.forEach(marker => {
      const isHighlighted = marker.getTitle()?.includes(highlightedPropertyId.toString());
      if (isHighlighted) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2000);
      }
    });
  }, [highlightedPropertyId, markers]);

  return (
    <div className="h-full relative bg-[#FAF7F2] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#FAF7F2] rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#D97860] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-[#5C4B42] font-medium">Caricamento mappa...</p>
          </div>
        </div>
      )}

      {/* Debug Info - Remove this after testing */}
      {!isLoading && (
        <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded text-xs">
          <div>Map: {map ? '✅' : '❌'}</div>
          <div>Properties: {properties.length}</div>
          <div>Markers: {markers.length}</div>
        </div>
      )}

      {/* Search Here Button */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <button className="px-6 py-3 bg-[#D97860] text-white rounded-lg font-bold text-sm shadow-lg hover:bg-[#C86B54] transition-colors cursor-pointer whitespace-nowrap">
          CERCA QUI
        </button>
      </div>

      {/* Zoom Message */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="px-4 py-2 bg-white text-[#3D2817] rounded-lg text-sm border border-[#E8E4E0] shadow-lg">
          Fai zoom per interagire con più annunci
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
