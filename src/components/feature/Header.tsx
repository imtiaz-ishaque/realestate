import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function Header() {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#C9A876] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-money-dollar-circle-line"></i>
              </div>
              <span>0% Commissioni</span>
            </div>
            <span className="text-white/50">·</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-user-line"></i>
              </div>
              <span>Proprietari Diretti</span>
            </div>
            <span className="text-white/50">·</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-map-pin-line"></i>
              </div>
              <span>Solo Roma</span>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm border-b border-[#E8E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img 
                src="https://static.readdy.ai/image/1bbf788ba92aaba852bdb317aec78e6c/849ee4b3cf950628cb8ba641c1f7207f.png" 
                alt="MAULUNA IMMOBILIARE" 
                className="h-10 w-auto"
              />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location.pathname === '/' ? 'text-[#D97860]' : 'text-[#5C4B42] hover:text-[#D97860]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location.pathname === '/properties' ? 'text-[#D97860]' : 'text-[#5C4B42] hover:text-[#D97860]'
                }`}
              >
                Immobili
              </Link>
              <Link 
                to="/how-it-works" 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location.pathname === '/how-it-works' ? 'text-[#D97860]' : 'text-[#5C4B42] hover:text-[#D97860]'
                }`}
              >
                Come Funziona
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  location.pathname === '/contact' ? 'text-[#D97860]' : 'text-[#5C4B42] hover:text-[#D97860]'
                }`}
              >
                Contatti
              </Link>
            </nav>
            
            <div className="flex items-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-[#C9A876] text-white rounded-lg hover:bg-[#B8976A] transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
              >
                Accedi
              </button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
