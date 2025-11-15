
import React from 'react';

const AboutPlatform: React.FC = () => {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Ciao! Inviateci le vostre proprietà e le pubblicheremo gratuitamente per voi.');
    window.open(`https://wa.me/393123456789?text=${message}`, '_blank');
  };

  const features = [
    {
      icon: 'ri-home-4-line',
      title: 'Annunci Illimitati Gratuiti',
      description: 'Pubblica infinite proprietà senza costi nascosti o commissioni'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Servizio Completo Gratuito',
      description: 'Inviateci le vostre proprietà e le pubblicheremo gratuitamente per voi. Ci occupiamo noi di tutto'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: '0% Commissioni',
      description: 'Nessuna commissione, nessun intermediario, massimo profitto'
    },
    {
      icon: 'ri-whatsapp-line',
      title: 'Contatto Diretto Proprietario',
      description: 'Contatta direttamente il proprietario via telefono, email e WhatsApp'
    },
    {
      icon: 'ri-flashlight-line',
      title: 'Risposta Immediata',
      description: 'Nessuna attesa, comunicazione diretta e veloce'
    },
    {
      icon: 'ri-search-line',
      title: 'Ricerca Avanzata',
      description: 'Trova l\'immobile perfetto a Roma con filtri precisi'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Registrati',
      description: 'Crea il tuo account gratuito in pochi secondi'
    },
    {
      number: '2',
      title: 'Pubblica o Cerca',
      description: 'Aggiungi proprietà o cerca l\'immobile ideale'
    },
    {
      number: '3',
      title: 'Connetti Direttamente',
      description: 'Contatta o ricevi contatti senza intermediari'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* SEO-Rich Headline - Mobile Optimized */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D2817] mb-4 sm:mb-6 px-2">
            Piattaforma Immobiliare Gratuita Roma
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#D97860] mb-6 sm:mb-8 px-2">
            Proprietari e Acquirenti Diretti - 0% Commissioni
          </h3>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
            La prima piattaforma immobiliare completamente gratuita di Roma che connette direttamente 
            proprietari e acquirenti. Nessuna agenzia, nessuna commissione, solo contatto diretto 
            per affitto e vendita di immobili nella Capitale.
          </p>
        </div>

        {/* Feature Cards - Mobile Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#D97860] text-white rounded-lg mb-3 sm:mb-4">
                <i className={`${feature.icon} text-lg sm:text-xl`}></i>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#3D2817] mb-2 sm:mb-3 leading-tight">{feature.title}</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp Contact Button - Mobile Optimized */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <button
            onClick={handleWhatsAppContact}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5A] transition-colors shadow-lg w-full sm:w-auto text-sm sm:text-base"
          >
            <i className="ri-whatsapp-line text-xl sm:text-2xl mr-2 sm:mr-3"></i>
            <span className="text-center">Inviateci le Vostre Proprietà - Pubblichiamo Gratis</span>
          </button>
        </div>

        {/* Trust Badges - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 px-4">
          <div className="flex items-center justify-center bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md">
            <i className="ri-shield-check-line text-[#D97860] text-lg sm:text-xl mr-2"></i>
            <span className="font-semibold text-[#3D2817] text-sm sm:text-base">100% Gratuito</span>
          </div>
          <div className="flex items-center justify-center bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md">
            <i className="ri-map-pin-line text-[#D97860] text-lg sm:text-xl mr-2"></i>
            <span className="font-semibold text-[#3D2817] text-sm sm:text-base">Solo Roma</span>
          </div>
          <div className="flex items-center justify-center bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md">
            <i className="ri-verified-badge-line text-[#D97860] text-lg sm:text-xl mr-2"></i>
            <span className="font-semibold text-[#3D2817] text-sm sm:text-base">Verificato</span>
          </div>
        </div>

        {/* How It Works - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3D2817] mb-8 sm:mb-12 px-2">Come Funziona</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#C9A876] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4">
                  {step.number}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#3D2817] mb-2 sm:mb-3 px-2">{step.title}</h4>
                <p className="text-sm sm:text-base text-gray-600 px-4">{step.description}</p>
                {/* Arrow for desktop only */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-6 sm:top-8 left-full w-full">
                    <i className="ri-arrow-right-line text-[#C9A876] text-xl sm:text-2xl absolute left-1/2 transform -translate-x-1/2"></i>
                  </div>
                )}
                {/* Arrow for mobile - vertical */}
                {index < steps.length - 1 && (
                  <div className="block sm:hidden absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <i className="ri-arrow-down-line text-[#C9A876] text-xl"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;
