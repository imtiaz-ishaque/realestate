
export const featuredProperties = [
  // CASE-APPARTAMENTI - Various apartment types
  {
    id: 1,
    title: "Monolocale Moderno in Trastevere",
    price: 1200,
    type: "rent",
    category: "Case-Appartamenti",
    subCategory: "Appartamento",
    subSubCategory: "Monolocale",
    zone: "Trastevere",
    coordinates: { lat: 41.8896, lng: 12.4656 },
    sqm: 35,
    surface: 35,
    rooms: 1,
    bathrooms: 1,
    floor: 2,
    energy: "B",
    energyClass: "B",
    condition: "Nuovo",
    features: ["Balcone", "Aria condizionata"],
    image: "https://readdy.ai/api/search-image?query=Modern%20studio%20apartment%20interior%20in%20Rome%20Trastevere%20with%20compact%20design%2C%20contemporary%20furniture%2C%20efficient%20space%20usage%2C%20bright%20natural%20light%2C%20minimalist%20Italian%20style&width=400&height=300&seq=1&orientation=landscape",
    commission: "0%"
  },
  {
    id: 2,
    title: "Bilocale Elegante in Parioli",
    price: 750000,
    type: "buy",
    category: "Case-Appartamenti",
    subCategory: "Appartamento",
    subSubCategory: "Bilocale",
    zone: "Parioli",
    coordinates: { lat: 41.9194, lng: 12.4906 },
    sqm: 65,
    surface: 65,
    rooms: 2,
    bathrooms: 1,
    floor: 3,
    energy: "A",
    energyClass: "A",
    condition: "Eccellente",
    features: ["Balcone", "Ascensore", "Cantina"],
    image: "https://readdy.ai/api/search-image?query=Elegant%20two-room%20apartment%20interior%20in%20Rome%20Parioli%20with%20sophisticated%20design%2C%20marble%20floors%2C%20designer%20furniture%2C%20luxury%20finishes%2C%20Italian%20elegance&width=400&height=300&seq=2&orientation=landscape",
    commission: "0%"
  },
  {
    id: 3,
    title: "Trilocale con Terrazza in Monti",
    price: 2200,
    type: "rent",
    category: "Case-Appartamenti",
    subCategory: "Appartamento",
    subSubCategory: "Trilocale",
    zone: "Monti",
    coordinates: { lat: 41.8947, lng: 12.4839 },
    sqm: 85,
    surface: 85,
    rooms: 3,
    bathrooms: 2,
    floor: 4,
    energy: "C",
    energyClass: "C",
    condition: "Buono",
    features: ["Terrazza", "Ascensore", "Camino"],
    image: "https://readdy.ai/api/search-image?query=Three-room%20apartment%20with%20terrace%20in%20Rome%20Monti%20neighborhood%2C%20historic%20building%2C%20modern%20interior%2C%20rooftop%20terrace%20with%20city%20views%2C%20cozy%20atmosphere&width=400&height=300&seq=3&orientation=landscape",
    commission: "0%"
  },
  {
    id: 4,
    title: "Quadrilocale di Lusso in Centro Storico",
    price: 1200000,
    type: "buy",
    category: "Case-Appartamenti",
    subCategory: "Appartamento",
    subSubCategory: "Quadrilocale",
    zone: "Centro Storico",
    coordinates: { lat: 41.8986, lng: 12.4768 },
    sqm: 120,
    surface: 120,
    rooms: 4,
    bathrooms: 2,
    floor: 2,
    energy: "B",
    energyClass: "B",
    condition: "Ristrutturato",
    features: ["Balcone", "Terrazza", "Camino", "Cantina"],
    image: "https://readdy.ai/api/search-image?query=Luxury%20four-room%20apartment%20in%20Rome%20historic%20center%20with%20elegant%20interior%2C%20high%20ceilings%2C%20period%20details%2C%20modern%20amenities%2C%20sophisticated%20Italian%20design&width=400&height=300&seq=4&orientation=landscape",
    commission: "0%"
  },
  {
    id: 5,
    title: "Villa con Giardino in EUR",
    price: 1800000,
    type: "buy",
    category: "Case-Appartamenti",
    subCategory: "Villa",
    zone: "EUR",
    coordinates: { lat: 41.8338, lng: 12.4677 },
    sqm: 250,
    surface: 250,
    rooms: 5,
    bathrooms: 3,
    floor: 0,
    energy: "A",
    energyClass: "A",
    condition: "Nuovo",
    features: ["Giardino", "Parcheggio", "Terrazza", "Piscina"],
    image: "https://readdy.ai/api/search-image?query=Luxury%20villa%20with%20garden%20in%20Rome%20EUR%20district%2C%20modern%20architecture%2C%20swimming%20pool%2C%20manicured%20landscaping%2C%20elegant%20facade%2C%20premium%20materials&width=400&height=300&seq=5&orientation=landscape",
    commission: "0%"
  },
  {
    id: 6,
    title: "Attico con Vista in Flaminio",
    price: 2200000,
    type: "buy",
    category: "Case-Appartamenti",
    subCategory: "Attico / Mansarda",
    zone: "Flaminio",
    coordinates: { lat: 41.9194, lng: 12.4706 },
    sqm: 180,
    surface: 180,
    rooms: 4,
    bathrooms: 3,
    floor: 8,
    energy: "A+",
    energyClass: "A+",
    condition: "Nuovo",
    features: ["Terrazza", "Ascensore", "Parcheggio", "Vista panoramica"],
    image: "https://readdy.ai/api/search-image?query=Luxury%20penthouse%20with%20panoramic%20terrace%20in%20Rome%20Flaminio%2C%20modern%20interior%2C%20floor-to-ceiling%20windows%2C%20rooftop%20garden%2C%20stunning%20city%20views&width=400&height=300&seq=6&orientation=landscape",
    commission: "0%"
  },

  // COMMERCIALE - Various business types
  {
    id: 7,
    title: "Negozio di Abbigliamento in Via del Corso",
    price: 4500,
    type: "rent",
    category: "Commerciale",
    subCategory: "Negozio commerciale",
    zone: "Centro Storico",
    coordinates: { lat: 41.9028, lng: 12.4764 },
    sqm: 80,
    surface: 80,
    rooms: 2,
    bathrooms: 1,
    floor: 0,
    energy: "C",
    energyClass: "C",
    condition: "Buono",
    visibility: "Alta",
    commercialType: "Negozio",
    image: "https://readdy.ai/api/search-image?query=Modern%20clothing%20store%20interior%20in%20Rome%20Via%20del%20Corso%20with%20large%20windows%2C%20display%20areas%2C%20fitting%20rooms%2C%20contemporary%20retail%20design%2C%20high%20foot%20traffic%20location&width=400&height=300&seq=7&orientation=landscape",
    commission: "0%"
  },
  {
    id: 8,
    title: "Farmacia Storica in Esquilino",
    price: 5200,
    type: "rent",
    category: "Commerciale",
    subCategory: "Attività/Licenza commerciale",
    businessActivities: ["Farmacia"],
    zone: "Esquilino",
    coordinates: { lat: 41.8975, lng: 12.5019 },
    sqm: 90,
    surface: 90,
    rooms: 3,
    bathrooms: 1,
    floor: 0,
    energy: "B",
    energyClass: "B",
    condition: "Eccellente",
    visibility: "Alta",
    commercialType: "Negozio",
    image: "https://readdy.ai/api/search-image?query=Professional%20pharmacy%20interior%20in%20Rome%20Esquilino%20with%20modern%20shelving%2C%20consultation%20area%2C%20medical%20equipment%2C%20clean%20white%20design%2C%20professional%20lighting&width=400&height=300&seq=8&orientation=landscape",
    commission: "0%"
  },
  {
    id: 9,
    title: "Ristorante Tradizionale in Trastevere",
    price: 6800,
    type: "rent",
    category: "Commerciale",
    subCategory: "Attività/Licenza commerciale",
    businessActivities: ["Ristorante", "Bar"],
    zone: "Trastevere",
    coordinates: { lat: 41.8889, lng: 12.4681 },
    sqm: 120,
    surface: 120,
    rooms: 4,
    bathrooms: 2,
    floor: 0,
    energy: "C",
    energyClass: "C",
    condition: "Buono",
    visibility: "Alta",
    commercialType: "Ristorante",
    image: "https://readdy.ai/api/search-image?query=Traditional%20Italian%20restaurant%20interior%20in%20Rome%20Trastevere%20with%20rustic%20decor%2C%20dining%20tables%2C%20professional%20kitchen%2C%20warm%20atmosphere%2C%20authentic%20Roman%20style&width=400&height=300&seq=9&orientation=landscape",
    commission: "0%"
  },
  {
    id: 10,
    title: "Parrucchiere Moderno in Prati",
    price: 2800,
    type: "rent",
    category: "Commerciale",
    subCategory: "Attività/Licenza commerciale",
    businessActivities: ["Parrucchiere – Barbiere"],
    zone: "Prati",
    coordinates: { lat: 41.9097, lng: 12.4656 },
    sqm: 60,
    surface: 60,
    rooms: 2,
    bathrooms: 1,
    floor: 0,
    energy: "B",
    energyClass: "B",
    condition: "Ristrutturato",
    visibility: "Media",
    commercialType: "Negozio",
    image: "https://readdy.ai/api/search-image?query=Modern%20hair%20salon%20interior%20in%20Rome%20Prati%20with%20styling%20stations%2C%20mirrors%2C%20professional%20equipment%2C%20contemporary%20design%2C%20clean%20aesthetic&width=400&height=300&seq=10&orientation=landscape",
    commission: "0%"
  },
  {
    id: 11,
    title: "Laboratorio Artigianale in Ostiense",
    price: 1800,
    type: "rent",
    category: "Commerciale",
    subCategory: "Laboratorio",
    zone: "Ostiense",
    coordinates: { lat: 41.8583, lng: 12.4781 },
    sqm: 150,
    surface: 150,
    rooms: 3,
    bathrooms: 1,
    floor: 0,
    energy: "D",
    energyClass: "D",
    condition: "Da ristrutturare",
    visibility: "Bassa",
    commercialType: "Laboratorio",
    image: "https://readdy.ai/api/search-image?query=Artisan%20workshop%20space%20in%20Rome%20Ostiense%20with%20high%20ceilings%2C%20work%20benches%2C%20industrial%20lighting%2C%20creative%20workspace%2C%20raw%20industrial%20aesthetic&width=400&height=300&seq=11&orientation=landscape",
    commission: "0%"
  },

  // UFFICIO - Various office types
  {
    id: 12,
    title: "Ufficio Singolo in Parioli",
    price: 2200,
    type: "rent",
    category: "Ufficio",
    zone: "Parioli",
    coordinates: { lat: 41.9150, lng: 12.4890 },
    sqm: 45,
    surface: 45,
    rooms: 2,
    bathrooms: 1,
    floor: 3,
    energy: "B",
    energyClass: "B",
    condition: "Eccellente",
    officeType: "Singolo",
    services: ["Reception", "Internet", "Pulizie"],
    image: "https://readdy.ai/api/search-image?query=Professional%20single%20office%20space%20in%20Rome%20Parioli%20with%20modern%20furniture%2C%20natural%20lighting%2C%20business%20environment%2C%20elegant%20design%2C%20executive%20workspace&width=400&height=300&seq=12&orientation=landscape",
    commission: "0%"
  },
  {
    id: 13,
    title: "Open Space Moderno in EUR",
    price: 4500,
    type: "rent",
    category: "Ufficio",
    zone: "EUR",
    coordinates: { lat: 41.8350, lng: 12.4700 },
    sqm: 180,
    surface: 180,
    rooms: 1,
    bathrooms: 2,
    floor: 5,
    energy: "A",
    energyClass: "A",
    condition: "Nuovo",
    officeType: "Open space",
    services: ["Reception", "Internet", "Aria condizionata", "Sicurezza"],
    image: "https://readdy.ai/api/search-image?query=Modern%20open%20space%20office%20in%20Rome%20EUR%20with%20collaborative%20workspace%2C%20contemporary%20design%2C%20natural%20light%2C%20flexible%20seating%2C%20professional%20environment&width=400&height=300&seq=13&orientation=landscape",
    commission: "0%"
  },
  {
    id: 14,
    title: "Ufficio Condiviso in Centro",
    price: 800,
    type: "rent",
    category: "Ufficio",
    zone: "Centro Storico",
    coordinates: { lat: 41.8950, lng: 12.4800 },
    sqm: 25,
    surface: 25,
    rooms: 1,
    bathrooms: 1,
    floor: 2,
    energy: "C",
    energyClass: "C",
    condition: "Buono",
    officeType: "Condiviso",
    services: ["Internet", "Pulizie"],
    image: "https://readdy.ai/api/search-image?query=Shared%20office%20space%20in%20Rome%20historic%20center%20with%20coworking%20desks%2C%20collaborative%20environment%2C%20modern%20amenities%2C%20professional%20atmosphere&width=400&height=300&seq=14&orientation=landscape",
    commission: "0%"
  },

  // GARAGE-POSTI AUTO - Various parking types
  {
    id: 15,
    title: "Box Auto Singolo in Prati",
    price: 180,
    type: "rent",
    category: "Garage-Posti auto",
    zone: "Prati",
    coordinates: { lat: 41.9097, lng: 12.4656 },
    sqm: 18,
    surface: 18,
    garageType: "Box singolo",
    security: ["Videosorveglianza", "Cancello automatico"],
    access: "24h",
    image: "https://readdy.ai/api/search-image?query=Clean%20single%20car%20garage%20box%20in%20Rome%20Prati%20with%20automatic%20door%2C%20good%20lighting%2C%20security%20features%2C%20well-maintained%20underground%20parking&width=400&height=300&seq=15&orientation=landscape",
    commission: "0%"
  },
  {
    id: 16,
    title: "Box Doppio in EUR",
    price: 320,
    type: "rent",
    category: "Garage-Posti auto",
    zone: "EUR",
    coordinates: { lat: 41.8340, lng: 12.4680 },
    sqm: 35,
    surface: 35,
    garageType: "Box doppio",
    security: ["Videosorveglianza", "Custode"],
    access: "24h",
    image: "https://readdy.ai/api/search-image?query=Double%20car%20garage%20box%20in%20Rome%20EUR%20with%20space%20for%20two%20vehicles%2C%20automatic%20doors%2C%20security%20system%2C%20modern%20underground%20parking%20facility&width=400&height=300&seq=16&orientation=landscape",
    commission: "0%"
  },
  {
    id: 17,
    title: "Posto Auto Coperto in Flaminio",
    price: 120,
    type: "rent",
    category: "Garage-Posti auto",
    zone: "Flaminio",
    coordinates: { lat: 41.9180, lng: 12.4720 },
    sqm: 12,
    surface: 12,
    garageType: "Posto auto coperto",
    security: ["Cancello automatico"],
    access: "Orari limitati",
    image: "https://readdy.ai/api/search-image?query=Covered%20parking%20space%20in%20Rome%20Flaminio%20with%20roof%20protection%2C%20marked%20parking%20spot%2C%20secure%20access%2C%20residential%20building%20garage&width=400&height=300&seq=17&orientation=landscape",
    commission: "0%"
  },

  // TERRENI - Various land types
  {
    id: 18,
    title: "Terreno Edificabile a Castel Romano",
    price: 280000,
    type: "buy",
    category: "Terreni",
    subCategory: "Terreno edificabile",
    zone: "Castel Romano",
    coordinates: { lat: 41.7333, lng: 12.4167 },
    sqm: 1200,
    surface: 1200,
    landType: "Edificabile",
    buildingRights: ["Residenziale"],
    utilities: ["Acqua", "Elettricità"],
    image: "https://readdy.ai/api/search-image?query=Building%20land%20plot%20in%20Rome%20Castel%20Romano%20with%20clear%20boundaries%2C%20access%20road%2C%20utilities%20available%2C%20suitable%20for%20residential%20development%2C%20open%20landscape&width=400&height=300&seq=18&orientation=landscape",
    commission: "0%"
  },
  {
    id: 19,
    title: "Terreno Agricolo in Campagna Romana",
    price: 45000,
    type: "buy",
    category: "Terreni",
    subCategory: "Terreno agricolo",
    zone: "Castel Romano",
    coordinates: { lat: 41.7200, lng: 12.4000 },
    sqm: 5000,
    surface: 5000,
    landType: "Agricolo",
    buildingRights: [],
    utilities: ["Acqua"],
    image: "https://readdy.ai/api/search-image?query=Agricultural%20land%20in%20Roman%20countryside%20with%20fertile%20soil%2C%20rural%20landscape%2C%20farming%20potential%2C%20natural%20environment%2C%20peaceful%20setting&width=400&height=300&seq=19&orientation=landscape",
    commission: "0%"
  },
  {
    id: 20,
    title: "Terreno Commerciale in Ostiense",
    price: 450000,
    type: "buy",
    category: "Terreni",
    subCategory: "Terreno commerciale",
    zone: "Ostiense",
    coordinates: { lat: 41.8550, lng: 12.4750 },
    sqm: 800,
    surface: 800,
    landType: "Commerciale",
    buildingRights: ["Commerciale", "Industriale"],
    utilities: ["Acqua", "Elettricità", "Gas", "Fognature"],
    image: "https://readdy.ai/api/search-image?query=Commercial%20land%20plot%20in%20Rome%20Ostiense%20district%20with%20urban%20location%2C%20development%20potential%2C%20infrastructure%20access%2C%20business%20district%20setting&width=400&height=300&seq=20&orientation=landscape",
    commission: "0%"
  }
];

