import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Login - MAULUNA IMMOBILIARE",
            "description": "Login to your MAULUNA IMMOBILIARE account to manage your property listings and access exclusive features.",
            "url": "https://mauluna-immobiliare.com/login"
          })
        }}
      />

      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        
        <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <header className="text-center">
              <h1 className="text-3xl font-bold text-[#5C4B42]">Welcome Back</h1>
              <p className="mt-2 text-[#8B7355]">Sign in to your account</p>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-[#E8E4E0] p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#5C4B42] mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#5C4B42] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm pr-12"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-[#8B7355]`}></i>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#D97860] focus:ring-[#D97860] border-[#E8E4E0] rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#8B7355]">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#D97860] hover:bg-[#C86B52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D97860] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <span className="text-[#8B7355]">Don't have an account? </span>
                  <Link to="/register" className="font-medium text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                    Sign up
                  </Link>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E8E4E0]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#8B7355]">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-[#E8E4E0] rounded-lg shadow-sm bg-white text-sm font-medium text-[#5C4B42] hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-google-fill text-red-500 mr-2"></i>
                    Google
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-[#E8E4E0] rounded-lg shadow-sm bg-white text-sm font-medium text-[#5C4B42] hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-facebook-fill text-blue-600 mr-2"></i>
                    Facebook
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-[#8B7355]">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                Privacy Policy
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}