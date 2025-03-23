import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  nav: {
    home: 'Home',
    about: 'About',
    platform: 'Platform',
    contact: 'Contact'
  },
  hero: {
    slogan: 'Leadership for Tomorrow',
    subtitle: 'Building a better future together',
    cta: 'Join the Campaign'
  },
  about: {
    title: 'Meet Sandro',
    bio: 'Sandro is a dedicated public servant with over 15 years of experience in community leadership. Born and raised in our district, he understands the challenges we face and has a vision for a brighter future.',
    values: 'Values',
    integrity: 'Integrity',
    transparency: 'Transparency',
    community: 'Community'
  },
  platform: {
    title: 'Our Platform',
    economy: {
      title: 'Economy',
      description: 'Creating jobs and supporting local businesses.'
    },
    education: {
      title: 'Education',
      description: 'Investing in our schools and our children\'s future.'
    },
    environment: {
      title: 'Environment',
      description: 'Sustainable policies for a healthier community.'
    }
  },
  contact: {
    title: 'Get Involved',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send',
    volunteer: 'Volunteer',
    donate: 'Donate',
    signup: 'Sign up for updates'
  },
  footer: {
    rights: 'All Rights Reserved.'
  }
};

// Spanish translations
const esTranslations = {
  nav: {
    home: 'Inicio',
    about: 'Sobre',
    platform: 'Plataforma',
    contact: 'Contacto'
  },
  hero: {
    slogan: 'Liderazgo para el Mañana',
    subtitle: 'Construyendo un futuro mejor juntos',
    cta: 'Únete a la Campaña'
  },
  about: {
    title: 'Conoce a Sandro',
    bio: 'Sandro es un servidor público dedicado con más de 15 años de experiencia en liderazgo comunitario. Nacido y criado en nuestro distrito, comprende los desafíos que enfrentamos y tiene una visión para un futuro mejor.',
    values: 'Valores',
    integrity: 'Integridad',
    transparency: 'Transparencia',
    community: 'Comunidad'
  },
  platform: {
    title: 'Nuestra Plataforma',
    economy: {
      title: 'Economía',
      description: 'Creando empleos y apoyando negocios locales.'
    },
    education: {
      title: 'Educación',
      description: 'Invirtiendo en nuestras escuelas y en el futuro de nuestros niños.'
    },
    environment: {
      title: 'Medio Ambiente',
      description: 'Políticas sostenibles para una comunidad más saludable.'
    }
  },
  contact: {
    title: 'Involúcrate',
    name: 'Nombre',
    email: 'Correo Electrónico',
    message: 'Mensaje',
    submit: 'Enviar',
    volunteer: 'Voluntario',
    donate: 'Donar',
    signup: 'Regístrate para actualizaciones'
  },
  footer: {
    rights: 'Todos los Derechos Reservados.'
  }
};

// Initialize i18n
i18next
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    detection: {
      order: ['navigator']
    }
  });

export default i18next;
