import React from "react";
import "./services.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { PROPERTY } from "../pages/Home";
interface Props {
  property: PROPERTY[];
  handleSubmit: (id: string) => void;
  loading: boolean;
}

const Services = ({ property, handleSubmit, loading }: Props) => {
  const style = "width: 3rem; height: 3rem;";
  return (
    <div className="container mt-5">
      <div>
        <h1 className="h1-text">Our Services</h1>
        <p>
          At Horizon Estate, we're dedicated to simplifying the process of
          buying and selling properties online. Our comprehensive range of
          services is designed to meet the diverse needs of property buyers,
          sellers, and investors. With a commitment to transparency, efficiency,
          and customer satisfaction, we ensure our servies is rendered
          proffessionally.
        </p>
        <p>
          At Horizon Estate, we simplify property transactions. List, search,
          value, and invest effortlessly. Experienced agents, legal guidance,
          market insights, and property management available. Explore now!
        </p>

        <p>
          Check out the list of our properties and purchase the one that best
          suit your needs
        </p>
      </div>
      {loading && (
        <div className="text-center">
          <div className="spinner-grow w-10 h-10 text-center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row">
        {property.map((prop) => (
          <div className="col-sm-4" key={prop._id}>
            <Card
              style={{ width: "18rem" }}
              className="position-relative shadow-lg"
            >
              <Card.Img variant="top" src={prop.image} />
              <Card.Body>
                <Card.Title>{prop.type}</Card.Title>
                <Card.Text>{prop.description}</Card.Text>
                <Card.Text>Price: ${prop.price}</Card.Text>
                <Button
                  variant="info"
                  className="text-center"
                  onClick={() => handleSubmit(prop._id)}
                >
                  View Property
                </Button>
              </Card.Body>
              <span className="position-absolute top-30 start-90 translate-middle badge rounded-pill bg-danger">
                {prop.propertyStatus === "Occupied" && "Sold"}
              </span>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
