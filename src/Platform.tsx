import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, GraduationCap, Leaf } from 'lucide-react';

interface PlatformProps {
  darkMode: boolean;
}

const Platform = ({ darkMode }: PlatformProps) => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const platformItems = [
    {
      icon: <TrendingUp size={36} />,
      title: t('platform.economy.title'),
      description: t('platform.economy.description'),
      details: [
        'Support small businesses with tax incentives',
        'Invest in job training programs',
        'Develop infrastructure projects that create jobs'
      ]
    },
    {
      icon: <GraduationCap size={36} />,
      title: t('platform.education.title'),
      description: t('platform.education.description'),
      details: [
        'Increase funding for public schools',
        'Reduce student debt through loan forgiveness',
        'Support teacher salary increases'
      ]
    },
    {
      icon: <Leaf size={36} />,
      title: t('platform.environment.title'),
      description: t('platform.environment.description'),
      details: [
        'Transition to renewable energy sources',
        'Protect our natural parks and resources',
        'Implement stronger pollution controls'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="platform" 
      ref={ref}
      className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl font-bold text-center mb-16"
          >
            {t('platform.title')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {platformItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-xl transition-shadow`}
              >
                <div className={`rounded-full p-4 inline-flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <div className={`${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className={`mr-2 mt-1 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <a 
              href="#contact" 
              className={`inline-block py-3 px-8 rounded-full font-bold ${
                darkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
            >
              {t('hero.cta')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Platform;