import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import './PropertyDetail.css';
import Header from './Header';
import Footer from './Footer';
import { facts_features,contact_details } from './Data.jsx'; 

const PropertyDetail = () => {
  const location = useLocation();  // Get the location object from react-router-dom
  const { property } = location.state;   // Destructure the property object from location.state
  const [modalIsOpen, setModalIsOpen] = useState(false);  // State to manage the modal open/close status
  const [modalImage, setModalImage] = useState('');

  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Header/>
      <div className="header-section">
        <div className="image-collage">
          {/* Display property images and open modal on click */}
          <img
            src={property.attributes.thumbnail}
            alt="Property"
            className="top-image"
            onClick={() => openModal(property.attributes.thumbnail)}
          />
          <img
            src={property.attributes.thumbnail}
            alt="Property"
            onClick={() => openModal(property.attributes.thumbnail)}
          />
          <img
            src={property.attributes.thumbnail}
            alt="Property"
            onClick={() => openModal(property.attributes.thumbnail)}
          />
        </div>
        <div className="details">
          <span className="share-property">🖤</span>
          <hr />
          {/* Display property price, title, and address */}
          <p className="price">£{property.attributes.price} per month</p>
          <p>{property.attributes.title}</p>
          <p className="info"><strong>Address:</strong> {property.attributes.display_address}</p>
          <div className="contact-agent">Contact Agent</div>
          <div className="facts-features">
            <h2>Facts and Features</h2>
            <hr />
            {facts_features.map((feature, index) => (
              <p key={index}>
                <span className="label">{feature.label}:</span>
                <span className="value" dangerouslySetInnerHTML={{ __html: feature.value }}></span>
              </p>
            ))}
            <div className='Desc-Details'>
              <strong>Description:</strong>
              <p>{property.attributes.description}</p>
            </div>
          </div>
          <div className="contact-card">
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="Reka Demeter" />
            <div className="contact_details">
            {contact_details.map((contact, index) => (
              <div key={index}> 
              <div className="name">{contact.names}</div>
              <div className="title">{contact.title}</div>
              <div className="phone">{contact.phone}  <a href="mailto:reka.demeter@example.com" className="email-button">Email</a></div>
              </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/*  image Modal  */}
      <Modal
        isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal"
        className="modal" overlayClassName="overlay">
        <button onClick={closeModal} className='modal-Close'>x</button>
        <img src={modalImage} alt="Property" className="modal-image" />
      </Modal>

      <Footer/>
    </>
  );
};

export default PropertyDetail;
