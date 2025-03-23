import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

// Import components with clear, distinct names
import Hero from './components/Hero';
import About from './components/About';
import Platform from './Platform';
import Contact from './components/Contact';
import LanguageSwitch from './components/LanguageSwitch';
import GallerySection from './components/GallerySection'; // Changed from PhotoGallery

// Import gallery CSS
import './components/gallery.css';

function App() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm py-4 px-6 flex justify-between items-center shadow-md" style={{ backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}>
        <div className="text-2xl font-bold">Sandro <span className="text-blue-600">2025</span></div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="hover:text-blue-600 transition-colors">{t('nav.home')}</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">{t('nav.about')}</a>
          <a href="#platform" className="hover:text-blue-600 transition-colors">{t('nav.platform')}</a>
          <a href="#gallery" className="hover:text-blue-600 transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">{t('nav.contact')}</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitch />
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Platform darkMode={darkMode} />
        <section id="gallery">
          <GallerySection /> {/* Changed from PhotoGallery */}
        </section>
        <Contact darkMode={darkMode} />
      </main>

      <footer className={`py-6 px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto text-center">
          <p>© 2025 Sandro Campaign. {t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;