import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface HeroProps {
  darkMode: boolean;
}

const Hero = ({ darkMode }: HeroProps) => {
  const { t } = useTranslation();

  return (
    <section 
      id="hero" 
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${darkMode ? 'bg-gray-900' : ''}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/campaign-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      
      <motion.div 
        className={`container mx-auto px-6 text-center text-white z-10 ${darkMode ? 'bg-opacity-20 bg-black rounded-lg p-4' : ''}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Sandro for Congress
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {t('hero.slogan')}
        </motion.p>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.button 
          className={`${darkMode ? 'bg-blue-700' : 'bg-blue-600'} hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('hero.cta')}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;