export const romeZones = {
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

export const propertyTypes = [
  "Apartment", "House", "Villa", "Shop", "Office", "Bar", "Restaurant", "Gym", "Pharmacy", "Warehouse", "Land"
];

export const propertyCategories = {
  // Main categories with subcategories - MOST IMPORTANT FIRST
  "Case-Appartamenti": {
    subcategories: [
      "Appartamento",
      "Villa",
      "Villetta",
      "Casa indipendente",
      "Rustico / Casale",
      "Palazzo / Stabile",
      "Attico / Mansarda",
      "Loft / Open space"
    ]
  },
  "Commerciale": {
    subcategories: [
      "Negozio commerciale",
      "Laboratorio",
      "Attività/Licenza commerciale"
    ]
  },
  
  // Standalone main categories (no subcategories)
  "Ufficio": {},
  "Garage-Posti auto": {},
  "Magazzini-Depositi": {},
  "Capannoni": {},
  
  // Other categories with subcategories
  "Terreni": {
    subcategories: [
      "Terreno agricolo",
      "Terreno edificabile",
      "Terreno industriale",
      "Terreno commerciale"
    ]
  },
  "Nuove Costruzioni": {
    subcategories: [
      "Appartamento",
      "Villa",
      "Villetta",
      "Ufficio",
      "Negozio"
    ]
  }
};

export const properties = [
  // CASE-APPARTAMENTI Properties (6 properties)
  {
    id: 1,
    title: 'Monolocale Moderno a Trastevere',
    price: 850,
    type: 'rent',
    category: 'Case-Appartamenti',
    subCategory: 'Appartamento',
    subSubCategory: 'Monolocale',
    surface: 35,
    sqm: 35,
    rooms: 1,
    bathrooms: 1,
    floor: '2',
    condition: 'Ristrutturato',
    energyClass: 'B',
    features: ['Balcone', 'Ascensore'],
    zone: 'Trastevere',
    address: 'Via di Trastevere 45, Roma',
    coordinates: { lat: 41.8896, lng: 12.4695 },
    images: [
      'https://readdy.ai/api/search-image?query=Modern%20studio%20apartment%20in%20Trastevere%20Rome%20with%20contemporary%20furnishing%2C%20bright%20natural%20lighting%2C%20compact%20efficient%20layout%2C%20wooden%20floors%2C%20small%20balcony%2C%20urban%20Italian%20style&width=800&height=600&seq=prop-1-1&orientation=landscape'
    ],
    description: 'Monolocale completamente ristrutturato nel cuore di Trastevere.',
    agent: {
      name: 'Marco Rossi',
      phone: '+39 06 1234567',
      email: 'marco@example.com'
    }
  },
  {
    id: 2,
    title: 'Bilocale Elegante ai Parioli',
    price: 1200,
    type: 'rent',
    category: 'Case-Appartamenti',
    subCategory: 'Appartamento',
    subSubCategory: 'Bilocale',
    surface: 65,
    sqm: 65,
    rooms: 2,
    bathrooms: 1,
    floor: '4',
    condition: 'Eccellente',
    energyClass: 'A',
    features: ['Terrazza', 'Ascensore', 'Parcheggio'],
    zone: 'Parioli',
    address: 'Via Paisiello 12, Roma',
    coordinates: { lat: 41.9205, lng: 12.4858 },
    images: [
      'https://readdy.ai/api/search-image?query=Elegant%20two-room%20apartment%20in%20Parioli%20Rome%20with%20luxury%20finishes%2C%20marble%20floors%2C%20large%20terrace%2C%20sophisticated%20Italian%20interior%20design%2C%20bright%20living%20space&width=800&height=600&seq=prop-2-1&orientation=landscape'
    ],
    description: 'Bilocale di lusso in zona residenziale esclusiva.',
    agent: {
      name: 'Giulia Bianchi',
      phone: '+39 06 2345678',
      email: 'giulia@example.com'
    }
  },
  {
    id: 3,
    title: 'Trilocale Storico a Monti',
    price: 320000,
    type: 'buy',
    category: 'Case-Appartamenti',
    subCategory: 'Appartamento',
    subSubCategory: 'Trilocale',
    surface: 85,
    sqm: 85,
    rooms: 3,
    bathrooms: 2,
    floor: '1',
    condition: 'Buono',
    energyClass: 'C',
    features: ['Balcone', 'Cantina', 'Camino'],
    zone: 'Monti',
    address: 'Via del Boschetto 28, Roma',
    coordinates: { lat: 41.8955, lng: 12.4823 },
    images: [
      'https://readdy.ai/api/search-image?query=Historic%20three-room%20apartment%20in%20Monti%20Rome%20with%20traditional%20Italian%20architecture%2C%20exposed%20beams%2C%20fireplace%2C%20charming%20period%20details%2C%20warm%20lighting&width=800&height=600&seq=prop-3-1&orientation=landscape'
    ],
    description: 'Trilocale con caratteristiche storiche nel rione Monti.',
    agent: {
      name: 'Alessandro Verdi',
      phone: '+39 06 3456789',
      email: 'alessandro@example.com'
    }
  },
  {
    id: 4,
    title: 'Quadrilocale di Prestigio Centro Storico',
    price: 580000,
    type: 'buy',
    category: 'Case-Appartamenti',
    subCategory: 'Appartamento',
    subSubCategory: 'Quadrilocale',
    surface: 120,
    sqm: 120,
    rooms: 4,
    bathrooms: 2,
    floor: '3',
    condition: 'Nuovo',
    energyClass: 'A+',
    features: ['Terrazza', 'Ascensore', 'Parcheggio', 'Cantina'],
    zone: 'Centro Storico',
    address: 'Via del Corso 156, Roma',
    coordinates: { lat: 41.9028, lng: 12.4764 },
    images: [
      'https://readdy.ai/api/search-image?query=Prestigious%20four-room%20apartment%20in%20Rome%20historic%20center%20with%20luxury%20renovation%2C%20high%20ceilings%2C%20elegant%20furnishing%2C%20marble%20details%2C%20panoramic%20terrace&width=800&height=600&seq=prop-4-1&orientation=landscape'
    ],
    description: 'Quadrilocale di prestigio completamente ristrutturato.',
    agent: {
      name: 'Francesca Neri',
      phone: '+39 06 4567890',
      email: 'francesca@example.com'
    }
  },
  {
    id: 5,
    title: 'Villa con Giardino EUR',
    price: 750000,
    type: 'buy',
    category: 'Case-Appartamenti',
    subCategory: 'Villa',
    surface: 200,
    sqm: 200,
    rooms: 5,
    bathrooms: 3,
    floor: '0',
    condition: 'Eccellente',
    energyClass: 'A',
    features: ['Giardino', 'Parcheggio', 'Camino', 'Terrazza'],
    zone: 'EUR',
    address: 'Via Cristoforo Colombo 245, Roma',
    coordinates: { lat: 41.8338, lng: 12.4677 },
    images: [
      'https://readdy.ai/api/search-image?query=Luxury%20villa%20with%20garden%20in%20EUR%20Rome%2C%20modern%20architecture%2C%20large%20windows%2C%20private%20garden%2C%20elegant%20exterior%20design%2C%20contemporary%20Italian%20style&width=800&height=600&seq=prop-5-1&orientation=landscape'
    ],
    description: 'Villa indipendente con ampio giardino privato.',
    agent: {
      name: 'Roberto Blu',
      phone: '+39 06 5678901',
      email: 'roberto@example.com'
    }
  },
  {
    id: 6,
    title: 'Attico di Lusso Flaminio',
    price: 2200,
    type: 'rent',
    category: 'Case-Appartamenti',
    subCategory: 'Attico / Mansarda',
    surface: 150,
    sqm: 150,
    rooms: 4,
    bathrooms: 3,
    floor: '8',
    condition: 'Nuovo',
    energyClass: 'A+',
    features: ['Terrazza', 'Ascensore', 'Parcheggio', 'Soffitta'],
    zone: 'Flaminio',
    address: 'Viale Tiziano 88, Roma',
    coordinates: { lat: 41.9167, lng: 12.4761 },
    images: [
      'https://readdy.ai/api/search-image?query=Luxury%20penthouse%20in%20Flaminio%20Rome%20with%20panoramic%20terrace%2C%20modern%20design%2C%20floor-to-ceiling%20windows%2C%20city%20views%2C%20sophisticated%20interior&width=800&height=600&seq=prop-6-1&orientation=landscape'
    ],
    description: 'Attico di lusso con terrazza panoramica.',
    agent: {
      name: 'Silvia Rosa',
      phone: '+39 06 6789012',
      email: 'silvia@example.com'
    }
  },

  // COMMERCIALE Properties (5 properties)
  {
    id: 7,
    title: 'Negozio di Abbigliamento Via del Corso',
    price: 3500,
    type: 'rent',
    category: 'Commerciale',
    subCategory: 'Negozio commerciale',
    surface: 80,
    sqm: 80,
    commercialType: 'Negozio',
    visibility: 'Alta',
    floor: '0',
    condition: 'Buono',
    zone: 'Centro Storico',
    address: 'Via del Corso 89, Roma',
    coordinates: { lat: 41.9021, lng: 12.4785 },
    images: [
      'https://readdy.ai/api/search-image?query=Fashion%20retail%20store%20on%20Via%20del%20Corso%20Rome%2C%20elegant%20storefront%2C%20large%20display%20windows%2C%20modern%20interior%20design%2C%20high%20street%20location&width=800&height=600&seq=prop-7-1&orientation=landscape'
    ],
    description: 'Negozio commerciale in posizione strategica.',
    agent: {
      name: 'Luca Verde',
      phone: '+39 06 7890123',
      email: 'luca@example.com'
    }
  },
  {
    id: 8,
    title: 'Farmacia Storica Trastevere',
    price: 180000,
    type: 'buy',
    category: 'Commerciale',
    subCategory: 'Attività/Licenza commerciale',
    businessActivities: ['Farmacia'],
    surface: 60,
    sqm: 60,
    commercialType: 'Negozio',
    visibility: 'Alta',
    floor: '0',
    condition: 'Ristrutturato',
    zone: 'Trastevere',
    address: 'Piazza San Cosimato 15, Roma',
    coordinates: { lat: 41.8889, lng: 12.4672 },
    images: [
      'https://readdy.ai/api/search-image?query=Historic%20pharmacy%20in%20Trastevere%20Rome%2C%20traditional%20Italian%20pharmacy%20interior%2C%20wooden%20shelving%2C%20professional%20medical%20environment%2C%20classic%20design&width=800&height=600&seq=prop-8-1&orientation=landscape'
    ],
    description: 'Farmacia storica con licenza inclusa.',
    agent: {
      name: 'Maria Gialli',
      phone: '+39 06 8901234',
      email: 'maria@example.com'
    }
  },
  {
    id: 9,
    title: 'Ristorante con Licenza Testaccio',
    price: 4200,
    type: 'rent',
    category: 'Commerciale',
    subCategory: 'Attività/Licenza commerciale',
    businessActivities: ['Ristorante', 'Bar'],
    surface: 120,
    sqm: 120,
    commercialType: 'Showroom',
    visibility: 'Media',
    floor: '0',
    condition: 'Eccellente',
    zone: 'Testaccio',
    address: 'Via di Monte Testaccio 32, Roma',
    coordinates: { lat: 41.8756, lng: 12.4756 },
    images: [
      'https://readdy.ai/api/search-image?query=Restaurant%20interior%20in%20Testaccio%20Rome%2C%20modern%20dining%20space%2C%20professional%20kitchen%2C%20warm%20lighting%2C%20Italian%20restaurant%20design%2C%20cozy%20atmosphere&width=800&height=600&seq=prop-9-1&orientation=landscape'
    ],
    description: 'Ristorante completamente attrezzato con licenza.',
    agent: {
      name: 'Giuseppe Viola',
      phone: '+39 06 9012345',
      email: 'giuseppe@example.com'
    }
  },
  {
    id: 10,
    title: 'Salone di Bellezza San Lorenzo',
    price: 2800,
    type: 'rent',
    category: 'Commerciale',
    subCategory: 'Attività/Licenza commerciale',
    businessActivities: ['Parrucchiere – Barbiere', 'Centro estetico'],
    surface: 70,
    sqm: 70,
    commercialType: 'Negozio',
    visibility: 'Media',
    floor: '0',
    condition: 'Ristrutturato',
    zone: 'San Lorenzo',
    address: 'Via dei Sabelli 45, Roma',
    coordinates: { lat: 41.8989, lng: 12.5156 },
    images: [
      'https://readdy.ai/api/search-image?query=Modern%20hair%20salon%20and%20beauty%20center%20in%20San%20Lorenzo%20Rome%2C%20professional%20styling%20stations%2C%20elegant%20mirrors%2C%20contemporary%20design%2C%20beauty%20equipment&width=800&height=600&seq=prop-10-1&orientation=landscape'
    ],
    description: 'Salone di bellezza completamente attrezzato.',
    agent: {
      name: 'Elena Arancio',
      phone: '+39 06 0123456',
      email: 'elena@example.com'
    }
  },
  {
    id: 11,
    title: 'Laboratorio Artigianale Ostiense',
    price: 1800,
    type: 'rent',
    category: 'Commerciale',
    subCategory: 'Laboratorio',
    surface: 100,
    sqm: 100,
    commercialType: 'Laboratorio',
    visibility: 'Bassa',
    floor: '0',
    condition: 'Buono',
    zone: 'Ostiense',
    address: 'Via Ostiense 234, Roma',
    coordinates: { lat: 41.8567, lng: 12.4789 },
    images: [
      'https://readdy.ai/api/search-image?query=Artisan%20workshop%20laboratory%20in%20Ostiense%20Rome%2C%20industrial%20space%2C%20work%20benches%2C%20natural%20lighting%2C%20creative%20workspace%2C%20tools%20and%20equipment&width=800&height=600&seq=prop-11-1&orientation=landscape'
    ],
    description: 'Laboratorio artigianale con ampi spazi di lavoro.',
    agent: {
      name: 'Davide Marrone',
      phone: '+39 06 1234567',
      email: 'davide@example.com'
    }
  },

  // UFFICIO Properties (3 properties)
  {
    id: 12,
    title: 'Ufficio Singolo EUR',
    price: 1200,
    type: 'rent',
    category: 'Ufficio',
    surface: 45,
    sqm: 45,
    officeType: 'Singolo',
    services: ['Reception', 'Pulizie', 'Internet'],
    floor: '3',
    condition: 'Eccellente',
    energyClass: 'A',
    zone: 'EUR',
    address: 'Viale Europa 190, Roma',
    coordinates: { lat: 41.8356, lng: 12.4689 },
    images: [
      'https://readdy.ai/api/search-image?query=Single%20private%20office%20in%20EUR%20Rome%2C%20modern%20business%20environment%2C%20professional%20desk%20setup%2C%20large%20windows%2C%20contemporary%20office%20furniture&width=800&height=600&seq=prop-12-1&orientation=landscape'
    ],
    description: 'Ufficio singolo in complesso direzionale.',
    agent: {
      name: 'Stefano Grigio',
      phone: '+39 06 2345678',
      email: 'stefano@example.com'
    }
  },
  {
    id: 13,
    title: 'Open Space Ufficio Nomentano',
    price: 2200,
    type: 'rent',
    category: 'Ufficio',
    surface: 120,
    sqm: 120,
    officeType: 'Open space',
    services: ['Sicurezza', 'Aria condizionata', 'Internet'],
    floor: '2',
    condition: 'Nuovo',
    energyClass: 'A+',
    zone: 'Nomentano',
    address: 'Via Nomentana 567, Roma',
    coordinates: { lat: 41.9234, lng: 12.5123 },
    images: [
      'https://readdy.ai/api/search-image?query=Modern%20open%20space%20office%20in%20Nomentano%20Rome%2C%20collaborative%20workspace%2C%20multiple%20workstations%2C%20natural%20lighting%2C%20contemporary%20design&width=800&height=600&seq=prop-13-1&orientation=landscape'
    ],
    description: 'Ampio open space per team di lavoro.',
    agent: {
      name: 'Chiara Azzurro',
      phone: '+39 06 3456789',
      email: 'chiara@example.com'
    }
  },
  {
    id: 14,
    title: 'Ufficio Condiviso Prati',
    price: 800,
    type: 'rent',
    category: 'Ufficio',
    surface: 25,
    sqm: 25,
    officeType: 'Condiviso',
    services: ['Reception', 'Pulizie', 'Internet', 'Riscaldamento'],
    floor: '4',
    condition: 'Buono',
    energyClass: 'B',
    zone: 'Prati',
    address: 'Via Cola di Rienzo 78, Roma',
    coordinates: { lat: 41.9067, lng: 12.4656 },
    images: [
      'https://readdy.ai/api/search-image?query=Shared%20office%20space%20in%20Prati%20Rome%2C%20coworking%20environment%2C%20professional%20atmosphere%2C%20shared%20facilities%2C%20modern%20workspace%20design&width=800&height=600&seq=prop-14-1&orientation=landscape'
    ],
    description: 'Postazione in ufficio condiviso professionale.',
    agent: {
      name: 'Marco Nero',
      phone: '+39 06 4567890',
      email: 'marco.nero@example.com'
    }
  },

  // GARAGE-POSTI AUTO Properties (3 properties)
  {
    id: 15,
    title: 'Box Auto Singolo Parioli',
    price: 45000,
    type: 'buy',
    category: 'Garage-Posti auto',
    surface: 18,
    sqm: 18,
    garageType: 'Box singolo',
    security: ['Cancello automatico'],
    access: '24h',
    condition: 'Buono',
    zone: 'Parioli',
    address: 'Via Paisiello 34, Roma',
    coordinates: { lat: 41.9198, lng: 12.4867 },
    images: [
      'https://readdy.ai/api/search-image?query=Single%20garage%20box%20in%20Parioli%20Rome%2C%20secure%20parking%20space%2C%20automatic%20gate%2C%20clean%20interior%2C%20residential%20building%20garage&width=800&height=600&seq=prop-15-1&orientation=landscape'
    ],
    description: 'Box auto singolo in zona residenziale.',
    agent: {
      name: 'Andrea Bianco',
      phone: '+39 06 5678901',
      email: 'andrea@example.com'
    }
  },
  {
    id: 16,
    title: 'Box Doppio con Ripostiglio Flaminio',
    price: 85000,
    type: 'buy',
    category: 'Garage-Posti auto',
    surface: 35,
    sqm: 35,
    garageType: 'Box doppio',
    security: ['Videosorveglianza', 'Cancello automatico'],
    access: '24h',
    condition: 'Eccellente',
    zone: 'Flaminio',
    address: 'Via Flaminia 456, Roma',
    coordinates: { lat: 41.9156, lng: 12.4734 },
    images: [
      'https://readdy.ai/api/search-image?query=Double%20garage%20box%20in%20Flaminio%20Rome%2C%20spacious%20parking%20for%20two%20cars%2C%20storage%20area%2C%20security%20cameras%2C%20modern%20garage%20facility&width=800&height=600&seq=prop-16-1&orientation=landscape'
    ],
    description: 'Box doppio con spazio ripostiglio aggiuntivo.',
    agent: {
      name: 'Valentina Rosa',
      phone: '+39 06 6789012',
      email: 'valentina@example.com'
    }
  },
  {
    id: 17,
    title: 'Posto Auto Coperto Testaccio',
    price: 120,
    type: 'rent',
    category: 'Garage-Posti auto',
    surface: 12,
    sqm: 12,
    garageType: 'Posto auto coperto',
    security: ['Custode'],
    access: 'Orari limitati',
    condition: 'Buono',
    zone: 'Testaccio',
    address: 'Via Galvani 67, Roma',
    coordinates: { lat: 41.8745, lng: 12.4778 },
    images: [
      'https://readdy.ai/api/search-image?query=Covered%20parking%20space%20in%20Testaccio%20Rome%2C%20protected%20parking%20area%2C%20residential%20building%20garage%2C%20secure%20environment&width=800&height=600&seq=prop-17-1&orientation=landscape'
    ],
    description: 'Posto auto coperto con servizio di custodia.',
    agent: {
      name: 'Fabio Verde',
      phone: '+39 06 7890123',
      email: 'fabio@example.com'
    }
  },

  // TERRENI Properties (3 properties)
  {
    id: 18,
    title: 'Terreno Edificabile Cassia',
    price: 280000,
    type: 'buy',
    category: 'Terreni',
    subCategory: 'Terreno edificabile',
    surface: 1200,
    sqm: 1200,
    landType: 'Edificabile',
    buildingRights: ['Residenziale'],
    utilities: ['Acqua', 'Elettricità', 'Gas'],
    condition: 'Nuovo',
    zone: 'Cassia',
    address: 'Via Cassia km 15, Roma',
    coordinates: { lat: 41.9567, lng: 12.4234 },
    images: [
      'https://readdy.ai/api/search-image?query=Building%20land%20plot%20in%20Cassia%20Rome%2C%20residential%20development%20area%2C%20green%20landscape%2C%20utilities%20available%2C%20construction%20ready%20terrain&width=800&height=600&seq=prop-18-1&orientation=landscape'
    ],
    description: 'Terreno edificabile per uso residenziale.',
    agent: {
      name: 'Paolo Blu',
      phone: '+39 06 8901234',
      email: 'paolo@example.com'
    }
  },
  {
    id: 19,
    title: 'Terreno Agricolo Appia Antica',
    price: 150000,
    type: 'buy',
    category: 'Terreni',
    subCategory: 'Terreno agricolo',
    surface: 5000,
    sqm: 5000,
    landType: 'Agricolo',
    buildingRights: [],
    utilities: ['Acqua'],
    condition: 'Buono',
    zone: 'Appia Antica',
    address: 'Via Appia Antica km 8, Roma',
    coordinates: { lat: 41.8456, lng: 12.5234 },
    images: [
      'https://readdy.ai/api/search-image?query=Agricultural%20land%20on%20Appia%20Antica%20Rome%2C%20rural%20landscape%2C%20olive%20trees%2C%20countryside%20setting%2C%20farming%20potential%2C%20natural%20environment&width=800&height=600&seq=prop-19-1&orientation=landscape'
    ],
    description: 'Terreno agricolo con uliveto secolare.',
    agent: {
      name: 'Serena Giallo',
      phone: '+39 06 9012345',
      email: 'serena@example.com'
    }
  },
  {
    id: 20,
    title: 'Terreno Commerciale Tiburtina',
    price: 420000,
    type: 'buy',
    category: 'Terreni',
    subCategory: 'Terreno commerciale',
    surface: 2000,
    sqm: 2000,
    landType: 'Commerciale',
    buildingRights: ['Commerciale', 'Industriale'],
    utilities: ['Acqua', 'Elettricità', 'Gas', 'Fognature'],
    condition: 'Nuovo',
    zone: 'Tiburtina',
    address: 'Via Tiburtina 890, Roma',
    coordinates: { lat: 41.9123, lng: 12.5456 },
    images: [
      'https://readdy.ai/api/search-image?query=Commercial%20development%20land%20in%20Tiburtina%20Rome%2C%20industrial%20area%2C%20business%20district%20potential%2C%20infrastructure%20ready%2C%20urban%20development%20zone&width=800&height=600&seq=prop-20-1&orientation=landscape'
    ],
    description: 'Terreno per sviluppo commerciale e industriale.',
    agent: {
      name: 'Matteo Rosso',
      phone: '+39 06 0123456',
      email: 'matteo@example.com'
    }
  }
];
