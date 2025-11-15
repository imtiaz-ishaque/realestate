export default function Footer() {
  return (
    <footer className="bg-[#3D2817] border-t-2 border-[#C9A876] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img 
              src="https://static.readdy.ai/image/1bbf788ba92aaba852bdb317aec78e6c/849ee4b3cf950628cb8ba641c1f7207f.png" 
              alt="MAULUNA IMMOBILIARE" 
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
          </div>
          
          <div>
            <h4 className="font-semibold text-[#FAF7F2] mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Home</a></li>
              <li><a href="/properties" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Proprietà</a></li>
              <li><a href="/about" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Chi Siamo</a></li>
              <li><a href="/contact" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Contatti</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#FAF7F2] mb-4">Informazioni di Contatto</h4>
            <ul className="space-y-2 text-[#FAF7F2]">
              <li className="flex items-center space-x-2">
                <i className="ri-phone-line"></i>
                <span>+39 340 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="ri-mail-line"></i>
                <span>info@mauluna.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="ri-map-pin-line"></i>
                <span>Roma, Italia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#C9A876] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a href="/privacy" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Informativa sulla Privacy</a>
            <a href="/terms" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Termini di Servizio</a>
            <a href="https://readdy.ai/?origin=logo" className="text-[#FAF7F2] hover:text-[#D97860] transition-colors cursor-pointer">Website Builder</a>
          </div>
          <p className="text-[#FAF7F2] text-sm">
            © 2025 MAULUNA IMMOBILIARE. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}