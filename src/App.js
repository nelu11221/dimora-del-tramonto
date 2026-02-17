import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [language, setLanguage] = useState('en'); // Language: en, it, de
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: ''
  });

  // Translation function
  const t = (key) => {
    const translations = {
      navHome: { en: 'Home', it: 'Home', de: 'Startseite' },
      navGallery: { en: 'Gallery', it: 'Galleria', de: 'Galerie' },
      navAmenities: { en: 'Amenities', it: 'Servizi', de: 'Ausstattung' },
      navLocation: { en: 'Location', it: 'Posizione', de: 'Standort' },
      navContact: { en: 'Contact', it: 'Contatto', de: 'Kontakt' },
      bookNow: { en: 'Book Now', it: 'Prenota Ora', de: 'Jetzt Buchen' },
      heroBadge: { en: 'Authentic Italian Experience', it: 'Esperienza Autentica Italiana', de: 'Authentisches Italienisches Erlebnis' },
      heroTitle1: { en: 'Discover Authentic', it: 'Scopri la Tranquillità', de: 'Entdecken Sie Die' },
      heroTitle2: { en: 'Tuscan Tranquility', it: 'Autentica della Toscana', de: 'Authentische Toskanische Ruhe' },
      heroSubtitle: { en: 'Private villa with infinity pool and panoramic views of the Chianti hills', it: 'Villa privata con piscina a sfioro e vista panoramica sulle colline del Chianti', de: 'Private Villa mit Infinity-Pool und Panoramablick auf die Chianti-Hügel' },
      bedrooms: { en: 'Bedrooms', it: 'Camere', de: 'Schlafzimmer' },
      guests: { en: 'Guests', it: 'Ospiti', de: 'Gäste' },
      pool: { en: 'Pool', it: 'Piscina', de: 'Pool' },
      checkAvailability: { en: 'Check Availability', it: 'Verifica Disponibilità', de: 'Verfügbarkeit Prüfen' },
      virtualTour: { en: 'Virtual Tour', it: 'Tour Virtuale', de: 'Virtuelle Tour' },
      scroll: { en: 'Scroll', it: 'Scorri', de: 'Scrollen' },
      slide1Title: { en: 'Master Bedroom', it: 'Camera da Letto Principale', de: 'Hauptschlafzimmer' },
      slide1Desc: { en: 'Elegance and Tuscan comfort', it: 'Eleganza e comfort toscano', de: 'Eleganz und toskanischer Komfort' },
      slide2Title: { en: 'Panoramic Pool', it: 'Piscina Panoramica', de: 'Panorama-Pool' },
      slide2Desc: { en: 'Breathtaking hill views', it: 'Vista mozzafiato sulle colline', de: 'Atemberaubender Blick auf die Hügel' },
      slide3Title: { en: 'Luxury Lounge', it: 'Salone di Lusso', de: 'Luxus-Lounge' },
      slide3Desc: { en: 'Spacious and bright spaces', it: 'Spazi ampi e luminosi', de: 'Geräumige und helle Räume' },
      slide4Title: { en: 'Sunset Terrace', it: 'Terrazza al Tramonto', de: 'Sonnenuntergangs-Terrasse' },
      slide4Desc: { en: 'The perfect place to relax', it: 'Il luogo perfetto per rilassarsi', de: 'Der perfekte Ort zum Entspannen' },
      sliderLabel: { en: 'Gallery', it: 'Galleria', de: 'Galerie' },
      sliderTitle: { en: 'Explore Our', it: 'Esplora i Nostri', de: 'Erkunden Sie Unsere' },
      sliderTitleAccent: { en: 'Spaces', it: 'Spazi', de: 'Räume' },
      sliderDesc: { en: 'A curated collection of moments', it: 'Una collezione curata di momenti', de: 'Eine kuratierte Sammlung' },
      // Booking Form Translations
      formTitle: { en: 'Check Availability', it: 'Verifica Disponibilità', de: 'Verfügbarkeit Prüfen' },
      formSubtitle: { en: 'Fill out the form and we will contact you as soon as possible', it: 'Compila il modulo e ti contatteremo al più presto', de: 'Füllen Sie das Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden' },
      formName: { en: 'Full Name *', it: 'Nome Completo *', de: 'Vollständiger Name *' },
      formNamePlaceholder: { en: 'John Doe', it: 'Mario Rossi', de: 'Max Mustermann' },
      formEmail: { en: 'Email *', it: 'Email *', de: 'E-Mail *' },
      formEmailPlaceholder: { en: 'email@example.com', it: 'email@esempio.com', de: 'email@beispiel.de' },
      formPhone: { en: 'Phone *', it: 'Telefono *', de: 'Telefon *' },
      formPhonePlaceholder: { en: '+1 123 456 789', it: '+39 123 456 789', de: '+49 123 456 789' },
      formGuests: { en: 'Number of Guests *', it: 'Numero Ospiti *', de: 'Anzahl der Gäste *' },
      formPerson: { en: 'Person', it: 'Persona', de: 'Person' },
      formPersons: { en: 'Persons', it: 'Persone', de: 'Personen' },
      formCheckIn: { en: 'Check-in *', it: 'Check-in *', de: 'Check-in *' },
      formCheckOut: { en: 'Check-out *', it: 'Check-out *', de: 'Check-out *' },
      formMessage: { en: 'Message (Optional)', it: 'Messaggio (Facoltativo)', de: 'Nachricht (Optional)' },
      formMessagePlaceholder: { en: 'Tell us more about your plans or special requests...', it: 'Raccontaci di più sui tuoi piani o richieste speciali...', de: 'Erzählen Sie uns mehr über Ihre Pläne oder besondere Wünsche...' },
      formInfo: { en: 'We will contact you within 24 hours to confirm availability and discuss booking details.', it: 'Ti contatteremo entro 24 ore per confermare la disponibilità e discutere i dettagli della prenotazione.', de: 'Wir werden Sie innerhalb von 24 Stunden kontaktieren, um die Verfügbarkeit zu bestätigen und Buchungsdetails zu besprechen.' },
      formSending: { en: 'Sending...', it: 'Invio in corso...', de: 'Wird gesendet...' },
      formSubmit: { en: 'Send Request', it: 'Invia Richiesta', de: 'Anfrage Senden' },
      formSuccess: { en: 'Thank you! Your request has been sent successfully. We will contact you soon!', it: 'Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto!', de: 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir werden Sie bald kontaktieren!' },
      formError: { en: 'Oops! An error occurred. Please try again or contact us directly.', it: 'Oops! Si è verificato un errore. Riprova o contattaci direttamente.', de: 'Hoppla! Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.' },
      // Footer Translations
      footerExplore: { en: 'Explore', it: 'Esplora', de: 'Erkunden' },
      footerBrandDesc: { en: 'Experience authentic Tuscan luxury in a private villa with spectacular views of the Chianti hills.', it: 'Vivi l\'autentico lusso toscano in una villa privata con viste spettacolari sulle colline del Chianti.', de: 'Erleben Sie authentischen toskanischen Luxus in einer privaten Villa mit spektakulärem Blick auf die Chianti-Hügel.' },
      footerInfo: { en: 'Information', it: 'Informazioni', de: 'Informationen' },
      footerRates: { en: 'Rates & Booking', it: 'Tariffe & Prenotazioni', de: 'Preise & Buchung' },
      footerPolicies: { en: 'Policies', it: 'Politiche', de: 'Richtlinien' },
      footerFAQ: { en: 'FAQ', it: 'Domande Frequenti', de: 'Häufig gestellte Fragen' },
      footerContact: { en: 'Contact', it: 'Contatto', de: 'Kontakt' },
      footerRights: { en: 'All rights reserved.', it: 'Tutti i diritti riservati.', de: 'Alle Rechte vorbehalten.' },
      footerPrivacy: { en: 'Privacy Policy', it: 'Politica sulla Privacy', de: 'Datenschutz-Bestimmungen' },
      footerTerms: { en: 'Terms & Conditions', it: 'Termini e Condizioni', de: 'Geschäftsbedingungen' },
      // Slider Section
      sliderLabelGallery: { en: 'Gallery', it: 'Galleria', de: 'Galerie' },
      sliderExplore: { en: 'Explore the Spaces', it: 'Esplora i Spazi', de: 'Erkunde die Räume' },
      sliderOur: { en: 'Our', it: 'Nostri', de: 'Unsere' },
      sliderDescription: { en: 'A curated collection of moments and details that define the Dimora del Tramonto experience', it: 'Una collezione curata di momenti e dettagli che definiscono l\'esperienza Dimora del Tramonto', de: 'Eine kuratierte Sammlung von Momenten und Details, die das Dimora del Tramonto Erlebnis definieren' },
      // About Section
      aboutLabel: { en: 'About Us', it: 'Chi Siamo', de: 'Über Uns' },
      aboutTitle: { en: 'An Unparalleled', it: 'Un\'Esperienza', de: 'Ein Unvergleichliches' },
      aboutTitleAccent: { en: 'Experience', it: 'Senza Pari', de: 'Erlebnis' },
      aboutText1: { en: 'Dimora del Tramonto is an exclusive villa located in the heart of Tuscany, offering a luxurious escape with spectacular views of the Chianti hills. Traditional Italian architecture blends perfectly with modern comfort to create a dream refuge.', it: 'Dimora del Tramonto è una villa esclusiva situata nel cuore della Toscana, che offre una fuga di lusso con viste spettacolari sulle colline del Chianti. L\'architettura tradizionale italiana si fonde perfettamente con il comfort moderno per creare un rifugio da sogno.', de: 'Dimora del Tramonto ist eine exklusive Villa im Herzen der Toskana, die einen luxuriösen Rückzugsort mit spektakulärem Blick auf die Chianti-Hügel bietet. Traditionelle italienische Architektur verschmilzt perfekt mit modernem Komfort, um einen Traum-Rückzugsort zu schaffen.' },
      aboutText2: { en: 'With a private infinity pool, lush gardens and elegant interiors, our villa offers the perfect setting for memorable vacations, creative retreats or special celebrations. Every detail has been thought out to offer our guests an authentic Tuscan experience.', it: 'Con piscina privata a sfioro, giardini rigogliosi e interni eleganti, la nostra villa offre l\'ambiente perfetto per vacanze memorabili, ritiri creativi o celebrazioni speciali. Ogni dettaglio è stato pensato per offrire ai nostri ospiti un\'autentica esperienza toscana.', de: 'Mit privatem Infinity-Pool, üppigen Gärten und eleganten Innenräumen bietet unsere Villa den perfekten Rahmen für unvergessliche Ferien, kreative Rückzugsorte oder besondere Feiern. Jedes Detail wurde durchdacht, um unseren Gästen ein authentisches toskanisches Erlebnis zu bieten.' },
      aboutInfinityPool: { en: 'Infinity Pool', it: 'Piscina a Sfioro', de: 'Infinity-Pool' },
      aboutPoolDesc: { en: 'Private heated pool with panoramic view', it: 'Piscina privata riscaldata con vista panoramica', de: 'Privater beheizter Pool mit Panoramablick' },
      aboutPrivateCellar: { en: 'Private Cellar', it: 'Cantina Privata', de: 'Privater Weinkeller' },
      aboutCellarDesc: { en: 'Curated collection of Tuscan wines', it: 'Collezione curata di vini toscani', de: 'Kuratierte Sammlung toskanischer Weine' },
      aboutProfKitchen: { en: 'Professional Kitchen', it: 'Cucina Professionale', de: 'Profi-Küche' },
      aboutKitchenDesc: { en: 'Complete equipment for private chef', it: 'Attrezzatura completa per chef privato', de: 'Komplette Ausstattung für Privatkoch' },
      aboutPrivateGardens: { en: 'Private Gardens', it: 'Giardini Privati', de: 'Private Gärten' },
      aboutGardensDesc: { en: '3 hectares of landscaped grounds', it: '3 ettari di terreni paesaggistici', de: '3 Hektar gepflegte Anlagen' },
      aboutSpaSauna: { en: 'Spa & Sauna', it: 'Spa & Sauna', de: 'Spa & Sauna' },
      aboutSpaDesc: { en: 'Complete wellness facilities', it: 'Strutture wellness complete', de: 'Komplette Wellness-Einrichtungen' },
      aboutArtStudio: { en: 'Art Studio', it: 'Studio d\'Arte', de: 'Kunstatelier' },
      aboutStudioDesc: { en: 'Creative space with natural light', it: 'Spazio creativo con luce naturale', de: 'Kreativer Raum mit natürlichem Licht' },
      aboutLivingArea: { en: 'Living Area', it: 'Superficie Abitabile', de: 'Wohnfläche' },
      aboutSuiteBedrooms: { en: 'Suite Bedrooms', it: 'Camere Suite', de: 'Suite-Schlafzimmer' },
      aboutLuxBaths: { en: 'Luxury Baths', it: 'Bagni di Lusso', de: 'Luxus-Bäder' },
      aboutMaxGuests: { en: 'Max Guests', it: 'Ospiti Massimo', de: 'Max. Gäste' },
      // Gallery Section
      galleryFullLabel: { en: 'Full Gallery', it: 'Galleria Completa', de: 'Vollständige Galerie' },
      galleryExplore: { en: 'Explore Every', it: 'Esplora Ogni', de: 'Erkunden Sie Jeden' },
      galleryCorner: { en: 'Corner of Paradise', it: 'Angolo di Paradiso', de: 'Winkel des Paradieses' },
      galleryExterior: { en: 'Exterior', it: 'Esterno', de: 'Außenbereich' },
      galleryLivingRoom: { en: 'Living Room', it: 'Soggiorno', de: 'Wohnzimmer' },
      galleryMasterBed: { en: 'Master Bedroom', it: 'Camera Principale', de: 'Hauptschlafzimmer' },
      galleryKitchen: { en: 'Kitchen', it: 'Cucina', de: 'Küche' },
      galleryPoolArea: { en: 'Pool Area', it: 'Area Piscina', de: 'Poolbereich' },
      galleryDining: { en: 'Dining', it: 'Sala da Pranzo', de: 'Esszimmer' },
      galleryBathroom: { en: 'Bathroom', it: 'Bagno', de: 'Badezimmer' },
      gallerySunset: { en: 'Sunset View', it: 'Vista Tramonto', de: 'Sonnenuntergang' },
      // Facilities Section
      facilitiesLabel: { en: 'Premium Facilities', it: 'Servizi Premium', de: 'Premium-Ausstattung' },
      facilitiesTitle: { en: 'Everything You Need For', it: 'Tutto Ciò Di Cui Hai Bisogno Per', de: 'Alles Was Sie Brauchen Für' },
      facilitiesTitleAccent: { en: 'A Perfect Stay', it: 'Un Soggiorno Perfetto', de: 'Einen Perfekten Aufenthalt' },
      facilitiesDesc: { en: 'Every detail has been designed for your maximum comfort and relaxation', it: 'Ogni dettaglio è stato progettato per il vostro massimo comfort e relax', de: 'Jedes Detail wurde für Ihren maximalen Komfort und Ihre Entspannung gestaltet' },
      facilitiesInterior: { en: 'Interior', it: 'Interni', de: 'Innenbereich' },
      facilitiesExterior: { en: 'Exterior', it: 'Esterni', de: 'Außenbereich' },
      facilitiesKitchen: { en: 'Kitchen & Dining', it: 'Cucina & Sala da Pranzo', de: 'Küche & Essen' },
      facilitiesServices: { en: 'Available Services', it: 'Servizi Disponibili', de: 'Verfügbare Dienste' },
      // Interior Facilities
      interiorWifi: { en: 'High-speed Wi-Fi throughout the villa', it: 'Wi-Fi ad alta velocità in tutta la villa', de: 'Highspeed-WLAN in der gesamten Villa' },
      interiorAC: { en: 'Central air conditioning system', it: 'Sistema di climatizzazione centralizzato', de: 'Zentrale Klimaanlage' },
      interiorFireplace: { en: 'Traditional stone fireplace', it: 'Camino tradizionale in pietra', de: 'Traditioneller Steinkamin' },
      interiorSmartTV: { en: 'Smart TV in every room', it: 'Smart TV in ogni camera', de: 'Smart-TV in jedem Zimmer' },
      interiorSonos: { en: 'Sonos audio system', it: 'Sistema audio Sonos', de: 'Sonos-Audiosystem' },
      interiorWasher: { en: 'Washing machine and dryer', it: 'Lavatrice e asciugatrice', de: 'Waschmaschine und Trockner' },
      interiorIron: { en: 'Iron and ironing board', it: 'Ferro e asse da stiro', de: 'Bügeleisen und Bügelbrett' },
      interiorSafe: { en: 'Safe in each bedroom', it: 'Cassaforte in ogni camera', de: 'Safe in jedem Schlafzimmer' },
      // Exterior Facilities
      exteriorPool: { en: 'Heated infinity pool (12m x 6m)', it: 'Piscina a sfioro riscaldata (12m x 6m)', de: 'Beheizter Infinity-Pool (12m x 6m)' },
      exteriorLoungers: { en: 'Premium sun loungers and umbrellas', it: 'Lettini e ombrelloni premium', de: 'Premium-Sonnenliegen und Sonnenschirme' },
      exteriorTerrace: { en: 'Covered terrace with dining area', it: 'Terrazza coperta con zona pranzo', de: 'Überdachte Terrasse mit Essbereich' },
      exteriorBBQ: { en: 'Professional BBQ with outdoor kitchen', it: 'Barbecue professionale con cucina esterna', de: 'Profi-Grill mit Außenküche' },
      exteriorJacuzzi: { en: 'Jacuzzi for 6 people', it: 'Jacuzzi per 6 persone', de: 'Jacuzzi für 6 Personen' },
      exteriorGardens: { en: 'Gardens with olive trees and lavender', it: 'Giardini con ulivi e lavanda', de: 'Gärten mit Olivenbäumen und Lavendel' },
      exteriorParking: { en: 'Private parking for 3 cars', it: 'Parcheggio privato per 3 auto', de: 'Privater Parkplatz für 3 Autos' },
      exteriorLighting: { en: 'Decorative garden lighting', it: 'Illuminazione decorativa del giardino', de: 'Dekorative Gartenbeleuchtung' },
      // Kitchen & Dining Facilities
      kitchenProfessional: { en: 'Fully equipped professional kitchen', it: 'Cucina professionale completamente attrezzata', de: 'Voll ausgestattete Profiküche' },
      kitchenOven: { en: 'Double oven and gas stove', it: 'Forno doppio e piano cottura a gas', de: 'Doppelofen und Gasherd' },
      kitchenFridge: { en: 'American fridge/freezer', it: 'Frigorifero/congelatore americano', de: 'Amerikanischer Kühl-/Gefrierschrank' },
      kitchenDishwasher: { en: 'Dishwasher', it: 'Lavastoviglie', de: 'Geschirrspüler' },
      kitchenEspresso: { en: 'La Marzocco professional espresso machine', it: 'Macchina da caffè espresso professionale La Marzocco', de: 'La Marzocco Profi-Espressomaschine' },
      kitchenDining: { en: 'Dining table for 10 people', it: 'Tavolo da pranzo per 10 persone', de: 'Esstisch für 10 Personen' },
      kitchenDishes: { en: 'Complete set of dishes and glasses', it: 'Set completo di stoviglie e bicchieri', de: 'Komplettes Geschirr- und Gläserset' },
      kitchenWineCellar: { en: 'Wine cellar with local wine selection', it: 'Cantina con selezione di vini locali', de: 'Weinkeller mit lokaler Weinauswahl' },
      // Services
      serviceCleaning: { en: 'Daily cleaning (on request)', it: 'Pulizia giornaliera (su richiesta)', de: 'Tägliche Reinigung (auf Anfrage)' },
      serviceChef: { en: 'Private chef for special meals', it: 'Chef privato per pasti speciali', de: 'Privatkoch für besondere Mahlzeiten' },
      serviceConcierge: { en: '24/7 concierge services', it: 'Servizi di concierge 24/7', de: '24/7 Concierge-Service' },
      serviceTransfer: { en: 'Airport transfer in Mercedes S-Class', it: 'Transfer aeroportuale in Mercedes Classe S', de: 'Flughafentransfer in Mercedes S-Klasse' },
      serviceWineTours: { en: 'Personalized wine tasting tours', it: 'Tour di degustazione vini personalizzati', de: 'Personalisierte Weinverkostungstouren' },
      serviceSpa: { en: 'Massage and spa treatments at home', it: 'Massaggi e trattamenti spa a domicilio', de: 'Massage und Spa-Behandlungen vor Ort' },
      serviceGrocery: { en: 'Stocking with local products', it: 'Rifornimento con prodotti locali', de: 'Bevorratung mit lokalen Produkten' },
      serviceExperiences: { en: 'Local experience planning', it: 'Pianificazione esperienze locali', de: 'Planung lokaler Erlebnisse' },
      // Location Section
      locationLabel: { en: 'Location', it: 'Posizione', de: 'Standort' },
      locationTitle: { en: 'In the Heart', it: 'Nel Cuore', de: 'Im Herzen' },
      locationTitleAccent: { en: 'of Tuscany', it: 'della Toscana', de: 'der Toskana' },
      locationIntro: { en: 'Dimora del Tramonto is strategically positioned to offer you easy access to the most beautiful cities and wineries in the Chianti region.', it: 'Dimora del Tramonto è posizionata strategicamente per offrirti un facile accesso alle città e alle cantine più belle della regione del Chianti.', de: 'Dimora del Tramonto ist strategisch positioniert, um Ihnen einfachen Zugang zu den schönsten Städten und Weingütern der Chianti-Region zu bieten.' },
      locationAttractions: { en: 'Local Attractions', it: 'Attrazioni Locali', de: 'Lokale Attraktionen' },
      locationWineries: { en: 'Wineries & Tastings', it: 'Cantine & Degustazioni', de: 'Weingüter & Verkostungen' },
      locationWineriesDesc: { en: 'Over 20 award-winning wineries within 30 minutes', it: 'Oltre 20 cantine premiate entro 30 minuti', de: 'Über 20 preisgekrönte Weingüter in 30 Minuten' },
      locationArtCulture: { en: 'Art & Culture', it: 'Arte & Cultura', de: 'Kunst & Kultur' },
      locationArtDesc: { en: 'Uffizi and Accademia Museums and renowned art galleries', it: 'Musei Uffizi, Accademia e gallerie d\'arte rinomate', de: 'Uffizien- und Accademia-Museen und renommierte Kunstgalerien' },
      locationGastronomy: { en: 'Gastronomy', it: 'Gastronomia', de: 'Gastronomie' },
      locationGastronomyDesc: { en: 'Michelin restaurants and traditional trattorias', it: 'Ristoranti Michelin e trattorie tradizionali', de: 'Michelin-Restaurants und traditionelle Trattorien' },
      locationNature: { en: 'Nature', it: 'Natura', de: 'Natur' },
      locationNatureDesc: { en: 'Hiking and cycling trails through Chianti vineyards', it: 'Sentieri escursionistici e ciclabili attraverso i vigneti del Chianti', de: 'Wander- und Radwege durch die Chianti-Weinberge' },
      locationMinutes: { en: 'minutes', it: 'minuti', de: 'Minuten' },
      // Reviews Section
      reviewsLabel: { en: 'Reviews', it: 'Recensioni', de: 'Bewertungen' },
      reviewsTitle: { en: 'What Our', it: 'Cosa Dicono', de: 'Was Unsere' },
      reviewsTitleAccent: { en: 'Guests Say', it: 'I Nostri Ospiti', de: 'Gäste Sagen' },
      reviewsRating: { en: 'out of 5', it: 'su 5', de: 'von 5' },
      reviewsCount: { en: 'reviews', it: 'recensioni', de: 'Bewertungen' },
      // CTA Section
      ctaReady: { en: 'Ready For Your', it: 'Pronto Per La Tua', de: 'Bereit Für Ihr' },
      ctaExperience: { en: 'Dream Tuscan Experience?', it: 'Esperienza Toscana Da Sogno?', de: 'Toskanisches Traumerlebnis?' },
      ctaSubtitle: { en: 'Check availability and book your stay at Dimora del Tramonto', it: 'Controlla la disponibilità e prenota il tuo soggiorno a Dimora del Tramonto', de: 'Überprüfen Sie die Verfügbarkeit und buchen Sie Ihren Aufenthalt in Dimora del Tramonto' },
      ctaContact: { en: 'Contact Us', it: 'Contattaci', de: 'Kontaktieren Sie Uns' },
    };
    return translations[key]?.[language] || key;
  };


  // Slider images - replace with your actual images
  const slides = [
    {
      image: `${process.env.PUBLIC_URL}/images/slide1.jpg`,
      title: t('slide1Title'),
      description: t('slide1Desc')
    },
    {
      image: `${process.env.PUBLIC_URL}/images/slide2.jpg`,
      title: t('slide2Title'),
      description: t('slide2Desc')
    },
    {
      image: `${process.env.PUBLIC_URL}/images/slide3.jpg`,
      title: t('slide3Title'),
      description: t('slide3Desc')
    },
    {
      image: `${process.env.PUBLIC_URL}/images/slide4.jpg`,
      title: t('slide4Title'),
      description: t('slide4Desc')
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update review slider with scroll - only on user interaction, not on mount
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const reviewsGrid = document.querySelector('.reviews-grid');
    if (reviewsGrid && window.innerWidth <= 768) {
      const cards = reviewsGrid.querySelectorAll('.review-card');
      if (cards[currentReview]) {
        reviewsGrid.scrollTo({
          left: cards[currentReview].offsetLeft - (window.innerWidth - cards[currentReview].offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentReview]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Review swipe handlers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      // Swipe left - next review
      setCurrentReview(prev => prev === 5 ? 0 : prev + 1);
    }
    if (isRightSwipe) {
      // Swipe right - previous review
      setCurrentReview(prev => prev === 0 ? 5 : prev - 1);
    }
  };

  // Modal functions
  const openModal = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Mobile menu functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 

// Replace the handleSubmit function with this:
  const handleSubmit = (e) => {
  e.preventDefault();
  
  const serviceId = 'service_w0bf1rd';      // From EmailJS Dashboard > Email Services
  const templateId = 'template_xtotbgx';    // From EmailJS Dashboard > Email Templates
  const publicKey = 'dzh_MYVldtKHUDQQG';      // From EmailJS Dashboard > Account > API Keys
    
  // Prepare the email data
  const templateParams = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    checkIn: formData.checkIn,
    checkOut: formData.checkOut,
    guests: formData.guests,
    message: formData.message || 'No additional message'
  };
  
  // Show loading state
  const submitButton = document.querySelector('.submit-button');
  submitButton.disabled = true;
  submitButton.innerHTML = `<span>${t('formSending')}</span>`;
  
  // Send email via EmailJS
  emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert(t('formSuccess'));
      closeModal();
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '2',
        message: ''
      });
    })
    .catch((error) => {
      console.error('FAILED...', error);
      alert(t('formError'));
    })
    .finally(() => {
      // Reset button
      submitButton.disabled = false;
      submitButton.innerHTML = `<span>${t('formSubmit')}</span><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    });
};

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <img 
              src={
                isMobile 
                  ? (isScrolled ? '/images/logo4.svg' : '/images/logo3.svg')
                  : (isScrolled ? '/images/logo2.svg' : '/images/logo1.svg')
              }
              alt="Dimora del Tramonto" 
              className="logo-image"
            />
          </div>
          <div className="nav-links desktop-nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>{t('navHome')}</a>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>{t('navGallery')}</a>
            <a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}>{t('navAmenities')}</a>
            <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}>{t('navLocation')}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('navContact')}</a>
          </div>
          <div className="nav-right">
            <div className="language-toggle desktop-lang">
              <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')} title="English">EN</button>
              <button className={`lang-btn ${language === 'it' ? 'active' : ''}`} onClick={() => setLanguage('it')} title="Italiano">IT</button>
              <button className={`lang-btn ${language === 'de' ? 'active' : ''}`} onClick={() => setLanguage('de')} title="Deutsch">DE</button>
            </div>
            <button className="cta-button desktop-cta" onClick={openModal}>{t('bookNow')}</button>
            
            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>{t('navHome')}</a>
              <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>{t('navGallery')}</a>
              <a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}>{t('navAmenities')}</a>
              <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}>{t('navLocation')}</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('navContact')}</a>
            </div>
            
            {/* Mobile Language Toggle */}
            <div className="mobile-language-toggle">
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button 
                className={`lang-btn ${language === 'it' ? 'active' : ''}`}
                onClick={() => setLanguage('it')}
              >
                IT
              </button>
              <button 
                className={`lang-btn ${language === 'de' ? 'active' : ''}`}
                onClick={() => setLanguage('de')}
              >
                DE
              </button>
            </div>

            <button className="mobile-cta-button" onClick={openModal}>
              {t('bookNow')}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className="hero" 
        id="home"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>{t('heroBadge')}</span>
          </div>
          <h1 className="hero-title">
            {t('heroTitle1')}
            <span className="accent-text">{t('heroTitle2')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>
          <div className="hero-cta">
            <button className="primary-button" onClick={openModal}>
              <span>{t('checkAvailability')}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="secondary-button" onClick={openVideoModal}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 8l4 2-4 2V8z" fill="currentColor"/>
              </svg>
              <span>{t('virtualTour')}</span>
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>{t('scroll')}</span>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="slider-section">
        <div className="section-header">
          <span className="section-label">{t('sliderLabelGallery')}</span>
          <h2 className="section-title">
            {t('sliderExplore')}
            <span className="accent-text">{t('sliderOur')}</span>
          </h2>
          <p className="section-description">
            {t('sliderDescription')}
          </p>
        </div>

        <div className="slider-container">
          <div className="slider-wrapper">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''} ${
                  index === currentSlide - 1 || (currentSlide === 0 && index === slides.length - 1)
                    ? 'prev'
                    : ''
                } ${
                  index === currentSlide + 1 || (currentSlide === slides.length - 1 && index === 0)
                    ? 'next'
                    : ''
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-content">
                  <span className="slide-number">0{index + 1}</span>
                  <h3 className="slide-title">{slide.title}</h3>
                  <p className="slide-description">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="slider-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* About Property Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-content">
            <span className="section-label">{t('aboutLabel')}</span>
            <h2 className="section-title">
              {t('aboutTitle')}
              <span className="accent-text">{t('aboutTitleAccent')}</span>
            </h2>
            <p className="about-text">
              {t('aboutText1')}
            </p>
            <p className="about-text">
              {t('aboutText2')}
            </p>
            
            <div className="amenities-grid">
              <div className="amenity-item">
                <div className="amenity-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                    <path d="M2 19c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                    <path d="M2 11h20"/>
                    <path d="M2 7l8-4 4 4 6-2"/>
                  </svg>
                </div>
                <h4>{t('aboutInfinityPool')}</h4>
                <p>{t('aboutPoolDesc')}</p>
              </div>
              <div className="amenity-item">
                <div className="amenity-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 22h8"/>
                    <path d="M12 11v11"/>
                    <path d="M12 11c4 0 6-2.5 6-6V2H6v3c0 3.5 2 6 6 6z"/>
                  </svg>
                </div>
                <h4>{t('aboutPrivateCellar')}</h4>
                <p>{t('aboutCellarDesc')}</p>
              </div>
              <div className="amenity-item">
                <div className="amenity-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                    <line x1="6" y1="17" x2="18" y2="17"/>
                  </svg>
                </div>
                <h4>{t('aboutProfKitchen')}</h4>
                <p>{t('aboutKitchenDesc')}</p>
              </div>
              <div className="amenity-item">
                <div className="amenity-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22V8"/>
                    <path d="M5 12h14"/>
                    <path d="M17 16c2 0 3-1.5 3-3.5S19 9 17 9c0-2-1.5-4-4-4S9 7 9 9c-2 0-3 1.5-3 3.5S7 16 9 16"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </div>
                <h4>{t('aboutPrivateGardens')}</h4>
                <p>{t('aboutGardensDesc')}</p>
              </div>
              <div className="amenity-item">
                <div className="amenity-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 22v-2m6 2v-2"/>
                    <path d="M2 15h20"/>
                    <path d="M2 12h20c0 3-2 5-5 5H7c-3 0-5-2-5-5Z"/>
                    <path d="M2 12V6a2 2 0 0 1 2-2h3"/>
                    <circle cx="8" cy="6" r="2"/>
                  </svg>
                </div>
                <h4>{t('aboutSpaSauna')}</h4>
                <p>{t('aboutSpaDesc')}</p>
              </div>
              <div className="amenity-item">
                <div className="amenity-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
                    <path d="M12 16c-1.5 0-2.5-1-2.5-2h5c0 1-1 2-2.5 2z"/>
                  </svg>
                </div>
                <h4>{t('aboutArtStudio')}</h4>
                <p>{t('aboutStudioDesc')}</p>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat">
                <span className="stat-number">350m²</span>
                <span className="stat-label">{t('aboutLivingArea')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">{t('aboutSuiteBedrooms')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.5</span>
                <span className="stat-label">{t('aboutLuxBaths')}</span>
              </div>
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">{t('aboutMaxGuests')}</span>
              </div>
            </div>
          </div>

          <div className="about-images">
            <div className="image-stack">
              <div 
                className="stacked-img img-1"
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/about1.jpg)` }}
              ></div>
              <div 
                className="stacked-img img-2"
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/about2.jpg)` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <span className="section-label">{t('galleryFullLabel')}</span>
          <h2 className="section-title">
            {t('galleryExplore')}
            <span className="accent-text">{t('galleryCorner')}</span>
          </h2>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item large" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery1.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryExterior')}</span>
            </div>
          </div>
          <div className="gallery-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery2.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryLivingRoom')}</span>
            </div>
          </div>
          <div className="gallery-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery3.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryMasterBed')}</span>
            </div>
          </div>
          <div className="gallery-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery4.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryKitchen')}</span>
            </div>
          </div>
          <div className="gallery-item tall" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery5.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryPoolArea')}</span>
            </div>
          </div>
          <div className="gallery-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery6.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryDining')}</span>
            </div>
          </div>
          <div className="gallery-item" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery7.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('galleryBathroom')}</span>
            </div>
          </div>
          <div className="gallery-item wide" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/gallery8.jpg)` }}>
            <div className="gallery-overlay">
              <span className="gallery-tag">{t('gallerySunset')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section" id="amenities">
        <div className="facilities-container">
          <div className="facilities-intro">
            <span className="section-label">{t('facilitiesLabel')}</span>
            <h2 className="section-title">
              {t('facilitiesTitle')}
              <span className="accent-text">{t('facilitiesTitleAccent')}</span>
            </h2>
            <p className="section-description">
              {t('facilitiesDesc')}
            </p>
          </div>

          <div className="facilities-grid">
            <div className="facility-category">
              <h3 className="category-title">
                <span className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </span>
                {t('facilitiesInterior')}
              </h3>
              <ul className="facility-list">
                <li>{t('interiorWifi')}</li>
                <li>{t('interiorAC')}</li>
                <li>{t('interiorFireplace')}</li>
                <li>{t('interiorSmartTV')}</li>
                <li>{t('interiorSonos')}</li>
                <li>{t('interiorWasher')}</li>
                <li>{t('interiorIron')}</li>
                <li>{t('interiorSafe')}</li>
              </ul>
            </div>

            <div className="facility-category">
              <h3 className="category-title">
                <span className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>
                </span>
                {t('facilitiesExterior')}
              </h3>
              <ul className="facility-list">
                <li>{t('exteriorPool')}</li>
                <li>{t('exteriorLoungers')}</li>
                <li>{t('exteriorTerrace')}</li>
                <li>{t('exteriorBBQ')}</li>
                <li>{t('exteriorJacuzzi')}</li>
                <li>{t('exteriorGardens')}</li>
                <li>{t('exteriorParking')}</li>
                <li>{t('exteriorLighting')}</li>
              </ul>
            </div>

            <div className="facility-category">
              <h3 className="category-title">
                <span className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                    <path d="M7 2v20"/>
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
                  </svg>
                </span>
                {t('facilitiesKitchen')}
              </h3>
              <ul className="facility-list">
                <li>{t('kitchenProfessional')}</li>
                <li>{t('kitchenOven')}</li>
                <li>{t('kitchenFridge')}</li>
                <li>{t('kitchenDishwasher')}</li>
                <li>{t('kitchenEspresso')}</li>
                <li>{t('kitchenDining')}</li>
                <li>{t('kitchenDishes')}</li>
                <li>{t('kitchenWineCellar')}</li>
              </ul>
            </div>

            <div className="facility-category">
              <h3 className="category-title">
                <span className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </span>
                {t('facilitiesServices')}
              </h3>
              <ul className="facility-list">
                <li>{t('serviceCleaning')}</li>
                <li>{t('serviceChef')}</li>
                <li>{t('serviceConcierge')}</li>
                <li>{t('serviceTransfer')}</li>
                <li>{t('serviceWineTours')}</li>
                <li>{t('serviceSpa')}</li>
                <li>{t('serviceGrocery')}</li>
                <li>{t('serviceExperiences')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section" id="location">
        <div className="location-container">
          <div className="location-content">
            <span className="section-label">{t('locationLabel')}</span>
            <h2 className="section-title">
              {t('locationTitle')}
              <span className="accent-text">{t('locationTitleAccent')}</span>
            </h2>
            <p className="location-intro">
              {t('locationIntro')}
            </p>

            <div className="distances">
              <div className="distance-item">
                <div className="distance-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                    <path d="M9 9v.01"/>
                    <path d="M9 12v.01"/>
                    <path d="M9 15v.01"/>
                    <path d="M9 18v.01"/>
                  </svg>
                </div>
                <div className="distance-info">
                  <h4>Florența</h4>
                  <span>45 {t('locationMinutes')} (35 km)</span>
                </div>
              </div>
              <div className="distance-item">
                <div className="distance-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 22h8"/>
                    <path d="M12 11v11"/>
                    <path d="M12 11c4 0 6-2.5 6-6V2H6v3c0 3.5 2 6 6 6z"/>
                  </svg>
                </div>
                <div className="distance-info">
                  <h4>Greve in Chianti</h4>
                  <span>15 {t('locationMinutes')} (12 km)</span>
                </div>
              </div>
              <div className="distance-item">
                <div className="distance-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18"/>
                    <path d="M4 21V10l8-7 8 7v11"/>
                    <path d="M9 21v-6h6v6"/>
                    <path d="M9 9h1"/>
                    <path d="M14 9h1"/>
                  </svg>
                </div>
                <div className="distance-info">
                  <h4>Siena</h4>
                  <span>50 {t('locationMinutes')} (45 km)</span>
                </div>
              </div>
              <div className="distance-item">
                <div className="distance-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="9" cy="7" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="7" r="1.5" fill="currentColor"/>
                    <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="9" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    <path d="M12 5L12 2"/>
                    <path d="M10 2h4"/>
                  </svg>
                </div>
                <div className="distance-info">
                  <h4>Castellina in Chianti</h4>
                  <span>20 {t('locationMinutes')} (18 km)</span>
                </div>
              </div>
            </div>

            <div className="nearby-attractions">
              <h3>{t('locationAttractions')}</h3>
              <div className="attractions-list">
                <div className="attraction">
                  <span className="attraction-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 22h8"/>
                      <path d="M12 11v11"/>
                      <path d="M12 11c4 0 6-2.5 6-6V2H6v3c0 3.5 2 6 6 6z"/>
                    </svg>
                  </span>
                  <div>
                    <h4>{t('locationWineries')}</h4>
                    <p>{t('locationWineriesDesc')}</p>
                  </div>
                </div>
                <div className="attraction">
                  <span className="attraction-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                      <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
                      <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
                      <path d="M12 16c-1.5 0-2.5-1-2.5-2h5c0 1-1 2-2.5 2z"/>
                    </svg>
                  </span>
                  <div>
                    <h4>{t('locationArtCulture')}</h4>
                    <p>{t('locationArtDesc')}</p>
                  </div>
                </div>
                <div className="attraction">
                  <span className="attraction-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8"/>
                      <path d="M12 8v8"/>
                    </svg>
                  </span>
                  <div>
                    <h4>{t('locationGastronomy')}</h4>
                    <p>{t('locationGastronomyDesc')}</p>
                  </div>
                </div>
                <div className="attraction">
                  <span className="attraction-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 20h18"/>
                      <path d="m6 16 6-12 6 12"/>
                      <path d="m9 20 3-8 3 8"/>
                    </svg>
                  </span>
                  <div>
                    <h4>{t('locationNature')}</h4>
                    <p>{t('locationNatureDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="location-map">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92685.41424894938!2d11.273614869999999!3d43.5398092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a4f0f56b8e82f%3A0x40a5f8e2b88f6e0!2sChianti%2C%20Province%20of%20Florence%2C%20Italy!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dimora del Tramonto Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section" id="reviews">
        <div className="reviews-header">
          <span className="section-label">{t('reviewsLabel')}</span>
          <h2 className="section-title">
            {t('reviewsTitle')}
            <span className="accent-text">{t('reviewsTitleAccent')}</span>
          </h2>
          <div className="rating-summary">
            <div className="stars">★★★★★</div>
            <span className="rating-text">4.9 {t('reviewsRating')} (87 {t('reviewsCount')})</span>
          </div>
        </div>

        <div 
          className="reviews-grid"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              "O experiență absolut magică! Vila este chiar mai frumoasă decât în poze. Piscina cu vedere la apus este de vis, iar grădinile sunt încântătoare. Gazdele au fost excepționale și ne-au ajutat să organizăm tururi de vin memorabile."
            </p>
            <div className="review-author">
              <div className="author-avatar">M</div>
              <div className="author-info">
                <h4>Maria & Alessandro</h4>
                <span>Milano, Italia · Septembrie 2024</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              "Am petrecut două săptămâni fantastice aici cu familia. Copiii au adorat piscina, iar noi am savurat vinurile locale pe terasă în fiecare seară. Bucătăria este perfect echipată și am putut găti mese delicioase cu produse de la piața locală."
            </p>
            <div className="review-author">
              <div className="author-avatar">S</div>
              <div className="author-info">
                <h4>Sophie & James</h4>
                <span>Londra, UK · August 2024</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              "Perfecțiune absolută pentru retragerea noastră creativă. Luminozitatea, liniștea și frumusețea locului au fost surse constante de inspirație. Vila oferă un echilibru perfect între lux și autenticitate toscană. Vom reveni cu siguranță!"
            </p>
            <div className="review-author">
              <div className="author-avatar">A</div>
              <div className="author-info">
                <h4>Ana & David</h4>
                <span>București, România · Iulie 2024</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              "Am sărbătorit aniversarea de 10 ani aici și a fost incredibil. Serviciul de concierge ne-a organizat o cină romantică cu chef privat care a fost punctul culminant al săptămânii. Locația este perfectă pentru a explora Toscana."
            </p>
            <div className="review-author">
              <div className="author-avatar">L</div>
              <div className="author-info">
                <h4>Laura & Marco</h4>
                <span>Roma, Italia · Iunie 2024</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              "Vila depășește toate așteptările! Fiecare detaliu este gândit cu grijă, de la lenjeriile de pat de lux până la colecția de vinuri din cramă. Grădinile sunt o oază de pace, iar viewurile sunt spectaculoase indiferent de momentul zilei."
            </p>
            <div className="review-author">
              <div className="author-avatar">C</div>
              <div className="author-info">
                <h4>Cristina & Paul</h4>
                <span>Paris, Franța · Mai 2024</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">
              "Cea mai bună vacanță a vieții noastre! Dimora del Tramonto este exact locul unde visezi să te trezești în fiecare dimineață. Staff-ul a fost atent la fiecare nevoie, iar recomandările lor pentru restaurante și vinării au fost perfecte."
            </p>
            <div className="review-author">
              <div className="author-avatar">E</div>
              <div className="author-info">
                <h4>Elena & Thomas</h4>
                <span>New York, USA · Aprilie 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile slider controls */}
        <div className="reviews-mobile-nav">
          <button 
            className="review-nav-btn review-prev" 
            onClick={() => setCurrentReview(prev => prev === 0 ? 5 : prev - 1)}
            aria-label="Previous review"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className="review-dots">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                className={`review-dot ${currentReview === index ? 'active' : ''}`}
                onClick={() => setCurrentReview(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className="review-nav-btn review-next" 
            onClick={() => setCurrentReview(prev => prev === 5 ? 0 : prev + 1)}
            aria-label="Next review"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="contact">
        <div className="cta-content">
          <h2 className="cta-title">
            {t('ctaReady')}
            <span className="accent-text">{t('ctaExperience')}</span>
          </h2>
          <p className="cta-subtitle">
            {t('ctaSubtitle')}
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={openModal}>
              <span>{t('checkAvailability')}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="secondary-button" onClick={openModal}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 2v3M13 2v3M3 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>{t('ctaContact')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <img 
                src={isMobile ? '/images/logo3.svg' : '/images/logo1.svg'}
                alt="Dimora del Tramonto" 
                className="footer-logo-image"
              />
              <p className="footer-description">
                {t('footerBrandDesc')}
              </p>
              <div className="footer-socials">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="mailto:info@dimoradeltramonto.com" className="social-link" aria-label="Email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>{t('footerExplore')}</h4>
                <ul>
                  <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>{t('navHome')}</a></li>
                  <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Villa</a></li>
                  <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>{t('navGallery')}</a></li>
                  <li><a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}>{t('navAmenities')}</a></li>
                  <li><a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}>{t('navLocation')}</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>{t('footerInfo')}</h4>
                <ul>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); openModal(); }}>{t('footerRates')}</a></li>
                  <li><a href="#policies" onClick={(e) => e.preventDefault()}>{t('footerPolicies')}</a></li>
                  <li><a href="#faq" onClick={(e) => e.preventDefault()}>{t('footerFAQ')}</a></li>
                  <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>Reviews</a></li>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); openModal(); }}>{t('footerContact')}</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>{t('footerContact')}</h4>
                <ul className="contact-list">
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Chianti, Toscana, Italia
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    +39 055 123 4567
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    info@dimoradeltramonto.com
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Dimora del Tramonto. {t('footerRights')}</p>
            <div className="footer-legal">
              <a href="#privacy" onClick={(e) => e.preventDefault()}>{t('footerPrivacy')}</a>
              <span>·</span>
              <a href="#terms" onClick={(e) => e.preventDefault()}>{t('footerTerms')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact/Booking Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-header">
              <h2>{t('formTitle')}</h2>
              <p>{t('formSubtitle')}</p>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('formName')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t('formNamePlaceholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('formEmail')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={t('formEmailPlaceholder')}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">{t('formPhone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder={t('formPhonePlaceholder')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guests">{t('formGuests')}</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">1 {t('formPerson')}</option>
                    <option value="2">2 {t('formPersons')}</option>
                    <option value="3">3 {t('formPersons')}</option>
                    <option value="4">4 {t('formPersons')}</option>
                    <option value="5">5 {t('formPersons')}</option>
                    <option value="6">6 {t('formPersons')}</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">{t('formCheckIn')}</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut">{t('formCheckOut')}</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    required
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('formMessage')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder={t('formMessagePlaceholder')}
                ></textarea>
              </div>

              <div className="form-info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p>{t('formInfo')}</p>
              </div>

              <button type="submit" className="submit-button">
                <span>{t('formSubmit')}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeVideoModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1&enablejsapi=1"
                title="Virtual Tour - Dimora del Tramonto"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;