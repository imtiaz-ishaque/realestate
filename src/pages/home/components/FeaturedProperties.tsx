import PropertyCard from './PropertyCard';
import { properties } from '../../../mocks/properties';
import { Link } from 'react-router-dom';

export default function FeaturedProperties() {
  const featuredProperties = properties.slice(0, 6);
  return (
    <>
      {/* Structured Data for Featured Properties */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Featured Real Estate Properties in Rome",
            "description": "Premium apartments, villas, and penthouses for sale and rent in Rome's most desirable neighborhoods",
            "numberOfItems": featuredProperties.length,
            "itemListElement": featuredProperties.slice(0, 6).map((property, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "RealEstateListing",
                "@id": `https://mauluna-immobiliare.com/property/${property.id}`,
                "name": property.title,
                "description": `${property.type} in ${property.zone}, Rome - ${property.sqm} sqm, ${property.rooms} rooms, ${property.bathrooms} bathrooms`,
                "url": `https://mauluna-immobiliare.com/property/${property.id}`,
                "image": property.image,
                "floorSize": {
                  "@type": "QuantitativeValue",
                  "value": property.sqm,
                  "unitCode": "MTK"
                },
                "numberOfRooms": property.rooms,
                "numberOfBathroomsTotal": property.bathrooms,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": property.zone,
                  "addressRegion": "Rome",
                  "addressCountry": "IT"
                },
                "offers": {
                  "@type": "Offer",
                  "price": property.price,
                  "priceCurrency": "EUR",
                  "availability": "https://schema.org/InStock",
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": property.price,
                    "priceCurrency": "EUR"
                  }
                }
              }
            }))
          })
        }}
      />
      
      <section className="py-12 sm:py-16 bg-white" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 id="featured-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              <strong>Proprietà in Evidenza</strong> a Roma
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Scopri la nostra selezione di <strong>appartamenti</strong>, <strong>ville</strong>, <strong>uffici</strong>, <strong>locali commerciali</strong>, <strong>terreni</strong> e <strong>attici</strong> disponibili per <strong>vendita</strong> e <strong>affitto</strong> nelle zone più ricercate di Roma
            </p>
          </div>

          {/* Mobile Optimized Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" data-product-shop>
            {featuredProperties.slice(0, 6).map((property) => (
              <article key={property.id} itemScope itemType="https://schema.org/RealEstateListing">
                <PropertyCard property={property} />
              </article>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 px-4">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-[#C9B8A7] text-white font-semibold rounded-lg hover:bg-[#B8A596] transition-colors cursor-pointer w-full sm:w-auto text-sm sm:text-base"
              aria-label="View all available properties for sale and rent in Rome"
            >
              View All Properties
              <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
