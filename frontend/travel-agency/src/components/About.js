import Header from './Header';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <Header />
      <div className="about-hero">
        <img src="/images/beach.jpg" alt="Beautiful beach" className="about-image" />
      </div>
      <div className="about-content">
        <p className="about-text">
          Welcome to HAMA travelco, your trusted partner for unforgettable travel experiences! Whether you're planning a relaxing beach vacation, an adventurous trek, or a cultural journey, we are here to bring your dream getaway to life.
        </p>
        <p className="about-text">
          Founded in 2024, our team of passionate travel experts has been curating unique travel experiences for clients around the world. We believe that travel is not just about visiting new places but about creating lasting memories, discovering new cultures, and making connections that will last a lifetime.
        </p>
        <p className="about-text">
          At HAMA travelco, our mission is to provide personalized, seamless travel services that cater to your unique needs and preferences. We work closely with you to design tailor-made itineraries, ensuring that every detail is taken care of. From flights and accommodation to excursions and activities, we make sure your journey is smooth, enjoyable, and stress-free.
        </p>
        
        <h2 className="about-heading">Our Mission</h2>
        <p className="about-text">
          Our mission is to revolutionize the way you travel. We aim to provide a high-end, personalized travel experience that meets your exact needs. We want to inspire you to explore the world with confidence and ease, knowing we’ve crafted every detail to suit your preferences.
        </p>

        <h2 className="about-heading">Our Services</h2>
        <ul className="about-list">
          <li>Customized Vacation Packages</li>
          <li>Flight and Hotel Bookings</li>
          <li>Guided Tours & Excursions</li>
          <li>Group Travel & Corporate Retreats</li>
          <li>Travel Insurance and Visa Assistance</li>
          <li>Honeymoon and Destination Weddings</li>
        </ul>

        <h2 className="about-heading">Why Choose Us?</h2>
        <ul className="about-list">
          <li><strong>Expert Knowledge:</strong> Our team consists of experienced travel consultants who know the ins and outs of the destinations we offer.</li>
          <li><strong>Personalized Service:</strong> We take the time to understand your travel goals and craft itineraries that match your interests and budget.</li>
          <li><strong>Exclusive Deals:</strong> Through our strong relationships with global travel providers, we offer exclusive deals and access to hidden gems you won’t find elsewhere.</li>
          <li><strong>24/7 Support:</strong> We’re with you every step of the way, providing you with support before, during, and after your trip.</li>
        </ul>

        <p className="about-text">
          We as a travel agency have tried our level best to bring luxury, class, and entertainment as one. We also aim to simplify your travel planning experience by offering easy-to-choose packages, filtering rates, prices, and availability for your convenience.
        </p>
        <p className="about-text">
          We have thoroughly tested every package using a proxy to ensure compatibility. Our use of cutting-edge technology also guarantees that we provide you with the highest quality equipment for specific packages.
        </p>
      </div>
    </div>
  );
};

export default About;
