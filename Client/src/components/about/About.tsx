import React from 'react'
import "./about.css"

const About = () => {
  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-sm-6">
        <img className="img" src="../../../images/home1.jpeg" alt="" />
      </div>
      <div className="col-sm-6">
        <div>
          <h1 className="h1-text">About Us</h1>
          <p>
            {" "}
            Horizon Estate is a pioneering and innovative real estate
            company specializing in the online sale of premium properties.
            Our mission is to redefine the real estate industry by
            harnessing the power of technology to provide a seamless,
            transparent, and convenient experience for buyers and sellers
            alike.
          </p>

          <p>
            At Horizon Estate, we understand that buying or selling a
            property is one of the most significant financial decisions in
            one's life. Therefore, we have created a platform that
            simplifies the process, making it accessible to everyone,
            whether you're a first-time buyer or an experienced investor.
          </p>

          <p>
            Horizon Estate is more than just a real estate company; we're
            your trusted partner in making property transactions easy,
            secure, and rewarding. Join us on a journey to discover the
            perfect property or to sell your property with confidence.
            Welcome to Horizon Estate, where your real estate dreams become
            a reality.
          </p>
        </div>
      </div>
    </div>
  </div>

  )
}

export default About