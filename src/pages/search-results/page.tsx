import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import PropertyCard from '../home/components/PropertyCard';
import { properties, romeZones } from '../../mocks/properties';

interface FilterState {
  propertyType: string;
  mainCategory: string;
  subCategory: string;
  subSubCategory: string;
  priceMin: string;
  priceMax: string;
  surfaceMin: string;
  surfaceMax: string;
  rooms: string;
  bathrooms: string;
  floor: string;
  condition: string;
  energyClass: string;
  features: string[];
  zone: string;
  zones: string[];
  businessActivities: string[];
  visibility: string;
  commercialType: string;
  officeType: string;
  services: string[];
  garageType: string;
  security: string[];
  access: string;
  landType: string;
  buildingRights: string[];
  utilities: string[];
  sortBy: string;
  viewType: string;
}

// Contact Modal Component
const ContactModal = ({ property, isOpen, onClose }: { 
  property: any, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !property) return null;

  const formatPrice = (price: number, type: string) => {
    if (type === 'buy') {
      return `€${price.toLocaleString()}`;
    } else {
      return `€${price}/mese`;
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Ciao! Sono interessato/a alla proprietà: ${property.title} in ${property.zone} - ${formatPrice(property.price, property.type)}. Potresti darmi maggiori informazioni?`;
    const whatsappUrl = `https://wa.me/393401234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = `Interesse per: ${property.title} - ${property.zone}`;
    const body = `Gentile Proprietario,

Sono interessato/a alla vostra proprietà:

🏠 ${property.title}
📍 ${property.zone}, Roma
💰 ${formatPrice(property.price, property.type)}
📐 ${property.sqm} m² - ${property.rooms} locali - ${property.bathrooms} bagni

Potreste fornirmi maggiori informazioni e organizzare una visita?

Grazie per la vostra disponibilità.

Cordiali saluti`;

    const emailUrl = `mailto:proprietario@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, '_blank');
  };

  const handlePhoneContact = () => {
    window.open('tel:+393401234567', '_self');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-[#E8E4E0] p-6 flex items-center justify-between z-10 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <i className="ri-phone-line text-[#D97860] text-xl"></i>
            <h2 className="text-xl font-bold text-[#3D2817]">Contatta Proprietario</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F9F6F3] rounded-lg cursor-pointer transition-colors"
          >
            <i className="ri-close-line text-xl text-[#5C4B42]"></i>
          </button>
        </div>

        {/* Property Summary */}
        <div className="p-6 border-b border-[#E8E4E0]">
          <div className="flex gap-4">
            <img
              src={`https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%60Modern%20property%20interior%20in%20Rome%20$%7Bproperty.zone%7D%20with%20contemporary%20design%2C%20natural%20lighting%2C%20elegant%20furnishing%2C%20Italian%20architectural%20style%60%29%7D&width=120&height=80&seq=${property.id}&orientation=landscape`}
              alt={property.title}
              className="w-20 h-16 object-cover object-top rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#3D2817] text-lg leading-tight mb-1">
                {property.title}
              </h3>
              <p className="text-sm text-[#5C4B42] mb-2 flex items-center">
                <i className="ri-map-pin-line mr-1 text-[#C9A876]"></i>
                {property.zone}, Roma
              </p>
              <div className="text-xl font-bold text-[#D97860]">
                {formatPrice(property.price, property.type)}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-[#F9F6F3] rounded-full text-sm font-medium text-[#3D2817] mb-3">
              <i className="ri-shield-check-line mr-2 text-[#C9A876]"></i>
              Contatto Diretto - 0% Commissioni
            </div>
            <p className="text-sm text-[#5C4B42]">
              Contatta direttamente il proprietario senza intermediari
            </p>
          </div>

          <div className="space-y-3">
            {/* WhatsApp Contact */}
            <button
              onClick={handleWhatsAppContact}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors cursor-pointer"
            >
              <i className="ri-whatsapp-line text-xl"></i>
              <span className="font-semibold">Contatta su WhatsApp</span>
            </button>

            {/* Email Contact */}
            <button
              onClick={handleEmailContact}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors cursor-pointer"
            >
              <i className="ri-mail-line text-xl"></i>
              <span className="font-semibold">Invia Email</span>
            </button>

            {/* Phone Contact */}
            <button
              onClick={handlePhoneContact}
              className="w-full flex items-center justify-center space-x-3 p-4 bg-[#C9A876] text-white rounded-lg hover:bg-[#B8956A] transition-colors cursor-pointer"
            >
              <i className="ri-phone-line text-xl"></i>
              <span className="font-semibold">Chiama Ora</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-[#F9F6F3] rounded-lg">
            <div className="flex items-start space-x-3">
              <i className="ri-information-line text-[#C9A876] mt-0.5"></i>
              <div className="text-sm text-[#5C4B42]">
                <p className="font-medium mb-1">Contatto diretto garantito</p>
                <p>Parla direttamente con il proprietario senza intermediari. Nessuna commissione aggiuntiva.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Business activities list - UNIFIED with hero section
const businessActivities = [
  'Agenzia di viaggi e turismo', 'Agenzia immobiliare', 'Agenzia mediazione creditizia', 'Agriturismo',
  'Alimentari – Gastronomia', 'Armeria', 'Autolavaggio', 'Autorimessa', 'Azienda agricola', 'Banco mercato',
  'Bar', 'Bed & Breakfast', 'Birreria – Pub', 'Campeggio', 'Cartoleria – Copisteria', 'Centro benessere',
  'Centro estetico', 'Centro riparazioni', 'Cocktail bar', 'Colorificio – Prodotti edili', 'Concessionaria',
  'Discoteca – Night club', 'Edicola', 'Enoteca – Wine bar', 'Erboristeria', 'Falegnameria', 'Farmacia',
  'Ferramenta – Bricolage', 'Fioraio', 'Gelateria', 'Gioielleria – Orologeria', 'Gommista', 'Hotel',
  'Idraulica', 'Impianto sportivo', 'Internet point – Phone center', 'Lavanderia – Tintoria', 'Libreria',
  'Ludoteca – Asilo nido', 'Macelleria', 'Merceria', 'Minimarket', 'Negozio di Musica – Strumenti',
  'Negozio di Ricambi e accessori', 'Negozio di abbigliamento', 'Negozio di articoli da regalo',
  'Negozio di articoli sanitari', 'Negozio di caccia e pesca', 'Negozio di calzature', 'Negozio di casalinghi',
  'Negozio di cellulari e telefonia', 'Negozio di elettronica – Informatica', 'Negozio di frutta e verdura',
  'Negozio di giocattoli – Videogames', 'Negozio di mobili e arredamento', 'Negozio di profumi e cosmetica',
  'Negozio di tatuaggi e piercing', 'Negozio di toelettatura', 'Officina – Carrozzeria', 'Ottica – Foto',
  'Palestra', 'Panificio', 'Paninoteca – Burger bar', 'Parrucchiere – Barbiere', 'Pasticceria', 'Pastificio',
  'Pescheria', 'Pizzeria', 'Ristorante', 'Rosticceria – Pizza al taglio', 'Sala giochi e scommesse',
  'Scuola – Corsi', 'Stabilimento balneare', 'Stazione di servizio', 'Supermercato', 'Tabaccheria',
  'Tavola calda', 'Altro'
];

// Property categories matching hero section EXACTLY
const propertyCategories = {
  'Case-Appartamenti': {
    'Appartamento': [
      'Monolocale',
      'Bilocale', 
      'Trilocale',
      'Quadrilocale',
      '5 locali o più / Loft'
    ],
    'Villa': [],
    'Villetta': [],
    'Casa indipendente': [],
    'Rustico / Casale': [],
    'Palazzo / Stabile': [],
    'Attico / Mansarda': [],
    'Loft / Open space': []
  },
  'Commerciale': {
    'Negozio commerciale': [],
    'Laboratorio': [],
    'Attività/Licenza commerciale': []
  },
  'Ufficio': {},
  'Garage-Posti auto': {},
  'Magazzini-Depositi': {},
  'Capannoni': {},
  'Terreni': {
    'Terreno edificabile': [],
    'Terreno agricolo': [],
    'Terreno industriale': [],
    'Terreno commerciale': []
  },
  'Nuove Costruzioni': {
    'Appartamento': [],
    'Villa': [],
    'Villetta': [],
    'Ufficio': [],
    'Negozio': []
  }
};

// Category-specific filter options
const filterOptions = {
  condition: ['Nuovo', 'Eccellente', 'Buono', 'Ristrutturato', 'Da ristrutturare'],
  energyClass: ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
  features: ['Balcone', 'Terrazza', 'Giardino', 'Parcheggio', 'Ascensore', 'Cantina', 'Soffitta', 'Camino'],
  visibility: ['Alta', 'Media', 'Bassa'],
  commercialType: ['Negozio', 'Laboratorio', 'Showroom', 'Magazzino'],
  officeType: ['Singolo', 'Open space', 'Condiviso'],
  services: ['Reception', 'Pulizie', 'Sicurezza', 'Internet', 'Aria condizionata', 'Riscaldamento'],
  garageType: ['Box singolo', 'Box doppio', 'Posto auto coperto', 'Posto auto scoperto'],
  security: ['Videosorveglianza', 'Cancello automatico', 'Custode', 'Allarme'],
  access: ['24h', 'Orari limitati', 'Solo giorno'],
  landType: ['Edificabile', 'Agricolo', 'Industriale', 'Commerciale'],
  buildingRights: ['Residenziale', 'Commerciale', 'Industriale', 'Misto'],
  utilities: ['Acqua', 'Elettricità', 'Gas', 'Fognature', 'Telefono', 'Internet']
};

// Zone Selection Component - UNIFIED with hero section
const ZoneSelector = ({ selectedZones, onZonesChange }: { 
  selectedZones: string[], 
  onZonesChange: (zones: string[]) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMacroZones, setExpandedMacroZones] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [zoneSearch, setZoneSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const toggleMacroZone = (macroZone: string) => {
    const newExpanded = new Set(expandedMacroZones);
    if (newExpanded.has(macroZone)) {
      newExpanded.delete(macroZone);
    } else {
      newExpanded.add(macroZone);
    }
    setExpandedMacroZones(newExpanded);
  };

  const handleZoneToggle = (zone: string) => {
    const newZones = selectedZones.includes(zone)
      ? selectedZones.filter(z => z !== zone)
      : [...selectedZones, zone];
    onZonesChange(newZones);
  };

  const handleMacroZoneToggle = (macroZone: string) => {
    const subZones = romeZones[macroZone as keyof typeof romeZones] || [];
    const allZonesInMacro = [macroZone, ...subZones];
    
    const allSelected = allZonesInMacro.every(zone => selectedZones.includes(zone));
    
    if (allSelected) {
      onZonesChange(selectedZones.filter(zone => !allZonesInMacro.includes(zone)));
    } else {
      onZonesChange([...new Set([...selectedZones, ...allZonesInMacro])]);
    }
  };

  const filteredMacroZones = Object.keys(romeZones).filter(macroZone => {
    if (!searchTerm) return true;
    
    if (macroZone.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    
    const subZones = romeZones[macroZone as keyof typeof romeZones];
    return subZones.some(subZone => 
      subZone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 pr-8 border border-[#E8E4E0] rounded-md bg-white text-[#3D2817] text-sm font-medium focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 cursor-pointer text-left w-full"
      >
        {selectedZones.length === 0 ? "Zona" : `${selectedZones.length} zone selezionate`}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden" style={{ width: '500px', maxHeight: '400px' }}>
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Cerca zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97860] text-sm font-medium"
              />
            </div>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
            <button
              type="button"
              onClick={() => onZonesChange([])}
              className="w-full text-left cursor-pointer hover:bg-gray-50 p-4 text-gray-700 font-medium text-sm border-b border-gray-100"
            >
              Cancella selezione
            </button>
            {filteredMacroZones.map((macroZone) => {
              const subZones = romeZones[macroZone as keyof typeof romeZones];
              const isExpanded = expandedMacroZones.has(macroZone);
              
              return (
                <div key={macroZone} className="border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center p-4 hover:bg-gray-50">
                    <button
                      type="button"
                      onClick={() => toggleMacroZone(macroZone)}
                      className="mr-3 p-1 hover:bg-gray-200 rounded cursor-pointer flex-shrink-0"
                    >
                      <i className={`ri-arrow-right-s-line transition-transform duration-200 text-lg ${isExpanded ? 'rotate-90' : ''}`}></i>
                    </button>
                    <label className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={[macroZone, ...subZones].every(zone => selectedZones.includes(zone))}
                        onChange={() => handleMacroZoneToggle(macroZone)}
                        className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm leading-relaxed break-words">{macroZone}</div>
                        <div className="text-xs text-gray-500 font-medium">({subZones.length} zone)</div>
                      </div>
                    </label>
                  </div>

                  {isExpanded && (
                    <div className="bg-gray-50">
                      {subZones.map((subZone) => (
                        <label
                          key={subZone}
                          className="flex items-center space-x-3 p-4 pl-16 hover:bg-gray-100 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedZones.includes(subZone)}
                            onChange={() => handleZoneToggle(subZone)}
                            className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2 flex-shrink-0"
                          />
                          <span className="text-gray-700 font-medium text-sm leading-relaxed break-words flex-1">{subZone}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-select dropdown component
const MultiSelectDropdown = ({ 
  options, 
  selected, 
  onChange, 
  placeholder,
  searchable = false 
}: {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  searchable?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable 
    ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const handleToggle = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    onChange(selected.length === filteredOptions.length ? [] : [...filteredOptions]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] font-medium focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-left flex items-center justify-between text-sm"
      >
        <span className="truncate">
          {selected.length === 0 ? placeholder : `${selected.length} selezionati`}
        </span>
        <i className={`ri-arrow-down-s-line transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E4E0] rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
          {searchable && (
            <div className="p-4 border-b border-[#E8E4E0]">
              <input
                type="text"
                placeholder="Cerca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-3 border border-[#E8E4E0] rounded-lg text-[#3D2817] font-medium focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm"
              />
            </div>
          )}

          <div className="p-3 border-b border-[#E8E4E0]">
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-full text-left p-3 hover:bg-[#F9F6F3] rounded text-sm font-semibold text-[#3D2817] cursor-pointer"
            >
              {selected.length === filteredOptions.length ? 'Deseleziona tutto' : 'Seleziona tutto'}
            </button>
          </div>

          <div className="overflow-y-auto max-h-48">
            {filteredOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-3 hover:bg-[#F9F6F3] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => handleToggle(option)}
                  className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                />
                <span className="text-sm font-medium text-[#3D2817] leading-relaxed">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced PropertyCard component with contact modal trigger and favorites functionality
const EnhancedPropertyCard = ({ property, onContactClick }: { 
  property: any, 
  onContactClick: (property: any) => void 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check if property is saved on component mount
  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setIsFavorite(savedProperties.includes(property.id));
  }, [property.id]);

  // Toggle favorite status
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in (you can implement your own auth check here)
    const isLoggedIn = localStorage.getItem('userToken') || localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
      // Show login modal if user is not logged in
      setShowLoginModal(true);
      return;
    }
    
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedProperties = savedProperties.filter((id: number) => id !== property.id);
      localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedProperties = [...savedProperties, property.id];
      localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
      setIsFavorite(true);
    }
  };

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

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContactClick(property);
  };

  // Login Modal Component
  const LoginModal = () => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setShowLoginModal(false);
        }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowLoginModal(false);
        }
      };

      if (showLoginModal) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'unset';
      };
    }, [showLoginModal]);

    if (!showLoginModal) return null;

    const handleLogin = () => {
      // Simulate login - you can implement real authentication here
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userToken', 'demo-token-' + Date.now());
      setShowLoginModal(false);
      
      // Now save the property
      const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      const updatedProperties = [...savedProperties, property.id];
      localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
      setIsFavorite(true);
    };

    const handleRegister = () => {
      // Simulate registration - you can implement real registration here
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userToken', 'demo-token-' + Date.now());
      setShowLoginModal(false);
      
      // Now save the property
      const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      const updatedProperties = [...savedProperties, property.id];
      localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
      setIsFavorite(true);
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="bg-white rounded-xl max-w-md w-full shadow-2xl"
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-[#E8E4E0] text-center">
            <div className="w-16 h-16 bg-[#D97860]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-line text-2xl text-[#D97860]"></i>
            </div>
            <h2 className="text-xl font-bold text-[#3D2817] mb-2">Save Your Favorite Properties</h2>
            <p className="text-sm text-[#5C4B42]">
              Create an account to save properties and access them from any device
            </p>
          </div>

          {/* Property Preview */}
          <div className="p-4 bg-[#F9F6F3] border-b border-[#E8E4E0]">
            <div className="flex items-center space-x-3">
              <img
                src={`https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%60Modern%20property%20interior%20in%20Rome%20$%7Bproperty.zone%7D%20with%20contemporary%20design%2C%20natural%20lighting%2C%20elegant%20furnishing%2C%20Italian%20architectural%20style%60%29%7D&width=60&height=45&seq=${property.id}&orientation=landscape`}
                alt={property.title}
                className="w-12 h-9 object-cover object-top rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#3D2817] text-sm truncate">
                  {property.title}
                </h3>
                <p className="text-xs text-[#5C4B42]">
                  {property.zone}, Roma
                </p>
              </div>
              <div className="text-sm font-bold text-[#D97860]">
                {formatPrice(property.price, property.type)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 space-y-3">
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors font-semibold cursor-pointer"
            >
              Login to Save
            </button>
            
            <button
              onClick={handleRegister}
              className="w-full px-6 py-3 border border-[#D97860] text-[#D97860] rounded-lg hover:bg-[#D97860]/5 transition-colors font-semibold cursor-pointer"
            >
              Create Account
            </button>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full px-6 py-2 text-[#5C4B42] hover:text-[#3D2817] transition-colors text-sm cursor-pointer"
            >
              Maybe Later
            </button>
          </div>

          {/* Benefits */}
          <div className="px-6 pb-6">
            <div className="bg-[#F9F6F3] rounded-lg p-4">
              <h4 className="font-semibold text-[#3D2817] text-sm mb-2">Why create an account?</h4>
              <ul className="space-y-1 text-xs text-[#5C4B42]">
                <li className="flex items-center">
                  <i className="ri-check-line text-[#C9A876] mr-2"></i>
                  Save unlimited properties
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-[#C9A876] mr-2"></i>
                  Access from any device
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-[#C9A876] mr-2"></i>
                  Get property alerts
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-[#C9A876] mr-2"></i>
                  Direct owner contact
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Professional mobile-optimized card layout
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-[#E8E4E0] overflow-hidden transition-all duration-300 hover:border-[#D97860]/30">
        {/* Mobile: Vertical Layout, Desktop: Horizontal Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">
          {/* Image Section - Mobile Optimized */}
          <div className="w-full lg:w-[40%] flex-shrink-0">
            <div className="relative group">
              <img
                src={propertyImages[currentImageIndex]}
                alt={`${property.title} in ${property.zone}, Rome`}
                className="w-full h-48 sm:h-56 lg:h-72 object-cover object-top rounded-lg"
              />
              
              {/* Property Type Badge */}
              <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
                <span className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold shadow-sm ${
                  property.type === 'buy' 
                    ? 'bg-[#C9A876] text-white' 
                    : 'bg-[#D97860] text-white'
                }`}>
                  {property.type === 'buy' ? 'Vendita' : 'Affitto'}
                </span>
              </div>
              
              {/* Property Category Badge */}
              <div className="absolute top-3 lg:top-4 right-3 lg:right-4">
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
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 lg:w-8 lg:h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
                  >
                    <i className="ri-arrow-left-line text-sm lg:text-base text-[#3D2817]"></i>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 lg:w-8 lg:h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
                  >
                    <i className="ri-arrow-right-line text-sm lg:text-base text-[#3D2817]"></i>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {currentImageIndex + 1}/{propertyImages.length}
                  </div>

                  {/* Image Dots Indicator */}
                  <div className="absolute bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {propertyImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-colors duration-200 cursor-pointer ${
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

          {/* Info Section - Mobile Optimized */}
          <div className="w-full lg:w-[60%] flex flex-col justify-between">
            {/* Top Section: Price and Title */}
            <div>
              {/* Price - Mobile Optimized */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D97860] mb-2 lg:mb-3 leading-tight">
                {formatPrice(property.price, property.type)}
              </div>

              {/* Title - Mobile Optimized */}
              <div className="block mb-2 lg:mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-[#3D2817] leading-tight">
                  {property.title}
                </h3>
              </div>

              {/* Address/Zone - Mobile Optimized */}
              <p className="text-sm text-[#5C4B42] mb-3 lg:mb-4 flex items-center">
                <i className="ri-map-pin-line mr-2 text-[#C9A876]"></i>
                {property.address || `${property.zone}, Roma`}
              </p>

              {/* Specs Row - Mobile Optimized */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-sm text-[#5C4B42] mb-3 lg:mb-4">
                <div className="flex items-center">
                  <i className="ri-home-4-line mr-2 text-[#C9A876] w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">{property.sqm} m²</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-door-open-line mr-2 text-[#C9A876] w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">{property.rooms} locali</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-drop-line mr-2 text-[#C9A876] w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">{property.bathrooms} bagni</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-building-line mr-2 text-[#C9A876] w-4 h-4 flex items-center justify-center"></i>
                  <span className="font-medium">Piano {property.floor}</span>
                </div>
              </div>

              {/* Description - Mobile Optimized */}
              <p className="text-sm text-[#5C4B42] mb-4 lg:mb-6 line-clamp-2 leading-relaxed">
                {getPropertyDescription()}
              </p>
            </div>

            {/* Bottom Section: Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button 
                onClick={handleContactClick}
                className="w-full sm:flex-1 lg:w-auto lg:flex-none px-4 lg:px-6 py-2.5 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors text-sm font-semibold cursor-pointer whitespace-nowrap"
              >
                Contatta Proprietario
              </button>
              
              <div className="flex gap-2 sm:gap-3">
                <button 
                  onClick={handleFavoriteToggle}
                  className={`flex-1 sm:flex-none p-2.5 border rounded-lg transition-colors cursor-pointer ${
                    isFavorite 
                      ? 'border-[#D97860] text-[#D97860] bg-[#D97860]/10' 
                      : 'border-[#E8E4E0] text-[#D97860] hover:bg-[#F9F6F3] hover:border-[#D97860]'
                  }`}
                >
                  <i className={`${isFavorite ? 'ri-heart-fill' : 'ri-heart-line'} w-5 h-5 flex items-center justify-center`}></i>
                </button>
                <button className="flex-1 sm:flex-none px-3 lg:px-4 py-2.5 border border-[#E8E4E0] text-[#5C4B42] rounded-lg hover:bg-[#F9F6F3] transition-colors text-sm font-medium cursor-pointer whitespace-nowrap">
                  <i className="ri-share-line mr-1 lg:mr-2"></i>
                  <span className="hidden sm:inline">Condividi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal />
    </>
  );
};

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [contactModalProperty, setContactModalProperty] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Initialize filters from URL params - FIXED to match hero parameters
  const [filters, setFilters] = useState<FilterState>({
    propertyType: searchParams.get('type') || '',
    mainCategory: searchParams.get('mainCategory') || '',
    subCategory: searchParams.get('subCategory') || '',
    subSubCategory: searchParams.get('subSubCategory') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    surfaceMin: searchParams.get('surfaceMin') || '',
    surfaceMax: searchParams.get('surfaceMax') || '',
    rooms: searchParams.get('rooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    floor: searchParams.get('floor') || '',
    condition: searchParams.get('condition') || '',
    energyClass: searchParams.get('energyClass') || '',
    features: searchParams.get('features')?.split(',') || [],
    zone: searchParams.get('zone') || searchParams.get('location') || '',
    zones: searchParams.get('zones')?.split(',') || [],
    businessActivities: searchParams.get('businessActivities')?.split(',') || [],
    visibility: searchParams.get('visibility') || '',
    commercialType: searchParams.get('commercialType') || '',
    officeType: searchParams.get('officeType') || '',
    services: searchParams.get('services')?.split(',') || [],
    garageType: searchParams.get('garageType') || '',
    security: searchParams.get('security')?.split(',') || [],
    access: searchParams.get('access') || '',
    landType: searchParams.get('landType') || '',
    buildingRights: searchParams.get('buildingRights')?.split(',') || [],
    utilities: searchParams.get('utilities')?.split(',') || [],
    sortBy: searchParams.get('sort') || 'newest',
    viewType: searchParams.get('view') || 'grid'
  });

  // Get category-specific price ranges - FIXED: Dynamic ranges based on rent/buy
  const getPriceRanges = () => {
    if (filters.propertyType === 'rent') {
      if (filters.mainCategory === 'Case-Appartamenti') {
        return [
          { value: '0-800', label: '€0 - €800' },
          { value: '800-1200', label: '€800 - €1.200' },
          { value: '1200-1800', label: '€1.200 - €1.800' },
          { value: '1800-2500', label: '€1.800 - €2.500' },
          { value: '2500-3500', label: '€2.500 - €3.500' },
          { value: '3500-', label: '€3.500+' }
        ];
      } else if (filters.mainCategory === 'Commerciale') {
        return [
          { value: '0-1000', label: '€0 - €1.000' },
          { value: '1000-2000', label: '€1.000 - €2.000' },
          { value: '2000-3500', label: '€2.000 - €3.500' },
          { value: '3500-5000', label: '€3.500 - €5.000' },
          { value: '5000-', label: '€5.000+' }
        ];
      } else if (filters.mainCategory === 'Ufficio') {
        return [
          { value: '0-800', label: '€0 - €800' },
          { value: '800-1500', label: '€800 - €1.500' },
          { value: '1500-2500', label: '€1.500 - €2.500' },
          { value: '2500-4000', label: '€2.500 - €4.000' },
          { value: '4000-', label: '€4.000+' }
        ];
      } else if (filters.mainCategory === 'Garage-Posti auto') {
        return [
          { value: '0-100', label: '€0 - €100' },
          { value: '100-200', label: '€100 - €200' },
          { value: '200-350', label: '€200 - €350' },
          { value: '350-500', label: '€350 - €500' },
          { value: '500-', label: '€500+' }
        ];
      } else {
        // Default rent ranges
        return [
          { value: '0-500', label: '€0 - €500' },
          { value: '500-1000', label: '€500 - €1.000' },
          { value: '1000-1500', label: '€1.000 - €1.500' },
          { value: '1500-2500', label: '€1.500 - €2.500' },
          { value: '2500-', label: '€2.500+' }
        ];
      }
    } else if (filters.propertyType === 'buy') {
      if (filters.mainCategory === 'Case-Appartamenti') {
        return [
          { value: '0-200000', label: '€0 - €200k' },
          { value: '200000-400000', label: '€200k - €400k' },
          { value: '400000-600000', label: '€400k - €600k' },
          { value: '600000-900000', label: '€600k - €900k' },
          { value: '900000-1500000', label: '€900k - €1.5M' },
          { value: '1500000-', label: '€1.5M+' }
        ];
      } else if (filters.mainCategory === 'Commerciale') {
        return [
          { value: '0-150000', label: '€0 - €150k' },
          { value: '150000-300000', label: '€150k - €300k' },
          { value: '300000-600000', label: '€300k - €600k' },
          { value: '600000-1000000', label: '€600k - €1M' },
          { value: '1000000-', label: '€1M+' }
        ];
      } else if (filters.mainCategory === 'Ufficio') {
        return [
          { value: '0-200000', label: '€0 - €200k' },
          { value: '200000-400000', label: '€200k - €400k' },
          { value: '400000-700000', label: '€400k - €700k' },
          { value: '700000-1200000', label: '€700k - €1.2M' },
          { value: '1200000-', label: '€1.2M+' }
        ];
      } else if (filters.mainCategory === 'Garage-Posti auto') {
        return [
          { value: '0-20000', label: '€0 - €20k' },
          { value: '20000-40000', label: '€20k - €40k' },
          { value: '40000-70000', label: '€40k - €70k' },
          { value: '70000-100000', label: '€70k - €100k' },
          { value: '100000-', label: '€100k+' }
        ];
      } else if (filters.mainCategory === 'Terreni') {
        return [
          { value: '0-50000', label: '€0 - €50k' },
          { value: '50000-150000', label: '€50k - €150k' },
          { value: '150000-300000', label: '€150k - €300k' },
          { value: '300000-500000', label: '€300k - €500k' },
          { value: '500000-', label: '€500k+' }
        ];
      } else {
        // Default buy ranges
        return [
          { value: '0-250000', label: '€0 - €250k' },
          { value: '250000-500000', label: '€250k - €500k' },
          { value: '500000-800000', label: '€500k - €800k' },
          { value: '800000-1200000', label: '€800k - €1.2M' },
          { value: '1200000-', label: '€1.2M+' }
        ];
      }
    }
    
    // Default ranges when no property type is selected
    return [
      { value: '0-500', label: '€0 - €500' },
      { value: '500-1000', label: '€500 - €1.000' },
      { value: '1000-2000', label: '€1.000 - €2.000' },
      { value: '2000-3000', label: '€2.000 - €3.000' },
      { value: '3000-', label: '€3.000+' }
    ];
  };

  // Get subcategories based on main category
  const getSubCategories = () => {
    if (!filters.mainCategory) return [];
    return Object.keys(propertyCategories[filters.mainCategory as keyof typeof propertyCategories] || {});
  };

  const getSubSubCategories = () => {
    if (!filters.mainCategory || !filters.subCategory) return [];
    const mainCat = propertyCategories[filters.mainCategory as keyof typeof propertyCategories];
    if (!mainCat) return [];
    return mainCat[filters.subCategory as keyof typeof mainCat] || [];
  };

  // FIXED Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    // Property type filter (rent/buy) - FIXED
    if (filters.propertyType) {
      if (filters.propertyType === 'rent' && property.type !== 'rent') return false;
      if (filters.propertyType === 'buy' && property.type !== 'buy') return false;
    }
    
    // Main category filter - FIXED
    if (filters.mainCategory && property.category !== filters.mainCategory) return false;
    
    // Sub category filter - FIXED
    if (filters.subCategory && property.subCategory !== filters.subCategory) return false;
    
    // Sub-sub category filter - FIXED
    if (filters.subSubCategory && property.subSubCategory !== filters.subSubCategory) return false;
    
    // Price filter - FIXED
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && property.price > parseInt(filters.priceMax)) return false;
    
    // Surface filter - FIXED
    if (filters.surfaceMin && property.surface && property.surface < parseInt(filters.surfaceMin)) return false;
    if (filters.surfaceMax && property.surface && property.surface > parseInt(filters.surfaceMax)) return false;
    
    // Rooms filter - FIXED
    if (filters.rooms && property.rooms !== parseInt(filters.rooms)) return false;
    
    // Bathrooms filter - FIXED
    if (filters.bathrooms && property.bathrooms !== parseInt(filters.bathrooms)) return false;
    
    // Zone filter - FIXED to use unified romeZones structure
    const selectedZones = filters.zones.length > 0 ? filters.zones : (filters.zone ? [filters.zone] : []);
    if (selectedZones.length > 0) {
      const propertyInSelectedZone = selectedZones.some(selectedZone => {
        // Direct zone match
        if (property.zone === selectedZone) return true;
        
        // Check if selected zone is a macro zone and property is in any of its sub-zones
        const subZones = romeZones[selectedZone as keyof typeof romeZones];
        if (subZones && subZones.includes(property.zone)) return true;
        
        // Check if property zone is a macro zone and selected zone is one of its sub-zones
        Object.entries(romeZones).forEach(([macroZone, subZonesList]) => {
          if (property.zone === macroZone && subZonesList.includes(selectedZone)) {
            return true;
          }
        });
        
        return false;
      });
      
      if (!propertyInSelectedZone) return false;
    }
    
    // Business activities filter - FIXED
    if (filters.businessActivities.length > 0 && property.businessActivities) {
      const hasMatchingActivity = filters.businessActivities.some(activity =>
        property.businessActivities?.includes(activity)
      );
      if (!hasMatchingActivity) return false;
    }
    
    // Condition filter - FIXED
    if (filters.condition && property.condition !== filters.condition) return false;
    
    // Energy class filter - FIXED
    if (filters.energyClass && property.energyClass !== filters.energyClass) return false;
    
    // Features filter - FIXED
    if (filters.features.length > 0 && property.features) {
      const hasAllFeatures = filters.features.every(feature =>
        property.features?.includes(feature)
      );
      if (!hasAllFeatures) return false;
    }
    
    // Commercial-specific filters
    if (filters.visibility && property.visibility !== filters.visibility) return false;
    if (filters.commercialType && property.commercialType !== filters.commercialType) return false;
    
    // Office-specific filters
    if (filters.officeType && property.officeType !== filters.officeType) return false;
    if (filters.services.length > 0 && property.services) {
      const hasAllServices = filters.services.every(service =>
        property.services?.includes(service)
      );
      if (!hasAllServices) return false;
    }
    
    // Garage-specific filters
    if (filters.garageType && property.garageType !== filters.garageType) return false;
    if (filters.security.length > 0 && property.security) {
      const hasAllSecurity = filters.security.every(security =>
        property.security?.includes(security)
      );
      if (!hasAllSecurity) return false;
    }
    if (filters.access && property.access !== filters.access) return false;
    
    // Land-specific filters
    if (filters.buildingRights.length > 0 && property.buildingRights) {
      const hasAllRights = filters.buildingRights.every(right =>
        property.buildingRights?.includes(right)
      );
      if (!hasAllRights) return false;
    }
    if (filters.utilities.length > 0 && property.utilities) {
      const hasAllUtilities = filters.utilities.every(utility =>
        property.utilities?.includes(utility)
      );
      if (!hasAllUtilities) return false;
    }
    
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'surface-asc':
        return (a.surface || a.sqm) - (b.surface || b.sqm);
      case 'surface-desc':
        return (b.surface || b.sqm) - (a.surface || a.sqm);
      case 'zone-asc':
        return a.zone.localeCompare(b.zone);
      case 'zone-desc':
        return b.zone.localeCompare(a.zone);
      case 'oldest':
        return a.id - b.id;
      default: // newest
        return b.id - a.id;
    }
  });

  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset subcategory when main category changes
    if (key === 'mainCategory') {
      newFilters.subCategory = '';
      newFilters.subSubCategory = '';
      newFilters.businessActivities = [];
    }
    
    // Reset sub-sub category when sub category changes
    if (key === 'subCategory') {
      newFilters.subSubCategory = '';
      // Auto-populate commercial activities for business license category
      if (value === 'Attività/Licenza commerciale') {
        newFilters.businessActivities = [];
      } else {
        newFilters.businessActivities = [];
      }
    }
    
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      propertyType: '',
      mainCategory: '',
      subCategory: '',
      subSubCategory: '',
      priceMin: '',
      priceMax: '',
      surfaceMin: '',
      surfaceMax: '',
      rooms: '',
      bathrooms: '',
      floor: '',
      condition: '',
      energyClass: '',
      features: [],
      zone: '',
      zones: [],
      businessActivities: [],
      visibility: '',
      commercialType: '',
      officeType: '',
      services: [],
      garageType: '',
      security: [],
      access: '',
      landType: '',
      buildingRights: [],
      utilities: [],
      sortBy: 'newest',
      viewType: 'grid'
    });
  };

  const applyFilters = () => {
    setShowFiltersModal(false);
    // Update URL with new filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (value && !Array.isArray(value)) {
        params.set(key, value);
      }
    });
    navigate(`/search-results?${params.toString()}`, { replace: true });
  };

  const closeModal = () => {
    setShowFiltersModal(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Contact modal handlers
  const handleContactModalOpen = (property: any) => {
    setContactModalProperty(property);
  };

  const handleContactModalClose = () => {
    setContactModalProperty(null);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (showFiltersModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showFiltersModal]);

  // Count active filters
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sortBy' || key === 'viewType') return false;
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '';
  }).length;

  // Check if we should show business activities - FIXED
  const shouldShowBusinessActivities = filters.mainCategory === 'Commerciale' && 
                                      filters.subCategory === 'Attività/Licenza commerciale';

  // Check if we should show category-specific filters
  const isResidential = filters.mainCategory === 'Case-Appartamenti';
  const isCommercial = filters.mainCategory === 'Commerciale';
  const isOffice = filters.mainCategory === 'Ufficio';
  const isGarage = filters.mainCategory === 'Garage-Posti auto';
  const isLand = filters.mainCategory === 'Terreni';

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Header />
      
      {/* Enhanced Filter Bar - Mobile Optimized */}
      <div className="bg-white border-b border-[#E8E4E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Main Filter Row - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Property Type Filter - Mobile Enhanced */}
            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-xs font-medium text-[#5C4B42] mb-1">Tipo</label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full sm:min-w-[100px] px-3 py-2.5 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] text-sm focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors"
              >
                <option value="">Tutti</option>
                <option value="rent">Affitto</option>
                <option value="buy">Vendita</option>
              </select>
            </div>

            {/* Zone Filter - Mobile Enhanced */}
            <div className="flex flex-col w-full sm:w-auto sm:min-w-[200px]">
              <label className="text-xs font-medium text-[#5C4B42] mb-1">Zona</label>
              <ZoneSelector 
                selectedZones={filters.zones.length > 0 ? filters.zones : (filters.zone ? [filters.zone] : [])}
                onZonesChange={(zones) => handleFilterChange('zones', zones)}
              />
            </div>

            {/* Price Filter - Mobile Enhanced */}
            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-xs font-medium text-[#5C4B42] mb-1">Prezzo</label>
              <select
                value={`${filters.priceMin}-${filters.priceMax}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-');
                  handleFilterChange('priceMin', min || '');
                  handleFilterChange('priceMax', max || '');
                }}
                className="w-full sm:min-w-[140px] px-3 py-2.5 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] text-sm focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors"
              >
                <option value="-">Tutti i prezzi</option>
                {getPriceRanges().map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter - Mobile Enhanced */}
            <div className="flex flex-col w-full sm:w-auto">
              <label className="text-xs font-medium text-[#5C4B42] mb-1">Ordina</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full sm:min-w-[130px] px-3 py-2.5 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] text-sm focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors"
              >
                <option value="newest">Più recenti</option>
                <option value="oldest">Meno recenti</option>
                <option value="price-asc">Prezzo ↑</option>
                <option value="price-desc">Prezzo ↓</option>
                <option value="surface-asc">Superficie ↑</option>
                <option value="surface-desc">Superficie ↓</option>
                <option value="zone-asc">Zona A-Z</option>
                <option value="zone-desc">Zona Z-A</option>
              </select>
            </div>

            {/* Mobile Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto sm:flex-1 sm:justify-end">
              {/* All Filters Button - Mobile Enhanced */}
              <button
                onClick={() => setShowFiltersModal(true)}
                className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg hover:bg-[#F9F6F3] transition-colors whitespace-nowrap text-sm text-[#3D2817] cursor-pointer w-full sm:w-auto"
              >
                <i className="ri-filter-line text-[#5C4B42]"></i>
                <span className="font-medium">Tutti i filtri</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#D97860] text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* View Toggle & Map - Mobile Enhanced */}
              <div className="flex gap-2">
                {/* View Toggle */}
                <div className="flex border border-[#E8E4E0] rounded-lg overflow-hidden flex-1 sm:flex-none">
                  <button
                    onClick={() => handleFilterChange('viewType', 'grid')}
                    className={`px-3 py-2.5 sm:py-2 text-sm cursor-pointer transition-colors flex-1 sm:flex-none ${
                      filters.viewType === 'grid' 
                        ? 'bg-[#D97860] text-white' 
                        : 'bg-white text-[#3D2817] hover:bg-[#F9F6F3]'
                    }`}
                    title="Vista griglia"
                  >
                    <i className="ri-grid-line"></i>
                  </button>
                  <button
                    onClick={() => handleFilterChange('viewType', 'list')}
                    className={`px-3 py-2.5 sm:py-2 text-sm cursor-pointer transition-colors flex-1 sm:flex-none ${
                      filters.viewType === 'list' 
                        ? 'bg-[#D97860] text-white' 
                        : 'bg-white text-[#3D2817] hover:bg-[#F9F6F3]'
                    }`}
                    title="Vista lista"
                  >
                    <i className="ri-list-unordered"></i>
                  </button>
                </div>

                {/* Map Toggle - Mobile Enhanced */}
                <button
                  onClick={() => setShowMap(true)}
                  className="lg:hidden flex items-center justify-center space-x-2 px-3 py-2.5 bg-[#C9A876] text-white rounded-lg hover:bg-[#B8956A] transition-colors whitespace-nowrap text-sm cursor-pointer flex-1 sm:flex-none"
                >
                  <i className="ri-map-pin-line"></i>
                  <span className="hidden xs:inline">Mappa</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters & Clear Row - Mobile Optimized */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 pt-3 border-t border-[#E8E4E0] gap-3 sm:gap-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span className="text-sm text-[#5C4B42] font-medium">Filtri attivi:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.propertyType && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#D97860] text-white">
                      {filters.propertyType === 'rent' ? 'Affitto' : 'Vendita'}
                      <button
                        onClick={() => handleFilterChange('propertyType', '')}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  )}
                  {filters.zones.length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#D97860] text-white">
                      {filters.zones.length} zone
                      <button
                        onClick={() => handleFilterChange('zones', [])}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  )}
                  {(filters.priceMin || filters.priceMax) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#D97860] text-white">
                      Prezzo: €{filters.priceMin || '0'} - €{filters.priceMax || '∞'}
                      <button
                        onClick={() => {
                          handleFilterChange('priceMin', '');
                          handleFilterChange('priceMax', '');
                        }}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={clearFilters}
                className="text-[#D97860] hover:text-[#C86B54] text-sm font-medium cursor-pointer transition-colors self-start sm:self-auto"
              >
                Cancella tutti
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content - Mobile Optimized */}
      <main className="py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Properties List - Mobile Optimized */}
            <div className="w-full lg:w-[60%] min-w-0">
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-[#3D2817] mb-2">
                  Risultati della ricerca
                </h1>
                <p className="text-sm sm:text-base text-[#5C4B42]">
                  {sortedProperties.length} proprietà trovate
                  {filters.mainCategory && ` in ${filters.mainCategory}`}
                  {filters.zones.length > 0 && ` nelle zone selezionate`}
                </p>
              </div>

              {sortedProperties.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                  {sortedProperties.map((property) => (
                    <EnhancedPropertyCard 
                      key={property.id} 
                      property={property} 
                      onContactClick={handleContactModalOpen}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 px-4">
                  <i className="ri-search-line text-4xl sm:text-6xl text-[#C9A876] mb-4"></i>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#3D2817] mb-2">
                    Nessun risultato trovato
                  </h3>
                  <p className="text-sm sm:text-base text-[#5C4B42] mb-6">
                    Prova a modificare i filtri di ricerca per trovare più proprietà.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto px-6 py-3 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors cursor-pointer"
                  >
                    Cancella tutti i filtri
                  </button>
                </div>
              )}
            </div>

            {/* Map - Desktop Only (Hidden on Mobile) */}
            <div className="hidden lg:block lg:w-[40%] flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl shadow-lg overflow-hidden border border-[#E8E4E0]" style={{ height: 'calc(100vh - 120px)' }}>
                <div className="h-full relative">
                  {/* Enhanced Map Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-[#E8E4E0] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-[#3D2817]">Mappa Proprietà</h3>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-[#F9F6F3] rounded-lg transition-colors cursor-pointer" title="Centra mappa">
                          <i className="ri-focus-3-line text-[#5C4B42]"></i>
                        </button>
                        <button className="p-2 hover:bg-[#F9F6F3] rounded-lg transition-colors cursor-pointer" title="Zoom completo">
                          <i className="ri-fullscreen-line text-[#5C4B42]"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-[#D97860] rounded-full"></div>
                          <span className="text-sm text-[#5C4B42] font-medium">Vendita</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-[#C9A876] rounded-full"></div>
                          <span className="text-sm text-[#5C4B42] font-medium">Affitto</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#3D2817]">
                        {sortedProperties.length} proprietà
                      </span>
                    </div>
                  </div>

                  {/* Map Container */}
                  <div className="pt-20 h-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95777.9!2d12.4964!3d41.9028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRome%2C%20Metropolitan%20City%20of%20Rome%2C%20Italy!5e0!3m2!1sen!2sus!4v1635959997999!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Rome Properties Map"
                    ></iframe>
                  </div>

                  {/* Enhanced Map Footer */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E8E4E0]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="text-sm text-[#D97860] hover:text-[#C86B54] font-medium cursor-pointer transition-colors">
                          <i className="ri-map-pin-add-line mr-1"></i>
                          Aggiungi zona
                        </button>
                        <button className="text-sm text-[#5C4B42] hover:text-[#3D2817] font-medium cursor-pointer transition-colors">
                          <i className="ri-route-line mr-1"></i>
                          Calcola percorso
                        </button>
                      </div>
                      <div className="text-xs text-[#5C4B42]">
                        Aggiornato ora
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        <ContactModal 
          property={contactModalProperty}
          isOpen={!!contactModalProperty}
          onClose={handleContactModalClose}
        />

        {/* Advanced Filters Modal - Mobile Optimized */}
        {showFiltersModal && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={handleModalClick}
          >
            <div 
              ref={modalRef}
              className="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-[#E8E4E0] p-4 sm:p-6 flex items-center justify-between z-10">
                <h2 className="text-lg sm:text-xl font-bold text-[#3D2817]">Filtri avanzati</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-[#F9F6F3] rounded-lg cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-[#5C4B42]"></i>
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                {/* Category Selection - Mobile Optimized */}
                <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <i className="ri-building-line text-[#D97860]"></i>
                    <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Categoria Immobile</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#3D2817] mb-2">
                        Categoria principale
                      </label>
                      <select
                        value={filters.mainCategory}
                        onChange={(e) => handleFilterChange('mainCategory', e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                      >
                        <option value="">Seleziona categoria</option>
                        {Object.keys(propertyCategories).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {filters.mainCategory && getSubCategories().length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Sottocategoria
                        </label>
                        <select
                          value={filters.subCategory}
                          onChange={(e) => handleFilterChange('subCategory', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Seleziona sottocategoria</option>
                          {getSubCategories().map(subCategory => (
                            <option key={subCategory} value={subCategory}>{subCategory}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {filters.subCategory && getSubSubCategories().length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Tipo specifico
                        </label>
                        <select
                          value={filters.subSubCategory}
                          onChange={(e) => handleFilterChange('subSubCategory', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Seleziona tipo</option>
                          {getSubSubCategories().map(subSubCategory => (
                            <option key={subSubCategory} value={subSubCategory}>{subSubCategory}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Business Activities - Mobile Optimized */}
                {shouldShowBusinessActivities && (
                  <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <i className="ri-store-line text-[#D97860]"></i>
                      <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Attività Commerciali</h3>
                    </div>
                    <MultiSelectDropdown
                      options={businessActivities}
                      selected={filters.businessActivities}
                      onChange={(selected) => handleFilterChange('businessActivities', selected)}
                      placeholder="Seleziona attività commerciali"
                      searchable={true}
                    />
                  </div>
                )}

                {/* Price and Surface - Mobile Optimized */}
                <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <i className="ri-money-euro-circle-line text-[#D97860]"></i>
                    <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Prezzo e Superficie</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#3D2817] mb-2">
                        Prezzo (€)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceMin}
                          onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                          className="px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceMax}
                          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                          className="px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#3D2817] mb-2">
                        Superficie (m²)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.surfaceMin}
                          onChange={(e) => handleFilterChange('surfaceMin', e.target.value)}
                          className="px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.surfaceMax}
                          onChange={(e) => handleFilterChange('surfaceMax', e.target.value)}
                          className="px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Residential-specific filters - Mobile Optimized */}
                {isResidential && (
                  <>
                    {/* Property Details */}
                    <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                        <i className="ri-home-4-line text-[#D97860]"></i>
                        <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Dettagli Immobile</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#3D2817] mb-2">
                            Bagni
                          </label>
                          <select
                            value={filters.bathrooms}
                            onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                            className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                          >
                            <option value="">Qualsiasi</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3+</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#3D2817] mb-2">
                            Piano
                          </label>
                          <select
                            value={filters.floor}
                            onChange={(e) => handleFilterChange('floor', e.target.value)}
                            className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                          >
                            <option value="">Qualsiasi</option>
                            <option value="0">Piano terra</option>
                            <option value="1-3">1-3</option>
                            <option value="4-6">4-6</option>
                            <option value="7+">7+</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#3D2817] mb-2">
                            Condizioni
                          </label>
                          <select
                            value={filters.condition}
                            onChange={(e) => handleFilterChange('condition', e.target.value)}
                            className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                          >
                            <option value="">Qualsiasi</option>
                            {filterOptions.condition.map(condition => (
                              <option key={condition} value={condition}>{condition}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Features - Mobile Optimized */}
                    <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                        <i className="ri-checkbox-multiple-line text-[#D97860]"></i>
                        <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Caratteristiche</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {filterOptions.features.map((feature) => (
                          <label
                            key={feature}
                            className="flex items-center space-x-2 p-3 border border-[#E8E4E0] rounded-lg hover:bg-white cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={filters.features.includes(feature)}
                              onChange={(e) => {
                                const newFeatures = e.target.checked
                                  ? [...filters.features, feature]
                                  : filters.features.filter(f => f !== feature);
                                handleFilterChange('features', newFeatures);
                              }}
                              className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                            />
                            <span className="text-sm text-[#3D2817]">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Commercial-specific filters - Mobile Optimized */}
                {isCommercial && (
                  <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <i className="ri-store-2-line text-[#D97860]"></i>
                      <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Caratteristiche Commerciali</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Affaccio
                        </label>
                        <select
                          value={filters.visibility}
                          onChange={(e) => handleFilterChange('visibility', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Qualsiasi</option>
                          <option value="Alta">Strada principale</option>
                          <option value="Media">Strada secondaria</option>
                          <option value="Bassa">Interno cortile</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Piano
                        </label>
                        <select
                          value={filters.floor}
                          onChange={(e) => handleFilterChange('floor', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Qualsiasi</option>
                          <option value="0">Piano terra</option>
                          <option value="1">Primo piano</option>
                          <option value="2">Secondo piano</option>
                          <option value="3+">Multipiano</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Office-specific filters - Mobile Optimized */}
                {isOffice && (
                  <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <i className="ri-building-2-line text-[#D97860]"></i>
                      <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Caratteristiche Ufficio</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Configurazione
                        </label>
                        <select
                          value={filters.officeType}
                          onChange={(e) => handleFilterChange('officeType', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Qualsiasi</option>
                          {filterOptions.officeType.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Servizi inclusi
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {filterOptions.services.map((service) => (
                            <label
                              key={service}
                              className="flex items-center space-x-2 p-2 border border-[#E8E4E0] rounded hover:bg-white cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.services.includes(service)}
                                onChange={(e) => {
                                  const newServices = e.target.checked
                                    ? [...filters.services, service]
                                    : filters.services.filter(s => s !== service);
                                  handleFilterChange('services', newServices);
                                }}
                                className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                              />
                              <span className="text-sm text-[#3D2817]">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Garage-specific filters - Mobile Optimized */}
                {isGarage && (
                  <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <i className="ri-car-line text-[#D97860]"></i>
                      <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Caratteristiche Garage</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Tipologia
                        </label>
                        <select
                          value={filters.garageType}
                          onChange={(e) => handleFilterChange('garageType', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Qualsiasi</option>
                          {filterOptions.garageType.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Accesso
                        </label>
                        <select
                          value={filters.access}
                          onChange={(e) => handleFilterChange('access', e.target.value)}
                          className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20"
                        >
                          <option value="">Qualsiasi</option>
                          {filterOptions.access.map(access => (
                            <option key={access} value={access}>{access}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Sicurezza
                        </label>
                        <div className="space-y-2">
                          {filterOptions.security.map((security) => (
                            <label
                              key={security}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.security.includes(security)}
                                onChange={(e) => {
                                  const newSecurity = e.target.checked
                                    ? [...filters.security, security]
                                    : filters.security.filter(s => s !== security);
                                  handleFilterChange('security', newSecurity);
                                }}
                                className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                              />
                              <span className="text-sm text-[#3D2817]">{security}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Land-specific filters - Mobile Optimized */}
                {isLand && (
                  <div className="bg-[#F9F6F3] rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <i className="ri-landscape-line text-[#D97860]"></i>
                      <h3 className="text-base sm:text-lg font-semibold text-[#3D2817]">Caratteristiche Terreno</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Diritti edificatori
                        </label>
                        <div className="space-y-2">
                          {filterOptions.buildingRights.map((right) => (
                            <label
                              key={right}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.buildingRights.includes(right)}
                                onChange={(e) => {
                                  const newRights = e.target.checked
                                    ? [...filters.buildingRights, right]
                                    : filters.buildingRights.filter(r => r !== right);
                                  handleFilterChange('buildingRights', newRights);
                                }}
                                className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                              />
                              <span className="text-sm text-[#3D2817]">{right}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3D2817] mb-2">
                          Servizi disponibili
                        </label>
                        <div className="space-y-2">
                          {filterOptions.utilities.map((utility) => (
                            <label
                              key={utility}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={filters.utilities.includes(utility)}
                                onChange={(e) => {
                                  const newUtilities = e.target.checked
                                    ? [...filters.utilities, utility]
                                    : filters.utilities.filter(u => u !== utility);
                                  handleFilterChange('utilities', newUtilities);
                                }}
                                className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                              />
                              <span className="text-sm text-[#3D2817]">{utility}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer - Mobile Optimized */}
              <div className="sticky bottom-0 bg-white border-t border-[#E8E4E0] p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
                <button
                  onClick={clearFilters}
                  className="w-full sm:w-auto px-6 py-3 border border-[#E8E4E0] text-[#3D2817] rounded-lg hover:bg-[#F9F6F3] transition-colors cursor-pointer"
                >
                  Cancella filtri
                </button>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <span className="text-sm text-[#5C4B42] text-center sm:text-left">
                    {filteredProperties.length} proprietà trovate
                  </span>
                  <button
                    onClick={applyFilters}
                    className="w-full sm:w-auto px-6 py-3 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B54] transition-colors cursor-pointer"
                  >
                    Applica filtri
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Map Modal - Enhanced */}
        {showMap && (
          <div className="lg:hidden fixed inset-0 bg-white z-50">
            <div className="flex items-center justify-between p-4 border-b border-[#E8E4E0]">
              <h2 className="text-lg font-semibold text-[#3D2817]">Mappa proprietà</h2>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 hover:bg-[#F9F6F3] rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-xl text-[#5C4B42]"></i>
              </button>
            </div>
            
            {/* Mobile Map Legend */}
            <div className="px-4 py-2 bg-[#F9F6F3] border-b border-[#E8E4E0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#D97860] rounded-full"></div>
                    <span className="text-sm text-[#5C4B42] font-medium">Vendita</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#C9A876] rounded-full"></div>
                    <span className="text-sm text-[#5C4B42] font-medium">Affitto</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#3D2817]">
                  {sortedProperties.length} proprietà
                </span>
              </div>
            </div>
            
            <div className="h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95777.9!2d12.4964!3d41.9028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRome%2C%20Metropolitan%20City%20of%20Rome%2C%20Italy!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rome Properties Map"
              ></iframe>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
