
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import PropertyCard from '../home/components/PropertyCard';
import { featuredProperties } from '../../mocks/properties';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);

  useEffect(() => {
    const propertyId = parseInt(id || '0');
    const foundProperty = featuredProperties.find(p => p.id === propertyId);
    
    if (foundProperty) {
      setProperty(foundProperty);
      
      // Find similar properties (same zone or type, excluding current)
      const similar = featuredProperties
        .filter(p => 
          p.id !== propertyId && 
          (p.zone === foundProperty.zone || p.type === foundProperty.type)
        )
        .slice(0, 4);
      setSimilarProperties(similar);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3D2817] mb-4">Property not found</h2>
          <Link to="/properties" className="text-[#D97860] hover:text-[#C86B52] cursor-pointer">
            Back to properties
          </Link>
        </div>
      </div>
    );
  }

  // Generate additional images for gallery
  const galleryImages = [
    property.image,
    `https://readdy.ai/api/search-image?query=Luxury%20$%7Bproperty.type.toLowerCase%28%29%7D%20interior%20in%20Rome%20$%7Bproperty.zone%7D%20with%20modern%20design%2C%20elegant%20furniture%2C%20natural%20lighting%2C%20premium%20finishes%2C%20sophisticated%20Italian%20style&width=800&height=600&seq=${property.id}a&orientation=landscape`,
    `https://readdy.ai/api/search-image?query=Beautiful%20$%7Bproperty.type.toLowerCase%28%29%7D%20kitchen%20in%20Rome%20with%20modern%20appliances%2C%20marble%20countertops%2C%20elegant%20design%2C%20Italian%20style%2C%20premium%20materials&width=800&height=600&seq=${property.id}b&orientation=landscape`,
    `https://readdy.ai/api/search-image?query=Elegant%20$%7Bproperty.type.toLowerCase%28%29%7D%20bathroom%20in%20Rome%20with%20luxury%20fixtures%2C%20modern%20design%2C%20marble%20surfaces%2C%20sophisticated%20Italian%20style&width=800&height=600&seq=${property.id}c&orientation=landscape`,
    `https://readdy.ai/api/search-image?query=Spacious%20$%7Bproperty.type.toLowerCase%28%29%7D%20bedroom%20in%20Rome%20with%20comfortable%20furniture%2C%20natural%20light%2C%20elegant%20design%2C%20Italian%20style%20decor&width=800&height=600&seq=${property.id}d&orientation=landscape`
  ];

  const formatPrice = (price: number, forSale: boolean) => {
    if (forSale) {
      return `€${price.toLocaleString()}`;
    } else {
      return `€${price}/month`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-[#5C4B42]">
            <li><Link to="/" className="hover:text-[#D97860] cursor-pointer">Home</Link></li>
            <li><i className="ri-arrow-right-s-line"></i></li>
            <li><Link to="/properties" className="hover:text-[#D97860] cursor-pointer">Properties</Link></li>
            <li><i className="ri-arrow-right-s-line"></i></li>
            <li className="text-[#3D2817]">{property.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(61,40,23,0.08)] overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover object-top"
                />
                
                {/* Gallery Navigation */}
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? galleryImages.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === galleryImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden cursor-pointer ${
                        index === currentImageIndex ? 'ring-2 ring-[#D97860]' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(61,40,23,0.08)] p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#3D2817] mb-2">{property.title}</h1>
                  <p className="text-[#5C4B42] flex items-center">
                    <i className="ri-map-pin-line mr-1"></i>
                    {property.zone}, Rome
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#D97860] mb-1">
                    {formatPrice(property.price, property.forSale)}
                  </div>
                  <span className="bg-[#D97860] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.commission} commission
                  </span>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-[#F9F6F3] rounded-lg">
                  <i className="ri-home-4-line text-2xl text-[#C9A876] mb-2"></i>
                  <div className="font-semibold text-[#3D2817]">{property.sqm} m²</div>
                  <div className="text-sm text-[#5C4B42]">Square meters</div>
                </div>
                <div className="text-center p-4 bg-[#F9F6F3] rounded-lg">
                  <i className="ri-door-open-line text-2xl text-[#C9A876] mb-2"></i>
                  <div className="font-semibold text-[#3D2817]">{property.rooms}</div>
                  <div className="text-sm text-[#5C4B42]">Rooms</div>
                </div>
                <div className="text-center p-4 bg-[#F9F6F3] rounded-lg">
                  <i className="ri-drop-line text-2xl text-[#C9A876] mb-2"></i>
                  <div className="font-semibold text-[#3D2817]">{property.bathrooms}</div>
                  <div className="text-sm text-[#5C4B42]">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-[#F9F6F3] rounded-lg">
                  <i className="ri-building-line text-2xl text-[#C9A876] mb-2"></i>
                  <div className="font-semibold text-[#3D2817]">{property.floor}</div>
                  <div className="text-sm text-[#5C4B42]">Floor</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-between p-3 bg-[#F9F6F3] rounded-lg">
                  <span className="text-[#5C4B42]">Energy Class</span>
                  <span className="font-semibold text-[#3D2817]">{property.energy}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F9F6F3] rounded-lg">
                  <span className="text-[#5C4B42]">Condition</span>
                  <span className="font-semibold text-[#3D2817]">{property.condition}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F9F6F3] rounded-lg">
                  <span className="text-[#5C4B42]">Type</span>
                  <span className="font-semibold text-[#3D2817]">{property.type}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#3D2817] mb-4">Description</h3>
                <p className="text-[#5C4B42] leading-relaxed">
                  This exceptional {property.type.toLowerCase()} in the prestigious {property.zone} neighborhood offers 
                  {property.sqm} square meters of elegant living space. Featuring {property.rooms} beautifully appointed rooms 
                  and {property.bathrooms} modern bathrooms, this property represents the perfect blend of comfort and style. 
                  Located on the {property.floor === 0 ? 'ground' : `${property.floor}${property.floor === 1 ? 'st' : property.floor === 2 ? 'nd' : property.floor === 3 ? 'rd' : 'th'}`} floor, 
                  the property boasts an energy efficiency rating of {property.energy} and is in {property.condition.toLowerCase()} condition. 
                  The {property.zone} area is renowned for its authentic Roman atmosphere, excellent connectivity, and proximity to 
                  major attractions, making this an ideal investment opportunity or dream home in the Eternal City.
                </p>
              </div>

              {/* Contact Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="px-8 py-3 bg-[#C9A876] text-white font-semibold rounded-lg hover:bg-[#B8A596] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {showContact ? 'Hide Contact' : 'Show Contact'}
                </button>
              </div>

              {/* Contact Information */}
              {showContact && (
                <div className="mt-6 p-6 bg-[#F9F6F3] rounded-lg">
                  <h4 className="text-lg font-semibold text-[#3D2817] mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                      href="https://wa.me/393401234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition-colors cursor-pointer"
                    >
                      <i className="ri-whatsapp-line"></i>
                      <span className="whitespace-nowrap">WhatsApp</span>
                    </a>
                    <a
                      href="mailto:info@mauluna.com"
                      className="flex items-center justify-center space-x-2 p-3 bg-[#C9A876] text-white rounded-lg hover:bg-[#B8A596] transition-colors cursor-pointer"
                    >
                      <i className="ri-mail-line"></i>
                      <span className="whitespace-nowrap">Email</span>
                    </a>
                    <a
                      href="tel:+393401234567"
                      className="flex items-center justify-center space-x-2 p-3 bg-[#3D2817] text-white rounded-lg hover:bg-[#2A1C0F] transition-colors cursor-pointer"
                    >
                      <i className="ri-phone-line"></i>
                      <span className="whitespace-nowrap">Call</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(61,40,23,0.08)] p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#3D2817] mb-4">Location</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.8!2d12.4964!3d41.9028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU0JzEwLjEiTiAxMsKwMjknNDcuMCJF!5e0!3m2!1sen!2sit!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                ></iframe>
              </div>
              <p className="text-sm text-[#5C4B42] mt-2">
                <i className="ri-map-pin-line mr-1"></i>
                {property.zone}, Rome
              </p>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(61,40,23,0.08)] p-6">
                <h3 className="text-lg font-semibold text-[#3D2817] mb-4">Similar Properties</h3>
                <div className="space-y-4">
                  {similarProperties.map((similarProperty) => (
                    <div key={similarProperty.id} className="border-b border-[#E8E4E0] last:border-b-0 pb-4 last:pb-0">
                      <Link to={`/property/${similarProperty.id}`} className="block cursor-pointer">
                        <div className="flex space-x-3">
                          <img
                            src={similarProperty.image}
                            alt={similarProperty.title}
                            className="w-20 h-16 object-cover object-top rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#3D2817] text-sm line-clamp-2 mb-1">
                              {similarProperty.title}
                            </h4>
                            <p className="text-sm text-[#D97860] font-semibold">
                              {formatPrice(similarProperty.price, similarProperty.forSale)}
                            </p>
                            <p className="text-xs text-[#5C4B42]">
                              {similarProperty.zone} · {similarProperty.sqm} m²
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
