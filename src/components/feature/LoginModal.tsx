
import { useState } from 'react';
import Button from '../base/Button';
import Input from '../base/Input';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#5C4B42] hover:text-[#D97860] transition-colors cursor-pointer"
          aria-label="Chiudi"
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#3D2817] mb-2">
            {isLogin ? 'Bentornato' : 'Crea Account'}
          </h2>
          <p className="text-[#5C4B42]">
            {isLogin 
              ? 'Accedi al tuo account per continuare' 
              : 'Unisciti a noi per iniziare a trovare la tua proprietà perfetta'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#3D2817] mb-1">
                Nome Completo
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Inserisci il tuo nome completo"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3D2817] mb-1">
              Indirizzo Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Inserisci la tua email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3D2817] mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Inserisci la tua password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#3D2817] mb-1">
                Conferma Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Conferma la tua password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#D97860] hover:text-[#C86B52] transition-colors cursor-pointer"
              >
                Password dimenticata?
              </button>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full whitespace-nowrap"
          >
            {isLogin ? 'Accedi' : 'Crea Account'}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="mt-6 text-center">
          <p className="text-[#5C4B42]">
            {isLogin ? "Non hai un account?" : "Hai già un account?"}
            <button
              onClick={switchMode}
              className="ml-1 text-[#D97860] hover:text-[#C86B52] font-medium transition-colors cursor-pointer"
            >
              {isLogin ? 'Registrati' : 'Accedi'}
            </button>
          </p>
        </div>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E4E0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#5C4B42]">Oppure continua con</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-[#E8E4E0] rounded-lg bg-white text-[#5C4B42] hover:bg-[#F9F6F3] transition-colors cursor-pointer"
            >
              <i className="ri-google-fill text-lg mr-2"></i>
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-[#E8E4E0] rounded-lg bg-white text-[#5C4B42] hover:bg-[#F9F6F3] transition-colors cursor-pointer"
            >
              <i className="ri-facebook-fill text-lg mr-2"></i>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}