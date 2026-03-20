import React, { useEffect, useState } from 'react'
import gym1Image from '../../images/Gym1.jpg'
import gym2Image from '../../images/Gym2.jpg'
import gym3Image from '../../images/gym3.jpg'
import gym4Image from '../../images/gym4.jpg'
import sponsor1Image from '../../images/Sponsor1.png'
import sponsor2Image from '../../images/sponsor2.jpg'
import sponsor3Image from '../../images/sponsor3.jpg'

const gymImages = [
  gym1Image,
  gym2Image,
  gym3Image,
  gym4Image
];

const sponsorImages = [
  sponsor1Image,
  sponsor2Image,
  sponsor3Image
];


const HomeBody = () => {

  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % gymImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <section className="carousel-section">
        <div className="carousel">
          <img src={gymImages[carouselIndex]} alt="Gym" />
        </div>
      </section>

      {/* Why We Are Better Section */}
      <section className="better-section">
        <h2>What Makes Us Different</h2>
        <div className="better-cards">
          <div className="better-card">156 Gyms</div>
          <div className="better-card">95 Cities</div>
          <div className="better-card">26 States</div>
          <div className="better-card">Personal Training Program</div>
          <div className="better-card">Corporate Wellness Program</div>
        </div>
      </section>

      {/* Sponsor Product Advertisements */}
      <section className="sponsor-section">
        <h2>Our Sponsors</h2>
        <div className="sponsor-cards">
          {sponsorImages.map((img, idx) => (
            <div className="sponsor-card" key={idx}>
              <img src={img} alt="Sponsor Product" />
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <h2>Our Story</h2>
        <p>Groot's Fitness Club is a globally renowned fitness brand with a legacy since 1965. Empowering individuals to achieve their fitness goals with world-class facilities, expert trainers, and a supportive community. Groot's Fitness Club India carries the legacy ahead since 2002, expanding across cities and offering diverse programs for all fitness levels.</p>
      </section>
    </div>
  )
}

export default HomeBody
