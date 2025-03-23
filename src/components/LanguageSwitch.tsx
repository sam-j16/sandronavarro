import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

// Export the component as default
export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle Language"
    >
      <Languages size={20} />
      <span className="sr-only">
        {i18n.language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
      </span>
    </button>
  );
}