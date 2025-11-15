import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/base/Button';
import Input from '../../../components/base/Input';
import { romeZones } from '../../../mocks/properties';

export default function HeroSection() {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<'rent' | 'buy' | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchData, setSearchData] = useState({
    location: '',
    zones: [] as string[],
    mainCategory: '',
    subCategory: '',
    businessActivities: [] as string[]
  });

  // Business activities list
  const businessActivities = [
    'Agenzia di viaggi e turismo',
    'Agenzia immobiliare',
    'Agenzia mediazione creditizia',
    'Agriturismo',
    'Alimentari – Gastronomia',
    'Armeria',
    'Autolavaggio',
    'Autorimessa',
    'Azienda agricola',
    'Banco mercato',
    'Bar',
    'Bed & Breakfast',
    'Birreria – Pub',
    'Campeggio',
    'Cartoleria – Copisteria',
    'Centro benessere',
    'Centro estetico',
    'Centro riparazioni',
    'Cocktail bar',
    'Colorificio – Prodotti edili',
    'Concessionaria',
    'Discoteca – Night club',
    'Edicola',
    'Enoteca – Wine bar',
    'Erboristeria',
    'Falegnameria',
    'Farmacia',
    'Ferramenta – Bricolage',
    'Fioraio',
    'Gelateria',
    'Gioielleria – Orologeria',
    'Gommista',
    'Hotel',
    'Idraulica',
    'Impianto sportivo',
    'Internet point – Phone center',
    'Lavanderia – Tintoria',
    'Libreria',
    'Ludoteca – Asilo nido',
    'Macelleria',
    'Merceria',
    'Minimarket',
    'Negozio di Musica – Strumenti',
    'Negozio di Ricambi e accessori',
    'Negozio di abbigliamento',
    'Negozio di articoli da regalo',
    'Negozio di articoli sanitari',
    'Negozio di caccia e pesca',
    'Negozio di calzature',
    'Negozio di casalinghi',
    'Negozio di cellulari e telefonia',
    'Negozio di elettronica – Informatica',
    'Negozio di frutta e verdura',
    'Negozio di giocattoli – Videogames',
    'Negozio di mobili e arredamento',
    'Negozio di profumi e cosmetica',
    'Negozio di tatuaggi e piercing',
    'Negozio di toelettatura',
    'Officina – Carrozzeria',
    'Ottica – Foto',
    'Palestra',
    'Panificio',
    'Paninoteca – Burger bar',
    'Parrucchiere – Barbiere',
    'Pasticceria',
    'Pastificio',
    'Pescheria',
    'Pizzeria',
    'Ristorante',
    'Rosticceria – Pizza al taglio',
    'Sala giochi e scommesse',
    'Scuola – Corsi',
    'Stabilimento balneare',
    'Stazione di servizio',
    'Supermercato',
    'Tabaccheria',
    'Tavola calda',
    'Altro'
  ];

  const [businessSearch, setBusinessSearch] = useState('');
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const businessDropdownRef = useRef<HTMLDivElement>(null);

  // Zone selection state
  const [zoneSearch, setZoneSearch] = useState('');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [expandedMacroZones, setExpandedMacroZones] = useState<string[]>([]);
  const zoneDropdownRef = useRef<HTMLDivElement>(null);

  const propertyCategories = {
    // Main categories with subcategories - MOST IMPORTANT FIRST
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
    
    // Standalone main categories (no subcategories)
    'Ufficio': {},
    'Garage-Posti auto': {},
    'Magazzini-Depositi': {},
    'Capannoni': {},
    
    // Other categories with subcategories
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

  const handleActionClick = (action: 'rent' | 'buy') => {
    setSelectedAction(action);
    setShowDropdown(false);
  };

  const handleAddProperty = () => {
    navigate('/add-listing');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMainCategoryChange = (category: string) => {
    setSearchData({
      ...searchData,
      mainCategory: category,
      subCategory: '', // Reset subcategory when main category changes
      businessActivities: [] // Reset business activities
    });
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSearchData({
      ...searchData,
      subCategory: subCategory,
      businessActivities: subCategory === 'Attività/Licenza commerciale' ? businessActivities : [] // Auto-select all when this subcategory is chosen
    });
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!selectedAction) return;
    
    // Build search URL with parameters
    const params = new URLSearchParams();
    params.set('type', selectedAction);
    
    if (searchData.zones.length > 0) {
      params.set('zones', searchData.zones.join(','));
    }
    
    if (searchData.mainCategory) {
      params.set('mainCategory', searchData.mainCategory);
    }
    
    if (searchData.subCategory) {
      params.set('subCategory', searchData.subCategory);
    }

    if (searchData.businessActivities.length > 0) {
      params.set('businessActivities', searchData.businessActivities.join(','));
    }
    
    navigate(`/search-results?${params.toString()}`);
  };

  const getSubCategories = () => {
    if (!searchData.mainCategory) return [];
    const category = propertyCategories[searchData.mainCategory as keyof typeof propertyCategories];
    // Return empty array for standalone categories, or subcategories for categories with subcategories
    return typeof category === 'object' && Object.keys(category).length > 0 ? Object.keys(category) : [];
  };

  const getSubSubCategories = () => {
    if (!searchData.mainCategory || !searchData.subCategory) return [];
    const mainCat = propertyCategories[searchData.mainCategory as keyof typeof propertyCategories];
    if (!mainCat) return [];
    return mainCat[searchData.subCategory as keyof typeof mainCat] || [];
  };

  // Filter business activities based on search
  const filteredBusinessActivities = businessActivities.filter(activity =>
    activity.toLowerCase().includes(businessSearch.toLowerCase())
  );

  const handleBusinessActivitiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSearchData(prev => ({
      ...prev,
      businessActivities: selectedOptions
    }));
  };

  const handleBusinessActivityToggle = (activity: string) => {
    setSearchData(prev => ({
      ...prev,
      businessActivities: prev.businessActivities.includes(activity)
        ? prev.businessActivities.filter(a => a !== activity)
        : [...prev.businessActivities, activity]
    }));
  };

  const handleSelectAllBusiness = () => {
    setSearchData(prev => ({
      ...prev,
      businessActivities: prev.businessActivities.length === filteredBusinessActivities.length && filteredBusinessActivities.length > 0
        ? [] 
        : [...filteredBusinessActivities]
    }));
  };

  // Zone selection functions
  const getAllZones = () => {
    const allZones: string[] = [];
    Object.entries(romeZones).forEach(([macroZone, subZones]) => {
      allZones.push(macroZone);
      allZones.push(...subZones);
    });
    return allZones;
  };

  const filteredZones = getAllZones().filter(zone =>
    zone.toLowerCase().includes(zoneSearch.toLowerCase())
  );

  const handleZoneToggle = (zone: string) => {
    setSearchData(prev => ({
      ...prev,
      zones: prev.zones.includes(zone)
        ? prev.zones.filter(z => z !== zone)
        : [...prev.zones, zone]
    }));
  };

  const handleSelectAllZones = () => {
    const allZones = getAllZones();
    setSearchData(prev => ({
      ...prev,
      zones: prev.zones.length === allZones.length ? [] : [...allZones]
    }));
  };

  const handleMacroZoneToggle = (macroZone: string) => {
    const subZones = romeZones[macroZone as keyof typeof romeZones] || [];
    const allZonesInMacro = [macroZone, ...subZones];
    
    const allSelected = allZonesInMacro.every(zone => searchData.zones.includes(zone));
    
    if (allSelected) {
      // Deselect all zones in this macro zone
      setSearchData(prev => ({
        ...prev,
        zones: prev.zones.filter(zone => !allZonesInMacro.includes(zone))
      }));
    } else {
      // Select all zones in this macro zone
      setSearchData(prev => ({
        ...prev,
        zones: [...new Set([...prev.zones, ...allZonesInMacro])]
      }));
    }
  };

  const toggleMacroZoneExpansion = (macroZone: string) => {
    setExpandedMacroZones(prev => 
      prev.includes(macroZone)
        ? prev.filter(zone => zone !== macroZone)
        : [...prev, macroZone]
    );
  };

  const isMacroZoneSelected = (macroZone: string) => {
    const subZones = romeZones[macroZone as keyof typeof romeZones] || [];
    const allZonesInMacro = [macroZone, ...subZones];
    return allZonesInMacro.every(zone => searchData.zones.includes(zone));
  };

  const isMacroZonePartiallySelected = (macroZone: string) => {
    const subZones = romeZones[macroZone as keyof typeof romeZones] || [];
    const allZonesInMacro = [macroZone, ...subZones];
    const selectedCount = allZonesInMacro.filter(zone => searchData.zones.includes(zone)).length;
    return selectedCount > 0 && selectedCount < allZonesInMacro.length;
  };

  const getFilteredMacroZones = () => {
    if (!zoneSearch) return Object.keys(romeZones);
    
    return Object.keys(romeZones).filter(macroZone => {
      const subZones = romeZones[macroZone as keyof typeof romeZones] || [];
      const macroMatches = macroZone.toLowerCase().includes(zoneSearch.toLowerCase());
      const subZoneMatches = subZones.some(subZone => 
        subZone.toLowerCase().includes(zoneSearch.toLowerCase())
      );
      return macroMatches || subZoneMatches;
    });
  };

  const getFilteredSubZones = (macroZone: string) => {
    const subZones = romeZones[macroZone as keyof typeof romeZones] || [];
    if (!zoneSearch) return subZones;
    
    return subZones.filter(subZone =>
      subZone.toLowerCase().includes(zoneSearch.toLowerCase())
    );
  };

  // Check if we should show business activity dropdown
  const shouldShowBusinessActivity = searchData.mainCategory === 'Commerciale' && 
                                   searchData.subCategory === 'Attività/Licenza commerciale';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (businessDropdownRef.current && !businessDropdownRef.current.contains(event.target as Node)) {
        setShowBusinessDropdown(false);
      }
      if (zoneDropdownRef.current && !zoneDropdownRef.current.contains(event.target as Node)) {
        setShowZoneDropdown(false);
      }
    };

    if (showBusinessDropdown || showZoneDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBusinessDropdown, showZoneDropdown]);

  return (
    <section 
      className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(61, 40, 23, 0.25), rgba(61, 40, 23, 0.25)), url('https://readdy.ai/api/search-image?query=Elegant%20luxury%20apartment%20interior%20in%20Rome%20with%20classical%20architecture%20features%2C%20high%20ceilings%2C%20marble%20floors%2C%20and%20warm%20natural%20lighting%20streaming%20through%20large%20windows%2C%20sophisticated%20Italian%20design%20with%20neutral%20warm%20tones%2C%20minimalist%20modern%20furniture%2C%20creating%20an%20inviting%20atmosphere%20perfect%20for%20real%20estate%20photography&width=1200&height=600&seq=hero-bg-1&orientation=landscape')`
      }}
      aria-labelledby="hero-heading"
    >
      {/* Structured Data for Property Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://mauluna-immobiliare.com/properties?action={action}&location={location}&type={type}",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            },
            "query-input": [
              "required name=action description=Choose rent or buy",
              "required name=location description=Location in Rome",
              "required name=type description=Property type"
            ],
            "object": {
              "@type": "RealEstateListing",
              "name": "Rome Real Estate Search",
              "description": "Search for apartments, houses, and villas for sale or rent in Rome"
            }
          })
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Prima Piattaforma 100% Gratuita a Roma
          </h1>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4" role="group" aria-label="Property actions">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddProperty}
            className="w-full sm:w-auto sm:min-w-[180px] whitespace-nowrap text-base sm:text-lg py-3 sm:py-4"
            aria-label="Add your property to our listings"
          >
            Aggiungi
          </Button>
          
          {/* Dropdown Button for Affitta/Acquista */}
          <div className="relative w-full sm:w-auto">
            <Button
              variant="cta"
              size="lg"
              onClick={toggleDropdown}
              className={`w-full sm:w-auto sm:min-w-[180px] whitespace-nowrap text-base sm:text-lg py-3 sm:py-4 ${selectedAction ? 'ring-2 ring-white' : ''}`}
              aria-label="Choose to search for rental or purchase properties"
              aria-expanded={showDropdown}
              aria-haspopup="true"
            >
              {selectedAction === 'rent' ? 'Affitta' : selectedAction === 'buy' ? 'Vendita' : 'Affitta/Vendita'}
              <i className={`ri-arrow-down-s-line ml-2 transition-transform ${showDropdown ? 'rotate-180' : ''}`} aria-hidden="true"></i>
            </Button>
            
            {/* Dropdown Menu - Mobile Optimized */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                <button
                  onClick={() => handleActionClick('rent')}
                  className="w-full px-4 py-4 text-left text-[#3D2817] hover:bg-[#F9F6F3] transition-colors border-b border-gray-100 text-base"
                  aria-label="Search for rental properties in Rome"
                >
                  Affitta
                </button>
                <button
                  onClick={() => handleActionClick('buy')}
                  className="w-full px-4 py-4 text-left text-[#3D2817] hover:bg-[#F9F6F3] transition-colors text-base"
                  aria-label="Search for properties to buy in Rome"
                >
                  Vendita
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar - Mobile Optimized */}
        {selectedAction && (
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-top-4 duration-300 px-2">
            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
              <form onSubmit={handleSearch} role="search" aria-label={`Search for properties to ${selectedAction === 'rent' ? 'rent' : 'buy'} in Rome`}>
                <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end">
                  {/* Zone Selection Dropdown - Mobile Optimized */}
                  <div className="flex-1 relative" ref={zoneDropdownRef}>
                    <label htmlFor="zone-selection" className="sr-only">
                      Select Rome Zones
                    </label>
                    
                    {/* Dropdown Button */}
                    <button
                      type="button"
                      onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                      className="w-full px-3 py-3 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-left flex items-center justify-between text-sm sm:text-base"
                      aria-expanded={showZoneDropdown}
                      aria-haspopup="true"
                    >
                      <span className="truncate">
                        {searchData.zones.length === 0 
                          ? 'Where in Rome'
                          : `${searchData.zones.length} zone${searchData.zones.length > 1 ? 's' : ''} selected`
                        }
                      </span>
                      <i className={`ri-arrow-down-s-line transition-transform ${showZoneDropdown ? 'rotate-180' : ''}`}></i>
                    </button>

                    {/* Dropdown Content - Mobile Optimized */}
                    {showZoneDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-[#E8E4E0] rounded-lg shadow-lg z-50 w-full sm:w-[500px] max-h-[300px] sm:max-h-[350px]">
                        {/* Search Input */}
                        <div className="p-3 border-b border-[#E8E4E0]">
                          <input
                            type="text"
                            placeholder="Search zones..."
                            value={zoneSearch}
                            onChange={(e) => setZoneSearch(e.target.value)}
                            className="w-full px-3 py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        {/* Select All Option */}
                        <div className="p-2 border-b border-[#E8E4E0]">
                          <label className="flex items-center space-x-3 p-2 hover:bg-[#F9F6F3] rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={searchData.zones.length === getAllZones().length}
                              onChange={handleSelectAllZones}
                              className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                            />
                            <span className="text-sm font-medium text-[#3D2817]">
                              All Rome ({getAllZones().length} zones)
                            </span>
                          </label>
                        </div>

                        {/* Hierarchical Zones List - Mobile Optimized */}
                        <div className="overflow-y-auto h-[180px] sm:h-[200px]">
                          {getFilteredMacroZones().map((macroZone) => {
                            const subZones = getFilteredSubZones(macroZone);
                            const isExpanded = expandedMacroZones.includes(macroZone);
                            const hasVisibleSubZones = subZones.length > 0;
                            
                            return (
                              <div key={macroZone}>
                                {/* Macro Zone */}
                                <div className="flex items-center p-2 hover:bg-[#F9F6F3] border-l-4 border-[#D97860]">
                                  {/* Expand/Collapse Button */}
                                  <button
                                    type="button"
                                    onClick={() => toggleMacroZoneExpansion(macroZone)}
                                    className="w-8 h-8 flex items-center justify-center mr-2 hover:bg-gray-200 rounded transition-colors"
                                  >
                                    <i className={`ri-arrow-right-s-line text-sm transition-transform ${isExpanded ? 'rotate-90' : ''}`}></i>
                                  </button>
                                  
                                  {/* Macro Zone Checkbox */}
                                  <label className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0">
                                    <input
                                      type="checkbox"
                                      checked={isMacroZoneSelected(macroZone)}
                                      ref={(el) => {
                                        if (el) {
                                          el.indeterminate = isMacroZonePartiallySelected(macroZone);
                                        }
                                      }}
                                      onChange={() => handleMacroZoneToggle(macroZone)}
                                      className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2 flex-shrink-0"
                                    />
                                    <span className="text-sm font-medium text-[#3D2817] flex-1 truncate">
                                      {macroZone}
                                    </span>
                                    <span className="text-xs text-[#5C4B42] flex-shrink-0">
                                      ({(romeZones[macroZone as keyof typeof romeZones] || []).length + 1})
                                    </span>
                                  </label>
                                </div>
                                
                                {/* Sub Zones - Only show when expanded */}
                                {isExpanded && hasVisibleSubZones && (
                                  <div className="bg-gray-50">
                                    {subZones.map((subZone) => (
                                      <label
                                        key={subZone}
                                        className="flex items-center space-x-3 p-2 pl-12 hover:bg-[#F9F6F3] cursor-pointer min-w-0"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={searchData.zones.includes(subZone)}
                                          onChange={() => handleZoneToggle(subZone)}
                                          className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2 flex-shrink-0"
                                        />
                                        <span className="text-sm text-[#3D2817] flex-1 truncate">
                                          {subZone}
                                        </span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Selected Count - Mobile Optimized */}
                        {searchData.zones.length > 0 && (
                          <div className="p-3 border-t border-[#E8E4E0] bg-[#F9F6F3]">
                            <div className="mt-1 flex flex-wrap gap-1">
                              {searchData.zones.slice(0, 2).map((zone) => (
                                <span
                                  key={zone}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#D97860] text-white"
                                >
                                  {zone.length > 12 ? `${zone.substring(0, 12)}...` : zone}
                                </span>
                              ))}
                              {searchData.zones.length > 2 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                                  +{searchData.zones.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Main Category Dropdown - Mobile Optimized */}
                  <div className="flex-1">
                    <label htmlFor="main-category" className="sr-only">
                      Property Category
                    </label>
                    <select
                      id="main-category"
                      value={searchData.mainCategory}
                      onChange={(e) => handleMainCategoryChange(e.target.value)}
                      className="w-full px-3 py-3 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm sm:text-base"
                      aria-describedby="category-help"
                    >
                      <option value="">Tutte le categorie</option>
                      {Object.keys(propertyCategories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div id="category-help" className="sr-only">
                      Choose the main property category
                    </div>
                  </div>

                  {/* Sub Category Dropdown - Mobile Optimized */}
                  {searchData.mainCategory && getSubCategories().length > 0 && (
                    <div className="flex-1">
                      <label htmlFor="sub-category" className="sr-only">
                        Property Type
                      </label>
                      <select
                        id="sub-category"
                        value={searchData.subCategory}
                        onChange={(e) => handleSubCategoryChange(e.target.value)}
                        className="w-full px-3 py-3 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm sm:text-base"
                        aria-describedby="type-help"
                      >
                        <option value="">Tutti i tipi</option>
                        {getSubCategories().map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                      </select>
                      <div id="type-help" className="sr-only">
                        Choose the specific property type
                      </div>
                    </div>
                  )}

                  {/* Business Activity Dropdown - Mobile Optimized */}
                  {shouldShowBusinessActivity && (
                    <div className="flex-1 relative" ref={businessDropdownRef}>
                      <label htmlFor="business-activity" className="sr-only">
                        Business Activity
                      </label>
                      
                      {/* Dropdown Button */}
                      <button
                        type="button"
                        onClick={() => setShowBusinessDropdown(!showBusinessDropdown)}
                        className="w-full px-3 py-3 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-left flex items-center justify-between text-sm sm:text-base"
                        aria-expanded={showBusinessDropdown}
                        aria-haspopup="true"
                      >
                        <span className="truncate">
                          {searchData.businessActivities.length === 0 
                            ? 'Select business activities...'
                            : `${searchData.businessActivities.length} selected`
                          }
                        </span>
                        <i className={`ri-arrow-down-s-line transition-transform ${showBusinessDropdown ? 'rotate-180' : ''}`}></i>
                      </button>

                      {/* Dropdown Content - Mobile Optimized */}
                      {showBusinessDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#E8E4E0] rounded-lg shadow-lg z-50 w-full sm:w-[400px] max-h-[300px]">
                          {/* Search Input */}
                          <div className="p-3 border-b border-[#E8E4E0]">
                            <input
                              type="text"
                              placeholder="Search business activities..."
                              value={businessSearch}
                              onChange={(e) => setBusinessSearch(e.target.value)}
                              className="w-full px-3 py-2 border border-[#E8E4E0] rounded-lg text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {/* Select All Option */}
                          <div className="p-2 border-b border-[#E8E4E0]">
                            <label className="flex items-center space-x-3 p-2 hover:bg-[#F9F6F3] rounded cursor-pointer">
                              <input
                                type="checkbox"
                                checked={searchData.businessActivities.length === filteredBusinessActivities.length && filteredBusinessActivities.length > 0}
                                onChange={handleSelectAllBusiness}
                                className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                              />
                              <span className="text-sm font-medium text-[#3D2817]">
                                Select All ({filteredBusinessActivities.length})
                              </span>
                            </label>
                          </div>

                          {/* Business Activities List */}
                          <div className="overflow-y-auto h-[180px]">
                            {filteredBusinessActivities.map((activity) => (
                              <label
                                key={activity}
                                className="flex items-center space-x-3 p-2 hover:bg-[#F9F6F3] cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={searchData.businessActivities.includes(activity)}
                                  onChange={() => handleBusinessActivityToggle(activity)}
                                  className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2"
                                />
                                <span className="text-sm text-[#3D2817] flex-1">
                                  {activity}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Selected Count - Mobile Optimized */}
                          {searchData.businessActivities.length > 0 && (
                            <div className="p-3 border-t border-[#E8E4E0] bg-[#F9F6F3]">
                              <div className="mt-1 flex flex-wrap gap-1">
                                {searchData.businessActivities.slice(0, 2).map((activity) => (
                                  <span
                                    key={activity}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#D97860] text-white"
                                  >
                                    {activity.length > 12 ? `${activity.substring(0, 12)}...` : activity}
                                  </span>
                                ))}
                                {searchData.businessActivities.length > 2 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                                    +{searchData.businessActivities.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div id="business-help" className="sr-only">
                        Search and select multiple business activity types
                      </div>
                    </div>
                  )}

                  {/* Sub-Sub Category Dropdown for Appartamento - Mobile Optimized */}
                  {searchData.subCategory && getSubSubCategories().length > 0 && (
                    <div className="flex-1">
                      <label htmlFor="sub-sub-category" className="sr-only">
                        Room Configuration
                      </label>
                      <select
                        id="sub-sub-category"
                        className="w-full px-3 py-3 sm:py-2 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#3D2817] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm sm:text-base"
                        aria-describedby="rooms-help"
                      >
                        <option value="">Tutti</option>
                        {getSubSubCategories().map((subSubCategory) => (
                          <option key={subSubCategory} value={subSubCategory}>
                            {subSubCategory}
                          </option>
                        ))}
                      </select>
                      <div id="rooms-help" className="sr-only">
                        Choose the room configuration
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full lg:w-auto whitespace-nowrap py-3 text-base sm:text-lg"
                    aria-label={`Search for properties to ${selectedAction} in selected zones`}
                  >
                    <i className="ri-search-line mr-2" aria-hidden="true"></i>
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
