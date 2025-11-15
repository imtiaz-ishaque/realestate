import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Property {
  id: number;
  title: string;
  price: number;
  type: string;
  category: string;
  subCategory?: string;
  subSubCategory?: string;
  surface?: number;
  sqm: number;
  rooms: number;
  bathrooms: number;
  floor: string;
  condition: string;
  energyClass: string;
  features?: string[];
  zone: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  images?: string[];
  description?: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
  };
  forSale?: boolean;
  commission?: string;
  energy?: string;
  businessActivities?: string[];
  visibility?: string;
  commercialType?: string;
  officeType?: string;
  services?: string[];
  garageType?: string;
  security?: string[];
  access?: string;
  landType?: string;
  buildingRights?: string[];
  utilities?: string[];
}

interface PropertyCardProps {
  property: Property;
  viewType?: 'grid' | 'list';
}

export default function PropertyCard({ property, viewType = 'grid' }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number, type: string) => {
    if (type === 'buy') {
      return `€${price.toLocaleString()}`;
    } else {
      return `€${price}/mese`;
    }
  };

  const getPropertyImages = () => {
    const images = [];
    
    // Add existing images if available
    if (property.images && property.images.length > 0) {
      images.push(...property.images);
    }
    
    // Generate additional images based on property type and category
    let baseImagePrompt = '';
    
    if (property.category === 'Case-Appartamenti') {
      if (property.subSubCategory === 'Monolocale') {
        baseImagePrompt = `Modern studio apartment interior in Rome ${property.zone} with compact design, contemporary furniture, efficient space usage, bright natural light, minimalist Italian style`;
      } else if (property.subSubCategory === 'Bilocale') {
        baseImagePrompt = `Elegant two-room apartment interior in Rome ${property.zone} with sophisticated design, marble floors, designer furniture, luxury finishes, Italian elegance`;
      } else if (property.subSubCategory === 'Trilocale') {
        baseImagePrompt = `Three-room apartment with terrace in Rome ${property.zone} neighborhood, historic building, modern interior, rooftop terrace with city views, cozy atmosphere`;
      } else if (property.subSubCategory === 'Quadrilocale') {
        baseImagePrompt = `Luxury four-room apartment in Rome ${property.zone} with elegant interior, high ceilings, period details, modern amenities, sophisticated Italian design`;
      } else if (property.subCategory === 'Villa') {
        baseImagePrompt = `Luxury villa with garden in Rome ${property.zone} district, modern architecture, swimming pool, manicured landscaping, elegant facade, premium materials`;
      } else if (property.subCategory === 'Attico / Mansarda') {
        baseImagePrompt = `Luxury penthouse with panoramic terrace in Rome ${property.zone}, modern interior, floor-to-ceiling windows, rooftop garden, stunning city views`;
      } else {
        baseImagePrompt = `Beautiful residential apartment interior in Rome ${property.zone} with modern design, natural lighting, elegant furnishing, Italian style`;
      }
    } else if (property.category === 'Commerciale') {
      if (property.businessActivities?.includes('Farmacia')) {
        baseImagePrompt = `Professional pharmacy interior in Rome ${property.zone} with modern shelving, consultation area, medical equipment, clean white design, professional lighting`;
      } else if (property.businessActivities?.includes('Ristorante')) {
        baseImagePrompt = `Traditional Italian restaurant interior in Rome ${property.zone} with rustic decor, dining tables, professional kitchen, warm atmosphere, authentic Roman style`;
      } else if (property.businessActivities?.includes('Parrucchiere – Barbiere')) {
        baseImagePrompt = `Modern hair salon interior in Rome ${property.zone} with styling stations, mirrors, professional equipment, contemporary design, clean aesthetic`;
      } else if (property.subCategory === 'Laboratorio') {
        baseImagePrompt = `Artisan workshop space in Rome ${property.zone} with high ceilings, work benches, industrial lighting, creative workspace, raw industrial aesthetic`;
      } else {
        baseImagePrompt = `Modern commercial space interior in Rome ${property.zone} with large windows, display areas, contemporary retail design, professional environment`;
      }
    } else if (property.category === 'Ufficio') {
      if (property.officeType === 'Singolo') {
        baseImagePrompt = `Professional single office space in Rome ${property.zone} with modern furniture, natural lighting, business environment, elegant design, executive workspace`;
      } else if (property.officeType === 'Open space') {
        baseImagePrompt = `Modern open space office in Rome ${property.zone} with collaborative workspace, contemporary design, natural light, flexible seating, professional environment`;
      } else {
        baseImagePrompt = `Shared office space in Rome ${property.zone} with coworking desks, collaborative environment, modern amenities, professional atmosphere`;
      }
    } else if (property.category === 'Garage-Posti auto') {
      if (property.garageType === 'Box singolo') {
        baseImagePrompt = `Clean single car garage box in Rome ${property.zone} with automatic door, good lighting, security features, well-maintained underground parking`;
      } else if (property.garageType === 'Box doppio') {
        baseImagePrompt = `Double car garage box in Rome ${property.zone} with space for two vehicles, automatic doors, security system, modern underground parking facility`;
      } else {
        baseImagePrompt = `Covered parking space in Rome ${property.zone} with roof protection, marked parking spot, secure access, residential building garage`;
      }
    } else if (property.category === 'Terreni') {
      if (property.subCategory === 'Terreno edificabile') {
        baseImagePrompt = `Building land plot in Rome ${property.zone} with clear boundaries, access road, utilities available, suitable for residential development, open landscape`;
      } else if (property.subCategory === 'Terreno agricolo') {
        baseImagePrompt = `Agricultural land in Roman countryside with fertile soil, rural landscape, farming potential, natural environment, peaceful setting`;
      } else {
        baseImagePrompt = `Commercial land plot in Rome ${property.zone} district with urban location, development potential, infrastructure access, business district setting`;
      }
    } else {
      baseImagePrompt = `Modern property interior in Rome ${property.zone} with contemporary design, natural lighting, elegant furnishing, Italian architectural style`;
    }

    // Add main image if not already present
    if (images.length === 0) {
      images.push(`https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28baseImagePrompt%29%7D&width=500&height=350&seq=${property.id}&orientation=landscape`);
    }

    // Generate additional images for gallery
    const additionalImages = [
      `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28baseImagePrompt%20%20%20%2C%20kitchen%20area%20with%20modern%20appliances%2C%20marble%20countertops%2C%20elegant%20design%2C%20Italian%20style%2C%20premium%20materials%29%7D&width=500&height=350&seq=${property.id}a&orientation=landscape`,
      `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28baseImagePrompt%20%20%20%2C%20bathroom%20with%20luxury%20fixtures%2C%20modern%20design%2C%20marble%20surfaces%2C%20sophisticated%20Italian%20style%29%7D&width=500&height=350&seq=${property.id}b&orientation=landscape`,
      `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28baseImagePrompt%20%20%20%2C%20bedroom%20with%20comfortable%20furniture%2C%20natural%20light%2C%20elegant%20design%2C%20Italian%20style%20decor%29%7D&width=500&height=350&seq=${property.id}c&orientation=landscape`,
      `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28baseImagePrompt%20%20%20%2C%20living%20area%20with%20modern%20furniture%2C%20large%20windows%2C%20contemporary%20design%2C%20Italian%20elegance%29%7D&width=500&height=350&seq=${property.id}d&orientation=landscape`
    ];

    // Add additional images up to 5 total
    images.push(...additionalImages.slice(0, 5 - images.length));

    return images;
  };

  const propertyImages = getPropertyImages();

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  const getPropertyDescription = () => {
    if (property.description) {
      return property.description;
    }
    
    // Generate description based on property type
    if (property.category === 'Case-Appartamenti') {
      return `Splendido ${property.subSubCategory || property.subCategory} situato nel cuore di ${property.zone}. L'immobile si presenta in ${property.condition.toLowerCase()} condizioni e offre ampi spazi luminosi con finiture di pregio.`;
    } else if (property.category === 'Commerciale') {
      return `Locale commerciale strategicamente posizionato in ${property.zone}, ideale per attività commerciali. Ottima visibilità e passaggio pedonale garantito.`;
    } else if (property.category === 'Ufficio') {
      return `Ufficio moderno e funzionale in ${property.zone}, perfetto per attività professionali. Spazi luminosi e ben distribuiti con servizi inclusi.`;
    } else {
      return `Immobile di qualità situato in ${property.zone}, Roma. Ottima opportunità di investimento in zona strategica e ben servita.`;
    }
  };

  // Clean vertical card layout for grid view (home page) - Mobile Optimized
  if (viewType === 'grid') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-[#E8E4E0] overflow-hidden transition-all duration-300 hover:border-[#D97860]/30">
        {/* Image Section - Mobile Optimized */}
        <div className="relative group">
          <img
            src={propertyImages[currentImageIndex]}
            alt={`${property.title} in ${property.zone}, Rome`}
            className="w-full h-48 sm:h-56 md:h-64 object-cover object-top"
          />
          
          {/* Property Type Badge - Mobile Optimized */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
              property.type === 'buy' 
                ? 'bg-[#C9A876] text-white' 
                : 'bg-[#D97860] text-white'
            }`}>
              {property.type === 'buy' ? 'Vendita' : 'Affitto'}
            </span>
          </div>

          {/* Image Navigation - Mobile Optimized */}
          {propertyImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
              >
                <i className="ri-arrow-left-line text-[#3D2817] text-sm"></i>
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
              >
                <i className="ri-arrow-right-line text-[#3D2817] text-sm"></i>
              </button>

              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/60 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                {currentImageIndex + 1}/{propertyImages.length}
              </div>
            </>
          )}
        </div>

        {/* Content Section - Mobile Optimized */}
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Price - Mobile Optimized */}
          <div className="text-xl sm:text-2xl font-bold text-[#D97860] mb-2 sm:mb-3">
            {formatPrice(property.price, property.type)}
          </div>

          {/* Title - Mobile Optimized */}
          <Link to={`/property/${property.id}`} className="block mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-[#3D2817] hover:text-[#D97860] transition-colors line-clamp-2 leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Location - Mobile Optimized */}
          <p className="text-xs sm:text-sm text-[#5C4B42] mb-3 sm:mb-4 flex items-center">
            <i className="ri-map-pin-line mr-1 sm:mr-1.5 text-[#C9A876]"></i>
            {property.zone}, Roma
          </p>

          {/* Specs - Mobile Optimized */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-[#5C4B42] mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-[#E8E4E0]">
            <div className="flex items-center">
              <i className="ri-home-4-line mr-1 sm:mr-1.5 text-[#C9A876] w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
              <span>{property.sqm} m²</span>
            </div>
            <div className="flex items-center">
              <i className="ri-door-open-line mr-1 sm:mr-1.5 text-[#C9A876] w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
              <span>{property.rooms} locali</span>
            </div>
            <div className="flex items-center">
              <i className="ri-drop-line mr-1 sm:mr-1.5 text-[#C9A876] w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
              <span>{property.bathrooms} bagni</span>
            </div>
          </div>

          {/* Action Button - Mobile Optimized */}
          <Link 
            to={`/property/${property.id}`}
            className="block w-full text-center px-4 sm:px-6 py-2 sm:py-2.5 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors text-xs sm:text-sm font-semibold cursor-pointer whitespace-nowrap"
          >
            Contatta Proprietario
          </Link>
        </div>
      </div>
    );
  }

  // Professional single-column card layout for list view (search results) - Mobile Optimized
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-[#E8E4E0] overflow-hidden transition-all duration-300 hover:border-[#D97860]/30">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
        {/* Image Section - Mobile Optimized */}
        <div className="w-full sm:w-[40%] flex-shrink-0">
          <div className="relative group">
            <img
              src={propertyImages[currentImageIndex]}
              alt={`${property.title} in ${property.zone}, Rome`}
              className="w-full h-48 sm:h-72 object-cover object-top rounded-lg"
            />
            
            {/* Property Type Badge */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                property.type === 'buy' 
                  ? 'bg-[#C9A876] text-white' 
                  : 'bg-[#D97860] text-white'
              }`}>
                {property.type === 'buy' ? 'Vendita' : 'Affitto'}
              </span>
            </div>
            
            {/* Property Category Badge */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-white/90 text-[#3D2817] backdrop-blur-sm">
                {property.subSubCategory || property.subCategory || property.category}
              </span>
            </div>

            {/* Image Navigation - Mobile Optimized */}
            {propertyImages.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
                >
                  <i className="ri-arrow-left-line text-[#3D2817] text-sm"></i>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
                >
                  <i className="ri-arrow-right-line text-[#3D2817] text-sm"></i>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/60 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  {currentImageIndex + 1}/{propertyImages.length}
                </div>

                {/* Image Dots Indicator */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {propertyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 cursor-pointer ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Section - Mobile Optimized */}
        <div className="w-full sm:w-[60%] flex flex-col justify-between">
          {/* Top Section: Price and Title */}
          <div>
            {/* Price - Mobile Optimized */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D97860] mb-2 sm:mb-3 leading-tight">
              {formatPrice(property.price, property.type)}
            </div>

            {/* Title - Mobile Optimized */}
            <Link to={`/property/${property.id}`} className="block mb-2 sm:mb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-[#3D2817] hover:text-[#D97860] transition-colors leading-tight">
                {property.title}
              </h3>
            </Link>

            {/* Address/Zone - Mobile Optimized */}
            <p className="text-xs sm:text-sm text-[#5C4B42] mb-3 sm:mb-4 flex items-center">
              <i className="ri-map-pin-line mr-1.5 sm:mr-2 text-[#C9A876]"></i>
              {property.address || `${property.zone}, Roma`}
            </p>

            {/* Specs Row - Mobile Optimized */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-[#5C4B42] mb-3 sm:mb-4">
              <div className="flex items-center">
                <i className="ri-home-4-line mr-1 sm:mr-2 text-[#C9A876] w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                <span className="font-medium">{property.sqm} m²</span>
              </div>
              <div className="flex items-center">
                <i className="ri-door-open-line mr-1 sm:mr-2 text-[#C9A876] w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                <span className="font-medium">{property.rooms} locali</span>
              </div>
              <div className="flex items-center">
                <i className="ri-drop-line mr-1 sm:mr-2 text-[#C9A876] w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"></i>
                <span className="font-medium">{property.bathrooms} bagni</span>
              </div>
              <div className="hidden sm:flex items-center">
                <i className="ri-building-line mr-2 text-[#C9A876] w-4 h-4 flex items-center justify-center"></i>
                <span className="font-medium">Piano {property.floor}</span>
              </div>
            </div>

            {/* Description - Mobile Optimized */}
            <p className="text-xs sm:text-sm text-[#5C4B42] mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
              {getPropertyDescription()}
            </p>
          </div>

          {/* Bottom Section: Action Buttons - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Link 
              to={`/property/${property.id}`}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors text-xs sm:text-sm font-semibold cursor-pointer text-center"
            >
              Contatta Proprietario
            </Link>
            <div className="flex gap-2 sm:gap-3">
              <button className="p-2 sm:p-2.5 border border-[#E8E4E0] text-[#D97860] rounded-lg hover:bg-[#F9F6F3] hover:border-[#D97860] transition-colors cursor-pointer flex-1 sm:flex-none">
                <i className="ri-heart-line w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center mx-auto"></i>
              </button>
              <button className="px-3 sm:px-4 py-2 sm:py-2.5 border border-[#E8E4E0] text-[#5C4B42] rounded-lg hover:bg-[#F9F6F3] transition-colors text-xs sm:text-sm font-medium cursor-pointer flex-1 sm:flex-none">
                <i className="ri-share-line mr-1 sm:mr-2"></i>
                Condividi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
