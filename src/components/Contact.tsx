import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, UserPlus, DollarSign, Mail } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

const Contact = ({ darkMode }: ContactProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log({ name, email, message });
    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const actionCards = [
    {
      icon: <UserPlus size={32} />,
      title: t('contact.volunteer'),
      description: 'Join our team of volunteers and help make a difference in our community.'
    },
    {
      icon: <DollarSign size={32} />,
      title: t('contact.donate'),
      description: 'Support our campaign with a donation. Every contribution helps.'
    },
    {
      icon: <Mail size={32} />,
      title: t('contact.signup'),
      description: 'Stay informed about our campaign and upcoming events.'
    }
  ];

  return (
    <section 
      id="contact" 
      ref={ref}
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            {t('contact.title')}
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {actionCards.map((card, index) => (
                  <div 
                    key={index} 
                    className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'} text-center`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className={`rounded-full p-3 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                        {card.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-sm">{card.description}</p>
                  </div>
                ))}
              </div>
              
              <div className={`mt-10 p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                <h3 className="text-2xl font-bold mb-4">Campaign Headquarters</h3>
                <p className="mb-2">123 Main Street</p>
                <p className="mb-2">Anytown, USA 12345</p>
                <p className="mb-4">Phone: (555) 123-4567</p>
                <p className="font-semibold">Email: info@sandroforcongress.com</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className={`p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                
                {submitted ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Thank you for your message! We'll be in touch soon.
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-600 border-gray-500 text-white' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-600 border-gray-500 text-white' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-medium">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className={`w-full p-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-600 border-gray-500 text-white' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    <Send size={18} className="mr-2" />
                    {t('contact.submit')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;