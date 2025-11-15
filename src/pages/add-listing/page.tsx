import { useState, useRef, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import LoginModal from '../../components/feature/LoginModal';

interface ListingData {
  listingType: 'rent' | 'buy' | '';
  mainCategory: string;
  subCategory: string;
  subSubCategory: string;
  businessActivities: string[];
  zone: string;
  address: string;
  title: string;
  price: string;
  sqm: string;
  rooms: string;
  bathrooms: string;
  condition: string;
  features: string[];
  energyClass: string;
  floor: string;
  yearBuilt: string;
  photos: File[];
  description: string;
  // Category-specific fields
  garageType: string;
  security: string[];
  access: string;
  officeType: string;
  services: string[];
  visibility: string;
  commercialType: string;
  buildingRights: string[];
  utilities: string[];
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    preferences: string[];
  };
}

// Rome zones - EXACT SAME as hero search bar with complete hierarchical structure
const romeZones = {
  "Centro Storico": [
    "Barberini", "Campo de' Fiori", "Colle Oppio", "Colosseo – Fori Imperiali",
    "Ghetto – Portico d'Ottavia", "Largo Argentina", "Montecitorio", "Monti",
    "Pantheon", "Piazza del Popolo", "Piazza Navona", "Sallustiano", "Spagna",
    "Trevi", "Via Giulia", "Vittorio Veneto"
  ],
  "Prati, Borgo, Mazzini, Delle Vittorie, Degli Eroi": [
    "Borgo", "Cipro", "Mazzini – Delle Vittorie", "Piazzale degli Eroi", "Prati"
  ],
  "Flaminio, Parioli, Pinciano": [
    "Flaminio", "Parioli", "Pinciano"
  ],
  "Trieste, Salario, Nomentano": [
    "Africano – Villa Chigi", "Bologna", "Corso Trieste", "Nomentano", "Salario"
  ],
  "San Giovanni, Esquilino, San Lorenzo": [
    "Esquilino", "Porta Maggiore – San Lorenzo", "Re di Roma – San Giovanni", "Termini – Castro Pretorio"
  ],
  "Appio Latino, Colli Albani, Appio Claudio": [
    "Appio Latino", "Colli Albani", "Appio Claudio – Statuario"
  ],
  "Tuscolano, Cinecittà, Quadraro": [
    "Cinecittà", "Quadraro"
  ],
  "Centocelle, Tor de' Schiavi": [
    "Centocelle", "Tor de' Schiavi", "Torpignattara", "Villa Gordiani"
  ],
  "Alessandrino, Tor Sapienza, Torre Maura": [
    "Alessandrino – Torre Spaccata", "Tor Sapienza – La Rustica", "Tor Tre Teste – Torre Maura"
  ],
  "Appia Pignatelli, Ardeatino, Montagnola": [
    "Appia Pignatelli", "Ardeatino – Montagnola", "Quarto Miglio"
  ],
  "Cecchignola, Fonte Meravigliosa": [
    "Cecchignola – Giuliano Dalmata", "Fonte Meravigliosa", "Rinnovamento", "Roma 70", "Tor Pagnotta", "Torricola – Tor Carbone"
  ],
  "Magliana, Trullo, Parco de' Medici": [
    "Magliana", "Parco de' Medici – Muratella", "Trullo – Colle del Sole"
  ],
  "Casetta Mattei, Pisana, Bravetta": [
    "Casetta Mattei – Corviale", "Pisana – Bravetta"
  ],
  "Aurelio, Boccea": [
    "Aurelio – Val Cannuta", "Boccea", "Cornelia – Montespaccato"
  ],
  "Battistini, Torrevecchia": [
    "Battistini – Primavalle", "Collina delle Muse", "Torresina", "Torrevecchia"
  ],
  "Olgiata, Giustiniana": [
    "Cesano", "La Giustiniana", "La Storta", "Olgiata", "Osteria Nuova"
  ],
  "Labaro, Prima Porta, Valle Muricana": [
    "Labaro", "Prima Porta", "Tiberina", "Valle Muricana"
  ],
  "Bufalotta, Casal Monastero, Settebagni": [
    "Bufalotta", "Casal Monastero", "Case Rosse", "Settebagni", "Settecamini"
  ],
  "Ponte di Nona, Torre Angela": [
    "Ponte di Nona", "Torre Angela"
  ],
  "Anagnina, Romanina, Tor Vergata": [
    "Anagnina", "Giardinetti", "Morena", "Romanina", "Tor Vergata", "Torre Gaia"
  ],
  "Trigoria, Castel Romano": [
    "Castel Romano", "Falcognana", "Monte Migliore", "Pian Savelli", "Santa Fumia", "Trigoria"
  ],
  "Acilia, Casal Bernocchi, Centro Giano, Dragona, Malafede, Vitinia": [
    "Acilia", "Casal Bernocchi", "Centro Giano", "Dragona", "Malafede", "Vitinia"
  ],
  "Ponte Mammolo, San Basilio, Tor Cervara": [
    "Ponte Mammolo", "San Basilio", "Tor Cervara", "Torraccia"
  ],
  "Lido di Ostia, Ostia Antica, Castel Fusano": [
    "Castel Fusano", "Ostia Antica", "Ostia Levante", "Ostia Ponente"
  ],
  "Casal Lumbroso, Massimina, Ponte Galeria": [
    "Casal Lumbroso", "Massimina", "Piana del Sole", "Ponte Galeria"
  ],
  "Casalotti, Casal Selce, Maglianella": [
    "Casal Selce", "Casalotti", "Castel di Guido", "Maglianella", "Valle Santa"
  ],
  "Balduina, Medaglie d'Oro": [
    "Balduina", "Medaglie d'Oro"
  ],
  "Monteverde, Gianicolense, Colli Portuensi, Casaletto": [
    "Colli Portuensi – Casaletto", "Monteverde Nuovo", "Monteverde Vecchio"
  ],
  "Lunghezza, Castelverde": [
    "Castelverde", "Corcolle", "Lunghezza", "San Vittorino"
  ],
  "Borghesiana, Finocchio, Rocca Cencia": [
    "Borghesiana", "Finocchio", "Fontana Candida", "Rocca Cencia"
  ],
  "Mezzocammino, Spinaceto, Tor de' Cenci": [
    "Mezzocammino", "Spinaceto", "Tor de' Cenci"
  ],
  "Axa, Casal Palocco, Infernetto": [
    "Axa", "Casal Palocco", "Infernetto"
  ],
  "Appio Claudio, Capannelle": [
    "Appio Claudio – Statuario", "Capannelle – Statuario"
  ],
  "Castel di Leva, Vallerano, Fonte Laurentina": [
    "Castel di Leva", "Divino Amore", "Fioranello", "Fonte Laurentina", "Vallerano"
  ],
  "Portuense, Villa Bonelli": [
    "Portuense", "Villa Bonelli"
  ]
};

// Business activities - EXACT SAME as hero search bar
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

// Property categories - COMPLETE STRUCTURE with all subcategories
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
  'Garage-Posti auto': {
    'Box singolo': [],
    'Box doppio': [],
    'Posto auto coperto': [],
    'Posto auto scoperto': [],
    'Garage multiplo': [],
    'Autorimessa': []
  },
  'Magazzini-Depositi': {
    'Magazzino': [],
    'Deposito': [],
    'Cantina': [],
    'Soffitta': []
  },
  'Capannoni': {
    'Capannone industriale': [],
    'Capannone commerciale': [],
    'Capannone artigianale': []
  },
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

