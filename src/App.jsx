import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { FilterProvider } from '@/context/FilterContext';
import { WeatherModalProvider } from '@/context/WeatherModalContext';
import WeatherPill from '@/components/WeatherPill';
import WeatherModal from '@/components/WeatherModal';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import CoursesPage from '@/pages/CoursesPage';
import ExcursionsPage from '@/pages/ExcursionsPage';
import PackagesPage from '@/pages/PackagesPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
import AdminResource from '@/pages/AdminResource';
import { initializeData } from '@/lib/data';

const AmbientBackground = () => (
  <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
    {/* Top left glow */}
    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
    {/* Bottom right glow */}
    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  useEffect(() => {
    console.timeEnd('App load');
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/excursions" element={<ExcursionsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

        {Object.entries(RESOURCE_CONFIG).map(([key, config]) => (
          <Route
            key={key}
            path={`/admin/${key}`}
            element={
              <ProtectedRoute>
                <AdminResource
                  resourceKey={config.dataKey || key}
                  title={config.title}
                  config={config}
                />
              </ProtectedRoute>
            }
          />
        ))}

      </Routes>
      <Toaster />
      <WeatherModal />
      <WeatherPill />
    </>
  );
};

// Field Definitions for Admin
const RESOURCE_CONFIG = {
  excursions: {
    title: 'Excursions & Trips',
    columns: ['title', 'location', 'price'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image URL', type: 'text' },
    ]
  },
  courses: {
    title: 'Diving Courses',
    columns: ['title', 'level', 'price'],
    fields: [
      { name: 'title', label: 'Course Title', type: 'text' },
      { name: 'level', label: 'Level', type: 'text' },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'maxDepth', label: 'Max Depth', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'includes', label: 'Includes (comma separated)', type: 'list' },
    ]
  },
  packages: {
    title: 'Packages & Deals',
    columns: ['name', 'price', 'popular'],
    fields: [
      { name: 'name', label: 'Package Name', type: 'text' },
      { name: 'price', label: 'Price', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'popular', label: 'Popular Deal?', type: 'checkbox' },
      { name: 'features', label: 'Features (comma separated)', type: 'list' },
    ]
  },
  gallery: {
    title: 'Photo Gallery',
    columns: ['url', 'alt', 'type', 'categories'],
    fields: [
      { name: 'url', label: 'Media URL or Embed Code', type: 'text' },
      { name: 'alt', label: 'Alt Text', type: 'text' },
      { name: 'type', label: 'Type (photo/video)', type: 'text' },
      {
        name: 'categories',
        label: 'Categories',
        type: 'multiselect',
        options: ['coral gardens', 'marine life', 'manta rays', 'sea turtles', 'reef sharks', 'dive', 'wreck diving', 'night dives', 'photo',  'video']
      },
    ]
  },
  team: {
    title: 'Team Members',
    columns: ['name', 'role'],
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'image', label: 'Image URL', type: 'text' },
    ]
  },
  services: {
    title: 'Services',
    columns: ['name', 'description'],
    fields: [
      { name: 'name', label: 'Service Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' },
    ]
  },
  testimonials: {
    title: 'Testimonials',
    dataKey: 'reviews', // Map 'testimonials' route to 'reviews' data key
    columns: ['name', 'country', 'rating'],
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' },
      { name: 'course', label: 'Course Taken', type: 'text' },
      { name: 'rating', label: 'Rating (1-5)', type: 'number' },
      { name: 'text', label: 'Review Text', type: 'textarea' },
    ]
  }
};

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  console.time('App render');
  return (
    <FilterProvider>
      <WeatherModalProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </WeatherModalProvider>
    </FilterProvider>
  );
}

export default App;