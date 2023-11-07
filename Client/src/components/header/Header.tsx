
import React from 'react'

const Header = () => {
  return (
    <div
    className="p-5 text-center bg-image"
    style={{
      backgroundImage: "url('../../../images/home.jpeg')",
      height: "700px",
    }}
    >
    <div
      className="mask justify-content-center align-items-center h-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-white">
          <h1 className="mb-3">Welcome to Horizon Estate</h1>
          <h4 className="mb-3">Your Surest plug for quality properties</h4>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Header

