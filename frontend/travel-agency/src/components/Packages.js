import Header from './Header';
import { Link } from 'react-router-dom';
import '../styles/Packages.css';

const packagesData = [
  {
    id: 1,
    image: './images/mountain.jpg',
    title: '7 days to Venture to the cold terrains of the Siguanai mountains in Seuol korea of eastern Asia',
    price: 'From $600 PP'
  },
  {
    id: 2,
    image: './images/tiger.jpg',
    title: 'Take 14 days to explore the jungles of Shethali and the Tunga river in  Western Ghats of India ',
    price: 'From $799.99 PP',
  },
  {
    id: 3,
    image: './images/beach.jpg',
    title: 'Enjoy and relax in the beaches of Fulhadoo in the beutiful country of maldives ',
    price: 'From $1999.99 PP'
  },
  {
    id: 4,
    image: './images/elephant.jpg',
    title: '3 Days Masai Mara Mid-Range Group Tours At Mara Jambo Safari Lodge with an all you can eat buffet',
    price: 'From $460 PP'
  },
  {
    id: 5,
    image: './images/flamingo.jpg',
    title: 'Checkout the beutiful flamingoes as they migrate to Sandiego from Naivasha in Nothern America for 15 days',
    price: 'From $599.99'
  },
  {
    id: 6,
    image: './images/koala.jpg',
    title: '5 days to observe the majestic scenaries in Sydney,Australia as you embark to view the mating seasons of the endangered koalas',
    price: 'From $460 PP'
  }
];

const Packages = () => {
  return (
    <div className="packages-container">
      <Header />
      <h1 className="packages-title">unique travel experiences</h1>
      <div className="packages-grid">
        {packagesData.map((pack) => (
          <div key={pack.id} className="package-card">
            <img src={pack.image} alt={pack.title} className="package-image" />
            <div className="package-content">
              <h3 className="package-title">{pack.title}</h3>
              <p className="package-price">{pack.price}</p>
              {pack.stats && (
                <div className="package-stats">
                  <span>👍 {pack.stats.likes}</span>
                  <span>↗️ {pack.stats.shares}</span>
                </div>
              )}
              <div className="package-buttons">
                <button className="book-button">Book</button>
                <Link to={`/review/${pack.id}`} className="review-button">
                  Review
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;