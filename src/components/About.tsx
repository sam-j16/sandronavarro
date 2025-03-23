import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Check, Users } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const valueCards = [
    { 
      icon: <Heart className="h-8 w-8 text-red-500" />, 
      title: t('about.integrity'),
      description: "Always doing what's right, even when no one is watching."
    },
    { 
      icon: <Check className="h-8 w-8 text-green-500" />, 
      title: t('about.transparency'),
      description: "Open and honest communication with constituents at all times."
    },
    { 
      icon: <Users className="h-8 w-8 text-blue-500" />, 
      title: t('about.community'),
      description: "Building stronger communities through collaboration and respect."
    }
  ];

  return (
    <section 
      id="about" 
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            {t('about.title')}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <motion.div variants={itemVariants} className="md:w-1/3">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src="/images/hero/SSN-11.JPEG" 
                  alt="Sandro" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:w-2/3">
              <p className="text-lg mb-6">
                {t('about.bio')}
              </p>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              </p>
            </motion.div>
          </div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-10"
          >
            {t('about.values')}
          </motion.h3>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {valueCards.map((card, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
              >
                <div className="flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold text-center mb-2">{card.title}</h4>
                <p className="text-center">{card.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}