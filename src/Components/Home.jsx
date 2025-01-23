import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  // State to list of properties
  const [properties, setProperties] = useState([]);
  // State to selected sorting option
  const [sortBy, setSortBy] = useState('Sort by');
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetch properties data from the API 
  useEffect(() => {
    axios.get('https://mira-strapi-dev.q.starberry.com/api/properties/?_limit=50')
      .then(response => {
        setProperties(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Sort properties based on the selected sorting option
  const filteredProperties = properties.sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.attributes.price - b.attributes.price;
    if (sortBy === 'Price: High to Low') return b.attributes.price - a.attributes.price;
    return 0;
  });

  return (
    <div className="home">
      <Header />
      
      <h2>Property for Sales</h2>
      
      <div className="filter-section">
        <select defaultValue="All Bedrooms">
          <option>All Bedrooms</option>
          <option>1 Bedroom</option>
          <option>2 Bedrooms</option>
          <option>3 Bedrooms</option>
        </select>
        <select defaultValue="Any Neighbourhood">
          <option>Any Neighbourhood</option>
          <option>Neighbourhood 1</option>
          <option>Neighbourhood 2</option>
        </select>
        <select defaultValue="Min Price">
          <option>Min Price</option>
          <option>£100,000</option>
          <option>£200,000</option>
        </select>
        <select defaultValue="Max Price">
          <option>Max Price</option>
          <option>£300,000</option>
          <option>£400,000</option>
        </select>
        <select defaultValue="Sort by" onChange={e => setSortBy(e.target.value)}>
          <option>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
        <span className='filter-result'>{filteredProperties.length}</span>
      </div>
      
      {loading ? (
        <p>Loading ...</p> // Show loading message while fetching data
      ) : (
        <div className="property-list">
          {properties
            .filter((_, index) => index !== 5 && index !== 14) // Exclude properties at index 5 and 14 from api 
            .slice(0, 21) // Limit to the first 21 properties
            .map(property => (
              property.attributes.thumbnail ? (
                <div key={property.id} className="property-item">
                  <div className="product-section">
                    <Link to={`/property-details`} state={{ property }}>
                      <img src={property.attributes.thumbnail} alt="Property" />
                    </Link>
                    <h5>{property.attributes.title}</h5>
                    <p>{property.attributes.display_address}</p>
                    <p><b>£{property.attributes.price}</b></p>
                    <button className='like-button'>❤️</button>
                  </div>
                </div>
              ) : null
            ))}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Home;
