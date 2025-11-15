
import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home/page';
import PropertiesPage from '../pages/properties/page';
import PropertyDetailPage from '../pages/property/page';
import SearchResultsPage from '../pages/search-results/page';
import AddListingPage from '../pages/add-listing/page';
import LoginPage from '../pages/login/page';
import RegisterPage from '../pages/register/page';
import HowItWorksPage from '../pages/how-it-works/page';
import ContactPage from '../pages/contact/page';
import AboutPage from '../pages/about/page';
import PrivacyPolicyPage from '../pages/privacy/page';
import TermsPage from '../pages/terms/page';
import NotFound from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/properties',
    element: <PropertiesPage />
  },
  {
    path: '/property/:id',
    element: <PropertyDetailPage />
  },
  {
    path: '/search-results',
    element: <SearchResultsPage />
  },
  {
    path: '/add-listing',
    element: <AddListingPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/how-it-works',
    element: <HowItWorksPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/privacy',
    element: <PrivacyPolicyPage />
  },
  {
    path: '/terms',
    element: <TermsPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
