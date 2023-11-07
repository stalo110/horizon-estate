import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { usePaystackPayment, PaystackButton } from "react-paystack";
import "./property.css";
import Button from "react-bootstrap/esm/Button";
import axiosInstance from "../../request/AxiosInstance";

const Property = () => {
  const [token, setToken] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      setToken(data);
    }
  });
  const config = {
    reference: new Date().getTime().toString(),
    email: "priceblings@gmail.com",
    amount: state.price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_d8b15464638f89fcdfb8d554f6b9d68e075170ee",
  };
  const handlePaystackSuccessAction = async (reference) => {
    if (reference.status === "success") {
      const buy = {
        _id: state._id,
        reference: reference.reference,
      };
      setLoading(true);
      try {
        const sold = await axiosInstance.post("/Property/buy", buy);

        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        setError(error.response.data.error);
      }
      ///api call
    } else {
      setError("failed transaction");
    }
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay Now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className={`property ${loading && "bg-grey"}`}>
      {error && <p className="text-danger text-center">{error}</p>}
      {loading && (
        <div
          className="spinner-border mr-3 spinner-border-sm"
          role="status"
        ></div>
      )}

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={state.image} />
        <Card.Body>
          <Card.Title>{state.type}</Card.Title>
          <Card.Text>{state.description}</Card.Text>
          <Card.Text>Price: ${state.price}</Card.Text>
          {token ? (
            state.propertyStatus === "Occupied" ? (
              <Button className="btn btn-secondary"> Sold Out</Button>
            ) : (
              <PaystackButton {...componentProps} className="btn btn-info" />
            )
          ) : (
            <a href="/signup">Register to buy a property</a>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Property;