const conditions = ['Nuovo', 'Eccellente', 'Buono', 'Ristrutturato', 'Da ristrutturare'];
const roomOptions = ['1', '2', '3', '4', '5', '6+'];
const bathroomOptions = ['1', '2', '3', '4+'];
const floorOptions = ['Piano terra', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+', 'Attico'];
const energyClasses = ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non specificata'];

// Category-specific property features
const categoryFeatures = {
  'Case-Appartamenti': [
    'Balcone', 'Terrazza', 'Giardino', 'Parcheggio', 'Ascensore',
    'Cantina', 'Soffitta', 'Camino', 'Aria condizionata', 'Riscaldamento autonomo',
    'Doppi vetri', 'Portineria', 'Video citofono', 'Allarme', 'Fibra ottica',
    'Parquet', 'Marmo', 'Cucina abitabile', 'Ripostiglio', 'Lavanderia'
  ],
  'Commerciale': [
    'Vetrina', 'Aria condizionata', 'Allarme', 'Canna fumaria', 'Bagno',
    'Deposito', 'Ufficio', 'Parcheggio clienti', 'Carico/scarico merci', 'Insegna luminosa',
    'Impianto audio', 'WiFi', 'Cassa continua', 'Spogliatoio', 'Cucina attrezzata',
    'Frigoriferi', 'Congelatori', 'Forno', 'Lavastoviglie', 'Dehors esterno'
  ],
  'Ufficio': [
    'Aria condizionata', 'Riscaldamento', 'Fibra ottica', 'Allarme', 'Reception',
    'Sala riunioni', 'Cucina', 'Bagno privato', 'Parcheggio', 'Ascensore',
    'Doppi vetri', 'Pavimento galleggiante', 'Controsoffitto', 'Impianto elettrico certificato',
    'Centralino telefonico', 'Server room', 'Archivio', 'Terrazza', 'Balcone'
  ],
  'Garage-Posti auto': [
    'Videosorveglianza', 'Cancello automatico', 'Illuminazione', 'Ventilazione',
    'Accesso pedonale', 'Rampa accesso', 'Altezza veicoli', 'Presa elettrica',
    'Acqua corrente', 'Scaffalature', 'Ripostiglio', 'Allarme perimetrale'
  ],
  'Magazzini-Depositi': [
    'Montacarichi', 'Rampa carico', 'Altezza industriale', 'Clima controllato',
    'Accesso camion', 'Scaffalature', 'Ufficio annesso', 'Bagno', 'Allarme',
    'Videosorveglianza', 'Illuminazione LED', 'Pavimento industriale',
    'Cancello automatico', 'Pesa a ponte', 'Banchina carico'
  ],
  'Capannoni': [
    'Gru', 'Binario ferroviario', 'Piazzale manovra', 'Uffici annessi',
    'Altezza industriale', 'Capriate metalliche', 'Shed illuminanti', 'Pavimento industriale',
    'Rampe carico', 'Cancelli carrabili', 'Impianto antincendio', 'Cabina elettrica',
    'Compressori', 'Impianto aria compressa', 'Ponte carroponte'
  ],
  'Terreni': [
    'Acqua', 'Elettricità', 'Gas', 'Fognatura', 'Telefono', 'Internet',
    'Strada asfaltata', 'Recinzione', 'Cancello', 'Pozzo artesiano',
    'Irrigazione', 'Alberi da frutto', 'Vigneto', 'Oliveto', 'Serra',
    'Deposito attrezzi', 'Casa colonica', 'Rudere', 'Vista panoramica'
  ],
  'Nuove Costruzioni': [
    'Classe energetica A+', 'Domotica', 'Pannelli solari', 'Pompa di calore',
    'Cappotto termico', 'Infissi triplo vetro', 'VMC', 'Pavimento radiante',
    'Impianto fotovoltaico', 'Colonnina ricarica auto', 'Smart home', 'Fibra ottica',
    'Ascensore', 'Parcheggio', 'Giardino condominiale', 'Piscina condominiale',
    'Palestra condominiale', 'Concierge', 'Video citofono', 'Allarme predisposto'
  ]
};

// Category-specific options
const garageTypes = ['Box singolo', 'Box doppio', 'Posto auto coperto', 'Posto auto scoperto', 'Garage multiplo', 'Autorimessa'];
const securityOptions = ['Videosorveglianza', 'Cancello automatico', 'Custode', 'Allarme', 'Accesso controllato'];
const accessOptions = ['24h', 'Orari limitati', 'Solo giorno'];
const officeTypes = ['Singolo', 'Open space', 'Condiviso', 'Coworking'];
const officeServices = ['Reception', 'Pulizie', 'Internet', 'Sala riunioni', 'Cucina', 'Parcheggio', 'Sicurezza'];
const visibilityOptions = ['Alta', 'Media', 'Bassa'];
const commercialTypes = ['Negozio', 'Laboratorio', 'Showroom', 'Magazzino'];
const buildingRightsOptions = ['Residenziale', 'Commerciale', 'Industriale', 'Agricolo', 'Misto'];
const utilitiesOptions = ['Acqua', 'Elettricità', 'Gas', 'Fognatura', 'Telefono', 'Internet'];

export default function AddListingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedProperties, setSubmittedProperties] = useState<ListingData[]>([]);
  const [zoneSearch, setZoneSearch] = useState('');
  const [businessSearch, setBusinessSearch] = useState('');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const [expandedMacroZones, setExpandedMacroZones] = useState<string[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const zoneDropdownRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [listingData, setListingData] = useState<ListingData>({
    listingType: '',
    mainCategory: '',
    subCategory: '',
    subSubCategory: '',
    businessActivities: [],
    zone: '',
    address: '',
    title: '',
    price: '',
    sqm: '',
    rooms: '',
    bathrooms: '',
    condition: '',
    features: [],
    energyClass: '',
    floor: '',
    yearBuilt: '',
    photos: [],
    description: '',
    garageType: '',
    security: [],
    access: '',
    officeType: '',
    services: [],
    visibility: '',
    commercialType: '',
    buildingRights: [],
    utilities: [],
    contact: {
      phone: '',
      email: '',
      whatsapp: '',
      preferences: []
    }
  });

  const steps = [
    { number: 1, title: 'Cosa Offri?', icon: 'ri-home-line' },
    { number: 2, title: 'Dettagli Immobile', icon: 'ri-information-line' },
    { number: 3, title: 'Contatto & Pubblica', icon: 'ri-phone-line' }
  ];

  // NEW: Initialize Google Places Autocomplete
  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!addressInputRef.current || !window.google?.maps?.places) return;

      // Create autocomplete instance
      const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'IT' },
        fields: ['formatted_address', 'address_components', 'geometry']
      });

      // Set bounds to Rome area
      const romeBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(41.7, 12.3), // Southwest
        new google.maps.LatLng(42.1, 12.8)  // Northeast
      );
      autocomplete.setBounds(romeBounds);

      // Filter results to Rome area only
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.formatted_address) return;

        // Check if the place is in Rome
        const isInRome = place.address_components?.some(component =>
          component.types.includes('locality') &&
          component.long_name.toLowerCase().includes('roma')
        ) || place.address_components?.some(component =>
          component.types.includes('administrative_area_level_2') &&
          component.long_name.toLowerCase().includes('roma')
        );

        if (isInRome && place.formatted_address) {
          // Extract street name from formatted address
          let streetAddress = place.formatted_address;

          // Remove postal code and city from the end
          streetAddress = streetAddress.replace(/,\s*\d{5}\s*Roma.*$/i, '');
          streetAddress = streetAddress.replace(/,\s*Roma.*$/i, '');

          setListingData(prev => ({
            ...prev,
            address: streetAddress.trim()
          }));
        }
      });

      autocompleteRef.current = autocomplete;
    };

    // Load Google Maps API if not already loaded
    if (!window.google?.maps?.places) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=key-here&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setTimeout(initializeAutocomplete, 100);
      };

      document.head.appendChild(script);
    } else {
      initializeAutocomplete();
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  // Auto-generate title based on selections - UPDATED to include address
  const generateTitle = () => {
    let title = '';

    // Handle sub-sub category first (for apartments)
    if (listingData.subSubCategory) {
      title = listingData.subSubCategory;
    }
    // Then sub category
    else if (listingData.subCategory) {
      const category = propertyCategories[listingData.mainCategory as keyof typeof propertyCategories];
      if (category && typeof category === 'object' && 'subcategories' in category) {
        title = listingData.subCategory;
      } else {
        title = listingData.subCategory;
      }
    }
    // Then main category
    else if (listingData.mainCategory) {
      title = listingData.mainCategory;
    }

    // Add business activity if selected
    if (listingData.businessActivities.length > 0) {
      title = listingData.businessActivities[0]; // Use first selected business activity
    }

    // Add address if available, otherwise zone
    if (listingData.address) {
      title += ` in ${listingData.address}`;
    } else if (listingData.zone) {
      title += ` in ${listingData.zone}`;
    }

    // Add rooms for apartments
    if (listingData.rooms && listingData.mainCategory === 'Case-Appartamenti') {
      title = `${listingData.rooms} ${listingData.rooms === '1' ? 'locale' : 'locali'} ${title}`;
    }

    return title || 'Property Listing';
  };

  const handleNext = () => {
    if (currentStep < 3) {
      // Auto-generate title when moving to step 2
      if (currentStep === 1) {
        setListingData(prev => ({ ...prev, title: generateTitle() }));
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setListingData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 10)
    }));
  };

  const removePhoto = (index: number) => {
    setListingData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleContactPreference = (pref: string) => {
    setListingData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        preferences: prev.contact.preferences.includes(pref)
          ? prev.contact.preferences.filter(p => p !== pref)
          : [...prev.contact.preferences, pref]
      }
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setListingData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSecurityToggle = (security: string) => {
    setListingData(prev => ({
      ...prev,
      security: prev.security.includes(security)
        ? prev.security.filter(s => s !== security)
        : [...prev.security, security]
    }));
  };

  const handleServiceToggle = (service: string) => {
    setListingData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleBuildingRightsToggle = (right: string) => {
    setListingData(prev => ({
      ...prev,
      buildingRights: prev.buildingRights.includes(right)
        ? prev.buildingRights.filter(r => r !== right)
        : [...prev.buildingRights, right]
    }));
  };

  const handleUtilitiesToggle = (utility: string) => {
    setListingData(prev => ({
      ...prev,
      utilities: prev.utilities.includes(utility)
        ? prev.utilities.filter(u => u !== utility)
        : [...prev.utilities, utility]
    }));
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) return `€${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `€${(num / 1000).toFixed(0)}k`;
    return `€${num}`;
  };

  // Get subcategories based on main category - SAME LOGIC as hero
  const getSubCategories = () => {
    if (!listingData.mainCategory) return [];
    const category = propertyCategories[listingData.mainCategory as keyof typeof propertyCategories];
    return typeof category === 'object' && Object.keys(category).length > 0 ? Object.keys(category) : [];
  };

  // Get sub-sub categories - SAME LOGIC as hero
  const getSubSubCategories = () => {
    if (!listingData.mainCategory || !listingData.subCategory) return [];
    const mainCat = propertyCategories[listingData.mainCategory as keyof typeof propertyCategories];
    if (!mainCat || typeof mainCat !== 'object') return [];
    return (mainCat as any)[listingData.subCategory] || [];
  };

  // Check if we should show business activities - SAME LOGIC as hero
  const shouldShowBusinessActivities = listingData.mainCategory === 'Commerciale' &&
                                      listingData.subCategory === 'Attività/Licenza commerciale';

  // Zone selection functions - EXACT SAME as hero search bar
  const getAllZones = () => {
    const allZones: string[] = [];
    Object.entries(romeZones).forEach(([macroZone, subZones]) => {
      allZones.push(macroZone);
      allZones.push(...subZones);
    });
    return allZones;
  };

  const handleZoneToggle = (zone: string) => {
    setListingData(prev => ({ ...prev, zone }));
    setShowZoneDropdown(false);
    setZoneSearch('');
  };

  const handleMacroZoneToggle = (macroZone: string) => {
    setListingData(prev => ({ ...prev, zone: macroZone }));
    setShowZoneDropdown(false);
    setZoneSearch('');
  };

  const toggleMacroZoneExpansion = (macroZone: string) => {
    setExpandedMacroZones(prev =>
      prev.includes(macroZone)
        ? prev.filter(zone => zone !== macroZone)
        : [...prev, macroZone]
    );
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

  // Filter business activities based on search
  const getFilteredBusinessActivities = () => {
    if (!businessSearch) return businessActivities;
    return businessActivities.filter(activity =>
      activity.toLowerCase().includes(businessSearch.toLowerCase())
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return listingData.listingType && listingData.mainCategory && listingData.zone && listingData.address; // UPDATED: Require address
      case 2:
        return listingData.price && listingData.sqm && listingData.photos.length >= 3;
      case 3:
        return listingData.contact.phone || listingData.contact.email;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    // Here you would submit to your backend/database
    console.log('Submitting property:', listingData);

    // Add to submitted properties list
    setSubmittedProperties(prev => [...prev, { ...listingData }]);
    setIsSubmitted(true);
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    // After login, automatically submit the property
    handleSubmit();
  };

  // NEW: Handle adding another property
  const handleAddAnotherProperty = () => {
    const lastProperty = submittedProperties[submittedProperties.length - 1];

    // Pre-fill common data from last property
    setListingData({
      listingType: lastProperty.listingType, // Keep same listing type
      mainCategory: lastProperty.mainCategory, // Keep same category
      subCategory: lastProperty.subCategory, // Keep same subcategory
      subSubCategory: '', // Reset room configuration
      businessActivities: [...lastProperty.businessActivities], // Keep business activities
      zone: lastProperty.zone, // Keep same zone (likely same area)
      address: '', // Reset address (must be different)
      title: '',
      price: '', // Reset price
      sqm: '', // Reset size
      rooms: '', // Reset rooms
      bathrooms: '', // Reset bathrooms
      condition: lastProperty.condition, // Keep same condition
      features: [...lastProperty.features], // Keep same features
      energyClass: lastProperty.energyClass, // Keep energy class
      floor: '', // Reset floor
      yearBuilt: lastProperty.yearBuilt, // Keep year built (same building)
      photos: [], // Reset photos
      description: '', // Reset description
      // Category-specific fields - keep same
      garageType: lastProperty.garageType,
      security: [...lastProperty.security],
      access: lastProperty.access,
      officeType: lastProperty.officeType,
      services: [...lastProperty.services],
      visibility: lastProperty.visibility,
      commercialType: lastProperty.commercialType,
      buildingRights: [...lastProperty.buildingRights],
      utilities: [...lastProperty.utilities],
      contact: { ...lastProperty.contact } // Keep all contact info
    });

    // Reset form state
    setIsSubmitted(false);
    setCurrentStep(1);
    setZoneSearch('');
    setBusinessSearch('');
    setShowZoneDropdown(false);
    setExpandedMacroZones([]);
  };

  // NEW: Handle starting fresh
  const handleStartFresh = () => {
    // Reset everything to initial state
    setListingData({
      listingType: '',
      mainCategory: '',
      subCategory: '',
      subSubCategory: '',
      businessActivities: [],
      zone: '',
      address: '',
      title: '',
      price: '',
      sqm: '',
      rooms: '',
      bathrooms: '',
      condition: '',
      features: [],
      energyClass: '',
      floor: '',
      yearBuilt: '',
      photos: [],
      description: '',
      garageType: '',
      security: [],
      access: '',
      officeType: '',
      services: [],
      visibility: '',
      commercialType: '',
      buildingRights: [],
      utilities: [],
      contact: {
        phone: '',
        email: '',
        whatsapp: '',
        preferences: []
      }
    });

    setSubmittedProperties([]);
    setIsSubmitted(false);
    setCurrentStep(1);
    setZoneSearch('');
    setBusinessSearch('');
    setShowZoneDropdown(false);
    setExpandedMacroZones([]);
  };

  // Get property features based on category
  const getPropertyFeatures = () => {
    if (!listingData.mainCategory) return [];
    return categoryFeatures[listingData.mainCategory as keyof typeof categoryFeatures] || [];
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (zoneDropdownRef.current && !zoneDropdownRef.current.contains(event.target as Node)) {
        setShowZoneDropdown(false);
      }
    };

    if (showZoneDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showZoneDropdown]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Inserisci Annuncio - MAULUNA IMMOBILIARE",
            "description": "Inserisci il tuo immobile in vendita o affitto a Roma con 0% di commissioni. Processo semplice in 3 passaggi per raggiungere potenziali acquirenti e affittuari.",
            "url": "https://mauluna-immobiliare.com/add-listing"
          })
        }}
      />

      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* NEW: Success State - Show after submission */}
          {isSubmitted ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-[#E8E4E0] p-4 sm:p-8 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <i className="ri-check-line text-2xl sm:text-3xl text-green-600"></i>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4B42] mb-3 sm:mb-4">Immobile Inviato con Successo!</h1>
                <p className="text-[#8B7355] text-base sm:text-lg mb-6 sm:mb-8 px-2">
                  Il tuo immobile sarà pubblicato molto presto. Riceverai un'email di conferma a breve.
                </p>

                {/* Property Summary */}
                <div className="bg-[#F9F6F3] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-left">
                  <h3 className="font-semibold text-[#5C4B42] mb-3 sm:mb-4 text-sm sm:text-base">
                    <i className="ri-home-line mr-2"></i>
                    Immobile #{submittedProperties.length} Inviato
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div>
                      <span className="text-[#8B7355]">Titolo:</span>
                      <div className="font-medium text-[#5C4B42] break-words">{submittedProperties[submittedProperties.length - 1]?.title}</div>
                    </div>
                    <div>
                      <span className="text-[#8B7355]">Posizione:</span>
                      <div className="font-medium text-[#5C4B42] break-words">
                        {submittedProperties[submittedProperties.length - 1]?.address}, {submittedProperties[submittedProperties.length - 1]?.zone}
                      </div>
                    </div>
                    <div>
                      <span className="text-[#8B7355]">Prezzo:</span>
                      <div className="font-medium text-[#D97860]">
                        {submittedProperties[submittedProperties.length - 1]?.price ? formatPrice(submittedProperties[submittedProperties.length - 1].price) : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <span className="text-[#8B7355]">Dimensione:</span>
                      <div className="font-medium text-[#5C4B42]">{submittedProperties[submittedProperties.length - 1]?.sqm} m²</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Add Another Property - Primary Action */}
                  <button
                    onClick={handleAddAnotherProperty}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B52] transition-colors font-semibold text-base sm:text-lg cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Aggiungi Altro Immobile
                  </button>

                  <div className="text-xs sm:text-sm text-[#8B7355] mb-3 sm:mb-4 px-2">
                    <i className="ri-lightbulb-line mr-1"></i>
                    Precompileremo i dettagli comuni per farti risparmiare tempo
                  </div>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={handleStartFresh}
                      className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#E8E4E0] text-[#5C4B42] rounded-lg hover:border-[#D97860] hover:text-[#D97860] transition-colors font-medium cursor-pointer whitespace-nowrap text-sm sm:text-base"
                    >
                      <i className="ri-refresh-line mr-2"></i>
                      Ricomincia da Capo
                    </button>

                    <a
                      href="/properties"
                      className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-[#C9A876] text-white rounded-lg hover:bg-[#B8956A] transition-colors font-medium text-center cursor-pointer whitespace-nowrap text-sm sm:text-base"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      Vedi Immobili
                    </a>
                  </div>
                </div>

                {/* Properties Counter */}
                {submittedProperties.length > 1 && (
                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center">
                      <i className="ri-trophy-line text-green-600 mr-2"></i>
                      <span className="text-green-700 font-medium text-sm sm:text-base">
                        Hai inviato con successo {submittedProperties.length} immobili oggi!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Existing Form Content */}
              <header className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4B42] mb-2">Inserisci il Tuo Immobile</h1>
                <p className="text-[#8B7355] text-base sm:text-lg">Semplice • Veloce • 0% Commissioni</p>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-3 sm:mt-4 space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-[#8B7355]">
                  <div className="flex items-center">
                    <i className="ri-shield-check-line text-[#D97860] mr-2"></i>
                    Nessun costo nascosto
                  </div>
                  <div className="flex items-center">
                    <i className="ri-time-line text-[#D97860] mr-2"></i>
                    Approvazione rapida
                  </div>
                  <div className="flex items-center">
                    <i className="ri-user-heart-line text-[#D97860] mr-2"></i>
                    Contatto diretto con acquirenti
                  </div>
                </div>

                {/* NEW: Show properties counter if any submitted */}
                {submittedProperties.length > 0 && (
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
                    <span className="text-green-700 text-xs sm:text-sm font-medium">
                      <i className="ri-check-circle-line mr-1"></i>
                      {submittedProperties.length} {submittedProperties.length === 1 ? 'immobile già inviato' : 'immobili già inviati'}
                    </span>
                  </div>
                )}
              </header>

              {/* Form Content */}
              <div className="bg-white rounded-lg shadow-sm border border-[#E8E4E0] p-4 sm:p-8">
                {/* Step 1: What Are You Offering? */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#5C4B42] mb-2">Trasforma il Tuo Immobile in Profitto</h2>
                    <p className="text-[#8B7355] mb-6 sm:mb-8 text-sm sm:text-base">Unisciti a migliaia di proprietari di successo a Roma che ottengono il massimo rendimento con zero commissioni</p>

                    <div className="space-y-6 sm:space-y-8">
                      {/* Listing Type */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Voglio massimizzare il potenziale del mio immobile tramite:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {[
                            { value: 'rent', label: 'Affitto', icon: 'ri-money-dollar-circle-line' },
                            { value: 'buy', label: 'Vendita', icon: 'ri-trophy-line' }
                          ].map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setListingData(prev => ({ ...prev, listingType: type.value as 'rent' | 'buy' }))}
                              className={`p-4 sm:p-6 border-2 rounded-lg text-left transition-all cursor-pointer ${
                                listingData.listingType === type.value
                                  ? 'border-[#D97860] bg-[#F9F6F3]'
                                  : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                              }`}
                            >
                              <i className={`${type.icon} text-xl sm:text-2xl text-[#D97860] mb-2 sm:mb-3 block`}></i>
                              <div className="font-medium text-[#5C4B42] text-sm sm:text-base">{type.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Main Category - EXACT SAME as hero */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Categoria Immobile:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {Object.keys(propertyCategories).map((category) => (
                            <button
                              key={category}
                              type="button"
                              onClick={() => setListingData(prev => ({
                                ...prev,
                                mainCategory: category,
                                subCategory: '',
                                subSubCategory: '',
                                businessActivities: []
                              }))}
                              className={`p-3 sm:p-4 border-2 rounded-lg text-left transition-all cursor-pointer ${
                                listingData.mainCategory === category
                                  ? 'border-[#D97860] bg-[#F9F6F3]'
                                  : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                              }`}
                            >
                              <div className="font-medium text-[#5C4B42] text-sm sm:text-base break-words">{category}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sub Category - EXACT SAME as hero */}
                      {listingData.mainCategory && getSubCategories().length > 0 && (
                        <div>
                          <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Tipo Immobile:</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                            {getSubCategories().map((subCategory) => (
                              <button
                                key={subCategory}
                                type="button"
                                onClick={() => setListingData(prev => ({
                                  ...prev,
                                  subCategory: subCategory,
                                  subSubCategory: '',
                                  businessActivities: []
                                }))}
                                className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                  listingData.subCategory === subCategory
                                    ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                    : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                }`}
                              >
                                <div className="text-xs sm:text-sm font-medium break-words">{subCategory}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sub-Sub Category - EXACT SAME as hero */}
                      {listingData.subCategory && getSubSubCategories().length > 0 && (
                        <div>
                          <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Configurazione Locali:</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                            {getSubSubCategories().map((subSubCategory) => (
                              <button
                                key={subSubCategory}
                                type="button"
                                onClick={() => setListingData(prev => ({ ...prev, subSubCategory }))}
                                className={`p-2.5 sm:p-3 border rounded-lg text-center transition-all cursor-pointer ${
                                  listingData.subSubCategory === subSubCategory
                                    ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                    : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                }`}
                              >
                                <div className="text-xs sm:text-sm font-medium break-words">{subSubCategory}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Business Activities - EXACT SAME as hero */}
                      {shouldShowBusinessActivities && (
                        <div>
                          <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Attività Commerciali:</label>
                          <div className="border border-[#E8E4E0] rounded-lg p-3 sm:p-4">
                            <div className="mb-3 sm:mb-4">
                              <input
                                type="text"
                                placeholder="Cerca attività commerciali..."
                                value={businessSearch}
                                onChange={(e) => setBusinessSearch(e.target.value)}
                                className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm"
                              />
                            </div>
                            <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {getFilteredBusinessActivities().map((activity) => (
                                  <label
                                    key={activity}
                                    className="flex items-center space-x-2 p-2 hover:bg-[#F9F6F3] rounded cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={listingData.businessActivities.includes(activity)}
                                      onChange={(e) => {
                                        const newActivities = e.target.checked
                                          ? [...listingData.businessActivities, activity]
                                          : listingData.businessActivities.filter(a => a !== activity);
                                        setListingData(prev => ({ ...prev, businessActivities: newActivities }));
                                      }}
                                      className="w-4 h-4 text-[#D97860] border-[#E8E4E0] rounded focus:ring-[#D97860] focus:ring-2 flex-shrink-0"
                                    />
                                    <span className="text-xs sm:text-sm text-[#5C4B42] break-words">{activity}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                          {listingData.businessActivities.length > 0 && (
                            <div className="mt-2 text-xs sm:text-sm text-[#5C4B42]">
                              Selezionate: {listingData.businessActivities.length} attività
                            </div>
                          )}
                        </div>
                      )}

                      {/* Zone Selection with Hierarchical Dropdown - EXACT SAME as hero search bar */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Dove a Roma?</label>
                        <div className="relative" ref={zoneDropdownRef}>
                          {/* Dropdown Button */}
                          <button
                            type="button"
                            onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                            className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-8 border border-[#E8E4E0] rounded-lg bg-white text-[#5C4B42] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-left flex items-center justify-between text-sm sm:text-base"
                            aria-expanded={showZoneDropdown}
                            aria-haspopup="true"
                          >
                            <span className="truncate">
                              {listingData.zone || 'Seleziona zona di Roma...'}
                            </span>
                            <i className={`ri-arrow-down-s-line transition-transform ${showZoneDropdown ? 'rotate-180' : ''}`}></i>
                          </button>

                          {/* Dropdown Content */}
                          {showZoneDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-[#E8E4E0] rounded-lg shadow-lg z-50 w-full sm:w-[500px] max-h-[300px] sm:max-h-[400px]">
                              {/* Search Input */}
                              <div className="p-3 border-b border-[#E8E4E0]">
                                <input
                                  type="text"
                                  placeholder="Cerca zone..."
                                  value={zoneSearch}
                                  onChange={(e) => setZoneSearch(e.target.value)}
                                  className="w-full px-3 py-2.5 sm:py-2 border border-[#E8E4E0] rounded-lg text-[#5C4B42] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>

                              {/* Hierarchical Zones List */}
                              <div className="overflow-y-auto h-[240px] sm:h-[320px]">
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
                                          className="w-6 h-6 flex items-center justify-center mr-2 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                                        >
                                          <i className={`ri-arrow-right-s-line text-sm transition-transform ${isExpanded ? 'rotate-90' : ''}`}></i>
                                        </button>

                                        {/* Macro Zone Button */}
                                        <button
                                          type="button"
                                          onClick={() => handleMacroZoneToggle(macroZone)}
                                          className={`flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-1 p-2 rounded transition-colors min-w-0 ${
                                            listingData.zone === macroZone ? 'bg-[#F9F6F3] text-[#D97860] font-medium' : 'text-[#5C4B42]'
                                          }`}
                                        >
                                          <span className="text-xs sm:text-sm font-medium flex-1 text-left break-words">
                                            {macroZone}
                                          </span>
                                          <span className="text-xs text-[#5C4B42] flex-shrink-0">
                                            ({(romeZones[macroZone as keyof typeof romeZones] || []).length + 1})
                                          </span>
                                        </button>
                                      </div>

                                      {/* Sub Zones - Only show when expanded */}
                                      {isExpanded && hasVisibleSubZones && (
                                        <div className="bg-gray-50">
                                          {subZones.map((subZone) => (
                                            <button
                                              key={subZone}
                                              type="button"
                                              onClick={() => handleZoneToggle(subZone)}
                                              className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 pl-8 sm:pl-12 hover:bg-[#F9F6F3] cursor-pointer transition-colors min-w-0 ${
                                                listingData.zone === subZone ? 'bg-[#F9F6F3] text-[#D97860] font-medium' : 'text-[#5C4B42]'
                                              }`}
                                            >
                                              <span className="text-xs sm:text-sm flex-1 text-left break-words">
                                                {subZone}
                                              </span>
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Selected Zone Display */}
                              {listingData.zone && (
                                <div className="p-3 border-t border-[#E8E4E0] bg-[#F9F6F3]">
                                  <div className="text-xs sm:text-sm text-[#5C4B42]">
                                    Selezionata: <span className="font-medium text-[#D97860] break-words">{listingData.zone}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* NEW: Street Address Input with Google Places Autocomplete */}
                      {listingData.zone && (
                        <div>
                          <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">
                            Indirizzo <span className="text-[#D97860]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              ref={addressInputRef}
                              type="text"
                              value={listingData.address}
                              onChange={(e) => setListingData(prev => ({ ...prev, address: e.target.value }))}
                              placeholder="Via, Piazza, Viale... (es. Via del Corso, 123)"
                              className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 border border-[#E8E4E0] rounded-lg bg-white text-[#5C4B42] focus:border-[#D97860] focus:ring-2 focus:ring-[#D97860]/20 transition-colors text-sm sm:text-lg"
                              required
                            />
                            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                              <i className="ri-map-pin-line text-[#C9A876] text-lg sm:text-xl"></i>
                            </div>
                          </div>
                          <div className="mt-2 text-xs sm:text-sm text-[#8B7355]">
                            <i className="ri-information-line mr-1"></i>
                            Inizia a digitare e seleziona dai suggerimenti per una posizione accurata
                          </div>
                          {listingData.address && (
                            <div className="mt-2 p-2.5 sm:p-3 bg-[#F9F6F3] rounded-lg border border-[#E8E4E0]">
                              <div className="text-xs sm:text-sm text-[#5C4B42]">
                                <i className="ri-check-line text-[#D97860] mr-2"></i>
                                <strong>Indirizzo Selezionato:</strong> <span className="break-words">{listingData.address}, {listingData.zone}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Property Details */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#5C4B42] mb-2">Dettagli Immobile</h2>
                    <p className="text-[#8B7355] mb-6 sm:mb-8 text-sm sm:text-base">Aggiungi foto e informazioni essenziali</p>

                    <div className="space-y-6 sm:space-y-8">
                      {/* Auto-generated Title */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Titolo Immobile:</label>
                        <input
                          type="text"
                          value={listingData.title}
                          onChange={(e) => setListingData(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-lg"
                          placeholder="es. Bellissimo appartamento in Centro Storico"
                        />
                      </div>

                      {/* Basic Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Prezzo (€)</label>
                          <input
                            type="number"
                            value={listingData.price}
                            onChange={(e) => setListingData(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="450000"
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Dimensione (m²)</label>
                          <input
                            type="number"
                            value={listingData.sqm}
                            onChange={(e) => setListingData(prev => ({ ...prev, sqm: e.target.value }))}
                            placeholder="85"
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Locali</label>
                          <select
                            value={listingData.rooms}
                            onChange={(e) => setListingData(prev => ({ ...prev, rooms: e.target.value }))}
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent pr-8 text-sm sm:text-base"
                          >
                            <option value="">Seleziona</option>
                            {roomOptions.map((room) => (
                              <option key={room} value={room}>{room}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Bagni</label>
                          <select
                            value={listingData.bathrooms}
                            onChange={(e) => setListingData(prev => ({ ...prev, bathrooms: e.target.value }))}
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent pr-8 text-sm sm:text-base"
                          >
                            <option value="">Seleziona</option>
                            {bathroomOptions.map((bath) => (
                              <option key={bath} value={bath}>{bath}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Piano</label>
                          <select
                            value={listingData.floor}
                            onChange={(e) => setListingData(prev => ({ ...prev, floor: e.target.value }))}
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent pr-8 text-sm sm:text-base"
                          >
                            <option value="">Seleziona piano</option>
                            {floorOptions.map((floor) => (
                              <option key={floor} value={floor}>{floor}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Classe Energetica</label>
                          <select
                            value={listingData.energyClass}
                            onChange={(e) => setListingData(prev => ({ ...prev, energyClass: e.target.value }))}
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent pr-8 text-sm sm:text-base"
                          >
                            <option value="">Seleziona classe</option>
                            {energyClasses.map((energyClass) => (
                              <option key={energyClass} value={energyClass}>{energyClass}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#5C4B42] mb-2">Anno Costruzione</label>
                          <input
                            type="number"
                            value={listingData.yearBuilt}
                            onChange={(e) => setListingData(prev => ({ ...prev, yearBuilt: e.target.value }))}
                            placeholder="2020"
                            min="1800"
                            max={new Date().getFullYear()}
                            className="w-full px-3 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Condition */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Condizioni:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                          {conditions.map((condition) => (
                            <button
                              key={condition}
                              type="button"
                              onClick={() => setListingData(prev => ({ ...prev, condition }))}
                              className={`p-3 sm:p-4 border rounded-lg text-center transition-all cursor-pointer ${
                                listingData.condition === condition
                                  ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                  : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{condition}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Features - Category Specific */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">
                          {listingData.mainCategory === 'Case-Appartamenti' && 'Caratteristiche Immobile:'}
                          {listingData.mainCategory === 'Commerciale' && 'Caratteristiche Commerciali:'}
                          {listingData.mainCategory === 'Ufficio' && 'Caratteristiche Ufficio:'}
                          {listingData.mainCategory === 'Garage-Posti auto' && 'Caratteristiche Garage:'}
                          {listingData.mainCategory === 'Magazzini-Depositi' && 'Caratteristiche Deposito:'}
                          {listingData.mainCategory === 'Capannoni' && 'Caratteristiche Industriali:'}
                          {listingData.mainCategory === 'Terreni' && 'Caratteristiche Terreno:'}
                          {listingData.mainCategory === 'Nuove Costruzioni' && 'Caratteristiche Nuova Costruzione:'}
                          {!listingData.mainCategory && 'Caratteristiche Immobile:'}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                          {getPropertyFeatures().map((feature) => (
                            <button
                              key={feature}
                              type="button"
                              onClick={() => handleFeatureToggle(feature)}
                              className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                listingData.features.includes(feature)
                                  ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                  : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                              }`}
                            >
                              <div className="text-xs sm:text-sm font-medium break-words">{feature}</div>
                            </button>
                          ))}
                        </div>
                        {listingData.features.length > 0 && (
                          <div className="mt-2 text-xs sm:text-sm text-[#5C4B42]">
                            Selezionate: {listingData.features.length} caratteristiche
                          </div>
                        )}
                        {getPropertyFeatures().length === 0 && listingData.mainCategory && (
                          <div className="text-center py-6 sm:py-8 text-[#8B7355]">
                            <i className="ri-information-line text-xl sm:text-2xl mb-2 block"></i>
                            <p className="text-sm sm:text-base">Seleziona una categoria per vedere le caratteristiche disponibili</p>
                          </div>
                        )}
                      </div>

                      {/* Category-Specific Fields */}
                      {/* Garage-Specific Fields */}
                      {listingData.mainCategory === 'Garage-Posti auto' && (
                        <div className="space-y-4 sm:space-y-6">
                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Tipo Garage:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                              {garageTypes.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setListingData(prev => ({ ...prev, garageType: type }))}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-center transition-all cursor-pointer ${
                                    listingData.garageType === type
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium break-words">{type}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Caratteristiche Sicurezza:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                              {securityOptions.map((security) => (
                                <button
                                  key={security}
                                  type="button"
                                  onClick={() => handleSecurityToggle(security)}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                    listingData.security.includes(security)
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium break-words">{security}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Orari Accesso:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                              {accessOptions.map((access) => (
                                <button
                                  key={access}
                                  type="button"
                                  onClick={() => setListingData(prev => ({ ...prev, access }))}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-center transition-all cursor-pointer ${
                                    listingData.access === access
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium">{access}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Office-Specific Fields */}
                      {listingData.mainCategory === 'Ufficio' && (
                        <div className="space-y-4 sm:space-y-6">
                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Tipo Ufficio:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                              {officeTypes.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setListingData(prev => ({ ...prev, officeType: type }))}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-center transition-all cursor-pointer ${
                                    listingData.officeType === type
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium">{type}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Servizi Disponibili:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                              {officeServices.map((service) => (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => handleServiceToggle(service)}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                    listingData.services.includes(service)
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium break-words">{service}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Commercial-Specific Fields */}
                      {listingData.mainCategory === 'Commerciale' && (
                        <div className="space-y-4 sm:space-y-6">
                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Visibilità:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                              {visibilityOptions.map((visibility) => (
                                <button
                                  key={visibility}
                                  type="button"
                                  onClick={() => setListingData(prev => ({ ...prev, visibility }))}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-center transition-all cursor-pointer ${
                                    listingData.visibility === visibility
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium">{visibility}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Land-Specific Fields */}
                      {listingData.mainCategory === 'Terreni' && (
                        <div className="space-y-4 sm:space-y-6">
                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Diritti Edificatori:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                              {buildingRightsOptions.map((right) => (
                                <button
                                  key={right}
                                  type="button"
                                  onClick={() => handleBuildingRightsToggle(right)}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                    listingData.buildingRights.includes(right)
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium break-words">{right}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Utenze Disponibili:</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                              {utilitiesOptions.map((utility) => (
                                <button
                                  key={utility}
                                  type="button"
                                  onClick={() => handleUtilitiesToggle(utility)}
                                  className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                    listingData.utilities.includes(utility)
                                      ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                      : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                                  }`}
                                >
                                  <div className="text-xs sm:text-sm font-medium">{utility}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Photos */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">
                          Foto <span className="text-[#D97860]">(minimo 3)</span>
                        </label>
                        <div className="border-2 border-dashed border-[#E8E4E0] rounded-lg p-6 sm:p-8 text-center mb-4 sm:mb-6">
                          <i className="ri-camera-line text-3xl sm:text-4xl text-[#8B7355] mb-3 sm:mb-4"></i>
                          <p className="text-[#8B7355] mb-3 sm:mb-4 text-sm sm:text-base">Trascina e rilascia le foto o clicca per caricare</p>
                          <p className="text-xs sm:text-sm text-[#8B7355] mb-3 sm:mb-4">Massimo 10 foto • JPG, PNG fino a 5MB ciascuna</p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label
                            htmlFor="photo-upload"
                            className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-[#D97860] text-white rounded-lg hover:bg-[#C86B52] transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                          >
                            Scegli Foto
                          </label>
                        </div>

                        {listingData.photos.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                            {listingData.photos.map((photo, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Foto immobile ${index + 1}`}
                                  className="w-full h-20 sm:h-24 object-cover rounded-lg"
                                />
                                <button
                                  onClick={() => removePhoto(index)}
                                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer text-xs"
                                >
                                  <i className="ri-close-line"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">
                          Descrizione <span className="text-[#8B7355]">(opzionale)</span>
                        </label>
                        <textarea
                          value={listingData.description}
                          onChange={(e) => setListingData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Racconta agli acquirenti le migliori caratteristiche del tuo immobile, ristrutturazioni recenti, servizi nelle vicinanze..."
                          rows={4}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent resize-none text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact & Publish */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#5C4B42] mb-2">Come Possono Contattarti gli Acquirenti?</h2>
                    <p className="text-[#8B7355] mb-6 sm:mb-8 text-sm sm:text-base">Scegli almeno un metodo di contatto</p>

                    <div className="space-y-6 sm:space-y-8">
                      {/* Contact Methods */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="phone-check"
                              checked={!!listingData.contact.phone}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  setListingData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, phone: '', whatsapp: '' }
                                  }));
                                }
                              }}
                              className="mr-3 w-4 h-4 sm:w-5 sm:h-5 text-[#D97860] rounded focus:ring-[#D97860]"
                            />
                            <label htmlFor="phone-check" className="text-base sm:text-lg font-medium text-[#5C4B42]">
                              <i className="ri-phone-line mr-2"></i>Telefono
                            </label>
                          </div>
                          <input
                            type="tel"
                            value={listingData.contact.phone}
                            onChange={(e) => setListingData(prev => ({
                              ...prev,
                              contact: { ...prev.contact, phone: e.target.value, whatsapp: e.target.value }
                            }))}
                            placeholder="+39 123 456 7890"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="email-check"
                              checked={!!listingData.contact.email}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  setListingData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, email: '' }
                                  }));
                                }
                              }}
                              className="mr-3 w-4 h-4 sm:w-5 sm:h-5 text-[#D97860] rounded focus:ring-[#D97860]"
                            />
                            <label htmlFor="email-check" className="text-base sm:text-lg font-medium text-[#5C4B42]">
                              <i className="ri-mail-line mr-2"></i>Email
                            </label>
                          </div>
                          <input
                            type="email"
                            value={listingData.contact.email}
                            onChange={(e) => setListingData(prev => ({
                              ...prev,
                              contact: { ...prev.contact, email: e.target.value }
                            }))}
                            placeholder="tua@email.com"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="whatsapp-check"
                              checked={!!listingData.contact.whatsapp}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  setListingData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, whatsapp: '' }
                                  }));
                                }
                              }}
                              className="mr-3 w-4 h-4 sm:w-5 sm:h-5 text-[#D97860] rounded focus:ring-[#D97860]"
                            />
                            <label htmlFor="whatsapp-check" className="text-base sm:text-lg font-medium text-[#5C4B42]">
                              <i className="ri-whatsapp-line mr-2"></i>WhatsApp
                            </label>
                          </div>
                          <input
                            type="tel"
                            value={listingData.contact.whatsapp}
                            onChange={(e) => setListingData(prev => ({
                              ...prev,
                              contact: { ...prev.contact, whatsapp: e.target.value }
                            }))}
                            placeholder="+39 123 456 7890"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Contact Preferences */}
                      <div>
                        <label className="block text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">
                          Preferenze di Contatto <span className="text-[#8B7355]">(opzionale)</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                          {[
                            'Preferisco messaggi WhatsApp',
                            'Chiamare solo dopo le 18:00',
                            'Prima email, poi chiamata',
                            'Solo weekend',
                            'Solo richieste serie',
                            'Solo lingua italiana'
                          ].map((pref) => (
                            <button
                              key={pref}
                              type="button"
                              onClick={() => handleContactPreference(pref)}
                              className={`p-2.5 sm:p-3 border rounded-lg text-left transition-all cursor-pointer ${
                                listingData.contact.preferences.includes(pref)
                                  ? 'border-[#D97860] bg-[#F9F6F3] text-[#D97860]'
                                  : 'border-[#E8E4E0] hover:border-[#D97860]/50'
                              }`}
                            >
                              <div className="text-xs sm:text-sm break-words">{pref}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Preview */}
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-[#5C4B42] mb-3 sm:mb-4">Anteprima - Come Apparirà il Tuo Immobile:</h3>
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-[#E8E4E0]">
                          <div className="flex flex-col sm:flex-row">
                            <div className="w-full sm:w-32 h-32 sm:h-24 bg-gray-200 rounded-lg mb-3 sm:mb-0 sm:mr-4 flex items-center justify-center flex-shrink-0">
                              {listingData.photos.length > 0 ? (
                                <img
                                  src={URL.createObjectURL(listingData.photos[0])}
                                  alt="Anteprima immobile"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <i className="ri-image-line text-gray-400 text-xl sm:text-2xl"></i>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {/* Extract business name from description and format display */}
                              {(() => {
                                // Extract business name from description (text before "in", "via", "presso", "a", or other location indicators)
                                const description = listingData.description || '';
                                const title = listingData.title || '';
                                let businessName = '';

                                // First try to extract from description
                                if (description) {
                                  // Look for various patterns that indicate business name before location
                                  const patterns = [
                                    /^([^,]+?)(?:\s+(?:in|via|presso|a|su|di|per|dal|dalla|nel|nella|all'|alla)\s+)/i,
                                    /^([^,]+?)(?:\s+[-–]\s+)/i, // Dash separator
                                    /^([^.!?]+?)(?:\s*[.!?]\s*)/i, // Sentence ending
                                    /^([^,]+?)(?:\s*,\s*)/i // Comma separator
                                  ];

                                  for (const pattern of patterns) {
                                    const match = description.match(pattern);
                                    if (match && match[1].trim().length > 3 && match[1].trim().length <= 60) {
                                      businessName = match[1].trim();
                                      break;
                                    }
                                  }

                                  // If no pattern found, take first meaningful part
                                  if (!businessName) {
                                    const words = description.trim().split(/\s+/);
                                    if (words.length >= 2 && words.length <= 8) {
                                      const firstPart = words.slice(0, Math.min(6, words.length)).join(' ');
                                      if (firstPart.length <= 50 && !firstPart.toLowerCase().includes('vendesi') && !firstPart.toLowerCase().includes('affittasi')) {
                                        businessName = firstPart;
                                      }
                                    }
                                  }
                                }

                                // If no business name from description, try to extract from title
                                if (!businessName && title) {
                                  const patterns = [
                                    /^([^,]+?)(?:\s+(?:in|via|presso|a|su|di|per|dal|dalla|nel|nella|all'|alla)\s+)/i,
                                    /^([^,]+?)(?:\s+[-–]\s+)/i,
                                    /^([^.!?]+?)(?:\s*[.!?]\s*)/i,
                                    /^([^,]+?)(?:\s*,\s*)/i
                                  ];

                                  for (const pattern of patterns) {
                                    const match = title.match(pattern);
                                    if (match && match[1].trim().length > 3 && match[1].trim().length <= 60) {
                                      businessName = match[1].trim();
                                      break;
                                    }
                                  }
                                }

                                // Clean up business name
                                if (businessName) {
                                  // Remove common property-related words that might interfere
                                  businessName = businessName.replace(/\b(vendesi|affittasi|immobile|proprietà|casa|appartamento|garage|box|posto auto|locale|ufficio|negozio|terreno)\b/gi, '').trim();
                                  // Remove extra spaces
                                  businessName = businessName.replace(/\s+/g, ' ').trim();
                                  // If cleaned result is too short, don't use it
                                  if (businessName.length < 3) {
                                    businessName = '';
                                  }
                                }

                                return (
                                  <div className="space-y-1">
                                    {/* Business Name - Only show if we found a meaningful one */}
                                    {businessName && (
                                      <h4 className="font-semibold text-[#5C4B42] text-base sm:text-lg break-words">{businessName}</h4>
                                    )}

                                    {/* Property Title - Show if no business name extracted or as fallback */}
                                    {!businessName && title && (
                                      <h4 className="font-semibold text-[#5C4B42] text-base sm:text-lg break-words">{title}</h4>
                                    )}

                                    {/* Zone */}
                                    <div className="text-xs sm:text-sm text-[#8B7355] font-medium">
                                      {listingData.zone || 'Zona'}
                                    </div>

                                    {/* Street Address */}
                                    <div className="text-xs sm:text-sm text-[#8B7355] break-words">
                                      {listingData.address || 'Indirizzo'}
                                    </div>

                                    {/* Price and specs on separate line */}
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3 pt-2 border-t border-gray-300">
                                      <span className="font-semibold text-[#D97860] text-sm sm:text-base">
                                        {listingData.price ? formatPrice(listingData.price) : '€Prezzo'}
                                        {listingData.listingType === 'rent' ? '/mese' : ''}
                                      </span>
                                      <span className="text-xs sm:text-sm text-[#8B7355]">{listingData.sqm || '0'} m²</span>
                                      {listingData.rooms && listingData.mainCategory === 'Case-Appartamenti' && <span className="text-xs sm:text-sm text-[#8B7355]">{listingData.rooms} locali</span>}
                                      {listingData.bathrooms && listingData.mainCategory === 'Case-Appartamenti' && <span className="text-xs sm:text-sm text-[#8B7355]">{listingData.bathrooms} bagni</span>}
                                      {listingData.garageType && <span className="text-xs sm:text-sm text-[#8B7355]">{listingData.garageType}</span>}
                                      {listingData.officeType && <span className="text-xs sm:text-sm text-[#8B7355]">{listingData.officeType}</span>}
                                    </div>

                                    {/* Features if any */}
                                    {listingData.features.length > 0 && (
                                      <div className="flex items-center mt-2">
                                        <i className="ri-star-line mr-2 text-[#C9A876]"></i>
                                        <span className="text-xs text-[#8B7355] break-words">
                                          {listingData.features.slice(0, 3).join(', ')}
                                          {listingData.features.length > 3 && ` +${listingData.features.length - 3} altre`}
                                        </span>
                                      </div>
                                    )}

                                    {/* Category-specific information */}
                                    {listingData.mainCategory && (
                                      <div className="text-xs text-[#8B7355] mt-2">
                                        <i className="ri-building-line mr-1"></i>
                                        <span className="break-words">
                                          {listingData.subSubCategory || listingData.subCategory || listingData.mainCategory}
                                          {listingData.businessActivities.length > 0 && ` • ${listingData.businessActivities[0]}`}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="text-center">
                        <button
                          onClick={handleSubmit}
                          disabled={!canProceed()}
                          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all whitespace-nowrap ${
                            canProceed()
                              ? 'bg-[#D97860] text-white hover:bg-[#C86B52] cursor-pointer'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <i className="ri-rocket-line mr-2"></i>
                          Pubblica Immobile
                        </button>
                        <p className="text-xs sm:text-sm text-[#8B7355] mt-3 sm:mt-4 px-2">
                          {!isLoggedIn ? 'Login richiesto per pubblicare il tuo immobile' : 'Il tuo immobile sarà pubblicato a breve'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#E8E4E0] gap-3 sm:gap-0">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                      currentStep === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-[#5C4B42] hover:bg-gray-300 cursor-pointer'
                    }`}
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Precedente
                  </button>

                  {currentStep < 3 && (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                        canProceed()
                          ? 'bg-[#D97860] text-white hover:bg-[#C86B52] cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Successivo
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </main>

        <Footer />

        {/* Login Modal for Publishing */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </>
  );
}
