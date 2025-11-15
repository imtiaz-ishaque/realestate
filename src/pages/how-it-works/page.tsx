
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Aggiungi la Tua Proprietà',
      description: 'Inserisci la tua proprietà con foto, dettagli e informazioni di contatto. Il nostro modulo semplice richiede solo 5 minuti.',
      icon: 'ri-add-circle-line',
      color: 'bg-gradient-to-br from-[#D97860] to-[#C9A876]'
    },
    {
      number: '02', 
      title: 'Ottieni l\'Approvazione',
      description: 'Rivediamo il tuo annuncio in poco tempo per garantire qualità e autenticità per i nostri utenti.',
      icon: 'ri-shield-check-line',
      color: 'bg-gradient-to-br from-[#C9A876] to-[#B8956A]'
    },
    {
      number: '03',
      title: 'Connettiti Direttamente',
      description: 'Gli acquirenti interessati ti contattano direttamente via telefono, WhatsApp o email. Nessun intermediario, nessuna commissione.',
      icon: 'ri-user-heart-line',
      color: 'bg-gradient-to-br from-[#5C4B42] to-[#3D2817]'
    }
  ];

  const benefits = [
    {
      title: '0% Commissioni',
      description: 'Mantieni il 100% del prezzo di vendita. Nessuna commissione nascosta, nessuna sorpresa.',
      icon: 'ri-money-euro-circle-line',
      color: 'from-[#D97860] to-[#C9A876]'
    },
    {
      title: 'Contatto Diretto',
      description: 'Gli acquirenti ti contattano direttamente. Costruisci fiducia e negozia liberamente.',
      icon: 'ri-phone-line',
      color: 'from-[#C9A876] to-[#B8956A]'
    },
    {
      title: 'Focus su Roma',
      description: 'Ci specializziamo nelle proprietà di Roma, garantendo competenza locale.',
      icon: 'ri-map-pin-line',
      color: 'from-[#5C4B42] to-[#3D2817]'
    },
    {
      title: 'Annunci di Qualità',
      description: 'Tutte le proprietà sono verificate per mantenere standard elevati.',
      icon: 'ri-star-line',
      color: 'from-[#D97860] to-[#E89580]'
    },
    {
      title: 'Approvazione Rapida',
      description: 'Il tuo annuncio va online rapidamente dopo la presentazione.',
      icon: 'ri-time-line',
      color: 'from-[#C9A876] to-[#D97860]'
    },
    {
      title: 'Diretto dal Proprietario',
      description: 'Connettiti con i proprietari, non con agenti o intermediari.',
      icon: 'ri-user-line',
      color: 'from-[#5C4B42] to-[#C9A876]'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Come Funziona - MAULUNA IMMOBILIARE",
            "description": "Scopri come funziona MAULUNA IMMOBILIARE: 0% commissioni, contatto diretto proprietario, piattaforma immobiliare focalizzata su Roma. Aggiungi, approva e connetti in 3 semplici passaggi.",
            "url": "https://mauluna-immobiliare.com/how-it-works",
            "mainEntity": {
              "@type": "HowTo",
              "name": "Come Utilizzare MAULUNA IMMOBILIARE",
              "description": "Guida passo-passo per comprare, vendere o affittare proprietà a Roma con 0% commissioni",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Aggiungi la Tua Proprietà",
                  "text": "Inserisci la tua proprietà con foto, dettagli e informazioni di contatto utilizzando il nostro modulo semplice di 5 minuti"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Ottieni l'Approvazione",
                  "text": "Rivediamo il tuo annuncio entro 24 ore per garantire qualità e autenticità"
                },
                {
                  "@type": "HowToStep",
                  "name": "Connettiti Direttamente",
                  "text": "Gli acquirenti interessati ti contattano direttamente via WhatsApp o email senza commissioni"
                }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#F9F6F3] to-[#F5F2EF]">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-[#C9A876] via-[#D97860] to-[#B8956A] text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <header>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Come Funziona MAULUNA
                </h1>
                <p className="text-2xl font-semibold mb-4 text-white/95">
                  <strong>0% Commissioni · Proprietari Diretti · Solo Roma</strong>
                </p>
                <p className="text-lg text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed">
                  Connetti direttamente proprietari con acquirenti e affittuari a Roma. 
                  Nessun agente, nessuna commissione, nessuna complicazione.
                </p>
              </header>
            </div>
          </section>

          {/* Steps Section */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-20">
                <h2 className="text-4xl font-bold text-[#5C4B42] mb-6">Semplice Processo in 3 Passaggi</h2>
                <p className="text-[#8B7355] text-xl">Dall'inserimento alla connessione in soli 3 semplici passaggi</p>
              </header>

              <div className="grid md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                  <article key={step.number} className="text-center group">
                    <div className="relative mb-10">
                      <div className={`w-24 h-24 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <i className={`${step.icon} text-3xl text-white`}></i>
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-3 border-[#E8E4E0] rounded-full flex items-center justify-center text-lg font-bold text-[#5C4B42] shadow-md">
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-[#E8E4E0] to-[#D4CFC7] transform -translate-y-1/2 rounded-full"></div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-[#5C4B42] mb-4">{step.title}</h3>
                    <p className="text-[#8B7355] leading-relaxed text-lg">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-24 bg-gradient-to-br from-[#F9F6F3] to-[#F5F2EF]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-20">
                <h2 className="text-4xl font-bold text-[#5C4B42] mb-6">Perché Scegliere MAULUNA?</h2>
                <p className="text-[#8B7355] text-xl">I vantaggi che ci rendono diversi</p>
              </header>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <article key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#E8E4E0]">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                      <i className={`${benefit.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#5C4B42] mb-3">{benefit.title}</h3>
                    <p className="text-[#8B7355] leading-relaxed">{benefit.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-20">
                <h2 className="text-4xl font-bold text-[#5C4B42] mb-6">Domande Frequenti</h2>
              </header>

              <div className="space-y-6">
                <article className="bg-gradient-to-r from-white to-[#F9F6F3] rounded-2xl border border-[#E8E4E0] p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#5C4B42] mb-4">
                    <strong>Come è diverso MAULUNA dalle altre piattaforme immobiliari?</strong>
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed">
                    Applichiamo <strong>0% di commissioni</strong> e mettiamo in contatto diretto acquirenti con proprietari. 
                    Nessun agente, nessun intermediario, nessuna commissione nascosta. Mantieni il 100% del prezzo di vendita.
                  </p>
                </article>

                <article className="bg-gradient-to-r from-white to-[#F9F6F3] rounded-2xl border border-[#E8E4E0] p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#5C4B42] mb-4">
                    <strong>Quanto tempo ci vuole perché il mio annuncio vada online?</strong>
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed">
                    Rivediamo tutti gli annunci <strong>in poco tempo</strong> per garantire qualità e autenticità. 
                    Una volta approvato, la tua proprietà è immediatamente visibile ai potenziali acquirenti.
                  </p>
                </article>

                <article className="bg-gradient-to-r from-white to-[#F9F6F3] rounded-2xl border border-[#E8E4E0] p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#5C4B42] mb-4">
                    <strong>Coprite solo Roma?</strong>
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed">
                    Sì, ci concentriamo esclusivamente sulle <strong>proprietà di Roma</strong>. Questo ci permette di fornire 
                    conoscenze locali specializzate e un servizio migliore sia per acquirenti che venditori nel mercato romano.
                  </p>
                </article>

                <article className="bg-gradient-to-r from-white to-[#F9F6F3] rounded-2xl border border-[#E8E4E0] p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#5C4B42] mb-4">
                    <strong>Come mi contattano gli acquirenti?</strong>
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed">
                    Gli acquirenti interessati possono contattarti direttamente via <strong>telefono, WhatsApp o email</strong> utilizzando 
                    le informazioni di contatto che fornisci nel tuo annuncio. Nessun intermediario coinvolto.
                  </p>
                </article>

                <article className="bg-gradient-to-r from-white to-[#F9F6F3] rounded-2xl border border-[#E8E4E0] p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#5C4B42] mb-4">
                    <strong>È davvero gratuito?</strong>
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed">
                    Assolutamente sì! Non ci sono <strong>commissioni nascoste, costi di inserimento o abbonamenti</strong>. 
                    Il nostro servizio è completamente gratuito sia per proprietari che per acquirenti.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#C9A876] via-[#D97860] to-[#B8956A] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pronto a Iniziare?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Unisciti a centinaia di proprietari che hanno già scelto MAULUNA per vendere e affittare senza commissioni
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/add-listing" 
                  className="bg-white text-[#C9A876] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors shadow-lg whitespace-nowrap cursor-pointer"
                >
                  Aggiungi Proprietà
                </a>
                <a 
                  href="/properties" 
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#C9A876] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Cerca Proprietà
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
