import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utilities/constants";
import VehicleImage from "../utilities/VehicleImage";
function Payment() {
    return (
      <section className="flex justify-center items-center" style={{ flex: '1', marginRight: '10%', marginLeft: '10%' }}>
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment</h2>
            <hr className="border-t-2 border-black-300 mb-4" /> {/* Horizontal line */}
          </div>
          <div className="mb-4">
            <label htmlFor="routingNumber" className="block mb-1"  >Routing Number:</label>
            <input type="text" id="routingNumber" className="border border-gray-300 rounded-md p-2 w-full" style={{ width: '80%' }} placeholder="9 Digits"/>
          </div>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block mb-1"  >Bank Account Number:</label>
            <input type="text" id="accountNumber" className="border border-gray-300 rounded-md p-2 w-full" style={{ width: '80%' }} placeholder="Up to 17 Digits"/>
          </div>
          <div className="mb-4">
            <label htmlFor="signature" className="block mb-1">Signature</label>
            <input type="text" id="signature" className="border border-gray-300 rounded-md p-2 w-full" style={{ width: '50%' }} placeholder="Type your name here" />
          </div>
          <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md mb-6">Pay USD</button>
          <hr className="border-t-2 border-black-300 mb-4" /> {/* Horizontal line */}
  
          <p className="text-sm text-gray-600">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
        </div>
      </section>
    );
  }
  
  
  
  
  function Cart({ services, subtotal, taxes, total }) {
    return (
      <section className="flex justify-center items-center text-center bg-gray-100 p-6 border border-gray-300 rounded-lg shadow-md" style={{ width: '30%' }}>
        <div className="w-full"> {/* Added w-full class to make the section full width */}
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          <hr className="border-t-2 border-gray-300 mb-4" /> {/* Horizontal line */}
          <ul className="mb-6">
            {services.map((service, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-base font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{service.subtitle}</p>
                <p className="text-base">${service.price}</p>
                <p className="text-base">Quantity: {service.quantity}</p>
                <hr className="border-t-2 border-black-300 mb-4" /> {/* Horizontal line */}
              </li>
            ))}
            {services.length === 0 && <li className="text-sm text-gray-600">No services in cart</li>}
          </ul>
          <div>
            <p className="text-base font-semibold mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-base font-semibold mb-2">Taxes: ${taxes.toFixed(2)}</p>
            <p className="text-base font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      </section>
    );
  }
  
  
  
  
  function PurchaseCheckout() {
    const services = [
      { title: "Service 1", subtitle: "Service 1 description", price: 50, quantity: 1 },
      { title: "Service 2", subtitle: "Service 2 description", price: 75, quantity: 2 },
      { title: "Service 3", subtitle: "Service 3 description", price: 100, quantity: 1 }
    ];
  
    const subtotal = services.reduce((acc, service) => acc + (service.price * service.quantity), 0);
    const taxes = subtotal * 0.1;
    const total = subtotal + taxes;
  
    return (
      <div>
        <h1>Payment Checkout</h1>
        <div style={{ display: 'flex' }}>
          <Payment />
          <Cart services={services} subtotal={subtotal} taxes={taxes} total={total} />
        </div>
      </div>
    );
  }
  

function Footer() {
  return (
    <footer className="self-stretch mt-32 w-full bg-black min-h-[287px] max-md:mt-10 max-md:max-w-full" />
  );
}


export default PurchaseCheckout;
