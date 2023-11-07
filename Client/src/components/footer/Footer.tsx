import React from 'react'
import "./footer.css"
import { SignInSchema } from '../../../../Server/src/components/Auth/schema';


const Footer = () => {
  return (
<div className="container bg-info" style={{ width: "100%" }}>
        <div className="row">
          <div className="col-sm-4">
            <h1 className="logo1">Horizon Estate</h1>
            <p>
              Horizon Estate is not just into selling of properties, but we are
              interested in giving our clients the comfort they desire.
            </p>
            <p>
              Buy from us today and live in your dream home. "...No place like
              home"
            </p>
          </div>

          <div className="col-sm-4">
            <h1>Quick Links</h1>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/signup">Register</a>
              </li>
              <li>
                <a href="/login">SignInSchema</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-4">
            <h1>Contact Info</h1>
            <ul>
              <li>Address: Edo Tech Pack, Edo State</li>
              <li>Phone No: +234827653678</li>
              <li>Email: horizonestate2023@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

  )
}

export default Footer