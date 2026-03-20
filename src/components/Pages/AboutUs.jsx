import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import aboutUsImage1 from '../../images/aboutus1.jpg';
import aboutUsImage2 from '../../images/aboutus2.jpg';


const AboutUs = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Section 1 */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3" style={{ color: '#808000' }}>Our Legacy of Fitness</h2>
              <p className="lead text-muted">
                Welcome to Groot's Fitness Club, where fitness meets passion. Since our inception, we have been dedicated to helping individuals achieve their health and wellness goals. Our state-of-the-art facilities are equipped with the latest technology and machinery, ensuring that every workout is effective and enjoyable. Whether you are a beginner taking your first steps into the world of fitness or a seasoned athlete looking to push your limits, our gym provides the perfect environment for growth and transformation.
              </p>
            </Col>
            <Col md={6}>
              <Image 
                src={aboutUsImage1}
                alt="Gym Facility" 
                fluid 
                rounded 
                className="shadow-lg w-100"
                style={{ height: '300px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section 2 */}
      <section className="py-5" style={{ backgroundColor: '#222', color: 'white' }}>
        <Container>
          <Row className="align-items-center flex-md-row-reverse">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3" style={{ color: '#808000' }}>Community & Support</h2>
              <p className="lead">
                Our community is built on support and encouragement. Our team of certified trainers is always on hand to provide expert guidance, personalized workout plans, and nutritional advice. We believe that fitness is not just a destination but a journey, and we are here to walk that path with you. Join us today and experience a holistic approach to health that empowers you to be the best version of yourself.
              </p>
            </Col>
            <Col md={6}>
              <Image 
                src={aboutUsImage2}
                alt="Community" 
                fluid 
                rounded 
                className="shadow-lg w-100"
                style={{ height: '300px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;