import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    // Handle registration logic here
    console.log('Registration attempt:', formData);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Register - MAULUNA IMMOBILIARE",
            "description": "Create your MAULUNA IMMOBILIARE account to list properties or find your dream home in Rome with 0% commission.",
            "url": "https://mauluna-immobiliare.com/register"
          })
        }}
      />

      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        
        <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <header className="text-center">
              <h1 className="text-3xl font-bold text-[#5C4B42]">Create Account</h1>
              <p className="mt-2 text-[#8B7355]">Join MAULUNA IMMOBILIARE today</p>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-[#E8E4E0] p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#5C4B42] mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm"
                    placeholder="Mario Rossi"
                  />
                </div>

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
                    placeholder="mario@email.com"
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
                      placeholder="Create a strong password"
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

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5C4B42] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm pr-12"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                      <i className={`${showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-[#8B7355]`}></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-[#5C4B42] mb-2">
                    I am a... (Optional)
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E8E4E0] rounded-lg focus:ring-2 focus:ring-[#D97860] focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select your role</option>
                    <option value="proprietario">Proprietario (Property Owner)</option>
                    <option value="cercatore">Cercatore (Property Seeker)</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                    className="h-4 w-4 text-[#D97860] focus:ring-[#D97860] border-[#E8E4E0] rounded"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-[#8B7355]">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#D97860] hover:bg-[#C86B52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D97860] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>

                <div className="text-center">
                  <span className="text-[#8B7355]">Already have an account? </span>
                  <Link to="/login" className="font-medium text-[#D97860] hover:text-[#C86B52] cursor-pointer">
                    Sign in
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

            <div className="bg-[#F0E6D6] rounded-lg p-4 text-center">
              <h3 className="font-medium text-[#5C4B42] mb-2">Why Join MAULUNA?</h3>
              <div className="text-sm text-[#8B7355] space-y-1">
                <div>✓ 0% Commission on all transactions</div>
                <div>✓ Direct contact with property owners</div>
                <div>✓ Exclusive Rome property listings</div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}